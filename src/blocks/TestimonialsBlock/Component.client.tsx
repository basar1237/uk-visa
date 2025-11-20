"use client"

import { useCallback, useEffect, useState } from "react"
import { ChevronLeft, ChevronRight, Star } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import type { Media } from "@/payload-types"

type AvatarType = string | number | Media | { url?: string } | null | undefined

interface Testimonial {
  id: string
  name: string
  role: string
  content: string
  avatar?: AvatarType
  rating: number
  visaType?: string | null
}

interface TestimonialsProps {
  title?: string | null
  description?: string | null
  testimonials: Testimonial[]
  autoplay: boolean
}

export function TestimonialsClient({
  title = "Customer Reviews",
  description = "Discover our clients' experiences",
  testimonials,
  autoplay,
}: TestimonialsProps) {
  const [active, setActive] = useState(0)

  const handleNext = useCallback(() => {
    setActive((prev) => (prev + 1) % testimonials.length)
  }, [testimonials.length])

  const handlePrev = () => {
    setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const isActive = (index: number) => {
    return index === active
  }

  useEffect(() => {
    // Varsayılan olarak autoplay açık olsun
    const shouldAutoplay = autoplay !== undefined ? autoplay : true
    if (shouldAutoplay && testimonials.length > 1) {
      const interval = setInterval(handleNext, 6000) // 6 saniyede bir yavaşça dönsün
      return () => clearInterval(interval)
    }
  }, [autoplay, handleNext, testimonials.length])

  const getAvatarUrl = (avatar: AvatarType): string | null => {
    if (!avatar) return null
    if (typeof avatar === 'string') return avatar
    if (typeof avatar === 'number') return null // Media ID, populate edilmesi gerekir
    if (typeof avatar === 'object' && 'url' in avatar && avatar.url) {
      return typeof avatar.url === 'string' ? avatar.url : null
    }
    return null
  }

  const renderStars = (rating: number) => {
    return (
      <span className="text-foreground/80 text-sm font-medium">
        {rating.toFixed(1)}
      </span>
    )
  }

  // Yorumları kısalt (maksimum karakter)
  const truncateContent = (content: string, maxLength: number = 120) => {
    if (content.length <= maxLength) return content
    return content.substring(0, maxLength).trim() + '...'
  }

  return (
    <section className="relative z-0 mb-8 md:mb-0">
      <div className="bg-muted min-h-auto py-6 md:py-8 relative">
        <div className="container mx-auto w-full max-w-6xl px-4 md:px-6">
          <div className="mb-6">
            {/* Layout: Title on left, Testimonial carousel on right */}
            <div className="grid grid-cols-1 gap-4 md:gap-6 lg:grid-cols-2 lg:gap-8 mb-4">
              {/* Left side - Title and description */}
              <div className="flex flex-col justify-center mb-3 md:mb-0">
                <h2 className="text-foreground mb-2 text-xl md:text-2xl font-semibold">
                  {title}
                </h2>
                <p className="text-foreground/70 text-xs md:text-sm text-balance mb-3">
                  {description}
                </p>
                <Link 
                  href="/comments"
                  className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium text-sm md:text-base mt-2"
                >
                  View All Reviews →
                </Link>
              </div>

              {/* Right side - Testimonial card */}
              <div className="relative flex min-h-fit flex-col items-center md:items-end">
                {/* Navigation Arrows - Above the card */}
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

                <div className="relative h-[240px] md:h-[260px] w-full max-w-xs md:max-w-sm">
                    {testimonials.map((testimonial, index) => (
                      <div
                        key={testimonial.id}
                        className={`absolute inset-0 min-h-fit ${isActive(index) ? "z-10" : "z-0"}`}
                      >
                        <div className="bg-background rounded-xl border px-3 py-3 md:px-4 md:py-4 shadow-lg">
                          {/* Rating Stars */}
                          <div className="mb-2 flex items-center gap-1">
                            {renderStars(testimonial.rating)}
                            <Star className="h-3 w-3 text-yellow-400 fill-current" />
                          </div>

                          <p className="text-foreground mb-3 text-xs md:text-sm leading-relaxed line-clamp-3">
                            {truncateContent(testimonial.content || "", 120)}
                          </p>

                          <div className="flex items-center gap-2">
                            {testimonial.avatar && (
                              <div className="ring-foreground/10 size-5 border border-transparent shadow ring-1 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white font-semibold text-xs flex-shrink-0">
                                <Image
                                  src={getAvatarUrl(testimonial.avatar) || ''}
                                  width={20}
                                  height={20}
                                  alt={testimonial.name}
                                  className="w-full h-full rounded-full object-cover"
                                />
                              </div>
                            )}
                            <div>
                              <div className="text-foreground font-medium text-sm">
                                {testimonial.name}
                              </div>
                              <span className="text-muted-foreground text-xs">
                                {testimonial.role}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  
                  {/* Indicator Dots */}
                  {testimonials.length > 1 && (
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-20">
                      {testimonials.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setActive(index)}
                          className={`h-2 rounded-full transition-all ${
                            active === index
                              ? 'w-6 bg-blue-600'
                              : 'w-2 bg-gray-300 hover:bg-gray-400'
                          }`}
                          aria-label={`Go to testimonial ${index + 1}`}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
