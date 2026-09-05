import Link from 'next/link'

import type { Locale } from '@/lib/i18n'

interface BreadcrumbItem {
  label: string
  href?: string
}

interface BreadcrumbsProps {
  locale: Locale
  items: readonly BreadcrumbItem[]
  homeLabel: string
}

export default function Breadcrumbs({ locale, items, homeLabel }: BreadcrumbsProps) {
  const crumbs = [{ label: homeLabel, href: `/${locale}` }, ...items]

  return (
    <nav aria-label="Breadcrumb" className="studio-breadcrumbs font-mono text-[12px]">
      <ol className="flex flex-wrap items-center gap-2">
        {crumbs.map((item, index) => {
          const isLast = index === crumbs.length - 1

          return (
            <li key={`${item.label}-${index}`} className="flex items-center gap-2">
              {index > 0 ? <span aria-hidden="true" className="studio-breadcrumb-separator">/</span> : null}
              {item.href && !isLast ? (
                <Link className="studio-breadcrumb-link rounded transition-colors" href={item.href}>
                  {item.label}
                </Link>
              ) : (
                <span aria-current={isLast ? 'page' : undefined} className={isLast ? 'studio-breadcrumb-current' : undefined}>
                  {item.label}
                </span>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
