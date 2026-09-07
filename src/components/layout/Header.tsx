import SectionLink from '@/components/layout/SectionLink'
import Link from 'next/link'
import LanguageSwitcher from '@/components/ui/LanguageSwitcher'
import Navigation from '@/components/flow/Navigation'
import Icon from '@/components/flow/Icon'
import { flowCopy, flowNavigation } from '@/content/flow'
import type { SiteDictionary } from '@/content'
import type { Locale } from '@/lib/i18n'

export default function Header({ locale, dictionary }: { locale: Locale; dictionary: SiteDictionary }) {
  const t = flowCopy[locale]
  return <><a href="#main-content" className="skip-link">{t.skip}</a><header className="site-header"><div className="flow-container header-inner"><Link href={`/${locale}`} className="identity" aria-label={t.name}><span className="wordmark" aria-hidden="true">oz<b>.</b></span><span className="identity-copy"><strong>{t.name}</strong><small>DIGITAL, DONE RIGHT.</small></span></Link><nav className="desktop-nav" aria-label={dictionary.header.menuLabel}>{flowNavigation.map((id, i) => <SectionLink key={id} href={`/${locale}#${id}`}>{t.nav[i]}</SectionLink>)}</nav><div className="header-actions"><LanguageSwitcher locale={locale} labels={dictionary.header} compact /><SectionLink className="header-cta" href={`/${locale}#contact`}>{t.talk}<Icon name="diagonal" className="direction-icon" /></SectionLink><Navigation key={locale} locale={locale} /></div></div></header></>
}
