import Link from 'next/link'

import Container from '@/components/ui/Container'
import LanguageSwitcher from '@/components/ui/LanguageSwitcher'
import { siteConfig } from '@/config/site'
import { navigationOrder, type SiteDictionary } from '@/content'
import type { Locale } from '@/lib/i18n'

interface FooterProps {
  locale: Locale
  dictionary: SiteDictionary
}

export default function Footer({ locale, dictionary }: FooterProps) {
  const socialLinks = [
    {
      key: 'email' as const,
      href: `mailto:${siteConfig.email}`,
      external: false,
    },
    {
      key: 'linkedIn' as const,
      href: siteConfig.linkedInUrl,
      external: true,
    },
    {
      key: 'github' as const,
      href: siteConfig.githubUrl,
      external: true,
    },
  ]

  return (
    <footer className="border-t border-white/[0.06] bg-section">
      <Container className="grid gap-12 py-14 desktop:grid-cols-[1.6fr_1fr_1fr_1fr] desktop:pb-10 desktop:pt-[72px]">
        <div>
          <Link
            href={`/${locale}#top`}
            className="mb-[18px] inline-flex items-center gap-[11px] rounded-md text-lg font-bold text-text"
          >
            <span
              aria-hidden="true"
              className="size-[9px] rounded-full bg-accent shadow-[0_0_16px_rgba(77,125,255,0.7)]"
            />
            {dictionary.identity.name}
          </Link>
          <p className="max-w-[300px] text-[15px] leading-[1.6] text-text-muted">
            {dictionary.footer.positioning}
          </p>
        </div>

        <nav aria-label={dictionary.footer.navigationTitle}>
          <h2 className="mb-4 font-mono text-[11px] tracking-[0.08em] text-text-quiet">
            {dictionary.footer.navigationTitle}
          </h2>
          <ul className="flex flex-col gap-[11px]">
            {navigationOrder.map((key) => (
              <li key={key}>
                <Link
                  href={key === 'guides' ? `/${locale}/guides` : `/${locale}#${key}`}
                  className="rounded text-[14.5px] text-text-secondary transition-colors hover:text-text"
                >
                  {dictionary.navigation[key]}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="mb-4 font-mono text-[11px] tracking-[0.08em] text-text-quiet">
            {dictionary.footer.servicesTitle}
          </h2>
          <ul className="flex flex-col gap-[11px]">
            {dictionary.footer.serviceLinks.map((service) => (
              <li key={service.slug}>
                <Link
                  href={`/${locale}/services/${service.slug}`}
                  className="rounded text-[14.5px] text-text-secondary transition-colors hover:text-text"
                >
                  {service.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="mb-4 font-mono text-[11px] tracking-[0.08em] text-text-quiet">
            {dictionary.footer.connectTitle}
          </h2>
          <ul className="mb-5 flex flex-col gap-[11px]">
            {socialLinks.map((link) => (
              <li key={link.key}>
                <a
                  href={link.href}
                  target={link.external ? '_blank' : undefined}
                  rel={link.external ? 'noopener noreferrer' : undefined}
                  className="break-words rounded text-[14.5px] text-text-secondary transition-colors hover:text-text"
                >
                  {dictionary.footer.socialLabels[link.key]}
                </a>
              </li>
            ))}
          </ul>
          <LanguageSwitcher locale={locale} labels={dictionary.header} longEnglishLabel />
        </div>
      </Container>

      <div className="border-t border-white/[0.06]">
        <Container className="py-6">
          <p className="text-[13px] text-text-quiet">{dictionary.footer.copyright}</p>
        </Container>
      </div>
    </footer>
  )
}
