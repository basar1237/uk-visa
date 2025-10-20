import type { Metadata } from 'next'
import { AboutComponent } from './AboutComponent'

export const metadata: Metadata = {
  title: 'About Us | UK Visa Application Experts',
  description: 'Learn about our team of qualified immigration solicitors and our commitment to helping you with your UK visa applications.',
  keywords: 'about us, UK visa experts, immigration solicitors, visa application help, team, company',
}

export default function AboutPage() {
  return <AboutComponent />
}
