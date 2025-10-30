'use client'

import React from 'react'
import { motion } from 'motion/react'
import { Trophy, FileText, Handshake } from 'lucide-react'

export const WhyTrustSection: React.FC = () => {
  const features = [
    {
      icon: <Trophy className="w-12 h-12" />,
      title: "Proven Success Record",
      description: "With over 15 years of experience in UK immigration and law, we've guided thousands of clients through complex cases with outstanding results—built on expertise, attention to detail, and a deep understanding of immigration law."
    },
    {
      icon: <FileText className="w-12 h-12" />,
      title: "Clear & Transparent Fees",
      description: "Straightforward pricing with no hidden costs—so you can plan your legal journey with confidence and peace of mind."
    },
    {
      icon: <Handshake className="w-12 h-12" />,
      title: "Exceptional Client Care",
      description: "You're never just a case number. We take time to understand your situation, keep you informed, and provide compassionate, personalised support at every step."
    }
  ]

  const statistics = [
    {
      value: "2000+",
      label: "Client Consultations"
    },
    {
      value: "93%",
      label: "Successful Cases"
    },
    {
      value: "40+",
      label: "Professional Attorneys"
    },
    {
      value: "£20m+",
      label: "Secured in Client Outcomes"
    }
  ]

  return (
    <section className="relative py-20 bg-white overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Main Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-blue-900 text-center mb-12">
            Why Clients Trust UK Legal Solutions
          </h2>
        </motion.div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-gray-50 rounded-xl border border-gray-200 p-8 hover:shadow-lg transition-all duration-300"
            >
              {/* Icon */}
              <div className="text-blue-700 mb-4">
                {feature.icon}
              </div>
              
              {/* Title */}
              <h3 className="text-xl font-bold text-teal-600 mb-4">
                {feature.title}
              </h3>
              
              {/* Description */}
              <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {statistics.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
              viewport={{ once: true }}
              className="bg-gray-50 rounded-xl border border-gray-200 p-6 text-center hover:shadow-lg transition-all duration-300"
            >
              {/* Value */}
              <div className="text-4xl sm:text-5xl font-bold text-blue-900 mb-2">
                {stat.value}
              </div>
              
              {/* Label */}
              <div className="text-sm sm:text-base text-gray-700">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

