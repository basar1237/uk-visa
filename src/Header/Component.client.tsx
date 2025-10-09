'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { Search, Phone } from 'lucide-react'

import type { Header } from '@/payload-types'

import { HeaderNav } from './Nav'

interface HeaderClientProps {
  data: Header
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ data }) => {
  /* Storing the value in a useState to avoid hydration errors */
  const [theme, setTheme] = useState<string | null>(null)
  const { headerTheme, setHeaderTheme } = useHeaderTheme()
  const pathname = usePathname()

  useEffect(() => {
    setHeaderTheme(null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  useEffect(() => {
    if (headerTheme && headerTheme !== theme) setTheme(headerTheme)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [headerTheme])

  return (
    <header className="container relative z-20 text-lg" {...(theme ? { 'data-theme': theme } : {})}>
      <div className="py-8 flex justify-between">
        <Link href="/">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
              <div className="w-6 h-6 bg-white rounded-full"></div>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold text-gray-900">UK LEGAL</span>
              <span className="text-sm font-normal text-gray-600 -mt-1">SOLUTIONS</span>
            </div>
          </div>
        </Link>
        <HeaderNav data={data} />
        <div className="flex items-center space-x-4">
          <button className="p-2 text-gray-600 hover:text-gray-900 transition-colors">
            <Search className="w-5 h-5" />
          </button>
          <a 
            href={`tel:${data?.phoneNumber || '07858780841'}`}
            className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-50 transition-colors whitespace-nowrap"
          >
            <Phone className="w-4 h-4 inline mr-2" />
            CALL US FREE ON: {data?.phoneNumber || '07858780841'}
          </a>
        </div>
      </div>
    </header>
  )
}
