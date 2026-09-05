'use client'

import { useRef, useState, type FormEvent } from 'react'

import {
  submitContactForm,
  type ContactFormResult,
  type ContactField,
} from '@/app/[locale]/actions'
import type { SiteDictionary } from '@/content'
import type { Locale } from '@/lib/i18n'

interface ContactFormProps {
  locale: Locale
  content: SiteDictionary['contact']['form']
}

const initialResult: ContactFormResult = {
  status: 'idle',
  message: '',
}

const fieldClassName = 'studio-form-field w-full rounded-[8px] border px-4 py-[15px] text-base focus:outline-none focus:ring-[3px] disabled:cursor-not-allowed disabled:opacity-60'

export default function ContactForm({ locale, content }: ContactFormProps) {
  const [result, setResult] = useState<ContactFormResult>(initialResult)
  const [pending, setPending] = useState(false)
  const submissionInFlight = useRef(false)

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (submissionInFlight.current) return

    const form = event.currentTarget

    submissionInFlight.current = true
    setPending(true)
    setResult(initialResult)

    try {
      const nextResult = await submitContactForm(locale, new FormData(form))
      setResult(nextResult)
      if (nextResult.status === 'success') form.reset()
    } catch {
      setResult({ status: 'error', message: content.submissionErrorMessage })
    } finally {
      submissionInFlight.current = false
      setPending(false)
    }
  }

  if (result.status === 'success') {
    return (
      <div
        role="status"
        aria-live="polite"
        className="studio-form-success mx-auto mt-10 flex max-w-[560px] items-center gap-4 rounded-2xl border p-6 text-start desktop:p-10"
      >
        <span
          aria-hidden="true"
          className="studio-form-success-icon inline-flex size-11 shrink-0 items-center justify-center rounded-full text-[22px]"
        >
          ✓
        </span>
        <span className="studio-form-success-message text-[17px] font-medium">{result.message}</span>
      </div>
    )
  }

  const errorFor = (field: ContactField) => result.fieldErrors?.[field]

  return (
    <form
      noValidate
      onSubmit={handleSubmit}
      className="studio-contact-form-fields mx-auto mt-10 flex max-w-[560px] flex-col gap-5 text-start"
    >
      <div aria-hidden="true" className="sr-only">
        <label htmlFor={`website-${locale}`}>Website</label>
        <input
          id={`website-${locale}`}
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      {result.status === 'error' ? (
        <p
          role="alert"
          className="studio-form-alert rounded-[8px] border px-4 py-3 text-sm"
        >
          {result.message}
        </p>
      ) : null}

      <div className="flex flex-col gap-[9px]">
        <label htmlFor={`contact-name-${locale}`} className="studio-form-label text-sm font-medium">
          {content.nameLabel}
        </label>
        <input
          id={`contact-name-${locale}`}
          name="name"
          type="text"
          required
          maxLength={100}
          disabled={pending}
          placeholder={content.namePlaceholder}
          aria-invalid={Boolean(errorFor('name'))}
          aria-describedby={errorFor('name') ? `contact-name-error-${locale}` : undefined}
          className={fieldClassName}
        />
        {errorFor('name') ? (
          <p id={`contact-name-error-${locale}`} className="studio-form-error text-sm">
            {errorFor('name')}
          </p>
        ) : null}
      </div>

      <div className="flex flex-col gap-[9px]">
        <label htmlFor={`contact-details-${locale}`} className="studio-form-label text-sm font-medium">
          {content.contactLabel}
        </label>
        <input
          id={`contact-details-${locale}`}
          name="contact"
          type="text"
          dir="auto"
          required
          maxLength={200}
          disabled={pending}
          placeholder={content.contactPlaceholder}
          aria-invalid={Boolean(errorFor('contact'))}
          aria-describedby={errorFor('contact') ? `contact-details-error-${locale}` : undefined}
          className={fieldClassName}
        />
        {errorFor('contact') ? (
          <p id={`contact-details-error-${locale}`} className="studio-form-error text-sm">
            {errorFor('contact')}
          </p>
        ) : null}
      </div>

      <div className="flex flex-col gap-[9px]">
        <label htmlFor={`contact-message-${locale}`} className="studio-form-label text-sm font-medium">
          {content.messageLabel}
        </label>
        <textarea
          id={`contact-message-${locale}`}
          name="message"
          rows={4}
          required
          maxLength={4000}
          disabled={pending}
          placeholder={content.messagePlaceholder}
          aria-invalid={Boolean(errorFor('message'))}
          aria-describedby={errorFor('message') ? `contact-message-error-${locale}` : undefined}
          className={`${fieldClassName} min-h-[120px] resize-y leading-[1.5]`}
        />
        {errorFor('message') ? (
          <p id={`contact-message-error-${locale}`} className="studio-form-error text-sm">
            {errorFor('message')}
          </p>
        ) : null}
      </div>

      <button
        type="submit"
        disabled={pending}
        className="studio-form-submit inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-4 text-[16.5px] font-semibold text-white transition-colors disabled:cursor-wait disabled:opacity-70"
      >
        {pending ? (
          <span className="size-4 animate-spin rounded-full border-2 border-white/35 border-t-white" aria-hidden="true" />
        ) : null}
        {pending ? content.pendingLabel : content.submitLabel}
      </button>

      <p aria-live="polite" className="studio-form-reassurance text-center text-[13.5px]">
        {pending ? content.pendingLabel : content.reassurance}
      </p>
    </form>
  )
}
