import type { Metadata } from 'next'

import { getSiteUrl, siteConfig } from '@/config/site'
import type { Locale } from '@/lib/i18n'

interface LocalizedMetadataOptions {
  locale: Locale
  pathname: string
  title: string
  description: string
  type?: 'website' | 'article'
}

export function createLocalizedMetadata({
  locale,
  pathname,
  title,
  description,
  type = 'website',
}: LocalizedMetadataOptions): Metadata {
  const localizedPath = `/${locale}${pathname}`
  const canonicalUrl = getSiteUrl(localizedPath)
  const openGraphImageUrl = getSiteUrl(`/${locale}/opengraph-image`)

  return {
    metadataBase: new URL(siteConfig.productionSiteUrl),
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        he: getSiteUrl(`/he${pathname}`),
        en: getSiteUrl(`/en${pathname}`),
      },
    },
    openGraph: {
      type,
      siteName: 'Oz Avrahami',
      title,
      description,
      url: canonicalUrl,
      locale: locale === 'he' ? 'he_IL' : 'en_US',
      alternateLocale: [locale === 'he' ? 'en_US' : 'he_IL'],
      images: [
        {
          url: openGraphImageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [{ url: openGraphImageUrl, alt: title }],
    },
  }
}
