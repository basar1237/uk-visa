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
                <p className="text-blue-200 text-sm">Mon-Fri 9AM-6PM</p>
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
                <p className="text-blue-100">Sheffield, United Kingdom</p>
                <p className="text-blue-200 text-sm">By Appointment</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Breadcrumb */}
      <Breadcrumb items={[{ label: 'Contact' }]} />

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
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Location</h2>
              <p className="text-lg text-gray-600">
                Visit our office in Sheffield for in-person consultations
              </p>
            </div>

            {/* Map Container */}
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="h-96 bg-gradient-to-br from-blue-100 to-indigo-200 flex items-center justify-center">
                {/* UK Map Placeholder */}
                <div className="text-center">
                  <MapPin className="w-16 h-16 text-blue-600 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Sheffield, United Kingdom</h3>
                  <p className="text-gray-600 mb-4">
                    Firvale Community Hub, Sheffield
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto">
                    <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4">
                      <Clock className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                      <h4 className="font-semibold text-gray-900">Office Hours</h4>
                      <p className="text-sm text-gray-600">Mon-Fri: 9AM-6PM</p>
                      <p className="text-sm text-gray-600">Sat: 10AM-4PM</p>
                    </div>
                    <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4">
                      <Phone className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                      <h4 className="font-semibold text-gray-900">Phone</h4>
                      <a href="tel:01143214047" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">01143214047</a>
                    </div>
                    <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4">
                      <Mail className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                      <h4 className="font-semibold text-gray-900">Email</h4>
                      <a href="mailto:info@ukimmigrationhelpline.com" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">info@ukimmigrationhelpline.com</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Additional Contact Information */}
            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
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
