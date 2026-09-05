import Link from 'next/link'

import MobileMenu, { type HeaderNavigationItem } from '@/components/layout/MobileMenu'
import LanguageSwitcher from '@/components/ui/LanguageSwitcher'
import { navigationOrder, type SiteDictionary } from '@/content'
import type { Locale } from '@/lib/i18n'

interface HeaderProps {
  locale: Locale
  dictionary: SiteDictionary
}

export default function Header({ locale, dictionary }: HeaderProps) {
  const navigationItems: HeaderNavigationItem[] = navigationOrder.map((key) => ({
    key,
    label: dictionary.navigation[key],
    href: key === 'guides' ? `/${locale}/guides` : `/${locale}#${key}`,
  }))

  return (
    <>
      <a href="#main-content" className="studio-skip">
        {locale === 'he' ? 'דלגו לתוכן' : 'Skip to content'}
      </a>
      <header className="studio-header">
        <div className="studio-container studio-header-inner">
        <Link
          href={`/${locale}`}
          className="studio-brand"
          aria-label={dictionary.identity.name}
        >
          <span className="studio-brand-mark" dir="ltr" aria-hidden="true">oz<span>.</span></span>
          <span className="studio-brand-name">
            {dictionary.identity.name}
            <small dir="ltr">DESIGN &amp; DEVELOPMENT</small>
          </span>
        </Link>

        <nav aria-label={dictionary.header.menuLabel} className="studio-desktop-nav">
          {navigationItems.filter((item) => item.key !== 'contact').map((item) => (
            <Link
              key={item.key}
              href={item.href}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="studio-header-actions">
          <div className="studio-desktop-language">
            <LanguageSwitcher locale={locale} labels={dictionary.header} />
          </div>
          <a className="studio-header-cta" href={`/${locale}#contact`}>
            {dictionary.header.contactCta}
            <span className="studio-arrow" aria-hidden="true">↗</span>
          </a>
          <MobileMenu
            locale={locale}
            identityName={dictionary.identity.name}
            labels={dictionary.header}
            primaryCta={dictionary.hero.primaryCta}
            contactHref={`/${locale}#contact`}
            navigationItems={navigationItems}
          />
        </div>
        </div>
      </header>
    </>
  )
}
