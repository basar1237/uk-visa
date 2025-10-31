'use client'

import React, { useState } from 'react'
import { motion } from 'motion/react'
import { Star, Quote, CheckCircle2, Globe, TrendingUp } from 'lucide-react'
import Link from 'next/link'

interface Testimonial {
  id: number
  name: string
  visaType: string
  country: string
  rating: number
  comment: string
  image?: string
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

export const SuccessStories: React.FC = () => {
  const [selectedTestimonial, setSelectedTestimonial] = useState(0)

  return (
    <section className="py-20 md:py-28 bg-gradient-to-br from-gray-50 to-blue-50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-200 rounded-full blur-3xl opacity-20"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-200 rounded-full blur-3xl opacity-20"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-semibold mb-4">
            <CheckCircle2 className="w-4 h-4" />
            Real Client Success Stories
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            Trusted by <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Thousands</span> Worldwide
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Don&apos;t just take our word for it. See what our clients say about their experience with UK Legal Solutions.
          </p>
        </motion.div>

        {/* Statistics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-16"
        >
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg p-6 text-center border-2 border-gray-100 hover:border-blue-300 transition-colors"
              >
                <Icon className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">{stat.value}</div>
                <div className="text-sm text-gray-600 font-medium">{stat.label}</div>
              </div>
            )
          })}
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-12">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl p-6 md:p-8 border-2 border-gray-100 hover:border-blue-300 transition-all duration-300"
            >
              {/* Quote Icon */}
              <div className="mb-4">
                <Quote className="w-8 h-8 text-blue-200" />
              </div>

              {/* Rating */}
              <div className="flex items-center gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>

              {/* Comment */}
              <p className="text-gray-700 mb-6 leading-relaxed italic">
                &quot;{testimonial.comment}&quot;
              </p>

              {/* Author Info */}
              <div className="border-t border-gray-200 pt-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-bold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-600">{testimonial.country}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-1 rounded">
                      {testimonial.visaType}
                    </div>
                  </div>
                </div>
                <div className="mt-2 text-xs text-gray-500">
                  {testimonial.timeline}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="inline-block bg-white rounded-2xl shadow-xl p-8 border-2 border-gray-200">
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              Join Thousands of Successful Clients
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl">
              Start your UK visa journey today with expert guidance from our experienced team. Get your free consultation and take the first step towards your British dream.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300"
            >
              Start Your Application Today
              <CheckCircle2 className="w-5 h-5" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

