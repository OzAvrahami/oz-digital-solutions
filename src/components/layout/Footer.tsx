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
    <footer className="studio-footer">
      <Container className="grid gap-12 py-14 desktop:grid-cols-[1.6fr_1fr_1fr_1fr] desktop:pb-10 desktop:pt-[72px]">
        <div>
          <Link
            href={`/${locale}#top`}
            className="studio-footer-brand mb-[18px] inline-flex items-center gap-3"
          >
            <span className="studio-brand-mark" dir="ltr" aria-hidden="true">oz<span>.</span></span>
            <span>{dictionary.identity.name}</span>
          </Link>
          <p className="studio-footer-positioning max-w-[300px] text-[15px] leading-[1.7]">
            {dictionary.footer.positioning}
          </p>
        </div>

        <nav aria-label={dictionary.footer.navigationTitle}>
          <h2 className="studio-footer-heading mb-4 font-mono text-[11px] tracking-[0.08em]">
            {dictionary.footer.navigationTitle}
          </h2>
          <ul className="flex flex-col gap-[11px]">
            {navigationOrder.map((key) => (
              <li key={key}>
                <Link
                  href={key === 'guides' ? `/${locale}/guides` : `/${locale}#${key}`}
                  className="studio-footer-link rounded text-[14.5px] transition-colors"
                >
                  {dictionary.navigation[key]}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="studio-footer-heading mb-4 font-mono text-[11px] tracking-[0.08em]">
            {dictionary.footer.servicesTitle}
          </h2>
          <ul className="flex flex-col gap-[11px]">
            {dictionary.footer.serviceLinks.map((service) => (
              <li key={service.slug}>
                <Link
                  href={`/${locale}/services/${service.slug}`}
                  className="studio-footer-link rounded text-[14.5px] transition-colors"
                >
                  {service.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="studio-footer-heading mb-4 font-mono text-[11px] tracking-[0.08em]">
            {dictionary.footer.connectTitle}
          </h2>
          <ul className="mb-5 flex flex-col gap-[11px]">
            {socialLinks.map((link) => (
              <li key={link.key}>
                <a
                  href={link.href}
                  target={link.external ? '_blank' : undefined}
                  rel={link.external ? 'noopener noreferrer' : undefined}
                  className="studio-footer-link break-words rounded text-[14.5px] transition-colors"
                >
                  {dictionary.footer.socialLabels[link.key]}
                </a>
              </li>
            ))}
          </ul>
          <LanguageSwitcher locale={locale} labels={dictionary.header} longEnglishLabel />
        </div>
      </Container>

      <div className="studio-footer-bottom border-t">
        <Container className="py-6">
          <p className="studio-footer-copyright text-[13px]">{dictionary.footer.copyright}</p>
        </Container>
      </div>
    </footer>
  )
}
