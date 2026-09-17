'use client'

import { usePathname } from 'next/navigation'
import Icon from '@/components/flow/Icon'
import Preferences from '@/components/flow/Preferences'
import { flowCopy } from '@/content/flow'
import { notFoundCopy } from '@/content/not-found'

export default function NotFoundDocument({ fontClassName }: { fontClassName: string }) {
  const pathname = usePathname()
  const locale = pathname?.split('/')[1] === 'en' ? 'en' : 'he'
  const t = notFoundCopy[locale]
  const site = flowCopy[locale]

  return (
    <html lang={locale} dir={locale === 'he' ? 'rtl' : 'ltr'}>
      {/* eslint-disable-next-line @next/next/no-head-element -- global-not-found returns a full document; next/head is a Pages Router API. */}
      <head>
        <title>{`404 — ${t.heading} | ${site.name}`}</title>
        <link rel="icon" href="/oz-digital/favicon.svg" type="image/svg+xml" />
      </head>
      <body className={`${fontClassName} not-found-site`}>
        <Preferences locale={locale}>
          <a className="skip-link" href="#main-content">{site.skip}</a>
          <header className="not-found-header">
            <a href={`/${locale}`} className="identity" aria-label={site.name}>
              <span className="wordmark" aria-hidden="true">oz<b>.</b></span>
              <span className="identity-copy"><strong>{site.name}</strong><small>DIGITAL, DONE RIGHT.</small></span>
            </a>
          </header>
          <main id="main-content" className="not-found-main" tabIndex={-1}>
            <div className="not-found-card">
              <div className="not-found-visual"><span className="not-found-number" dir="ltr">404</span></div>
              <div className="not-found-copy">
                <h1 id="page-title" tabIndex={-1}>{t.heading}</h1>
                <p>{t.description}</p>
                <nav className="not-found-actions" aria-label={t.navigation}>
                  <a className="button-primary" href={`/${locale}`}>{t.home}<Icon name="arrow" className="not-found-arrow" /></a>
                  <a className="not-found-secondary" href={`/${locale}/guides`}>{t.guides}</a>
                </nav>
                <a className="not-found-services" href={`/${locale}#services`}>{t.services}</a>
              </div>
            </div>
          </main>
          <footer className="not-found-footer"><a href={`/${locale}/accessibility`}>{site.accessibilityStatement}</a></footer>
        </Preferences>
      </body>
    </html>
  )
}
