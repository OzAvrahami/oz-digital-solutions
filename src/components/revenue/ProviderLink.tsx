import { getProviderLink, type ProviderId } from '@/config/providers'

interface ProviderLinkProps {
  provider: ProviderId
  label?: string
  className?: string
}

export default function ProviderLink({ provider, label, className = '' }: ProviderLinkProps) {
  const link = getProviderLink(provider)

  return (
    <a
      href={link.href}
      target={link.target}
      rel={link.rel}
      data-provider={provider}
      data-affiliate={link.isAffiliate ? 'true' : 'false'}
      className={className}
    >
      {label ?? link.name}
    </a>
  )
}
