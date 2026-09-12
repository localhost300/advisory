import type { MetadataRoute } from 'next'
import { advisors, articles } from '@/lib/data'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.advisoryrecord.online'
  const now = new Date()
  const core: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: now, changeFrequency: 'weekly', priority: 1 },
    { url: `${baseUrl}/advisors`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/insights`, lastModified: now, changeFrequency: 'daily', priority: 0.8 },
    { url: `${baseUrl}/verification`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/match`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${baseUrl}/privacy`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${baseUrl}/terms`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${baseUrl}/disclosures`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${baseUrl}/cookies`, lastModified: now, changeFrequency: 'yearly', priority: 0.2 },
    { url: `${baseUrl}/accessibility`, lastModified: now, changeFrequency: 'yearly', priority: 0.2 },
  ]
  const advisorPages: MetadataRoute.Sitemap = advisors.map((advisor) => ({
    url: `${baseUrl}/advisors/${advisor.id}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.8,
  }))
  const articlePages: MetadataRoute.Sitemap = articles.map((article) => ({
    url: `${baseUrl}${article.url}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.7,
  }))
  return [...core, ...advisorPages, ...articlePages]
}
