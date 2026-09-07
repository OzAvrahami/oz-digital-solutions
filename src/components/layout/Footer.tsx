import SectionLink from '@/components/layout/SectionLink'
import Link from 'next/link'
import { flowCopy, flowNavigation } from '@/content/flow'
import type { SiteDictionary } from '@/content'
import type { Locale } from '@/lib/i18n'
import DesignText from '@/components/flow/DesignText'
import { siteConfig } from '@/config/site'

export default function Footer({ locale, dictionary }: { locale: Locale; dictionary: SiteDictionary }) {
  const t = flowCopy[locale]
  return <footer className="flow-footer"><div className="flow-container"><div className="footer-main"><div className="footer-brand"><Link href={`/${locale}`} aria-label={t.name}><span className="wordmark" aria-hidden="true">oz<b>.</b></span></Link><p><DesignText>{t.footerDesc}</DesignText></p></div><nav className="footer-links" aria-label={dictionary.footer.navigationTitle}>{flowNavigation.map((id, i) => <SectionLink key={id} href={`/${locale}#${id}`}>{t.nav[i]}</SectionLink>)}<Link href={`/${locale}/guides`}>{t.footerGuides}</Link><Link href={`/${locale}/accessibility`}>{t.accessibilityStatement}</Link></nav></div><nav className="footer-service-links" aria-label={dictionary.footer.servicesTitle}>{dictionary.footer.serviceLinks.map(service => <Link key={service.slug} href={`/${locale}/services/${service.slug}`}>{service.label}</Link>)}<a href={siteConfig.githubUrl} target="_blank" rel="noopener noreferrer">GitHub</a></nav><div className="footer-bottom"><span>© {new Date().getFullYear()} {t.name}. {t.rights}</span><span>LESS FRICTION. MORE POSSIBILITY.</span></div></div></footer>
}
