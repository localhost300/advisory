import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.advisoryrecord.online'
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/match/loading', '/match/results'],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
