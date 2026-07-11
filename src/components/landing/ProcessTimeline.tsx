'use client'

import React from 'react'
import Link from 'next/link'
import {
  ClipboardCheck,
  UserPlus,
  FolderCheck,
  Send,
  ChevronRight,
  CheckCircle2,
  Clock,
  ArrowRight,
  Phone,
  Star,
  ShieldCheck,
} from 'lucide-react'

interface ProcessStep {
  id: number
  title: string
  description: string
  icon: React.ComponentType<{ className?: string }>
  meta: string
  metaIcon: React.ComponentType<{ className?: string }>
}

const processSteps: ProcessStep[] = [
  {
    id: 1,
    title: 'Check Your Eligibility',
    description:
      'Complete our free online assessment in just 2 minutes to find the right visa options for you.',
    icon: ClipboardCheck,
    meta: 'Takes 2 minutes',
    metaIcon: CheckCircle2,
  },
  {
    id: 2,
    title: 'Speak to an Expert',
    description:
      "Book a consultation with an experienced immigration adviser. We'll discuss your situation and create a tailored strategy.",
    icon: UserPlus,
    meta: 'Usually within 24 hours',
    metaIcon: Clock,
  },
  {
    id: 3,
    title: 'We Prepare Everything',
    description:
      'Our team prepares and reviews your application and supporting documents to ensure everything meets Home Office requirements.',
    icon: FolderCheck,
    meta: '3 – 7 days*',
    metaIcon: Clock,
  },
  {
    id: 4,
    title: 'Submit With Confidence',
    description:
      'We submit your application and keep you updated throughout the process until a decision is made.',
    icon: Send,
    meta: 'Ongoing support until decision',
    metaIcon: CheckCircle2,
  },
]

export const ProcessTimeline: React.FC = () => {
  return (
    <section className="py-16 md:py-24 bg-white relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-20"></div>
        <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-indigo-100 rounded-full blur-3xl opacity-20"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Heading */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold mb-4">
            <CheckCircle2 className="w-4 h-4" />
            OUR SIMPLE PROCESS
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            Your UK Visa Journey{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
              Made Simple
            </span>
          </h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto leading-relaxed">
            We make the complex visa process clear and stress-free. Here&apos;s how we help you from
            start to finish.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6">
          {processSteps.map((step, index) => {
            const Icon = step.icon
            const MetaIcon = step.metaIcon
            const isLast = index === processSteps.length - 1

            return (
              <div key={step.id} className="relative group">
                <div className="bg-white rounded-2xl shadow-md hover:shadow-xl border-2 border-gray-100 p-6 h-full flex flex-col transition-all duration-300">
                  {/* Step Number */}
                  <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-blue-800 text-white font-bold text-sm shadow-lg mb-5">
                    {step.id}
                  </div>

                  {/* Icon */}
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-blue-50 text-blue-600 mb-5">
                    <Icon className="w-7 h-7" />
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{step.title}</h3>

                  {/* Description */}
                  <p className="text-sm text-gray-600 mb-5 leading-relaxed flex-grow">
                    {step.description}
                  </p>

                  {/* Meta pill */}
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold bg-green-50 text-green-700 self-start">
                    <MetaIcon className="w-3.5 h-3.5" />
                    {step.meta}
                  </div>
                </div>

                {/* Connector arrow (desktop only) */}
                {!isLast && (
                  <div className="hidden lg:flex absolute top-1/2 -right-3 -translate-y-1/2 z-20 items-center justify-center w-7 h-7 rounded-full bg-white border-2 border-gray-100 shadow-sm text-blue-500">
                    <ChevronRight className="w-4 h-4" />
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Footnote */}
        <p className="text-center text-xs text-gray-400 mb-12">
          *Timeframes vary depending on visa type and individual circumstances.
        </p>

        {/* Bottom CTA card */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl border border-blue-100 p-6 md:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Left: rating badge */}
            <div className="flex items-center gap-4">
              <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-white shadow-md">
                <Star className="w-8 h-8 text-yellow-400 fill-yellow-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">4.9/5</p>
                <p className="text-sm text-gray-500">From 500+ Clients</p>
              </div>
            </div>

            {/* Right: copy + actions */}
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Ready to Start Your UK Visa Journey?
              </h3>
              <p className="text-gray-700 mb-5">
                Get expert advice from regulated immigration professionals and take the first step
                with confidence.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 mb-5">
                <Link
                  href="/eligibility-check"
                  className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl px-6 py-3 font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
                >
                  Start Free Assessment
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <a
                  href="tel:01143214047"
                  className="inline-flex items-center justify-center gap-2 bg-white text-blue-700 border border-blue-200 rounded-xl px-6 py-3 font-semibold hover:bg-blue-50 transition-all duration-300"
                >
                  <Phone className="w-4 h-4" />
                  Call Us: 01143214047
                </a>
              </div>

              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-gray-600">
                <span className="inline-flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-green-600" />
                  Fixed Fees
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-green-600" />
                  Transparent Process
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-green-600" />
                  Expert Support
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
