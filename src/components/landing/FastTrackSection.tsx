'use client'

import React from 'react'
import { motion } from 'motion/react'
import { Gauge, Rocket, Zap } from 'lucide-react'

export const FastTrackSection: React.FC = () => {
  const services = [
    {
      icon: <Gauge className="w-12 h-12" />,
      title: "Accelerated Processing",
      description: "Choose from 5-Day, 7-Day, or 14-Day turnaround options, depending on your case type and urgency."
    },
    {
      icon: <Rocket className="w-12 h-12" />,
      title: "Premium Service",
      description: "Guaranteed next-day application submission from the day you contact us — perfect for time-sensitive cases."
    },
    {
      icon: <Zap className="w-12 h-12" />,
      title: "Super Premium Service",
      description: "Our fastest route — often processed the same day. Ideal for urgent travel, employment, or status confirmation. Suitable for submissions outside standard office hours."
    }
  ]

  return (
    <section className="relative py-20 bg-white overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
         <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-blue-900 mb-6">
            Fast-Track Your UK Visa Application
          </h2>
        </motion.div>

         <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <p className="text-gray-700 text-sm sm:text-base leading-relaxed max-w-4xl">
            Accelerate the process with our expert support. At UK Legal Solutions, we offer{' '}
            <strong>Super Premium</strong> and <strong>Priority</strong> visa services for clients who need to submit and process their UK visa applications urgently. While these services do not affect the outcome of your application, they can significantly reduce processing times, helping you meet tight deadlines with confidence.
          </p>
        </motion.div>

         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-all duration-300"
            >
               <div className="text-blue-700 mb-4">
                {service.icon}
              </div>
              
               <h3 className="text-xl font-bold text-teal-600 mb-3">
                {service.title}
              </h3>
              
               <p className="text-gray-700 leading-relaxed">
                {service.title === "Accelerated Processing" ? (
                  <>
                    Choose from <strong>5-Day</strong>, <strong>7-Day</strong>, or <strong>14-Day</strong> turnaround options, depending on your case type and urgency.
                  </>
                ) : service.title === "Super Premium Service" ? (
                  <>
                    Our fastest route — often processed <strong>the same day</strong>. Ideal for urgent travel, employment, or status confirmation. Suitable for submissions <strong>outside standard office hours</strong>.
                  </>
                ) : (
                  service.description
                )}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

