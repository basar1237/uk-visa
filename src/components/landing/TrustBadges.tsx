'use client'

import React from 'react'
import { BadgeCheck, ShieldCheck, Award } from 'lucide-react'

export const TrustBadges: React.FC = () => {
  const certifications = [
    {
      icon: BadgeCheck,
      title: 'SRA Registered',
      description: 'Licensed by Solicitors Regulation Authority',
      color: 'from-blue-600 to-blue-700'
    },
    {
      icon: ShieldCheck,
      title: 'OISC Level 3',
      description: 'Highest level OISC accreditation',
      color: 'from-green-600 to-green-700'
    },
    {
      icon: Award,
      title: 'CILEx Accredited',
      description: 'Chartered Institute of Legal Executives certified',
      color: 'from-purple-600 to-purple-700'
    }
  ]

  return (
    <section className="py-12 md:py-16 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            Trusted & Accredited
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Fully licensed and regulated immigration advisors
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 md:gap-6">
          {certifications.map((cert, index) => (
            <div
              key={index}
              className="bg-white rounded-xl border border-gray-200 hover:border-gray-300 p-4 md:p-5 shadow-sm hover:shadow-md flex items-center gap-3 md:gap-4 flex-1 md:flex-none min-w-[280px] max-w-[350px]"
            >
              <div className={`bg-gradient-to-br ${cert.color} p-3 rounded-lg flex-shrink-0`}>
                <cert.icon className="w-6 h-6 md:w-7 md:h-7 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-gray-900 text-sm md:text-base mb-1">
                  {cert.title}
                </h3>
                <p className="text-xs md:text-sm text-gray-600">
                  {cert.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
