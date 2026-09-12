import { Metadata } from 'next'
import { LegalPage } from '@/components/legal-page'

export const metadata: Metadata = { title: 'Accessibility', description: 'AdvisoryRecord accessibility statement.' }

export default function AccessibilityPage() {
  return <LegalPage eyebrow="Support" title="Accessibility Statement" intro="AdvisoryRecord is committed to providing a website that is usable by as many people as possible." sections={[
    {title:'Our approach',paragraphs:['We work to support keyboard navigation, readable color contrast, clear page structure, descriptive controls, and compatibility with common assistive technologies. Accessibility is part of our ongoing design, development, and review process.']},
    {title:'Known limitations',paragraphs:['Some third-party content, linked documents, market feeds, or external websites may not fully meet the same accessibility standards and are outside our direct control. We welcome reports about barriers within AdvisoryRecord.']},
    {title:'Feedback and assistance',paragraphs:['If you have difficulty accessing information or completing a task, contact us through the method provided on this website. Please identify the page, the problem encountered, and your preferred way to receive the information. We will make reasonable efforts to provide assistance.']},
  ]} />
}
