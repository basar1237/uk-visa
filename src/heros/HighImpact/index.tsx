'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import React, { useEffect, useState } from 'react'

import type { Page } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'

export const HighImpactHero: React.FC<Page['hero']> = ({ links, media, richText }) => {
  const { setHeaderTheme } = useHeaderTheme()
  const [isVisible, setIsVisible] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    isOver18: '',
    hasCriminalRecord: '',
    isApplyingForSelf: '',
  })

  const totalSteps = 3

  useEffect(() => {
    setHeaderTheme('dark')
    // Animasyon için
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 100)
    return () => clearTimeout(timer)
  }, [])

  const handleNext = () => {
    if (currentStep === 1 && !formData.isOver18) return
    if (currentStep === 2 && !formData.hasCriminalRecord) return
    if (currentStep === 3 && !formData.isApplyingForSelf) return

    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    }
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-500 mb-2">
                Step {currentStep} of {totalSteps}
              </p>
              <h3 className="text-xl font-semibold mb-2">Are you over the age of 18?</h3>
              <p className="text-sm text-gray-600">
                Do You Meet The Minimum Requirements Of The Visa Type That You Want To Apply For?
              </p>
            </div>

            <div className="space-y-3">
              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="radio"
                  name="isOver18"
                  value="yes"
                  checked={formData.isOver18 === 'yes'}
                  onChange={(e) => setFormData({ ...formData, isOver18: e.target.value })}
                  className="w-4 h-4 text-purple-600"
                />
                <span>Yes</span>
              </label>
              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="radio"
                  name="isOver18"
                  value="no"
                  checked={formData.isOver18 === 'no'}
                  onChange={(e) => setFormData({ ...formData, isOver18: e.target.value })}
                  className="w-4 h-4 text-purple-600"
                />
                <span>No</span>
              </label>
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-500 mb-2">
                Step {currentStep} of {totalSteps}
              </p>
              <h3 className="text-xl font-semibold mb-2">
                Do you have a criminal or unspent conviction in the UK or any other country?
              </h3>
            </div>

            <div className="space-y-3">
              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="radio"
                  name="hasCriminalRecord"
                  value="yes"
                  checked={formData.hasCriminalRecord === 'yes'}
                  onChange={(e) => setFormData({ ...formData, hasCriminalRecord: e.target.value })}
                  className="w-4 h-4 text-purple-600"
                />
                <span>Yes</span>
              </label>
              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="radio"
                  name="hasCriminalRecord"
                  value="no"
                  checked={formData.hasCriminalRecord === 'no'}
                  onChange={(e) => setFormData({ ...formData, hasCriminalRecord: e.target.value })}
                  className="w-4 h-4 text-purple-600"
                />
                <span>No</span>
              </label>
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-500 mb-2">
                Step {currentStep} of {totalSteps}
              </p>
              <h3 className="text-xl font-semibold mb-2">
                Are you the person applying or are you applying on behalf of someone?
              </h3>
            </div>

            <div className="space-y-3">
              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="radio"
                  name="isApplyingForSelf"
                  value="self"
                  checked={formData.isApplyingForSelf === 'self'}
                  onChange={(e) =>
                    setFormData({ ...formData, isApplyingForSelf: e.target.value })
                  }
                  className="w-4 h-4 text-purple-600"
                />
                <span>I&apos;m applying for myself</span>
              </label>
              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="radio"
                  name="isApplyingForSelf"
                  value="behalf"
                  checked={formData.isApplyingForSelf === 'behalf'}
                  onChange={(e) =>
                    setFormData({ ...formData, isApplyingForSelf: e.target.value })
                  }
                  className="w-4 h-4 text-purple-600"
                />
                <span>I&apos;m applying on behalf of someone</span>
              </label>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <section
      className="relative bg-[#4A3B7A] text-white py-10"
      data-theme="dark"
    >
      {/* Background Media with Overlay */}
      <div className="absolute inset-0 z-0">
        {media && typeof media === 'object' && (
          <Media fill imgClassName="object-cover" priority resource={media} />
        )}
        {/* Purple Overlay */}
        <div className="absolute inset-0 bg-[#4A3B7A]/30" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Side - Content */}
          <div className="flex flex-col justify-center space-y-6">
            <div className="inline-block w-fit">
              <span className="bg-orange-500 text-white px-4 py-2 rounded-lg text-lg font-semibold">
                UK&apos;s Only 7 Day Visa Service
              </span>
            </div>

            {richText && (
              <div className="text-white">
                <RichText data={richText} enableGutter={false} />
              </div>
            )}

            
            {/* Action Buttons */}
            <div className="flex gap-4 flex-wrap items-center">
              <button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-3 py-4  font-bold text-sm shadow-2xl hover:shadow-blue-500/50 rounded-xl transition-all transform hover:scale-105">
                Book Free Consultation
              </button>
              <button className="bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white px-3 py-4  font-bold text-sm shadow-2xl hover:shadow-teal-500/50 rounded-xl transition-all transform hover:scale-105">
                Check Eligibility
              </button>
              <a 
                href="tel:07858780841"
                className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-3 py-4  font-bold text-sm shadow-2xl hover:shadow-red-500/50 rounded-xl transition-all transform hover:scale-105 inline-flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                Urgent Help: 07858 780841
              </a>
            </div>

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

          {/* Right Side - Eligibility Test */}
          <div className="flex items-center justify-center">
            <div
              className={`bg-white p-8 rounded-lg shadow-xl min-h-[400px] flex flex-col transition-all duration-1000 ease-out ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-12'
              }`}
            >
              <div className="flex-1 space-y-6">
                {/* Header */}
                <div>
                  <div className="inline-block bg-gradient-to-r from-purple-600 to-purple-800 text-white px-4 py-2 rounded-lg mb-2">
                    UK Visa Eligibility Test
            </div>
                  <p className="text-xs text-gray-500">Immigration Solicitor Helpline</p>
          </div>
          
                <div className="border-t border-gray-200" />

                {/* Step Content */}
                <div className="flex-1 text-gray-800">{renderStep()}</div>

                {/* Progress Bar */}
                <div>
                  <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden mb-3">
                    <div
                      className="h-full bg-purple-600 transition-all duration-300"
                      style={{ width: `${(currentStep / totalSteps) * 100}%` }}
                    />
            </div>
                  <p className="text-xs text-center text-gray-500">
                    {currentStep} / {totalSteps} completed
                  </p>
          </div>

                {/* Next Button */}
            <button
              onClick={handleNext}
                  className="w-full bg-gradient-to-r from-purple-600 to-purple-800 text-white py-3 rounded-lg font-semibold text-lg hover:from-purple-700 hover:to-purple-900 transition-all"
            >
                  {currentStep === totalSteps ? 'Submit' : 'Next'}
            </button>
          </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}