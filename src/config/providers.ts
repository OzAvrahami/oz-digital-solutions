export type ProviderId =
  | 'shopify'
  | 'wix'
  | 'make'
  | 'hostinger'
  | 'elementor'
  | 'upress'

interface ProviderConfig {
  name: string
  destinationUrl: string
  affiliateUrl: string | null
}

export const recommendedProviders = {
  shopify: {
    name: 'Shopify',
    destinationUrl: 'https://www.shopify.com/',
    affiliateUrl: null,
  },
  wix: {
    name: 'Wix',
    destinationUrl: 'https://www.wix.com/',
    affiliateUrl: null,
  },
  make: {
    name: 'Make',
    destinationUrl: 'https://www.make.com/',
    affiliateUrl: null,
  },
  hostinger: {
    name: 'Hostinger',
    destinationUrl: 'https://www.hostinger.com/',
    affiliateUrl: null,
  },
  elementor: {
    name: 'Elementor',
    destinationUrl: 'https://elementor.com/',
    affiliateUrl: null,
  },
  upress: {
    name: 'uPress',
    destinationUrl: 'https://www.upress.co.il/',
    affiliateUrl: null,
  },
} as const satisfies Record<ProviderId, ProviderConfig>

export function getProviderLink(providerId: ProviderId) {
  const provider = recommendedProviders[providerId]
  const isAffiliate = Boolean(provider.affiliateUrl)

  return {
    name: provider.name,
    href: provider.affiliateUrl ?? provider.destinationUrl,
    isAffiliate,
    target: '_blank' as const,
    rel: isAffiliate ? 'sponsored noopener noreferrer' : 'noopener noreferrer',
  }
}
