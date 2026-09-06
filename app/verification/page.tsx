'use client'

import { FormEvent, useState } from 'react'
import { Check } from 'lucide-react'
import { Footer, Navbar } from '@/components/shell'

const process = [
  ['Identity & Professional Information', 'We verify the advisor’s submitted professional information and identity.'],
  ['Registration & Licensing', 'Where applicable, we check relevant regulatory records to confirm an advisor’s registration or licensing status.'],
  ['Firm Affiliation', 'We verify that the advisor is associated with the firm or organization listed on their profile.'],
  ['Credentials', 'Professional designations and credentials are checked against the appropriate issuing organizations where verification is available.'],
  ['Regulatory History', 'We review available regulatory disclosures, including disciplinary or enforcement information.'],
  ['Ongoing Review', 'Advisor information can change. We periodically review profiles and may update, restrict, or remove profiles when information can no longer be verified.'],
]

export default function Verification() {
  const [reported, setReported] = useState(false)
  const [sending, setSending] = useState(false)
  const [error, setError] = useState('')

  async function submitReport(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSending(true)
    setError('')

    const data = new FormData(event.currentTarget)
    const response = await fetch('/api/advisor-report', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        advisor: data.get('advisor'),
        issue: data.get('issue'),
        details: data.get('details'),
        email: data.get('email'),
      }),
    })

    if (!response.ok) {
      const result = await response.json() as { error?: string }
      setError(result.error ?? 'We could not send your report. Please try again.')
      setSending(false)
      return
    }

    setReported(true)
    setSending(false)
    event.currentTarget.reset()
  }

  return (
    <>
      <Navbar />
      <main>
        <section className="border-b bg-green-50">
          <div className="container py-16 md:py-24">
            <div className="eyebrow">Advisor verification</div>
            <h1 className="display mt-3 max-w-3xl text-5xl leading-tight md:text-6xl">Advisors You Can Research With Confidence</h1>
            <p className="mt-6 max-w-2xl text-base leading-7 text-gray-600">
              Finding a financial advisor shouldn’t mean taking a profile at face value.
            </p>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-gray-600">
              We review the professionals listed on our platform using publicly available regulatory and professional information, including registration status, firm affiliation, credentials, and disclosed disciplinary history where available.
            </p>
          </div>
        </section>

        <section className="container py-16 md:py-20">
          <div className="max-w-2xl">
            <div className="eyebrow">How we review profiles</div>
            <h2 className="display mt-3 text-4xl md:text-5xl">Our Verification Process</h2>
          </div>
          <div className="mt-12 grid gap-px bg-gray-200 md:grid-cols-2 lg:grid-cols-3">
            {process.map(([title, description]) => (
              <article key={title} className="bg-white p-7">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-green-100 text-green-700">
                  <Check size={18} strokeWidth={2.5} />
                </div>
                <h3 className="mt-8 font-serif text-xl">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-gray-600">{description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="border-y bg-gray-50 py-16 md:py-20">
          <div className="container grid gap-10 lg:grid-cols-[.8fr_1.2fr] lg:gap-20">
            <div>
              <div className="eyebrow">Help us keep records current</div>
              <h2 className="display mt-3 text-4xl md:text-5xl">Report an Advisor</h2>
              <p className="mt-5 text-sm leading-6 text-gray-600">
                See information that may be inaccurate, outdated, or concerning? Send us the details and we’ll review the report.
              </p>
            </div>
            {reported ? (
              <div className="flex items-start gap-4 border border-green-200 bg-white p-7">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-green-600 text-white"><Check size={18} /></span>
                <div>
                  <h3 className="font-serif text-xl">Thank you for your report.</h3>
                  <p className="mt-2 text-sm leading-6 text-gray-600">Our team will review the information and take appropriate action where needed.</p>
                </div>
              </div>
            ) : (
              <form onSubmit={submitReport} className="border border-gray-200 bg-white p-7 md:p-9">
                <div className="grid gap-5 sm:grid-cols-2">
                  <label><span className="label">Advisor name or profile URL *</span><input name="advisor" required className="field" placeholder="Name or link to profile" /></label>
                  <label><span className="label">What would you like to report? *</span><select name="issue" required className="field"><option value="">Select an issue</option><option>Inaccurate information</option><option>Outdated information</option><option>Registration or licensing concern</option><option>Professional conduct concern</option><option>Other</option></select></label>
                </div>
                <label className="mt-5 block"><span className="label">Details *</span><textarea name="details" required minLength={20} className="field min-h-32 resize-y" placeholder="Tell us what you found and include any relevant sources." /></label>
                <label className="mt-5 block"><span className="label">Your email <span className="font-normal text-gray-400">(optional)</span></span><input type="email" name="email" className="field" placeholder="you@example.com" /></label>
                {error && <p role="alert" className="mt-4 text-sm font-semibold text-red-600">{error}</p>}
                <button type="submit" disabled={sending} className="btn btn-dark mt-6 disabled:cursor-not-allowed disabled:opacity-60">{sending ? 'Sending...' : 'Submit report'}</button>
              </form>
            )}
          </div>
        </section>

        <section className="w-full bg-green-900 py-16 text-white md:py-20">
          <div className="container grid gap-12 md:grid-cols-2 md:gap-20">
            <div>
              <div className="eyebrow text-green-300">A clear distinction</div>
              <h2 className="display mt-3 text-4xl md:text-5xl">What “Verified” Means</h2>
            </div>
            <p className="text-sm leading-7 text-green-100">
              A Verified Advisor has completed our platform’s verification process based on the information and records available to us at the time of review.
              <br /><br />
              Verification does not constitute an endorsement, guarantee of performance, or recommendation that an advisor is suitable for a particular investor.
            </p>
          </div>
        </section>

        <section className="container py-16 md:py-20">
          <div className="max-w-3xl border-l-2 border-green-600 pl-6 md:pl-8">
            <div className="eyebrow">Your decision matters</div>
            <h2 className="display mt-3 text-4xl md:text-5xl">Research. Compare. Ask questions.</h2>
            <p className="mt-5 text-sm leading-7 text-gray-600">
              We give you the information you need to research an advisor before making contact. Always review an advisor’s regulatory status, credentials, fees, services, and disclosures and determine whether they are appropriate for your individual circumstances.
            </p>
            <p className="mt-6 font-serif text-2xl text-green-800">Choose with confidence.</p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
