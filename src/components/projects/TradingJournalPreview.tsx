import BrowserFrame from '@/components/projects/BrowserFrame'
import type { SiteDictionary } from '@/content'
import type { TextDirection } from '@/lib/i18n'

interface TradingJournalPreviewProps {
  direction: TextDirection
  labels: SiteDictionary['mockups']
  projectTitle: string
}

const performanceBars = [22, 34, 30, 46, 40, 58, 52, 70, 64, 82, 76, 96]

export default function TradingJournalPreview({
  direction,
  labels,
  projectTitle,
}: TradingJournalPreviewProps) {
  const trading = labels.trading
  const kpis = [
    { label: trading.winRate, value: '62%' },
    { label: trading.profitFactor, value: '1.8' },
    { label: trading.totalTrades, value: '240' },
    { label: trading.cumulative, value: '+14%', positive: true },
  ]
  const trades = [
    { asset: trading.assetA, side: trading.long, value: '+2.1%', positive: true },
    { asset: trading.assetB, side: trading.short, value: '−0.8%', positive: false },
    { asset: trading.assetC, side: trading.long, value: '+3.4%', positive: true },
    { asset: trading.assetD, side: trading.long, value: '+0.6%', positive: true },
  ]

  return (
    <div aria-hidden="true">
      <BrowserFrame sampleLabel={labels.sampleLabel} title={projectTitle} className="rounded-xl">
        <div dir={direction} className="grid grid-cols-2 gap-2.5 p-3 desktop:grid-cols-4 desktop:gap-3 desktop:p-5">
          {kpis.map((kpi) => (
            <div key={kpi.label} className="rounded-[9px] border border-white/[0.07] bg-surface p-3 desktop:p-[13px]">
              <div className="text-[11px] text-text-muted">{kpi.label}</div>
              <div className={`mt-1 text-lg font-extrabold desktop:text-xl ${kpi.positive ? 'text-success' : ''}`}>
                {kpi.value}
              </div>
            </div>
          ))}
        </div>

        <div dir={direction} className="grid gap-3 px-3 pb-3 desktop:grid-cols-[1.4fr_1fr] desktop:px-5 desktop:pb-5">
          <div className="rounded-[9px] border border-white/[0.07] bg-surface p-3.5 desktop:p-4">
            <div className="mb-3.5 text-[11.5px] text-text-muted">{trading.equityCurve}</div>
            <div dir="ltr" className="relative h-[120px]">
              <div className="absolute inset-0 flex flex-col justify-between">
                {[0, 1, 2, 3].map((line) => (
                  <span key={line} className="border-t border-white/[0.04]" />
                ))}
              </div>
              <div className="absolute inset-0 flex items-end gap-[5px]">
                {performanceBars.map((height, index) => (
                  <span
                    key={`${height}-${index}`}
                    className={`flex-1 rounded-t-sm bg-gradient-to-b ${index > 8 ? 'from-accent-hover to-accent' : 'from-accent to-[#3a63d4] opacity-85'}`}
                    style={{ height: `${height}%` }}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="rounded-[9px] border border-white/[0.07] bg-surface p-3.5">
            <div className="mb-3 text-[11.5px] text-text-muted">{trading.recentTrades}</div>
            <div className="flex flex-col gap-2">
              {trades.map((trade) => (
                <div key={trade.asset} className="flex items-center justify-between gap-3 text-xs">
                  <span className="min-w-0 truncate text-[#c4c9d2]">{trade.asset} · {trade.side}</span>
                  <span dir="ltr" className={`shrink-0 ${trade.positive ? 'text-success' : 'text-danger'}`}>
                    {trade.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </BrowserFrame>
    </div>
  )
}
