import IdentityPanel from '@/components/about/IdentityPanel'
import Container from '@/components/ui/Container'
import { principleOrder, type SiteDictionary } from '@/content'

interface AboutProps {
  dictionary: SiteDictionary
}

export default function About({ dictionary }: AboutProps) {
  const { about, identity } = dictionary

  return (
    <section id="about" className="scroll-mt-20 border-t border-white/[0.05] bg-section">
      <Container className="grid items-center gap-[30px] py-[72px] desktop:grid-cols-[0.68fr_1.32fr] desktop:gap-16 desktop:py-[120px]">
        <IdentityPanel name={identity.name} />

        <div>
          <p className="mb-[18px] font-mono text-[13px] tracking-[0.12em] text-accent">
            {'// '}{about.kicker}
          </p>
          <h2 className="mb-[22px] text-[30px] font-extrabold leading-[1.18] tracking-[-0.01em] text-text desktop:text-[46px] desktop:leading-[1.1]">
            {about.title}
          </h2>
          <p className="mb-8 max-w-[640px] text-[18px] leading-[1.7] text-[#b4bac4] desktop:text-[18.5px]">
            {about.body}
          </p>

          <ul className="grid max-w-[620px] grid-cols-2 gap-3 max-[400px]:grid-cols-1 desktop:gap-4">
            {principleOrder.map((key) => {
              const principle = about.principles[key]

              return (
                <li
                  key={key}
                  className="rounded-[14px] border border-white/[0.08] bg-white/[0.015] p-5 transition-colors hover:border-accent/30"
                >
                  <div className="mb-[9px] flex items-center gap-[9px]">
                    <span className="size-1.5 shrink-0 rounded-sm bg-accent" aria-hidden="true" />
                    <h3 className="text-base font-bold text-text">{principle.title}</h3>
                  </div>
                  <p className="text-[14.5px] leading-[1.55] text-text-secondary">
                    {principle.description}
                  </p>
                </li>
              )
            })}
          </ul>
        </div>
      </Container>
    </section>
  )
}
