'use client'

import React from 'react'
import { motion } from 'motion/react'
import { Globe, CheckCircle2, ArrowRight } from 'lucide-react'
import Link from 'next/link'

export const ExecutiveServiceSection: React.FC = () => {
  const services = [
    "Review your full immigration history and circumstances.",
    "Assess your eligibility under the latest UK immigration rules.",
    "Develop a tailored strategy for your UK immigration matter.",
    "Provide clear guidance on next steps and documentation required."
  ]

  return (
    <section className="relative py-12 md:py-16 bg-gradient-to-br from-blue-50 via-indigo-50 to-teal-50 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-teal-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl shadow-2xl border-2 border-blue-100 overflow-hidden hover:shadow-3xl transition-all duration-500"
          >
            {/* Gradient border top */}
            <div className="h-2 bg-gradient-to-r from-blue-600 via-indigo-600 to-teal-600"></div>

            <div className="p-6 md:p-8">
              {/* Header Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
                className="flex flex-col md:flex-row items-start md:items-center gap-4 mb-5"
              >
                <div className="flex-shrink-0">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl blur opacity-50"></div>
                    <div className="relative bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl p-3 shadow-lg">
                      <Globe className="w-8 h-8 md:w-10 md:h-10 text-white" />
                    </div>
                  </div>
                </div>
                
                <div className="flex-1">
                  <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-blue-900 mb-2 leading-tight">
                    Executive Immigration Service – Worldwide
                  </h2>
                  <div className="h-1 w-20 bg-gradient-to-r from-blue-600 to-teal-600 rounded-full"></div>
                </div>
              </motion.div>

              {/* Main Description */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="mb-5"
              >
                <p className="text-base md:text-lg text-gray-700 leading-relaxed">
                  For clients who require a personalised premium service, one of our UK immigration lawyers can{' '}
                  <strong className="text-blue-700 font-semibold">travel to your office or home anywhere in the world</strong>{' '}
                  to provide direct, face-to-face advice and assistance.
                </p>
              </motion.div>

              {/* Tailored Service Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
                className="mb-5"
              >
                <div className="bg-gradient-to-r from-teal-50 to-blue-50 rounded-xl p-4 border border-teal-100">
                  <h3 className="text-lg md:text-xl font-bold text-teal-700 mb-4 flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-teal-600" />
                    Tailored Service
                  </h3>

                  {/* Services Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {services.map((service, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                        viewport={{ once: true }}
                        className="flex items-start gap-2 group"
                      >
                        <div className="flex-shrink-0 mt-1">
                          <div className="w-5 h-5 rounded-full bg-gradient-to-br from-blue-500 to-teal-500 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                            <CheckCircle2 className="w-3 h-3 text-white" />
                          </div>
                        </div>
                        <p className="text-sm text-gray-700 leading-relaxed flex-1 group-hover:text-blue-700 transition-colors duration-300">
                          {service.includes('tailored') ? (
                            <>
                              {service.split('tailored')[0]}<strong className="text-teal-600">tailored</strong>{service.split('tailored')[1]}
                            </>
                          ) : (
                            service
                          )}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* CTA Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                viewport={{ once: true }}
                className="mb-4 flex justify-center"
              >
                <Link 
                  href="/contact" 
                  className="group inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 text-sm md:text-base"
                >
                  Request Executive Service
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              </motion.div>

              {/* Disclaimer */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                viewport={{ once: true }}
                className="pt-4 border-t border-gray-200"
              >
                <p className="text-sm text-gray-600 italic leading-relaxed">
                  <strong className="text-gray-700">Please note:</strong> All travel and accommodation costs will be agreed in advance and apply in addition to our professional fees.
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

