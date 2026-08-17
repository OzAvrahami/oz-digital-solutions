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

const fieldClassName = 'w-full rounded-control border border-white/10 bg-white/[0.03] px-4 py-[15px] text-base text-text placeholder:text-text-quiet focus:border-accent focus:outline-none focus:ring-[3px] focus:ring-accent/25 disabled:cursor-not-allowed disabled:opacity-60'

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
        className="mx-auto mt-10 flex max-w-[560px] items-center gap-4 rounded-2xl border border-success/30 bg-success/[0.06] p-6 text-start desktop:p-10"
      >
        <span
          aria-hidden="true"
          className="inline-flex size-11 shrink-0 items-center justify-center rounded-full bg-success/15 text-[22px] text-success"
        >
          ✓
        </span>
        <span className="text-[17px] font-medium text-[#dbe7e1]">{result.message}</span>
      </div>
    )
  }

  const errorFor = (field: ContactField) => result.fieldErrors?.[field]

  return (
    <form
      noValidate
      onSubmit={handleSubmit}
      className="mx-auto mt-10 flex max-w-[560px] flex-col gap-5 text-start"
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
          className="rounded-control border border-danger/30 bg-danger/[0.07] px-4 py-3 text-sm text-[#ffd8cc]"
        >
          {result.message}
        </p>
      ) : null}

      <div className="flex flex-col gap-[9px]">
        <label htmlFor={`contact-name-${locale}`} className="text-sm font-medium text-[#c4c9d2]">
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
          <p id={`contact-name-error-${locale}`} className="text-sm text-danger">
            {errorFor('name')}
          </p>
        ) : null}
      </div>

      <div className="flex flex-col gap-[9px]">
        <label htmlFor={`contact-details-${locale}`} className="text-sm font-medium text-[#c4c9d2]">
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
          <p id={`contact-details-error-${locale}`} className="text-sm text-danger">
            {errorFor('contact')}
          </p>
        ) : null}
      </div>

      <div className="flex flex-col gap-[9px]">
        <label htmlFor={`contact-message-${locale}`} className="text-sm font-medium text-[#c4c9d2]">
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
          <p id={`contact-message-error-${locale}`} className="text-sm text-danger">
            {errorFor('message')}
          </p>
        ) : null}
      </div>

      <button
        type="submit"
        disabled={pending}
        className="inline-flex w-full items-center justify-center gap-2 rounded-control bg-accent px-6 py-4 text-[16.5px] font-semibold text-white shadow-accent transition-colors hover:bg-accent-hover disabled:cursor-wait disabled:opacity-70"
      >
        {pending ? (
          <span className="size-4 animate-spin rounded-full border-2 border-white/35 border-t-white" aria-hidden="true" />
        ) : null}
        {pending ? content.pendingLabel : content.submitLabel}
      </button>

      <p aria-live="polite" className="text-center text-[13.5px] text-text-muted">
        {pending ? content.pendingLabel : content.reassurance}
      </p>
    </form>
  )
}
