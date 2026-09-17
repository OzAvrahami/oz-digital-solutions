// Production-server HTTP and browser regression for Issue #7. Local requests only.
import assert from 'node:assert/strict'
import { mkdir } from 'node:fs/promises'

const origin = process.env.REVIEW_ORIGIN || 'http://127.0.0.1:3008'
assert.ok(['127.0.0.1', 'localhost'].includes(new URL(origin).hostname), 'Use a local production server')
const { chromium } = await import(process.env.PLAYWRIGHT_MODULE || 'playwright')
const browser = await chromium.launch({ channel: process.env.BROWSER_CHANNEL || 'chrome', headless: true })
const missingPaths = [
  '/this-page-does-not-exist', '/fr', '/fr/anything',
  ...['he', 'en'].flatMap(locale => [
    `/${locale}/this-page-does-not-exist`,
    `/${locale}/services/does-not-exist`,
    `/${locale}/guides/does-not-exist`,
    `/${locale}/opengraph-image`,
    `/${locale}/opengraph-image?0e1efc259f159f93`,
  ]),
]
const validPaths = ['he', 'en'].flatMap(locale => [
  '', '/services/websites', '/guides', '/guides/business-website-cost-2026', '/accessibility',
].map(suffix => `/${locale}${suffix}`))
const heading = { he: 'העמוד שחיפשת לא נמצא', en: 'Page not found' }
const localeFor = path => path.split('/')[1] === 'en' ? 'en' : 'he'
const get = path => fetch(new URL(path, origin), { redirect: 'manual' })
const inspect = page => page.evaluate(() => ({
  lang: document.documentElement.lang,
  dir: document.documentElement.dir,
  heading: document.querySelector('h1')?.textContent,
  headings: document.querySelectorAll('h1').length,
  robots: [...document.querySelectorAll('meta[name="robots"]')].map(el => el.content),
  canonical: [...document.querySelectorAll('link[rel="canonical"]')].map(el => el.href),
  alternates: [...document.querySelectorAll('link[hreflang]')].map(el => [el.hreflang, el.href]),
  links: [...document.querySelectorAll('main a')].map(el => el.getAttribute('href')),
  title: document.title,
}))
function checkMissing(state, locale) {
  assert.equal(state.lang, locale)
  assert.equal(state.dir, locale === 'he' ? 'rtl' : 'ltr')
  assert.equal(state.heading, heading[locale])
  assert.equal(state.headings, 1)
  assert.deepEqual(state.robots, ['noindex'], 'One framework noindex, no conflicting directives')
  assert.deepEqual(state.canonical, [], 'Missing URLs must not declare a content canonical')
  assert.deepEqual(state.alternates, [], 'Missing URLs must not advertise content alternates')
  assert.deepEqual(state.links, [`/${locale}`, `/${locale}/guides`, `/${locale}#services`])
  assert.ok(state.title.includes(heading[locale]))
}
try {
  // Parse initial HTTP HTML with JS/network disabled: localization cannot depend on hydration.
  const parser = await browser.newContext({ javaScriptEnabled: false })
  await parser.route('**/*', route => route.abort())
  const document = await parser.newPage()
  for (const path of missingPaths) {
    const response = await get(path)
    assert.equal(response.status, 404, path)
    assert.equal(response.headers.get('location'), null, path)
    await document.setContent(await response.text())
    checkMissing(await inspect(document), localeFor(path))
    console.log(`PASS HTTP 404 + localized initial HTML/noindex: ${path}`)
  }
  for (const path of validPaths) {
    const response = await get(path)
    assert.equal(response.status, 200, path)
    await document.setContent(await response.text())
    const state = await inspect(document)
    assert.deepEqual(state.canonical, [`https://ozavrahami.co.il${path}`])
    assert.ok(!state.robots.some(value => /noindex|none/i.test(value)))
    const suffix = path.slice(3)
    assert.deepEqual(state.alternates.sort(), ['en', 'he'].map(locale => [locale, `https://ozavrahami.co.il/${locale}${suffix}`]))
  }
  const root = await get('/')
  assert.equal(root.status, 308)
  assert.equal(root.headers.get('location'), '/he')
  const sitemap = await get('/sitemap.xml')
  assert.equal(sitemap.status, 200)
  const urls = [...(await sitemap.text()).matchAll(/<loc>([^<]+)<\/loc>/g)].map(([, url]) => url)
  assert.equal(urls.length, 18)
  assert.equal(new Set(urls).size, 18)
  for (const path of [...missingPaths, '/', '/_not-found']) assert.ok(!urls.includes(`https://ozavrahami.co.il${path}`))
  for (const path of validPaths) assert.ok(urls.includes(`https://ozavrahami.co.il${path}`))
  await parser.close()

  await mkdir('.tmp/not-found-review', { recursive: true })
  let layouts = 0
  for (const width of [360, 390, 768, 1440]) {
    const context = await browser.newContext({ viewport: { width, height: 900 }, reducedMotion: 'reduce' })
    await context.route('**/*', route => {
      const request = route.request()
      return new URL(request.url()).origin === origin && request.method() === 'GET' ? route.continue() : route.abort()
    })
    const page = await context.newPage()
    const errors = []
    page.on('pageerror', error => errors.push(error.message))
    for (const locale of ['he', 'en']) {
      const path = `/${locale}/this-page-does-not-exist`
      assert.equal((await page.goto(`${origin}${path}`)).status(), 404)
      await page.evaluate(() => document.fonts.ready)
      await page.waitForFunction(() => document.documentElement.classList.contains('motion-paused'))
      checkMissing(await inspect(page), locale)
      assert.equal(new URL(page.url()).pathname, path)
      const layout = await page.evaluate(() => ({
        overflow: document.documentElement.scrollWidth > innerWidth,
        clipped: [...document.querySelectorAll('main h1, main p, main a')].some(el => el.scrollWidth > el.clientWidth + 1),
        targets: [...document.querySelectorAll('main a')].map(el => el.getBoundingClientRect().height),
        visible: [...document.querySelectorAll('main h1, main p, main a')].every(el => getComputedStyle(el).opacity === '1' && el.getBoundingClientRect().height > 0),
        font: getComputedStyle(document.body).fontFamily,
      }))
      assert.equal(layout.overflow, false, `${locale} ${width}: overflow`)
      assert.equal(layout.clipped, false, `${locale} ${width}: clipped text`)
      assert.ok(layout.targets.every(height => height >= 44))
      assert.ok(layout.visible)
      assert.match(layout.font, /heebo/i, 'Reuse the loaded site font, not a browser fallback')
      const contrast = await page.evaluate(() => {
        const luminance = color => color.match(/[\d.]+/g).slice(0, 3).map(Number).map(value => {
          const channel = value / 255
          return channel <= .04045 ? channel / 12.92 : ((channel + .055) / 1.055) ** 2.4
        }).reduce((sum, value, index) => sum + value * [.2126, .7152, .0722][index], 0)
        const ratio = (a, b) => (Math.max(a, b) + .05) / (Math.min(a, b) + .05)
        const surface = luminance(getComputedStyle(document.querySelector('.not-found-card')).backgroundColor)
        return ['.not-found-copy h1', '.not-found-copy p', '.not-found-secondary', '.not-found-services', '.button-primary'].map(selector => {
          const style = getComputedStyle(document.querySelector(selector))
          return ratio(luminance(style.color), selector === '.button-primary' ? luminance(style.backgroundColor) : surface)
        })
      })
      assert.ok(contrast.every(ratio => ratio >= 4.5), `Text contrast: ${contrast}`)
      await page.screenshot({ path: `.tmp/not-found-review/${locale}-${width}.png`, fullPage: true })
      await page.keyboard.press('Tab')
      assert.equal(await page.locator('.skip-link').evaluate(el => el === document.activeElement), true)
      await page.keyboard.press('Enter')
      assert.equal(await page.locator('main').evaluate(el => el === document.activeElement), true)
      await page.keyboard.press('Tab')
      assert.equal(await page.locator('main a').nth(0).evaluate(el => el === document.activeElement), true)
      const focus = await page.locator('main a').nth(0).evaluate(el => ({ style: getComputedStyle(el).outlineStyle, width: getComputedStyle(el).outlineWidth }))
      assert.equal(focus.style, 'solid')
      assert.ok(parseFloat(focus.width) >= 2)
      await page.keyboard.press('Tab')
      assert.equal(await page.locator('main a').nth(1).evaluate(el => el === document.activeElement), true)
      await page.keyboard.press('Enter')
      await page.waitForURL(`${origin}/${locale}/guides`)
      assert.ok(await page.locator('main h1').isVisible())
      layouts++
    }
    assert.deepEqual(errors, [])
    await context.close()
  }

  // Persisted site preferences, forced colors, and a 200%-equivalent layout viewport.
  const accessible = await browser.newContext({ viewport: { width: 720, height: 450 }, deviceScaleFactor: 2 })
  await accessible.route('**/*', route => new URL(route.request().url()).origin === origin && route.request().method() === 'GET' ? route.continue() : route.abort())
  await accessible.addInitScript(() => localStorage.setItem('oz-accessibility', JSON.stringify({ paused: true, highContrast: true })))
  const accessiblePage = await accessible.newPage()
  for (const locale of ['he', 'en']) {
    await accessiblePage.goto(`${origin}/${locale}/this-page-does-not-exist`)
    await accessiblePage.waitForFunction(() => document.documentElement.classList.contains('high-contrast') && document.documentElement.classList.contains('motion-paused'))
    assert.equal(await accessiblePage.evaluate(() => document.documentElement.scrollWidth > innerWidth), false)
    // Existing preferences intentionally hide floating controls near recovery links.
    await accessiblePage.evaluate(() => scrollTo(0, document.body.scrollHeight))
    await accessiblePage.locator('.accessibility-button').click()
    assert.equal(await accessiblePage.locator('dialog').evaluate(el => el.open), true)
    assert.equal(await accessiblePage.locator('dialog input').nth(0).isChecked(), true)
    assert.equal(await accessiblePage.locator('dialog input').nth(1).isChecked(), true)
    await accessiblePage.keyboard.press('Escape')
    assert.equal(await accessiblePage.locator('.accessibility-button').evaluate(el => el === document.activeElement), true)
    await accessiblePage.emulateMedia({ forcedColors: 'active', reducedMotion: 'reduce' })
    assert.equal(await accessiblePage.locator('main h1').isVisible(), true)
    assert.equal(await accessiblePage.evaluate(() => document.documentElement.scrollWidth > innerWidth), false)
    await accessiblePage.emulateMedia({ forcedColors: 'none' })
    // Primary recovery is a real keyboard-activatable navigation.
    await accessiblePage.locator('main a').nth(0).focus()
    await accessiblePage.keyboard.press('Enter')
    await accessiblePage.waitForURL(`${origin}/${locale}`)
  }
  await accessible.close()
  console.log(`PASS ${missingPaths.length} missing and ${validPaths.length} valid HTTP routes, root 308, sitemap, initial HTML/noindex, ${layouts} responsive/keyboard/reduced-motion layouts. Screenshots: .tmp/not-found-review/`)
  console.log('PASS persisted contrast/motion preferences, dialog focus return, forced colors and 200%-equivalent layout viewport.')
} finally {
  await browser.close()
}
