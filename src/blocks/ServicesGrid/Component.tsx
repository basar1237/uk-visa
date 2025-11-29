'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'motion/react'
import { ArrowRight } from 'lucide-react'
import { usePathname } from 'next/navigation'

import type { ServicesGridBlock } from '@/payload-types'


export const ServicesGridComponent: React.FC<ServicesGridBlock> = ({ title, description, services }) => {
  const pathname = usePathname()
  const isHomePage = pathname === '/'

  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {title && (
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6 text-center">
            {title}
          </h2>
        )}
        
        {description && (
          <p className="text-gray-600 mb-12 text-lg leading-relaxed text-center max-w-3xl mx-auto">
            {description}
          </p>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-6">
          {services?.map((service, index) => {
            const gradient = 'from-blue-500 to-indigo-500'
            
            return (
              <div 
                key={index} 
                className="group relative bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border-2 border-gray-100 hover:border-blue-300 flex flex-col h-full"
              >
                 <div className={`absolute top-0 left-0 right-0 h-1.5 from-blue-500 to-indigo-50`}></div>
                
                <div className="p-6 flex flex-col flex-grow">
                   <h3 className={`font-bold mb-3 text-xl from-blue-800 bg-clip-text`}>
                    {service.title}
                  </h3>
                  
                  <div className="text-gray-600 leading-relaxed mb-6 flex-1 text-sm">
                    <ul className={`${isHomePage ? 'list-none' : 'list-disc'} list-inside space-y-1 line-clamp-4`}>
                      {service.description?.split('\n').filter(line => line.trim()).map((line, lineIndex) => (
                        <li key={lineIndex} className="whitespace-normal">{line.trim()}</li>
                      ))}
                    </ul>
                  </div>
                  
                   {service.badges && service.badges.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-auto  pt-4 border-t border-gray-200">
                      {service.badges.map((badge, badgeIndex) => (
                        badge.link ? (
                          <Link
                            key={badgeIndex}
                            href={badge.link}
                            className={`inline-flex hover:-translate-y-[2px] transition-all duration-300 ease-in-out items-center justify-center px-3 py-1.5 rounded-full text-xs font-medium bg-blue-500 text-white hover:opacity-90 shadow-sm hover:shadow-md`}
                          >
                            {badge.text}
                          </Link>
                        ) : (
                          <span
                            key={badgeIndex}
                            className={`inline-flex hover:-translate-y-[2px] transition-all duration-300 ease-in-out items-center justify-center px-3 py-1.5 rounded-full text-xs font-medium  bg-gradient-to-r ${gradient} bg-opacity-10 text-gray-700`}
                          >
                            {badge.text}
                          </span>
                        )
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>

        {/* Bottom CTA - Sadece ana sayfada göster */}
        {/* {isHomePage && (
          <div
            className="text-center mt-12"
          >
            <div className="inline-flex flex-col sm:flex-row items-center gap-4 bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
               <div className="text-left">
                <h3 className="font-bold text-gray-900 mb-1 justify-center flex">Not sure which visa is right for you?</h3>
                <p className="text-sm text-gray-600 mb-3">Our expert team can assess your eligibility and guide you to the best visa option.</p>
                <div className="flex items-center justify-center gap-3">
                  <Link
                    href="/eligibility-check"
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold px-6 py-3 rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-200"
                  >
                    Check Your Eligibility Free
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )} */}
      </div>
    </section>
  )
}
