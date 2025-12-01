'use client'

import React from 'react'
import { Gauge, Rocket, Zap } from 'lucide-react'

export const FastTrackSection: React.FC = () => {
  const services = [
    {
      icon: <Gauge className="w-12 h-12" />,
      title: "Accelerated Processing",
      description: "Choose from 7 days to 14 days turnaround options, depending on your case type and urgency."
    },
    {
      icon: <Rocket className="w-12 h-12" />,
      title: "Premium Service",
      description: "Guaranteed next day application submission from the day you contact us, perfect for time sensitive cases."
    },
    {
      icon: <Zap className="w-12 h-12" />,
      title: "Super Premium Service",
      description: "Our fastest route guarantees same day submission. Ideal for urgent travel, employment or status confirmation. Suitable for submissions outside standard office hours."
    }
  ]

  return (
    <section className="relative py-20 bg-white overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
         <div className="mb-8 text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-blue-900 mb-6">
            Fast-Track Your UK Visa & Immigration Application
          </h2>
        </div>

         <div className="mb-12 text-center">
          <p className="text-gray-700 text-sm sm:text-base leading-relaxed max-w-4xl mx-auto">
            At UK Legal Solutions, we provide <strong>Accelerated</strong>, <strong>Premium</strong>, <strong>Super Premium</strong> and <strong>Executive</strong> UK Visa & Immigration services for clients who need to submit and process their UK visa applications urgently. While these services do not influence the Home Office&apos;s decision, they significantly reduce processing times, allowing clients to meet tight deadlines with confidence and peace of mind.
          </p>
        </div>

         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg"
            >
               <div className="text-blue-700 mb-4">
                {service.icon}
              </div>
              
               <h3 className="text-xl font-bold text-teal-600 mb-3">
                {service.title}
              </h3>
              
               <p className="text-gray-700 leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

