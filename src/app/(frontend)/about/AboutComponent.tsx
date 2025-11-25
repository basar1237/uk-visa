'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { 
  Shield, 
  Award, 
  Users, 
  FileCheck,
  Globe,
  Clock,
  CheckCircle2,
  Sparkles,
  TrendingUp,
  HeartHandshake,
  Scale,
  BookOpen,
  Phone,
  Mail,
  MapPin,
  ArrowRight,
  UserCheck,
  MessageCircle,
  BadgeCheck,
  Zap,
  Target
} from 'lucide-react'
import { Breadcrumb } from '@/components/Breadcrumb'
import { motion } from 'motion/react'

interface Statistic {
  icon: typeof Award
  number: string
  label: string
  description: string
}

interface Feature {
  icon: typeof Shield
  title: string
  description: string
  highlight?: boolean
}

interface Certification {
  icon: typeof BadgeCheck
  title: string
  description: string
}

const statistics: Statistic[] = [
  {
    icon: Users,
    number: '15,000+',
    label: 'Successful Applications',
    description: 'Visa applications approved with our expert guidance'
  },
  {
    icon: Award,
    number: '98.5%',
    label: 'Success Rate',
    description: 'One of the highest approval rates in the industry'
  },
  {
    icon: Globe,
    number: '80+',
    label: 'Countries Served',
    description: 'Clients from around the world trust our expertise'
  },
  {
    icon: Clock,
    number: '18+',
    label: 'Years Experience',
    description: 'Combined decades of immigration law expertise'
  }
]

const features: Feature[] = [
  {
    icon: Scale,
    title: 'Licensed Immigration Lawyers',
    description: 'At UK Legal Solutions, we only work with fully licensed and regulated UK immigration professionals. This includes OISC-regulated advisers, qualified solicitors and specialist barristers. Our network ensures you are always connected with genuine, experienced immigration lawyers who can handle your case with confidence and professionalism.',
    highlight: true
  },
  {
    icon: FileCheck,
    title: 'Expert Document Preparation',
    description: 'We meticulously prepare and review all required documentation to ensure your application is submission-ready and error-free.',
    highlight: true
  },
  {
    icon: Target,
    title: 'Personalized Consultation',
    description: 'Every case is unique. We provide tailored advice based on your specific circumstances and immigration goals.',
  },
  {
    icon: Zap,
    title: 'Fast Track Services',
    description: 'Need your visa urgently? We offer priority processing services to expedite your application timeline.',
  },
  {
    icon: HeartHandshake,
    title: 'Dedicated Case Manager',
    description: 'You\'ll have a dedicated immigration expert assigned to your case, ensuring consistent communication and support throughout the process.',
  },
  {
    icon: Sparkles,
    title: 'Transparent Pricing',
    description: 'No hidden fees or surprises. We provide clear, upfront pricing for all our services with complete transparency.',
  }
]

