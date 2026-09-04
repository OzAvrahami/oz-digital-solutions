import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import ServicePage from '@/components/revenue/ServicePage'
import { getDictionary, isLocale, locales } from '@/lib/i18n'
import { createLocalizedMetadata } from '@/lib/metadata'
import { getRevenueDictionary, isServiceSlug, serviceSlugs } from '@/content/revenue'

interface ServiceRouteProps {
  params: Promise<{ locale: string; service: string }>
}

export const dynamicParams = false

export function generateStaticParams() {
  return locales.flatMap((locale) => serviceSlugs.map((service) => ({ locale, service })))
}

export async function generateMetadata({ params }: ServiceRouteProps): Promise<Metadata> {
  const { locale, service } = await params

  if (!isLocale(locale) || !isServiceSlug(service)) notFound()

  const content = getRevenueDictionary(locale).services[service]
  return createLocalizedMetadata({
    locale,
    pathname: `/services/${service}`,
    title: content.metadata.title,
    description: content.metadata.description,
  })
}

export default async function ServiceRoute({ params }: ServiceRouteProps) {
  const { locale, service } = await params

  if (!isLocale(locale) || !isServiceSlug(service)) notFound()

  const dictionary = getDictionary(locale)
  const revenue = getRevenueDictionary(locale)

  return <ServicePage locale={locale} dictionary={dictionary} revenue={revenue} service={revenue.services[service]} />
}
