import Container from '@/components/ui/Container'
import Pill from '@/components/ui/Pill'
import type { SiteDictionary } from '@/content'

interface TechnologyProps {
  dictionary: SiteDictionary
}

export default function Technology({ dictionary }: TechnologyProps) {
  const { technology } = dictionary

  return (
    <section id="technology">
      <Container className="py-[72px] text-center desktop:py-[116px]">
        <p className="mb-[18px] font-mono text-[13px] tracking-[0.12em] text-accent">
          {'// '}{technology.kicker}
        </p>
        <h2 className="mx-auto max-w-[640px] text-[30px] font-extrabold leading-[1.18] tracking-[-0.01em] text-text desktop:text-[42px] desktop:leading-[1.14]">
          {technology.title}
        </h2>
        <p className="mx-auto mt-5 max-w-[620px] text-lg leading-[1.6] text-text-secondary">
          {technology.description}
        </p>
        <div className="mx-auto mt-11 flex max-w-[820px] flex-wrap justify-center gap-3">
          {technology.items.map((item) => (
            <Pill
              key={item}
              className="px-[18px] py-2.5 font-mono text-sm font-normal text-[#c4c9d2] transition-colors hover:border-accent/40 hover:text-text"
            >
              {item}
            </Pill>
          ))}
        </div>
      </Container>
    </section>
  )
}
