import Image from 'next/image'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import ContactForm from '@/components/contact/ContactForm'
import WhatsAppAction from '@/components/contact/WhatsAppAction'
import type { SiteDictionary } from '@/content'
import { flowCopy, toolList, secondaryTools, type FlowCopy } from '@/content/flow'
import { siteConfig } from '@/config/site'
import type { Locale } from '@/lib/i18n'
import DesignText from './DesignText'
import Icon from './Icon'
import Workflow from './Workflow'
import Faq from './Faq'

function Logo({ id, size = 30 }: { id: string; size?: number }) {
  return <Image src={`/oz-digital/${id}.svg`} alt="" width={size} height={size} />
}

function SectionHeading({ number, label, title, intro }: { number: string; label: string; title: string; intro: string }) {
  return <div className="section-heading reveal"><div><div className="section-index"><span>{number} /</span>{label}</div><h2><DesignText>{title}</DesignText></h2></div><p>{intro}</p></div>
}

function ServiceVisual({ index, t }: { index: number; t: FlowCopy }) {
  if (index === 0) return <div className="site-mini" aria-hidden="true"><div className="web-mini"><div className="web-mini-top"><i /><i /><i /></div><div className="web-mini-content"><div className="web-mini-text"><DesignText>{t.webMini}</DesignText><small>{t.webMiniSmall}</small></div><div className="web-mini-grid"><i /><i /><i /><i /></div></div></div><div className="floating-shopify"><Logo id="shopify" /></div></div>
  if (index === 1) return <div className="automation-mini" aria-hidden="true"><div className="app-bubble"><Icon name="mail" /><small>{t.autoLabels[0]}</small></div><span className="mini-connector" /><div className="app-bubble core"><Icon name="bolt" /><small>{t.autoLabels[1]}</small></div><span className="mini-connector" /><div className="app-bubble"><Logo id="whatsapp" /><small>{t.autoLabels[2]}</small></div></div>
  return null
}

