import { notFound } from 'next/navigation'

import Header from '@/components/layout/Header'
import About from '@/components/sections/About'
import CapabilityMarquee from '@/components/sections/CapabilityMarquee'
import Hero from '@/components/sections/Hero'
import Process from '@/components/sections/Process'
import Services from '@/components/sections/Services'
import Technology from '@/components/sections/Technology'
import WhyWorkWithMe from '@/components/sections/WhyWorkWithMe'
import Work from '@/components/sections/Work'
import { getDictionary, isLocale } from '@/lib/i18n'

interface LocalePageProps {
  params: Promise<{ locale: string }>
}

export default async function LocalePage({ params }: LocalePageProps) {
  const { locale } = await params

  if (!isLocale(locale)) notFound()

  const dictionary = getDictionary(locale)

  return (
    <>
      <Header locale={locale} dictionary={dictionary} />
      <main className="min-h-screen overflow-x-clip bg-canvas text-text">
        <Hero locale={locale} dictionary={dictionary} />
        <CapabilityMarquee dictionary={dictionary} />
        <Services locale={locale} dictionary={dictionary} />
        <Work locale={locale} dictionary={dictionary} />
        <Process dictionary={dictionary} />
        <WhyWorkWithMe dictionary={dictionary} />
        <Technology dictionary={dictionary} />
        <About dictionary={dictionary} />
      </main>
    </>
  )
}
