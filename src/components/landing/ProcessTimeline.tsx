'use client'

import React from 'react'
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
}

const processSteps: ProcessStep[] = [
  {
    id: 1,
    title: 'Free Consultation',
    description: 'Speak with our immigration experts about your goals, circumstances, and visa options. We\'ll assess your eligibility and recommend the best path forward.',
    icon: MessageSquare,
    duration: '30 minutes',
  },
  {
    id: 2,
    title: 'Eligibility Assessment',
    description: 'Take our free online eligibility test in just minutes. Our comprehensive assessment analyzes your qualifications, circumstances, and visa options to determine your best pathway to the UK.',
    icon: FileSearch,
    duration: '5-10 minutes',
  },
  {
    id: 3,
    title: 'Document Preparation',
    description: 'Our team will guide you through gathering all necessary documents. We\'ll help organize, translate, and certify everything you need for your application.',
    icon: FileCheck,
    duration: '1-2 weeks',
  },
  {
    id: 4,
    title: 'Application Submission',
    description: 'We\'ll complete and submit your visa application with precision and attention to detail. All forms are double-checked to avoid delays or rejections.',
    icon: Send,
    duration: 'Same day',
  },
  {
    id: 5,
    title: 'Processing & Updates',
    description: 'We monitor your application status closely and keep you informed at every stage. Our team responds promptly to any requests from UKVI.',
    icon: Clock,
    duration: 'Varies by visa',
  },
  {
    id: 6,
    title: 'Visa Approval',
    description: 'Congratulations! Once approved, we\'ll help you understand your visa conditions, rights, and next steps for entering or remaining in the UK.',
    icon: CheckCircle2,
    duration: 'Celebrate!',
  }
]

export const ProcessTimeline: React.FC = () => {
  return (
    <section className="py-16 md:py-24 bg-white relative overflow-hidden">
       <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-20"></div>
        <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-indigo-100 rounded-full blur-3xl opacity-20"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
         <div className="text-center mb-12">
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
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-12">
          {processSteps.map((step, index) => {
            const Icon = step.icon
            
            return (
              <div
                key={step.id}
                className="group"
              >
                {step.id === 2 ? (
                  <Link href="/eligibility-check">
                    <div className={`
                      from-blue-500 to-indigo-50 rounded-xl shadow-md hover:shadow-xl border-2 border-gray-100 
                      p-5 transition-all duration-300 h-full flex flex-col cursor-pointer
                    `}>
                      <div className="flex items-start justify-between mb-3">
                        <div className={`
                          inline-flex items-center justify-center
                          w-10 h-10 rounded-full 
                          from-blue-500 to-indigo-50
                          bg-blue-800 text-white font-bold text-sm shadow-lg
                        `}>
                          {step.id}
                        </div>

                        {/* Icon */}
                        <div className={`
                          inline-flex items-center justify-center
                          w-10 h-10 rounded-lg
                          from-blue-100 to-indigo-100
                          text-blue-600
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
                        bg-blue-50 text-blue-700
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
                  `}>
                    {/* Step Number & Icon */}
                    <div className="flex items-start justify-between mb-3">
                      <div className={`
                        inline-flex items-center justify-center
                        w-10 h-10 rounded-full 
                        from-blue-500 to-indigo-50
                        bg-blue-800 text-white font-bold text-sm shadow-lg
                      `}>
                        {step.id}
                      </div>

                      {/* Icon */}
                      <div className={`
                        inline-flex items-center justify-center
                        w-10 h-10 rounded-lg
                        from-blue-100 to-indigo-100
                        text-blue-600
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

                    <div className={`
                      inline-flex items-center gap-2
                      px-3 py-1.5 rounded-lg text-xs font-semibold
                      bg-blue-50 text-blue-700
                    `}>
                      <Clock className="w-3 h-3" />
                      {step.duration}
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
        <div className="text-center">
          <Link href="/contact">
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl shadow-lg p-4 md:p-5 hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer">
              <Plane className="w-6 h-6" />
              <div className="text-left">
                <h3 className="font-bold text-base">Ready to Start Your Application?</h3>
                <p className="text-sm text-blue-100">Book your free consultation today and take the first step towards your UK visa.</p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </section>
  )
}

