import BrowserFrame from '@/components/projects/BrowserFrame'
import type { SiteDictionary } from '@/content'
import type { TextDirection } from '@/lib/i18n'

interface TradeGuardPreviewProps {
  direction: TextDirection
  labels: SiteDictionary['mockups']
  projectTitle: string
}

export default function TradeGuardPreview({ direction, labels, projectTitle }: TradeGuardPreviewProps) {
  const tradeGuard = labels.tradeGuard

  return (
    <div aria-hidden="true" className="mt-auto px-[18px] pt-6 desktop:px-10">
      <BrowserFrame
        sampleLabel={labels.sampleLabel}
        title={projectTitle}
        className="rounded-t-xl border-b-0"
      >
        <div dir={direction} className="p-3 desktop:p-4">
          <div className="mb-3.5 flex items-center justify-between gap-3">
            <div className="flex min-w-0 items-center gap-2">
              <span className="size-[9px] shrink-0 rounded-full bg-success shadow-[0_0_8px_rgba(70,209,158,0.7)]" />
              <span className="truncate text-[13px] font-semibold">{tradeGuard.protectionActive}</span>
            </div>
            <span className="shrink-0 font-mono text-[10px] text-text-quiet desktop:text-[10.5px]">{tradeGuard.connected}</span>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between gap-3 rounded-[9px] border border-white/[0.06] bg-surface px-3 py-[11px] desktop:px-[13px]">
              <span className="min-w-0 text-[12px] text-[#c4c9d2] desktop:text-[12.5px]">{tradeGuard.maximumDailyLoss}</span>
              <span className="shrink-0 rounded-full border border-white/10 px-2 py-[3px] text-[11px] text-text-secondary">{tradeGuard.set}</span>
            </div>
            <div className="flex items-center justify-between gap-3 rounded-[9px] border border-white/[0.06] bg-surface px-3 py-[11px] desktop:px-[13px]">
              <span className="min-w-0 text-[12px] text-[#c4c9d2] desktop:text-[12.5px]">{tradeGuard.maximumTrades}</span>
              <span className="shrink-0 rounded-full border border-white/10 px-2 py-[3px] text-[11px] text-text-secondary">{tradeGuard.set}</span>
            </div>
            <div className="flex items-center justify-between gap-3 rounded-[9px] border border-success/20 bg-success/[0.08] px-3 py-[11px] desktop:px-[13px]">
              <span className="min-w-0 text-[12px] text-[#b7ebd6] desktop:text-[12.5px]">{tradeGuard.automaticEnforcement}</span>
              <span className="shrink-0 text-[11.5px] font-semibold text-success">{tradeGuard.active}</span>
            </div>
          </div>
        </div>
      </BrowserFrame>
    </div>
  )
}
