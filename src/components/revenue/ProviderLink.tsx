'use client'

import { getProviderLink, type ProviderId } from '@/config/providers'
import { trackAffiliateClick } from '@/lib/analytics'

interface ProviderLinkProps {
  provider: ProviderId
  label?: string
  className?: string
}

export default function ProviderLink({ provider, label, className = '' }: ProviderLinkProps) {
  const link = getProviderLink(provider)

  const handleClick = () => {
    const locale = document.documentElement.lang === 'he' ? 'he' : 'en'

    trackAffiliateClick({
      isAffiliate: link.isAffiliate,
      provider,
      destinationUrl: link.href,
      pagePath: window.location.pathname,
      locale,
    })
  }

  return (
    <a
      href={link.href}
      target={link.target}
      rel={link.rel}
      data-provider={provider}
      data-affiliate={link.isAffiliate ? 'true' : 'false'}
      onClick={handleClick}
      className={className}
    >
      {label ?? link.name}
    </a>
  )
}
