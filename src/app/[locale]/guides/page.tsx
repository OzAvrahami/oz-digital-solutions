import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import GuidesIndex from '@/components/revenue/GuidesIndex'
import { getRevenueDictionary } from '@/content/revenue'
import { getDictionary, isLocale } from '@/lib/i18n'
import { createLocalizedMetadata } from '@/lib/metadata'

interface GuidesRouteProps {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: GuidesRouteProps): Promise<Metadata> {
  const { locale } = await params
  if (!isLocale(locale)) notFound()

  const content = getRevenueDictionary(locale).guidesIndex
  return createLocalizedMetadata({
    locale,
    pathname: '/guides',
    title: content.metadata.title,
    description: content.metadata.description,
  })
}

export default async function GuidesRoute({ params }: GuidesRouteProps) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()

  return <GuidesIndex locale={locale} dictionary={getDictionary(locale)} revenue={getRevenueDictionary(locale)} />
}
