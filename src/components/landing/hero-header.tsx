"use client"

import { motion } from "motion/react"
import { useState } from "react"
import { Menu, X, Phone, Check } from "lucide-react"
import Link from "next/link"

export function HeroHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <motion.header 
      className="fixed top-0 left-0 right-0 z-50 bg-white/90 my-2 backdrop-blur-md border-b border-gray-200/50"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">FM</span>
              </div>
              <span className="font-bold text-xl text-gray-900">First Migration</span>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <motion.nav 
            className="hidden md:flex items-center space-x-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Link href="/services" className="text-gray-700 hover:text-blue-600 transition-colors">
              Services
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-blue-600 transition-colors">
              About
            </Link>
            <Link href="/contact" className="text-gray-700 hover:text-blue-600 transition-colors">
              Contact
            </Link>
            <Link href="/blog" className="text-gray-700 hover:text-blue-600 transition-colors">
              Blog
            </Link>
          </motion.nav>

          {/* Desktop CTA Buttons */}
          <motion.div 
            className="hidden md:flex items-center space-x-4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <a 
              href="tel:02031782048"
              className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Phone className="w-4 h-4" />
              <span className="text-sm font-medium">0203 178 2048</span>
            </a>
            <Link 
              href="/consultation"
              className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
            >
              <Check className="w-4 h-4" />
              <span className="text-sm font-medium">Free Assessment</span>
            </Link>
          </motion.div>

          {/* Mobile Menu Button */}
          <motion.button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </motion.button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div 
            className="md:hidden border-t border-gray-200 py-4"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <nav className="flex flex-col space-y-4">
              <Link href="/services" className="text-gray-700 hover:text-blue-600 transition-colors">
                Services
              </Link>
              <Link href="/about" className="text-gray-700 hover:text-blue-600 transition-colors">
                About
              </Link>
              <Link href="/contact" className="text-gray-700 hover:text-blue-600 transition-colors">
                Contact
              </Link>
              <Link href="/blog" className="text-gray-700 hover:text-blue-600 transition-colors">
                Blog
              </Link>
              <div className="flex flex-col space-y-2 pt-4 border-t border-gray-200">
                <a 
                  href="tel:02031782048"
                  className="flex items-center justify-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  <span className="text-sm font-medium">0203 178 2048</span>
                </a>
                <Link 
                  href="/consultation"
                  className="flex items-center justify-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                >
                  <Check className="w-4 h-4" />
                  <span className="text-sm font-medium">Free Assessment</span>
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </div>
    </motion.header>
  )
}
