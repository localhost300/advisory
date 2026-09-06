import { NextResponse } from 'next/server'
import { getFinanceNews } from '@/lib/finance-news'

export async function GET() {
  const articles = await getFinanceNews()

  return NextResponse.json({
    items: articles.map((article) => ({
      title: article.headline,
      link: article.url,
      source: article.source,
      pubDate: article.published,
      category: article.category,
    })),
  })
}
