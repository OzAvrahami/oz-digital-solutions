import type { Metadata } from 'next'
import { Heebo, IBM_Plex_Mono } from 'next/font/google'
import { notFound } from 'next/navigation'

import GoogleAnalytics from '@/components/analytics/GoogleAnalytics'
import PortfolioStructuredData from '@/components/seo/PortfolioStructuredData'
import { getSiteUrl, siteConfig } from '@/config/site'
import { getDictionary, getDirection, isLocale, locales } from '@/lib/i18n'

import '../globals.css'

const heebo = Heebo({
  subsets: ['hebrew', 'latin'],
  weight: 'variable',
  variable: '--font-heebo',
  display: 'swap',
})

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-ibm-plex-mono',
  display: 'swap',
})

const impactSiteVerification = {
  name: 'impact-site-verification',
  value: '7a3491ac-fb9c-427e-a0ab-1cdbed824e88',
}

interface LocaleLayoutProps {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}

export const dynamicParams = false

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export async function generateMetadata({ params }: LocaleLayoutProps): Promise<Metadata> {
  const { locale } = await params

  if (!isLocale(locale)) notFound()

  const dictionary = getDictionary(locale)
  const canonicalUrl = getSiteUrl(`/${locale}`)
  const hebrewUrl = getSiteUrl('/he')
  const englishUrl = getSiteUrl('/en')
  const openGraphImageUrl = getSiteUrl(`/${locale}/opengraph-image`)
  const openGraphLocale = locale === 'he' ? 'he_IL' : 'en_US'
  const alternateOpenGraphLocale = locale === 'he' ? 'en_US' : 'he_IL'

  return {
    metadataBase: new URL(siteConfig.productionSiteUrl),
    title: dictionary.metadata.title,
    description: dictionary.metadata.description,
    applicationName: 'Oz Avrahami',
    authors: [{ name: 'Oz Avrahami', url: siteConfig.productionSiteUrl }],
    creator: 'Oz Avrahami',
    publisher: 'Oz Avrahami',
    alternates: {
      canonical: canonicalUrl,
      languages: {
        he: hebrewUrl,
        en: englishUrl,
      },
    },
    openGraph: {
      type: 'website',
      siteName: 'Oz Avrahami',
      title: dictionary.metadata.title,
      description: dictionary.metadata.description,
      url: canonicalUrl,
      locale: openGraphLocale,
      alternateLocale: [alternateOpenGraphLocale],
      images: [
        {
          url: openGraphImageUrl,
          width: 1200,
          height: 630,
          alt: dictionary.metadata.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: dictionary.metadata.title,
      description: dictionary.metadata.description,
      images: [
        {
          url: openGraphImageUrl,
          alt: dictionary.metadata.title,
        },
      ],
    },
    icons: {
      icon: [{ url: getSiteUrl('/icon.svg'), type: 'image/svg+xml' }],
      shortcut: [getSiteUrl('/icon.svg')],
    },
  }
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = await params

  if (!isLocale(locale)) notFound()

  return (
    <html lang={locale} dir={getDirection(locale)}>
      <head>
        <meta {...impactSiteVerification} />
      </head>
      <body className={`${heebo.variable} ${ibmPlexMono.variable} bg-canvas font-heebo text-text antialiased`}>
        <PortfolioStructuredData />
        {children}
        <GoogleAnalytics measurementId={siteConfig.googleAnalyticsMeasurementId} />
      </body>
    </html>
  )
}
