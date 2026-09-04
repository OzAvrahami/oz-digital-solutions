import Link from 'next/link'

import Footer from '@/components/layout/Footer'
import Header from '@/components/layout/Header'
import Breadcrumbs from '@/components/revenue/Breadcrumbs'
import ProviderLink from '@/components/revenue/ProviderLink'
import Container from '@/components/ui/Container'
import type { SiteDictionary } from '@/content'
import type { RevenueDictionary, ServicePageContent, ServiceSlug } from '@/content/revenue'
import type { Locale } from '@/lib/i18n'

interface ServicePageProps {
  locale: Locale
  dictionary: SiteDictionary
  revenue: RevenueDictionary
  service: ServicePageContent
}

const relatedGuides: Record<ServiceSlug, string> = {
  websites: 'business-website-cost-2026',
  ecommerce: 'shopify-vs-woocommerce-israel',
  automation: 'small-business-automations',
}

const primaryLinkClasses = 'inline-flex items-center justify-center rounded-control bg-accent px-7 py-[15px] text-base font-semibold text-white shadow-accent transition-colors hover:bg-accent-hover'
const secondaryLinkClasses = 'inline-flex items-center justify-center rounded-control border border-white/15 px-7 py-[15px] text-base font-semibold text-text transition-colors hover:border-white/30'

export default function ServicePage({ locale, dictionary, revenue, service }: ServicePageProps) {
  return (
    <>
      <Header locale={locale} dictionary={dictionary} />
      <main className="min-h-screen overflow-x-clip bg-canvas text-text">
        <section className="relative overflow-hidden border-b border-white/[0.06]">
          <div className="portfolio-hero-grid pointer-events-none absolute inset-0" aria-hidden="true" />
          <div className="portfolio-hero-glow pointer-events-none absolute inset-0" aria-hidden="true" />
          <Container className="relative pb-20 pt-10 desktop:pb-[110px] desktop:pt-14">
            <Breadcrumbs
              locale={locale}
              homeLabel={revenue.common.homeLabel}
              items={[
                { label: revenue.common.servicesLabel },
                { label: service.eyebrow },
              ]}
            />
            <p className="mt-14 font-mono text-[13px] tracking-[0.12em] text-accent">{'// '}{service.eyebrow}</p>
            <h1 className="mt-5 max-w-[950px] text-[42px] font-black leading-[1.04] tracking-[-0.025em] desktop:text-[72px]">
              {service.title}
            </h1>
            <p className="mt-7 max-w-[760px] text-[19px] leading-[1.7] text-text-secondary desktop:text-[21px]">
              {service.lead}
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link href={`/${locale}#contact`} className={primaryLinkClasses}>{service.primaryCta}</Link>
              <Link href={`/${locale}/guides/${relatedGuides[service.slug]}`} className={secondaryLinkClasses}>{service.secondaryCta}</Link>
            </div>
          </Container>
        </section>

        <section className="py-[72px] desktop:py-[110px]">
          <Container>
            <h2 className="max-w-[720px] text-3xl font-extrabold leading-tight desktop:text-[46px]">{service.outcomesTitle}</h2>
            <div className="mt-10 grid gap-4 desktop:grid-cols-3">
              {service.outcomes.map((outcome, index) => (
                <article key={outcome.title} className="rounded-panel border border-white/[0.09] bg-surface p-6 desktop:p-8">
                  <span className="font-mono text-[12px] text-accent">0{index + 1}</span>
                  <h3 className="mt-5 text-[22px] font-bold">{outcome.title}</h3>
                  <p className="mt-3 leading-[1.7] text-text-secondary">{outcome.description}</p>
                </article>
              ))}
            </div>
          </Container>
        </section>

        <section className="border-y border-white/[0.06] bg-section py-[72px] desktop:py-[110px]">
          <Container className="grid gap-12 desktop:grid-cols-[0.9fr_1.1fr] desktop:gap-20">
            <div>
              <p className="font-mono text-[13px] tracking-[0.12em] text-accent">{'// '}{revenue.common.servicesLabel}</p>
              <h2 className="mt-5 text-3xl font-extrabold leading-tight desktop:text-[44px]">{service.capabilitiesTitle}</h2>
              <p className="mt-5 text-lg leading-[1.7] text-text-secondary">{service.capabilitiesIntro}</p>
            </div>
            <ul className="divide-y divide-white/[0.09] border-y border-white/[0.09]">
              {service.capabilities.map((capability) => (
                <li key={capability} className="flex gap-4 py-4 leading-[1.65] text-text-secondary">
                  <span aria-hidden="true" className="mt-[9px] size-1.5 shrink-0 rounded-full bg-accent" />
                  {capability}
                </li>
              ))}
            </ul>
          </Container>
        </section>

        <section className="py-[72px] desktop:py-[110px]">
          <Container>
            <div className="max-w-[760px]">
              <h2 className="text-3xl font-extrabold leading-tight desktop:text-[44px]">{service.technologyTitle}</h2>
              <p className="mt-5 text-lg leading-[1.7] text-text-secondary">{service.technologyIntro}</p>
            </div>
            <div className="mt-10 grid gap-px overflow-hidden rounded-panel border border-white/[0.09] bg-white/[0.09] desktop:grid-cols-2">
              {service.technologies.map((technology) => (
                <article key={technology.name} className="bg-surface-deep p-6 desktop:p-8">
                  <h3 className="text-xl font-bold">{technology.name}</h3>
                  <p className="mt-3 leading-[1.7] text-text-secondary">{technology.description}</p>
                  {technology.provider ? (
                    <ProviderLink
                      provider={technology.provider}
                      label={`${revenue.common.recommendedToolsLabel} — ${technology.name}`}
                      className="mt-5 inline-flex rounded font-mono text-[12px] font-medium text-accent transition-colors hover:text-accent-light"
                    />
                  ) : null}
                </article>
              ))}
            </div>
          </Container>
        </section>

        <section className="border-y border-white/[0.06] bg-section py-[72px] desktop:py-[110px]">
          <Container>
            <h2 className="text-3xl font-extrabold leading-tight desktop:text-[44px]">{service.processTitle}</h2>
            <div className="mt-10 border-t border-white/[0.09]">
              {service.process.map((step) => (
                <article key={step.number} className="grid gap-3 border-b border-white/[0.09] py-6 desktop:grid-cols-[80px_280px_1fr] desktop:gap-10 desktop:py-8">
                  <span className="font-mono text-[14px] text-accent">{step.number}</span>
                  <h3 className="text-xl font-bold">{step.title}</h3>
                  <p className="leading-[1.7] text-text-secondary">{step.description}</p>
                </article>
              ))}
            </div>
          </Container>
        </section>

        <section className="py-[72px] desktop:py-[110px]">
          <Container>
            <div className="rounded-feature border border-white/10 bg-[linear-gradient(150deg,#12151b,#0a0b0e)] px-6 py-12 text-center desktop:px-16 desktop:py-16">
              <h2 className="mx-auto max-w-[800px] text-[32px] font-black leading-tight desktop:text-[46px]">{service.closingTitle}</h2>
              <p className="mx-auto mt-5 max-w-[620px] text-lg leading-[1.7] text-text-secondary">{service.closingDescription}</p>
              <Link href={`/${locale}#contact`} className={`${primaryLinkClasses} mt-8`}>{service.primaryCta}</Link>
            </div>
          </Container>
        </section>
      </main>
      <Footer locale={locale} dictionary={dictionary} />
    </>
  )
}
