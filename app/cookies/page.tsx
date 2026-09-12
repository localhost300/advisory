import { Metadata } from 'next'
import { LegalPage } from '@/components/legal-page'

export const metadata: Metadata = { title: 'Cookie Policy', description: 'How AdvisoryRecord uses cookies and similar browser technologies.' }

export default function CookiesPage() {
  return <LegalPage title="Cookie Policy" intro="This policy describes how AdvisoryRecord uses cookies, local storage, and similar browser technologies." sections={[
    {title:'Technologies we use',paragraphs:['Cookies are small files stored by a browser. Local storage lets a site retain information on a device. AdvisoryRecord may use these technologies to preserve questionnaire progress, remember preferences, support security, and understand site performance.']},
    {title:'Essential and measurement uses',paragraphs:['Essential storage supports features you request and cannot always be disabled without affecting the service. Measurement technologies, when used, help us understand aggregate traffic and improve usability. We do not use browser storage to guarantee or determine investment outcomes.']},
    {title:'Your controls',paragraphs:['You can delete or block cookies and local storage using browser settings. Blocking them may reset questionnaire progress or prevent parts of the site from functioning correctly. Privacy controls offered by third-party services are governed by those providers.']},
    {title:'Updates',paragraphs:['We may update this policy when technologies or legal requirements change. The revision date at the top identifies the current version.']},
  ]} />
}
