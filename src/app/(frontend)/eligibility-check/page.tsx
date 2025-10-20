import type { Metadata } from 'next'
import { EligibilityCheckComponent } from './EligibilityCheckComponent'

export const metadata: Metadata = {
  title: 'UK Visa Eligibility Check | Free Assessment',
  description: 'Check your eligibility for UK visa applications with our comprehensive assessment. Get instant results and personalized recommendations.',
  keywords: 'UK visa eligibility, visa assessment, visa requirements, UK immigration, visa checker',
}

export default function EligibilityCheckPage() {
  return <EligibilityCheckComponent />
}
