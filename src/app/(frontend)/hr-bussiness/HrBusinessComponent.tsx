'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import {
  Shield,
  ShieldCheck,
  Users,
  FileCheck,
  CheckCircle2,
  Sparkles,
  TrendingDown,
  Scale,
  Phone,
  Mail,
  ArrowRight,
  MessageCircle,
  Building2,
  BadgeCheck,
  ClipboardCheck,
  UserCheck,
  Briefcase,
  RefreshCw,
  Headset,
  Target,
  Star,
} from 'lucide-react'
import { motion } from 'motion/react'

interface Pillar {
  icon: typeof Shield
  title: string
  description: string
  gradient: string
}

const pillars: Pillar[] = [
  {
    icon: ShieldCheck,
    title: 'HR Immigration Compliance',
    description:
      'Ensuring full compliance with UK immigration laws and Home Office requirements, so your business is always audit-ready.',
    gradient: 'from-blue-600 to-indigo-600',
  },
  {
    icon: TrendingDown,
    title: 'Reduce Risk & Penalties',
    description:
      'Minimise the risk of sponsor licence issues, civil penalties, and reputational damage with proactive compliance management.',
    gradient: 'from-cyan-500 to-blue-600',
  },
  {
    icon: FileCheck,
    title: 'Sponsor Licence Management',
    description:
      'End-to-end management of your sponsor licence and ongoing obligations, from application through to renewal.',
    gradient: 'from-indigo-500 to-purple-600',
  },
  {
    icon: Users,
    title: 'Expert Support',
    description:
      'Dedicated immigration specialists working alongside your HR team, every step of the way.',
    gradient: 'from-blue-500 to-cyan-500',
  },
]

interface Service {
  icon: typeof Shield
  title: string
  description: string
}

const services: Service[] = [
  {
    icon: ShieldCheck,
    title: 'HR Immigration Compliance',
    description:
      'Comprehensive compliance frameworks aligned with UK immigration law and Home Office guidance.',
  },
  {
    icon: ClipboardCheck,
    title: 'UKVI Compliance Audits',
    description:
      'Mock audits and health checks that identify gaps before UKVI does, keeping you inspection-ready.',
  },
  {
    icon: FileCheck,
    title: 'Sponsor Licence Management',
    description:
      'Day-to-day management of your SMS, reporting duties and record-keeping obligations.',
  },
  {
    icon: UserCheck,
    title: 'Right to Work Checks',
    description:
      'Compliant right to work processes and training that protect you from civil penalties.',
  },
  {
    icon: BadgeCheck,
    title: 'Sponsor Licence Applications',
    description:
      'Expertly prepared applications that give your business the best chance of first-time approval.',
  },
  {
    icon: Briefcase,
    title: 'Skilled Worker Sponsorship',
    description:
      'Support with Certificates of Sponsorship and sponsoring skilled workers from the UK and overseas.',
  },
  {
    icon: RefreshCw,
    title: 'Employee Visa Renewals',
    description:
      'Timely visa extensions and renewals for your sponsored workforce, with no last-minute surprises.',
  },
  {
    icon: Headset,
    title: 'Ongoing Employer Support',
    description:
      'A dedicated point of contact for your HR team whenever immigration questions arise.',
  },
]

const processSteps = [
  {
    step: '01',
    title: 'Free Initial Consultation',
    description:
      'We listen to your business needs, review your current position and identify immediate risks.',
  },
  {
    step: '02',
    title: 'Compliance Review',
    description:
      'A thorough audit of your HR systems, right to work processes and sponsor licence obligations.',
  },
  {
    step: '03',
    title: 'Tailored Action Plan',
    description:
      'A clear, prioritised roadmap to full compliance, tailored to the size and sector of your business.',
  },
  {
    step: '04',
    title: 'Ongoing Partnership',
    description:
      'Continuous monitoring, updates on rule changes, and hands-on support as your workforce grows.',
  },
]

