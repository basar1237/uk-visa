'use client'

import React from 'react'
import { motion } from 'motion/react'

interface StatisticItem {
  icon: React.ReactNode
  title: string
  description: string
  ptLarge?: boolean
}

interface StatisticsSectionProps {
  mainTitle?: string
  mainDescription?: string
  contactInfo?: string
  statistics?: StatisticItem[]
}

export const StatisticsSection: React.FC<StatisticsSectionProps> = ({
  mainTitle = "Get Immigration Advice and Consultative Services at a Transparent Price",
  mainDescription = "Established in 2007, First Migration is one of Trustpilot's best-rated UK visa and immigration consultancies. With over 18 years of experience and thousands of satisfied clients, our reputation and expertise are among the best in the industry.",
  contactInfo = "If you're looking for tailored support for your UK visa application, get in touch by calling +44 (0) 203 728 8948 or by completing the callback request form.",
  statistics = [
    {
       title: "5 Star Customer Rated Service",
      description: "One of Trustpilot's best-rated visa and immigration consultancies in London",
      ptLarge: true
    },
    {
       title: "Thousands of Satisfied Clients",
      description: "We work tirelessly to help secure your visa approval."
    },
    {
      title: "18 Years Experience",
      description: "Unrivalled experience of the immigration system and its complex rules",
      ptLarge: true
    },
    {
      title: "Free Assessment",
      description: "We speak to all clients before agreeing to take on their application."
    },
    {
      title: "Personalized Service",
      description: "Tailored solutions for each client's unique immigration journey.",
      ptLarge: true
    },
    {
      title: "Fast Processing",
      description: "Efficient handling of applications to meet your timeline requirements."
     }
  ]
}) => {
  return (
    <section className="relative py-20 bg-white overflow-hidden">
      {/* Background decoration - light blue organic shape */}
      <div className="absolute right-0 top-0 w-[600px] h-[500px] opacity-10">
        <svg viewBox="0 0 600 500" className="w-full h-full">
          <path
            d="M200 50 Q300 20 450 80 Q550 120 500 200 Q550 280 450 320 Q300 360 200 300 Q150 250 180 150 Q160 100 200 50 Z"
            fill="currentColor"
            className="text-blue-300"
          />
        </svg>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left Section - Main Content */}
          <div className="lg:pe-5">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-blue-900 mb-6 leading-tight">
                {mainTitle}
              </h1>
              
              <div className="space-y-4 text-gray-700 text-sm sm:text-base leading-relaxed">
                <p>{mainDescription}</p>
                <p>
                  Our success has been built on creating a small, dedicated team of UK visa specialists who work collaboratively with our clients through each stage of the application process. We offer all prospective clients a free initial consultation to ensure we can add value to their application.
                </p>
                <p>
                  {contactInfo}
                </p>
              </div>
            </motion.div>
          </div>

          {/* Right Section - Statistics Grid */}
          <div>
            <div className="grid grid-cols-2 gap-4">
              {statistics.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className={`${stat.ptLarge ? 'pt-8 lg:pt-12' : ''}`}
                >
                  
                  {/* Content with left border */}
                  <div className="border-l-2 border-blue-500 pl-3">
                    <h3 className="text-lg font-bold text-blue-900 mb-2">{stat.title}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">{stat.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
