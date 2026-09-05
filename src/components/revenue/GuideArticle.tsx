import Link from 'next/link'

import Footer from '@/components/layout/Footer'
import Header from '@/components/layout/Header'
import AffiliateDisclosure from '@/components/revenue/AffiliateDisclosure'
import Breadcrumbs from '@/components/revenue/Breadcrumbs'
import ProviderLink from '@/components/revenue/ProviderLink'
import Container from '@/components/ui/Container'
import { getSiteUrl } from '@/config/site'
import type { SiteDictionary } from '@/content'
import type { GuideContent, RevenueDictionary } from '@/content/revenue'
import type { Locale } from '@/lib/i18n'

interface GuideArticleProps {
  locale: Locale
  dictionary: SiteDictionary
  revenue: RevenueDictionary
  guide: GuideContent
}

export default function GuideArticle({ locale, dictionary, revenue, guide }: GuideArticleProps) {
  const sectionLinks = guide.blocks.filter((block) => block.type === 'section')
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: guide.title,
    description: guide.description,
    datePublished: guide.publishedDate,
    dateModified: guide.updatedDate,
    inLanguage: locale,
    author: { '@type': 'Person', name: 'Oz Avrahami' },
    publisher: { '@type': 'Person', name: 'Oz Avrahami' },
    mainEntityOfPage: getSiteUrl(`/${locale}/guides/${guide.slug}`),
  }

  return (
    <div className="studio-page">
      <Header locale={locale} dictionary={dictionary} />
      <main id="main-content" className="studio-page-main min-h-screen overflow-x-clip">
        <article>
          <header className="studio-page-hero relative overflow-hidden border-b">
            <div className="portfolio-hero-grid pointer-events-none absolute inset-0" aria-hidden="true" />
            <Container className="relative pb-16 pt-10 desktop:pb-24 desktop:pt-14">
              <Breadcrumbs
                locale={locale}
                homeLabel={revenue.common.homeLabel}
                items={[
                  { label: revenue.common.guidesLabel, href: `/${locale}/guides` },
                  { label: guide.category },
                ]}
              />
              <div className="studio-page-meta mt-14 flex flex-wrap items-center gap-3 font-mono text-[12px]">
                <span className="studio-page-eyebrow">{guide.category}</span>
                <span aria-hidden="true">/</span>
                <span>{guide.readingTime}</span>
                <span aria-hidden="true">/</span>
                <time dateTime={guide.updatedDate}>{guide.publishedLabel}</time>
              </div>
              <h1 className="studio-page-title mt-5 max-w-[980px] text-[40px] font-black leading-[1.06] tracking-[-0.025em] desktop:text-[68px]">{guide.title}</h1>
              <p className="studio-page-lead mt-7 max-w-[760px] text-[19px] leading-[1.7] desktop:text-[21px]">{guide.description}</p>
            </Container>
          </header>

          <section className="guide-reading-surface">
            <Container className="grid gap-12 py-[64px] desktop:grid-cols-[240px_minmax(0,720px)] desktop:justify-between desktop:py-[90px]">
              <aside className="desktop:sticky desktop:top-28 desktop:self-start">
                <h2 className="guide-reading-muted font-mono text-[12px] tracking-[0.1em]">{revenue.common.tableOfContents}</h2>
                <nav className="guide-reading-rule mt-4 border-s ps-4" aria-label={revenue.common.tableOfContents}>
                  <ol className="space-y-3">
                    {sectionLinks.map((block) => (
                      <li key={block.id}>
                        <a href={`#${block.id}`} className="guide-reading-muted guide-reading-section-link text-[14px] leading-snug transition-colors">{block.title}</a>
                      </li>
                    ))}
                  </ol>
                </nav>
              </aside>

              <div className="min-w-0">
                <div className="guide-reading-secondary space-y-5 text-[18px] leading-[1.85]">
                  {guide.intro.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                </div>

                <AffiliateDisclosure locale={locale} />

                <div className="mt-12 space-y-12">
                  {guide.blocks.map((block, index) => {
                    if (block.type === 'section') {
                      return (
                        <section id={block.id} key={block.id} className="scroll-mt-28">
                          <h2 className="guide-reading-primary text-[28px] font-extrabold leading-tight desktop:text-[34px]">{block.title}</h2>
                          <div className="guide-reading-secondary mt-5 space-y-5 text-[17px] leading-[1.85]">
                            {block.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                          </div>
                        </section>
                      )
                    }

                    if (block.type === 'list') {
                      return (
                        <section key={`list-${index}`} className="guide-reading-panel rounded-panel border p-6 desktop:p-8">
                          {block.title ? <h2 className="guide-reading-primary text-xl font-bold">{block.title}</h2> : null}
                          <ul className="mt-5 space-y-3">
                            {block.items.map((item) => (
                              <li key={item} className="guide-reading-secondary flex gap-3 leading-[1.7]">
                                <span aria-hidden="true" className="mt-[10px] size-1.5 shrink-0 rounded-full bg-accent" />
                                {item}
                              </li>
                            ))}
                          </ul>
                        </section>
                      )
                    }

                    if (block.type === 'comparison') {
                      return (
                        <figure key={`comparison-${index}`}>
                          <figcaption className="guide-reading-primary mb-4 text-xl font-bold">{block.caption}</figcaption>
                          <div className="guide-reading-panel overflow-x-auto rounded-panel border">
                            <table className="w-full min-w-[650px] border-collapse text-start text-[15px]">
                              <thead className="guide-reading-table-head guide-reading-primary">
                                <tr>{block.headers.map((header) => <th key={header} scope="col" className="guide-reading-rule border-b p-4 text-start font-semibold">{header}</th>)}</tr>
                              </thead>
                              <tbody>
                                {block.rows.map((row) => (
                                  <tr key={row[0]} className="guide-reading-rule border-b last:border-0">
                                    {row.map((cell, cellIndex) => <td key={cell} className={`p-4 align-top leading-[1.6] ${cellIndex === 0 ? 'guide-reading-primary font-medium' : 'guide-reading-secondary'}`}>{cell}</td>)}
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </figure>
                      )
                    }

                    if (block.type === 'callout') {
                      return (
                        <aside key={`callout-${index}`} className="guide-reading-callout border-s-2 p-6 desktop:p-8">
                          <h2 className="guide-reading-primary text-xl font-bold">{block.title}</h2>
                          <p className="guide-reading-secondary mt-3 text-[17px] leading-[1.75]">{block.body}</p>
                        </aside>
                      )
                    }

                    if (block.type === 'providers') {
                      return (
                        <aside key={`providers-${index}`} className="guide-reading-panel rounded-panel border p-6 desktop:p-8">
                          <h2 className="guide-reading-primary text-xl font-bold">{block.title}</h2>
                          <p className="guide-reading-secondary mt-3 leading-[1.7]">{block.body}</p>
                          <div className="mt-5 flex flex-wrap gap-3">
                            {block.providers.map((provider) => (
                              <ProviderLink key={provider} provider={provider} className="guide-reading-provider-link rounded-control border px-4 py-2 text-sm font-semibold transition-colors" />
                            ))}
                          </div>
                        </aside>
                      )
                    }

                    return (
                      <aside key={`service-${index}`} className="guide-reading-service-cta rounded-feature border p-7 desktop:p-9">
                        <p className="guide-reading-accent font-mono text-[12px] tracking-[0.1em]">{'// '}{revenue.common.servicesLabel}</p>
                        <h2 className="guide-reading-primary mt-4 text-[26px] font-extrabold leading-tight">{block.title}</h2>
                        <p className="guide-reading-secondary mt-4 leading-[1.75]">{block.body}</p>
                        <Link href={`/${locale}/services/${block.service}`} className="mt-6 inline-flex rounded-control bg-accent px-5 py-3 font-semibold text-white transition-colors hover:bg-accent-hover">{block.label}</Link>
                      </aside>
                    )
                  })}
                </div>
              </div>
            </Container>
          </section>
        </article>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, '\\u003c') }} />
      </main>
      <Footer locale={locale} dictionary={dictionary} />
    </div>
  )
}
