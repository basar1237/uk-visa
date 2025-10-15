import React from 'react'
import { TestimonialsClient } from './Component.client'

import type { TestimonialsBlock } from '@/payload-types'

export const TestimonialsBlockComponent: React.FC<TestimonialsBlock> = async (props) => {
  const {
    title,
    description,
    testimonials,
    autoplay,
  } = props

  // Testimonials'ı uygun formata çevir
  const formattedTestimonials = (testimonials || []).map((testimonial, index) => ({
    id: `testimonial-${index}`,
    name: testimonial.name,
    role: testimonial.role,
    content: testimonial.content,
    avatar: testimonial.avatar,
    rating: testimonial.rating || 5,
  }))

  if (!formattedTestimonials || formattedTestimonials.length === 0) {
    return null
  }

  return (
    <TestimonialsClient
      title={title}
      description={description}
      testimonials={formattedTestimonials}
      autoplay={autoplay || false}
    />
  )
}
