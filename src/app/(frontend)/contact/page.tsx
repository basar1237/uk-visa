import type { Metadata } from 'next'
import { ContactComponent } from './ContactComponent'
import { StructuredData } from '@/components/SEO/StructuredData'

export const metadata: Metadata = {
  title: 'Contact Us | UK Immigration Helpline - Get Expert Visa Advice',
  description: 'Get in touch with our UK visa experts. Contact us for professional consultation and support with your visa application. Offices in Sheffield, Birmingham, and Bradford.',
  keywords: 'contact us, UK visa consultation, visa support, immigration help, visa experts, UK immigration lawyer',
  openGraph: {
    title: 'Contact Us | UK Immigration Helpline',
    description: 'Get in touch with our UK visa experts. Contact us for professional consultation and support with your visa application.',
    type: 'website',
  },
}

export default function ContactPage() {
  return (
    <>
      <StructuredData type="LocalBusiness" />
      <ContactComponent />
    </>
  )
}
