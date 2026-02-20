'use client'

import React from 'react'
import { ContactForm } from '@/components/forms/ContactForm'
import Link from 'next/link'

export const ContactFormSection: React.FC = () => {

  return (
    <section className="py-8 md:py-16 ">
      <div className="container mx-auto px-4 sm:px-4 md:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10 items-start">
          {/* Left: Reach Us Cards */}
          <div>
            <h3 className="text-xl md:text-3xl font-bold text-blue-900 mb-4">How to Reach Us</h3>

            <div className="space-y-4">
              {/* Phone Support */}
              <div className="bg-white border  border-gray-200 rounded-2xl p-5 md:p-6 shadow-md">
                <div className="flex items-start gap-4">
                  <div className="h-12 w-12 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center font-semibold">☎</div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-gray-900">Phone Support</p>
                    <a href="tel:01143214047" className="text-gray-900 font-medium hover:text-blue-600 transition-colors">01143214047</a>
                    <p className="text-gray-600 text-sm">Speak directly with our specialists</p>
                    <p className="text-green-700 text-xs mt-1">24 / 7 helpline </p>
                    <a href="tel:01143214047" className="inline-block mt-2 text-sm text-blue-700 hover:text-blue-800 font-medium">Call now →</a>
                  </div>
                </div>
              </div>

              {/* Email Enquiry */}
              <div className="bg-white border  border-gray-200 rounded-2xl p-5 md:p-6 shadow-md">
                <div className="flex items-start gap-4">
                  <div className="h-12 w-12 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center font-semibold">✉</div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-gray-900">Email Enquiry</p>
                    <a href="mailto:info@ukimmigrationhelpline.com" className="text-gray-900 hover:text-blue-600 transition-colors">info@ukimmigrationhelpline.com</a>
                    <p className="text-gray-600 text-sm">Send your questions via email</p>
                    <p className="text-green-700 text-xs mt-1">Response within 24 hours</p>
                    <a href="mailto:info@ukimmigrationhelpline.com" className="inline-block mt-2 text-sm text-blue-700 hover:text-blue-800 font-medium">Send email →</a>
                  </div>
                </div>
              </div>

              {/* Online Assessment */}
              <div className="bg-white border  border-gray-200 rounded-2xl p-5 md:p-6 shadow-md">
              <Link href="/eligibility-check" >
                <div className="flex items-start gap-4">
                  <div className="h-12 w-12 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center font-semibold">⏱</div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-gray-900">Online Assessment to Eligibility Check</p>
                     <p className="text-gray-600 text-sm">Get started with our online form</p>
                    <p className="text-green-700 text-xs mt-1">Available 24/7</p>
                    <button type="button" className="mt-2 text-sm text-blue-700 hover:text-blue-800 font-medium">Start assessment →</button>
                  </div>
                </div>
              </Link>
              </div>
            </div>
          </div>

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

