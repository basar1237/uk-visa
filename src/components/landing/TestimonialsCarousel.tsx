'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { Star, ChevronLeft, ChevronRight, Quote, CheckCircle2, Globe, TrendingUp } from 'lucide-react'
import Link from 'next/link'

interface Testimonial {
  id: number
  name: string
  visaType: string
  country: string
  rating: number
  comment: string
  timeline: string
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Ahmet Yılmaz',
    visaType: 'Skilled Worker Visa',
    country: 'Turkey',
    rating: 5,
    comment: 'UK Legal Solutions made my dream of working in London come true. Their team was professional, responsive, and guided me through every step. My visa was approved in just 4 weeks!',
    timeline: 'Approved in 4 weeks'
  },
  {
    id: 2,
    name: 'Maria Santos',
    visaType: 'Student Visa',
    country: 'Spain',
    rating: 5,
    comment: 'I was nervous about applying for my student visa, but the team at UK Legal Solutions made everything so easy. They answered all my questions and helped me prepare perfect documentation.',
    timeline: 'Approved in 3 weeks'
  },
  {
    id: 3,
    name: 'James Chen',
    visaType: 'Spouse Visa',
    country: 'China',
    rating: 5,
    comment: 'The best decision we made was hiring UK Legal Solutions for our spouse visa. They handled everything professionally and kept us updated throughout. We\'re now happily living together in London!',
    timeline: 'Approved in 5 months'
  },
  {
    id: 4,
    name: 'Sophie Dubois',
    visaType: 'Indefinite Leave to Remain',
    country: 'France',
    rating: 5,
    comment: 'After 5 years in the UK, I needed help with my ILR application. The team was incredibly knowledgeable about all the requirements. Thank you for making this process stress-free!',
    timeline: 'Approved in 6 months'
  },
  {
    id: 5,
    name: 'Raj Patel',
    visaType: 'Visitor Visa',
    country: 'India',
    rating: 5,
    comment: 'Fast, efficient, and professional service. My family and I received our visitor visas quickly and without any issues. Highly recommend their services!',
    timeline: 'Approved in 2 weeks'
  },
  {
    id: 6,
    name: 'Anna Kowalski',
    visaType: 'Health & Care Worker Visa',
    country: 'Poland',
    rating: 5,
    comment: 'As a healthcare professional, I needed expert guidance for my visa application. UK Legal Solutions understood my situation perfectly and helped me secure my visa to work in the NHS.',
    timeline: 'Approved in 5 weeks'
  }
]

const stats = [
  { label: 'Client Satisfaction', value: '98%', icon: Star },
  { label: 'Success Rate', value: '93%', icon: CheckCircle2 },
  { label: 'Countries Served', value: '50+', icon: Globe },
  { label: 'Visa Approvals', value: '10,000+', icon: TrendingUp }
]

