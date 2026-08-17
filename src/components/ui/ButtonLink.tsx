import type { AnchorHTMLAttributes } from 'react'

export interface ButtonLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: 'primary' | 'secondary' | 'inverse'
  size?: 'compact' | 'default'
}

const variantClasses = {
  primary: 'bg-accent text-white shadow-accent hover:bg-accent-hover',
  secondary: 'border border-white/15 bg-transparent text-text hover:border-white/30',
  inverse: 'bg-text text-canvas hover:bg-white',
}

const sizeClasses = {
  compact: 'rounded-[10px] px-[22px] py-[11px] text-[15px]',
  default: 'rounded-control px-7 py-[15px] text-base',
}

export default function ButtonLink({
  variant = 'primary',
  size = 'default',
  className = '',
  ...props
}: ButtonLinkProps) {
  return (
    <a
      className={`inline-flex items-center justify-center gap-2.5 font-semibold transition-colors ${variantClasses[variant]} ${sizeClasses[size]} ${className}`.trim()}
      {...props}
    />
  )
}
