export type NavigationKey = 'work' | 'services' | 'guides' | 'process' | 'about' | 'contact'

export type CapabilityKey =
  | 'websites'
  | 'businessSystems'
  | 'applications'
  | 'customSoftware'
  | 'automation'
  | 'integrations'
  | 'ai'

export type ServiceKey = 'websites' | 'businessSystems' | 'applications' | 'automation' | 'ai'
export type ProjectId = 'financeTracker' | 'tradingJournal' | 'lifeOs' | 'tradeGuard'
export type ProcessKey = 'understand' | 'define' | 'build' | 'launch'
export type WhyKey = 'direct' | 'productThinking' | 'workflowFit' | 'endToEnd'
export type PrincipleKey = 'productThinking' | 'businessSystems' | 'technologyAndBusiness' | 'directCollaboration'
type SocialKey = 'email' | 'linkedIn' | 'github'

interface NumberedContentItem {
  number: string
  title: string
  description: string
}

export interface ProjectContent {
  number: string
  title: string
  category: string
  description: string
  tags: readonly string[]
}

export interface SiteDictionary {
  metadata: {
    title: string
    description: string
  }
  identity: {
    name: string
    portraitLabel: string
  }
  navigation: Record<NavigationKey, string>
  header: {
    contactCta: string
    menuLabel: string
    closeMenuLabel: string
    languageLabel: string
    hebrewLabel: string
    englishShortLabel: string
    englishLongLabel: string
  }
  hero: {
    availability: string
    titleLead: string
    titleAccent: string
    description: string
    primaryCta: string
    secondaryCta: string
    primaryCapability: {
      value: string
      label: string
    }
    secondaryCapability: {
      value: string
      label: string
    }
  }
  capabilityMarquee: Record<CapabilityKey, string>
  services: {
    kicker: string
    title: string
    description: string
    items: Record<ServiceKey, NumberedContentItem>
  }
  work: {
    kicker: string
    title: string
    description: string
    lead: string
    projects: Record<ProjectId, ProjectContent>
  }
  process: {
    kicker: string
    title: string
    description: string
    items: Record<ProcessKey, NumberedContentItem>
  }
  whyWorkWithMe: {
    kicker: string
    titleLead: string
    titleAccent: string
    description: string
    items: Record<WhyKey, string>
  }
  technology: {
    kicker: string
    title: string
    description: string
    items: readonly string[]
  }
  about: {
    kicker: string
    title: string
    body: string
    principles: Record<PrincipleKey, {
      title: string
      description: string
    }>
  }
  contact: {
    titleLead: string
    titleAccent: string
    description: string
    form: {
      nameLabel: string
      namePlaceholder: string
      contactLabel: string
      contactPlaceholder: string
      messageLabel: string
      messagePlaceholder: string
      submitLabel: string
      pendingLabel: string
      reassurance: string
      successMessage: string
      validationMessage: string
      configurationErrorMessage: string
      submissionErrorMessage: string
      validation: {
        nameRequired: string
        nameTooLong: string
        contactRequired: string
        contactTooLong: string
        messageRequired: string
        messageTooLong: string
        invalidCharacters: string
      }
    }
  }
  footer: {
    positioning: string
    navigationTitle: string
    servicesTitle: string
    connectTitle: string
    serviceLinks: readonly {
      slug: 'websites' | 'ecommerce' | 'automation'
      label: string
    }[]
    socialLabels: Record<SocialKey, string>
    copyright: string
  }
  mockups: {
    sampleLabel: string
    automation: {
      source: string
      target: string
    }
    lifeOs: {
      today: string
      weeklyPlan: string
      clientCall: string
      weeklyPlanning: string
      scopingCall: string
      writeDocument: string
      reviewBuild: string
      sunday: string
      monday: string
      tuesday: string
    }
    finance: {
      totalAssets: string
      income: string
      monthlyIncome: string
      portfolio: string
      monthlyCashFlow: string
      liabilities: string
      incomeRow: string
      expenseRow: string
      overview: string
      transactions: string
      investments: string
      loans: string
      reports: string
    }
    trading: {
      winRate: string
      profitFactor: string
      totalTrades: string
      cumulative: string
      equityCurve: string
      recentTrades: string
      long: string
      short: string
      assetA: string
      assetB: string
      assetC: string
      assetD: string
    }
    tradeGuard: {
      protectionActive: string
      connected: string
      maximumDailyLoss: string
      maximumTrades: string
      automaticEnforcement: string
      set: string
      active: string
    }
  }
}
