import { Footer, Navbar } from '@/components/shell'
import { InsightsLibrary } from '@/components/insights-library'
import { InsightsNews } from '@/components/insights-news'
import { MarketStrip } from '@/components/market'
import { articles } from '@/lib/data'

export default function Insights() {
  return <>
    <Navbar />
    <main>
      <section className="container py-16 md:py-20">
        <div className="eyebrow">AdvisoryRecord Insights</div>
        <h1 className="display mt-3 max-w-3xl text-5xl md:text-6xl">Financial thinking, without the noise.</h1>
        <p className="mt-5 max-w-xl text-sm leading-6 text-gray-600">Context for better conversations about markets, investing, retirement, and planning.</p>
      </section>

      <section className="border-y bg-white py-12">
        <div className="container">
          <div className="flex items-end justify-between gap-4">
            <h2 className="display text-3xl">Live stock market snapshot</h2>
            <span className="text-[10px] text-gray-500">Updated every 5 minutes</span>
          </div>
          <div className="mt-6"><MarketStrip /></div>
        </div>
      </section>

      <section className="container py-16">
        <div className="grid gap-10 lg:grid-cols-[1.35fr_.65fr]">
          <div>
            <div>
              <h2 className="display text-3xl">Latest financial news</h2>
            </div>
            <InsightsNews />
          </div>
          <InsightsLibrary articles={articles} />
        </div>
      </section>
    </main>
    <Footer />
  </>
}
