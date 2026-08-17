import HeroProductComposition from '@/components/hero/HeroProductComposition'
import ButtonLink from '@/components/ui/ButtonLink'
import Container from '@/components/ui/Container'
import Pill from '@/components/ui/Pill'
import type { SiteDictionary } from '@/content'
import { getDirection, type Locale } from '@/lib/i18n'

interface HeroProps {
  locale: Locale
  dictionary: SiteDictionary
}

export default function Hero({ locale, dictionary }: HeroProps) {
  const { hero } = dictionary
  const unavailableLabel = dictionary.footer.unavailableLabel

  return (
    <section id="top" className="relative overflow-hidden">
      <div className="portfolio-hero-grid absolute inset-0 pointer-events-none" aria-hidden="true" />
      <div className="portfolio-hero-glow absolute -top-20 start-[-60px] h-[520px] w-[620px] max-w-full pointer-events-none" aria-hidden="true" />

      <Container className="relative grid gap-[34px] pb-10 pt-[84px] desktop:grid-cols-[1.02fr_0.98fr] desktop:items-center desktop:gap-14 desktop:pb-[72px] desktop:pt-24">
        <div>
          <Pill className="mb-[30px] gap-[9px] px-3.5 py-[7px] text-[13.5px] font-medium text-[#c4c9d2]">
            <span className="size-[7px] rounded-full bg-success shadow-[0_0_10px_rgba(70,209,158,0.8)]" aria-hidden="true" />
            {hero.availability}
          </Pill>

          <h1 className="text-[40px] font-black leading-[1.05] tracking-[-0.015em] text-[#f7f8fa] desktop:text-[68px]">
            {hero.titleLead}
            <br />
            <span className="text-accent">{hero.titleAccent}</span>
          </h1>
          <p className="mt-7 max-w-[520px] text-[18px] leading-[1.6] text-text-secondary desktop:text-[19px]">
            {hero.description}
          </p>

          <div className="mt-9 flex flex-col items-stretch gap-3.5 desktop:flex-row desktop:flex-wrap desktop:items-center">
            <ButtonLink href="#" disabled title={unavailableLabel} className="w-full desktop:w-auto">
              {hero.primaryCta}
            </ButtonLink>
            <ButtonLink href={`/${locale}#work`} variant="secondary" className="w-full desktop:w-auto">
              {hero.secondaryCta}
              <span className="text-text-secondary" aria-hidden="true">{locale === 'he' ? '←' : '→'}</span>
            </ButtonLink>
          </div>

          <div className="mt-[46px] flex gap-8 border-t border-white/[0.07] pt-[30px] desktop:gap-10">
            <div>
              <div dir="ltr" className="text-[21px] font-extrabold tracking-[-0.01em] desktop:text-[23px]">{hero.primaryCapability.value}</div>
              <div className="mt-1 text-[13.5px] text-text-muted">{hero.primaryCapability.label}</div>
            </div>
            <div>
              <div dir="ltr" className="text-[21px] font-extrabold tracking-[-0.01em] desktop:text-[23px]">{hero.secondaryCapability.value}</div>
              <div className="mt-1 text-[13.5px] text-text-muted">{hero.secondaryCapability.label}</div>
            </div>
          </div>
        </div>

        <HeroProductComposition direction={getDirection(locale)} labels={dictionary.mockups} />
      </Container>
    </section>
  )
}
