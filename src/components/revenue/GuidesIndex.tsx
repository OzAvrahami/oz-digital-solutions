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
    <div className="studio-page">
      <Header locale={locale} dictionary={dictionary} />
      <main id="main-content" className="studio-page-main min-h-screen overflow-x-clip">
        <section className="studio-page-hero relative overflow-hidden border-b">
          <div className="portfolio-hero-grid pointer-events-none absolute inset-0" aria-hidden="true" />
          <div className="portfolio-hero-glow pointer-events-none absolute inset-0" aria-hidden="true" />
          <Container className="relative pb-20 pt-10 desktop:pb-[110px] desktop:pt-14">
            <Breadcrumbs locale={locale} homeLabel={revenue.common.homeLabel} items={[{ label: revenue.common.guidesLabel }]} />
            <div className="mt-14 flex flex-wrap items-center justify-between gap-4">
              <p className="studio-page-eyebrow font-mono text-[13px] tracking-[0.12em]">{'// '}{revenue.guidesIndex.eyebrow}</p>
              <p className="studio-page-meta font-mono text-[12px]">{revenue.guidesIndex.guideCountLabel}</p>
            </div>
            <h1 className="studio-page-title mt-5 max-w-[900px] text-[42px] font-black leading-[1.04] tracking-[-0.025em] desktop:text-[70px]">{revenue.guidesIndex.title}</h1>
            <p className="studio-page-lead mt-7 max-w-[720px] text-[19px] leading-[1.7] desktop:text-[21px]">{revenue.guidesIndex.description}</p>
          </Container>
        </section>

        <section className="studio-page-section py-[72px] desktop:py-[110px]">
          <Container>
            <div className="grid gap-5 desktop:grid-cols-3">
              {guideSlugs.map((slug, index) => {
                const guide = revenue.guides[slug]

                return (
                  <article key={slug} className="studio-guide-card group flex min-h-[390px] flex-col rounded-[20px] border p-6 transition-all desktop:p-8">
                    <div className="flex items-center justify-between gap-4 font-mono text-[12px]">
                      <span className="studio-page-eyebrow">0{index + 1} / {guide.category}</span>
                      <span className="studio-page-meta">{guide.readingTime}</span>
                    </div>
                    <h2 className="mt-9 text-[27px] font-extrabold leading-[1.15] tracking-[-0.01em]">{guide.title}</h2>
                    <p className="studio-page-copy mt-5 leading-[1.7]">{guide.description}</p>
                    <Link href={`/${locale}/guides/${slug}`} className="studio-guide-link mt-auto flex items-center justify-between gap-4 rounded pt-8 font-semibold transition-colors">
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
    </div>
  )
}
