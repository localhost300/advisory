'use client'

import { useEffect, useState } from 'react'
import { AlertCircle, DollarSign, TrendingUp } from 'lucide-react'

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
    async function fetchNews() {
      try {
        const response = await fetch('/api/finance-news')
        if (!response.ok) throw new Error('Failed to fetch news')
        const data = await response.json()
        setNews(data.items || [])
      } catch (fetchError) {
        console.error('Error fetching news:', fetchError)
        setError('Unable to load financial news')
        setNews([])
      } finally {
        setLoading(false)
      }
    }

    fetchNews()
  }, [])

  if (loading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[...Array(4)].map((_, index) => (
          <div key={index} className="card h-48 animate-pulse p-6">
            <div className="mb-4 h-4 w-3/4 rounded bg-gray-200" />
            <div className="mb-2 h-3 w-full rounded bg-gray-100" />
            <div className="h-3 w-5/6 rounded bg-gray-100" />
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
          <p className="text-sm text-yellow-800">{error}. No placeholder links are shown.</p>
        </div>
      )}
      {news.length ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {news.slice(0, 4).map((item, index) => (
            <a key={item.link} href={item.link} target="_blank" rel="noopener noreferrer" className="group card p-6 transition-all hover:border-green-300 hover:shadow-lg">
              <div className="mb-3 flex items-start justify-between">
                <div className="inline-flex items-center justify-center rounded-lg bg-green-100 p-2">
                  {index % 2 === 0 ? <TrendingUp size={16} className="text-green-600" /> : <DollarSign size={16} className="text-green-600" />}
                </div>
                <span className="text-xs font-bold uppercase tracking-widest text-green-600">{item.category || 'News'}</span>
              </div>
              <h3 className="line-clamp-3 font-serif text-base font-semibold leading-6 transition-colors group-hover:text-green-600">{item.title}</h3>
              <p className="mt-4 text-xs text-gray-500">{item.source} · {item.pubDate}</p>
            </a>
          ))}
        </div>
      ) : (
        <p className="border-y border-gray-200 py-8 text-sm text-gray-500">Yahoo Finance headlines are temporarily unavailable. Please check back shortly.</p>
      )}
    </div>
  )
}
