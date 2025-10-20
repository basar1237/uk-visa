import type { Metadata } from 'next'
import { VisaProcessComponent } from './VisaProcessComponent'

export const metadata: Metadata = {
  title: 'UK Visa Application Process | Step by Step Guide',
  description: 'Complete step-by-step guide to UK visa application process. Learn about requirements, documents, and timeline for your visa application.',
  keywords: 'UK visa process, visa application steps, visa requirements, visa timeline, immigration process',
}

export default function VisaProcessPage() {
  return <VisaProcessComponent />
}
