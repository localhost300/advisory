import { Metadata } from 'next'
import { LegalPage } from '@/components/legal-page'

export const metadata: Metadata = { title: 'Disclosures', description: 'Important disclosures about AdvisoryRecord information and advisor matching.' }

export default function DisclosuresPage() {
  return <LegalPage title="Important Disclosures" intro="Please review these disclosures before relying on information or contacting a financial professional through AdvisoryRecord." sections={[
    {title:'Not financial advice',paragraphs:['Content on AdvisoryRecord is for general informational and educational purposes. Nothing on the site is an offer, solicitation, recommendation, endorsement, or individualized investment, legal, tax, or accounting advice. Consult qualified professionals about your circumstances.']},
    {title:'No guarantee or endorsement',paragraphs:['Inclusion in the directory or a matching result does not constitute an endorsement, certification, or guarantee of an advisor. A match reflects questionnaire inputs and available profile data; it does not establish suitability, predict investment performance, or replace your own review.']},
    {title:'Registration records',paragraphs:['Advisor information may be derived from public regulatory records, advisor-provided details, or third-party sources. Data can change without notice and may be incomplete or delayed. Confirm current information using SEC Investment Adviser Public Disclosure, FINRA BrokerCheck, state regulators, and the professional’s current Form ADV or Form CRS, as applicable.']},
    {title:'Market data and news',paragraphs:['Quotes, market changes, and headlines are supplied by third parties and may be delayed, corrected, interrupted, or unavailable. They are not intended for trading decisions. Article links lead to third-party publishers whose content and availability AdvisoryRecord does not control.']},
    {title:'Compensation and conflicts',paragraphs:['If AdvisoryRecord receives compensation for referrals, advertising, featured placement, or another commercial relationship, that arrangement should not be interpreted as a measure of advisor quality. Ask every professional how they and their firm are compensated and what conflicts may apply.']},
    {title:'Investment risk',paragraphs:['Investing involves risk, including possible loss of principal. Past performance does not guarantee future results. Diversification and asset allocation do not assure a profit or protect against every loss.']},
  ]} />
}
