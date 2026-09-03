import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const response = await fetch('https://yh-finance.p.rapidapi.com/news/v2/get-trending', {
      method: 'GET',
      headers: {
        'x-rapidapi-key': process.env.RAPIDAPI_KEY || '',
        'x-rapidapi-host': 'yh-finance.p.rapidapi.com',
        'Content-Type': 'application/json'
      }
    })

    if (!response.ok) {
      throw new Error('Failed to fetch from Yahoo Finance API')
    }

    const data = await response.json()
    
    // Transform the data to our format
    const news = data.finance?.result?.[0]?.news?.map((item: any) => ({
      title: item.title,
      link: item.link,
      source: item.source,
      pubDate: item.pubDate ? formatDate(new Date(item.pubDate * 1000)) : 'Recently',
      category: item.category || 'Markets'
    })) || []

    return NextResponse.json({ items: news })
  } catch (error) {
    console.error('Finance API error:', error)
    // Return mock data if API fails
    return NextResponse.json({ 
      items: [
        {
          title: 'Fed Rate Decision Expected to Impact Markets',
          link: '#',
          source: 'MarketWatch',
          pubDate: '2 hours ago',
          category: 'Markets'
        },
        {
          title: 'Tech Stocks Rally on Strong Earnings Reports',
          link: '#',
          source: 'CNBC',
          pubDate: '4 hours ago',
          category: 'Technology'
        },
        {
          title: 'Gold Prices Hit New 6-Month High',
          link: '#',
          source: 'Bloomberg',
          pubDate: '6 hours ago',
          category: 'Commodities'
        },
        {
          title: 'Cryptocurrency Market Sees Significant Volatility',
          link: '#',
          source: 'Cointelegraph',
          pubDate: '1 hour ago',
          category: 'Crypto'
        }
      ]
    })
  }
}

function formatDate(date: Date): string {
  const now = new Date()
  const diff = now.getTime() - date.getTime()
  const hours = Math.floor(diff / (1000 * 60 * 60))
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))

  if (hours < 1) return 'Just now'
  if (hours < 24) return `${hours}h ago`
  if (days < 7) return `${days}d ago`
  
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}
