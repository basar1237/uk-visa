'use client'
import { motion } from "motion/react"
import Link from 'next/link'
import React, { useState, useEffect } from 'react'
import { Phone, Check, Menu, X } from 'lucide-react'

import type { Header } from '@/payload-types'

import { HeaderNav } from './Nav'
import { Logo } from '@/components/Logo/Logo'

interface HeaderClientProps {
  data: Header
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ data }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  // Body scroll lock when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isMobileMenuOpen])

  if (!data) {
    console.error('HeaderClient - No data provided')
    return null
  }

  return (
    <motion.header 
      className="fixed top-0 left-0 right-0 z-50 bg-white/40 backdrop-blur-xl py-2 sm:py-3"
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <div className="container mx-auto px-4 py-2 sm:py-3">
        <div className="flex items-center justify-between h-12 sm:h-14 gap-2">
          {/* Logo */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1, duration: 0.3, ease: "easeOut" }}
              >
            <Link href="/">
              <Logo />
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
              <motion.div 
                className="hidden lg:block"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15, duration: 0.3, ease: "easeOut" }}
              >
            <HeaderNav data={data} />
          </motion.div>

          {/* Desktop CTA Buttons */}
          <motion.div 
            className="hidden lg:flex items-center space-x-4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.3, ease: "easeOut" }}
          >
             <Link 
              href="tel:02037288948"
              className="flex items-center space-x-2 bg-blue-700 text-white py-2 px-2 rounded-xl hover:bg-blue-800 transition-colors min-h-[44px]"
            >
              <Phone className="w-4 h-4" />
              <span className="text-xs sm:text-sm font-medium">+44 203 728 8948</span>
            </Link>
            <Link 
              href="/consultation"
              className="flex items-center space-x-2 bg-green-600 text-white py-2 px-2 rounded-xl hover:bg-green-700 transition-colors min-h-[44px]"
            >
              <Check className="w-4 h-4" />
              <span className="text-xs sm:text-sm font-medium">Free Assessment</span>
            </Link>
          </motion.div>

          {/* Mobile Menu Button */}
              <motion.button
                className="lg:hidden p-2 min-h-[44px] min-w-[44px] flex items-center justify-center"
                onClick={toggleMobileMenu}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.3, ease: "easeOut" }}
                aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </motion.button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <motion.div 
            className="lg:hidden border-t border-gray-200 py-4 max-h-[calc(100vh-80px)] overflow-y-auto"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex flex-col space-y-3 mb-4">
              <a 
                href={`tel:${data?.phoneNumber || '02037288948'}`}
                onClick={closeMobileMenu}
                className="flex items-center justify-center space-x-2 bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 transition-colors min-h-[44px]"
              >
                <Phone className="w-4 h-4" />
                <span className="text-sm font-medium">{data?.phoneNumber || '02037288948'}</span>
              </a>
              <Link 
                href="/consultation"
                onClick={closeMobileMenu}
                className="flex items-center justify-center space-x-2 bg-green-600 text-white px-4 py-3 rounded-lg hover:bg-green-700 transition-colors min-h-[44px]"
              >
                <Check className="w-4 h-4" />
                <span className="text-sm font-medium">Free Assessment</span>
              </Link>
            </div>
            <HeaderNav data={data} isMobile={true} onLinkClick={closeMobileMenu} />
          </motion.div>
        )}
      </div>
    </motion.header>
  )
}
