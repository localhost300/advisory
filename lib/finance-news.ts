import { FinanceArticle } from '@/types'

const YAHOO_FINANCE_RSS_URL = 'https://finance.yahoo.com/news/rssindex'

function decodeXml(value: string) {
  return value
    .replace(/^<!\[CDATA\[([\s\S]*?)\]\]>$/, '$1')
    .replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number(code)))
    .replace(/&#x([\da-f]+);/gi, (_, code) => String.fromCodePoint(parseInt(code, 16)))
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&')
    .trim()
}

function readElement(item: string, tag: string) {
  const match = item.match(new RegExp(`<${tag}(?:\\s[^>]*)?>([\\s\\S]*?)<\\/${tag}>`, 'i'))
  return match ? decodeXml(match[1]) : ''
}

export function parseFinanceNews(xml: string): FinanceArticle[] {
  return [...xml.matchAll(/<item(?:\s[^>]*)?>([\s\S]*?)<\/item>/gi)]
    .map<FinanceArticle | null>((match) => {
      const item = match[1]
      const headline = readElement(item, 'title')
      const url = readElement(item, 'link')
      const publishedAt = readElement(item, 'pubDate')
      const source = readElement(item, 'source') || 'Yahoo Finance'
      const date = new Date(publishedAt)

      if (!headline || !url || Number.isNaN(date.getTime())) return null

      return {
        headline,
        url,
        published: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        source,
        category: 'Markets',
        summary: 'Open the original source for the full story.',
        body: [],
      } satisfies FinanceArticle
    })
    .filter((article): article is FinanceArticle => article !== null)
    .slice(0, 6)
}

// Server-side integration point. Yahoo's RSS remains external and content is never reproduced.
export async function getFinanceNews(): Promise<FinanceArticle[]> {
  try {
    const response = await fetch(YAHOO_FINANCE_RSS_URL, {
      headers: { Accept: 'application/rss+xml, application/xml;q=0.9' },
      next: { revalidate: 900 },
    })

    if (!response.ok) throw new Error(`Yahoo Finance feed returned ${response.status}`)

    return parseFinanceNews(await response.text())
  } catch (error) {
    console.error('Unable to load Yahoo Finance headlines:', error)
    return []
  }
}