export const AboutComponent = () => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-950 via-blue-900 to-indigo-950 py-20 md:py-32 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              
              <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight">
                Your Trusted Partner for
                <span className="block bg-gradient-to-r from-blue-300 via-cyan-300 to-blue-200 bg-clip-text text-transparent mt-2">
                UK Immigration Services                </span>
              </h1>
              
              <p className="text-xl sm:text-2xl text-blue-100 mb-10 max-w-3xl mx-auto leading-relaxed">
              Our team is here to guide you through every step of your UK visa and immigration process, making it as smooth, successful and stress-free as possible
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/eligibility-check"
                  className="inline-flex items-center justify-center px-8 py-4 bg-white text-blue-900 font-semibold rounded-xl hover:bg-blue-50 transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-1"
                >
                  <UserCheck className="w-5 h-5 mr-2" />
                  Check Your Eligibility
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center px-8 py-4 bg-blue-600/20 backdrop-blur-sm border-2 border-white/30 text-white font-semibold rounded-xl hover:bg-blue-600/30 transition-all duration-300"
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Book Consultation
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Breadcrumb */}
      <Breadcrumb items={[{ label: 'About Us' }]} />

      {/* Statistics Section */}
      <section className="py-16 md:py-24 bg-white border-b border-gray-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {statistics.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center p-6 md:p-8 rounded-2xl bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 hover:shadow-xl transition-all duration-300 border border-blue-100/50 hover:border-blue-200"
              >
                <div className="w-14 h-14 md:w-16 md:h-16 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <stat.icon className="w-7 h-7 md:w-8 md:h-8 text-white" />
                </div>
                <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">{stat.number}</div>
                <div className="text-sm md:text-base font-semibold text-gray-800 mb-2">{stat.label}</div>
                <div className="text-xs md:text-sm text-gray-600">{stat.description}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20 md:py-28 bg-gradient-to-b from-white via-gray-50 to-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : -30 }}
                transition={{ duration: 0.8 }}
              >
                <div className="inline-flex items-center gap-2 bg-blue-100 rounded-full px-4 py-2 mb-6">
                  <Sparkles className="w-4 h-4 text-blue-600" />
                  <span className="text-blue-900 text-base font-semibold">Our Journey</span>
                </div>
                
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-8 leading-tight">
                  UK Immigration Specialists
                </h2>
                
                <div className="space-y-8 text-lg text-gray-600 leading-relaxed">
                  <p className="text-md text-gray-700 font-medium">
                    UK Legal Solutions is a trusted online platform dedicated to connecting individuals, families and businesses with leading UK immigration lawyers. We understand that navigating the UK immigration system can be overwhelming, time-consuming and emotionally demanding. Our mission is to make the process clearer, faster and more accessible by linking you with qualified, experienced and regulated immigration professionals who can provide tailored advice and effective representation.
                  </p>

                  <div className="space-y-2 pt-1 border-t border-gray-200">
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">Who We Are</h3>
                    <p className="mb-4 text-md text-gray-700 font-medium">
                      UK Legal Solutions was established to bridge the gap between people seeking reliable immigration support and the legal experts best equipped to help. We work exclusively with reputable OISC-regulated advisers, solicitors and barristers with proven expertise across all areas of UK immigration law.
                    </p>
                    <p className="text-md text-gray-700 font-medium">
                      We are proudly based at the Firvale Community Hub in Sheffield, serving clients across the UK and worldwide through our digital platform. If you wish to meet us in person, we can arrange an appointment at the centre or with the law firm that will handle your case. Alternatively, all work can be undertaken remotely, allowing you to receive expert immigration support from the comfort of your own home or office.
                    </p>
                  </div>

                  <div className="space-y-2 pt-1 border-t border-gray-200">
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">What We Do</h3>
                    <p className="mb-4 text-md text-gray-700 font-medium">
                      We offer a simple, user-friendly way for clients to access the right help from the right lawyer. Our platform:
                    </p>
                    <ul className="space-y-3 ml-6 list-none">
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" />
                        <span>Assesses your needs through smart eligibility tools and tailored enquiry forms</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" />
                        <span>Matches you with specialists experienced in your specific immigration category</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" />
                        <span>Connects you instantly with trusted legal professionals for consultations, case preparation or ongoing support</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" />
                        <span>Ensures transparency with clear information, straightforward pricing and reliable partners</span>
                      </li>
                    </ul>
                  </div>

                  <div className="space-y-2 pt-1 border-t border-gray-200">
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">Our Commitment</h3>
                    <p className="mb-4">
                      We are dedicated to providing:
                    </p>
                    <ul className="space-y-3 ml-6 list-none text-md text-gray-700 font-medium mb-4">
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" />
                        <span>Accurate and reliable immigration service</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" />
                        <span>High-quality, ethical and client-focused support</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" />
                        <span>A seamless digital experience for fast and stress-free access to expert help</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" />
                        <span>Confidentiality and professionalism at all times</span>
                      </li>
                    </ul>
                    <p className="text-md text-gray-700 font-medium">
                      At UK Legal Solutions, we believe everyone deserves fair, accessible and expert advice—no matter how complex their case may be.
                    </p>
                  </div>

                  <div className="space-y-2 pt-1 border-t border-gray-200">
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">Why Choose Us?</h3>
                    <ul className="space-y-3 ml-6 list-none text-md text-gray-700 font-medium">
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" />
                        <span>Access to vetted immigration lawyers with proven expertise</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" />
                        <span>Fast, easy and secure matching based on your needs</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" />
                        <span>Comprehensive support for individuals, families and businesses</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" />
                        <span>Clear, honest and trustworthy information at every stage</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : 30 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative"
              >
                <div className="relative bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 rounded-3xl p-8 md:p-12 text-white shadow-2xl">
                  <div className="absolute -top-4 -right-4 w-24 h-24 bg-yellow-400 rounded-2xl flex items-center justify-center shadow-xl">
                    <Award className="w-12 h-12 text-yellow-900" />
                  </div>
                  
                  <div className="relative z-10">
                    <h3 className="text-2xl md:text-3xl font-bold mb-6">Our Mission</h3>
                    <p className="text-blue-100 text-lg leading-relaxed mb-8">
                      To provide exceptional, transparent, and accessible immigration services that empower individuals and families to achieve their dreams of living, working, or studying in the UK.
                    </p>
                    
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="w-6 h-6 text-blue-200 flex-shrink-0 mt-0.5" />
                        <div>
                          <div className="font-semibold mb-1">Transparency First</div>
                          <div className=" text-md text-gray-700 font-medium">No hidden fees, clear communication at every step</div>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="w-6 h-6 text-blue-200 flex-shrink-0 mt-0.5" />
                        <div>
                          <div className="font-semibold mb-1">Client-Centered Approach</div>
                          <div className="text-blue-100 text-sm">Your success is our success - we&apos;re with you every step</div>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="w-6 h-6 text-blue-200 flex-shrink-0 mt-0.5" />
                        <div>
                          <div className="font-semibold mb-1">Continuous Excellence</div>
                          <div className="text-blue-100 text-sm">We stay ahead of changing immigration policies</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 md:py-28 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <div className="inline-flex items-center gap-2 bg-blue-100 rounded-full px-4 py-2 mb-6">
                <Target className="w-4 h-4 text-blue-600" />
                <span className="text-blue-900 text-sm font-semibold">Why Choose Us</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                What Makes Us Different
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                We combine legal expertise with personal care to deliver results that matter
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className={`group relative p-8 text-sm rounded-2xl border-2 transition-all duration-300 hover:shadow-2xl ${
                    feature.highlight
                      ? 'bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200 hover:border-blue-400'
                      : 'bg-white border-gray-200 hover:border-gray-300'
                  }`}
                >
                  {feature.highlight && (
                    <div className="absolute -top-3 -right-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                      Premium
                    </div>
                  )}
                  
                  <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110 ${
                    feature.highlight
                      ? 'bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-lg'
                      : 'bg-blue-100 text-blue-600'
                  }`}>
                    <feature.icon className="w-7 h-7" />
                  </div>
                  
                  <h3 className={`text-xl font-bold mb-3 ${
                    feature.highlight ? 'text-gray-900' : 'text-gray-800'
                  }`}>
                    {feature.title}
                  </h3>
                  
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="py-20 md:py-28 bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 mb-6 border border-blue-200">
                <HeartHandshake className="w-4 h-4 text-blue-600" />
                <span className="text-blue-900 text-sm font-semibold">Our Values</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                The Principles That Guide Us
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Every decision we make and every action we take is driven by these core values
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  icon: HeartHandshake,
                  title: 'Empathy & Care',
                  description: 'We understand that immigration is deeply personal. Every client receives compassionate, individualized attention.',
                  gradient: 'from-pink-500 to-rose-500'
                },
                {
                  icon: Shield,
                  title: 'Integrity & Trust',
                  description: 'We maintain the highest ethical standards. Honest advice, transparent processes, and reliable results.',
                  gradient: 'from-blue-500 to-cyan-500'
                },
                {
                  icon: Target,
                  title: 'Excellence',
                  description: 'We don\'t settle for good enough. Every application is meticulously prepared to maximize your chances of success.',
                  gradient: 'from-purple-500 to-indigo-500'
                },
                {
                  icon: BookOpen,
                  title: 'Expert Knowledge',
                  description: 'Our team continuously updates their expertise to stay ahead of the ever-changing UK immigration landscape.',
                  gradient: 'from-green-500 to-emerald-500'
                }
              ].map((value, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: isVisible ? 1 : 0, scale: isVisible ? 1 : 0.9 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="group text-center p-8 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-gray-200"
                >
                  <div className={`w-16 h-16 bg-gradient-to-br ${value.gradient} rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <value.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{value.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-28 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjYwIiBoZWlnaHQ9IjYwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDEwIDAgTCAwIDAgMCAxMCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLXdpZHRoPSIwLjUiIG9wYWNpdHk9IjAuMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-20"></div>
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
                Ready to Start Your UK Visa Journey?
              </h2>
              <p className="text-xl text-blue-100 mb-10 leading-relaxed max-w-2xl mx-auto">
                Join thousands of successful applicants who trusted us with their UK immigration journey. Let our expert team guide you to success.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/eligibility-check"
                  className="inline-flex items-center justify-center px-8 py-4 bg-white text-blue-600 font-semibold rounded-xl hover:bg-blue-50 transition-all duration-300 shadow-2xl hover:shadow-3xl hover:-translate-y-1"
                >
                  <UserCheck className="w-5 h-5 mr-2" />
                  Free Eligibility Check
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center px-8 py-4 bg-blue-700/30 backdrop-blur-sm border-2 border-white/30 text-white font-semibold rounded-xl hover:bg-blue-700/40 transition-all duration-300"
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Book Free Consultation
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </div>

              <div className="mt-12 pt-8 border-t border-white/20">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
                  <div>
                    <Phone className="w-6 h-6 text-blue-200 mx-auto mb-2" />
                    <div className="text-white font-semibold mb-1">Call Us</div>
                    <a href="tel:01143214047" className="text-blue-100 hover:text-white transition-colors text-sm">
                      01143214047
                    </a>
                  </div>
                  <div>
                    <Mail className="w-6 h-6 text-blue-200 mx-auto mb-2" />
                    <div className="text-white font-semibold mb-1">Email Us</div>
                    <a href="mailto:info@uklegalsolutions.com" className="text-blue-100 hover:text-white transition-colors text-sm">
                      info@uklegalsolutions.com
                    </a>
                  </div>
                  <div>
                    <MapPin className="w-6 h-6 text-blue-200 mx-auto mb-2" />
                    <div className="text-white font-semibold mb-1">Visit Us</div>
                    <div className="text-blue-100 text-sm">Sheffield, United Kingdom</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}
