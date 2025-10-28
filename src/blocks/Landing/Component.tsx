'use client'

import { cn } from '@/utilities/ui'
import React from 'react'
import RichText from '@/components/RichText'
import type { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'

import type { LandingBlock as LandingBlockProps, Page, Post, Media } from '@/payload-types'

import { CMSLink } from '../../components/Link'
import { Media as MediaComponent } from '../../components/Media'

type Badge = {
  text?: string
  id?: string | null
}

type LinkItem = {
  link?: {
    type?: ('reference' | 'custom') | null
    reference?: {
      relationTo: 'pages' | 'posts'
      value: string | number | Page | Post
    } | null
    url?: string | null
    label?: string | null
    appearance?: ('default' | 'outline' | 'red' | 'blue' | 'green') | null
    newTab?: boolean | null
  }
  id?: string | null
}

type Column = {
  size?: 'oneFourth' | 'oneThird' | 'half' | 'twoThirds' | 'threeFourths' | 'full'
  media?: string | Media | null
  badges?: Badge[] | null
  title?: string | null
  richText?: DefaultTypedEditorState
  links?: LinkItem[] | null
  greenSectionContent?: DefaultTypedEditorState
  id?: string | null
}

type LandingBlockExtended = LandingBlockProps & {
  columns?: Column[] | null
  backgroundStyle?: 'gradient' | 'white' | 'gray'
}

 export const LandingBlock: React.FC<LandingBlockProps> = (props) => {
  const { columns = [], backgroundStyle = 'white' } = props as LandingBlockExtended

  const colsSpanClasses = {
    full: '12',
    threeFourths: '9',
    twoThirds: '8',
    half: '6',
    oneThird: '4',
    oneFourth: '3',
  }

  const getBackgroundClass = () => {
    switch (backgroundStyle) {
      case 'gradient':
        return 'bg-gradient-to-r from-blue-500 to-green-500'
      case 'gray':
        return 'bg-gray-100'
      case 'white':
      default:
        return 'bg-white'
    }
  }

  return (
    <div className="container my-6 sm:my-8 lg:my-10 px-4 sm:px-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-4 sm:gap-6 lg:gap-8 sm:p-5">
        {columns && Array.isArray(columns) && columns.length > 0 &&
          columns.map((col, index) => {
            if (!col) return null
            
            const { links, richText, size, badges, media } = col
            const greenSectionContent = (col as any).greenSectionContent
            const colSize = size || 'full'
            const colSpanClass = colsSpanClasses[colSize as keyof typeof colsSpanClasses] || '12'
            const hasMedia = media && typeof media === 'object'
            const hasContent = richText || (links && links.length > 0) || (badges && badges.length > 0)

            return (
              <div
                className={cn(
                  `col-span-1 sm:col-span-2 lg:col-span-${colSpanClass}`,
                  'rounded-2xl border shadow-lg overflow-hidden',
                  getBackgroundClass(),
                  {
                    'sm:col-span-1': colSize === 'full',
                    'sm:col-span-2': colSize !== 'full',
                  }
                )}
                key={index}
              >
                {/* Resim ve içerik yan yana düzeni */}
                <div className={cn(
                  'flex flex-col lg:flex-row h-full',
                  {
                    'lg:flex-row': hasMedia && hasContent,
                    'flex-col': !hasMedia || !hasContent,
                  }
                )}>
                  {/* Resim alanı */}
                  {hasMedia && (
                    <div className={cn(
                      'relative',
                      {
                        'lg:w-1/2': hasContent && colSize !== 'full',
                        'lg:w-1/3': hasContent && colSize === 'oneFourth',
                        'lg:w-2/3': hasContent && colSize === 'threeFourths',
                        'w-full': !hasContent,
                      }
                    )}>
                      <MediaComponent
                        resource={media}
                        className="w-full h-full object-cover"
                        imgClassName="w-full h-full object-cover"
                        fill={false}
                        size="(max-width: 768px) 100vw, 50vw"
                      />
                    </div>
                  )}

                  {/* İçerik alanı */}
                  {hasContent && (
                    <div className={cn(
                      'p-4 sm:p-6 flex flex-col justify-start',
                      {
                        'lg:w-1/2': hasMedia && colSize !== 'full',
                        'lg:w-2/3': hasMedia && colSize === 'oneFourth',
                        'lg:w-1/3': hasMedia && colSize === 'threeFourths',
                        'w-full': !hasMedia,
                      }
                    )}>
                      {richText && (
                        <div className={backgroundStyle === 'gradient' ? 'text-white text-xs mb-4' : 'text-black text-xs mb-4'}>
                          <RichText data={richText} enableGutter={false} />
                        </div>
                      )}

                      {links && Array.isArray(links) && links.length > 0 && (
                        <div className="mt-6 flex flex-wrap justify-center items-center gap-3">
                          {links.map((linkItem, linkIndex: number) => (
                            <CMSLink 
                              key={linkIndex} 
                              {...linkItem.link}
                              appearance={linkItem.link?.appearance || 'default'}
                            />
                          ))}
                        </div>
                      )}
                      
                      {badges && Array.isArray(badges) && badges.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-3 justify-center items-center">
                          {badges.map((badgeItem, badgeIndex: number) => (
                            <span 
                              key={badgeIndex}
                              className={cn(
                                "text-xs font-semibold px-3 py-1.5 rounded-full uppercase tracking-wide bg-white text-blue-700 justify-center items-center shadow-lg border"
                              )}
                            >
                              {badgeItem?.text || String(badgeItem)}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Yeşil seçenek alanı - sadece LandingBlock template'inde */}
                      {(greenSectionContent) && (
                        <div className="w-full bg-green-200 p-2 rounded-xl mt-4 tet-xs">
                          <div className="text-center">
                            {greenSectionContent && (
                              <div className="text-sm text-green-700">
                                <RichText data={greenSectionContent} enableGutter={false} />
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            )
          })}
      </div>
    </div>
  )
}

