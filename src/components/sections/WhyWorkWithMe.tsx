import Container from '@/components/ui/Container'
import SectionHeading from '@/components/ui/SectionHeading'
import { whyOrder, type SiteDictionary } from '@/content'

interface WhyWorkWithMeProps {
  dictionary: SiteDictionary
}

export default function WhyWorkWithMe({ dictionary }: WhyWorkWithMeProps) {
  const { whyWorkWithMe } = dictionary

  return (
    <section id="why-work-with-me" className="border-t border-white/[0.05] bg-section">
      <Container className="grid gap-[34px] py-[72px] desktop:grid-cols-[0.9fr_1.1fr] desktop:items-start desktop:gap-16 desktop:py-[120px]">
        <SectionHeading
          kicker={whyWorkWithMe.kicker}
          title={(
            <>
              {whyWorkWithMe.titleLead}
              <br />
              <span className="text-accent">{whyWorkWithMe.titleAccent}</span>
            </>
          )}
          description={whyWorkWithMe.description}
          size="large"
          className="max-w-[400px]"
        />

        <ol className="border-t border-white/[0.09]">
          {whyOrder.map((key, index) => (
            <li
              key={key}
              className="grid grid-cols-[56px_1fr] items-baseline gap-6 border-b border-white/[0.09] px-1 py-[26px]"
            >
              <span className="font-mono text-[13px] text-accent">0{index + 1}</span>
              <p className="text-[20px] font-semibold leading-[1.4] text-[#eef0f3] desktop:text-[22px]">
                {whyWorkWithMe.items[key]}
              </p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  )
}
