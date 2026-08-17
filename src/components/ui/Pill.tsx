import type { HTMLAttributes } from 'react'

interface PillProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: 'neutral' | 'accent' | 'success'
}

const toneClasses = {
  neutral: 'border-white/10 bg-white/[0.02] text-text-secondary',
  accent: 'border-accent/30 bg-accent/10 text-accent-light',
  success: 'border-success/30 bg-success/10 text-success',
}

export default function Pill({
  tone = 'neutral',
  className = '',
  ...props
}: PillProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-4 py-2 text-sm font-medium ${toneClasses[tone]} ${className}`.trim()}
      {...props}
    />
  )
}
