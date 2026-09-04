import type { Locale } from '@/lib/i18n'

type Gtag = (command: 'event', eventName: string, parameters: Record<string, string>) => void

declare global {
  interface Window {
    dataLayer?: unknown[]
    gtag?: Gtag
  }
}

interface AffiliateClickContext {
  isAffiliate: boolean
  provider: string
  destinationUrl: string
  pagePath: string
  locale: Locale
}

const localHostnames = new Set(['localhost', '127.0.0.1', '::1'])

function canTrackAnalytics() {
  return process.env.NODE_ENV === 'production'
    && typeof window !== 'undefined'
    && !localHostnames.has(window.location.hostname)
    && typeof window.gtag === 'function'
}

export function trackPageView() {
  if (!canTrackAnalytics()) return

  window.gtag?.('event', 'page_view', {
    page_path: `${window.location.pathname}${window.location.search}`,
    page_location: window.location.href,
    page_title: document.title,
  })
}

export function trackAffiliateClick({
  isAffiliate,
  provider,
  destinationUrl,
  pagePath,
  locale,
}: AffiliateClickContext) {
  if (!isAffiliate || !canTrackAnalytics()) return

  window.gtag?.('event', 'affiliate_click', {
    provider,
    destination_url: destinationUrl,
    page_path: pagePath,
    locale,
  })
}
