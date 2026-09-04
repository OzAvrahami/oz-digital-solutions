import Link from 'next/link'

import Container from '@/components/ui/Container'
import SectionHeading from '@/components/ui/SectionHeading'
import { serviceOrder, type SiteDictionary } from '@/content'
import type { Locale } from '@/lib/i18n'

interface ServicesProps {
  locale: Locale
  dictionary: SiteDictionary
}

export default function Services({ locale, dictionary }: ServicesProps) {
  const { services } = dictionary
  const serviceLinks = {
    websites: `/${locale}/services/websites`,
    automation: `/${locale}/services/automation`,
    ai: `/${locale}/services/automation`,
  } as const

  return (
    <section id="services" className="scroll-mt-20 py-[72px] desktop:py-[120px]">
      <Container>
        <SectionHeading
          kicker={services.kicker}
          title={services.title}
          description={services.description}
          className="mb-14 max-w-[720px]"
        />

        <div className="border-t border-white/[0.09]">
          {serviceOrder.map((key) => {
            const service = services.items[key]
            const href = key in serviceLinks ? serviceLinks[key as keyof typeof serviceLinks] : null
            const row = (
              <>
                <span className="font-mono text-[15px] text-accent">{service.number}</span>
                <h3 className="text-xl font-bold text-text desktop:text-[23px]">{service.title}</h3>
                <p className="col-span-full mt-2 text-base leading-[1.6] text-text-secondary desktop:col-span-1 desktop:mt-0">
                  {service.description}
                </p>
                <span className="hidden justify-self-start text-[22px] text-text-quiet desktop:block" aria-hidden="true">
                  {locale === 'he' ? '←' : '→'}
                </span>
              </>
            )

            return href ? (
              <Link
                key={key}
                href={href}
                className="grid grid-cols-[auto_1fr] gap-x-3.5 gap-y-1 border-b border-white/[0.09] px-1 py-[26px] transition-colors hover:bg-white/[0.035] desktop:grid-cols-[80px_320px_1fr_40px] desktop:items-start desktop:gap-10 desktop:px-2 desktop:py-8"
              >
                {row}
              </Link>
            ) : (
              <div key={key} className="grid grid-cols-[auto_1fr] gap-x-3.5 gap-y-1 border-b border-white/[0.09] px-1 py-[26px] desktop:grid-cols-[80px_320px_1fr_40px] desktop:items-start desktop:gap-10 desktop:px-2 desktop:py-8">
                {row}
              </div>
            )
          })}
        </div>
      </Container>
    </section>
  )
}
