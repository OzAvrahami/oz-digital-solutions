'use client'

import SectionLink from '@/components/layout/SectionLink'

import { useEffect, useRef, useState } from 'react'
import { flowCopy, flowNavigation } from '@/content/flow'
import type { Locale } from '@/lib/i18n'
import Icon from './Icon'

export default function Navigation({ locale }: { locale: Locale }) {
  const t = flowCopy[locale]
  const [open, setOpen] = useState(false)
  const toggle = useRef<HTMLButtonElement>(null)
  const root = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const media = window.matchMedia('(min-width: 761px)')
    const dismiss = () => setOpen(false)
    const key = (event: KeyboardEvent) => { if (event.key === 'Escape') { setOpen(false); toggle.current?.focus() } }
    const outside = (event: PointerEvent) => { if (!root.current?.contains(event.target as Node)) dismiss() }
    if (open) { document.addEventListener('keydown', key); document.addEventListener('pointerdown', outside) }
    media.addEventListener('change', dismiss)
    return () => { document.removeEventListener('keydown', key); document.removeEventListener('pointerdown', outside); media.removeEventListener('change', dismiss) }
  }, [open])
  return <div ref={root} className="mobile-navigation"><button ref={toggle} className="menu-toggle" aria-expanded={open} aria-controls="mobile-menu" aria-label={open ? t.closeMenu : t.menu} onClick={() => setOpen(value => !value)}><Icon name={open ? 'close' : 'menu'} /></button>{open && <nav className="mobile-nav open" id="mobile-menu" aria-label={locale === 'he' ? 'ניווט במובייל' : 'Mobile navigation'}>{flowNavigation.map((id, i) => <SectionLink href={`/${locale}#${id}`} key={id} onClick={() => setOpen(false)}>{t.nav[i]}</SectionLink>)}<SectionLink href={`/${locale}#contact`} onClick={() => setOpen(false)}>{t.talk}</SectionLink></nav>}</div>
}
