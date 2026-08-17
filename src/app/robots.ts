import type { MetadataRoute } from 'next'

import { getSiteUrl, siteConfig } from '@/config/site'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: getSiteUrl('/sitemap.xml'),
    host: siteConfig.productionSiteUrl,
  }
}
