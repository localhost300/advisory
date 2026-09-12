import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'
import { ArrowRight, ExternalLink, ShieldCheck } from 'lucide-react'
import { Navbar, Footer } from '@/components/shell'
import { advisors } from '@/lib/data'

export function generateStaticParams() {
  return advisors.map((advisor) => ({ id: advisor.id }))
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params
  const advisor = advisors.find((item) => item.id === id)
  if (!advisor) return {}

  return {
    title: `${advisor.name} | Financial Advisor Profile | AdvisoryRecord`,
    description: `Research ${advisor.name}, including firm affiliation, registration information, specialties, credentials, and BrokerCheck disclosures.`,
    alternates: { canonical: `/advisors/${advisor.id}` },
    openGraph: {
      title: `${advisor.name} | AdvisoryRecord`,
      description: `Research the public professional record for ${advisor.name}.`,
      type: 'profile',
      url: `/advisors/${advisor.id}`,
    },
  }
}

export default async function Profile({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const advisor = advisors.find((item) => item.id === id)
  if (!advisor) notFound()

  return (
    <>
      <Navbar />
      <main className="container py-12 md:py-20">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Person',
          name: advisor.name,
          jobTitle: 'Financial professional',
          url: new URL(`/advisors/${advisor.id}`, process.env.NEXT_PUBLIC_SITE_URL || 'https://www.advisoryrecord.online').toString(),
          sameAs: [advisor.reportUrl],
        }) }} />
        <div className="mb-8 text-[11px] text-gray-500">ADVISOR DIRECTORY / {advisor.name.toUpperCase()}</div>
        <section className="grid gap-10 border-b border-gray-200 pb-12 md:grid-cols-[1fr_auto]">
          <div className="flex flex-col gap-6 sm:flex-row">
            <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full border border-green-200 bg-green-50 font-serif text-2xl text-green-700">{advisor.initials}</div>
            <div>
              <div className="eyebrow">FINRA BrokerCheck profile</div>
              <h1 className="display mt-2 text-5xl">{advisor.name}</h1>
              <p className="mt-3 text-sm text-gray-600">{advisor.specialties.join(' · ')}</p>
              <div className="mt-4 flex flex-wrap gap-2 text-[11px]">
                {advisor.fiduciary && <span className="flex items-center gap-1 border border-green-200 px-2 py-1"><ShieldCheck size={12} /> Fiduciary model*</span>}
                <span className="border border-green-200 px-2 py-1">{advisor.availability}</span>
              </div>
            </div>
          </div>
        </section>
        <div className="grid gap-12 py-12 lg:grid-cols-[1fr_320px]">
          <div className="space-y-10">
            <Block title="About"><p>{advisor.about}</p></Block>
            <Block title="Investment approach"><p>{advisor.approach}</p></Block>
            <Block title="Specialties"><div className="flex flex-wrap gap-2">{advisor.specialties.map((specialty) => <span key={specialty} className="border border-gray-200 bg-white px-3 py-2 text-xs">{specialty}</span>)}</div></Block>
            <Block title="Credentials / regulatory information"><div className="border-l-2 border-green-500 pl-4"><p>{advisor.credentials.join(' · ')}</p><p className="mt-2 text-xs text-gray-500">*Registration information is based on the supplied BrokerCheck report and should be independently reviewed.</p><a href={advisor.reportUrl} target="_blank" rel="noreferrer" className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-green-700 underline underline-offset-4">Get full report <ExternalLink size={14} /></a></div></Block>
          </div>
          <aside className="h-fit border border-gray-200 bg-white p-6">
            <h2 className="font-serif text-xl">Registration details</h2>
            <dl className="mt-6 space-y-5 text-sm">
              <Detail k="Experience" v={`${advisor.years}+ years`} />
              <Detail k="Firms registered with" v={String(advisor.firmCount)} />
              <Detail k="State licenses" v={String(advisor.licensedStates)} />
              <Detail k="Self-regulatory organizations" v={String(advisor.sroCount)} />
              <Detail k="Service area" v={advisor.location} />
              <Detail k="Contact" v={advisor.communication.join(' and ')} />
            </dl>
            <Link href={`/advisors/${advisor.id}/connect`} className="btn btn-dark mt-7 w-full">Contact Advisor <ArrowRight size={14} /></Link>
          </aside>
        </div>
      </main>
      <Footer />
    </>
  )
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return <section><h2 className="display text-3xl">{title}</h2><div className="mt-4 max-w-2xl text-sm leading-7 text-gray-600">{children}</div></section>
}

function Detail({ k, v }: { k: string; v: string }) {
  return <div><dt className="text-[10px] font-bold uppercase tracking-wider text-gray-500">{k}</dt><dd className="mt-1">{v}</dd></div>
}
