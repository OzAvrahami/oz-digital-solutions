import { en } from './en'
import { he } from './he'
import type {
  CapabilityKey,
  NavigationKey,
  PrincipleKey,
  ProcessKey,
  ServiceKey,
  SiteDictionary,
  WhyKey,
} from './types'

export const dictionaries = {
  he,
  en,
} as const satisfies Record<'he' | 'en', SiteDictionary>

export const navigationOrder = ['work', 'services', 'process', 'about', 'contact'] as const satisfies readonly NavigationKey[]
export const capabilityOrder = ['websites', 'businessSystems', 'applications', 'customSoftware', 'automation', 'integrations', 'ai'] as const satisfies readonly CapabilityKey[]
export const serviceOrder = ['websites', 'businessSystems', 'applications', 'automation', 'ai'] as const satisfies readonly ServiceKey[]
export const processOrder = ['understand', 'define', 'build', 'launch'] as const satisfies readonly ProcessKey[]
export const whyOrder = ['direct', 'productThinking', 'workflowFit', 'endToEnd'] as const satisfies readonly WhyKey[]
export const principleOrder = ['productThinking', 'businessSystems', 'technologyAndBusiness', 'directCollaboration'] as const satisfies readonly PrincipleKey[]

export type { ProjectId, SiteDictionary } from './types'
