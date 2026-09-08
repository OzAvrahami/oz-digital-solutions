// Offline, build-time authoring only. Production serves the checked-in PNGs.
import assert from 'node:assert/strict'
import { createHash } from 'node:crypto'
import { readFile, mkdir, writeFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import ts from 'typescript'

const root = new URL('../', import.meta.url)
const read = (path, encoding = 'utf8') => readFile(new URL(path, root), encoding)
const check = process.argv.includes('--check')
const { chromium } = await import(process.env.PLAYWRIGHT_MODULE || 'playwright')
const source = ts.transpileModule(await read('src/content/flow.ts'), {
  compilerOptions: { module: ts.ModuleKind.ESNext },
}).outputText
const { flowCopy } = await import(`data:text/javascript;base64,${Buffer.from(source).toString('base64')}`)
const font = (await read('public/oz-digital/heebo.ttf', null)).toString('base64')
const brand = `data:image/svg+xml;base64,${(await read('public/oz-digital/favicon.svg', null)).toString('base64')}`
const styles = (await read('scripts/social-images/style.css')).replace('{{font}}', font)
const template = await read('scripts/social-images/template.html')
const escape = text => text.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;')
const browser = await chromium.launch({ channel: process.env.BROWSER_CHANNEL || 'chrome', headless: true })
const manifest = {}
try {
  console.log(`Renderer: Chromium ${browser.version()}; ${process.platform}/${process.arch}`)
  for (const locale of ['he', 'en']) {
    const t = flowCopy[locale]
    // Preserve natural Unicode order. Collapse only the homepage's optional break.
    const headline = t.headline.replace('<br class="hero-break">', '')
    const values = { locale, direction: locale === 'he' ? 'rtl' : 'ltr', name: escape(t.name), headline,
      services: escape(t.eyebrow).replace(/\bAI\b/g, '<bdi dir="ltr">AI</bdi>'), styles, brand }
    const html = template.replace(/\{\{(\w+)\}\}/g, (_, key) => {
      assert.ok(key in values, `Unknown template field: ${key}`)
      return values[key]
    })
    const context = await browser.newContext({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1,
      locale: locale === 'he' ? 'he-IL' : 'en-US', timezoneId: 'UTC', reducedMotion: 'reduce' })
    // All font/brand resources are embedded; no remote requests are permitted.
    await context.route('**/*', route => route.abort())
    const page = await context.newPage()
    await page.setContent(html, { waitUntil: 'load' })
    await page.evaluate(async () => {
      await document.fonts.ready
      await Promise.all([...document.images].map(image => image.decode()))
    })
    const layout = await page.evaluate(() => ({
      fonts: [...document.fonts].every(font => font.status === 'loaded'),
      overflow: [...document.querySelectorAll('h1, p, footer, header')].some(element => element.scrollWidth > element.clientWidth),
      clipped: [...document.querySelectorAll('h1, p, footer, header')].some(element => {
        const rect = element.getBoundingClientRect()
        return rect.x < 0 || rect.y < 0 || rect.right > 1200 || rect.bottom > 630
      }),
    }))
    assert.deepEqual(layout, { fonts: true, overflow: false, clipped: false }, `${locale}: font/layout failure`)
    const png = await page.screenshot({ type: 'png', animations: 'disabled' })
    assert.equal(png.readUInt32BE(16), 1200)
    assert.equal(png.readUInt32BE(20), 630)
    const hash = createHash('sha256').update(png).digest('hex').slice(0, 12)
    const path = `/social/oz-${locale}-${hash}.png`
    const plainHeadline = t.headline.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim()
    manifest[locale] = { path, width: 1200, height: 630, type: 'image/png', alt: `${t.name} — ${plainHeadline} ${t.eyebrow}` }
    const target = new URL(`public${path}`, root)
    if (check) assert.deepEqual(await readFile(target), png, `${locale}: generated asset differs`)
    else {
      await mkdir(new URL('public/social/', root), { recursive: true })
      await writeFile(target, png)
    }
    console.log(`${check ? 'Verified' : 'Generated'} ${fileURLToPath(target)}`)
    await context.close()
  }
  const target = new URL('src/content/social-images.json', root)
  const json = `${JSON.stringify(manifest, null, 2)}\n`
  if (check) assert.equal(await readFile(target, 'utf8'), json, 'Generated manifest differs')
  else await writeFile(target, json)
} finally {
  await browser.close()
}
