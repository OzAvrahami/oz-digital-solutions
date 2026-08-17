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
  projects: Record<ProjectId, ProjectLinkConfig>
}

export const siteConfig = {
  productionSiteUrl: null,
  email: null,
  linkedInUrl: null,
  githubUrl: null,
  cvUrl: null,
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
