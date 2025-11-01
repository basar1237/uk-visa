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
    <section className="py-16 md:py-24 bg-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-20"></div>
        <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-indigo-100 rounded-full blur-3xl opacity-20"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold mb-4">
            <Award className="w-4 h-4" />
            Our Proven Process
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            Your Journey to <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">UK Visa Success</span>
          </h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto leading-relaxed">
            From initial consultation to visa approval, we guide you through every step with expertise, transparency, and personalized support.
          </p>
        </motion.div>

        {/* Grid of Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-12">
          {processSteps.map((step, index) => {
            const Icon = step.icon
            
            return (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group"
              >
                {step.id === 2 ? (
                  <Link href="/eligibility-check">
                    <div className={`
                      bg-white rounded-xl shadow-md hover:shadow-xl 
                      p-5 border-2 border-gray-100 
                      transition-all duration-300 h-full flex flex-col
                      ${step.color === 'blue' ? 'hover:border-blue-300' :
                        step.color === 'indigo' ? 'hover:border-indigo-300' :
                        step.color === 'purple' ? 'hover:border-purple-300' :
                        step.color === 'pink' ? 'hover:border-pink-300' :
                        step.color === 'orange' ? 'hover:border-orange-300' :
                        'hover:border-green-300'}
                      cursor-pointer
                    `}>
                      {/* Step Number & Icon */}
                      <div className="flex items-start justify-between mb-3">
                        <div className={`
                          inline-flex items-center justify-center
                          w-10 h-10 rounded-full 
                          bg-gradient-to-br ${
                            step.color === 'blue' ? 'from-blue-500 to-blue-600' :
                            step.color === 'indigo' ? 'from-indigo-500 to-indigo-600' :
                            step.color === 'purple' ? 'from-purple-500 to-purple-600' :
                            step.color === 'pink' ? 'from-pink-500 to-pink-600' :
                            step.color === 'orange' ? 'from-orange-500 to-orange-600' :
                            'from-green-500 to-green-600'
                          }
                          text-white font-bold text-sm shadow-lg
                        `}>
                          {step.id}
                        </div>

                        {/* Icon */}
                        <div className={`
                          inline-flex items-center justify-center
                          w-10 h-10 rounded-lg
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
                          <Icon className="w-5 h-5" />
                        </div>
                      </div>

                      {/* Title */}
                      <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors">
                        {step.title}
                      </h3>

                      {/* Description */}
                      <p className="text-sm text-gray-600 mb-4 leading-relaxed flex-grow line-clamp-3">
                        {step.description}
                      </p>

                      {/* Duration */}
                      <div className={`
                        inline-flex items-center gap-2
                        px-3 py-1.5 rounded-lg text-xs font-semibold
                        ${
                          step.color === 'blue' ? 'bg-blue-50 text-blue-700' :
                          step.color === 'indigo' ? 'bg-indigo-50 text-indigo-700' :
                          step.color === 'purple' ? 'bg-purple-50 text-purple-700' :
                          step.color === 'pink' ? 'bg-pink-50 text-pink-700' :
                          step.color === 'orange' ? 'bg-orange-50 text-orange-700' :
                          'bg-green-50 text-green-700'
                        }
                      `}>
                        <Clock className="w-3 h-3" />
                        {step.duration}
                      </div>
                    </div>
                  </Link>
                ) : (
                  <div className={`
                    bg-white rounded-xl shadow-md hover:shadow-xl 
                    p-5 border-2 border-gray-100 
                    transition-all duration-300 h-full flex flex-col
                    ${step.color === 'blue' ? 'hover:border-blue-300' :
                      step.color === 'indigo' ? 'hover:border-indigo-300' :
                      step.color === 'purple' ? 'hover:border-purple-300' :
                      step.color === 'pink' ? 'hover:border-pink-300' :
                      step.color === 'orange' ? 'hover:border-orange-300' :
                      'hover:border-green-300'}
                  `}>
                    {/* Step Number & Icon */}
                    <div className="flex items-start justify-between mb-3">
                      <div className={`
                        inline-flex items-center justify-center
                        w-10 h-10 rounded-full 
                        bg-gradient-to-br ${
                          step.color === 'blue' ? 'from-blue-500 to-blue-600' :
                          step.color === 'indigo' ? 'from-indigo-500 to-indigo-600' :
                          step.color === 'purple' ? 'from-purple-500 to-purple-600' :
                          step.color === 'pink' ? 'from-pink-500 to-pink-600' :
                          step.color === 'orange' ? 'from-orange-500 to-orange-600' :
                          'from-green-500 to-green-600'
                        }
                        text-white font-bold text-sm shadow-lg
                      `}>
                        {step.id}
                      </div>

                      {/* Icon */}
                      <div className={`
                        inline-flex items-center justify-center
                        w-10 h-10 rounded-lg
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
                        <Icon className="w-5 h-5" />
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="text-lg font-bold text-gray-900 mb-2">
                      {step.title}
                    </h3>

                    {/* Description */}
                    <p className="text-sm text-gray-600 mb-4 leading-relaxed flex-grow line-clamp-3">
                      {step.description}
                    </p>

                    {/* Duration */}
                    <div className={`
                      inline-flex items-center gap-2
                      px-3 py-1.5 rounded-lg text-xs font-semibold
                      ${
                        step.color === 'blue' ? 'bg-blue-50 text-blue-700' :
                        step.color === 'indigo' ? 'bg-indigo-50 text-indigo-700' :
                        step.color === 'purple' ? 'bg-purple-50 text-purple-700' :
                        step.color === 'pink' ? 'bg-pink-50 text-pink-700' :
                        step.color === 'orange' ? 'bg-orange-50 text-orange-700' :
                        'bg-green-50 text-green-700'
                      }
                    `}>
                      <Clock className="w-3 h-3" />
                      {step.duration}
                    </div>
                  </div>
                )}
              </motion.div>
            )
          })}
        </div>

        {/* Final CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Link href="/contact">
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl shadow-lg p-4 md:p-5 hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer">
              <Plane className="w-6 h-6" />
              <div className="text-left">
                <h3 className="font-bold text-base">Ready to Start Your Application?</h3>
                <p className="text-sm text-blue-100">Book your free consultation today and take the first step towards your UK visa.</p>
              </div>
            </div>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

