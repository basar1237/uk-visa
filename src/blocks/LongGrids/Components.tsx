'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import { ChevronDown, ChevronUp } from 'lucide-react'
import type { LongGridsBlock as LongGridsBlockType } from '@/payload-types'

export const LongGridsBlock: React.FC<LongGridsBlockType> = ({ gridItems }) => {
  const [openItems, setOpenItems] = useState<Set<number>>(new Set())

  if (!gridItems || gridItems.length === 0) return null

  const toggleItem = (index: number) => {
    const newOpenItems = new Set(openItems)
    if (newOpenItems.has(index)) {
      newOpenItems.delete(index)
    } else {
      newOpenItems.add(index)
    }
    setOpenItems(newOpenItems)
  }

  return (
    <section className="py-6 bg-gray-50">
      <div className="container px-4 sm:px-6 lg:px-20 mx-auto">
        <div className="space-y-4 sm:space-y-8">
          {gridItems.map((item, index) => {
            const isOpen = openItems.has(index)
            
            return (
              <div
                key={index}
                className="relative rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-700 group bg-gradient-to-r from-green-600 to-gray-300 hover:from-green-500 hover:to-gray-400 min-h-[120px] sm:min-h-[200px]"
              >
                {/* Desktop Layout */}
                <div className="hidden lg:block">
                  {/* Logo Icon - Sol tarafta, kutunun üzerinde */}
                  <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1/2 z-10">
                    <div className="w-30 h-34 bg-white rounded-xl shadow-xl flex items-center justify-center py-8 px-2">
                      <Image 
                        src="/uk-logo.webp" 
                        alt="UK Logo" 
                        width={80}
                        height={80}
                        className="object-contain"
                      />
                    </div>
                  </div>

                  {/* Ana İçerik */}
                  <div className="grid grid-cols-12 items-center pl-16 py-8">
                    {/* Sol Taraf - İçerik (col-span-9) */}
                    <div className="col-span-9 pr-8">
                      {/* Başlık */}
                      {item.title && (
                        <h3 className="text-2xl font-bold text-white/95 mb-3">
                          {item.title}
                        </h3>
                      )}
                      
                      {/* Description */}
                      {item.description && (
                        <p className="text-white/80 leading-relaxed">
                          {item.description}
                        </p>
                      )}
                    </div>

                    {/* Sağ Taraf - Fiyat ve Buton (col-span-3) */}
                    <div className="col-span-3 flex flex-col items-end space-y-3 border-l border-white/20 pl-6 p-8">
                      {/* Subtitle/Fiyat */}
                      {item.item && (
                        <div className="text-white/90 font-bold text-lg">
                          {item.item}
                        </div>
                      )}
                      
                      {/* Button */}
                      {item.link?.url && item.link?.label && (
                        <a
                          href={item.link.url}
                          className="bg-blue-900/90 hover:bg-blue-800 text-white px-6 py-3 rounded-lg font-semibold text-sm transition-all duration-500 shadow-md hover:shadow-lg flex items-center gap-2"
                        >
                          {item.link.label}
                          <span>→</span>
                        </a>
                      )}
                    </div>
                  </div>
                </div>

                {/* Mobile Accordion Layout */}
                <div className="lg:hidden">
                  {/* Accordion Header */}
                  <button
                    onClick={() => toggleItem(index)}
                    className="w-full p-4 sm:p-6 flex items-center justify-between text-left min-h-[120px] longgrid-accordion-header touch-feedback"
                  >
                    <div className="flex items-center flex-1">
                      {/* Title and Price */}
                      <div className="flex-1 min-w-0">
                        {item.title && (
                          <h3 className="text-lg sm:text-xl font-bold text-white/95 mb-1 truncate">
                            {item.title}
                          </h3>
                        )}
                        {item.item && (
                          <div className="text-white/80 font-semibold text-sm sm:text-base">
                            {item.item}
                          </div>
                        )}
                      </div>
                    </div>
                    
                    {/* Chevron Icon */}
                    <div className="flex-shrink-0 ml-2">
                      {isOpen ? (
                        <ChevronUp className="w-6 h-6 text-white/80" />
                      ) : (
                        <ChevronDown className="w-6 h-6 text-white/80" />
                      )}
                    </div>
                  </button>

                  {/* Accordion Content */}
                  {isOpen && (
                    <div className="px-4 sm:px-6 pb-4 sm:pb-6 border-t border-white/20 longgrid-accordion-content">
                      <div className="pt-4 space-y-4">
                        {/* Description */}
                        {item.description && (
                          <p className="text-white/80 leading-relaxed text-sm sm:text-base">
                            {item.description}
                          </p>
                        )}
                        
                        {/* Button */}
                        {item.link?.url && item.link?.label && (
                          <div className="flex justify-center sm:justify-start">
                            <a
                              href={item.link.url}
                              className="bg-blue-900/90 hover:bg-blue-800 text-white px-6 py-3 rounded-lg font-semibold text-sm transition-all duration-500 shadow-md hover:shadow-lg flex items-center gap-2 min-h-[44px]"
                            >
                              {item.link.label}
                              <span>→</span>
                            </a>
                          </div>
                        )}
                      </div>
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