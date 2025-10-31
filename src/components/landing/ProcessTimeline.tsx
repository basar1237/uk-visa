'use client'

import React from 'react'
import { motion } from 'motion/react'
import Link from 'next/link'
import { 
  FileSearch, 
  FileCheck, 
  Send, 
  Clock, 
  CheckCircle2, 
  Plane,
  MessageSquare,
  Award
} from 'lucide-react'

interface ProcessStep {
  id: number
  title: string
  description: string
  icon: React.ComponentType<{ className?: string }>
  duration: string
  color: string
}

const processSteps: ProcessStep[] = [
  {
    id: 1,
    title: 'Free Consultation',
    description: 'Speak with our immigration experts about your goals, circumstances, and visa options. We\'ll assess your eligibility and recommend the best path forward.',
    icon: MessageSquare,
    duration: '30 minutes',
    color: 'blue'
  },
  {
    id: 2,
    title: 'Eligibility Assessment',
    description: 'Take our free online eligibility test in just minutes. Our comprehensive assessment analyzes your qualifications, circumstances, and visa options to determine your best pathway to the UK.',
    icon: FileSearch,
    duration: '5-10 minutes',
    color: 'indigo'
  },
  {
    id: 3,
    title: 'Document Preparation',
    description: 'Our team will guide you through gathering all necessary documents. We\'ll help organize, translate, and certify everything you need for your application.',
    icon: FileCheck,
    duration: '1-2 weeks',
    color: 'purple'
  },
  {
    id: 4,
    title: 'Application Submission',
    description: 'We\'ll complete and submit your visa application with precision and attention to detail. All forms are double-checked to avoid delays or rejections.',
    icon: Send,
    duration: 'Same day',
    color: 'pink'
  },
  {
    id: 5,
    title: 'Processing & Updates',
    description: 'We monitor your application status closely and keep you informed at every stage. Our team responds promptly to any requests from UKVI.',
    icon: Clock,
    duration: 'Varies by visa',
    color: 'orange'
  },
  {
    id: 6,
    title: 'Visa Approval',
    description: 'Congratulations! Once approved, we\'ll help you understand your visa conditions, rights, and next steps for entering or remaining in the UK.',
    icon: CheckCircle2,
    duration: 'Celebrate!',
    color: 'green'
  }
]

