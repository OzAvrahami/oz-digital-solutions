import type { Metadata } from 'next'
import { Heebo, IBM_Plex_Mono } from 'next/font/google'
import { notFound } from 'next/navigation'

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

  return {
    title: dictionary.metadata.title,
    description: dictionary.metadata.description,
    authors: [{ name: dictionary.identity.name }],
    alternates: {
      languages: {
        he: '/he',
        en: '/en',
      },
    },
  }
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = await params

  if (!isLocale(locale)) notFound()

  return (
    <html lang={locale} dir={getDirection(locale)}>
      <body className={`${heebo.variable} ${ibmPlexMono.variable} bg-canvas font-heebo text-text antialiased`}>
        {children}
      </body>
    </html>
  )
}
