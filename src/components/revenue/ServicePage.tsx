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

const primaryLinkClasses = 'studio-primary-link inline-flex items-center justify-center rounded-full px-7 py-[15px] text-base font-semibold text-white transition-colors'
const secondaryLinkClasses = 'studio-secondary-link inline-flex items-center justify-center rounded-full border px-7 py-[15px] text-base font-semibold transition-colors'

export default function ServicePage({ locale, dictionary, revenue, service }: ServicePageProps) {
  return (
    <div className="studio-page">
      <Header locale={locale} dictionary={dictionary} />
      <main id="main-content" className="studio-page-main min-h-screen overflow-x-clip">
        <section className="studio-page-hero relative overflow-hidden border-b">
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
            <p className="studio-page-eyebrow mt-14 font-mono text-[13px] tracking-[0.12em]">{'// '}{service.eyebrow}</p>
            <h1 className="studio-page-title mt-5 max-w-[950px] text-[42px] font-black leading-[1.04] tracking-[-0.025em] desktop:text-[72px]">
              {service.title}
            </h1>
            <p className="studio-page-lead mt-7 max-w-[760px] text-[19px] leading-[1.7] desktop:text-[21px]">
              {service.lead}
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link href={`/${locale}#contact`} className={primaryLinkClasses}>{service.primaryCta}</Link>
              <Link href={`/${locale}/guides/${relatedGuides[service.slug]}`} className={secondaryLinkClasses}>{service.secondaryCta}</Link>
            </div>
          </Container>
        </section>

        <section className="studio-page-section py-[72px] desktop:py-[110px]">
          <Container>
            <h2 className="max-w-[720px] text-3xl font-extrabold leading-tight desktop:text-[46px]">{service.outcomesTitle}</h2>
            <div className="mt-10 grid gap-4 desktop:grid-cols-3">
              {service.outcomes.map((outcome, index) => (
                <article key={outcome.title} className="studio-page-card rounded-[18px] border p-6 desktop:p-8">
                  <span className="studio-page-eyebrow font-mono text-[12px]">0{index + 1}</span>
                  <h3 className="mt-5 text-[22px] font-bold">{outcome.title}</h3>
                  <p className="studio-page-copy mt-3 leading-[1.7]">{outcome.description}</p>
                </article>
              ))}
            </div>
          </Container>
        </section>

        <section className="studio-page-band border-y py-[72px] desktop:py-[110px]">
          <Container className="grid gap-12 desktop:grid-cols-[0.9fr_1.1fr] desktop:gap-20">
            <div>
              <p className="studio-page-eyebrow font-mono text-[13px] tracking-[0.12em]">{'// '}{revenue.common.servicesLabel}</p>
              <h2 className="mt-5 text-3xl font-extrabold leading-tight desktop:text-[44px]">{service.capabilitiesTitle}</h2>
              <p className="studio-page-copy mt-5 text-lg leading-[1.7]">{service.capabilitiesIntro}</p>
            </div>
            <ul className="studio-page-list divide-y border-y">
              {service.capabilities.map((capability) => (
                <li key={capability} className="studio-page-copy flex gap-4 py-4 leading-[1.65]">
                  <span aria-hidden="true" className="mt-[9px] size-1.5 shrink-0 rounded-full bg-accent" />
                  {capability}
                </li>
              ))}
            </ul>
          </Container>
        </section>

        <section className="studio-page-section py-[72px] desktop:py-[110px]">
          <Container>
            <div className="max-w-[760px]">
              <h2 className="text-3xl font-extrabold leading-tight desktop:text-[44px]">{service.technologyTitle}</h2>
              <p className="studio-page-copy mt-5 text-lg leading-[1.7]">{service.technologyIntro}</p>
            </div>
            <div className="studio-page-card-grid mt-10 grid gap-px overflow-hidden rounded-[18px] border desktop:grid-cols-2">
              {service.technologies.map((technology) => (
                <article key={technology.name} className="studio-page-card p-6 desktop:p-8">
                  <h3 className="text-xl font-bold">{technology.name}</h3>
                  <p className="studio-page-copy mt-3 leading-[1.7]">{technology.description}</p>
                  {technology.provider ? (
                    <ProviderLink
                      provider={technology.provider}
                      label={`${revenue.common.recommendedToolsLabel} — ${technology.name}`}
                      className="studio-provider-link mt-5 inline-flex rounded font-mono text-[12px] font-medium transition-colors"
                    />
                  ) : null}
                </article>
              ))}
            </div>
          </Container>
        </section>

        <section className="studio-page-band border-y py-[72px] desktop:py-[110px]">
          <Container>
            <h2 className="text-3xl font-extrabold leading-tight desktop:text-[44px]">{service.processTitle}</h2>
            <div className="studio-page-process mt-10 border-t">
              {service.process.map((step) => (
                <article key={step.number} className="grid gap-3 border-b py-6 desktop:grid-cols-[80px_280px_1fr] desktop:gap-10 desktop:py-8">
                  <span className="studio-page-eyebrow font-mono text-[14px]">{step.number}</span>
                  <h3 className="text-xl font-bold">{step.title}</h3>
                  <p className="studio-page-copy leading-[1.7]">{step.description}</p>
                </article>
              ))}
            </div>
          </Container>
        </section>

        <section className="studio-page-section py-[72px] desktop:py-[110px]">
          <Container>
            <div className="studio-page-closing rounded-[22px] border px-6 py-12 text-center desktop:px-16 desktop:py-16">
              <h2 className="mx-auto max-w-[800px] text-[32px] font-black leading-tight desktop:text-[46px]">{service.closingTitle}</h2>
              <p className="studio-page-copy mx-auto mt-5 max-w-[620px] text-lg leading-[1.7]">{service.closingDescription}</p>
              <Link href={`/${locale}#contact`} className={`${primaryLinkClasses} mt-8`}>{service.primaryCta}</Link>
            </div>
          </Container>
        </section>
      </main>
      <Footer locale={locale} dictionary={dictionary} />
    </div>
  )
}
