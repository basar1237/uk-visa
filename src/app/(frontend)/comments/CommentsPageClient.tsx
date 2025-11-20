'use client'

import React, { useState, useMemo, useEffect } from 'react'
import { Star, Filter, X, Quote } from 'lucide-react'
import Image from 'next/image'
import type { Media } from '@/payload-types'

type AvatarType = string | number | Media | { url?: string } | null | undefined

interface Testimonial {
  id: string
  name: string
  role: string
  content: string
  avatar?: AvatarType
  rating: number
  visaType?: string | null
  country?: string
  timeline?: string
}

interface CommentsPageClientProps {
  testimonials: Testimonial[]
}

export const CommentsPageClient: React.FC<CommentsPageClientProps> = ({ testimonials }) => {
  const [selectedVisaType, setSelectedVisaType] = useState<string>('all')
  const [showFilter, setShowFilter] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Tüm visa tiplerini topla
  const visaTypes = useMemo(() => {
    const types = new Set<string>()
    testimonials.forEach((t) => {
      if (t.visaType) {
        types.add(t.visaType)
      }
    })
    return Array.from(types).sort()
  }, [testimonials])

  // Filtrelenmiş yorumlar
  const filteredTestimonials = useMemo(() => {
    if (selectedVisaType === 'all') {
      return testimonials
    }
    return testimonials.filter((t) => t.visaType === selectedVisaType)
  }, [testimonials, selectedVisaType])

  const getAvatarUrl = (avatar: AvatarType): string | null => {
    if (!avatar) return null
    if (typeof avatar === 'string') return avatar
    if (typeof avatar === 'number') return null
    if (typeof avatar === 'object' && 'url' in avatar && avatar.url) {
      return typeof avatar.url === 'string' ? avatar.url : null
    }
    return null
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 py-20 md:py-32 relative overflow-hidden">
        {/* Background decorations */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            <div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
                Customer Reviews
              </h1>
              <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
                Discover our clients&apos; experiences with UK visa applications
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Section */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="max-w-7xl mx-auto">
          {/* Mobile Filter Button */}
          <div className="md:hidden mb-6">
            <button
              onClick={() => setShowFilter(!showFilter)}
              className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-md"
            >
              <Filter className="w-5 h-5" />
              <span className="font-medium">Filter</span>
              {selectedVisaType !== 'all' && (
                <span className="bg-blue-600 text-white text-xs px-2 py-0.5 rounded-full">
                  {visaTypes.find((t) => t === selectedVisaType)?.length || 1}
                </span>
              )}
            </button>
          </div>

          {/* Desktop & Mobile Filter */}
            {(showFilter || !isMobile) && (
              <div className="mb-8">
                <div className="bg-white rounded-xl shadow-lg p-4 md:p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold text-gray-900">Filter by Visa Type</h2>
                    <button
                      onClick={() => setShowFilter(false)}
                      className="md:hidden p-1 hover:bg-gray-100 rounded"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2 md:gap-3">
                    <button
                      onClick={() => setSelectedVisaType('all')}
                      className={`px-4 py-2 rounded-lg font-medium ${
                        selectedVisaType === 'all'
                          ? 'bg-blue-600 text-white shadow-md'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      All ({testimonials.length})
                    </button>
                    {visaTypes.map((visaType) => {
                      const count = testimonials.filter((t) => t.visaType === visaType).length
                      return (
                        <button
                          key={visaType}
                          onClick={() => setSelectedVisaType(visaType)}
                          className={`px-4 py-2 rounded-lg font-medium ${
                            selectedVisaType === visaType
                              ? 'bg-blue-600 text-white shadow-md'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                        >
                          {visaType} ({count})
                        </button>
                      )
                    })}
                  </div>
                </div>
              </div>
            )}

          {/* Testimonials Grid */}
          {filteredTestimonials.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-600 text-xl">No reviews found for this visa type yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 lg:gap-12">
              {filteredTestimonials.map((testimonial, index) => (
                <div
                  key={testimonial.id}
                  className="bg-white rounded-3xl shadow-xl p-8 md:p-10 border-2 border-gray-100"
                >
                  {/* Quote Icon */}
                  <div className="mb-4">
                    <Quote className="w-8 h-8 text-blue-200" />
                  </div>

                  {/* Rating */}
                  <div className="flex items-center gap-2 mb-5">
                    {renderStars(testimonial.rating)}
                    <span className="ml-2 text-base font-semibold text-gray-700">
                      {testimonial.rating.toFixed(1)}
                    </span>
                  </div>

                  {/* Visa Type Badge */}
                  {testimonial.visaType && (
                    <div className="mb-5">
                      <span className="inline-block bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 text-sm font-bold px-4 py-2 rounded-full border border-blue-200">
                        {testimonial.visaType}
                      </span>
                    </div>
                  )}

                  {/* Comment */}
                  <p className="text-gray-700 mb-8 leading-relaxed text-base md:text-lg italic min-h-[120px]">
                    &quot;{testimonial.content}&quot;
                  </p>

                  {/* Author Info */}
                  <div className="pt-6 border-t-2 border-gray-100">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-4">
                        {testimonial.avatar ? (
                          <div className="ring-foreground/10 size-14 border-2 border-transparent shadow-lg ring-1 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                            <Image
                              src={getAvatarUrl(testimonial.avatar) || ''}
                              width={56}
                              height={56}
                              alt={testimonial.name}
                              className="w-full h-full rounded-full object-cover"
                            />
                          </div>
                        ) : (
                          <div className="size-14 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white font-bold text-lg flex-shrink-0 shadow-lg">
                            {testimonial.name.charAt(0).toUpperCase()}
                          </div>
                        )}
                        <div>
                          <div className="text-gray-900 font-bold text-lg md:text-xl">
                            {testimonial.name}
                          </div>
                          <span className="text-gray-600 text-sm md:text-base">
                            {testimonial.country || testimonial.role}
                          </span>
                        </div>
                      </div>
                    </div>
                    {testimonial.timeline && (
                      <div className="text-sm text-blue-600 font-semibold bg-blue-50 px-3 py-1.5 rounded-lg inline-block">
                        {testimonial.timeline}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

