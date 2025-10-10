import React from 'react'

import type { CallToActionBlock as CTABlockProps } from '@/payload-types'

import RichText from '@/components/RichText'
import { CMSLink } from '@/components/Link'

export const CallToActionBlock: React.FC<CTABlockProps> = ({ links, richText }) => {
  return (
    <div className="container">
      <div className="bg-[#eef4fa] rounded-xl p-3 md:p-3 relative overflow-hidden">
         <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#2160b1] rounded-l-lg"></div>
        <div className="flex items-start gap-6">
          <div className="flex-shrink-0 mt-2">
            <div className="w-20 h-20 bg-[#2160b1] rounded-lg flex items-center justify-center">
              <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 6.5V7.5C15 8.3 14.3 9 13.5 9H10.5C9.7 9 9 8.3 9 7.5V6.5L3 7V9L9 8.5V9.5C9 10.3 9.7 11 10.5 11H13.5C14.3 11 15 10.3 15 9.5V8.5L21 9ZM7 12H17V14H7V12ZM5 15H19V17H5V15ZM3 18H21V20H3V18Z"/>
              </svg>
            </div>
          </div>
          
          {/* İçerik alanı */}
          <div className="flex-1">
            <div className="max-w-none">
              {richText && (
                <RichText 
                  className="mb-0 
                  [&_p]:text-sm [&_p]:leading-snug [&_p]:mb-1 [&_p:last-child]:mb-0 
                  [&_ul]:text-sm [&_li]:text-sm [&_ul]:mb-1 [&_li]:mb-0.5 
                  [&_h1]:mb-1 [&_h2]:mb-1 [&_h3]:mb-1 [&_h4]:mb-1 [&_h5]:mb-1 [&_h6]:mb-1 
                  [&_h1]:mt-0 [&_h2]:mt-0 [&_h3]:mt-0 [&_h4]:mt-0 [&_h5]:mt-0 [&_h6]:mt-0 
                  [&_h5]:text-xs [&_h5]:font-normal [&_h6]:text-[0.65rem] [&_h6]:font-normal
                  [&_span]:inline" 
                  data={richText} 
                  enableGutter={false}
                  enableProse={false}
                />
              )}
            </div>
            
            {/* Butonlar */}
            <div className="mt-6 flex flex-col sm:flex-row gap-4 rounded-lg">
              {(links || []).map(({ link }, i) => {
                if (!link) return null
                return (
                  <div key={i} className="flex justify-center sm:justify-start">
                    <CMSLink 
                      size="lg" 
                      {...link}
                      className="bg-[#2160b1] hover:bg-[#1a4d8f] text-white font-bold px-5 py-3 rounded-xl transition-colors duration-200 shadow-sm hover:shadow-md
                      hover:text-white border-0"
                    />
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
