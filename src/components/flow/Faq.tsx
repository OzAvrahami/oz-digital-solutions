'use client'

import { useState } from 'react'
import { flowCopy } from '@/content/flow'
import type { Locale } from '@/lib/i18n'
import Icon from './Icon'

export default function Faq({ locale }: { locale: Locale }) {
  const [open, setOpen] = useState<number | null>(0)
  return <div className="faq-list reveal">{flowCopy[locale].faqs.map(([question, answer], i) => <div className="faq-item" key={question}><h3><button className="faq-question" id={`faq-q-${i}`} aria-expanded={open === i} aria-controls={`faq-a-${i}`} onClick={() => setOpen(open === i ? null : i)}><span>{question}</span><span className="faq-plus"><Icon name="plus" /></span></button></h3><div className={`faq-answer ${open === i ? 'open' : ''}`} id={`faq-a-${i}`} role="region" aria-labelledby={`faq-q-${i}`} hidden={open !== i}><div><p>{answer}</p></div></div></div>)}</div>
}