export const HrBusinessComponent = () => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-950 via-blue-900 to-indigo-950 py-20 md:py-28 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-5 py-2 mb-8">
                <Scale className="w-4 h-4 text-cyan-300" />
                <span className="text-blue-100 text-sm font-semibold">
                  Regulated by the Immigration Advice Authority (IAA)
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight">
                HR Immigration
                <span className="block bg-gradient-to-r from-cyan-300 via-blue-300 to-cyan-200 bg-clip-text text-transparent mt-2">
                  Compliance
                </span>
              </h1>

              <p className="text-xl sm:text-2xl text-blue-100 mb-4 max-w-3xl mx-auto leading-relaxed">
                Our priority is keeping your business compliant. Protecting your people.
                Safeguarding your future.
              </p>

              <p className="text-base sm:text-lg text-blue-200/80 mb-10 max-w-2xl mx-auto">
                Expert HR & Immigration solutions for{' '}
                <span className="font-semibold text-white">Small, Medium & Large Businesses</span>{' '}
                across the UK
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center px-8 py-4 bg-white text-blue-900 font-semibold rounded-xl hover:bg-blue-50 transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-1"
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Book a Free Consultation
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
                <a
                  href="tel:01143214047"
                  className="inline-flex items-center justify-center px-8 py-4 bg-blue-600/20 backdrop-blur-sm border-2 border-white/30 text-white font-semibold rounded-xl hover:bg-blue-600/30 transition-all duration-300"
                >
                  <Phone className="w-5 h-5 mr-2" />
                  Call 0114 321 4047
                </a>
              </div>

              <div className="mt-12 inline-flex items-center gap-3 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 backdrop-blur-sm border border-cyan-400/30 rounded-2xl px-6 py-4">
                <Shield className="w-6 h-6 text-cyan-300 flex-shrink-0" />
                <span className="text-white font-bold text-sm sm:text-base tracking-wide">
                  STRONG COMPLIANCE. STRONGER BUSINESS.
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Four Pillars Section */}
      <section className="py-20 md:py-28 bg-gradient-to-b from-white via-gray-50 to-white">
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
                <span className="text-blue-900 text-sm font-semibold">What We Deliver</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                Compliance Without Compromise
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Four pillars of protection for your business, your people and your reputation
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {pillars.map((pillar, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="group text-center p-8 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-blue-200"
                >
                  <div
                    className={`w-16 h-16 bg-gradient-to-br ${pillar.gradient} rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}
                  >
                    <pillar.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{pillar.title}</h3>
                  <p className="text-gray-600 leading-relaxed text-sm">{pillar.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Our Services Section */}
      <section className="py-20 md:py-28 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : -30 }}
                transition={{ duration: 0.8 }}
                className="lg:col-span-1"
              >
                <div className="lg:sticky lg:top-28">
                  <div className="inline-flex items-center gap-2 bg-blue-100 rounded-full px-4 py-2 mb-6">
                    <Sparkles className="w-4 h-4 text-blue-600" />
                    <span className="text-blue-900 text-sm font-semibold">Our Services</span>
                  </div>

                  <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6 leading-tight">
                    Everything Your HR Team Needs, In One Place
                  </h2>

                  <p className="text-lg text-gray-600 leading-relaxed mb-8">
                    From your first sponsor licence application to the day-to-day management of a
                    sponsored workforce, our specialists handle the complexity so you can focus on
                    your business.
                  </p>

                  <div className="relative bg-gradient-to-br from-blue-600 via-indigo-600 to-blue-700 rounded-3xl p-8 text-white shadow-2xl">
                    <div className="flex gap-1 mb-4">
                      <Star className="w-5 h-5 text-yellow-300 fill-yellow-300" />
                      <Star className="w-5 h-5 text-yellow-300 fill-yellow-300" />
                      <Star className="w-5 h-5 text-yellow-300 fill-yellow-300" />
                    </div>
                    <p className="text-blue-50 text-lg font-medium leading-relaxed">
                      Helping businesses remain compliant while recruiting and retaining the talent
                      they need.
                    </p>
                  </div>
                </div>
              </motion.div>

              <div className="lg:col-span-2">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {services.map((service, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
                      transition={{ duration: 0.6, delay: index * 0.08 }}
                      className="group p-6 rounded-2xl border-2 border-gray-200 bg-white hover:border-blue-400 hover:shadow-xl transition-all duration-300"
                    >
                      <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center mb-4 group-hover:bg-gradient-to-br group-hover:from-blue-600 group-hover:to-indigo-600 group-hover:text-white transition-all duration-300">
                        <service.icon className="w-6 h-6" />
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 mb-2">{service.title}</h3>
                      <p className="text-gray-600 text-sm leading-relaxed">{service.description}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How We Work Section */}
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
                <Building2 className="w-4 h-4 text-blue-600" />
                <span className="text-blue-900 text-sm font-semibold">How We Work</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                A Clear Path to Full Compliance
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                A structured, proven process that takes your business from uncertainty to
                audit-ready confidence
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {processSteps.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: isVisible ? 1 : 0, scale: isVisible ? 1 : 0.9 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="relative p-8 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100"
                >
                  <div className="text-5xl font-bold bg-gradient-to-br from-blue-200 to-indigo-200 bg-clip-text text-transparent mb-4">
                    {item.step}
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">{item.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>
                  {index < processSteps.length - 1 && (
                    <div className="hidden lg:flex absolute top-1/2 -right-6 -translate-y-1/2 w-6 items-center justify-center z-10">
                      <ArrowRight className="w-5 h-5 text-blue-300" />
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why It Matters Section */}
      <section className="py-20 md:py-28 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : -30 }}
                transition={{ duration: 0.8 }}
              >
                <div className="inline-flex items-center gap-2 bg-blue-100 rounded-full px-4 py-2 mb-6">
                  <Shield className="w-4 h-4 text-blue-600" />
                  <span className="text-blue-900 text-sm font-semibold">Why It Matters</span>
                </div>

                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-8 leading-tight">
                  Non-Compliance Is a Risk Your Business Cannot Afford
                </h2>

                <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
                  <p>
                    The Home Office continues to increase scrutiny of sponsor licence holders.
                    Civil penalties for illegal working can reach{' '}
                    <span className="font-semibold text-gray-900">£60,000 per worker</span>, and a
                    revoked sponsor licence can mean losing your sponsored workforce overnight.
                  </p>
                  <p>
                    Our specialists keep your HR systems, right to work processes and sponsor
                    duties fully aligned with the latest UKVI requirements — so an unannounced
                    compliance visit is never a cause for concern.
                  </p>
                </div>

                <div className="mt-8 space-y-4">
                  {[
                    'Peace of mind knowing you are meeting your legal responsibilities',
                    'Confidence to focus on growing your business',
                    'Protection for your people, your reputation and your future',
                  ].map((benefit, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle2 className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700 font-medium">{benefit}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : 30 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative"
              >
                <div className="relative bg-gradient-to-br from-blue-950 via-blue-900 to-indigo-950 rounded-3xl p-8 md:p-12 text-white shadow-2xl overflow-hidden">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl"></div>
                  <div className="relative z-10">
                    <div className="w-16 h-16 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-2xl flex items-center justify-center mb-8 shadow-xl">
                      <ShieldCheck className="w-9 h-9 text-white" />
                    </div>

                    <h3 className="text-2xl md:text-3xl font-bold mb-6">
                      Stay Compliant. Protect Your Business. Support Your Workforce.
                    </h3>
                    <p className="text-blue-100 text-lg leading-relaxed mb-8">
                      Let us help you build a compliant, confident and future-ready business.
                    </p>

                    <div className="space-y-5">
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center flex-shrink-0">
                          <BadgeCheck className="w-5 h-5 text-cyan-300" />
                        </div>
                        <div>
                          <div className="font-semibold mb-1">IAA Regulated</div>
                          <div className="text-blue-200 text-sm">
                            Advice you can trust, from regulated immigration professionals
                          </div>
                        </div>
                      </div>
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center flex-shrink-0">
                          <Building2 className="w-5 h-5 text-cyan-300" />
                        </div>
                        <div>
                          <div className="font-semibold mb-1">All Business Sizes</div>
                          <div className="text-blue-200 text-sm">
                            Tailored support for small, medium and large employers across the UK
                          </div>
                        </div>
                      </div>
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center flex-shrink-0">
                          <Headset className="w-5 h-5 text-cyan-300" />
                        </div>
                        <div>
                          <div className="font-semibold mb-1">Always Available</div>
                          <div className="text-blue-200 text-sm">
                            A dedicated specialist alongside your HR team, every step of the way
                          </div>
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
                Ready to Protect Your Business?
              </h2>
              <p className="text-xl text-blue-100 mb-10 leading-relaxed max-w-2xl mx-auto">
                Speak to our HR immigration compliance specialists today and find out exactly where
                your business stands.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center px-8 py-4 bg-white text-blue-600 font-semibold rounded-xl hover:bg-blue-50 transition-all duration-300 shadow-2xl hover:-translate-y-1"
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Book a Free Consultation
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
                <a
                  href="https://wa.me/447858780841"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-8 py-4 bg-green-600 text-white font-semibold rounded-xl hover:bg-green-700 transition-all duration-300 shadow-2xl hover:-translate-y-1"
                >
                  <Phone className="w-5 h-5 mr-2" />
                  WhatsApp Us
                </a>
              </div>

              <div className="mt-12 pt-8 border-t border-white/20">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
                  <div>
                    <Phone className="w-6 h-6 text-blue-200 mx-auto mb-2" />
                    <div className="text-white font-semibold mb-1">Call Us</div>
                    <a
                      href="tel:01143214047"
                      className="text-blue-100 hover:text-white transition-colors text-sm"
                    >
                      0114 321 4047
                    </a>
                  </div>
                  <div>
                    <MessageCircle className="w-6 h-6 text-blue-200 mx-auto mb-2" />
                    <div className="text-white font-semibold mb-1">WhatsApp</div>
                    <a
                      href="https://wa.me/447858780841"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-100 hover:text-white transition-colors text-sm"
                    >
                      +44 7858 780841
                    </a>
                  </div>
                  <div>
                    <Mail className="w-6 h-6 text-blue-200 mx-auto mb-2" />
                    <div className="text-white font-semibold mb-1">Email Us</div>
                    <a
                      href="mailto:info@ukimmigrationhelpline.com"
                      className="text-blue-100 hover:text-white transition-colors text-sm"
                    >
                      info@ukimmigrationhelpline.com
                    </a>
                  </div>
                </div>
              </div>

              <div className="mt-10 inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-5 py-2">
                <Scale className="w-4 h-4 text-blue-200" />
                <span className="text-blue-100 text-xs sm:text-sm">
                  UK Immigration Helpline is a trading name of UK Legal Solutions — Regulated by
                  the Immigration Advice Authority (IAA)
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}
