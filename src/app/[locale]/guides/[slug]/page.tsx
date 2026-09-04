import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import GuideArticle from '@/components/revenue/GuideArticle'
import { getRevenueDictionary, guideSlugs, isGuideSlug } from '@/content/revenue'
import { getDictionary, isLocale, locales } from '@/lib/i18n'
import { createLocalizedMetadata } from '@/lib/metadata'

interface GuideRouteProps {
  params: Promise<{ locale: string; slug: string }>
}

export const dynamicParams = false

export function generateStaticParams() {
  return locales.flatMap((locale) => guideSlugs.map((slug) => ({ locale, slug })))
}

export async function generateMetadata({ params }: GuideRouteProps): Promise<Metadata> {
  const { locale, slug } = await params
  if (!isLocale(locale) || !isGuideSlug(slug)) notFound()

  const guide = getRevenueDictionary(locale).guides[slug]
  return createLocalizedMetadata({
    locale,
    pathname: `/guides/${slug}`,
    title: guide.metadata.title,
    description: guide.metadata.description,
    type: 'article',
  })
}

export default async function GuideRoute({ params }: GuideRouteProps) {
  const { locale, slug } = await params
  if (!isLocale(locale) || !isGuideSlug(slug)) notFound()

  const revenue = getRevenueDictionary(locale)
  return <GuideArticle locale={locale} dictionary={getDictionary(locale)} revenue={revenue} guide={revenue.guides[slug]} />
}
