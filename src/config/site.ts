import type { ProjectId } from '@/content'

export interface ProjectLinkConfig {
  liveUrl: string | null
  repositoryUrl: string | null
}

export interface SiteConfig {
  productionSiteUrl: string | null
  email: string | null
  linkedInUrl: string | null
  githubUrl: string | null
  cvUrl: string | null
  contactDelivery: {
    recipientEmail: string
    senderName: string
    senderEmail: string
  }
  projects: Record<ProjectId, ProjectLinkConfig>
}

export const siteConfig = {
  productionSiteUrl: null,
  email: 'contact@ozavrahami.co.il',
  linkedInUrl: 'https://www.linkedin.com/in/oz-avrahami-b209584a/',
  githubUrl: 'https://github.com/OzAvrahami',
  cvUrl: null,
  contactDelivery: {
    recipientEmail: 'contact@ozavrahami.co.il',
    senderName: 'Oz Avrahami Website',
    senderEmail: 'website@ozavrahami.co.il',
  },
  projects: {
    financeTracker: {
      liveUrl: null,
      repositoryUrl: null,
    },
    tradingJournal: {
      liveUrl: null,
      repositoryUrl: null,
    },
    lifeOs: {
      liveUrl: null,
      repositoryUrl: null,
    },
    tradeGuard: {
      liveUrl: null,
      repositoryUrl: null,
    },
  },
} as const satisfies SiteConfig
