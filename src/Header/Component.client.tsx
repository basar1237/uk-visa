'use client'
import { motion } from "motion/react"
import Link from 'next/link'
import React, { useState } from 'react'
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

  if (!data) {
    console.error('HeaderClient - No data provided')
    return null
  }

  return (
    <motion.header 
      className="fixed top-0 left-0 right-0 z-50 bg-white/70 backdrop-blur-xl border-b border-gray-200/50 py-3"
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between h-12 gap-2">
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
            <a 
              href={`tel:${data?.phoneNumber || '02031782048'}`}
              className="flex items-center space-x-2 bg-blue-700 text-white px-4 py-2 rounded-xl hover:bg-blue-800 transition-colors"
            >
              <Phone className="w-4 h-4" />
              <span className="text-sm font-medium">{data?.phoneNumber || '0203 178 2048'}</span>
            </a>
            <Link 
              href="/consultation"
              className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-xl hover:bg-green-700 transition-colors"
            >
              <Check className="w-4 h-4" />
              <span className="text-sm font-medium">Free Assessment</span>
            </Link>
          </motion.div>

          {/* Mobile Menu Button */}
              <motion.button
                className="lg:hidden p-2"
                onClick={toggleMobileMenu}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.3, ease: "easeOut" }}
              >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </motion.button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <motion.div 
            className="lg:hidden border-t border-gray-200 py-4"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex flex-col space-y-2 mb-4">
              <a 
                href={`tel:${data?.phoneNumber || '02031782048'}`}
                className="flex items-center justify-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Phone className="w-4 h-4" />
                <span className="text-sm font-medium">{data?.phoneNumber || '0203 178 2048'}</span>
              </a>
              <Link 
                href="/consultation"
                className="flex items-center justify-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
              >
                <Check className="w-4 h-4" />
                <span className="text-sm font-medium">Free Assessment</span>
              </Link>
            </div>
            <HeaderNav data={data} isMobile={true} />
          </motion.div>
        )}
      </div>
    </motion.header>
  )
}
