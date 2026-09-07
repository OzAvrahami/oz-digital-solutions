import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import vm from 'node:vm'
import ts from 'typescript'

function loadModule(path, globals = {}) {
  const source = readFileSync(new URL(path, import.meta.url), 'utf8')
  const { outputText } = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
  })
  const context = { exports: {}, ...globals }
  vm.runInNewContext(outputText, context)
  return context.exports
}

const { getWhatsAppHref, normalizeWhatsAppNumber, whatsappCopy } = loadModule('../src/lib/whatsapp.ts')
const { siteConfig } = loadModule('../src/config/site.ts')

for (const invalid of [null, undefined, '', '  ', 'not configured', '+', '0000000000', '+0000000000', '1'.repeat(16), '123/456']) {
  assert.equal(normalizeWhatsAppNumber(invalid), null)
  for (const locale of ['he', 'en']) assert.equal(getWhatsAppHref(invalid, locale), null)
}

const expectedMessages = {
  he: 'היי עוז, הגעתי דרך האתר ואשמח לדבר איתך על הפרויקט שלי.',
  en: 'Hi Oz, I found your website and would like to discuss my project.',
}
for (const locale of ['he', 'en']) {
  assert.equal(whatsappCopy[locale].message, expectedMessages[locale])
  const href = getWhatsAppHref(siteConfig.whatsappNumber, locale)
  if (siteConfig.whatsappNumber !== null) {
    assert.ok(href, 'Configured number must be valid')
    const url = new URL(href)
    assert.equal(url.origin, 'https://wa.me')
    assert.equal(url.pathname, `/${siteConfig.whatsappNumber}`)
    assert.equal(url.searchParams.get('text'), expectedMessages[locale])
    assert.equal(url.search, `?text=${encodeURIComponent(expectedMessages[locale])}`)
    assert.equal(normalizeWhatsAppNumber(`+${siteConfig.whatsappNumber}`), siteConfig.whatsappNumber)
  } else {
    assert.equal(href, null)
  }
}

const calls = []
const window = {
  location: { hostname: 'ozavrahami.co.il', pathname: '/he/guides/business-website-cost-2026', search: '?private=value' },
  gtag: (...args) => calls.push(args),
}
const { trackWhatsAppClick } = loadModule('../src/lib/analytics.ts', { window, process: { env: { NODE_ENV: 'production' } } })
for (const locale of ['he', 'en']) {
  for (const placement of ['contact', 'floating']) {
    window.location.pathname = `/${locale}/guides/business-website-cost-2026`
    trackWhatsAppClick(locale, placement)
    assert.deepEqual(JSON.parse(JSON.stringify(calls.at(-1))), ['event', 'whatsapp_click', {
      locale,
      page_path: window.location.pathname,
      button_placement: placement,
    }])
  }
}
assert.equal(calls.length, 4)
window.gtag = undefined
assert.doesNotThrow(() => trackWhatsAppClick('he', 'contact'))
window.gtag = () => { throw new Error('Analytics unavailable') }
assert.doesNotThrow(() => trackWhatsAppClick('en', 'floating'))
window.gtag = (...args) => calls.push(args)
window.location.hostname = 'localhost'
trackWhatsAppClick('en', 'floating')
assert.equal(calls.length, 4, 'Local browser checks must not send production analytics')

console.log('PASS: invalid configuration, localized copy, exact click payload, query exclusion, analytics failure isolation, localhost suppression.')
console.log(siteConfig.whatsappNumber === null
  ? 'PENDING: owner-confirmed number; destination and enabled-link checks cannot run yet.'
  : 'PASS: configured international destination and exact message encoding in both locales.')
