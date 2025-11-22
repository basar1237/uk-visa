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
    return null
  }

  return (
    <motion.header 
      className="fixed top-0 left-0 right-0 z-[9998] bg-white/40 backdrop-blur-xl py-2 sm:py-3"
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <div className="container mx-auto px-3 sm:px-4 py-2 sm:py-3 overflow-visible">
        <div className="flex items-center justify-between h-12 gap-5 sm:gap-2 md:gap-5 lg:gap-8 xl:gap-10 overflow-visible mx-auto">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1, duration: 0.3, ease: "easeOut" }}
            className="flex-shrink-0"
          >
            <Link href="/">
              <Logo />
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <motion.div 
            className="hidden lg:block flex-1 min-w-0 mx-2 xl:mx-4"
            style={{ overflow: 'visible' }}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.3, ease: "easeOut" }}
          >
            <HeaderNav data={data} />
          </motion.div>

          {/* Desktop CTA Buttons */}
          <motion.div 
            className="hidden lg:flex items-center gap-1.5 xl:gap-2 flex-shrink-0"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.3, ease: "easeOut" }}
          >
            <Link 
              href="tel:02037288948"
              className="flex items-center gap-1 bg-blue-700 text-white py-1.5 px-2 xl:px-2.5 rounded-xl shadow-xl hover:bg-blue-800 h-9 xl:h-10 whitespace-nowrap"
            >
              <Phone className="w-3 h-3 xl:w-3.5 xl:h-3.5 flex-shrink-0" />
              <span className="text-[10px] xl:text-xs font-medium 2xl:inline">+44 203 728 8948</span>
            </Link>
            <Link 
              href="/contact"
              className="flex items-center gap-1.5 bg-gradient-to-r from-green-500 via-green-600 to-green-700 text-white py-2 px-3 xl:px-4 rounded-xl shadow-lg hover:shadow-xl hover:from-green-600 hover:via-green-700 hover:to-green-800 h-9 xl:h-10 whitespace-nowrap font-semibold"
            >
              <Check className="w-4 h-4 xl:w-4 xl:h-4 flex-shrink-0" />
              <span className="text-xs xl:text-sm font-semibold">Free Assessment</span>
            </Link>
          </motion.div>

          {/* Mobile Menu Button */}
          <motion.button
            className="lg:hidden p-2 min-h-[44px] min-w-[44px] flex items-center justify-center flex-shrink-0"
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
                className="flex items-center justify-center space-x-2 bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 min-h-[44px]"
              >
                <Phone className="w-4 h-4" />
                <span className="text-sm font-medium">{data?.phoneNumber || '02037288948'}</span>
              </a>
              <Link 
                href="/consultation"
                onClick={closeMobileMenu}
                className="flex items-center justify-center space-x-2 bg-green-600 text-white px-4 py-3 rounded-lg hover:bg-green-700 min-h-[44px]"
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
