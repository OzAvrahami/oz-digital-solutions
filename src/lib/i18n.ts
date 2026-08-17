import { dictionaries, type SiteDictionary } from '@/content'

export const locales = ['he', 'en'] as const

export type Locale = (typeof locales)[number]
export type TextDirection = 'rtl' | 'ltr'

export const defaultLocale: Locale = 'he'

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale)
}

export function getDictionary(locale: Locale): SiteDictionary {
  return dictionaries[locale]
}

export function getDirection(locale: Locale): TextDirection {
  return locale === 'he' ? 'rtl' : 'ltr'
}

export function getAlternateLocale(locale: Locale): Locale {
  return locale === 'he' ? 'en' : 'he'
}
