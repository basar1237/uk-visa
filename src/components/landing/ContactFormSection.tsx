'use client'

import React from 'react'
import { ContactForm } from '@/components/forms/ContactForm'

export const ContactFormSection: React.FC = () => {
  return (
    <section className="py-8 md:py-16 ">
      <div className="container mx-auto px-4 sm:px-4 md:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <ContactForm
            variant="default"
            showTitle={true}
            title="Send Us a Message"
            description="We'll respond within 24 hours."
          />
        </div>
      </div>
    </section>
  )
}
