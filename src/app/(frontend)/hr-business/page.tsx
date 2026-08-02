import type { Metadata } from 'next'
import { HrBusinessComponent } from './HrBusinessComponent'

export const metadata: Metadata = {
  title: 'HR Immigration Compliance for Businesses | UK Immigration Helpline',
  description:
    'Expert HR & immigration compliance solutions for small, medium and large businesses across the UK. Sponsor licence management, UKVI compliance audits, right to work checks and ongoing employer support.',
  keywords:
    'HR immigration compliance, sponsor licence management, UKVI compliance audit, right to work checks, skilled worker sponsorship, employer immigration support, sponsor licence application',
  openGraph: {
    title: 'HR Immigration Compliance for Businesses | UK Immigration Helpline',
    description:
      'Keeping your business compliant. Protecting your people. Safeguarding your future. Expert HR & immigration solutions for businesses across the UK.',
    type: 'website',
  },
}

export default function HrBusinessPage() {
  return <HrBusinessComponent />
}
