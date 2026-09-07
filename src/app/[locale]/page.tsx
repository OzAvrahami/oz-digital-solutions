import { notFound } from 'next/navigation'
import FlowHome from '@/components/flow/FlowHome'
import { getDictionary, isLocale } from '@/lib/i18n'

export default async function LocalePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()
  return <FlowHome locale={locale} dictionary={getDictionary(locale)} />
}
