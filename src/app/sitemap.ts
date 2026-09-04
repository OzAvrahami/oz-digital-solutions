import type { MetadataRoute } from 'next'

import { getSiteUrl } from '@/config/site'
import { guideSlugs, serviceSlugs } from '@/content/revenue'
import { locales } from '@/lib/i18n'

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    { pathname: '', changeFrequency: 'monthly' as const, priority: 1 },
    ...serviceSlugs.map((slug) => ({ pathname: `/services/${slug}`, changeFrequency: 'monthly' as const, priority: 0.8 })),
    { pathname: '/guides', changeFrequency: 'weekly' as const, priority: 0.8 },
    ...guideSlugs.map((slug) => ({ pathname: `/guides/${slug}`, changeFrequency: 'monthly' as const, priority: 0.7 })),
  ]

  return routes.flatMap((route) => {
    const languages = {
      he: getSiteUrl(`/he${route.pathname}`),
      en: getSiteUrl(`/en${route.pathname}`),
    }

    return locales.map((locale) => ({
      url: getSiteUrl(`/${locale}${route.pathname}`),
      changeFrequency: route.changeFrequency,
      priority: locale === 'he' ? route.priority : Math.max(route.priority - 0.1, 0.1),
      alternates: { languages },
    }))
  })
}
