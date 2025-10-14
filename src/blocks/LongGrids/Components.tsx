'use client'
import React from 'react'
import Image from 'next/image'
import type { LongGridsBlock as LongGridsBlockType } from '@/payload-types'

export const LongGridsBlock: React.FC<LongGridsBlockType> = ({ gridItems }) => {
  if (!gridItems || gridItems.length === 0) return null

  return (
    <section className="py-6 bg-gray-50">
      <div className="container px-20 mx-auto cursor-pointer">
        <div className="space-y-8">
          {gridItems.map((item, index) => (
            <div
              key={index}
              className="relative rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-700 group bg-gradient-to-r from-green-600 to-gray-300 hover:from-green-500 hover:to-gray-400 min-h-[200px]"
            >
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
          ))}
        </div>
      </div>
    </section>
  )
}