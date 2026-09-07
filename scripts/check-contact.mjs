// Exercises the real server action with a stub delivery transport. No network or secrets.
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import vm from 'node:vm'
import ts from 'typescript'

const cache = new Map()
const sent = []
let response = { data: { id: 'local-test' }, error: null }
let throws = false
const environment = { RESEND_API_KEY: 'isolated-test-only' }
class FakeResend {
  emails = { send: async payload => { sent.push(payload); if (throws) throw new Error('Simulated transport error'); return response } }
}
function load(path) {
  const filename = resolve(path)
  if (cache.has(filename)) return cache.get(filename)
  const loaded = { exports: {} }
  cache.set(filename, loaded.exports)
  const require = name => {
    if (name === 'resend') return { Resend: FakeResend }
    const target = name.startsWith('@/') ? resolve('src', name.slice(2)) : resolve(dirname(filename), name)
    try { return load(`${target}.ts`) } catch (error) { if (error.code !== 'ENOENT') throw error; return load(`${target}/index.ts`) }
  }
  const { outputText } = ts.transpileModule(readFileSync(filename, 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } })
  vm.runInNewContext(outputText, { exports: loaded.exports, require, process: { env: environment }, FormData })
  return loaded.exports
}
const { submitContactForm } = load('src/app/[locale]/actions.ts')
const { getDictionary } = load('src/lib/i18n.ts')
const form = overrides => {
  const data = new FormData()
  for (const [key, value] of Object.entries({ name: 'Local QA', contact: 'qa@example.invalid', message: 'Isolated transport test', website: '', ...overrides })) data.set(key, value)
  return data
}
for (const locale of ['he', 'en']) {
  const copy = getDictionary(locale).contact.form
  const count = sent.length
  const invalid = await submitContactForm(locale, form({ name: '', contact: '', message: '' }))
  assert.equal(invalid.status, 'error')
  assert.equal(Object.keys(invalid.fieldErrors).length, 3)
  for (const field of ['name', 'contact', 'message']) {
    assert.ok((await submitContactForm(locale, form({ [field]: 'x'.repeat(4001) }))).fieldErrors[field])
    assert.ok((await submitContactForm(locale, form({ [field]: '\u0001' }))).fieldErrors[field])
  }
  assert.equal((await submitContactForm(locale, form({ website: 'bot' }))).message, copy.submissionErrorMessage)
  assert.equal(sent.length, count)
  environment.RESEND_API_KEY = ''
  assert.equal((await submitContactForm(locale, form())).message, copy.configurationErrorMessage)
  assert.equal(sent.length, count)
  environment.RESEND_API_KEY = 'isolated-test-only'
  assert.equal((await submitContactForm(locale, form())).message, copy.successMessage)
  assert.equal(sent.at(-1).replyTo, 'qa@example.invalid')
  assert.equal((await submitContactForm(locale, form({ contact: 'phone', name: '  Local   QA  ' }))).status, 'success')
  assert.equal(sent.at(-1).replyTo, undefined)
  assert.ok(sent.at(-1).text.includes('Name: Local QA'))
  response = { data: null, error: { message: 'Rejected' } }
  assert.equal((await submitContactForm(locale, form())).message, copy.submissionErrorMessage)
  throws = true
  assert.equal((await submitContactForm(locale, form())).message, copy.submissionErrorMessage)
  throws = false
  response = { data: { id: 'local-test' }, error: null }
}
assert.equal((await submitContactForm('invalid', form({ name: '' }))).message, getDictionary('en').contact.form.validationMessage)
console.log('PASS: bilingual real-action validation, limits, control characters, honeypot, locale fallback, normalization, configuration, success and transport failures. Delivery stubbed; no network used.')
