import type { HTMLAttributes, ReactNode } from 'react'

interface SectionHeadingProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  kicker: string
  title: ReactNode
  description?: ReactNode
  align?: 'start' | 'center'
  size?: 'default' | 'large'
}

const alignmentClasses = {
  start: 'text-start',
  center: 'text-center',
}

const titleSizeClasses = {
  default: 'text-3xl leading-[1.18] desktop:text-[46px] desktop:leading-[1.14]',
  large: 'text-4xl leading-[1.1] desktop:text-[54px] desktop:leading-[1.06]',
}

export default function SectionHeading({
  kicker,
  title,
  description,
  align = 'start',
  size = 'default',
  className = '',
  ...props
}: SectionHeadingProps) {
  return (
    <div className={`${alignmentClasses[align]} ${className}`.trim()} {...props}>
      <p className="mb-[18px] font-mono text-[13px] tracking-[0.12em] text-accent">
        {'// '}{kicker}
      </p>
      <h2 className={`${titleSizeClasses[size]} font-extrabold tracking-[-0.01em] text-text`}>
        {title}
      </h2>
      {description ? (
        <p className="mt-5 text-lg leading-[1.6] text-text-secondary">
          {description}
        </p>
      ) : null}
    </div>
  )
}
