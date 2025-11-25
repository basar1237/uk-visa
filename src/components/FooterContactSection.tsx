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
                  <a href="tel:01143214047" className="text-gray-900 hover:text-blue-600 transition-colors">01143214047</a>
                </div>
                <div className="flex items-start">
                  <span className="text-gray-600 font-medium min-w-[60px]">Email:</span>
                  <a href="mailto:info@uklegalsolutions.com" className="text-gray-900 hover:text-blue-600 transition-colors">info@uklegalsolutions.com</a>
                </div>
                <div className="flex items-start">
                  <span className="text-gray-600 font-medium min-w-[60px]">Office:</span>
                  <span className="text-gray-900">Sheffield, United Kingdom</span>
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
                <span>Our Sheffield office location</span>
              </div>
              
              {/* Map Links */}
              <div className="flex flex-col space-y-2 mb-4">
                <a 
                  href="https://www.google.com/maps/search/?api=1&query=Sheffield+United+Kingdom" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-700 hover:underline text-sm"
                >
                  Open in Google Maps
                </a>
                <a 
                  href="https://www.google.com/maps/dir/?api=1&destination=Sheffield+United+Kingdom" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-700 hover:underline text-sm"
                >
                  Get Directions
                </a>
              </div>

              {/* Google Maps Embed */}
              <div className="h-64 md:h-80 rounded-lg overflow-hidden border border-gray-200">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d190028.25709892247!2d-1.564227!3d53.381129!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48790aa9fae9be51%3A0x51eeb6c15e5b3b2d!2sSheffield%2C%20UK!5e0!3m2!1sen!2suk!4v1234567890123!5m2!1sen!2suk"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full"
                  title="Sheffield Office Location"
                />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

