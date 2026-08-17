import ContactForm from '@/components/contact/ContactForm'
import Container from '@/components/ui/Container'
import type { SiteDictionary } from '@/content'
import type { Locale } from '@/lib/i18n'

interface ContactProps {
  locale: Locale
  dictionary: SiteDictionary
}

export default function Contact({ locale, dictionary }: ContactProps) {
  const { contact } = dictionary

  return (
    <section id="contact" className="scroll-mt-20">
      <Container className="py-[72px] desktop:py-[120px]">
        <div className="relative overflow-hidden rounded-feature border border-white/10 bg-[linear-gradient(150deg,#12151b,#0a0b0e)] px-[22px] py-11 text-center desktop:px-16 desktop:py-20">
          <div
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage:
                'linear-gradient(rgba(255,255,255,0.022) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.022) 1px, transparent 1px)',
              backgroundSize: '60px 60px',
              WebkitMaskImage:
                'radial-gradient(ellipse 70% 80% at 50% 30%, #000, transparent 72%)',
              maskImage:
                'radial-gradient(ellipse 70% 80% at 50% 30%, #000, transparent 72%)',
            }}
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[radial-gradient(ellipse_46%_48%_at_50%_22%,rgba(77,125,255,0.18),rgba(77,125,255,0)_100%)] pointer-events-none"
          />

          <div className="relative">
            <h2 className="mx-auto max-w-[720px] text-[36px] font-black leading-[1.07] tracking-[-0.02em] text-text desktop:text-[52px]">
              {contact.titleLead}
              <br />
              <span className="text-accent">{contact.titleAccent}</span>
            </h2>
            <p className="mx-auto mt-6 max-w-[560px] text-[18px] leading-[1.6] text-text-secondary desktop:text-[18.5px]">
              {contact.description}
            </p>

            <ContactForm locale={locale} content={contact.form} />
          </div>
        </div>
      </Container>
    </section>
  )
}
