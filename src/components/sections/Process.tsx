import Container from '@/components/ui/Container'
import SectionHeading from '@/components/ui/SectionHeading'
import { processOrder, type SiteDictionary } from '@/content'

interface ProcessProps {
  dictionary: SiteDictionary
}

export default function Process({ dictionary }: ProcessProps) {
  const { process } = dictionary

  return (
    <section id="process" className="scroll-mt-20">
      <Container className="py-[72px] desktop:py-[120px]">
        <SectionHeading
          kicker={process.kicker}
          title={process.title}
          description={process.description}
          className="mb-[60px] max-w-[640px]"
        />

        <ol className="max-w-[860px] border-s-2 border-white/[0.09] ps-[30px] desktop:ps-11">
          {processOrder.map((key) => {
            const step = process.items[key]

            return (
              <li
                key={key}
                className="relative grid grid-cols-[54px_1fr] items-baseline gap-4 border-b border-white/[0.07] py-[30px] desktop:grid-cols-[84px_1fr] desktop:gap-7"
              >
                <span
                  aria-hidden="true"
                  className="absolute start-[-37px] top-10 size-3.5 rounded-full bg-accent shadow-[0_0_0_5px_#0a0b0e,0_0_16px_rgba(77,125,255,0.6)] desktop:start-[-53px]"
                />
                <span className="font-mono text-[26px] font-medium text-[#2f3646] desktop:text-[34px]">
                  {step.number}
                </span>
                <div>
                  <h3 className="mb-2.5 text-2xl font-bold text-text">{step.title}</h3>
                  <p className="max-w-[560px] text-[16.5px] leading-[1.6] text-text-secondary">
                    {step.description}
                  </p>
                </div>
              </li>
            )
          })}
        </ol>
      </Container>
    </section>
  )
}
