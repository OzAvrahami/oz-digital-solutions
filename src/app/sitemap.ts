import type { MetadataRoute } from 'next'

import { getSiteUrl } from '@/config/site'

export default function sitemap(): MetadataRoute.Sitemap {
  const hebrewUrl = getSiteUrl('/he')
  const englishUrl = getSiteUrl('/en')
  const languages = {
    he: hebrewUrl,
    en: englishUrl,
  }

  return [
    {
      url: hebrewUrl,
      changeFrequency: 'monthly',
      priority: 1,
      alternates: { languages },
    },
    {
      url: englishUrl,
      changeFrequency: 'monthly',
      priority: 0.9,
      alternates: { languages },
    },
  ]
}
