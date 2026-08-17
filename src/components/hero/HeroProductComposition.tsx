import type { SiteDictionary } from '@/content'
import type { TextDirection } from '@/lib/i18n'

interface HeroProductCompositionProps {
  direction: TextDirection
  labels: SiteDictionary['mockups']
}

const chartHeights = ['42%', '60%', '50%', '76%', '66%', '90%']

export default function HeroProductComposition({
  direction,
  labels,
}: HeroProductCompositionProps) {
  return (
    <div
      aria-hidden="true"
      className="relative min-h-[390px] w-full pt-2 desktop:h-[460px] desktop:min-h-0"
    >
      <div className="animate-product-float overflow-hidden rounded-[14px] border border-white/10 bg-[#0e1014] shadow-product desktop:absolute desktop:end-0 desktop:top-2 desktop:w-full desktop:max-w-[448px]">
        <div dir="ltr" className="flex items-center gap-[7px] border-b border-white/[0.06] bg-[#0b0c0f] px-3.5 py-[11px]">
          <span className="size-[9px] rounded-full bg-[#ff5f57]" />
          <span className="size-[9px] rounded-full bg-[#febc2e]" />
          <span className="size-[9px] rounded-full bg-[#28c840]" />
          <span className="mx-auto font-mono text-[10.5px] text-text-quiet">finance-tracker</span>
          <span className="rounded-[5px] border border-accent/30 px-[7px] py-0.5 font-mono text-[9px] text-accent-light">
            {labels.sampleLabel}
          </span>
        </div>

        <div dir={direction} className="p-3.5 desktop:p-[18px]">
          <div className="mb-3.5 grid grid-cols-2 gap-2.5 desktop:gap-3">
            <div className="rounded-[10px] border border-white/[0.07] bg-surface p-3 desktop:p-3.5">
              <div className="text-[10.5px] text-text-muted desktop:text-[11.5px]">{labels.finance.totalAssets}</div>
              <div className="mt-1 text-[17px] font-extrabold desktop:text-[21px]">₪ 250,000</div>
              <div className="mt-1 text-[11px] text-success">+4%</div>
            </div>
            <div className="rounded-[10px] border border-white/[0.07] bg-surface p-3 desktop:p-3.5">
              <div className="text-[10.5px] text-text-muted desktop:text-[11.5px]">{labels.finance.income}</div>
              <div className="mt-1 text-[17px] font-extrabold desktop:text-[21px]">₪ 40,000</div>
              <div className="mt-1 text-[11px] text-success">+6%</div>
            </div>
          </div>

          <div className="rounded-[10px] border border-white/[0.07] bg-surface p-3.5 desktop:p-4">
            <div className="mb-3 text-xs text-text-muted desktop:mb-3.5">{labels.finance.monthlyIncome}</div>
            <div dir="ltr" className="flex h-[70px] items-end gap-2 desktop:h-[82px]">
              {chartHeights.map((height, index) => (
                <span
                  key={height}
                  className={`flex-1 rounded-t-[4px] ${index === 3 ? 'bg-accent' : index === 5 ? 'bg-accent-hover' : index === 4 ? 'bg-[#3a5299]' : index === 1 ? 'bg-[#33436e]' : 'bg-[#2a3350]'}`}
                  style={{ height }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 start-1 z-10 w-[142px] animate-product-float-alt rounded-feature border border-white/10 bg-surface-raised p-2 shadow-[0_40px_80px_-24px_rgba(0,0,0,0.95)] desktop:start-[6px] desktop:w-[152px]">
        <div dir={direction} className="overflow-hidden rounded-panel bg-canvas">
          <div dir="ltr" className="flex items-center justify-between px-3.5 pb-1 pt-[9px] font-mono text-[10px] text-text-muted">
            <span>9:41</span>
            <span>LifeOS</span>
          </div>
          <div className="px-3 pb-3.5 pt-2">
            <div className="mb-2.5 text-[15px] font-extrabold">{labels.lifeOs.today}</div>
            <div className="flex flex-col gap-[7px]">
              <div className="flex items-center gap-2 rounded-[9px] border border-accent/25 bg-accent/10 p-[9px]">
                <span className="size-3.5 shrink-0 rounded border-2 border-accent" />
                <span className="text-[11px] text-[#cdd8ff]">{labels.lifeOs.clientCall}</span>
              </div>
              <div className="flex items-center gap-2 rounded-[9px] border border-white/[0.06] bg-surface p-[9px]">
                <span className="size-3.5 shrink-0 rounded border-2 border-[#3a3e46]" />
                <span className="text-[11px] text-[#b4bac4]">{labels.lifeOs.weeklyPlanning}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        dir="ltr"
        className="absolute end-2.5 top-5 z-20 flex animate-product-float items-center gap-[9px] rounded-control border border-white/10 bg-surface px-3.5 py-[11px] shadow-[0_20px_50px_-16px_rgba(0,0,0,0.8)] desktop:bottom-[118px] desktop:end-auto desktop:start-6 desktop:top-auto"
      >
        <span className="inline-flex size-7 items-center justify-center rounded-lg bg-success/15 text-sm text-success">⚡</span>
        <span className="flex items-center gap-1.5 font-mono text-[10.5px] text-[#b4bac4]">
          <span>{labels.automation.source}</span>
          <span className="text-success">→</span>
          <span>{labels.automation.target}</span>
        </span>
      </div>
    </div>
  )
}
