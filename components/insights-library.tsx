'use client'

import { useState } from 'react'
import Link from 'next/link'
import { FinanceArticle } from '@/types'

const topics = ['All', 'Investing', 'Markets', 'Retirement', 'Personal Finance', 'Economic Outlook', 'Risk']

export function InsightsLibrary({ articles }: { articles: FinanceArticle[] }) {
  const [topic, setTopic] = useState('All')
  const visible = topic === 'All' ? articles : articles.filter((article) => article.category === topic)

  return <>
    <aside>
      <h2 className="display text-3xl">Explore by topic</h2>
      <div className="mt-6 grid grid-cols-2 gap-px bg-gray-200">
        {topics.map((item) => <button
          key={item}
          type="button"
          onClick={() => setTopic(item)}
          aria-pressed={topic === item}
          className={`p-5 text-left text-sm font-bold transition-colors ${topic === item ? 'bg-green-700 text-white' : 'bg-gray-50 hover:bg-green-50 hover:text-green-800'}`}
        >{item}</button>)}
      </div>
    </aside>

    <section className="col-span-full pb-4 pt-8" id="editorial">
      <div className="flex items-end justify-between gap-4">
        <div>
          <div className="eyebrow">{topic === 'All' ? 'All topics' : topic}</div>
          <h2 className="display mt-2 text-3xl">From AdvisoryRecord Editorial</h2>
        </div>
        <span className="text-xs text-gray-500">{visible.length} {visible.length === 1 ? 'article' : 'articles'}</span>
      </div>
      <div className="mt-6 grid gap-px bg-gray-200 md:grid-cols-2">
        {visible.map((article) => <article key={article.headline} className="bg-white p-7">
          <span className="eyebrow">{article.category}</span>
          <h3 className="mt-4 font-serif text-2xl">{article.headline}</h3>
          <p className="mt-3 text-sm leading-6 text-gray-600">{article.summary}</p>
          <Link href={article.url} className="mt-6 inline-block text-xs font-bold text-green-700 hover:underline">Read article →</Link>
        </article>)}
      </div>
    </section>
  </>
}
