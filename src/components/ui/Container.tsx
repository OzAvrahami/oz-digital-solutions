import type { HTMLAttributes } from 'react'

type ContainerProps = HTMLAttributes<HTMLDivElement>

export default function Container({ className = '', ...props }: ContainerProps) {
  return (
    <div
      className={`mx-auto w-full max-w-site px-5 desktop:px-10 ${className}`.trim()}
      {...props}
    />
  )
}
