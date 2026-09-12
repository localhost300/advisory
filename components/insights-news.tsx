'use client'

import { useEffect, useState } from 'react'
import { ExternalLink } from 'lucide-react'

type NewsItem = {
  title: string
  link: string
  source: string
  pubDate: string
  category?: string
}

export function InsightsNews() {
  const [items, setItems] = useState<NewsItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let active = true
    let retry: ReturnType<typeof setTimeout> | undefined

    async function load(attempt = 0) {
      try {
        const response = await fetch('/api/finance-news', { cache: 'no-store' })
        if (!response.ok) throw new Error('Headline request failed')
        const data = (await response.json()) as { items?: NewsItem[] }
        if (!data.items?.length) throw new Error('Headline feed was empty')
        if (active) setItems(data.items)
      } catch {
        if (active && attempt < 2) retry = setTimeout(() => load(attempt + 1), 1500 * (attempt + 1))
      } finally {
        if (active) setLoading(false)
      }
    }

    load()
    return () => {
      active = false
      if (retry) clearTimeout(retry)
    }
  }, [])

  if (loading) return <div className="mt-6 space-y-px border-y bg-gray-100">
    {[0, 1, 2].map((item) => <div key={item} className="h-28 animate-pulse bg-white" />)}
  </div>

  return <div className="mt-6 divide-y border-y">
    {items.length ? items.map((article) => <a target="_blank" rel="noreferrer" key={article.link} href={article.link} className="group flex items-start justify-between gap-5 py-6">
      <div>
        <span className="eyebrow">{article.category || 'Markets'}</span>
        <h3 className="mt-2 font-serif text-xl group-hover:underline">{article.title}</h3>
        <p className="mt-2 text-xs text-gray-500">{article.source} · {article.pubDate}</p>
      </div>
      <ExternalLink className="shrink-0 text-gray-400" size={16} />
    </a>) : <div className="py-8">
      <h3 className="font-serif text-xl">Latest headlines are currently unavailable.</h3>
      <p className="mt-2 text-sm text-gray-500">Please try again shortly.</p>
    </div>}
  </div>
}
