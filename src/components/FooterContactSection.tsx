'use client'

import React from 'react'
import { motion } from 'motion/react'
import Link from 'next/link'
import {
  ShieldCheck,
  Star,
  Lock,
  Globe,
  Phone,
  Mail,
  MessageCircle,
  CalendarDays,
  Video,
  User,
  Clock,
  Check,
  ArrowRight,
} from 'lucide-react'

const trustBadges = [
  { icon: ShieldCheck, title: 'IAA Regulated', subtitle: 'Immigration Adviser' },
  { icon: Star, title: '5-Star Rated', subtitle: 'By Our Clients' },
  { icon: Lock, title: 'Confidential', subtitle: 'Professional Advice' },
  { icon: Globe, title: 'UK & Overseas', subtitle: 'Clients Welcomed' },
]

const consultationOptions = [
  {
    icon: Video,
    title: 'Video Consultation',
    description: 'Meet your adviser securely from anywhere in the world.',
    points: ['Zoom / Teams', 'Secure & Confidential', 'Flexible Scheduling'],
  },
  {
    icon: Phone,
    title: 'Telephone Consultation',
    description: 'Speak directly with an IAA regulated adviser.',
    points: ['Direct Phone Call', 'Same-Day Appointments', 'Flexible Times'],
  },
  {
    icon: User,
    title: 'In-Person Consultation',
    description: 'Available by appointment at various meeting locations across the UK.',
    points: ['Appointment Only', 'Location Confirmed After Booking', 'Private & Comfortable Environment'],
  },
]

export const FooterContactSection: React.FC = () => {
  return (
    <div className="bg-[#0a1b3d]">
      <div className="mx-auto max-w-7xl px-6 py-12 md:py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          {/* Header */}
          <div className="text-center mb-8">
            <p className="text-xs font-semibold tracking-widest text-blue-300 uppercase mb-3">
              Contact &amp; Consultations
            </p>
            <h2 className="text-2xl md:text-4xl font-bold text-white mb-3">
              Speak to an <span className="text-blue-400">IAA Regulated</span> Immigration Adviser
            </h2>
            <p className="text-white/70 max-w-2xl mx-auto">
              Whether you are in the UK or overseas, we provide expert immigration advice tailored to
              your circumstances.
            </p>
          </div>

          {/* Trust badges */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
            {trustBadges.map((badge) => {
              const Icon = badge.icon
              return (
                <div
                  key={badge.title}
                  className="flex items-center gap-3 justify-center rounded-xl bg-white/5 border border-white/10 px-4 py-3"
                >
                  <Icon className="w-6 h-6 text-blue-300 shrink-0" />
                  <div className="text-left">
                    <p className="text-sm font-semibold text-white leading-tight">{badge.title}</p>
                    <p className="text-xs text-white/60 leading-tight">{badge.subtitle}</p>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Two Panel Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left Panel: Get in Touch */}
            <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm">
              <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2">Get in Touch</h3>
              <p className="text-gray-600 mb-6">
                We offer consultations by appointment via online, telephone or in person.
              </p>

              <div className="space-y-5">
                {/* Call */}
                <div className="flex items-start gap-4">
                  <div className="h-11 w-11 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">Call Us</p>
                    <a
                      href="tel:01143214047"
                      className="text-blue-700 font-bold hover:text-blue-800 transition-colors"
                    >
                      0114 321 4047
                    </a>
                    <p className="text-gray-500 text-sm">Mon – Fri: 9:00am – 6:00pm</p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-4">
                  <div className="h-11 w-11 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">Email Us</p>
                    <a
                      href="mailto:info@ukimmigrationhelpline.com"
                      className="text-blue-700 hover:text-blue-800 transition-colors break-all"
                    >
                      info@ukimmigrationhelpline.com
                    </a>
                    <p className="text-gray-500 text-sm">We aim to respond within 1 business hour.</p>
                  </div>
                </div>

                {/* WhatsApp */}
                <div className="flex items-start gap-4">
                  <div className="h-11 w-11 rounded-xl bg-green-50 text-green-600 flex items-center justify-center shrink-0">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">WhatsApp</p>
                    <a
                      href="https://wa.me/447858780841"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-green-700 font-bold hover:text-green-800 transition-colors"
                    >
                      +44 7858 780 841
                    </a>
                    <p className="text-gray-500 text-sm">Chat with us on WhatsApp.</p>
                  </div>
                </div>

                {/* Appointment note */}
                <div className="flex items-start gap-4 pt-2 border-t border-gray-100">
                  <div className="h-11 w-11 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center shrink-0">
                    <CalendarDays className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">Consultations by Appointment Only</p>
                    <p className="text-gray-500 text-sm">
                      In-person consultations are available by appointment at various meeting locations
                      across the UK. Location details will be provided when you book.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Panel: Consultation Options */}
            <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm flex flex-col">
              <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-4">Consultation Options</h3>

              <div className="space-y-4 flex-grow">
                {consultationOptions.map((option) => {
                  const Icon = option.icon
                  return (
                    <div
                      key={option.title}
                      className="flex items-start gap-4 rounded-xl border border-gray-100 p-4 hover:border-blue-200 hover:shadow-sm transition-all"
                    >
                      <div className="h-11 w-11 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0">
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-bold text-gray-900">{option.title}</p>
                        <p className="text-gray-500 text-sm mb-2">{option.description}</p>
                        <ul className="space-y-1">
                          {option.points.map((point) => (
                            <li key={point} className="flex items-center gap-1.5 text-xs text-gray-600">
                              <Check className="w-3.5 h-3.5 text-green-600 shrink-0" />
                              {point}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* Response time + CTA */}
              <div className="mt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <div className="flex items-center gap-2 text-sm text-gray-600 flex-1">
                  <Clock className="w-4 h-4 text-blue-600" />
                  <span>
                    Average response time <strong className="text-gray-900">within 1 business hour</strong>
                  </span>
                </div>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl px-6 py-3 font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
                >
                  Book Consultation
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>

          {/* IAA registration strip */}
          <div className="mt-8 rounded-2xl bg-white/5 border border-white/10 px-6 py-5">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex items-start gap-3">
                <ShieldCheck className="w-8 h-8 text-blue-300 shrink-0" />
                <div>
                  <p className="text-sm font-bold text-white">IAA Regulated Immigration Adviser</p>
                  <p className="text-xs text-white/60 max-w-xl">
                    We provide regulated UK immigration advice in accordance with the Immigration and
                    Asylum Act 1999.
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap gap-x-5 gap-y-2 text-xs text-white/70">
                <span className="inline-flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-green-400" /> Fixed Fee &amp; Transparent Pricing
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5 text-green-400" /> Ethical &amp; Confidential
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Globe className="w-3.5 h-3.5 text-green-400" /> UK &amp; Overseas Clients Welcomed
                </span>
              </div>
            </div>
            <p className="mt-4 pt-4 border-t border-white/10 text-center text-sm text-white/80">
              Our IAA registration number is{' '}
              <span className="font-bold text-white">F202639854</span>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
