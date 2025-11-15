'use client'

import React from 'react'
import { motion } from 'motion/react'
import { CheckCircle } from 'lucide-react'
import Link from 'next/link'

export const SimpleSection: React.FC = () => {
  const features = [
    "Answer a few quick questions about your situation.",
    "Get matched with the most appropriate visa or immigration route for you.",
    "Customise your package by choose the level of service and time schedule that suits you."
  ]

  return (
    <section className="relative py-6 md:py-8 bg-gray-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            {/* Main Heading */}
            <h2 className="text-xl md:text-2xl font-bold text-blue-900 mb-3 text-center">
              Simple, Strategic & Stress-Free UK Immigration
            </h2>

            {/* Introductory Paragraph */}
            <p className="text-gray-700 text-sm leading-relaxed mb-5 text-center max-w-3xl mx-auto">
              At UK Legal Solutions, we make UK immigration services simple, strategic, and stress-free. Based in the UK but serving clients worldwide, our experienced immigration experts guide you through every stage of your immigration journey.
            </p>

            {/* UK Legal Solutions Tool Sub-section */}
            <div className="mb-4">
              <h3 className="text-base md:text-lg font-bold text-teal-600 mb-3">
                The UK Legal Solutions Tool makes it even easier:
              </h3>
              
              {/* Features List */}
              <ul className="space-y-2 mb-4">
                {features.map((feature, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-start"
                  >
                    <div className="bg-teal-600 rounded-full p-0.5 mr-2 flex-shrink-0 mt-0.5">
                      <CheckCircle className="w-3 h-3 md:w-4 md:h-4 text-white" />
                    </div>
                    <span className="text-gray-700 text-sm">{feature}</span>
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* Additional Information Paragraphs */}
            <div className="space-y-3 mb-6">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                viewport={{ once: true }}
                className="text-gray-700 text-sm leading-relaxed"
              >
                If your case is more complex, we&apos;ll arrange a call to simplify your requirements and suggest the best route forward. You can also speak with us directly, and our team will tailor your package over the phone.
              </motion.p>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                viewport={{ once: true }}
                className="text-gray-700 text-sm leading-relaxed"
              >
                With the UK Legal Solutions Tool, your immigration journey is <strong>simplified, strategic, and fully supported</strong> — every step of the way.
              </motion.p>
            </div>

            {/* Call-to-Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              viewport={{ once: true }}
              className="flex flex-col sm:flex-row gap-3 justify-center"
            >
              <Link href="/eligibility-check" className="bg-teal-600 hover:bg-teal-700 text-white font-semibold px-5 py-2 rounded-lg transition-colors shadow-md hover:shadow-lg text-sm text-center">
                Try the Tool
              </Link>
              <Link href="/contact" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2 rounded-lg transition-colors shadow-md hover:shadow-lg text-sm text-center">
                Book Free Consultation
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

