import type { ProviderId } from '@/config/providers'

export type ServiceSlug = 'websites' | 'ecommerce' | 'automation'
export type GuideSlug =
  | 'shopify-vs-woocommerce-israel'
  | 'business-website-cost-2026'
  | 'small-business-automations'

interface PageMetadataContent {
  title: string
  description: string
}

export interface ServicePageContent {
  slug: ServiceSlug
  metadata: PageMetadataContent
  eyebrow: string
  title: string
  lead: string
  primaryCta: string
  secondaryCta: string
  outcomesTitle: string
  outcomes: readonly {
    title: string
    description: string
  }[]
  capabilitiesTitle: string
  capabilitiesIntro: string
  capabilities: readonly string[]
  technologyTitle: string
  technologyIntro: string
  technologies: readonly {
    name: string
    description: string
    provider?: ProviderId
  }[]
  processTitle: string
  process: readonly {
    number: string
    title: string
    description: string
  }[]
  closingTitle: string
  closingDescription: string
}

export type GuideBlock =
  | {
      type: 'section'
      id: string
      title: string
      paragraphs: readonly string[]
    }
  | {
      type: 'list'
      title?: string
      items: readonly string[]
    }
  | {
      type: 'comparison'
      caption: string
      headers: readonly [string, string, string]
      rows: readonly (readonly [string, string, string])[]
    }
  | {
      type: 'callout'
      title: string
      body: string
    }
  | {
      type: 'serviceLink'
      service: ServiceSlug
      title: string
      body: string
      label: string
    }
  | {
      type: 'providers'
      title: string
      body: string
      providers: readonly ProviderId[]
    }

export interface GuideContent {
  slug: GuideSlug
  metadata: PageMetadataContent
  category: string
  title: string
  description: string
  readingTime: string
  publishedLabel: string
  publishedDate: string
  updatedDate: string
  intro: readonly string[]
  blocks: readonly GuideBlock[]
}

export interface RevenueDictionary {
  services: Record<ServiceSlug, ServicePageContent>
  guidesIndex: {
    metadata: PageMetadataContent
    eyebrow: string
    title: string
    description: string
    readGuideLabel: string
    guideCountLabel: string
  }
  guides: Record<GuideSlug, GuideContent>
  common: {
    homeLabel: string
    servicesLabel: string
    guidesLabel: string
    contactLabel: string
    recommendedToolsLabel: string
    affiliateDisclosure: string
    tableOfContents: string
  }
}
