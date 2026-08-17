'use server'

import { Resend } from 'resend'

import { siteConfig } from '@/config/site'
import { getDictionary, isLocale, type Locale } from '@/lib/i18n'

export type ContactField = 'name' | 'contact' | 'message'

export interface ContactFormResult {
  status: 'idle' | 'error' | 'success'
  message: string
  fieldErrors?: Partial<Record<ContactField, string>>
}

const limits = {
  name: 100,
  contact: 200,
  message: 4000,
} as const

const unsupportedControlCharacters = /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function readText(formData: FormData, key: string, multiline = false) {
  const value = formData.get(key)
  if (typeof value !== 'string') return ''

  const normalized = value.normalize('NFKC').trim()
  return multiline
    ? normalized.replace(/\r\n?/g, '\n')
    : normalized.replace(/\s+/g, ' ')
}

function validateSubmission(locale: Locale, formData: FormData) {
  const dictionary = getDictionary(locale)
  const messages = dictionary.contact.form.validation
  const values = {
    name: readText(formData, 'name'),
    contact: readText(formData, 'contact'),
    message: readText(formData, 'message', true),
  }
  const fieldErrors: Partial<Record<ContactField, string>> = {}

  if (!values.name) fieldErrors.name = messages.nameRequired
  else if (values.name.length > limits.name) fieldErrors.name = messages.nameTooLong
  else if (unsupportedControlCharacters.test(values.name)) fieldErrors.name = messages.invalidCharacters

  if (!values.contact) fieldErrors.contact = messages.contactRequired
  else if (values.contact.length > limits.contact) fieldErrors.contact = messages.contactTooLong
  else if (unsupportedControlCharacters.test(values.contact)) fieldErrors.contact = messages.invalidCharacters

  if (!values.message) fieldErrors.message = messages.messageRequired
  else if (values.message.length > limits.message) fieldErrors.message = messages.messageTooLong
  else if (unsupportedControlCharacters.test(values.message)) fieldErrors.message = messages.invalidCharacters

  return { values, fieldErrors }
}

export async function submitContactForm(
  localeValue: string,
  formData: FormData,
): Promise<ContactFormResult> {
  const locale: Locale = isLocale(localeValue) ? localeValue : 'en'
  const formContent = getDictionary(locale).contact.form
  const honeypot = readText(formData, 'website')

  if (honeypot) {
    return { status: 'error', message: formContent.submissionErrorMessage }
  }

  const { values, fieldErrors } = validateSubmission(locale, formData)

  if (Object.keys(fieldErrors).length > 0) {
    return {
      status: 'error',
      message: formContent.validationMessage,
      fieldErrors,
    }
  }

  const apiKey = process.env.RESEND_API_KEY?.trim()

  if (!apiKey) {
    return { status: 'error', message: formContent.configurationErrorMessage }
  }

  try {
    const resend = new Resend(apiKey)
    const replyTo = emailPattern.test(values.contact) ? values.contact : undefined
    const { data, error } = await resend.emails.send({
      from: `${siteConfig.contactDelivery.senderName} <${siteConfig.contactDelivery.senderEmail}>`,
      to: siteConfig.contactDelivery.recipientEmail,
      replyTo,
      subject: `Portfolio contact · ${values.name}`,
      text: [
        'New portfolio contact submission',
        `Language: ${locale}`,
        `Name: ${values.name}`,
        `Preferred contact: ${values.contact}`,
        '',
        'Project or message:',
        values.message,
      ].join('\n'),
    })

    if (error || !data?.id) {
      return { status: 'error', message: formContent.submissionErrorMessage }
    }

    return { status: 'success', message: formContent.successMessage }
  } catch {
    return { status: 'error', message: formContent.submissionErrorMessage }
  }
}
