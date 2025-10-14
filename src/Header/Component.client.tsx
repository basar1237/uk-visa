'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { Search, Phone, Check, Menu, X } from 'lucide-react'

import type { Header } from '@/payload-types'

import { HeaderNav } from './Nav'
import { Logo } from '@/components/Logo/Logo'

interface HeaderClientProps {
  data: Header
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ data }) => {
  /* Storing the value in a useState to avoid hydration errors */
  const [theme, setTheme] = useState<string | null>(null)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
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

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  if (!data) {
    console.error('HeaderClient - No data provided')
    return null
  }

  return (
    <header className="bg-white shadow-sm" {...(theme ? { 'data-theme': theme } : {})}>
      {/* Top Bar - Desktop Only */}
      <div className="hidden md:block bg-gray-50 border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex justify-end gap-4 items-center py-2 header-top-bar">
            {/* Search Icon */}
            <button className="p-2 text-gray-600 hover:text-gray-900 transition-colors">
              <Search className="w-5 h-5" />
            </button>
            
            {/* Phone Button */}
            <a 
              href={`tel:${data?.phoneNumber || '02031782048'}`}
              className="bg-blue-600 text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-blue-700 transition-colors inline-flex items-center gap-2 header-phone-button"
            >
              <Phone className="w-4 h-4" />
              {data?.phoneNumber || '0203 178 2048'}
            </a>
            
            {/* Book Assessment Button */}
            <button className="bg-green-600 text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-green-700 transition-colors inline-flex items-center gap-2 header-assessment-button">
              <Check className="w-4 h-4" />
              Book A Free Assessment
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="container mx-auto px-4">
        <div className="py-4 flex justify-between items-center">
          <Link href="/">
            <Logo />
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden lg:block">
            <HeaderNav data={data} />
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="lg:hidden p-2 text-gray-600 hover:text-gray-900 transition-colors"
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-200">
          <div className="container mx-auto px-4 py-4">
            {/* Mobile Top Actions */}
            <div className="flex flex-col sm:flex-row gap-3 mb-6">
              <a 
                href={`tel:${data?.phoneNumber || '02031782048'}`}
                className="bg-blue-600 text-white px-4 py-3 rounded-xl text-sm font-medium hover:bg-blue-700 transition-colors inline-flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4" />
                {data?.phoneNumber || '0203 178 2048'}
              </a>
              
              <button className="bg-green-600 text-white px-4 py-3 rounded-xl text-sm font-medium hover:bg-green-700 transition-colors inline-flex items-center justify-center gap-2">
                <Check className="w-4 h-4" />
                Book A Free Assessment
              </button>
            </div>

            {/* Mobile Navigation */}
            <div className="mobile-nav">
              <HeaderNav data={data} isMobile={true} />
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
