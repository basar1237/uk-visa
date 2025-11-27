'use client'

import React, { useState } from 'react'
import { Send, CheckCircle, AlertCircle } from 'lucide-react'
import { 
  MAIN_VISA_CATEGORIES, 
  VISA_APPLICATION_OPTIONS,
  LEAVE_TO_REMAIN_OPTIONS,
  BRITISH_CITIZENSHIP_OPTIONS,
  REFUSED_APPEALS_OPTIONS,
  BUSINESS_IMMIGRATION_OPTIONS,
  ILR_OPTIONS
} from '@/components/EligibilityTest/visaTypeConfig'

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
  visaCategory?: string
}

interface ContactFormProps {
  variant?: 'default' | 'compact'
  showTitle?: boolean
  title?: string
  description?: string
  className?: string
}

export const ContactForm: React.FC<ContactFormProps> = ({
  variant = 'default',
  showTitle = true,
  title = "Send Us a Message",
  description = "We'll respond within 24 hours.",
  className = "",
}) => {
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
  const [selectedVisaCategory, setSelectedVisaCategory] = useState<string>('')
  const [showSubTypeSelect, setShowSubTypeSelect] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    
    // Visa category değiştiğinde alt tip seçimini kontrol et
    if (name === 'visaCategory') {
      setSelectedVisaCategory(value)
      setFormData(prev => ({
        ...prev,
        visaType: '' // Alt tip seçimini sıfırla
      }))
      
      // Alt menü gerektiren kategoriler
      const categoriesWithSubTypes = [
        'Visa Applications',
        'Leave to Remain',
        'Indefinite leave to remain',
        'British citizenship',
        'Refused Appeals',
        'Business Immigration'
      ]
      
      if (categoriesWithSubTypes.includes(value)) {
        setShowSubTypeSelect(true)
      } else {
        setShowSubTypeSelect(false)
        setFormData(prev => ({
          ...prev,
          visaType: value
        }))
      }
      return
    }
    
    // Alt tip seçildiğinde
    if (name === 'visaType') {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }))
      return
    }
    
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const getSubTypeOptions = () => {
    switch (selectedVisaCategory) {
      case 'Visa Applications':
        return VISA_APPLICATION_OPTIONS
      case 'Leave to Remain':
        return LEAVE_TO_REMAIN_OPTIONS
      case 'Indefinite leave to remain':
        return ILR_OPTIONS
      case 'British citizenship':
        return BRITISH_CITIZENSHIP_OPTIONS
      case 'Refused Appeals':
        return REFUSED_APPEALS_OPTIONS
      case 'Business Immigration':
        return BUSINESS_IMMIGRATION_OPTIONS
      default:
        return []
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validation: Visa category seçilmemişse hata ver
    if (!selectedVisaCategory) {
      setSubmitStatus('error')
      alert('Lütfen bir visa kategorisi seçin.')
      return
    }
    
    // Validation: Eğer alt tip seçimi gerekiyorsa ve seçilmemişse hata ver
    if (showSubTypeSelect && !formData.visaType) {
      setSubmitStatus('error')
      alert('Lütfen bir visa tipi seçin.')
      return
    }
    
    // Alt tip seçimi gerekmeyen kategoriler için visaType'ı category'den al
    const finalVisaType = showSubTypeSelect 
      ? formData.visaType 
      : (formData.visaType || selectedVisaCategory)
    
    // Final validation: visaType boş olamaz
    if (!finalVisaType || finalVisaType.trim() === '') {
      setSubmitStatus('error')
      alert('Visa tipi seçimi gereklidir.')
      return
    }
    
    // Final form data
    const submitData = {
      ...formData,
      visaType: finalVisaType
    }
    
    setIsSubmitting(true)
    setSubmitStatus('idle')
    
    try {
      const response = await fetch('/api/contact-submissions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submitData),
      })

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
        setSelectedVisaCategory('')
        setShowSubTypeSelect(false)
      } else {
        setSubmitStatus('error')
      }
    } catch (_error) {
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const isCompact = variant === 'compact'
  const containerClass = isCompact 
    ? "bg-white rounded-2xl p-8 !shadow-none"
    : "bg-white rounded-2xl md:rounded-3xl  p-4 md:p-8 lg:p-10 border border-gray-100 shadow-xl"

  return (
    <div className={containerClass + " " + className}>
      {showTitle && (
        <div className={`mb-6 md:mb-8 ${isCompact ? 'text-center' : ''}`}>
          <h2 className={`${isCompact ? 'text-3xl' : 'text-2xl md:text-3xl lg:text-4xl'} font-bold text-blue-900 mb-2 md:mb-3`}>
            {title}
          </h2>
          <p className={`${isCompact ? 'text-lg' : 'text-sm md:text-base lg:text-lg'} text-gray-600`}>
            {description}
          </p>
        </div>
      )}

      {/* Success/Error Messages */}
      {submitStatus === 'success' && (
        <div className={`mb-4 md:mb-6 p-3 md:p-4 bg-green-50 border border-green-200 rounded-xl flex items-center shadow-md ${isCompact ? 'rounded-lg' : ''}`}>
          <CheckCircle className={`${isCompact ? 'w-5 h-5' : 'w-4 h-4 md:w-5 md:h-5'} text-green-600 mr-2 md:mr-3 flex-shrink-0`} />
          <p className={`${isCompact ? 'text-base' : 'text-sm md:text-base'} text-green-800`}>
            Thank you! Your message has been sent successfully.
          </p>
        </div>
      )}

      {submitStatus === 'error' && (
        <div className={`mb-4 md:mb-6 p-3 md:p-4 bg-red-50 border border-red-200 rounded-xl flex items-center shadow-md ${isCompact ? 'rounded-lg' : ''}`}>
          <AlertCircle className={`${isCompact ? 'w-5 h-5' : 'w-4 h-4 md:w-5 md:h-5'} text-red-600 mr-2 md:mr-3 flex-shrink-0`} />
          <p className={`${isCompact ? 'text-base' : 'text-sm md:text-base'} text-red-800`}>
            Sorry, there was an error sending your message. Please try again.
          </p>
        </div>
      )}

      <form onSubmit={handleSubmit} className={isCompact ? "space-y-6" : "space-y-4 md:space-y-6"}>
        {/* Personal Information */}
        <div className={`grid grid-cols-1 md:grid-cols-2 ${isCompact ? 'gap-6' : 'gap-4 md:gap-6'}`}>
          <div>
            <label htmlFor="firstName" className={`block ${isCompact ? 'text-sm' : 'text-xs md:text-sm'} font-semibold text-gray-700 mb-1 md:mb-2`}>
              First Name *
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              required
              className={`w-full ${isCompact ? 'px-4 py-3' : 'px-3 md:px-4 py-2 md:py-3'} ${isCompact ? 'text-base' : 'text-sm md:text-base'} ${isCompact ? 'border-gray-300' : 'bg-gray-50 border-gray-200'} border rounded-lg ${isCompact ? '' : 'md:rounded-xl'} text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500 ${isCompact ? 'focus:border-transparent' : 'focus:border-blue-500 focus:bg-white'} ${isCompact ? '' : 'hover:border-gray-300'}`}
              placeholder="Enter your first name"
            />
          </div>
          <div>
            <label htmlFor="lastName" className={`block ${isCompact ? 'text-sm' : 'text-xs md:text-sm'} font-semibold text-gray-700 mb-1 md:mb-2`}>
              Last Name *
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              required
              className={`w-full ${isCompact ? 'px-4 py-3' : 'px-3 md:px-4 py-2 md:py-3'} ${isCompact ? 'text-base' : 'text-sm md:text-base'} ${isCompact ? 'border-gray-300' : 'bg-gray-50 border-gray-200'} border rounded-lg ${isCompact ? '' : 'md:rounded-xl'} text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500 ${isCompact ? 'focus:border-transparent' : 'focus:border-blue-500 focus:bg-white'} ${isCompact ? '' : 'hover:border-gray-300'}`}
              placeholder="Enter your last name"
            />
          </div>
        </div>

        {/* Contact Information */}
        <div className={`grid grid-cols-1 md:grid-cols-2 ${isCompact ? 'gap-6' : 'gap-4 md:gap-6'}`}>
          <div>
            <label htmlFor="email" className={`block ${isCompact ? 'text-sm' : 'text-xs md:text-sm'} font-semibold text-gray-700 mb-1 md:mb-2`}>
              Email Address *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className={`w-full ${isCompact ? 'px-4 py-3' : 'px-3 md:px-4 py-2 md:py-3'} ${isCompact ? 'text-base' : 'text-sm md:text-base'} ${isCompact ? 'border-gray-300' : 'bg-gray-50 border-gray-200'} border rounded-lg ${isCompact ? '' : 'md:rounded-xl'} text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500 ${isCompact ? 'focus:border-transparent' : 'focus:border-blue-500 focus:bg-white'} ${isCompact ? '' : 'hover:border-gray-300'}`}
              placeholder="Enter your email address"
            />
          </div>
          <div>
            <label htmlFor="phone" className={`block ${isCompact ? 'text-sm' : 'text-xs md:text-sm'} font-semibold text-gray-700 mb-1 md:mb-2`}>
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className={`w-full ${isCompact ? 'px-4 py-3' : 'px-3 md:px-4 py-2 md:py-3'} ${isCompact ? 'text-base' : 'text-sm md:text-base'} ${isCompact ? 'border-gray-300' : 'bg-gray-50 border-gray-200'} border rounded-lg ${isCompact ? '' : 'md:rounded-xl'} text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500 ${isCompact ? 'focus:border-transparent' : 'focus:border-blue-500 focus:bg-white'} ${isCompact ? '' : 'hover:border-gray-300'}`}
              placeholder="Enter your phone number"
            />
          </div>
        </div>

        {/* Visa Information */}
        <div className="space-y-4 md:space-y-6">
          <div className={`grid grid-cols-1 ${showSubTypeSelect ? 'md:grid-cols-1' : 'md:grid-cols-2'} ${isCompact ? 'gap-6' : 'gap-4 md:gap-6'}`}>
            <div>
              <label htmlFor="visaCategory" className={`block ${isCompact ? 'text-sm' : 'text-xs md:text-sm'} font-semibold text-gray-700 mb-1 md:mb-2`}>
                Visa Category *
              </label>
              <select
                id="visaCategory"
                name="visaCategory"
                value={selectedVisaCategory}
                onChange={handleInputChange}
                required
                className={`w-full ${isCompact ? 'px-4 py-3' : 'px-3 md:px-4 py-2 md:py-3'} ${isCompact ? 'text-base' : 'text-sm md:text-base'} ${isCompact ? 'border-gray-300' : 'bg-gray-50 border-gray-200'} border rounded-lg ${isCompact ? '' : 'md:rounded-xl'} text-gray-900 focus:ring-2 focus:ring-blue-500 ${isCompact ? 'focus:border-transparent' : 'focus:border-blue-500 focus:bg-white'} ${isCompact ? '' : 'hover:border-gray-300'}`}
              >
                <option value="">Select visa category</option>
                {MAIN_VISA_CATEGORIES.map((category) => (
                  <option key={category.type} value={category.type}>
                    {category.type}
                  </option>
                ))}
              </select>
            </div>
            
            {!showSubTypeSelect && selectedVisaCategory && (
              <div>
                <label htmlFor="visaType" className={`block ${isCompact ? 'text-sm' : 'text-xs md:text-sm'} font-semibold text-gray-700 mb-1 md:mb-2`}>
                  Visa Type *
                </label>
                <input
                  type="text"
                  id="visaType"
                  name="visaType"
                  value={formData.visaType || selectedVisaCategory}
                  readOnly
                  className={`w-full ${isCompact ? 'px-4 py-3' : 'px-3 md:px-4 py-2 md:py-3'} ${isCompact ? 'text-base' : 'text-sm md:text-base'} ${isCompact ? 'border-gray-300' : 'bg-gray-50 border-gray-200'} border rounded-lg ${isCompact ? '' : 'md:rounded-xl'} text-gray-900 bg-gray-100 cursor-not-allowed`}
                />
              </div>
            )}
          </div>
          
          {showSubTypeSelect && (
            <div>
              <label htmlFor="visaType" className={`block ${isCompact ? 'text-sm' : 'text-xs md:text-sm'} font-semibold text-gray-700 mb-1 md:mb-2`}>
                {selectedVisaCategory} - Select Type *
              </label>
              <select
                id="visaType"
                name="visaType"
                value={formData.visaType}
                onChange={handleInputChange}
                required
                className={`w-full ${isCompact ? 'px-4 py-3' : 'px-3 md:px-4 py-2 md:py-3'} ${isCompact ? 'text-base' : 'text-sm md:text-base'} ${isCompact ? 'border-gray-300' : 'bg-gray-50 border-gray-200'} border rounded-lg ${isCompact ? '' : 'md:rounded-xl'} text-gray-900 focus:ring-2 focus:ring-blue-500 ${isCompact ? 'focus:border-transparent' : 'focus:border-blue-500 focus:bg-white'} ${isCompact ? '' : 'hover:border-gray-300'}`}
              >
                <option value="">Select {selectedVisaCategory} type</option>
                {getSubTypeOptions().map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          )}
          
          <div>
            <label htmlFor="urgency" className={`block ${isCompact ? 'text-sm' : 'text-xs md:text-sm'} font-semibold text-gray-700 mb-1 md:mb-2`}>
              Urgency Level
            </label>
            <select
              id="urgency"
              name="urgency"
              value={formData.urgency}
              onChange={handleInputChange}
              className={`w-full ${isCompact ? 'px-4 py-3' : 'px-3 md:px-4 py-2 md:py-3'} ${isCompact ? 'text-base' : 'text-sm md:text-base'} ${isCompact ? 'border-gray-300' : 'bg-gray-50 border-gray-200'} border rounded-lg ${isCompact ? '' : 'md:rounded-xl'} text-gray-900 focus:ring-2 focus:ring-blue-500 ${isCompact ? 'focus:border-transparent' : 'focus:border-blue-500 focus:bg-white'} ${isCompact ? '' : 'hover:border-gray-300'}`}
            >
              <option value="normal">Normal</option>
              <option value="urgent">Urgent</option>
            </select>
          </div>
        </div>

        {/* Subject */}
        <div>
          <label htmlFor="subject" className={`block ${isCompact ? 'text-sm' : 'text-xs md:text-sm'} font-semibold text-gray-700 mb-1 md:mb-2`}>
            Subject *
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleInputChange}
            required
            className={`w-full ${isCompact ? 'px-4 py-3' : 'px-3 md:px-4 py-2 md:py-3'} ${isCompact ? 'text-base' : 'text-sm md:text-base'} ${isCompact ? 'border-gray-300' : 'bg-gray-50 border-gray-200'} border rounded-lg ${isCompact ? '' : 'md:rounded-xl'} text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500 ${isCompact ? 'focus:border-transparent' : 'focus:border-blue-500 focus:bg-white'} ${isCompact ? '' : 'hover:border-gray-300'}`}
            placeholder="What is your inquiry about?"
          />
        </div>

        {/* Message */}
        <div>
          <label htmlFor="message" className={`block ${isCompact ? 'text-sm' : 'text-xs md:text-sm'} font-semibold text-gray-700 mb-1 md:mb-2`}>
            Message *
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            required
            rows={isCompact ? 6 : 5}
            className={`w-full ${isCompact ? 'px-4 py-3' : 'px-3 md:px-4 py-2 md:py-3'} ${isCompact ? 'text-base' : 'text-sm md:text-base'} ${isCompact ? 'border-gray-300' : 'bg-gray-50 border-gray-200'} border rounded-lg ${isCompact ? '' : 'md:rounded-xl'} text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500 ${isCompact ? 'focus:border-transparent' : 'focus:border-blue-500 focus:bg-white'} ${isCompact ? '' : 'hover:border-gray-300'}`}
            placeholder="Please provide details about your visa application or inquiry..."
          />
        </div>

        {/* Preferred Contact Method */}
        <div>
          <label className={`block ${isCompact ? 'text-sm' : 'text-xs md:text-sm'} font-semibold text-gray-700 mb-2 md:mb-3`}>
            Preferred Contact Method
          </label>
          <div className={`flex ${isCompact ? 'flex-col sm:flex-row gap-3 sm:gap-6' : 'gap-4 md:gap-6'}`}>
            <label className={`inline-flex items-center ${isCompact ? 'text-base' : 'text-sm'}`}>
              <input
                type="radio"
                name="preferredContact"
                value="email"
                checked={formData.preferredContact === 'email'}
                onChange={handleInputChange}
                className={`mr-2 ${isCompact ? 'w-5 h-5' : 'w-4 h-4 md:w-5 md:h-5'}`}
              />
              <span className="text-gray-700">Email</span>
            </label>
            <label className={`inline-flex items-center ${isCompact ? 'text-base' : 'text-sm'}`}>
              <input
                type="radio"
                name="preferredContact"
                value="phone"
                checked={formData.preferredContact === 'phone'}
                onChange={handleInputChange}
                className={`mr-2 ${isCompact ? 'w-5 h-5' : 'w-4 h-4 md:w-5 md:h-5'}`}
              />
              <span className="text-gray-700">Phone</span>
            </label>
            <label className={`inline-flex items-center ${isCompact ? 'text-base' : 'text-sm'}`}>
              <input
                type="radio"
                name="preferredContact"
                value="both"
                checked={formData.preferredContact === 'both'}
                onChange={handleInputChange}
                className={`mr-2 ${isCompact ? 'w-5 h-5' : 'w-4 h-4 md:w-5 md:h-5'}`}
              />
              <span className="text-gray-700">Both</span>
            </label>
          </div>
        </div>

        {/* Submit Button */}
        <div className={`text-center ${isCompact ? '' : 'pt-2 md:pt-4'}`}>
          <button
            type="submit"
            disabled={isSubmitting}
            className={`inline-flex items-center ${isCompact ? 'px-8 py-4 bg-blue-600 hover:bg-blue-700' : 'px-6 md:px-8 py-3 md:py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg hover:shadow-xl '} text-white font-semibold rounded-lg ${isCompact ? '' : 'md:rounded-xl'} ${isCompact ? '' : ''} disabled:opacity-50 disabled:cursor-not-allowed ${isCompact ? 'w-full sm:w-auto' : 'w-full sm:w-auto'}`}
          >
            {isSubmitting ? (
              <>
                <div className={`animate-spin rounded-full ${isCompact ? 'h-5 w-5' : 'h-4 w-4 md:h-5 md:w-5'} border-b-2 border-white mr-2`}></div>
                Sending...
              </>
            ) : (
              <>
                <Send className={`${isCompact ? 'w-5 h-5' : 'w-4 h-4 md:w-5 md:h-5'} mr-2`} />
                Send Message
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  )
}

