'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useSyncExternalStore } from 'react'

import type { SiteDictionary } from '@/content'
import type { Locale } from '@/lib/i18n'

interface LanguageSwitcherProps {
  locale: Locale
  labels: SiteDictionary['header']
  longEnglishLabel?: boolean
  onNavigate?: () => void
}

function subscribeToHash(onStoreChange: () => void) {
  window.addEventListener('hashchange', onStoreChange)
  return () => window.removeEventListener('hashchange', onStoreChange)
}

function getSupportedHash() {
  return /^#[A-Za-z0-9_-]+$/.test(window.location.hash) ? window.location.hash : ''
}

function getServerHash() {
  return ''
}

export default function LanguageSwitcher({
  locale,
  labels,
  longEnglishLabel = false,
  onNavigate,
}: LanguageSwitcherProps) {
  const pathname = usePathname()
  const currentHash = useSyncExternalStore(subscribeToHash, getSupportedHash, getServerHash)
  const options = [
    { locale: 'he' as const, label: labels.hebrewLabel },
    {
      locale: 'en' as const,
      label: longEnglishLabel ? labels.englishLongLabel : labels.englishShortLabel,
    },
  ]

  return (
    <div
      role="group"
      aria-label={labels.languageLabel}
      className="flex items-center gap-2 font-mono text-sm"
    >
      {options.map((option, index) => (
        <span key={option.locale} className="contents">
          {index > 0 ? <span aria-hidden="true" className="text-white/20">/</span> : null}
          {option.locale === locale ? (
            <span aria-current="page" className="font-semibold text-text">
              {option.label}
            </span>
          ) : (
            <Link
              href={`/${option.locale}${pathname.replace(/^\/(he|en)/, '')}${currentHash}`}
              onClick={onNavigate}
              className="rounded text-text-quiet transition-colors hover:text-text focus-visible:text-text"
              hrefLang={option.locale}
            >
              {option.label}
            </Link>
          )}
        </span>
      ))}
    </div>
  )
}
