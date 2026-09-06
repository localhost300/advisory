import Link from 'next/link'
import { ArrowRight, BookOpen, Briefcase, Compass, Heart, LockKeyhole, Scale, Mic2 } from 'lucide-react'
import { Navbar, Footer } from '@/components/shell'
import { FinanceNews } from '@/components/finance-news'
import { articles } from '@/lib/data'

const why = [
  ['01', 'Personalized', 'Your match reflects your goals, experience, preferences, and risk profile.', Compass],
  ['02', 'Independent', 'Explore advisors based on fit instead of navigating an endless directory.', Scale],
  ['03', 'Transparent', 'Understand focus, experience, credentials, and approach before starting a conversation.', BookOpen],
  ['04', 'Private', 'Your questionnaire details are used to improve your match and handled with care.', LockKeyhole],
]

const steps = [
  ['Tell us about yourself', 'Add the essential context that shapes your search.'],
  ['Share your financial goals', 'Tell us what you want your finances to support.'],
  ['Define your preferences', 'Choose the approach, expertise, and communication you value.'],
  ['Meet suitable advisors', 'Review relevant firms and request an introduction.'],
]

const opportunities = [
  ['Board Roles', 'Serve on advisory boards and drive strategic decisions', Briefcase],
  ['Speaking Engagements', 'Share your expertise at conferences and events', Mic2],
  ['Advisory Projects', 'Provide consulting for specific initiatives', Briefcase],
  ['Mentorship', 'Guide and develop the next generation', Heart],
]

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <section className="container grid min-h-[570px] items-center gap-14 py-16 md:grid-cols-[1.05fr_.95fr] md:py-20">
          <div className="fade">
            <div className="eyebrow mb-6">Advisor discovery, thoughtfully designed</div>
            <h1 className="display max-w-xl text-5xl leading-[1.04] md:text-[68px]">Find financial guidance that fits.</h1>
            <p className="mt-7 max-w-lg text-base leading-7 text-gray-600">A simpler way to connect with an advisor based on your goals, preferences, and financial needs.</p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link href="/match" className="btn btn-dark">Match with an Advisor <ArrowRight size={15} /></Link>
              <Link href="#how" className="btn btn-light">How it Works</Link>
            </div>
            <p className="mt-5 text-xs text-gray-500">Takes about 5 minutes · No obligation</p>
          </div>
          <div className="relative mx-auto aspect-square w-full max-w-[480px] overflow-hidden">
            <div className="absolute inset-[7%] rounded-full border border-[#10b98140]" />
            <div className="absolute inset-[19%] rounded-full border border-gray-300" />
            <div className="absolute inset-[32%] rounded-full border border-[#10b98160]" />
            <div className="absolute left-[48%] top-[7%] h-[86%] w-px rotate-[29deg] bg-gradient-to-b from-transparent via-gray-300 to-transparent" />
            <div className="absolute left-[13%] top-[54%] h-px w-[76%] -rotate-12 bg-gradient-to-r from-transparent via-[#10b98190] to-transparent" />
            <div className="absolute left-[42%] top-[42%] h-20 w-20 rounded-full bg-green-600 shadow-[0_16px_50px_#10b98135]"><div className="absolute left-4 top-4 h-3 w-3 rounded-full bg-green-300" /></div>
            <span className="absolute left-[12%] top-[33%] h-3 w-3 rounded-full bg-green-600" />
            <span className="absolute bottom-[17%] right-[21%] h-2 w-2 rounded-full bg-green-900" />
            <span className="absolute right-[8%] top-[44%] text-[10px] tracking-[.15em] text-gray-500">GOALS · RISK · FIT</span>
          </div>
        </section>

        <section className="w-full bg-gradient-to-b from-green-50 via-green-50/70 to-white py-24">
          <div className="container">
            <div className="mb-8 flex items-end justify-between">
              <div><div className="eyebrow">Financial News & Insights</div><h2 className="display mt-2 text-3xl">Market News & Analysis</h2></div>
              <Link className="text-xs font-bold text-green-600" href="/insights">View all insights →</Link>
            </div>
            <FinanceNews />
          </div>
        </section>

        <section id="about" className="container py-24">
          <div className="max-w-xl"><div className="eyebrow">Why AdvisoryRecord</div><h2 className="display mt-3 text-4xl md:text-5xl">A better way to find financial guidance.</h2></div>
          <div className="mt-12 grid gap-px bg-gray-200 md:grid-cols-2 lg:grid-cols-4">
            {why.map(([number, title, description, Icon]) => <div key={number as string} className="border border-green-100 bg-white p-7"><div className="flex items-center justify-between"><span className="font-serif text-green-600">{number as string}</span><Icon size={19} strokeWidth={1.4} className="text-green-600" /></div><h3 className="mt-12 text-base font-bold">{title as string}</h3><p className="mt-3 text-sm leading-6 text-gray-600">{description as string}</p></div>)}
          </div>
        </section>

        <section id="how" className="w-full bg-green-900 py-24 text-white">
          <div className="container"><div className="eyebrow text-green-300">The matching process</div><h2 className="display mt-3 text-4xl">Clear steps. Considered matches.</h2><div className="relative mt-14 grid gap-8 md:grid-cols-4"><div className="absolute left-4 right-4 top-4 hidden h-px bg-white/20 md:block" />{steps.map(([title, description], index) => <div key={title} className="relative"><span className="relative z-10 inline-flex h-8 w-8 items-center justify-center rounded-full border border-green-300 bg-green-900 text-xs text-green-300">{index + 1}</span><h3 className="mt-6 font-serif text-xl">{title}</h3><p className="mt-3 text-sm leading-6 text-gray-300">{description}</p></div>)}</div></div>
        </section>

        <section className="container py-24"><div className="mb-16 max-w-2xl"><div className="eyebrow">Engagement Opportunities</div><h2 className="display mt-3 text-4xl md:text-5xl">Multiple ways to collaborate</h2></div><div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">{opportunities.map(([title, description, Icon]) => <div key={title as string} className="card border-green-200 p-7 transition-shadow hover:shadow-lg"><div className="mb-4 flex items-center justify-between"><h3 className="font-serif text-lg font-semibold">{title as string}</h3><Icon size={20} className="text-green-600" /></div><p className="text-sm text-gray-600">{description as string}</p></div>)}</div></section>

        <section className="w-full bg-green-50 py-24"><div className="container"><div className="grid items-center border border-green-200 bg-white px-7 py-12 shadow-sm md:grid-cols-[1fr_auto] md:px-14"><div><h2 className="display text-4xl">Find an advisor who fits your goals.</h2><p className="mt-3 text-sm text-gray-600">Answer a few questions and we'll help narrow the field.</p></div><div className="mt-7 md:mt-0"><Link href="/match" className="btn btn-dark">Match with an Advisor <ArrowRight size={15} /></Link><p className="mt-3 text-center text-[11px] text-gray-500">Takes about 5 minutes · No obligation</p></div></div></div></section>

        <section className="container pb-24"><div className="flex items-end justify-between"><div><div className="eyebrow">AdvisoryRecord Insights</div><h2 className="display mt-3 text-4xl md:text-5xl">Financial thinking, without the noise.</h2></div><Link href="/insights" className="hidden text-sm font-bold text-green-600 sm:block">Explore insights →</Link></div><div className="mt-10 grid gap-5 md:grid-cols-3"><Link href={articles[0].url} className="card block md:col-span-2"><div className="h-52 bg-[linear-gradient(120deg,#059669,#10b981_50%,#6ee7b7)] opacity-90" /><div className="p-7"><span className="eyebrow">{articles[0].category}</span><h3 className="display mt-3 text-3xl">{articles[0].headline}</h3><p className="mt-3 max-w-2xl text-sm leading-6 text-gray-600">{articles[0].summary}</p><span className="mt-6 inline-block text-xs font-bold text-green-700">Read article →</span></div></Link><div className="space-y-5">{articles.slice(1, 3).map((article) => <Link href={article.url} key={article.headline} className="card block p-7"><span className="eyebrow">{article.category}</span><h3 className="mt-4 font-serif text-xl leading-7">{article.headline}</h3><p className="mt-5 text-xs text-gray-500">{article.published}</p><span className="mt-4 inline-block text-xs font-bold text-green-700">Read article →</span></Link>)}</div></div></section>
      </main>
      <Footer />
    </>
  )
}
