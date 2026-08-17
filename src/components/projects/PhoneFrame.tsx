import type { ReactNode } from 'react'

import type { TextDirection } from '@/lib/i18n'

interface PhoneFrameProps {
  children: ReactNode
  direction: TextDirection
  title: string
  className?: string
}

export default function PhoneFrame({ children, direction, title, className = '' }: PhoneFrameProps) {
  return (
    <div
      className={`rounded-feature border border-white/10 bg-surface-raised p-[7px] shadow-[0_30px_70px_-24px_rgba(0,0,0,0.9)] ${className}`.trim()}
    >
      <div dir={direction} className="overflow-hidden rounded-panel bg-canvas">
        <div
          dir="ltr"
          className="flex items-center justify-between px-3 pb-1 pt-2 font-mono text-[9px] text-text-muted"
        >
          <span>9:41</span>
          <span>{title}</span>
        </div>
        {children}
      </div>
    </div>
  )
}
