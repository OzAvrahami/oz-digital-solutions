import type { ReactNode } from 'react'

interface BrowserFrameProps {
  children: ReactNode
  sampleLabel: string
  title?: string
  className?: string
}

export default function BrowserFrame({
  children,
  sampleLabel,
  title,
  className = '',
}: BrowserFrameProps) {
  return (
    <div
      className={`overflow-hidden border border-white/[0.09] bg-canvas ${className}`.trim()}
    >
      <div
        dir="ltr"
        className="flex min-w-0 items-center gap-1.5 border-b border-white/[0.06] bg-[#0b0c0f] px-3 py-2.5 desktop:px-3.5"
      >
        <span className="size-2 shrink-0 rounded-full bg-[#ff5f57]" />
        <span className="size-2 shrink-0 rounded-full bg-[#febc2e]" />
        <span className="size-2 shrink-0 rounded-full bg-[#28c840]" />
        {title ? (
          <span className="min-w-0 flex-1 truncate text-center font-mono text-[9px] text-text-quiet desktop:text-[10.5px]">
            {title}
          </span>
        ) : (
          <span className="flex-1" />
        )}
        <span className="shrink-0 rounded-[5px] border border-accent/30 px-[7px] py-0.5 font-mono text-[9px] text-accent-light">
          {sampleLabel}
        </span>
      </div>
      {children}
    </div>
  )
}