export const ProcessTimeline: React.FC = () => {
  return (
    <section className="py-20 md:py-28 bg-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-30"></div>
        <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-indigo-100 rounded-full blur-3xl opacity-30"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold mb-4">
            <Award className="w-4 h-4" />
            Our Proven Process
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            Your Journey to <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">UK Visa Success</span>
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            From initial consultation to visa approval, we guide you through every step with expertise, transparency, and personalized support.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative max-w-5xl mx-auto">
          {/* Vertical line (desktop) */}
          <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-blue-500 via-indigo-500 to-green-500 z-0"></div>

          {/* Steps */}
          <div className="space-y-12 lg:space-y-16">
            {processSteps.map((step, index) => {
              const Icon = step.icon
              const isEven = index % 2 === 0
              
              return (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className={`relative z-10 flex flex-col lg:flex-row items-center gap-6 lg:gap-8 ${
                    isEven ? 'lg:flex-row-reverse' : ''
                  }`}
                >
                  {/* Content Card */}
                  <div className={`
                    flex-1 bg-white rounded-2xl shadow-lg hover:shadow-xl 
                    p-6 md:p-8 border-2 border-gray-100 
                    transition-all duration-300
                    ${step.color === 'blue' ? 'hover:border-blue-300' :
                      step.color === 'indigo' ? 'hover:border-indigo-300' :
                      step.color === 'purple' ? 'hover:border-purple-300' :
                      step.color === 'pink' ? 'hover:border-pink-300' :
                      step.color === 'orange' ? 'hover:border-orange-300' :
                      'hover:border-green-300'}
                    ${isEven ? 'lg:text-right lg:pr-12' : 'lg:text-left lg:pl-12'}
                  `}>
                    {/* Step Number */}
                    <div className={`
                      inline-flex items-center justify-center
                      w-12 h-12 rounded-full 
                      bg-gradient-to-br ${
                        step.color === 'blue' ? 'from-blue-500 to-blue-600' :
                        step.color === 'indigo' ? 'from-indigo-500 to-indigo-600' :
                        step.color === 'purple' ? 'from-purple-500 to-purple-600' :
                        step.color === 'pink' ? 'from-pink-500 to-pink-600' :
                        step.color === 'orange' ? 'from-orange-500 to-orange-600' :
                        'from-green-500 to-green-600'
                      }
                      text-white font-bold text-lg mb-4 shadow-lg
                    `}>
                      {step.id}
                    </div>

                    {/* Icon */}
                    <div className={`
                      inline-flex items-center justify-center
                      w-14 h-14 rounded-xl mb-4
                      bg-gradient-to-br ${
                        step.color === 'blue' ? 'from-blue-100 to-blue-200' :
                        step.color === 'indigo' ? 'from-indigo-100 to-indigo-200' :
                        step.color === 'purple' ? 'from-purple-100 to-purple-200' :
                        step.color === 'pink' ? 'from-pink-100 to-pink-200' :
                        step.color === 'orange' ? 'from-orange-100 to-orange-200' :
                        'from-green-100 to-green-200'
                      }
                      ${
                        step.color === 'blue' ? 'text-blue-600' :
                        step.color === 'indigo' ? 'text-indigo-600' :
                        step.color === 'purple' ? 'text-purple-600' :
                        step.color === 'pink' ? 'text-pink-600' :
                        step.color === 'orange' ? 'text-orange-600' :
                        'text-green-600'
                      }
                    `}>
                      <Icon className="w-7 h-7" />
                    </div>

                    {/* Title */}
                    {step.id === 2 ? (
                      <Link href="/eligibility-check">
                        <h3 className="text-2xl font-bold text-gray-900 mb-3 hover:text-indigo-600 transition-colors cursor-pointer">
                          {step.title}
                        </h3>
                      </Link>
                    ) : (
                      <h3 className="text-2xl font-bold text-gray-900 mb-3">
                        {step.title}
                      </h3>
                    )}

                    {/* Description */}
                    <p className="text-gray-600 mb-4 leading-relaxed">
                      {step.description}
                    </p>

                    {/* Duration */}
                    <div className={`
                      inline-flex items-center gap-2
                      px-3 py-1.5 rounded-lg text-sm font-semibold
                      ${
                        step.color === 'blue' ? 'bg-blue-50 text-blue-700' :
                        step.color === 'indigo' ? 'bg-indigo-50 text-indigo-700' :
                        step.color === 'purple' ? 'bg-purple-50 text-purple-700' :
                        step.color === 'pink' ? 'bg-pink-50 text-pink-700' :
                        step.color === 'orange' ? 'bg-orange-50 text-orange-700' :
                        'bg-green-50 text-green-700'
                      }
                    `}>
                      <Clock className="w-4 h-4" />
                      {step.duration}
                    </div>
                  </div>

                  {/* Icon Circle (Desktop) */}
                  <div className="hidden lg:flex flex-shrink-0 items-center justify-center">
                    <div className={`
                      w-20 h-20 rounded-full
                      bg-gradient-to-br ${
                        step.color === 'blue' ? 'from-blue-500 to-blue-600' :
                        step.color === 'indigo' ? 'from-indigo-500 to-indigo-600' :
                        step.color === 'purple' ? 'from-purple-500 to-purple-600' :
                        step.color === 'pink' ? 'from-pink-500 to-pink-600' :
                        step.color === 'orange' ? 'from-orange-500 to-orange-600' :
                        'from-green-500 to-green-600'
                      }
                      shadow-xl flex items-center justify-center
                    `}>
                      <Icon className="w-10 h-10 text-white" />
                    </div>
                  </div>

                  {/* Spacer (Mobile) */}
                  <div className="lg:hidden"></div>
                </motion.div>
              )
            })}
          </div>

          {/* Final CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            viewport={{ once: true }}
            className="mt-16 text-center relative z-20"
          >
            <Link href="/contact">
              <div className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl shadow-xl p-6 hover:shadow-2xl hover:scale-105 transition-all duration-300 cursor-pointer">
                <Plane className="w-8 h-8" />
                <div>
                  <h3 className="font-bold text-lg mb-1">Ready to Start Your Application?</h3>
                  <p className="text-sm text-blue-100">Book your free consultation today and take the first step towards your UK visa.</p>
                </div>
              </div>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

