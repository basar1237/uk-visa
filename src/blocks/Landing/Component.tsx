import { cn } from '@/utilities/ui'
import React from 'react'
import RichText from '@/components/RichText'
import type { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'

import type { LandingBlock as LandingBlockProps, Page, Post } from '@/payload-types'

import { CMSLink } from '../../components/Link'

type Badge = {
  text?: string
  id?: string | null
}

type LinkItem = {
  type?: ('reference' | 'custom') | null
  reference?: {
    relationTo: 'pages' | 'posts'
    value: string | number | Page | Post
  } | null
  url?: string | null
  label?: string | null
  appearance?: ('default' | 'outline') | null
  newTab?: boolean | null
  id?: string | null
}

type Column = {
  size?: 'oneThird' | 'half' | 'twoThirds' | 'full'
  badges?: Badge[] | null
  title?: string | null
  richText?: DefaultTypedEditorState
  links?: LinkItem[] | null
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
    half: '6',
    oneThird: '4',
    twoThirds: '8',
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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-4 sm:gap-6 lg:gap-8 p-4 sm:p-5">
        {columns && Array.isArray(columns) && columns.length > 0 &&
          columns.map((col, index) => {
            if (!col) return null
            
            const { links, richText, size, badges } = col
            const colSize = size || 'full'
            const colSpanClass = colsSpanClasses[colSize as keyof typeof colsSpanClasses] || '12'

            return (
              <div
                className={cn(
                  `col-span-1 sm:col-span-2 lg:col-span-${colSpanClass}`,
                  'rounded-2xl shadow-lg p-4 sm:p-6',
                  getBackgroundClass(),
                  {
                    'sm:col-span-1': colSize === 'full',
                    'sm:col-span-2': colSize !== 'full',
                  }
                )}
                key={index}
              >


                {richText && (
                  <div className={backgroundStyle === 'gradient' ? 'text-white text-sm' : 'text-black text-sm'}>
                    <RichText data={richText} enableGutter={false} />
                  </div>
                )}

                {links && Array.isArray(links) && links.length > 0 && (
                  <div className="mt-6 flex flex-wrap justify-center items-center gap-3">
                    {links.map((linkItem, linkIndex: number) => (
                      <CMSLink key={linkIndex} {...linkItem} />
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
              </div>
            )
          })}
      </div>
    </div>
  )
}

