import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Financial Advisor Directory',
  description: 'Research financial advisors by name, specialty, location, firm affiliation, and publicly available registration information.',
  alternates: { canonical: '/advisors' },
  openGraph: {
    title: 'Financial Advisor Directory | AdvisoryRecord',
    description: 'Research advisor profiles and publicly available professional information.',
    url: '/advisors',
    type: 'website',
  },
}

export default function AdvisorsLayout({ children }: { children: React.ReactNode }) {
  return children
}
