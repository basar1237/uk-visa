'use client'

import React from 'react'
import { motion } from 'motion/react'
import { Languages, Globe, Headphones, MessageCircle } from 'lucide-react'
import Link from 'next/link'

export const MultilingualSupport: React.FC = () => {
  const languages = [
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'tr', name: 'Türkçe', flag: '🇹🇷' },
    { code: 'ar', name: 'العربية', flag: '🇸🇦' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
    { code: 'it', name: 'Italiano', flag: '🇮🇹' },
    { code: 'zh', name: '中文', flag: '🇨🇳' },
    { code: 'hi', name: 'हिन्दी', flag: '🇮🇳' },
    { code: 'pt', name: 'Português', flag: '🇵🇹' },
    { code: 'ru', name: 'Русский', flag: '🇷🇺' },
    { code: 'ur', name: 'اردو', flag: '🇵🇰' }
  ]

  const features = [
    {
      icon: Languages,
      title: 'Multi-Language Support',
      description: 'Expert advisors fluent in 12+ languages'
    },
    {
      icon: Headphones,
      title: '24/7 Assistance',
      description: 'Round-the-clock support when you need it most'
    },
    {
      icon: MessageCircle,
      title: 'Clear Communication',
      description: 'No language barriers, only understanding'
    },
    {
      icon: Globe,
      title: 'Global Reach',
      description: 'Serving clients from 80+ countries worldwide'
    }
  ]

  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full mb-4">
            <Globe className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            We Speak Your Language
          </h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto leading-relaxed">
            Expert immigration advice in your native language. We're here to help you succeed.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-xl p-6 border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all duration-300 text-center"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg mb-4">
                <feature.icon className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-gray-600">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Languages */}
        <div className="bg-white rounded-2xl p-6 md:p-8 border border-gray-200 shadow-lg">
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-6">
            Supported Languages
          </h3>
          <div className="flex flex-wrap justify-center gap-3">
            {languages.map((lang) => (
              <div
                key={lang.code}
                className="flex items-center gap-2 bg-gray-50 hover:bg-blue-50 border border-gray-200 hover:border-blue-300 rounded-lg px-4 py-2 transition-all duration-300 cursor-pointer group"
              >
                <span className="text-2xl">{lang.flag}</span>
                <span className="text-sm font-medium text-gray-700 group-hover:text-blue-600">
                  {lang.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-8">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg"
          >
            <MessageCircle className="w-5 h-5" />
            Start Your Consultation
          </Link>
        </div>
      </div>
    </section>
  )
}
