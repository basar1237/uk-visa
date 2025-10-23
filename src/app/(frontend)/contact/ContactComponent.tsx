'use client'

import React, { useState } from 'react'
import { Mail, Phone, MapPin, Clock, Send, CheckCircle, AlertCircle } from 'lucide-react'

interface FormData {
  firstName: string
  lastName: string
  email: string
  phone: string
  visaType: string
  subject: string
  message: string
  preferredContact: string
  urgency: string
}

export const ContactComponent: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    visaType: '',
    subject: '',
    message: '',
    preferredContact: 'email',
    urgency: 'normal'
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')
    
    try {
      const response = await fetch('/api/contact-submissions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const result = await response.json()

      if (response.ok) {
        setSubmitStatus('success')
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          visaType: '',
          subject: '',
          message: '',
          preferredContact: 'email',
          urgency: 'normal'
        })
      } else {
        setSubmitStatus('error')
        console.error('Form submission error:', result.error)
      }
    } catch (error) {
      setSubmitStatus('error')
      console.error('Network error:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

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
                <p className="text-blue-100">+44 20 7123 4567</p>
                <p className="text-blue-200 text-sm">Mon-Fri 9AM-6PM</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                <Mail className="w-8 h-8 text-white mx-auto mb-4" />
                <h3 className="text-white font-semibold mb-2">Email</h3>
                <p className="text-blue-100">info@ukvisa.com</p>
                <p className="text-blue-200 text-sm">24/7 Support</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                <MapPin className="w-8 h-8 text-white mx-auto mb-4" />
                <h3 className="text-white font-semibold mb-2">Office</h3>
                <p className="text-blue-100">London, UK</p>
                <p className="text-blue-200 text-sm">By Appointment</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Form Section */}
      <div className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Send Us a Message</h2>
                <p className="text-lg text-gray-600">
                  Fill out the form below and we&apos;ll get back to you within 24 hours
                </p>
              </div>

              {/* Success/Error Messages */}
              {submitStatus === 'success' && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
                  <p className="text-green-800">Thank you! Your message has been sent successfully.</p>
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center">
                  <AlertCircle className="w-5 h-5 text-red-600 mr-3" />
                  <p className="text-red-800">Sorry, there was an error sending your message. Please try again.</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Personal Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-semibold text-gray-700 mb-2">
                      First Name *
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter your first name"
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-semibold text-gray-700 mb-2">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter your last name"
                    />
                  </div>
                </div>

                {/* Contact Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter your email address"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter your phone number"
                    />
                  </div>
                </div>

                {/* Visa Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="visaType" className="block text-sm font-semibold text-gray-700 mb-2">
                      Visa Type *
                    </label>
                    <select
                      id="visaType"
                      name="visaType"
                      value={formData.visaType}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select visa type</option>
                      <option value="visitor">Visitor Visa</option>
                      <option value="student">Student Visa</option>
                      <option value="work">Skilled Worker Visa</option>
                      <option value="spouse">Spouse Visa</option>
                      <option value="parent">Parent Visa</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="urgency" className="block text-sm font-semibold text-gray-700 mb-2">
                      Urgency Level
                    </label>
                    <select
                      id="urgency"
                      name="urgency"
                      value={formData.urgency}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="normal">Normal</option>
                      <option value="urgent">Urgent</option>
                      <option value="very-urgent">Very Urgent</option>
                    </select>
                  </div>
                </div>

                {/* Subject */}
                <div>
                  <label htmlFor="subject" className="block text-sm font-semibold text-gray-700 mb-2">
                    Subject *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="What is your inquiry about?"
                  />
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Please provide details about your visa application or inquiry..."
                  />
                </div>

                {/* Preferred Contact Method */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Preferred Contact Method
                  </label>
                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-6">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="preferredContact"
                        value="email"
                        checked={formData.preferredContact === 'email'}
                        onChange={handleInputChange}
                        className="mr-2"
                      />
                      <span className="text-gray-700">Email</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="preferredContact"
                        value="phone"
                        checked={formData.preferredContact === 'phone'}
                        onChange={handleInputChange}
                        className="mr-2"
                      />
                      <span className="text-gray-700">Phone</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="preferredContact"
                        value="both"
                        checked={formData.preferredContact === 'both'}
                        onChange={handleInputChange}
                        className="mr-2"
                      />
                      <span className="text-gray-700">Both</span>
                    </label>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="text-center">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex items-center px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5 mr-2" />
                        Send Message
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
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
                Visit our office in London for in-person consultations
              </p>
            </div>

            {/* Map Container */}
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="h-96 bg-gradient-to-br from-blue-100 to-indigo-200 flex items-center justify-center">
                {/* UK Map Placeholder */}
                <div className="text-center">
                  <MapPin className="w-16 h-16 text-blue-600 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">London, United Kingdom</h3>
                  <p className="text-gray-600 mb-4">
                    123 Visa Street, London SW1A 1AA
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
                      <p className="text-sm text-gray-600">+44 20 7123 4567</p>
                    </div>
                    <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4">
                      <Mail className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                      <h4 className="font-semibold text-gray-900">Email</h4>
                      <p className="text-sm text-gray-600">info@ukvisa.com</p>
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
                <div className="flex items-center">
                  <Phone className="w-5 h-5 text-red-600 mr-2" />
                  <span className="font-semibold text-gray-900">+44 20 7123 4568</span>
                </div>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Appointment Booking</h3>
                <p className="text-gray-600 mb-4">
                  Schedule an in-person consultation with our visa experts.
                </p>
                <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                  Book Appointment
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
