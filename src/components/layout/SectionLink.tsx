'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import type { ComponentProps } from 'react'

/** Native same-page anchors emit hashchange; cross-page links retain Next navigation. */
export default function SectionLink(props: ComponentProps<typeof Link>) {
  const pathname = usePathname()
  if (typeof props.href === 'string' && props.href.startsWith(`${pathname}#`)) {
    const { href, children, className, onClick } = props
    return <a href={href} className={className} onClick={onClick}>{children}</a>
  }
  return <Link {...props} />
}
