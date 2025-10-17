'use client'
import { motion } from "motion/react"
import { useHeaderTheme } from '@/providers/HeaderTheme'
import React, { useEffect, useState } from 'react'
import { ArrowDownRight } from "lucide-react"

import type { Page } from '@/payload-types'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'
import { Button } from '@/components/ui/button'
import { AnimatedGroup } from '@/components/landing/animated-group'
import { AnimatedText } from '@/components/landing/animated-text'
import Link from 'next/link'

export const HighImpactHero: React.FC<Page['hero']> = ({ media, richText }) => {
  const { setHeaderTheme } = useHeaderTheme()
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
            <h3 className="font-bold text-gray-900 mb-2 text-sm sm:text-base">Are you over the age of 18?</h3>
            <p className="text-xs sm:text-sm text-gray-600 mb-4">
              Do You Meet The Minimum Requirements Of The Visa Type That You Want To Apply For?
            </p>
            <div className="space-y-3 mb-4">
              <label className="flex items-center space-x-3 cursor-pointer p-2 rounded-lg hover:bg-gray-50 transition-colors">
                <input
                  type="radio"
                  name="isOver18"
                  value="yes"
                  checked={formData.isOver18 === 'yes'}
                  onChange={handleInputChange}
                  className="w-5 h-5 text-purple-600 border-gray-300 focus:ring-purple-500"
                />
                <span className="text-sm text-gray-700">Yes</span>
              </label>
              <label className="flex items-center space-x-3 cursor-pointer p-2 rounded-lg hover:bg-gray-50 transition-colors">
                <input
                  type="radio"
                  name="isOver18"
                  value="no"
                  checked={formData.isOver18 === 'no'}
                  onChange={handleInputChange}
                  className="w-5 h-5 text-purple-600 border-gray-300 focus:ring-purple-500"
                />
                <span className="text-sm text-gray-700">No</span>
              </label>
            </div>
          </>
        )
      case 2:
        return (
          <>
            <h3 className="font-bold text-gray-900 mb-4 text-sm sm:text-base">
              Do you have a criminal or unspent conviction in the UK or any other country?
            </h3>
            <div className="space-y-3 mb-4">
              <label className="flex items-center space-x-3 cursor-pointer p-2 rounded-lg hover:bg-gray-50 transition-colors">
                <input
                  type="radio"
                  name="hasCriminalRecord"
                  value="yes"
                  checked={formData.hasCriminalRecord === 'yes'}
                  onChange={handleInputChange}
                  className="w-5 h-5 text-purple-600 border-gray-300 focus:ring-purple-500"
                />
                <span className="text-sm text-gray-700">Yes</span>
              </label>
              <label className="flex items-center space-x-3 cursor-pointer p-2 rounded-lg hover:bg-gray-50 transition-colors">
                <input
                  type="radio"
                  name="hasCriminalRecord"
                  value="no"
                  checked={formData.hasCriminalRecord === 'no'}
                  onChange={handleInputChange}
                  className="w-5 h-5 text-purple-600 border-gray-300 focus:ring-purple-500"
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
    <main>
      <motion.section
        className="relative overflow-hidden"
        initial={{ opacity: 0, scale: 1.04, filter: "blur(12px)" }}
        animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
        transition={{ type: "spring", bounce: 0.32, duration: 0.9 }}
      >
        {/* Background Media with Overlay */}
        <div className="absolute inset-0 z-0">
          {media && typeof media === 'object' && (
            <Media fill imgClassName="object-cover blur-[2px]" priority resource={media} />
          )}
          <div className="absolute inset-0 bg-black/30" />
        </div>
        <div className="mx-auto grid max-w-7xl items-center gap-6 mt-16 pt-16 pb-10 lg:grid-cols-2 lg:gap-20 relative z-10 justify-between">
          <AnimatedGroup
            preset="blur-slide"
            className="mx-auto flex flex-col items-center text-center md:ml-auto lg:max-w-3xl lg:items-start lg:text-left"
          >
            <AnimatedText
              as="h1"
              className=" text-2xl sm:text-3xl md:text-4xl font-bold text-pretty lg:text-6xl xl:text-7xl md:mb-10"
            >
              {richText ? (
                <div className="hero-content">
                  <RichText data={richText} enableGutter={false} />
                </div>
              ) : (
                <>
                  Welcome to <span className="font-bold">First Migration</span>, a London<br />
                  Based Immigration Consultancy. We<br />
                  Specialise in <span className="font-bold">UK Work and Family<br />
                  Visas.</span>
                </>
              )}
            </AnimatedText>
            <AnimatedGroup
              preset="slide"
              className="flex w-full flex-col items-center justify-center gap-3 sm:flex-row sm:items-start lg:justify-start"
            >
              <Button asChild className="w-3/4 sm:w-auto shadow-xl bg-blue-700 hover:bg-blue-800 rounded-xl hover:translate-y-[-3px] text-sm sm:text-base py-3 sm:py-6">
                <Link href="/consultation">Book Free Consultation</Link>
              </Button>
              <Button asChild variant="outline" className="w-3/4 sm:w-auto rounded-xl text-sm sm:text-base hover:translate-y-[-3px] transition-all duration-200 py-3 sm:py-6">
                <Link href="/eligibility">
                  Check Eligibility
                  <ArrowDownRight className="size-4" />
                </Link>
              </Button>
              <Button asChild className="w-3/4 sm:w-auto shadow-xl bg-red-600 hover:bg-red-700 rounded-xl hover:translate-y-[-3px] text-sm sm:text-base py-3 sm:py-6">
                <Link href="/consultation">☎ Urgent Help: 07858 780841</Link>
              </Button>
            </AnimatedGroup>
          </AnimatedGroup>



          {/* Right Side - UK Visa Eligibility Test */}
            
            <motion.div
              className="hidden lg:block bg-white/70 rounded-xl shadow-2xl backdrop-blur-sm"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              {/* Form Header */}
              <div className="bg-purple-600/90 text-white px-4 sm:px-6 py-3 sm:py-4 rounded-t-xl text-center shadow-lg backdrop-blur-sm">
                <h2 className="font-bold text-lg sm:text-xl">UK Visa Eligibility Test</h2>
              </div>
              
              <div className="px-4 sm:px-6 py-2 sm:py-3 bg-purple-50/70 text-center border-b border-purple-100/50 backdrop-blur-sm">
                <p className="text-xs sm:text-sm text-purple-900 font-medium">Immigration Solicitor Helpline</p>
              </div>
              
              <div className="p-4 sm:p-6 lg:p-8">
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
            </motion.div>
           
        </div>
      </motion.section>
    </main>
  )
}