'use client'

import React from 'react'
import { motion } from 'motion/react'
import { MapPin } from 'lucide-react'

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
          
          {/* Two Panel Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left Panel: Contact Info */}
            <div className="bg-white border border-gray-200 rounded-xl p-5 md:p-6 shadow-sm">
              <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-4">
                Get in Touch
              </h3>
              
              <p className="text-gray-700 mb-6">
                We offer in-person consultations at our UK offices, available by appointment only.
              </p>

              <h4 className="text-base md:text-lg font-bold text-gray-900 mb-3">
                Our Sheffield Office Address
              </h4>
              <div className="mb-6 text-gray-700">
                <p className="mb-2">
                  422 Pitsmoor Road<br />
                  Sheffield S3 9AY<br />
                  United Kingdom
                </p>
              </div>

              <h4 className="text-base md:text-lg font-bold text-gray-900 mb-3">
                Other UK Offices
              </h4>
              <ul className="list-disc list-inside space-y-2 mb-6 text-gray-700">
                <li>Birmingham</li>
                <li>Bradford</li>
              </ul>

              <p className="text-gray-700 mb-6">
                To schedule your consultation or ask a question, please contact us:
              </p>

              <div className="space-y-3 mb-6">
                <div className="flex items-start">
                  <span className="text-gray-600 font-medium min-w-[60px]">Phone:</span>
                  <a href="tel:01143214047" className="text-gray-900 hover:text-blue-600 transition-colors">0114 321 4047</a>
                </div>
                <div className="flex items-start">
                  <span className="text-gray-600 font-medium min-w-[60px]">Email:</span>
                  <a href="mailto:info@ukimmigrationhelpline.com" className="text-gray-900 hover:text-blue-600 transition-colors">info@ukimmigrationhelpline.com</a>
                </div>
              </div>

              <p className="text-gray-700">
                Book your consultation today for expert guidance on all your immigration matters.
              </p>
            </div>

            {/* Right Panel: Map */}
            <div className="bg-white border border-gray-200 rounded-xl p-5 md:p-6 shadow-sm">
              {/* Address Display */}
              <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                <p className="text-gray-700 text-sm font-medium mb-1">Our Sheffield Office Address:</p>
                <p className="text-gray-900 text-sm">
                  422 Pitsmoor Road<br />
                  Sheffield S3 9AY<br />
                  United Kingdom
                </p>
              </div>

              {/* Map Links */}
              <div className="flex flex-col space-y-2 mb-4">
                <a 
                  href="https://www.google.com/maps/search/?api=1&query=422+Pitsmoor+Road+Sheffield+S3+9AY" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-700 hover:underline text-sm"
                >
                  Open in Google Maps
                </a>
                <a 
                  href="https://www.google.com/maps/dir/?api=1&destination=422+Pitsmoor+Road+Sheffield+S3+9AY" 
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
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2379.123456789!2d-1.470123!3d53.400000!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48790aa9fae9be51%3A0x51eeb6c15e5b3b2d!2s422%20Pitsmoor%20Road%2C%20Sheffield%20S3%209AY!5e0!3m2!1sen!2suk!4v1234567890123!5m2!1sen!2suk"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full"
                  title="422 Pitsmoor Road, Sheffield S3 9AY"
                />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

