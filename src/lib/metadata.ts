import type { Metadata } from 'next'

import { getSiteUrl, siteConfig } from '@/config/site'
import socialImages from '@/content/social-images.json'
import type { Locale } from '@/lib/i18n'

export function getSocialImage(locale: Locale) {
  const { path, ...image } = socialImages[locale]
  return { ...image, url: getSiteUrl(path) }
}

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
  const socialImage = getSocialImage(locale)

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
      images: [socialImage],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [{ url: socialImage.url, alt: socialImage.alt }],
    },
  }
}
