import Link from 'next/link'
import MobileMenu, { type HeaderNavigationItem } from '@/components/layout/MobileMenu'
import Footer from '@/components/layout/Footer'
import ContactForm from '@/components/contact/ContactForm'
import LanguageSwitcher from '@/components/ui/LanguageSwitcher'
import ReferenceScreen from './ReferenceScreen'
import { navigationOrder, serviceOrder, processOrder, whyOrder, type SiteDictionary } from '@/content'
import { siteConfig } from '@/config/site'
import { getDirection, type Locale } from '@/lib/i18n'
import './studio.css'

function Arrow() { return <span className="studio-arrow" aria-hidden="true">↗</span> }
function Heading({ kicker, title, description }: { kicker: string; title: string; description?: string }) {
  return <div className="studio-section-heading"><p className="studio-eyebrow">{kicker}</p><h2>{title}</h2>{description && <p>{description}</p>}</div>
}
function BrowserBar({ title }: { title: string }) {
  return <div className="studio-browser-bar"><span className="studio-window-dots">•••</span><span dir="ltr">{title}</span><span aria-hidden="true">↗</span></div>
}
export default function StudioHome({ locale, dictionary: d }: { locale: Locale; dictionary: SiteDictionary }) {
  const he = locale === 'he'
  const t = (hebrew: string, english: string) => he ? hebrew : english
  const direction = getDirection(locale)
  const navigationItems: HeaderNavigationItem[] = navigationOrder.map(key => ({ key, label: d.navigation[key], href: key === 'guides' ? `/${locale}/guides` : `/${locale}#${key}` }))
  const serviceLinks: Record<string, string> = { websites: `/${locale}/services/websites`, automation: `/${locale}/services/automation`, ai: `/${locale}/services/automation` }
  const serviceSymbols = ['↗', '⊞', '◫', '⇄', '✳']
  const projects = [
    { name: 'Finance', tone: 'finance', source: 'finance', category: t('ניהול פיננסי', 'Personal finance'), title: t('התמונה הפיננסית.\nסוף סוף ברורה.', 'Your finances.\nFinally in focus.'), description: t('הכנסות, הוצאות ותקציבים במרחב אחד. ממשק שהופך נתונים מורכבים לתמונה שקל להבין ולפעול לפיה.', 'Income, expenses and budgets in one workspace. Turning complex data into a clear picture you can act on.'), tags: ['Dashboard', 'RTL', 'Design system'] },
    { name: 'Panda', tone: 'panda', source: 'panda', category: t('מערכת עסקית', 'Business platform'), title: t('פחות התעסקות.\nיותר סדר.', 'Less busywork.\nMore clarity.'), description: t('סביבת עבודה לניהול מסמכים וחשבוניות, עם סדרי עדיפויות ברורים ותמונה אחת של מה מוכן, מה חסר ומה דורש תשומת לב.', 'A workspace for documents and invoices, with clear priorities and one view of what is ready, missing or needs attention.'), tags: ['Workspace', 'Documents', 'UX / UI'] },
    { name: 'TradingLog', tone: 'trading', source: he ? 'trading-he' : 'trading-en', category: t('יומן מסחר', 'Trading journal'), title: t('כל עסקה היא\nהזדמנות ללמוד.', 'Every trade.\nSomething to learn.'), description: t('מסחר, השקעות וניתוח ביצועים בסביבת עבודה אחת. היררכיה מדויקת שמכניסה בהירות לעולם עשיר בנתונים.', 'Trading, investing and performance analysis in one workspace. A considered hierarchy that brings clarity to data.'), tags: ['Analytics', 'Data visualization', 'HE / EN'] },
    { name: 'LifeOS', tone: 'life', source: 'lifeos', category: t('אפליקציה אישית', 'Personal app'), title: t('קצת יותר מקום\nלדברים החשובים.', 'Make room for\nwhat matters.'), description: t('משימות, הרגלים ותכנון יומי בחוויה רגועה, שעוזרת להתקדם בלי להעמיס.', 'Tasks, habits and daily planning in a calm experience that helps you move forward without the noise.'), tags: ['Mobile', 'Daily planning'] },
    { name: 'LimitPact', tone: 'limitpact', source: 'limitpact-landing', category: t('דסקטופ ואתר מוצר', 'Desktop & product website'), title: t('גבולות ברורים.\nמסחר עם משמעת.', 'Clear limits.\nDisciplined trading.'), description: t('כלי לניטור מגבלות מסחר, עם תמונת מצב נגישה ושפה עיצובית שממשיכה מהאפליקציה לאתר המוצר.', 'A tool for monitoring trading limits, with an accessible status view and a design language that connects desktop and web.'), tags: ['Desktop app', 'Product website'] },
  ]
  return <div className="studio-home">
    <a href="#main-content" className="studio-skip">{t('דלגו לתוכן', 'Skip to content')}</a>
    <header className="studio-header"><div className="studio-container studio-header-inner">
      <Link className="studio-brand" href={`/${locale}`} aria-label={d.identity.name}><span className="studio-brand-mark" dir="ltr">oz<span>.</span></span><span className="studio-brand-name">{d.identity.name}<small dir="ltr">DESIGN & DEVELOPMENT</small></span></Link>
      <nav className="studio-desktop-nav" aria-label={d.header.menuLabel}>{navigationItems.filter(item => item.key !== 'contact').map(item => <Link key={item.key} href={item.href}>{item.label}</Link>)}</nav>
      <div className="studio-header-actions"><div className="studio-desktop-language"><LanguageSwitcher locale={locale} labels={d.header} /></div><a className="studio-header-cta" href={`/${locale}#contact`}>{d.header.contactCta}<Arrow /></a><MobileMenu locale={locale} identityName={d.identity.name} labels={d.header} primaryCta={d.hero.primaryCta} contactHref={`/${locale}#contact`} navigationItems={navigationItems} /></div>
    </div></header>
    <main id="main-content">
      <section className="studio-hero" id="top"><div className="studio-container">
        <div className="studio-hero-copy"><p className="studio-availability"><span aria-hidden="true" />{d.hero.availability}</p>
          <h1>{t('רעיונות גדולים.', 'Big ideas.')}<br /><span>{t('מוצרים מדויקים.', 'Considered products.')}</span></h1>
          <p className="studio-hero-description">{t('אני עוזר לעסקים להפוך רעיונות לאתרים, מערכות ואפליקציות — עם חשיבה מוצרית, עיצוב מוקפד ופיתוח עד הפרט האחרון.', 'I help businesses turn ideas into websites, systems and apps — with product thinking, thoughtful design and care in every detail.')}</p>
          <div className="studio-hero-actions"><a className="studio-button" href={`/${locale}#contact`}>{t('בואו נדבר על הרעיון שלכם', 'Let’s talk about your idea')}<Arrow /></a><a className="studio-text-link" href={`/${locale}#work`}>{t('לפרויקטים שלי', 'Explore my work')}<span aria-hidden="true">↓</span></a></div>
        </div>
        <div className="studio-hero-stage" aria-hidden="true"><div className="studio-hero-orbit" />
          <div className="studio-hero-desktop"><BrowserBar title="Finance · Personal workspace" /><ReferenceScreen name="finance" title="Finance dashboard" eager /></div>
          <div className="studio-hero-phone"><ReferenceScreen name="lifeos" title="LifeOS daily overview" width={402} height={856} eager /></div>
          <div className="studio-hero-side-note"><span className="studio-note-star">✳</span><span>{t('מהרעיון הראשון.\nעד המסך האחרון.', 'From the first idea.\nTo the final detail.')}</span></div>
        </div>
        <div className="studio-capabilities"><span>{t('מחבר בין עיצוב לטכנולוגיה', 'Where design meets technology')}</span><ul>{[d.capabilityMarquee.websites, d.capabilityMarquee.businessSystems, d.capabilityMarquee.applications, d.capabilityMarquee.automation, d.capabilityMarquee.ai].map(item => <li key={item}>{item}</li>)}</ul></div>
      </div></section>
      <section className="studio-section studio-work" id="work"><div className="studio-container">
        <div className="studio-heading-row"><Heading kicker={t('עבודות נבחרות', 'Selected work')} title={t('כל מוצר, עולם שלם.', 'Every product, its own world.')} description={t('ממשקים שנבנו סביב האנשים שמשתמשים בהם. מפיננסים ונתונים, ועד ניהול היום־יום.', 'Interfaces built around the people who use them. From finances and data to the flow of everyday life.')} /><span className="studio-section-meta" dir="ltr">DESIGNED WITH INTENT.<br />BUILT WITH CARE.</span></div>
        <div className="studio-project-grid">{projects.map(project => <article key={project.name} className={`studio-project studio-project--${project.tone}`}>
          <div className="studio-project-copy"><div className="studio-project-name"><bdi dir="ltr">{project.name}</bdi><span>{project.category}</span></div><h3>{project.title}</h3><p>{project.description}</p><ul className="studio-tags">{project.tags.map(tag => <li key={tag}>{tag}</li>)}</ul><a className="studio-project-link" href={`/project-previews/${project.source}.html`} target="_blank" rel="noopener noreferrer">{t('לצפייה במסך המלא', 'View the full design')}<Arrow /></a></div>
          <div className="studio-project-art">
            {['finance', 'panda', 'trading'].includes(project.tone) && <div className="studio-browser"><BrowserBar title={`${project.name} / Overview`} /><ReferenceScreen name={project.source} title={`${project.name} — ${t('עיצוב הממשק', 'Interface design')}`} height={project.tone === 'panda' ? 900 : 960} /></div>}
            {project.tone === 'life' && <><div className="studio-life-word" aria-hidden="true" dir="ltr">A little<br /><em>more life.</em></div><div className="studio-life-phone"><ReferenceScreen name="lifeos" title={t('מסך היום שלי ב־LifeOS', 'LifeOS Today screen')} width={402} height={856} /></div></>}
            {project.tone === 'limitpact' && <><div className="studio-limit-web"><ReferenceScreen name="limitpact-landing" title="LimitPact product website design" /></div><a className="studio-limit-app" href="/project-previews/limitpact.html" target="_blank" rel="noopener noreferrer" aria-label={t('הגדלת עיצוב אפליקציית LimitPact', 'View the LimitPact desktop design')}><ReferenceScreen name="limitpact" title="LimitPact desktop design" width={380} height={620} /></a><span className="studio-art-caption" dir="ltr">ONE PRODUCT. ONE DESIGN LANGUAGE.</span></>}
          </div>
        </article>)}</div>
      </div></section>
      <section className="studio-section studio-services" id="services"><div className="studio-container studio-services-inner"><Heading kicker={d.services.kicker} title={t('מה צריך לקרות\nכדי שתתקדמו?', 'What will move\nyou forward?')} description={d.services.description} /><div className="studio-service-list">{serviceOrder.map((key, index) => { const item = d.services.items[key];const content = <><span className="studio-service-symbol" aria-hidden="true">{serviceSymbols[index]}</span><div className="studio-service-copy"><h3>{item.title}</h3><p>{item.description}</p></div>{serviceLinks[key] && <Arrow />}</>;return serviceLinks[key] ? <Link href={serviceLinks[key]} className="studio-service" key={key}>{content}</Link> : <div className="studio-service" key={key}>{content}</div> })}</div></div></section>
      <section className="studio-section studio-process" id="process"><div className="studio-container"><div className="studio-heading-row"><Heading kicker={d.process.kicker} title={d.process.title} /><p className="studio-process-intro">{d.process.description}</p></div><ol className="studio-process-grid" dir={direction}>{processOrder.map(key => { const step = d.process.items[key];return <li key={key}><span className="studio-step-number"><bdi dir="ltr">{step.number}</bdi></span><h3>{step.title}</h3><p>{step.description}</p></li> })}</ol></div></section>
      <section className="studio-section studio-about" id="about"><div className="studio-container studio-about-grid"><div className="studio-about-card"><span className="studio-about-monogram" dir="ltr" aria-hidden="true">oz<span>.</span></span><div><span className="studio-eyebrow">{t('נעים להכיר', 'Good to meet you')}</span><h2>{d.identity.name}</h2><p dir="ltr">DESIGN THINKING.<br />DEVELOPER MINDSET.</p></div><span className="studio-about-star" aria-hidden="true">✳</span></div><div className="studio-about-body"><p className="studio-eyebrow">{d.about.kicker}</p><h3>{t('אותו אדם שחושב איתכם.\nגם בונה איתכם.', 'The person who thinks with you.\nBuilds with you.')}</h3><p>{d.about.body}</p><ul>{whyOrder.map(key => <li key={key}><span aria-hidden="true">↗</span>{d.whyWorkWithMe.items[key]}</li>)}</ul></div></div></section>
      <section className="studio-technology" aria-label={d.technology.title}><div className="studio-container"><p>{d.technology.title}</p><ul dir="ltr">{d.technology.items.map(item => <li key={item}>{item}</li>)}</ul></div></section>
      <section className="studio-section studio-contact" id="contact"><div className="studio-container studio-contact-grid"><div className="studio-contact-copy"><p className="studio-eyebrow">{d.navigation.contact}</p><h2>{t('הדבר הגדול הבא\nמתחיל בשיחה.', 'The next big thing\nstarts with a conversation.')}</h2><p>{d.contact.description}</p><a className="studio-contact-email" href={`mailto:${siteConfig.email}`} dir="ltr">{siteConfig.email}<Arrow /></a><span className="studio-contact-spark" aria-hidden="true">✳</span></div><div className="studio-contact-form"><ContactForm locale={locale} content={d.contact.form} /></div></div></section>
    </main><Footer locale={locale} dictionary={d} />
  </div>
}
