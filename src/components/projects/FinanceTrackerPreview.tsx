import BrowserFrame from '@/components/projects/BrowserFrame'
import type { SiteDictionary } from '@/content'
import type { TextDirection } from '@/lib/i18n'

interface FinanceTrackerPreviewProps {
  direction: TextDirection
  labels: SiteDictionary['mockups']
  projectTitle: string
}

const chartBars = [40, 58, 46, 70, 60, 84, 72, 92]

export default function FinanceTrackerPreview({
  direction,
  labels,
  projectTitle,
}: FinanceTrackerPreviewProps) {
  const finance = labels.finance

  return (
    <div aria-hidden="true" className="flex h-full items-end px-[18px] pt-6 desktop:px-5 desktop:pt-9 min-[1024px]:px-9">
      <BrowserFrame
        sampleLabel={labels.sampleLabel}
        className="w-full rounded-t-xl border-b-0 shadow-[0_-20px_60px_-30px_rgba(0,0,0,0.9)]"
      >
        <div dir={direction} className="grid desktop:grid-cols-[130px_1fr] min-[1024px]:grid-cols-[150px_1fr]">
          <div className="hidden border-s border-white/[0.06] bg-[#0b0c10] px-3.5 py-4 desktop:block">
            <div className="mb-[18px] flex items-center gap-2">
              <span className="size-[22px] rounded-md bg-accent" />
              <span className="min-w-0 truncate text-[13px] font-bold">{projectTitle}</span>
            </div>
            <div className="flex flex-col gap-[3px] text-[12.5px]">
              <div className="rounded-[7px] bg-accent/15 px-2.5 py-2 text-[#cdd8ff]">{finance.overview}</div>
              <div className="px-2.5 py-2 text-text-muted">{finance.transactions}</div>
              <div className="px-2.5 py-2 text-text-muted">{finance.investments}</div>
              <div className="px-2.5 py-2 text-text-muted">{finance.loans}</div>
              <div className="px-2.5 py-2 text-text-muted">{finance.reports}</div>
            </div>
          </div>

          <div className="min-w-0 p-3 min-[1024px]:p-[18px]">
            <div className="mb-3.5 grid grid-cols-2 gap-2.5 min-[1024px]:grid-cols-3">
              <div className="rounded-[9px] border border-white/[0.07] bg-surface p-3">
                <div className="text-[10.5px] text-text-muted">{finance.portfolio}</div>
                <div className="mt-1 whitespace-nowrap text-[15px] font-extrabold desktop:text-[17px]">₪ 180,000</div>
              </div>
              <div className="rounded-[9px] border border-white/[0.07] bg-surface p-3">
                <div className="text-[10.5px] text-text-muted">{finance.monthlyCashFlow}</div>
                <div className="mt-1 whitespace-nowrap text-[15px] font-extrabold text-success desktop:text-[17px]">+₪ 12,000</div>
              </div>
              <div className="col-span-2 rounded-[9px] border border-white/[0.07] bg-surface p-3 min-[1024px]:col-span-1">
                <div className="text-[10.5px] text-text-muted">{finance.liabilities}</div>
                <div className="mt-1 whitespace-nowrap text-[15px] font-extrabold desktop:text-[17px]">₪ 60,000</div>
              </div>
            </div>

            <div className="mb-3 rounded-[9px] border border-white/[0.07] bg-surface p-3.5">
              <div dir="ltr" className="flex h-[74px] items-end gap-[7px]">
                {chartBars.map((height, index) => (
                  <span
                    key={`${height}-${index}`}
                    className={`flex-1 rounded-t-[3px] ${index > 5 ? 'bg-accent-hover' : index === 3 || index === 5 ? 'bg-accent' : index === 4 ? 'bg-[#3a5299]' : index === 1 ? 'bg-[#33436e]' : 'bg-[#2a3350]'}`}
                    style={{ height: `${height}%` }}
                  />
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between rounded-[7px] bg-surface px-2.5 py-2 text-xs">
                <span className="text-[#c4c9d2]">{finance.incomeRow}</span>
                <span dir="ltr" className="text-success">+₪ 12,000</span>
              </div>
              <div className="flex items-center justify-between rounded-[7px] bg-surface px-2.5 py-2 text-xs">
                <span className="text-[#c4c9d2]">{finance.expenseRow}</span>
                <span dir="ltr" className="text-danger">−₪ 3,200</span>
              </div>
            </div>
          </div>
        </div>
      </BrowserFrame>
    </div>
  )
}
