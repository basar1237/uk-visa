'use client'

import React from 'react'
import { Phone, Mail, MapPin } from 'lucide-react'

export const ContactStrip: React.FC = () => {
  return (
    <section className="relative">
      {/* Top gradient bar */}
      <div className="h-2 w-full bg-gradient-to-r from-emerald-100 via-emerald-400 to-green-100" />

      <div className="bg-gradient-to-r from-emerald-50 to-green-100 text-slate-900">
        <div className="container mx-auto px-4 sm:px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-10 md:py-14 text-center">
            {/* Call Us */}
            <div className="space-y-3">
              <Phone className="mx-auto h-9 w-9 text-green-600" />
              <p className="font-semibold">Call Us</p>
              <a href="tel:01143214047" className="text-green-700 hover:text-green-800 transition-colors">
                01143214047
              </a>
            </div>

            {/* Email Us */}
            <div className="space-y-3">
              <Mail className="mx-auto h-9 w-9 text-green-600" />
              <p className="font-semibold">Email Us</p>
              <a href="mailto:info@ukimmigrationhelpline.com" className="text-green-700 hover:text-green-800 transition-colors">
                info@ukimmigrationhelpline.com
              </a>
            </div>

            {/* Visit Us */}
            <div className="space-y-3">
              <MapPin className="mx-auto h-9 w-9 text-green-600" />
              <p className="font-semibold">Visit Us</p>
              <p className="text-green-700">Sheffield, United Kingdom</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}


