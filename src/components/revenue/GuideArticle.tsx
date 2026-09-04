import Link from 'next/link'

import Footer from '@/components/layout/Footer'
import Header from '@/components/layout/Header'
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
    <>
      <Header locale={locale} dictionary={dictionary} />
      <main className="min-h-screen overflow-x-clip bg-canvas text-text">
        <article>
          <header className="relative overflow-hidden border-b border-white/[0.06]">
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
              <div className="mt-14 flex flex-wrap items-center gap-3 font-mono text-[12px] text-text-quiet">
                <span className="text-accent">{guide.category}</span>
                <span aria-hidden="true">/</span>
                <span>{guide.readingTime}</span>
                <span aria-hidden="true">/</span>
                <time dateTime={guide.updatedDate}>{guide.publishedLabel}</time>
              </div>
              <h1 className="mt-5 max-w-[980px] text-[40px] font-black leading-[1.06] tracking-[-0.025em] desktop:text-[68px]">{guide.title}</h1>
              <p className="mt-7 max-w-[760px] text-[19px] leading-[1.7] text-text-secondary desktop:text-[21px]">{guide.description}</p>
            </Container>
          </header>

          <Container className="grid gap-12 py-[64px] desktop:grid-cols-[240px_minmax(0,720px)] desktop:justify-between desktop:py-[90px]">
            <aside className="desktop:sticky desktop:top-28 desktop:self-start">
              <h2 className="font-mono text-[12px] tracking-[0.1em] text-text-quiet">{revenue.common.tableOfContents}</h2>
              <nav className="mt-4 border-s border-white/[0.1] ps-4" aria-label={revenue.common.tableOfContents}>
                <ol className="space-y-3">
                  {sectionLinks.map((block) => (
                    <li key={block.id}>
                      <a href={`#${block.id}`} className="text-[14px] leading-snug text-text-muted transition-colors hover:text-text">{block.title}</a>
                    </li>
                  ))}
                </ol>
              </nav>
            </aside>

            <div className="min-w-0">
              <div className="space-y-5 text-[18px] leading-[1.85] text-text-secondary">
                {guide.intro.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              </div>

              <div className="mt-12 space-y-12">
                {guide.blocks.map((block, index) => {
                  if (block.type === 'section') {
                    return (
                      <section id={block.id} key={block.id} className="scroll-mt-28">
                        <h2 className="text-[28px] font-extrabold leading-tight text-text desktop:text-[34px]">{block.title}</h2>
                        <div className="mt-5 space-y-5 text-[17px] leading-[1.85] text-text-secondary">
                          {block.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                        </div>
                      </section>
                    )
                  }

                  if (block.type === 'list') {
                    return (
                      <section key={`list-${index}`} className="rounded-panel border border-white/[0.09] bg-surface p-6 desktop:p-8">
                        {block.title ? <h2 className="text-xl font-bold text-text">{block.title}</h2> : null}
                        <ul className="mt-5 space-y-3">
                          {block.items.map((item) => (
                            <li key={item} className="flex gap-3 leading-[1.7] text-text-secondary">
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
                        <figcaption className="mb-4 text-xl font-bold text-text">{block.caption}</figcaption>
                        <div className="overflow-x-auto rounded-panel border border-white/[0.09]">
                          <table className="w-full min-w-[650px] border-collapse text-start text-[15px]">
                            <thead className="bg-white/[0.05] text-text">
                              <tr>{block.headers.map((header) => <th key={header} scope="col" className="border-b border-white/[0.09] p-4 text-start font-semibold">{header}</th>)}</tr>
                            </thead>
                            <tbody>
                              {block.rows.map((row) => (
                                <tr key={row[0]} className="border-b border-white/[0.07] last:border-0">
                                  {row.map((cell, cellIndex) => <td key={cell} className={`p-4 align-top leading-[1.6] ${cellIndex === 0 ? 'font-medium text-text' : 'text-text-secondary'}`}>{cell}</td>)}
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
                      <aside key={`callout-${index}`} className="border-s-2 border-accent bg-accent/[0.08] p-6 desktop:p-8">
                        <h2 className="text-xl font-bold text-text">{block.title}</h2>
                        <p className="mt-3 text-[17px] leading-[1.75] text-text-secondary">{block.body}</p>
                      </aside>
                    )
                  }

                  if (block.type === 'providers') {
                    return (
                      <aside key={`providers-${index}`} className="rounded-panel border border-white/[0.09] bg-surface p-6 desktop:p-8">
                        <h2 className="text-xl font-bold text-text">{block.title}</h2>
                        <p className="mt-3 leading-[1.7] text-text-secondary">{block.body}</p>
                        <div className="mt-5 flex flex-wrap gap-3">
                          {block.providers.map((provider) => (
                            <ProviderLink key={provider} provider={provider} className="rounded-control border border-white/15 px-4 py-2 text-sm font-semibold text-text transition-colors hover:border-accent hover:text-accent-light" />
                          ))}
                        </div>
                        <p className="mt-5 text-[12px] leading-[1.65] text-text-quiet">{revenue.common.affiliateDisclosure}</p>
                      </aside>
                    )
                  }

                  return (
                    <aside key={`service-${index}`} className="rounded-feature border border-accent/30 bg-[linear-gradient(145deg,rgba(77,125,255,0.13),rgba(16,19,25,0.75))] p-7 desktop:p-9">
                      <p className="font-mono text-[12px] tracking-[0.1em] text-accent">{'// '}{revenue.common.servicesLabel}</p>
                      <h2 className="mt-4 text-[26px] font-extrabold leading-tight text-text">{block.title}</h2>
                      <p className="mt-4 leading-[1.75] text-text-secondary">{block.body}</p>
                      <Link href={`/${locale}/services/${block.service}`} className="mt-6 inline-flex rounded-control bg-accent px-5 py-3 font-semibold text-white transition-colors hover:bg-accent-hover">{block.label}</Link>
                    </aside>
                  )
                })}
              </div>
            </div>
          </Container>
        </article>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, '\\u003c') }} />
      </main>
      <Footer locale={locale} dictionary={dictionary} />
    </>
  )
}
