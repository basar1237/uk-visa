'use client'

import React from 'react'
import { Mail, Phone, MapPin, Clock } from 'lucide-react'
import { Breadcrumb } from '@/components/Breadcrumb'
import Link from 'next/link'
import { ContactForm } from '@/components/forms/ContactForm'

export const ContactComponent: React.FC = () => {

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 py-36">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
              Contact Our UK Visa Experts
            </h1>
            <p className="text-xl text-blue-100 mb-8">
              Get professional consultation and support for your UK visa application
            </p>
            
            {/* Contact Info Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                <Phone className="w-8 h-8 text-white mx-auto mb-4" />
                <h3 className="text-white font-semibold mb-2">Phone</h3>
                <a href="tel:01143214047" className="text-blue-100 hover:text-white transition-colors">01143214047</a>
                <p className="text-blue-200 text-sm">24/7 Helpline</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                <Mail className="w-8 h-8 text-white mx-auto mb-4" />
                <h3 className="text-white font-semibold mb-2">Email</h3>
                <a href="mailto:info@ukimmigrationhelpline.com" className="text-blue-100 hover:text-white transition-colors">info@ukimmigrationhelpline.com</a>
                <p className="text-blue-200 text-sm">24/7 Support</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                <MapPin className="w-8 h-8 text-white mx-auto mb-4" />
                <h3 className="text-white font-semibold mb-2">Office</h3>
                <p className="text-blue-100">Sheffield</p>
                <p className="text-blue-100">Birminghsm</p>
                <p className="text-blue-100">bradford</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Form Section */}
      <div className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <ContactForm 
              variant="compact"
              showTitle={true}
              title="Send Us a Message"
              description="Fill out the form below and we'll get back to you within 24 hours"
            />
          </div>
        </div>
      </div>

      {/* UK Map Section */}
      <div className="bg-gray-100 py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            {/* Additional Contact Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white rounded-lg p-6 shadow-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Emergency Contact</h3>
                <p className="text-gray-600 mb-4">
                  For urgent visa matters outside office hours, please call our emergency line.
                </p>
                <a href="tel:01143214047" className="flex items-center hover:text-blue-600 transition-colors">
                  <Phone className="w-5 h-5 text-red-600 mr-2" />
                  <span className="font-semibold text-gray-900">01143214047</span>
                </a>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Appointment Booking</h3>
                <p className="text-gray-600 mb-4">
                  Schedule an in-person consultation with our visa experts.
                </p>
                <Link href="/contact" className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors text-center">
                  Book Appointment
                </Link>
              </div>
            </div>
          </div>  
        </div>
      </div>
    </div>
  )
}
