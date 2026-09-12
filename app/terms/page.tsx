import { Metadata } from 'next'
import { LegalPage } from '@/components/legal-page'

export const metadata: Metadata = { title: 'Terms of Use', description: 'Terms governing use of the AdvisoryRecord website.' }

export default function TermsPage() {
  return <LegalPage title="Terms of Use" intro="These terms govern your access to and use of AdvisoryRecord. By using the site, you agree to them." sections={[
    {title:'Informational service only',paragraphs:['AdvisoryRecord provides general educational information, public-record research tools, and introductions. It does not provide investment, legal, accounting, or tax advice; recommend securities; execute transactions; or guarantee that any advisor or strategy is suitable for you.']},
    {title:'Eligibility and acceptable use',paragraphs:['You must be at least 18 and legally able to enter an agreement. You may not misuse the service, interfere with its operation, attempt unauthorized access, scrape it in violation of applicable law, transmit malicious code, impersonate another person, or use the site for unlawful activity.']},
    {title:'Advisor information and relationships',paragraphs:['Public records and third-party information may be delayed, incomplete, or inaccurate. Verify credentials, registration status, disciplinary history, fees, conflicts, and services directly with the advisor and official regulators before making a decision. Any relationship you form with an advisor is between you and that advisor or firm.']},
    {title:'Intellectual property',paragraphs:['The site design, original text, branding, and software are owned by AdvisoryRecord or its licensors and are protected by applicable law. Limited personal, noncommercial use is permitted; no ownership rights are transferred. Third-party names and content remain the property of their respective owners.']},
    {title:'Third-party services',paragraphs:['Links and data from third parties are provided for convenience. We do not control their content, availability, security, or privacy practices, and their own terms apply.']},
    {title:'Disclaimers and limitation of liability',paragraphs:['The service is provided “as is” and “as available” without warranties to the fullest extent permitted by law. AdvisoryRecord does not guarantee uninterrupted access, accurate results, investment performance, or a successful advisor relationship. To the fullest extent permitted by law, AdvisoryRecord is not liable for indirect, incidental, special, consequential, or punitive damages arising from use of the service.']},
    {title:'Changes and governing terms',paragraphs:['We may modify or discontinue features and update these terms. Continued use after an update constitutes acceptance of the revised terms. If any provision is unenforceable, the remaining provisions continue in effect.']},
    {title:'Contact',paragraphs:['Questions about these terms may be submitted through the contact method provided on this website.']},
  ]} />
}
