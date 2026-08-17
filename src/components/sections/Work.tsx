import FinanceTrackerPreview from '@/components/projects/FinanceTrackerPreview'
import LifeOSPreview from '@/components/projects/LifeOSPreview'
import ProjectHeading from '@/components/projects/ProjectHeading'
import TradeGuardPreview from '@/components/projects/TradeGuardPreview'
import TradingJournalPreview from '@/components/projects/TradingJournalPreview'
import Container from '@/components/ui/Container'
import SectionHeading from '@/components/ui/SectionHeading'
import type { SiteDictionary } from '@/content'
import { getDirection, type Locale } from '@/lib/i18n'

interface WorkProps {
  locale: Locale
  dictionary: SiteDictionary
}

const projectSurface = 'overflow-hidden rounded-panel border border-white/[0.08] bg-[linear-gradient(160deg,#101319,#0b0d11)] transition-colors hover:border-accent/30'

export default function Work({ locale, dictionary }: WorkProps) {
  const { work, mockups } = dictionary
  const direction = getDirection(locale)

  return (
    <section id="work" className="scroll-mt-20 border-t border-white/[0.05] bg-section">
      <Container className="py-[72px] desktop:py-[120px]">
        <div className="mb-5 flex flex-col gap-8 desktop:flex-row desktop:items-end desktop:justify-between desktop:gap-10">
          <SectionHeading
            kicker={work.kicker}
            title={work.title}
            description={work.description}
            className="max-w-[620px]"
          />
          <p className="max-w-[300px] border-s-2 border-accent ps-4 text-base font-medium leading-[1.55] text-[#c4c9d2]">
            {work.lead}
          </p>
        </div>

        <div className="mt-11 flex flex-col gap-6">
          <article className={`${projectSurface} grid desktop:grid-cols-[0.82fr_1.18fr]`}>
            <div className="flex flex-col justify-center px-[18px] py-8 desktop:px-10 desktop:py-11">
              <ProjectHeading project={work.projects.financeTracker} />
            </div>
            <FinanceTrackerPreview
              direction={direction}
              labels={mockups}
              projectTitle={work.projects.financeTracker.title}
            />
          </article>

          <article className={projectSurface}>
            <div className="px-[18px] pt-8 desktop:px-10 desktop:pt-10">
              <div className="max-w-[560px]">
                <ProjectHeading project={work.projects.tradingJournal} />
              </div>
            </div>
            <div className="px-[18px] pb-[18px] pt-8 desktop:px-10 desktop:pb-10">
              <TradingJournalPreview
                direction={direction}
                labels={mockups}
                projectTitle={work.projects.tradingJournal.title}
              />
            </div>
          </article>

          <div className="grid gap-6 desktop:grid-cols-2">
            <article className={`${projectSurface} flex min-w-0 flex-col`}>
              <div className="px-[18px] pt-8 desktop:px-10 desktop:pt-10">
                <ProjectHeading project={work.projects.lifeOs} compact />
              </div>
              <LifeOSPreview
                direction={direction}
                labels={mockups.lifeOs}
                projectTitle={work.projects.lifeOs.title}
              />
            </article>

            <article className={`${projectSurface} flex min-w-0 flex-col`}>
              <div className="px-[18px] pt-8 desktop:px-10 desktop:pt-10">
                <ProjectHeading project={work.projects.tradeGuard} compact />
              </div>
              <TradeGuardPreview
                direction={direction}
                labels={mockups}
                projectTitle={work.projects.tradeGuard.title}
              />
            </article>
          </div>
        </div>
      </Container>
    </section>
  )
}
