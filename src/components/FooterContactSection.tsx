'use client'

import React from 'react'
import { motion } from 'motion/react'
import { MapPin } from 'lucide-react'
import Link from 'next/link'

export const FooterContactSection: React.FC = () => {
  return (
    <div className="bg-[#0a1b3d] border-t border-transparent">
      <div className="mx-auto max-w-7xl px-6 py-8 md:py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          {/* Main Title */}
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
            Contact & Location
          </h2>
          
          {/* Subtitle */}
          <p className="text-white/80 text-sm md:text-base mb-8">
            Based in Sheffield — assisting clients across the UK and overseas. Remote and in-person appointments available.
          </p>

          {/* Two Panel Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left Panel: Get in touch */}
            <div className="bg-white border border-gray-200 rounded-xl p-5 md:p-6 shadow-sm">
              <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-5">
                Get in touch
              </h3>
              
              <div className="space-y-3 mb-6">
                <div className="flex items-start">
                  <span className="text-gray-600 font-medium min-w-[60px]">Phone:</span>
                  <span className="text-gray-900">+44 XX XXXX XXXX</span>
                </div>
                <div className="flex items-start">
                  <span className="text-gray-600 font-medium min-w-[60px]">Email:</span>
                  <span className="text-gray-900">info@uklegalsolutions.com</span>
                </div>
                <div className="flex items-start">
                  <span className="text-gray-600 font-medium min-w-[60px]">Office:</span>
                  <span className="text-gray-900">123 Example Street, Sheffield, S1 2AB</span>
                </div>
                <div className="flex items-start">
                  <span className="text-gray-600 font-medium min-w-[60px]">Hours:</span>
                  <span className="text-gray-900">Mon-Fri: 9:00-17:30 • Sat (by appointment)</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 mb-4">
                <Link href="/contact" className="bg-green-600 hover:bg-green-700 text-white font-semibold px-5 py-2.5 rounded-lg transition-colors text-sm flex-1 sm:flex-none text-center">
                  Book a Consultation
                </Link>
                <Link href="/eligibility-check" className="bg-white border-2 border-blue-600 text-blue-600 hover:bg-blue-50 font-semibold px-5 py-2.5 rounded-lg transition-colors text-sm flex-1 sm:flex-none text-center">
                  Check Eligibility
                </Link>
              </div>

              {/* Urgent Case Info */}
              <p className="text-xs md:text-sm text-gray-600">
                Urgent case? Priority services available for tight deadlines — tell us your timeframe.
              </p>
            </div>

            {/* Right Panel: Map */}
            <div className="bg-white border border-gray-200 rounded-xl p-5 md:p-6 shadow-sm">
              <div className="flex items-center text-gray-700 text-sm mb-4">
                <MapPin className="w-4 h-4 mr-2" />
                <span>Open map to our Sheffield office</span>
              </div>
              
              {/* Map Links */}
              <div className="flex flex-col space-y-2 mb-4">
                <a href="#" className="text-blue-600 hover:text-blue-700 hover:underline text-sm">
                  Open in Google Maps
                </a>
                <a href="#" className="text-blue-600 hover:text-blue-700 hover:underline text-sm">
                  Directions & Parking
                </a>
              </div>

              {/* Map Placeholder */}
              <div className="h-48 bg-gray-200 rounded-lg flex items-center justify-center">
                <span className="text-gray-500 text-sm">Map will be embedded here</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

