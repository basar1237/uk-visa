'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import React, { useEffect, useState } from 'react'

import type { Page } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'
import Link from 'next/link'

export const HighImpactHero: React.FC<Page['hero']> = ({ links, media, richText }) => {
  const { setHeaderTheme } = useHeaderTheme()
  const [isVisible, setIsVisible] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    isOver18: '',
    hasCriminalRecord: '',
    applyingFor: '',
    firstName: '',
    nationality: 'United Kingdom',
  })

  const totalSteps = 5

  useEffect(() => {
    setHeaderTheme('dark')
    setTimeout(() => setIsVisible(true), 100)
  }, [setHeaderTheme])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <>
            <h3 className="font-bold text-gray-900 mb-2">Are you over the age of 18?</h3>
            <p className="text-sm text-gray-600 mb-4">
              Do You Meet The Minimum Requirements Of The Visa Type That You Want To Apply For?
            </p>
            <div className="space-y-2 mb-4">
              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="radio"
                  name="isOver18"
                  value="yes"
                  checked={formData.isOver18 === 'yes'}
                  onChange={handleInputChange}
                  className="w-4 h-4 text-purple-600 border-gray-300 focus:ring-purple-500"
                />
                <span className="text-sm text-gray-700">Yes</span>
              </label>
              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="radio"
                  name="isOver18"
                  value="no"
                  checked={formData.isOver18 === 'no'}
                  onChange={handleInputChange}
                  className="w-4 h-4 text-purple-600 border-gray-300 focus:ring-purple-500"
                />
                <span className="text-sm text-gray-700">No</span>
              </label>
            </div>
          </>
        )
      case 2:
        return (
          <>
            <h3 className="font-bold text-gray-900 mb-4">
              Do you have a criminal or unspent conviction in the UK or any other country?
            </h3>
            <div className="space-y-2 mb-4">
              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="radio"
                  name="hasCriminalRecord"
                  value="yes"
                  checked={formData.hasCriminalRecord === 'yes'}
                  onChange={handleInputChange}
                  className="w-4 h-4 text-purple-600 border-gray-300 focus:ring-purple-500"
                />
                <span className="text-sm text-gray-700">Yes</span>
              </label>
              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="radio"
                  name="hasCriminalRecord"
                  value="no"
                  checked={formData.hasCriminalRecord === 'no'}
                  onChange={handleInputChange}
                  className="w-4 h-4 text-purple-600 border-gray-300 focus:ring-purple-500"
                />
                <span className="text-sm text-gray-700">No</span>
              </label>
            </div>
          </>
        )
      case 3:
        return (
          <>
            <h3 className="font-bold text-gray-900 mb-4">
              Are you the person applying or are you applying on behalf of someone?
            </h3>
            <div className="space-y-2 mb-4">
              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="radio"
                  name="applyingFor"
                  value="myself"
                  checked={formData.applyingFor === 'myself'}
                  onChange={handleInputChange}
                  className="w-4 h-4 text-purple-600 border-gray-300 focus:ring-purple-500"
                />
                <span className="text-sm text-gray-700">I am applying for myself</span>
              </label>
              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="radio"
                  name="applyingFor"
                  value="someone"
                  checked={formData.applyingFor === 'someone'}
                  onChange={handleInputChange}
                  className="w-4 h-4 text-purple-600 border-gray-300 focus:ring-purple-500"
                />
                <span className="text-sm text-gray-700">I am applying on behalf of someone</span>
              </label>
            </div>
          </>
        )
      case 4:
        return (
          <>
            <h3 className="font-bold text-gray-900 mb-2">Please provide your First Name</h3>
            <p className="text-sm text-gray-600 mb-4">Please provide your first name</p>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm mb-4"
              placeholder="Enter your first name"
            />
          </>
        )
      case 5:
        return (
          <>
            <h3 className="font-bold text-gray-900 mb-4">
              What is the applicant&apos;s nationality as shown on the passport or travel document?
            </h3>
            <select
              name="nationality"
              value={formData.nationality}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm mb-4"
            >
              <option value="United Kingdom">United Kingdom</option>
              <option value="United States">United States</option>
              <option value="Turkey">Turkey</option>
              <option value="Germany">Germany</option>
              <option value="France">France</option>
              <option value="Other">Other</option>
            </select>
          </>
        )
      default:
        return null
    }
  }

  return (
    <section
      className="relative py-16 flex items-center"
      data-theme="dark"
    >
      {/* Background Media with Overlay */}
      <div className="absolute inset-0 z-0">
        {media && typeof media === 'object' && (
          <Media fill imgClassName="object-cover blur-[2px]" priority resource={media} />
        )}
        <div className="absolute inset-0 bg-black/30" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Left Side - Content */}
          <div 
            className={`flex flex-col justify-center space-y-6 transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            {/* Main Heading - CMS Content */}
            <div className="text-white">
              {richText ? (
                <div className="hero-content">
                  <RichText data={richText} enableGutter={false} />
                </div>
              ) : (
                <h1 className="text-2xl lg:text-3xl font-bold leading-tight mb-4 hero-content">
                  Welcome to <span className="font-bold">First Migration</span>, a London<br />
                  Based Immigration Consultancy. We<br />
                  Specialise in <span className="font-bold">UK Work and Family<br />
                  Visas.</span>
                </h1>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <Link
                href="/consultation"
                className="bg-blue-600 rounded-xl hover:bg-blue-700 text-white font-bold py-4 px-6 transition-all duration-300 shadow-lg hover:shadow-xl text-center text-sm"
              >
                Book Free Consultation
              </Link>
              <Link
                href="/eligibility"
                className="bg-teal-600 rounded-xl hover:bg-teal-700 text-white font-bold py-4 px-3 transition-all duration-300 shadow-lg hover:shadow-xl text-center text-sm"
              >
                Check Eligibility
              </Link>
              <a
                href="tel:07858780841"
                className="bg-red-600 rounded-xl hover:bg-red-700 text-white font-bold py-4 px-6 transition-all duration-300 shadow-lg  text-sm hover:shadow-xl text-center flex items-center justify-center gap-1"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                Urgent Help: 07858 780841
              </a>
            </div>

            {/* Social Proof Section*/}
            {/* <div className="space-y-3 hero-social-proof">
              <div className="flex items-center space-x-4">
                <div className="flex -space-x-2">
                  <div className="w-10 h-10 rounded-full bg-gray-300 border-2 border-white"></div>
                  <div className="w-10 h-10 rounded-full bg-gray-400 border-2 border-white"></div>
                  <div className="w-10 h-10 rounded-full bg-gray-500 border-2 border-white"></div>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="flex space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-white text-sm">(5 out of 5 Rating)</span>
                </div>
              </div>
              
              <p className="text-white text-sm">
                Based on 1058+ Reviews on Trustpilot & Google
              </p>
              <div className="flex items-center space-x-6 hero-review-platforms">
                <div className="flex items-center space-x-1">
                  <div className="flex space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-3 h-3 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-white text-xs">Trustpilot</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="flex space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-3 h-3 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-white text-xs">Google Reviews</span>
                </div>
                <div className="flex items-center space-x-1">
                  <svg className="w-3 h-3 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span className="text-white text-xs">Reviews.io</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-sm"></div>
                  </div>
                  <span className="text-white text-xs">OISC</span>
                </div>
              </div>
            </div>  */}

            {Array.isArray(links) && links.length > 0 && (
              <ul className="flex gap-4 flex-wrap">
                {links.map(({ link }, i) => {
                  if (!link) return null
                  return (
                    <li key={i}>
                      <CMSLink {...link} />
                    </li>
                  )
                })}
              </ul>
            )}
          </div>

          {/* Right Side - UK Visa Eligibility Test */}
          <div className="flex items-center justify-center hero-form">
            <div
              className={`bg-white/70  rounded-xl shadow-2xl w-full max-w-lg transition-all duration-1000 ease-out form-container ${
                isVisible ? 'opacity-90 translate-y-0' : 'opacity-0 -translate-y-12'
              }`}
            >
              {/* Form Header */}
              <div className="bg-purple-600/90 text-white px-6 py-4 rounded-t-xl text-center shadow-lg backdrop-blur-sm">
                <h2 className="font-bold text-xl">UK Visa Eligibility Test</h2>
              </div>
              
              <div className="px-6 py-3 bg-purple-50/70 text-center border-b border-purple-100/50 backdrop-blur-sm">
                <p className="text-sm text-purple-900 font-medium">Immigration Solicitor Helpline</p>
              </div>
              
              <div className="p-8">
                {/* Step Indicator */}
                <div className="mb-6">
                  <p className="text-sm text-purple-700 font-semibold mb-4">Step {currentStep} of {totalSteps}</p>
                  
                  {/* Dynamic Step Content */}
                  {renderStep()}
                  
                  {/* Progress Bar */}
                  <div className="mb-3">
                    <div className="w-full bg-gray-200 rounded-full h-2.5 shadow-inner">
                      <div 
                        className="bg-purple-600 h-2.5 rounded-full shadow-sm transition-all duration-500" 
                        style={{width: `${(currentStep / totalSteps) * 100}%`}}
                      ></div>
                    </div>
                  </div>
                  
                  <p className="text-xs text-gray-500 text-center mb-6">{currentStep}/{totalSteps} completed</p>
                  
                  {/* Navigation Buttons */}
                  <div className="flex gap-3">
                    {currentStep > 1 && (
                      <button 
                        onClick={handleBack}
                        className="flex-1 bg-purple-500 hover:bg-purple-600 text-white py-3 px-6 rounded-lg font-semibold text-sm transition-all duration-200 shadow-lg hover:shadow-xl"
                      >
                        Back
                      </button>
                    )}
                    <button 
                      onClick={handleNext}
                      className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-3 px-6 rounded-lg font-semibold text-sm transition-all duration-200 shadow-lg hover:shadow-xl"
                    >
                      {currentStep === totalSteps ? 'Submit' : 'Next'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}