import React from 'react'
import { ChevronRight, CheckCircle, Users, Clock } from 'lucide-react'
import type { KnowledgeBaseBlock } from '@/payload-types'
import { Media } from '@/components/Media'
import Link from 'next/link'

export const KnowledgeBaseComponent: React.FC<KnowledgeBaseBlock> = ({ 
  title, 
  description, 
  knowledgeItems, 
  eligibilityTest,
  ctaButton: _ctaButton 
}) => {
  return (
    <section className="py-16 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Ana Başlık ve Açıklama */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-4xl font-bold text-gray-900 mb-6">
            {title}
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            {description}
          </p>
        </div>

        {/* Knowledge Items Grid - 3x2 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-12">
          {knowledgeItems?.map((item, index) => {
            const CardContent = (
              <div className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden cursor-pointer transform hover:-translate-y-2 h-full">
                {/* Görsel Alan */}
                <div className="relative h-48 sm:h-56 overflow-hidden">
                  {item.image && typeof item.image === 'object' && (
                    <Media
                      resource={item.image}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  )}
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* İçerik Alanı */}
                <div className="p-6 sm:p-8 flex flex-col h-full">
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors duration-300">
                    {item.title}
                  </h3>
                  
                  {/* Explore Button */}
                  <div className="flex items-center text-blue-600 font-semibold group-hover:text-blue-700 transition-colors duration-300 mt-auto">
                    <span className="mr-2">Explore</span>
                    <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                </div>
              </div>
            )

            // Eğer link varsa, tüm kartı link ile sarmala
            if (item.link) {
              return (
                <a
                  key={index}
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block h-full"
                >
                  {CardContent}
                </a>
              )
            }

            // Link yoksa sadece kartı göster
            return (
              <div key={index} className="h-full">
                {CardContent}
              </div>
            )
          })}
        </div>

        {/* Eligibility Test */}
        <div className="">
          {/* UK Visa Eligibility Test */}
          {eligibilityTest && (
            <div className="group relative bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden transform hover:-translate-y-2">
              <div className="p-8 sm:p-10">
                {/* İkon ve Başlık */}
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mr-4 group-hover:bg-green-200 transition-colors duration-300">
                    <CheckCircle className="w-8 h-8 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      {eligibilityTest.title}
                    </h3>
                    <div className="flex items-center text-green-600 text-sm font-semibold">
                      <Users className="w-4 h-4 mr-1" />
                      <span>Free Assessment</span>
                    </div>
                  </div>
                </div>

                {/* Açıklama */}
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {eligibilityTest.description}
                </p>

                {/* Özellikler */}
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="flex items-center text-sm text-gray-600">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    <span>20 Questions</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Clock className="w-4 h-4 text-green-500 mr-2" />
                    <span>~10 Minutes</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    <span>Instant Results</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    <span>No Registration</span>
                  </div>
                </div>

                {/* Buton */}
                <div className="flex justify-center">
                  <Link
                    href={eligibilityTest.link || '/eligibility-check'}
                    className="inline-flex items-center justify-center w-auto px-6 py-4 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors duration-300 shadow-lg group-hover:shadow-xl"
                  >
                    {eligibilityTest.buttonText || 'Start Free Assessment'}
                    <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                  </Link>
                </div>
              </div>

              {/* Hover Effect Overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            </div>
          )}

        </div>

      </div>
    </section>
  )
}
