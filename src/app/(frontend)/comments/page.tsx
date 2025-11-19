import type { Metadata } from 'next'
import { CommentsPageClient } from './CommentsPageClient'
import { getPayloadInstance } from '@/utilities/getPayloadInstance'

export const metadata: Metadata = {
  title: 'Customer Reviews | UK Visa Application Support',
  description: 'Discover our clients\' reviews and experiences with UK visa applications.',
}

// Mevcut yorumları kullan (SuccessStories'dan)
const testimonials = [
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

async function getAllTestimonials() {
  // Mevcut yorumları döndür
  return testimonials.map((t) => ({
    id: `testimonial-${t.id}`,
    name: t.name,
    role: t.country,
    content: t.comment,
    avatar: null,
    rating: t.rating,
    visaType: t.visaType,
    country: t.country,
    timeline: t.timeline,
  }))
}

export default async function CommentsPage() {
  const testimonials = await getAllTestimonials()

  return <CommentsPageClient testimonials={testimonials} />
}

