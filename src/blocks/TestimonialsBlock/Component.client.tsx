"use client"

import { useCallback, useEffect, useState } from "react"
import { ChevronLeft, ChevronRight, Star } from "lucide-react"
import { AnimatePresence, motion } from "motion/react"

interface Testimonial {
  id: string
  name: string
  role: string
  content: string
  avatar?: any
  rating: number
}

interface TestimonialsProps {
  title?: string | null
  description?: string | null
  testimonials: Testimonial[]
  autoplay: boolean
}

export function TestimonialsClient({
  title = "Müşteri Yorumları",
  description = "Müşterilerimizin deneyimlerini keşfedin",
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
    if (autoplay) {
      const interval = setInterval(handleNext, 5000)
      return () => clearInterval(interval)
    }
  }, [autoplay, handleNext])

  const getAvatarUrl = (avatar: any, size: number = 64) => {
    if (!avatar || typeof avatar === 'string') return avatar
    if (avatar.url) return avatar.url
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
    <section className="relative z-0 mb-8 md:mb-0">
      <div className="bg-muted min-h-auto py-12 md:py-24 relative">
        <div className="container mx-auto w-full max-w-6xl px-4 md:px-6">
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Layout: Title on left, Testimonial on right */}
            <div className="grid grid-cols-1 gap-6 md:gap-8 lg:grid-cols-2 lg:gap-12 mb-10">
              {/* Left side - Title and description */}
              <div className="flex flex-col justify-center mb-6 md:mb-0">
                <h2 className="text-foreground mb-4 text-4xl font-semibold">
                  {title}
                </h2>
                <p className="text-foreground/70 text-lg text-balance">
                  {description}
                </p>
              </div>

              {/* Right side - Testimonial card */}
              <div className="relative flex min-h-fit flex-col items-center md:items-end">
                {/* Navigation Arrows - Above the card */}
                <div className="mb-6 md:mb-4 flex justify-center gap-2">
                  <motion.button
                    onClick={handlePrev}
                    className="group/button bg-background flex h-8 w-8 items-center justify-center rounded-full border shadow-lg transition-all duration-200 hover:scale-110 hover:shadow-xl"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.4 }}
                  >
                    <ChevronLeft className="text-foreground h-5 w-5 transition-transform duration-300 group-hover/button:-rotate-12" />
                  </motion.button>

                  <motion.button
                    onClick={handleNext}
                    className="group/button bg-background flex h-8 w-8 items-center justify-center rounded-full border shadow-lg transition-all duration-200 hover:scale-110 hover:shadow-xl"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.4 }}
                  >
                    <ChevronRight className="text-foreground h-5 w-5 transition-transform duration-300 group-hover/button:rotate-12" />
                  </motion.button>
                </div>

                <div className="relative h-full w-full max-w-xs md:max-w-md">
                  <AnimatePresence>
                    {testimonials.map((testimonial, index) => (
                      <motion.div
                        key={testimonial.id}
                        initial={{
                          opacity: 0,
                          scale: 0.9,
                          y: 30,
                        }}
                        animate={{
                          opacity: isActive(index) ? 1 : 0,
                          scale: isActive(index) ? 1 : 0.95,
                          y: isActive(index) ? 0 : 30,
                        }}
                        exit={{
                          opacity: 0,
                          scale: 0.9,
                          y: -30,
                        }}
                        transition={{
                          duration: 0.4,
                          ease: "easeInOut",
                        }}
                        className={`absolute inset-0 min-h-fit ${isActive(index) ? "z-10" : "z-0"}`}
                      >
                        <div className="bg-background rounded-2xl border px-4 py-4 md:px-6 md:py-6 shadow-lg transition-all duration-200 mb-10">
                          {/* Rating Stars */}
                          <div className="mb-4 flex gap-1">
                            {renderStars(testimonial.rating)}
                          </div>

                          <motion.p
                            key={active}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                            className="text-foreground mb-6 text-lg"
                          >
                            {(testimonial.content || "")
                              .split(" ")
                              .map((word, wordIndex) => (
                                <motion.span
                                  key={`${testimonial.id}-word-${wordIndex}`}
                                  initial={{
                                    filter: "blur(4px)",
                                    opacity: 0,
                                    y: 5,
                                  }}
                                  animate={{
                                    filter: "blur(0px)",
                                    opacity: 1,
                                    y: 0,
                                  }}
                                  transition={{
                                    duration: 0.2,
                                    ease: "easeInOut",
                                    delay: wordIndex * 0.02,
                                  }}
                                  className="inline-block"
                                >
                                  {word}&nbsp;
                                </motion.span>
                              ))}
                          </motion.p>

                          <motion.div
                            className="flex items-center gap-3"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: 0.2 }}
                          >
                            <div className="ring-foreground/10 size-8 border border-transparent shadow ring-1 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white font-semibold text-sm">
                              {testimonial.avatar ? (
                                <img
                                  src={getAvatarUrl(testimonial.avatar, 64)}
                                  alt={testimonial.name}
                                  className="w-full h-full rounded-full object-cover"
                                />
                              ) : (
                                testimonial.name.charAt(0).toUpperCase()
                              )}
                            </div>
                            <div>
                              <div className="text-foreground font-semibold">
                                {testimonial.name}
                              </div>
                              <span className="text-muted-foreground text-sm">
                                {testimonial.role}
                              </span>
                            </div>
                          </motion.div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