export default function FlowHome({ locale, dictionary }: { locale: Locale; dictionary: SiteDictionary }) {
  const t = flowCopy[locale]
  const formCopy = { ...dictionary.contact.form, nameLabel: t.contactName, namePlaceholder: t.contactNamePh, contactLabel: t.contactReturn, contactPlaceholder: t.contactReturnPh, messageLabel: t.contactMessage, messagePlaceholder: t.contactMessagePh }
  return <div className="flow-home"><Header locale={locale} dictionary={dictionary} />
    <main id="main-content" tabIndex={-1}>
      <section className="hero" id="top"><div className="flow-container"><div className="hero-grid"><div className="hero-copy"><div className="eyebrow">{t.eyebrow}</div><h1 id="page-title" tabIndex={-1}><DesignText>{t.headline}</DesignText></h1><p className="hero-description">{t.description}</p><div className="hero-actions"><a href="#contact" className="button-primary">{t.heroCta}<Icon name="arrow" className="direction-icon" /></a><a className="text-link" href="#services">{t.seeServices}<Icon name="down" /></a></div><div className="hero-note"><Icon name="message" />{t.note}</div></div><Workflow locale={locale} /></div><div className="hero-bottom"><div className="hero-tags">{t.heroTags.map((tag, i) => <span key={tag}><Icon name={['cursor', 'user', 'circleCheck'][i]} />{tag}</span>)}</div><a className="scroll-hint" href="#services">{t.scroll}<Icon name="down" /></a></div></div></section>
      <section className="trusted-tools" aria-label={locale === 'he' ? 'כלים ומערכות' : 'Tools and systems'}><div className="flow-container trusted-inner"><p className="trusted-caption"><DesignText>{t.trusted}</DesignText></p><div className="brand-strip">{[['shopify', 'Shopify'], ['wordpress', 'WordPress'], ['wix', 'Wix'], ['make', 'make'], ['openai', 'OpenAI'], ['googledrive', 'Google Drive']].map(([id, name]) => <span key={id} className={`brand-word ${id === 'googledrive' ? 'google' : id}`}><Logo id={id} size={24} />{name}</span>)}</div></div></section>
      <section className="section" id="services"><div className="flow-container"><SectionHeading number="01" label={t.servicesLabel} title={t.servicesTitle} intro={t.servicesIntro} /><div className="services-grid">{t.services.map((service, i) => <a key={service[0]} href="#contact" className={`service-card reveal ${i < 2 ? 'wide' : ''} ${i === 0 ? 'featured' : ''}`}><div className="service-top"><span className="service-icon"><Icon name={service[0]} /></span><span className="service-number">0{i + 1}</span></div><h3>{service[1]}</h3><p>{service[2]}</p><ServiceVisual index={i} t={t} /><div className="service-foot"><span>{service[3]}</span><span className="service-arrow"><Icon name="diagonal" className="direction-icon" /></span></div></a>)}</div></div></section>
      <section className="section tools-section" id="tools"><div className="flow-container"><SectionHeading number="02" label={t.toolsLabel} title={t.toolsTitle} intro={t.toolsIntro} /><div className="tools-grid">{toolList.map(([id, name], i) => <div className="tool-card reveal" key={id}><div className="tool-logo"><Logo id={id} /></div><div><h3>{name}</h3><p>{t.toolDescriptions[i]}</p></div></div>)}</div><div className="tools-secondary"><h3 className="tools-secondary-heading reveal"><Icon name="layers" />{t.toolsSecondaryTitle}</h3><div className="tools-secondary-grid">{secondaryTools.map(([id, name], i) => <div className="tool-card tool-card-secondary reveal" key={id}><div className="tool-logo"><Logo id={id} /></div><div><h4>{name}</h4><p>{t.toolsSecondaryDescriptions[i]}</p></div></div>)}</div></div><p className="tools-note reveal"><Icon name="link" />{t.toolsNote}</p></div></section>
      <section className="section" id="about"><div className="flow-container about-grid"><div className="about-copy reveal"><div className="section-index"><span>03 /</span>{t.aboutLabel}</div><h2><DesignText>{t.aboutTitle}</DesignText></h2><p className="about-lead">{t.aboutLead}</p><p>{t.aboutBody}</p><p>{t.aboutEnd}</p><dl className="about-proof about-benefits">{t.aboutProof.map(([heading, description]) => <div key={heading}><dt>{heading}</dt><dd>{description}</dd></div>)}</dl><div className="about-signature"><div><strong>{t.name}</strong><br /><span>{t.aboutRole}</span></div><a href={siteConfig.linkedInUrl} target="_blank" rel="noopener noreferrer">{t.aboutLink}<Icon name="diagonal" className="direction-icon" /></a></div></div><div className="about-visual reveal"><span className="about-monogram wordmark" aria-hidden="true">oz.</span><div className="about-pill one"><Icon name="spark" />{t.aboutPill1}</div><div className="about-pill two"><Icon name="message" />{t.aboutPill2}</div><span className="about-small-label">ONE PERSON. THE WHOLE PICTURE.</span></div></div></section>
      <section className="section process-section" id="process"><div className="flow-container process-wrap"><div className="process-top reveal"><h2>{t.processTitle}</h2><p>{t.processIntro}</p></div><ol className="process-grid">{t.process.map(([title, body], i) => <li className="process-step reveal" key={title}><div className="step-number">0{i + 1}</div><span className="step-line" aria-hidden="true" /><h3>{title}</h3><p>{body}</p></li>)}</ol></div></section>
      <section className="section faq-section" id="faq"><div className="flow-container faq-grid"><div className="faq-intro reveal"><div className="section-index"><span>04 /</span>{t.faqLabel}</div><h2><DesignText>{t.faqTitle}</DesignText></h2><p>{t.faqIntro}</p><a href="#contact" className="faq-contact">{t.faqContact}<Icon name="arrow" className="direction-icon" /></a></div><Faq locale={locale} /></div></section>
      <section className="section contact-section" id="contact"><div className="flow-container"><div className="contact-wrap reveal"><div className="contact-copy"><div className="section-index"><span>05 /</span>{t.contactLabel}</div><h2><DesignText>{t.contactTitle}</DesignText></h2><p>{t.contactBody}</p><a className="contact-email" href={`mailto:${siteConfig.email}`} dir="ltr">{siteConfig.email}<Icon name="diagonal" /></a><div className="contact-social"><WhatsAppAction locale={locale} /><span>·</span><a href={siteConfig.linkedInUrl} target="_blank" rel="noopener noreferrer">LinkedIn<Icon name="diagonal" className="direction-icon" /></a></div></div><ContactForm locale={locale} content={formCopy} /></div></div></section>
    </main><Footer locale={locale} dictionary={dictionary} /></div>
}
