'use client'

import { useState, useEffect } from 'react'

type FormData = {
  isOver18: string
  hasCriminalRecord: string
  isApplyingForSelf: string
}

export function QuickRecommendationForm() {
  const [currentStep, setCurrentStep] = useState(1)
  const [isVisible, setIsVisible] = useState(false)
  const [formData, setFormData] = useState<FormData>({
    isOver18: '',
    hasCriminalRecord: '',
    isApplyingForSelf: '',
  })

  const totalSteps = 3

  // Sayfa yüklendiğinde animasyonu başlat
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 100) // Küçük bir gecikme ile başlat
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
    <div 
      className={`bg-white p-8 rounded-lg shadow-xl min-h-[400px] flex flex-col transition-all duration-1000 ease-out ${
        isVisible 
          ? 'opacity-100 translate-y-0' 
          : 'opacity-0 -translate-y-12'
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
        <div className="flex-1">{renderStep()}</div>

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
  )
}

