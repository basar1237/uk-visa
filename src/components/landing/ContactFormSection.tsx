'use client'

import React, { useState } from 'react'
import { Send, CheckCircle, AlertCircle } from 'lucide-react'

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

export const ContactFormSection: React.FC = () => {
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
      }
    } catch (_error) {
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="py-8 md:py-16 ">
      <div className="container mx-auto px-4 sm:px-4 md:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10 items-start">
          {/* Left: Reach Us Cards */}
          <div>
            <h3 className="text-xl md:text-3xl font-bold text-blue-900 mb-4">How to Reach Us</h3>

            <div className="space-y-4">
              {/* Phone Support */}
              <div className="bg-white border  border-gray-200 rounded-2xl p-5 md:p-6 shadow-md">
                <div className="flex items-start gap-4">
                  <div className="h-12 w-12 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center font-semibold">☎</div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-gray-900">Phone Support</p>
                    <p className="text-gray-900 font-medium">020 3384 4389</p>
                    <p className="text-gray-600 text-sm">Speak directly with our specialists</p>
                    <p className="text-green-700 text-xs mt-1">7 days, 7am-7pm</p>
                    <button type="button" className="mt-2 text-sm text-blue-700 hover:text-blue-800 font-medium">Call now →</button>
                  </div>
                </div>
              </div>

              {/* Email Enquiry */}
              <div className="bg-white border  border-gray-200 rounded-2xl p-5 md:p-6 shadow-md">
                <div className="flex items-start gap-4">
                  <div className="h-12 w-12 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center font-semibold">✉</div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-gray-900">Email Enquiry</p>
                    <p className="text-gray-900">info@ukimmigrationsolicitors.co.uk</p>
                    <p className="text-gray-600 text-sm">Send your questions via email</p>
                    <p className="text-green-700 text-xs mt-1">Response within 24 hours</p>
                    <button type="button" className="mt-2 text-sm text-blue-700 hover:text-blue-800 font-medium">Send email →</button>
                  </div>
                </div>
              </div>

              {/* Online Assessment */}
              <div className="bg-white border  border-gray-200 rounded-2xl p-5 md:p-6 shadow-md">
                <div className="flex items-start gap-4">
                  <div className="h-12 w-12 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center font-semibold">⏱</div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-gray-900">Online Assessment</p>
                    <p className="text-gray-900">Free consultation</p>
                    <p className="text-gray-600 text-sm">Get started with our online form</p>
                    <p className="text-green-700 text-xs mt-1">Available 24/7</p>
                    <button type="button" className="mt-2 text-sm text-blue-700 hover:text-blue-800 font-medium">Start assessment →</button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl md:rounded-3xl transition-all duration-300 p-4 md:p-8 lg:p-10 border border-gray-100 shadow-xl">
            <div className="mb-6 md:mb-8">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-blue-900 mb-2 md:mb-3">Send Us a Message</h2>
              <p className="text-sm md:text-base lg:text-lg text-gray-600">We&apos;ll respond within 24 hours.</p>
            </div>

            {/* Success/Error Messages */}
            {submitStatus === 'success' && (
              <div className="mb-4 md:mb-6 p-3 md:p-4 bg-green-50 border border-green-200 rounded-xl flex items-center shadow-md">
                <CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-green-600 mr-2 md:mr-3 flex-shrink-0" />
                <p className="text-sm md:text-base text-green-800">Thank you! Your message has been sent successfully.</p>
              </div>
            )}

            {submitStatus === 'error' && (
              <div className="mb-4 md:mb-6 p-3 md:p-4 bg-red-50 border border-red-200 rounded-xl flex items-center shadow-md">
                <AlertCircle className="w-4 h-4 md:w-5 md:h-5 text-red-600 mr-2 md:mr-3 flex-shrink-0" />
                <p className="text-sm md:text-base text-red-800">Sorry, there was an error sending your message. Please try again.</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
              {/* Personal Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <div>
                  <label htmlFor="firstName" className="block text-xs md:text-sm font-semibold text-gray-700 mb-1 md:mb-2">
                    First Name *
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 md:px-4 py-2 md:py-3 text-sm md:text-base bg-gray-50 border border-gray-200 rounded-lg md:rounded-xl text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white transition-all hover:border-gray-300"
                    placeholder="Enter your first name"
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-xs md:text-sm font-semibold text-gray-700 mb-1 md:mb-2">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 md:px-4 py-2 md:py-3 text-sm md:text-base bg-gray-50 border border-gray-200 rounded-lg md:rounded-xl text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white transition-all hover:border-gray-300"
                    placeholder="Enter your last name"
                  />
                </div>
              </div>

              {/* Contact Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <div>
                  <label htmlFor="email" className="block text-xs md:text-sm font-semibold text-gray-700 mb-1 md:mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 md:px-4 py-2 md:py-3 text-sm md:text-base bg-gray-50 border border-gray-200 rounded-lg md:rounded-xl text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white transition-all hover:border-gray-300"
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
                    className="w-full px-3 md:px-4 py-2 md:py-3 text-sm md:text-base bg-gray-50 border border-gray-200 rounded-lg md:rounded-xl text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white transition-all hover:border-gray-300"
                    placeholder="Enter your phone number"
                  />
                </div>
              </div>

              {/* Visa Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <div>
                  <label htmlFor="visaType" className="block text-xs md:text-sm font-semibold text-gray-700 mb-1 md:mb-2">
                    Visa Type *
                  </label>
                  <select
                    id="visaType"
                    name="visaType"
                    value={formData.visaType}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 md:px-4 py-2 md:py-3 text-sm md:text-base bg-gray-50 border border-gray-200 rounded-lg md:rounded-xl text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white transition-all hover:border-gray-300"
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
                  <label htmlFor="urgency" className="block text-xs md:text-sm font-semibold text-gray-700 mb-1 md:mb-2">
                    Urgency Level
                  </label>
                  <select
                    id="urgency"
                    name="urgency"
                    value={formData.urgency}
                    onChange={handleInputChange}
                    className="w-full px-3 md:px-4 py-2 md:py-3 text-sm md:text-base bg-gray-50 border border-gray-200 rounded-lg md:rounded-xl text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white transition-all hover:border-gray-300"
                  >
                    <option value="normal">Normal</option>
                    <option value="urgent">Urgent</option>
                    <option value="very-urgent">Very Urgent</option>
                  </select>
                </div>
              </div>

              {/* Subject */}
              <div>
                <label htmlFor="subject" className="block text-xs md:text-sm font-semibold text-gray-700 mb-1 md:mb-2">
                  Subject *
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 md:px-4 py-2 md:py-3 text-sm md:text-base bg-gray-50 border border-gray-200 rounded-lg md:rounded-xl text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white transition-all hover:border-gray-300"
                  placeholder="What is your inquiry about?"
                />
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="block text-xs md:text-sm font-semibold text-gray-700 mb-1 md:mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={5}
                  className="w-full px-3 md:px-4 py-2 md:py-3 text-sm md:text-base bg-gray-50 border border-gray-200 rounded-lg md:rounded-xl text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white transition-all hover:border-gray-300"
                  placeholder="Please provide details about your visa application or inquiry..."
                />
              </div>

              {/* Preferred Contact Method */}
              <div>
                <label className="block text-xs md:text-sm font-semibold text-gray-700 mb-2 md:mb-3">
                  Preferred Contact Method
                </label>
                <div className="flex gap-4 md:gap-6">
                  <label className="inline-flex items-center text-sm">
                    <input
                      type="radio"
                      name="preferredContact"
                      value="email"
                      checked={formData.preferredContact === 'email'}
                      onChange={handleInputChange}
                      className="mr-2 w-4 h-4 md:w-5 md:h-5"
                    />
                    <span className="text-gray-700">Email</span>
                  </label>
                  <label className="inline-flex items-center text-sm">
                    <input
                      type="radio"
                      name="preferredContact"
                      value="phone"
                      checked={formData.preferredContact === 'phone'}
                      onChange={handleInputChange}
                      className="mr-2 w-4 h-4 md:w-5 md:h-5"
                    />
                    <span className="text-gray-700">Phone</span>
                  </label>
                  <label className="inline-flex items-center text-sm">
                    <input
                      type="radio"
                      name="preferredContact"
                      value="both"
                      checked={formData.preferredContact === 'both'}
                      onChange={handleInputChange}
                      className="mr-2 w-4 h-4 md:w-5 md:h-5"
                    />
                    <span className="text-gray-700">Both</span>
                  </label>
                </div>
              </div>

              {/* Submit Button */}
              <div className="text-center pt-2 md:pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center px-6 md:px-8 py-3 md:py-4 text-sm md:text-base bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-lg md:rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none w-full sm:w-auto"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 md:h-5 md:w-5 border-b-2 border-white mr-2"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 md:w-5 md:h-5 mr-2" />
                      Send Message
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

