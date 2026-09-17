// Focused production-preview check; no messages, forms or external requests.
import assert from 'node:assert/strict'
import { createHash } from 'node:crypto'
import { readFile } from 'node:fs/promises'
import ts from 'typescript'

const origin = process.env.REVIEW_ORIGIN || 'http://127.0.0.1:3008'
assert.ok(['127.0.0.1', 'localhost'].includes(new URL(origin).hostname), 'Use a local production server')
const root = new URL('../', import.meta.url)
const manifest = JSON.parse(await readFile(new URL('src/content/social-images.json', root), 'utf8'))
async function loadContent(path) {
  const source = await readFile(new URL(path, root), 'utf8')
  const js = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.ESNext } }).outputText
  return import(`data:text/javascript;base64,${Buffer.from(js).toString('base64')}`)
}
const agents = {
  normal: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36',
  whatsapp: 'WhatsApp/2.24.7.81 A',
  facebook: 'facebookexternalhit/1.1 (+http://www.facebook.com/externalhit_uatext.php)',
  twitter: 'Twitterbot/1.0',
}
const { chromium } = await import(process.env.PLAYWRIGHT_MODULE || 'playwright')
const browser = await chromium.launch({ channel: process.env.BROWSER_CHANNEL || 'chrome', headless: true })
let pages = 0
let assets = 0
try {
  const context = await browser.newContext({ javaScriptEnabled: false })
  await context.route('**/*', route => route.abort())
  const page = await context.newPage()
  for (const [agent, userAgent] of Object.entries(agents)) {
    const get = (path, redirect = 'error') => fetch(new URL(path, origin), { headers: { 'user-agent': userAgent }, redirect })
    const rootResponse = await get('/', 'manual')
    assert.equal(rootResponse.status, 308, `${agent}: root must redirect permanently`)
    assert.equal(rootResponse.headers.get('location'), '/he')
    const redirected = await get('/', 'follow')
    assert.equal(new URL(redirected.url).pathname, '/he')
    assert.equal(redirected.status, 200)
    const expectedSitemapUrls = []
    for (const locale of ['he', 'en']) {
      const dictionary = (await loadContent(`src/content/${locale}.ts`))[locale]
      const revenueModule = await loadContent(`src/content/revenue/${locale}.ts`)
      const revenue = revenueModule[locale === 'he' ? 'revenueHe' : 'revenueEn']
      expectedSitemapUrls.push(...[
        '', '/guides', '/accessibility',
        ...Object.keys(revenue.services).map(slug => `/services/${slug}`),
        ...Object.keys(revenue.guides).map(slug => `/guides/${slug}`),
      ].map(suffix => `https://ozavrahami.co.il/${locale}${suffix}`))
      const routes = [
        ['', dictionary.metadata, 'website'],
        ['/services/websites', revenue.services.websites.metadata, 'website'],
        ['/guides', revenue.guidesIndex.metadata, 'website'],
        ['/guides/business-website-cost-2026', revenue.guides['business-website-cost-2026'].metadata, 'article'],
      ]
      const image = manifest[locale]
      const imageUrl = `https://ozavrahami.co.il${image.path}`
      const response = await get(image.path)
      assert.equal(response.status, 200)
      assert.equal(response.headers.get('content-type'), 'image/png')
      assert.doesNotMatch(response.headers.get('x-robots-tag') || '', /noindex|none|nofollow|noimageindex/i)
      const png = Buffer.from(await response.arrayBuffer())
      assert.equal(png.subarray(0, 8).toString('hex'), '89504e470d0a1a0a')
      assert.equal(png.readUInt32BE(16), 1200)
      assert.equal(png.readUInt32BE(20), 630)
      assert.deepEqual(png, await readFile(new URL(`public${image.path}`, root)))
      assert.ok(image.path.includes(createHash('sha256').update(png).digest('hex').slice(0, 12)))
      assets++
      for (const [suffix, expected, type] of routes) {
        const path = `/${locale}${suffix}`
        const result = await get(path)
        assert.equal(result.status, 200, `${agent}: ${path}`)
        assert.doesNotMatch(result.headers.get('x-robots-tag') || '', /noindex|none|nofollow|noimageindex/i)
        const html = await result.text()
        assert.doesNotMatch(html, /\/opengraph-image|\/twitter-image/)
        if (path === '/he') assert.equal(await redirected.clone().text(), html, 'Root redirect metadata/content differs')
        await page.setContent(html)
        const metadata = await page.evaluate(() => ({
          title: document.title,
          lang: document.documentElement.lang,
          direction: document.documentElement.dir,
          meta: [...document.querySelectorAll('head meta')].map(el => [el.getAttribute('property') || el.getAttribute('name'), el.content]),
          canonical: [...document.querySelectorAll('link[rel="canonical"]')].map(el => el.href),
          alternates: [...document.querySelectorAll('link[rel="alternate"][hreflang]')].map(el => [el.hreflang, el.href]),
        }))
        const values = key => metadata.meta.filter(([name]) => name === key).map(([, value]) => value)
        const one = (key, expectedValue) => assert.deepEqual(values(key), [expectedValue], `${agent}: ${path}: ${key}`)
        assert.equal(metadata.title, expected.title)
        assert.equal(metadata.lang, locale)
        assert.equal(metadata.direction, locale === 'he' ? 'rtl' : 'ltr')
        one('description', expected.description)
        for (const prefix of ['og', 'twitter']) {
          one(`${prefix}:title`, expected.title)
          one(`${prefix}:description`, expected.description)
          one(`${prefix}:image`, imageUrl)
          one(`${prefix}:image:alt`, image.alt)
        }
        one('og:image:width', '1200')
        one('og:image:height', '630')
        one('og:image:type', 'image/png')
        one('twitter:card', 'summary_large_image')
        one('og:type', type)
        one('og:locale', locale === 'he' ? 'he_IL' : 'en_US')
        one('og:url', `https://ozavrahami.co.il${path}`)
        assert.deepEqual(metadata.canonical, [`https://ozavrahami.co.il${path}`])
        assert.deepEqual(metadata.alternates.sort(), ['en', 'he'].map(lang => [lang, `https://ozavrahami.co.il/${lang}${suffix}`]))
        assert.doesNotMatch(values('robots').join(','), /noindex|none|nofollow|noimageindex/i)
        pages++
      }
      assert.equal((await get(`/${locale}/accessibility`)).status, 200, `${agent}: accessibility route`)
      for (const suffix of ['/issue-6-missing-page', '/services/issue-6-missing-service', '/guides/issue-6-missing-guide', '/opengraph-image', '/opengraph-image?0e1efc259f159f93']) {
        const missing = await get(`/${locale}${suffix}`, 'manual')
        assert.equal(missing.status, 404, `${agent}: /${locale}${suffix} must remain 404`)
        assert.equal(missing.headers.get('location'), null, 'Missing URL must not redirect')
      }
    }
    const missing = await get('/issue-6-missing-path', 'manual')
    assert.equal(missing.status, 404, `${agent}: unknown root path must remain 404`)
    assert.equal(missing.headers.get('location'), null, 'Unknown root path must not redirect')
    const robots = await get('/robots.txt')
    assert.equal(robots.status, 200)
    const robotsText = await robots.text()
    assert.match(robotsText, /Allow: \/\s/)
    assert.doesNotMatch(robotsText, /Disallow:\s*\//)
    assert.match(robotsText, /^Sitemap: https:\/\/ozavrahami\.co\.il\/sitemap\.xml\s*$/m)
    assert.match(robotsText, /^Host: https:\/\/ozavrahami\.co\.il\s*$/m)
    const sitemap = await get('/sitemap.xml')
    assert.equal(sitemap.status, 200)
    const sitemapText = await sitemap.text()
    const sitemapUrls = [...sitemapText.matchAll(/<loc>([^<]+)<\/loc>/g)].map(([, url]) => url)
    assert.ok(sitemapUrls.every(url => new URL(url).pathname !== '/'), 'Root must not be a sitemap content URL')
    assert.equal(new Set(sitemapUrls).size, sitemapUrls.length, 'Sitemap must not contain duplicate URLs')
    assert.deepEqual(sitemapUrls.sort(), expectedSitemapUrls.sort(), 'Preserve all localized sitemap routes')
    console.log(`PASS ${agent}: root 308 → /he, bilingual home/service/guides/article SEO, accessibility 200, static PNGs, robots/${sitemapUrls.length}-URL sitemap, 11 missing/retired URLs remain 404`)
  }
  console.log(`PASS ${pages} page responses and ${assets} PNG responses; no external requests or form submissions.`)
} finally {
  await browser.close()
}
