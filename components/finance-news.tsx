'use client'
import { useEffect, useState } from 'react'
import { Newspaper, TrendingUp, DollarSign, AlertCircle } from 'lucide-react'

interface NewsItem {
  title: string
  link: string
  source: string
  pubDate: string
  category?: string
}

export function FinanceNews() {
  const [news, setNews] = useState<NewsItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchNews = async () => {
      try {
        // Using RapidAPI Yahoo Finance News endpoint
        const response = await fetch('/api/finance-news')
        if (!response.ok) throw new Error('Failed to fetch news')
        const data = await response.json()
        setNews(data.items || [])
      } catch (err) {
        console.error('Error fetching news:', err)
        setError('Unable to load financial news')
        // Set mock data as fallback
        setNews([
          {
            title: 'Fed Rate Decision Expected to Impact Markets',
            link: '#',
            source: 'Market Watch',
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
        ])
      } finally {
        setLoading(false)
      }
    }

    fetchNews()
  }, [])

  if (loading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="card h-48 animate-pulse p-6">
            <div className="h-4 w-3/4 bg-gray-200 rounded mb-4"></div>
            <div className="h-3 w-full bg-gray-100 rounded mb-2"></div>
            <div className="h-3 w-5/6 bg-gray-100 rounded"></div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div>
      {error && (
        <div className="mb-6 flex items-center gap-3 rounded-lg border border-yellow-200 bg-yellow-50 p-4">
          <AlertCircle size={18} className="text-yellow-600" />
          <p className="text-sm text-yellow-800">{error}. Showing sample data.</p>
        </div>
      )}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {news.slice(0, 4).map((item, idx) => (
          <a
            key={idx}
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className="group card p-6 hover:shadow-lg hover:border-green-300 transition-all"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="inline-flex items-center justify-center p-2 bg-green-100 rounded-lg">
                {idx % 2 === 0 ? (
                  <TrendingUp size={16} className="text-green-600" />
                ) : (
                  <DollarSign size={16} className="text-green-600" />
                )}
              </div>
              <span className="text-xs font-bold tracking-widest text-green-600 uppercase">
                {item.category || 'News'}
              </span>
            </div>
            <h3 className="font-serif text-base leading-6 font-semibold group-hover:text-green-600 transition-colors line-clamp-3">
              {item.title}
            </h3>
            <p className="mt-4 text-xs text-gray-500">
              {item.source} · {item.pubDate}
            </p>
          </a>
        ))}
      </div>
    </div>
  )
}
