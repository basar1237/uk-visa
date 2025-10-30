import React from 'react'
import Link from 'next/link'

import type { ServicesGridBlock } from '@/payload-types'


export const ServicesGridComponent: React.FC<ServicesGridBlock> = ({ title, description, services }) => {

  return (
    <section className="py-5 bg-gray-50">
      <div className="container mx-auto px-4">
        {title && (
           <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-blue-900 my-16 text-center">
            {title}
          </h2>
        )}
        
        {description && (
          <p className="text-gray-600 mb-8 text-lg leading-relaxed">
            {description}
          </p>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services?.map((service, index) => {
            return (
              <div key={index} className="bg-white rounded-xl border hover:border-blue-200 transition-all duration-300 p-4 shadow-lg md:h-65 h-full flex flex-col justify-start">
                <div className="flex flex-col">
                  <h3 className="font-bold text-blue-800 mb-2 text-xl">
                    {service.title}
                  </h3>
                  
                  <p className="text-gray-800 leading-relaxed mb-4 flex-1 text-sm">
                    {service.description}
                  </p>
                  
                  {/* Badges */}
                  {service.badges && service.badges.length > 0 && (
                    <div className="flex flex-wrap gap-5 mt-auto  ">
                      {service.badges.map((badge, badgeIndex) => (
                        badge.link ? (
                          <Link
                            key={badgeIndex}
                            href={badge.link}
                            className="flex items-center justify-center bg-blue-100 text-blue-800 px-2 py-1 rounded-full md:text-sm text-xs font-medium hover:bg-blue-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                          >
                            {badge.text}
                          </Link>
                        ) : (
                          <span
                            key={badgeIndex}
                            className="inline-block bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm font-medium"
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
      </div>
    </section>
  )
}
