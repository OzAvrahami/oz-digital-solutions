'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'

import ButtonLink from '@/components/ui/ButtonLink'
import LanguageSwitcher from '@/components/ui/LanguageSwitcher'
import type { SiteDictionary } from '@/content'
import type { Locale } from '@/lib/i18n'

export interface HeaderNavigationItem {
  key: string
  label: string
  href: string
}

interface MobileMenuProps {
  locale: Locale
  identityName: string
  labels: SiteDictionary['header']
  primaryCta: string
  contactHref: string
  navigationItems: readonly HeaderNavigationItem[]
}

const focusableSelector = [
  'a[href]',
  'button:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(',')

export default function MobileMenu({
  locale,
  identityName,
  labels,
  primaryCta,
  contactHref,
  navigationItems,
}: MobileMenuProps) {
  const [open, setOpen] = useState(false)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const dialogRef = useRef<HTMLDivElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!open) return

    const trigger = triggerRef.current
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        setOpen(false)
        return
      }

      if (event.key !== 'Tab') return

      const focusable = Array.from(
        dialogRef.current?.querySelectorAll<HTMLElement>(focusableSelector) ?? [],
      ).filter((element) => !element.hasAttribute('disabled'))

      if (focusable.length === 0) {
        event.preventDefault()
        return
      }

      const first = focusable[0]
      const last = focusable[focusable.length - 1]

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    const handleDesktopBreakpoint = (event: MediaQueryListEvent) => {
      if (event.matches) setOpen(false)
    }

    const desktopQuery = window.matchMedia('(min-width: 1024px)')
    document.addEventListener('keydown', handleKeyDown)
    desktopQuery.addEventListener('change', handleDesktopBreakpoint)

    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', handleKeyDown)
      desktopQuery.removeEventListener('change', handleDesktopBreakpoint)
      trigger?.focus()
    }
  }, [open])

  const closeMenu = () => setOpen(false)

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        aria-label={labels.menuLabel}
        aria-expanded={open}
        aria-controls="mobile-menu"
        onClick={() => setOpen(true)}
        className="inline-flex size-11 items-center justify-center rounded-[10px] border border-white/15 text-text lg:hidden"
      >
        <span className="relative block h-3.5 w-[18px]" aria-hidden="true">
          <span className="absolute inset-x-0 top-0 h-0.5 bg-current" />
          <span className="absolute inset-x-0 top-1.5 h-0.5 bg-current" />
          <span className="absolute inset-x-0 top-3 h-0.5 bg-current" />
        </span>
      </button>

      {open ? (
        <div
          ref={dialogRef}
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label={labels.menuLabel}
          className="fixed inset-0 z-[70] flex flex-col overflow-y-auto bg-section/95 px-[22px] pb-10 pt-5 backdrop-blur-xl lg:hidden"
        >
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-[11px] text-lg font-bold text-text">
              <span className="size-[9px] rounded-full bg-accent shadow-[0_0_16px_rgba(77,125,255,0.7)]" aria-hidden="true" />
              {identityName}
            </span>
            <button
              ref={closeRef}
              type="button"
              aria-label={labels.closeMenuLabel}
              onClick={closeMenu}
              className="inline-flex size-11 items-center justify-center rounded-[10px] border border-white/15 text-xl text-text"
            >
              <span aria-hidden="true">×</span>
            </button>
          </div>

          <nav aria-label={labels.menuLabel} className="mt-9 flex flex-col">
            {navigationItems.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                onClick={closeMenu}
                className="border-b border-white/[0.07] py-[13px] text-[26px] font-bold text-text"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <ButtonLink
            href={contactHref}
            onClick={closeMenu}
            className="mt-7 w-full py-[17px] text-[17px]"
          >
            {primaryCta}
          </ButtonLink>

          <div className="mt-6">
            <LanguageSwitcher
              locale={locale}
              labels={labels}
              longEnglishLabel
              onNavigate={closeMenu}
            />
          </div>
        </div>
      ) : null}
    </>
  )
}
