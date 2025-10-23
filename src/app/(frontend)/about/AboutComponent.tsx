'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { 
  Users, 
  Award, 
  Globe, 
  Clock, 
  CheckCircle, 
  Star, 
  Phone, 
  Mail, 
  MapPin,
  ArrowRight,
  Heart,
  Shield,
  Target,
  TrendingUp,
  BookOpen,
  MessageCircle,
  UserCheck
} from 'lucide-react'

interface TeamMember {
  id: number
  name: string
  position: string
  experience: string
  specializations: string[]
  image: string
  description: string
}

interface Statistic {
  icon: React.ComponentType<{ className?: string }>
  number: string
  label: string
  description: string
}

interface Value {
  icon: React.ComponentType<{ className?: string }>
  title: string
  description: string
}

const teamMembers: TeamMember[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    position: "Senior Immigration Solicitor",
    experience: "15+ years",
    specializations: ["Student Visas", "Work Visas", "Family Reunion"],
    image: "/api/placeholder/300/300",
    description: "Sarah specializes in complex immigration cases and has helped over 2,000 families reunite in the UK."
  },
  {
    id: 2,
    name: "Michael Chen",
    position: "Lead Visa Consultant",
    experience: "12+ years",
    specializations: ["Skilled Worker Visas", "Investor Visas", "Business Visas"],
    image: "/api/placeholder/300/300",
    description: "Michael is an expert in business immigration and has successfully processed over 1,500 work visa applications."
  },
  {
    id: 3,
    name: "Emma Williams",
    position: "Family Immigration Specialist",
    experience: "10+ years",
    specializations: ["Spouse Visas", "Parent Visas", "Child Visas"],
    image: "/api/placeholder/300/300",
    description: "Emma focuses on family reunification cases and has a 98% success rate in family visa applications."
  },
  {
    id: 4,
    name: "David Thompson",
    position: "Student Visa Expert",
    experience: "8+ years",
    specializations: ["Student Visas", "Graduate Route", "Tier 4 Applications"],
    image: "/api/placeholder/300/300",
    description: "David has helped over 3,000 students achieve their dreams of studying in the UK."
  }
]

const statistics: Statistic[] = [
  {
    icon: Users,
    number: "10,000+",
    label: "Successful Applications",
    description: "Visa applications processed successfully"
  },
  {
    icon: Award,
    number: "98%",
    label: "Success Rate",
    description: "High success rate across all visa types"
  },
  {
    icon: Globe,
    number: "50+",
    label: "Countries Served",
    description: "Clients from around the world"
  },
  {
    icon: Clock,
    number: "15+",
    label: "Years Experience",
    description: "Combined team experience"
  }
]

const values: Value[] = [
  {
    icon: Heart,
    title: "Compassionate Service",
    description: "We understand that immigration is a life-changing journey. We treat every client with empathy and care."
  },
  {
    icon: Shield,
    title: "Trust & Integrity",
    description: "We maintain the highest ethical standards and provide transparent, honest advice at every step."
  },
  {
    icon: Target,
    title: "Results-Driven",
    description: "Our focus is on achieving the best possible outcomes for our clients through meticulous preparation."
  },
  {
    icon: BookOpen,
    title: "Expert Knowledge",
    description: "Our team stays updated with the latest immigration laws and policies to provide accurate guidance."
  }
]

