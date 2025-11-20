'use client'

import React from 'react'
import { motion } from 'motion/react'
import Link from 'next/link'
import { 
  GraduationCap, 
  Briefcase, 
  Heart, 
  Users, 
  Plane, 
  ArrowRight,
  CheckCircle,
  Clock,
  Building2,
  Route,
  Shield
} from 'lucide-react'

interface VisaType {
  id: string
  name: string
  description: string
  icon: React.ComponentType<{ className?: string }>
  features: string[]
  processingTime: string
  popularity: string
  color: string
  gradient: string
}

const visaTypes: VisaType[] = [
  {
    id: 'student-visa',
    name: 'Student Visa',
    description: 'Study at UK universities, colleges, and educational institutions. Perfect for international students seeking quality education.',
    icon: GraduationCap,
    features: ['Tier 4 General Student Visa', 'Child Student Visa', 'Short-term Study Visa', 'Pathway to Graduate Route'],
    processingTime: '3-8 weeks',
    popularity: 'Most Popular',
    color: 'blue',
    gradient: 'from-blue-500 to-indigo-600'
  },
  {
    id: 'skilled-worker-visa',
    name: 'Skilled Worker Visa',
    description: 'Work in the UK with a job offer from a licensed sponsor. Build your career in one of the world\'s leading economies.',
    icon: Briefcase,
    features: ['Skilled Worker Visa', 'Health & Care Worker', 'Global Talent Visa', 'Innovator Founder Visa'],
    processingTime: '3-6 weeks',
    popularity: 'Highly Sought',
    color: 'green',
    gradient: 'from-green-500 to-emerald-600'
  },
  {
    id: 'family-private-visa',
    name: 'Family Visa',
    description: 'Join your loved ones in the UK. Spouse, partner, parent, and dependent child visa applications.',
    icon: Heart,
    features: ['Spouse/Partner Visa', 'Parent Visa', 'Child Visa', 'Dependent Relative'],
    processingTime: '2-6 months',
    popularity: 'Family Reunion',
    color: 'pink',
    gradient: 'from-pink-500 to-rose-600'
  },
  {
    id: 'visitors-visa',
    name: 'Visitors Visa',
    description: 'Visit the UK for tourism, business, or to see family and friends. Short-term stays up to 6 months.',
    icon: Plane,
    features: ['Standard Visitor Visa', 'Business Visitor', 'Family Visit', 'Tourist Visa'],
    processingTime: '2-3 weeks',
    popularity: 'Quick Process',
    color: 'purple',
    gradient: 'from-purple-500 to-violet-600'
  },
  {
    id: 'parent-route',
    name: 'Parent Route Visa',
    description: 'Join your children in the UK. Parent visa applications for parents and grandparents.',
    icon: Users,
    features: ['Parent Visa', 'Grandparent Visa', 'Child Visa'],
    processingTime: '2-6 months',
    popularity: 'Family Reunion',
    color: 'amber',
    gradient: 'from-amber-500 to-orange-600'
  },
  {
    id: 'fiance-visa',
    name: 'Fiance Visa',
    description: 'Marry a UK citizen or settle in the UK with your partner. Fiance visa applications for couples looking to marry and settle in the UK.',
    icon: Building2,
    features: ['Fiance Visa', 'Marriage Visa', 'Settlement Visa'],
    processingTime: '2-6 months',
    popularity: 'Love & Family',
    color: 'gray',
    gradient: 'from-gray-500 to-gray-600'
  },
  {
    id: 'uk-ancestor-visa',
    name: 'UK Ancestor Visa',
    description: 'Join your UK citizen ancestors in the UK. UK Ancestor visa applications for those who have UK citizen ancestors.',
    icon: Route,
    features: ['UK Ancestor Visa', 'UK Ancestor Visa', 'UK Ancestor Visa'],
    processingTime: '2-6 months',
    popularity: 'Family Reunion',
    color: 'navy',
    gradient: 'from-blue-900 to-indigo-900'
  },
  {
    id: 'spousa-visa',
    name: 'Spousa Visa',
    description: 'Join your spouse in the UK. Spousa visa applications for those who have a spouse in the UK.',
    icon: Shield,
    features: ['Spousa Visa', 'Spousa Visa', 'Spousa Visa'],
    processingTime: '2-6 months',
    popularity: 'Family Reunion',
    color: 'teal',
    gradient: 'from-teal-500 to-cyan-600'
  }
]

export const VisaTypesShowcase: React.FC = () => {
  return (
    <section className="py-20 md:py-28 bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 relative overflow-hidden">
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
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            Choose Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Visa Type</span>
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            We specialize in all types of UK visa applications. Select your visa category below to learn more about the process, requirements, and how we can help you succeed.
          </p>
        </motion.div>

        {/* Visa Type Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6 mb-12 auto-rows-fr">
          {visaTypes.map((visa, index) => {
            const Icon = visa.icon
            
            return (
              <motion.div
                key={visa.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group"
              >
                <Link href={`/${visa.id}`} className="block">
                  <div className="relative bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden border-2 border-gray-100 flex flex-col h-full hover:border-blue-300 cursor-pointer">
                    {/* Gradient overlay */}
                    <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${visa.gradient}`}></div>
                    
                    <div className="p-5 md:p-6 flex flex-col flex-grow">
                      {/* Icon and Badge */}
                      <div className="flex items-start justify-between mb-4">
                        <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${visa.gradient} flex items-center justify-center shadow-lg`}>
                          <Icon className="w-8 h-8 text-white" />
                        </div>
                        <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full">
                          {visa.popularity}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="text-xl font-bold text-gray-900 mb-3 h-[28px] line-clamp-2">
                        {visa.name}
                      </h3>

                      {/* Description */}
                      <p className="text-gray-600 mb-6 leading-relaxed text-sm flex-grow min-h-[60px] line-clamp-3">
                        {visa.description}
                      </p>

                      {/* Features */}
                      <div className="space-y-2 mb-6 min-h-[60px]">
                        {visa.features.slice(0, 2).map((feature, idx) => (
                          <div key={idx} className="flex items-center text-sm text-gray-700 line-clamp-1">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                            <span>{feature}</span>
                          </div>
                        ))}
                        {visa.features.length > 2 && (
                          <div className="text-sm text-blue-600 font-medium">
                            +{visa.features.length - 2} more options
                          </div>
                        )}
                      </div>

                      {/* Processing Time */}
                      <div className="flex items-center mb-6 pb-6 border-b border-gray-200">
                        <div className="flex items-center text-sm text-gray-600">
                          <Clock className="w-4 h-4 mr-2 text-blue-600" />
                          <span>Processing: <strong>{visa.processingTime}</strong></span>
                        </div>
                      </div>

                      {/* CTA Button */}
                      <div className={`flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-semibold text-sm bg-gradient-to-r ${visa.gradient} text-white hover:opacity-90 transition-opacity duration-200 group-hover:scale-105 h-[48px]`}>
                        Get Started
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </div>

        {/* Bottom CTA */}
        <div
          className="text-center"
        >
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
             <div className="text-left">
              <h3 className="font-bold text-gray-900 mb-1 justify-center flex">Not sure which visa is right for you?</h3>
              <p className="text-sm text-gray-600 mb-3">Our expert team can assess your eligibility and guide you to the best visa option.</p>
              <div className="flex items-center justify-center gap-3">
                <Link
                  href="/eligibility-check"
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold px-6 py-3 rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-200"
                >
                  Check Your Eligibility Free
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

