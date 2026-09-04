import Link from 'next/link'

import Footer from '@/components/layout/Footer'
import Header from '@/components/layout/Header'
import Breadcrumbs from '@/components/revenue/Breadcrumbs'
import Container from '@/components/ui/Container'
import type { SiteDictionary } from '@/content'
import { guideSlugs, type RevenueDictionary } from '@/content/revenue'
import type { Locale } from '@/lib/i18n'

interface GuidesIndexProps {
  locale: Locale
  dictionary: SiteDictionary
  revenue: RevenueDictionary
}

export default function GuidesIndex({ locale, dictionary, revenue }: GuidesIndexProps) {
  return (
    <>
      <Header locale={locale} dictionary={dictionary} />
      <main className="min-h-screen overflow-x-clip bg-canvas text-text">
        <section className="relative overflow-hidden border-b border-white/[0.06]">
          <div className="portfolio-hero-grid pointer-events-none absolute inset-0" aria-hidden="true" />
          <div className="portfolio-hero-glow pointer-events-none absolute inset-0" aria-hidden="true" />
          <Container className="relative pb-20 pt-10 desktop:pb-[110px] desktop:pt-14">
            <Breadcrumbs locale={locale} homeLabel={revenue.common.homeLabel} items={[{ label: revenue.common.guidesLabel }]} />
            <div className="mt-14 flex flex-wrap items-center justify-between gap-4">
              <p className="font-mono text-[13px] tracking-[0.12em] text-accent">{'// '}{revenue.guidesIndex.eyebrow}</p>
              <p className="font-mono text-[12px] text-text-quiet">{revenue.guidesIndex.guideCountLabel}</p>
            </div>
            <h1 className="mt-5 max-w-[900px] text-[42px] font-black leading-[1.04] tracking-[-0.025em] desktop:text-[70px]">{revenue.guidesIndex.title}</h1>
            <p className="mt-7 max-w-[720px] text-[19px] leading-[1.7] text-text-secondary desktop:text-[21px]">{revenue.guidesIndex.description}</p>
          </Container>
        </section>

        <section className="py-[72px] desktop:py-[110px]">
          <Container>
            <div className="grid gap-5 desktop:grid-cols-3">
              {guideSlugs.map((slug, index) => {
                const guide = revenue.guides[slug]

                return (
                  <article key={slug} className="group flex min-h-[390px] flex-col rounded-feature border border-white/[0.09] bg-surface p-6 transition-colors hover:border-white/[0.18] desktop:p-8">
                    <div className="flex items-center justify-between gap-4 font-mono text-[12px]">
                      <span className="text-accent">0{index + 1} / {guide.category}</span>
                      <span className="text-text-quiet">{guide.readingTime}</span>
                    </div>
                    <h2 className="mt-9 text-[27px] font-extrabold leading-[1.15] tracking-[-0.01em]">{guide.title}</h2>
                    <p className="mt-5 leading-[1.7] text-text-secondary">{guide.description}</p>
                    <Link href={`/${locale}/guides/${slug}`} className="mt-auto flex items-center justify-between gap-4 rounded pt-8 font-semibold text-text transition-colors group-hover:text-accent-light">
                      {revenue.guidesIndex.readGuideLabel}
                      <span aria-hidden="true" className="text-xl text-accent">{locale === 'he' ? '←' : '→'}</span>
                    </Link>
                  </article>
                )
              })}
            </div>
          </Container>
        </section>
      </main>
      <Footer locale={locale} dictionary={dictionary} />
    </>
  )
}
