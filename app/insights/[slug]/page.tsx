import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import { Footer, Navbar } from '@/components/shell'
import { articles } from '@/lib/data'

type ArticlePageProps = { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return articles.map((article) => ({ slug: article.url.split('/').pop() }))
}

export async function generateMetadata({ params }: ArticlePageProps) {
  const { slug } = await params
  const article = articles.find((item) => item.url.endsWith(`/${slug}`))
  return article ? { title: `${article.headline} | AdvisoryRecord`, description: article.summary } : {}
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params
  const article = articles.find((item) => item.url.endsWith(`/${slug}`))
  if (!article) notFound()

  return (
    <>
      <Navbar />
      <main>
        <article className="container max-w-4xl py-14 md:py-20">
          <Link href="/insights" className="inline-flex items-center gap-2 text-xs font-bold text-gray-500 hover:text-green-700">
            <ArrowLeft size={14} /> Back to Insights
          </Link>
          <header className="mt-12 border-b border-green-100 pb-10">
            <div className="eyebrow">{article.category}</div>
            <h1 className="display mt-4 max-w-3xl text-5xl leading-tight md:text-6xl">{article.headline}</h1>
            <div className="mt-6 flex flex-wrap gap-x-4 gap-y-2 text-xs text-gray-500">
              <span>{article.source}</span>
              <span>{article.published}</span>
            </div>
          </header>
          <div className="mt-10 max-w-2xl space-y-6 text-base leading-8 text-gray-700">
            {article.body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </div>
          <div className="mt-14 border-t border-green-100 pt-8">
            <Link href="/insights" className="text-sm font-bold text-green-700 hover:underline">Continue exploring Insights</Link>
          </div>
        </article>
      </main>
      <Footer />
    </>
  )
}
