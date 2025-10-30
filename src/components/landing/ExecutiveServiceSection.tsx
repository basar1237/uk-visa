'use client'

import React from 'react'
import { motion } from 'motion/react'
import { UserCheck } from 'lucide-react'
import Link from 'next/link'

export const ExecutiveServiceSection: React.FC = () => {
  const services = [
    "Review your full immigration history and circumstances.",
    "Assess your eligibility under the latest UK immigration rules.",
    "Develop a tailored strategy for your UK immigration matter.",
    "Provide clear guidance on next steps and documentation required."
  ]

  return (
    <section className="relative py-6 md:py-8 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-white rounded-xl shadow-xl border-l-4 border-blue-600 p-4 md:p-5 hover:shadow-2xl transition-shadow"
          >
            {/* Icon and Title */}
            <div className="flex items-start mb-3">
              <div className="bg-blue-600 rounded-lg p-2 mr-3 flex-shrink-0">
                <UserCheck className="w-6 h-6 md:w-8 md:h-8 text-white" />
              </div>
              <h2 className="text-lg md:text-xl font-bold text-blue-900">
                Executive Immigration Service – Worldwide
              </h2>
            </div>

            {/* Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="mb-3"
            >
              <p className="text-gray-700 text-sm leading-relaxed">
                For clients who require a personalised premium service, one of our UK immigration lawyers can{' '}
                <strong>travel to your office or home anywhere in the world</strong> to provide direct, face-to-face advice and assistance.
              </p>
            </motion.div>

            {/* Subtitle */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="mb-2"
            >
              <h3 className="text-base font-bold text-teal-600">
                Tailored Service
              </h3>
            </motion.div>

            {/* Services List */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="mb-4"
            >
              <ul className="space-y-1.5">
                {services.map((service, index) => (
                  <li key={index} className="flex items-start text-gray-700 text-sm">
                    <span className="text-blue-600 mr-2 mt-0.5">•</span>
                    <span>{service}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="mb-2"
            >
              <Link href="/contact" className="inline-block w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 md:px-6 py-2 rounded-lg transition-colors shadow-md hover:shadow-lg text-sm text-center">
                Request Executive Service
              </Link>
            </motion.div>

            {/* Note */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              viewport={{ once: true }}
            >
              <p className="text-xs text-gray-500 italic">
                Please note: All travel and accommodation costs will be agreed in advance and apply in addition to our professional fees.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