export const TestimonialsCarousel: React.FC = () => {
  const [active, setActive] = useState(0)

  const handleNext = useCallback(() => {
    setActive((prev) => (prev + 1) % testimonials.length)
  }, [])

  const handlePrev = () => {
    setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  // Otomatik oynatma
  useEffect(() => {
    const interval = setInterval(handleNext, 6000) // 6 saniyede bir
    return () => clearInterval(interval)
  }, [handleNext])


  return (
    <section className="relative z-0 mb-8 md:mb-0">
      <div className="bg-muted min-h-auto py-6 md:py-8 relative">
        <div className="container mx-auto w-full max-w-6xl px-4 md:px-6">
          <div className="mb-6">
            <div className="grid grid-cols-1 gap-4 md:gap-6 lg:grid-cols-2 lg:gap-8 mb-6">
              {/* Left side - Title, description and stats */}
              <div className="flex flex-col justify-center mb-3 md:mb-0">
                <h2 className="text-foreground mb-4 text-3xl md:text-4xl lg:text-5xl font-bold">
                  Customer Reviews
                </h2>
                <p className="text-foreground/70 text-sm md:text-base text-balance mb-6">
                  Discover our clients&apos; experiences
                </p>
                
                {/* Statistics */}
                <div className="grid grid-cols-2 gap-3 md:gap-4 mb-6">
                  {stats.map((stat, index) => {
                    const Icon = stat.icon
                    return (
                      <div
                        key={index}
                        className="bg-background rounded-xl shadow-md p-3 md:p-4 border border-gray-200 hover:border-blue-300 text-center"
                      >
                        <Icon className="w-5 h-5 md:w-6 md:h-6 text-blue-600 mx-auto mb-2" />
                        <div className="text-xl md:text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
                        <div className="text-xs md:text-sm text-gray-600 font-medium">{stat.label}</div>
                      </div>
                    )
                  })}
                </div>

                <Link 
                  href="/comments"
                  className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium text-sm md:text-base"
                >
                  View All Reviews →
                </Link>
              </div>

              {/* Right side - Testimonial carousel */}
              <div className="relative flex min-h-fit flex-col items-center md:items-end">
                {/* Navigation Arrows */}
                <div className="mb-4 md:mb-3 flex justify-center gap-2">
                  <button
                    onClick={handlePrev}
                    className="group/button bg-background flex h-8 w-8 items-center justify-center rounded-full border shadow-lg"
                  >
                    <ChevronLeft className="text-foreground h-5 w-5" />
                  </button>

                  <button
                    onClick={handleNext}
                    className="group/button bg-background flex h-8 w-8 items-center justify-center rounded-full border shadow-lg"
                  >
                    <ChevronRight className="text-foreground h-5 w-5" />
                  </button>
                </div>

                <div className="relative min-h-[400px] md:min-h-[450px] w-full max-w-md md:max-w-lg lg:max-w-xl">
                    {testimonials.map((testimonial, index) => (
                      index === active && (
                        <div
                          key={testimonial.id}
                          className="absolute inset-0"
                        >
                          <div className="bg-gradient-to-br from-white to-blue-50 rounded-2xl border-2 border-blue-200 px-5 py-5 md:px-7 md:py-7 shadow-xl min-h-full flex flex-col">
                            {/* Quote Icon */}
                            <div className="mb-3">
                              <Quote className="w-6 h-6 md:w-8 md:h-8 text-blue-300" />
                            </div>

                            {/* Rating Stars */}
                            <div className="mb-4 flex items-center gap-1.5">
                              {[...Array(testimonial.rating)].map((_, i) => (
                                <Star key={i} className="h-4 w-4 md:h-5 md:w-5 fill-yellow-400 text-yellow-400" />
                              ))}
                              <span className="ml-2 text-sm md:text-base font-semibold text-gray-700">
                                {testimonial.rating.toFixed(1)}
                              </span>
                            </div>

                            {/* Comment */}
                            <p className="text-foreground mb-5 text-base md:text-lg leading-relaxed flex-1 font-medium">
                              {testimonial.comment}
                            </p>

                            {/* Author Info */}
                            <div className="mt-auto pt-4 border-t-2 border-blue-100">
                              <div className="flex items-center justify-between mb-3">
                                <div>
                                  <div className="text-foreground font-bold text-base md:text-lg mb-1">
                                    {testimonial.name}
                                  </div>
                                  <span className="text-muted-foreground text-sm md:text-base">
                                    {testimonial.country}
                                  </span>
                                </div>
                                <div className="text-right">
                                  <div className="text-xs md:text-sm font-bold text-blue-700 bg-gradient-to-r from-blue-100 to-indigo-100 px-3 py-1.5 rounded-lg border border-blue-200">
                                    {testimonial.visaType}
                                  </div>
                                </div>
                              </div>
                              <div className="text-sm md:text-base text-blue-600 font-semibold bg-blue-50 px-3 py-1.5 rounded-lg inline-block">
                                {testimonial.timeline}
                              </div>
                            </div>
                          </div>
                        </div>
                      )
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

