import { Footer, Navbar } from '@/components/shell'

export type LegalSection = { title: string; paragraphs: string[] }

export function LegalPage({ eyebrow = 'Legal', title, intro, updated = 'September 12, 2026', sections }: {
  eyebrow?: string
  title: string
  intro: string
  updated?: string
  sections: LegalSection[]
}) {
  return <>
    <Navbar />
    <main>
      <header className="border-b border-green-100 bg-green-50/50">
        <div className="container max-w-4xl py-16 md:py-20">
          <div className="eyebrow">{eyebrow}</div>
          <h1 className="display mt-3 text-5xl md:text-6xl">{title}</h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-gray-600">{intro}</p>
          <p className="mt-5 text-xs text-gray-500">Last updated: {updated}</p>
        </div>
      </header>
      <article className="container max-w-4xl space-y-10 py-14 md:py-20">
        {sections.map((section) => <section key={section.title}>
          <h2 className="font-serif text-2xl font-semibold">{section.title}</h2>
          <div className="mt-4 space-y-4 text-sm leading-7 text-gray-700">
            {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </div>
        </section>)}
      </article>
    </main>
    <Footer />
  </>
}
