import type { Locale } from '@/lib/i18n'

import { revenueEn } from './en'
import { revenueHe } from './he'
import type { GuideSlug, RevenueDictionary, ServiceSlug } from './types'

const revenueDictionaries = {
  he: revenueHe,
  en: revenueEn,
} as const satisfies Record<Locale, RevenueDictionary>

export const serviceSlugs = ['websites', 'ecommerce', 'automation'] as const satisfies readonly ServiceSlug[]
export const guideSlugs = [
  'shopify-vs-woocommerce-israel',
  'business-website-cost-2026',
  'small-business-automations',
] as const satisfies readonly GuideSlug[]

export function getRevenueDictionary(locale: Locale): RevenueDictionary {
  return revenueDictionaries[locale]
}

export function isServiceSlug(value: string): value is ServiceSlug {
  return serviceSlugs.includes(value as ServiceSlug)
}

export function isGuideSlug(value: string): value is GuideSlug {
  return guideSlugs.includes(value as GuideSlug)
}

export type { GuideContent, GuideSlug, RevenueDictionary, ServicePageContent, ServiceSlug } from './types'
