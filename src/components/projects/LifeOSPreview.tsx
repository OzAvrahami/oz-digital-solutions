import PhoneFrame from '@/components/projects/PhoneFrame'
import type { SiteDictionary } from '@/content'
import type { TextDirection } from '@/lib/i18n'

interface LifeOSPreviewProps {
  direction: TextDirection
  labels: SiteDictionary['mockups']['lifeOs']
  projectTitle: string
}

export default function LifeOSPreview({ direction, labels, projectTitle }: LifeOSPreviewProps) {
  return (
    <div
      aria-hidden="true"
      className="relative mt-6 flex h-[270px] items-end justify-center overflow-hidden pb-2 desktop:block desktop:h-[300px] desktop:[-webkit-mask-image:linear-gradient(#000_78%,transparent)] desktop:[mask-image:linear-gradient(#000_78%,transparent)]"
    >
      <PhoneFrame
        direction={direction}
        title={projectTitle}
        className="relative z-10 w-[150px] desktop:absolute desktop:bottom-[-30px] desktop:end-10 desktop:w-[158px]"
      >
        <div className="px-[11px] pb-3.5 pt-1.5">
          <div className="mb-[9px] text-sm font-extrabold">{labels.today}</div>
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center gap-[7px] rounded-lg border border-accent/25 bg-accent/10 p-2">
              <span className="size-3 shrink-0 rounded bg-accent" />
              <span className="text-[10px] text-[#cdd8ff]">{labels.scopingCall}</span>
            </div>
            <div className="flex items-center gap-[7px] rounded-lg border border-white/[0.06] bg-surface p-2">
              <span className="size-3 shrink-0 rounded border-2 border-[#3a3e46]" />
              <span className="text-[10px] text-[#b4bac4]">{labels.writeDocument}</span>
            </div>
            <div className="flex items-center gap-[7px] rounded-lg border border-white/[0.06] bg-surface p-2">
              <span className="size-3 shrink-0 rounded border-2 border-[#3a3e46]" />
              <span className="text-[10px] text-[#b4bac4]">{labels.reviewBuild}</span>
            </div>
          </div>
        </div>
      </PhoneFrame>

      <PhoneFrame
        direction={direction}
        title={projectTitle}
        className="relative mb-[18px] -ms-11 w-[136px] opacity-95 desktop:absolute desktop:bottom-[-14px] desktop:start-11 desktop:mb-0 desktop:ms-0 desktop:w-[150px]"
      >
        <div className="px-[11px] pb-3.5 pt-1.5">
          <div className="mb-[9px] text-sm font-extrabold">{labels.weeklyPlan}</div>
          <div className="flex flex-col gap-[5px]">
            {[
              { label: labels.sunday, count: '4' },
              { label: labels.monday, count: '6' },
              { label: labels.tuesday, count: '3', active: true },
            ].map((day) => (
              <div
                key={day.label}
                className={`flex justify-between rounded-[7px] px-2 py-[7px] text-[10px] ${day.active ? 'bg-accent/10 text-[#cdd8ff]' : 'bg-surface text-[#b4bac4]'}`}
              >
                <span>{day.label}</span>
                <span className={day.active ? '' : 'text-accent'}>{day.count}</span>
              </div>
            ))}
          </div>
        </div>
      </PhoneFrame>
    </div>
  )
}
