import { siteConfig } from '@/config/site'

const personId = `${siteConfig.productionSiteUrl}/#person`
const websiteId = `${siteConfig.productionSiteUrl}/#website`

const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Person',
      '@id': personId,
      name: 'Oz Avrahami',
      url: siteConfig.productionSiteUrl,
      email: siteConfig.email,
      sameAs: [siteConfig.linkedInUrl, siteConfig.githubUrl],
    },
    {
      '@type': 'WebSite',
      '@id': websiteId,
      url: siteConfig.productionSiteUrl,
      name: 'Oz Avrahami',
      inLanguage: ['he-IL', 'en-US'],
      publisher: {
        '@id': personId,
      },
    },
  ],
}

export default function PortfolioStructuredData() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData).replace(/</g, '\\u003c'),
      }}
    />
  )
}
