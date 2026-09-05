import { notFound } from 'next/navigation'
import StudioHome from '@/components/studio/StudioHome'
import { getDictionary, isLocale } from '@/lib/i18n'

export default async function LocalePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()
  return <StudioHome locale={locale} dictionary={getDictionary(locale)} />
}
