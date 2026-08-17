import { capabilityOrder, type SiteDictionary } from '@/content'

interface CapabilityMarqueeProps {
  dictionary: SiteDictionary
}

function CapabilityList({ dictionary }: CapabilityMarqueeProps) {
  return (
    <div className="flex shrink-0 gap-3 px-1.5">
      {capabilityOrder.map((key) => (
        <span
          key={key}
          className="whitespace-nowrap rounded-full border border-white/[0.08] px-4 py-[7px] text-[13.5px] text-text-secondary"
        >
          {dictionary.capabilityMarquee[key]}
        </span>
      ))}
    </div>
  )
}

export default function CapabilityMarquee({ dictionary }: CapabilityMarqueeProps) {
  return (
    <div className="portfolio-marquee border-y border-white/[0.06] py-4">
      <div dir="ltr" className="portfolio-marquee-track flex w-max">
        <CapabilityList dictionary={dictionary} />
        <div aria-hidden="true" className="portfolio-marquee-duplicate">
          <CapabilityList dictionary={dictionary} />
        </div>
      </div>
    </div>
  )
}
