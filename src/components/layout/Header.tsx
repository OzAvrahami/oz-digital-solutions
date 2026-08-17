import Link from 'next/link'

import MobileMenu, { type HeaderNavigationItem } from '@/components/layout/MobileMenu'
import ButtonLink from '@/components/ui/ButtonLink'
import Container from '@/components/ui/Container'
import LanguageSwitcher from '@/components/ui/LanguageSwitcher'
import { navigationOrder, type SiteDictionary } from '@/content'
import type { Locale } from '@/lib/i18n'

interface HeaderProps {
  locale: Locale
  dictionary: SiteDictionary
}

const implementedSections = new Set(['work', 'services', 'process', 'about'])

export default function Header({ locale, dictionary }: HeaderProps) {
  const navigationItems: HeaderNavigationItem[] = navigationOrder.map((key) => ({
    key,
    label: dictionary.navigation[key],
    href: `/${locale}#${key}`,
    enabled: implementedSections.has(key),
  }))

  return (
    <header className="sticky top-0 z-[60] border-b border-white/[0.06] bg-canvas/70 backdrop-blur-2xl">
      <Container className="flex items-center justify-between py-4 desktop:py-[18px]">
        <Link
          href={`/${locale}`}
          className="flex items-center gap-[11px] rounded-md text-lg font-bold tracking-[-0.01em] text-text"
        >
          <span className="size-[9px] rounded-full bg-accent shadow-[0_0_16px_rgba(77,125,255,0.7)]" aria-hidden="true" />
          {dictionary.identity.name}
        </Link>

        <nav aria-label={dictionary.header.menuLabel} className="hidden items-center gap-8 desktop:flex">
          {navigationItems.map((item) =>
            item.enabled ? (
              <Link
                key={item.key}
                href={item.href}
                className="rounded text-[15px] font-medium text-text-secondary transition-colors hover:text-text"
              >
                {item.label}
              </Link>
            ) : (
              <span
                key={item.key}
                role="link"
                aria-disabled="true"
                title={dictionary.footer.unavailableLabel}
                className="cursor-not-allowed text-[15px] font-medium text-text-quiet"
              >
                {item.label}
              </span>
            ),
          )}
        </nav>

        <div className="flex items-center gap-5">
          <div className="hidden desktop:block">
            <LanguageSwitcher locale={locale} labels={dictionary.header} />
          </div>
          <ButtonLink
            href="#"
            variant="inverse"
            size="compact"
            disabled
            title={dictionary.footer.unavailableLabel}
            className="hidden desktop:inline-flex"
          >
            {dictionary.header.contactCta}
          </ButtonLink>
          <MobileMenu
            locale={locale}
            identityName={dictionary.identity.name}
            labels={dictionary.header}
            primaryCta={dictionary.hero.primaryCta}
            unavailableLabel={dictionary.footer.unavailableLabel}
            navigationItems={navigationItems}
          />
        </div>
      </Container>
    </header>
  )
}
