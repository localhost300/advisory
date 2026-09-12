import { Metadata } from 'next'
import { LegalPage } from '@/components/legal-page'

export const metadata: Metadata = { title: 'Privacy Policy', description: 'How AdvisoryRecord collects, uses, and protects personal information.' }

export default function PrivacyPage() {
  return <LegalPage title="Privacy Policy" intro="This policy explains what information AdvisoryRecord collects, why we use it, and the choices available to you." sections={[
    {title:'Information we collect',paragraphs:['We collect information you submit, including contact details, questionnaire responses, advisor-contact requests, and messages. We may also collect basic technical information such as browser type, device type, pages visited, referring page, and approximate location derived from an IP address.','Do not submit account passwords, Social Security numbers, banking credentials, or other sensitive financial information through the site.']},
    {title:'How we use information',paragraphs:['We use information to operate the website, provide advisor research and matching features, respond to requests, improve our services, protect against misuse, and comply with legal obligations. We do not sell personal information for money.']},
    {title:'How information is shared',paragraphs:['Information may be shared with service providers that support hosting, communications, analytics, security, and site operations. When you request contact with an advisor, the details needed to fulfill that request may be shared with that advisor or firm. We may also disclose information when required by law or to protect users, the service, or the public.']},
    {title:'Cookies and analytics',paragraphs:['The site may use cookies, local storage, and similar technologies to remember questionnaire progress, maintain preferences, measure performance, and prevent abuse. Browser controls can limit these technologies, although some features may stop working as intended.']},
    {title:'Retention and security',paragraphs:['We retain information only as long as reasonably necessary for the purposes described here, subject to legal and operational requirements. We use reasonable safeguards, but no internet transmission or storage system can be guaranteed completely secure.']},
    {title:'Your choices and rights',paragraphs:['Depending on where you live, you may have rights to request access, correction, deletion, or a copy of personal information, or to object to certain uses. You may also withdraw a request before an advisor responds. Contact us to submit a privacy request; we may need to verify your identity.']},
    {title:'Children and international users',paragraphs:['AdvisoryRecord is not directed to children under 18, and we do not knowingly collect their personal information. If you access the service outside the United States, your information may be processed in countries with different data-protection rules.']},
    {title:'Changes and contact',paragraphs:['We may update this policy as the service changes. The date above shows the latest revision. Privacy questions and requests may be sent through the contact method provided on this website.']},
  ]} />
}
