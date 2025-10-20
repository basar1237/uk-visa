import type { Metadata } from 'next'
import { ContactComponent } from './ContactComponent'

export const metadata: Metadata = {
  title: 'Contact Us | UK Visa Application Support',
  description: 'Get in touch with our UK visa experts. Contact us for professional consultation and support with your visa application.',
  keywords: 'contact us, UK visa consultation, visa support, immigration help, visa experts',
}

export default function ContactPage() {
  return <ContactComponent />
}
