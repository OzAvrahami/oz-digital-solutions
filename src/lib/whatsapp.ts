import type { Locale } from '@/lib/i18n'

export const whatsappCopy = {
  he: {
    label: 'דברו איתי בוואטסאפ',
    message: 'היי עוז, הגעתי דרך האתר ואשמח לדבר איתך על הפרויקט שלי.',
  },
  en: {
    label: 'Chat with me on WhatsApp',
    message: 'Hi Oz, I found your website and would like to discuss my project.',
  },
} satisfies Record<Locale, { label: string; message: string }>

export function normalizeWhatsAppNumber(number: string | null | undefined): string | null {
  if (!number || !/^\+?[\d\s()-]+$/.test(number.trim())) return null

  const digits = number.replace(/[\s()+-]/g, '')
  // Require an international number; never guess a country code or strip a trunk prefix.
  return /^[1-9]\d{7,14}$/.test(digits) ? digits : null
}

export function getWhatsAppHref(number: string | null | undefined, locale: Locale): string | null {
  const digits = normalizeWhatsAppNumber(number)
  return digits ? `https://wa.me/${digits}?text=${encodeURIComponent(whatsappCopy[locale].message)}` : null
}