export const AboutComponent: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 py-32 overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-20 h-20 bg-blue-500/20 rounded-full animate-pulse"></div>
          <div className="absolute top-32 right-20 w-16 h-16 bg-indigo-500/20 rounded-full animate-pulse delay-1000"></div>
          <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-purple-500/20 rounded-full animate-pulse delay-2000"></div>
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className={`transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
                About Our
                <span className="block bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                  UK Visa Experts
                </span>
              </h1>
              <p className="text-xl text-blue-100 mb-8 leading-relaxed">
                We are a team of qualified immigration solicitors dedicated to helping you achieve your UK visa goals with confidence and success.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="px-8 py-4 bg-white text-blue-900 font-semibold rounded-lg hover:bg-blue-50 transition-colors duration-300 shadow-lg">
                  Meet Our Team
                </button>
                <button className="px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-blue-900 transition-colors duration-300">
                  Our Success Stories
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {statistics.map((stat, index) => (
              <div 
                key={index}
                className={`text-center p-6 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2 ${
                  isVisible ? 'animate-fade-in-up' : 'opacity-0'
                }`}
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-3xl font-bold text-blue-900 mb-2">{stat.number}</h3>
                <h4 className="text-lg font-semibold text-gray-800 mb-2">{stat.label}</h4>
                <p className="text-gray-600 text-sm">{stat.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className={`transform transition-all duration-1000 ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'}`}>
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
                  Our Story
                </h2>
                <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                  Founded in 2008, we started as a small team of passionate immigration professionals who believed that everyone deserves expert guidance on their journey to the UK.
                </p>
                <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                  Over the years, we&apos;ve grown into one of the most trusted immigration consultancies, helping thousands of individuals and families achieve their UK visa goals. Our success is built on a foundation of expertise, integrity, and genuine care for our clients.
                </p>
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center bg-white px-4 py-2 rounded-lg shadow-sm">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                    <span className="text-sm font-medium">Licensed Solicitors</span>
                  </div>
                  <div className="flex items-center bg-white px-4 py-2 rounded-lg shadow-sm">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                    <span className="text-sm font-medium">OISC Registered</span>
                  </div>
                  <div className="flex items-center bg-white px-4 py-2 rounded-lg shadow-sm">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                    <span className="text-sm font-medium">15+ Years Experience</span>
                  </div>
                </div>
              </div>
              <div className={`transform transition-all duration-1000 ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'}`}>
                <div className="relative">
                  <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-8 text-white">
                    <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
                    <p className="text-blue-100 mb-6">
                      To provide exceptional immigration services that make the UK visa process accessible, transparent, and successful for everyone.
                    </p>
                    <div className="flex items-center">
                      <TrendingUp className="w-6 h-6 mr-2" />
                      <span className="font-semibold">Growing Strong Since 2008</span>
                    </div>
                  </div>
                  <div className="absolute -top-4 -right-4 w-24 h-24 bg-yellow-400 rounded-full flex items-center justify-center">
                    <Star className="w-12 h-12 text-yellow-800" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Meet Our Expert Team
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our qualified immigration solicitors bring years of experience and a personal touch to every case.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div 
                key={member.id}
                className={`group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden ${
                  isVisible ? 'animate-fade-in-up' : 'opacity-0'
                }`}
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className="relative h-64 bg-gradient-to-br from-blue-500 to-indigo-600">
                  <div className="absolute inset-0 bg-black/20"></div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="bg-white/90 backdrop-blur-sm rounded-lg p-3">
                      <h3 className="font-bold text-gray-900">{member.name}</h3>
                      <p className="text-sm text-blue-600 font-medium">{member.position}</p>
                    </div>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center mb-3">
                    <Clock className="w-4 h-4 text-gray-500 mr-2" />
                    <span className="text-sm text-gray-600">{member.experience}</span>
                  </div>
                  
                  <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                    {member.description}
                  </p>
                  
                  <div className="space-y-2">
                    <h4 className="font-semibold text-gray-900 text-sm">Specializations:</h4>
                    <div className="flex flex-wrap gap-2">
                      {member.specializations.map((spec, idx) => (
                        <span 
                          key={idx}
                          className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                        >
                          {spec}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Our Core Values
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              The principles that guide everything we do and every client we serve.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div 
                key={index}
                className={`group text-center p-8 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 ${
                  isVisible ? 'animate-fade-in-up' : 'opacity-0'
                }`}
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <value.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-700">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
              Ready to Start Your UK Visa Journey?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Let our expert team guide you through the process with confidence and success.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/eligibility-check"
                className="inline-flex items-center px-8 py-4 bg-white text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-colors duration-300 shadow-lg"
              >
                <UserCheck className="w-5 h-5 mr-2" />
                Check Your Eligibility
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-blue-600 transition-colors duration-300"
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                Contact Our Team
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Info */}
      <section className="py-12 bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="flex flex-col items-center">
              <Phone className="w-8 h-8 text-blue-400 mb-3" />
              <h3 className="text-white font-semibold mb-2">Call Us</h3>
              <p className="text-gray-400">+02037288948</p>
            </div>
            <div className="flex flex-col items-center">
              <Mail className="w-8 h-8 text-blue-400 mb-3" />
              <h3 className="text-white font-semibold mb-2">Email Us</h3>
              <p className="text-gray-400">info@ukvisa.com</p>
            </div>
            <div className="flex flex-col items-center">
              <MapPin className="w-8 h-8 text-blue-400 mb-3" />
              <h3 className="text-white font-semibold mb-2">Visit Us</h3>
              <p className="text-gray-400">London, UK</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
