'use client'

import React, { useState } from 'react'
import { CheckCircle, Award, FileText, ArrowRight, ArrowLeft, Loader2 } from 'lucide-react'
import { eligibilityQuestions } from './EligibilityTestQuestions'
import { MAIN_VISA_CATEGORIES, VISA_APPLICATION_OPTIONS, LEAVE_TO_REMAIN_OPTIONS, ILR_OPTIONS, BRITISH_CITIZENSHIP_OPTIONS, REFUSED_APPEALS_OPTIONS, BUSINESS_IMMIGRATION_OPTIONS, VISA_TYPE_MAPPING } from './visaTypeConfig'
import { visaSpecificQuestions } from './visaSpecificQuestions'


interface EligibilityTestFormProps {
  maxQuestions?: number
  showProgress?: boolean
  onComplete?: () => void
  className?: string
  testMode?: boolean
}

export const EligibilityTestForm: React.FC<EligibilityTestFormProps> = ({
  maxQuestions = 20,
  showProgress = true,
  onComplete: _onComplete,
  className = '',
  testMode = false
}) => {
  const [currentStep, setCurrentStep] = useState(1)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const [isSaving, setIsSaving] = useState(false)
  const [saveStatus, setSaveStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [selectedVisaType, setSelectedVisaType] = useState<string>('')
  const [showVisaTypeSelection, setShowVisaTypeSelection] = useState(true)
  const [showVisaSubTypeSelection, setShowVisaSubTypeSelection] = useState(false)
  const [selectedVisaCategory, setSelectedVisaCategory] = useState<string | null>(null)

  // Get questions based on selected visa type or default questions
  const getMappedVisaType = (visaType: string): string => {
    return VISA_TYPE_MAPPING[visaType] || visaType
  }

  const questions = selectedVisaType 
    ? (visaSpecificQuestions[getMappedVisaType(selectedVisaType)] || visaSpecificQuestions['Visitor Visa'] || eligibilityQuestions.slice(0, maxQuestions))
    : eligibilityQuestions.slice(0, maxQuestions)
  const totalSteps = questions.length > 0 ? Math.max(...questions.map(q => q.step), 1) : 1
  const currentStepQuestions = questions.filter(q => q.step === currentStep)

  const handleAnswerChange = (questionId: number, value: string) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: value
    }))
  }

  const isValidEmail = (email: string) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    return emailRegex.test(email)
  }

  const saveEligibilitySubmission = async (answers: Record<number, string>) => {
    try {
      setIsSaving(true)
      setSaveStatus('idle')

      // Helper function to find answer by question text pattern
      const findAnswerByQuestion = (pattern: string): string => {
        const question = questions.find(q => 
          q.question.toLowerCase().includes(pattern.toLowerCase())
        )
        return question ? (answers[question.id] || '') : ''
      }

      // Find answers by question text patterns instead of ID offsets
      const fullName = findAnswerByQuestion('full name') || findAnswerByQuestion('name') || 'Unknown'
      const dateOfBirth = findAnswerByQuestion('date of birth') || findAnswerByQuestion('birth') || new Date().toISOString().split('T')[0]
      const nationality = findAnswerByQuestion('nationality') || 'Unknown'
      const gender = findAnswerByQuestion('gender') || 'Prefer not to say'
      const email = findAnswerByQuestion('email') || 'noreply@example.com'
      const phone = findAnswerByQuestion('phone') || findAnswerByQuestion('contact') || ''
      const passportNumber = findAnswerByQuestion('passport number') || ''
      const passportExpiry = findAnswerByQuestion('passport expire') || findAnswerByQuestion('expire') || ''
      const passportIssuedBy = findAnswerByQuestion('passport issued') || findAnswerByQuestion('issued') || ''
      const visitPurpose = findAnswerByQuestion('purpose') || findAnswerByQuestion('visit') || 'Other'
      
      // Validate required fields and provide defaults
      const validDateOfBirth = dateOfBirth || new Date(Date.now() - 30 * 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
      const validPassportExpiry = passportExpiry || new Date(Date.now() + 5 * 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
      
      // Form verilerini collection'a gönder (sadece form verileri, sonuç hesaplama yok)
      const submissionData = {
        fullName,
        dateOfBirth: validDateOfBirth,
        nationality,
        gender,
        email,
        phone: phone || 'Not provided',
        passportNumber: passportNumber || 'Not provided',
        passportExpiry: validPassportExpiry,
        passportIssuedBy: passportIssuedBy || 'Not provided',
        visaType: selectedVisaType || 'Visitor Visa',
        applicationFor: 'myself',
        visitPurpose: visitPurpose || 'Other',
        previousUKVisa: findAnswerByQuestion('visited') || findAnswerByQuestion('before') || 'no',
        visaRefusal: findAnswerByQuestion('refusal') || 'no',
        criminalConvictions: findAnswerByQuestion('criminal') || findAnswerByQuestion('conviction') || 'no',
        sufficientFunds: findAnswerByQuestion('fund') || findAnswerByQuestion('money') || 'yes',
        familyInUK: findAnswerByQuestion('family') || findAnswerByQuestion('friends') || 'no',
        familyRelationship: findAnswerByQuestion('relationship') || '',
        ukSponsor: findAnswerByQuestion('sponsor') || 'no',
        additionalInfo: JSON.stringify(answers)
      }


      const response = await fetch('/api/eligibility-submissions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submissionData),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        console.error('Form submission error:', errorData)
        throw new Error(errorData.details || errorData.error || 'Form gönderilemedi')
      }

      if (response.ok) {
        setSaveStatus('success')
      }
    } catch (error) {
      console.error('Eligibility submission save error:', error)
      setSaveStatus('error')
      // Kullanıcıya hata mesajı göster
      if (error instanceof Error) {
        alert(`Form gönderilirken hata oluştu: ${error.message}`)
      }
    } finally {
      setIsSaving(false)
    }
  }

  const handleNext = async () => {
    // Email validation for email type questions
    const currentQuestion = currentStepQuestions[currentQuestionIndex]
    if (currentQuestion?.type === 'email' && answers[currentQuestion.id]) {
      if (!isValidEmail(answers[currentQuestion.id])) {
        alert('Please enter a valid email address')
        return
      }
    }

    // Test mode için hızlı gönderim
    if (testMode && currentQuestionIndex >= 1) {
      await saveEligibilitySubmission(answers)
      return
    }

    if (currentQuestionIndex < currentStepQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    } else if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
      setCurrentQuestionIndex(0)
    } else {
      // Test completed - save to database (sonuç hesaplama yok)
      await saveEligibilitySubmission(answers)
    }
  }

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1)
    } else if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
      const prevStepQuestions = questions.filter(q => q.step === currentStep - 1)
      setCurrentQuestionIndex(prevStepQuestions.length - 1)
    }
  }

  const currentQuestion = currentStepQuestions[currentQuestionIndex]
  const totalQuestions = questions.length
  const currentQuestionNumber = currentQuestion ? questions.findIndex(q => q.id === currentQuestion.id) + 1 : 0
  const progress = totalQuestions > 0 ? (currentQuestionNumber / totalQuestions) * 100 : 0

  // Visa type selection screen
  if (showVisaTypeSelection) {
    // Eğer alt kategori ekranı aktifse
    if (showVisaSubTypeSelection) {
      // Visa Applications alt menüsü
      if (selectedVisaCategory === 'Visa Applications') {
        return (
          <div className={`bg-white rounded-2xl shadow-xl p-4 ${className}`}>
            <div className="flex items-center justify-between mb-4">
              <button
                onClick={() => {
                  setShowVisaSubTypeSelection(false)
                  setSelectedVisaCategory(null)
                }}
                className="flex items-center text-sm text-gray-600 hover:text-gray-900"
              >
                <ArrowLeft className="w-4 h-4 mr-1" />
                Back
              </button>
              <h2 className="text-base font-bold text-gray-900">
                Visa Applications
              </h2>
              <div className="w-8" />
            </div>

            <div className="bg-slate-800 rounded-xl p-3 text-white shadow-lg">
              <p className="text-xs text-slate-200 mb-3 px-1">
                Select the visa you are applying for
              </p>
              <div className="space-y-1">
                {VISA_APPLICATION_OPTIONS.map(option => (
                  <button
                    key={option}
                    onClick={() => {
                      setSelectedVisaType(option)
                      setShowVisaTypeSelection(false)
                      setShowVisaSubTypeSelection(false)
                      setCurrentStep(1)
                      setCurrentQuestionIndex(0)
                      setAnswers({})
                    }}
                    className="w-full text-left px-3 py-2 rounded-md text-sm hover:bg-slate-700 transition-colors"
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )
      }

      // Leave to Remain alt menüsü
      if (selectedVisaCategory === 'Leave to Remain') {
        return (
          <div className={`bg-white rounded-2xl shadow-xl p-4 ${className}`}>
            <div className="flex items-center justify-between mb-4">
              <button
                onClick={() => {
                  setShowVisaSubTypeSelection(false)
                  setSelectedVisaCategory(null)
                }}
                className="flex items-center text-sm text-gray-600 hover:text-gray-900"
              >
                <ArrowLeft className="w-4 h-4 mr-1" />
                Back
              </button>
              <h2 className="text-base font-bold text-gray-900">
                Leave to Remain
              </h2>
              <div className="w-8" />
            </div>

            <div className="bg-slate-800 rounded-xl p-3 text-white shadow-lg">
              <p className="text-xs text-slate-200 mb-3 px-1">
                Select the route you are applying under
              </p>
              <div className="space-y-1">
                {LEAVE_TO_REMAIN_OPTIONS.map(option => (
                  <button
                    key={option}
                    onClick={() => {
                      setSelectedVisaType(option)
                      setShowVisaTypeSelection(false)
                      setShowVisaSubTypeSelection(false)
                      setCurrentStep(1)
                      setCurrentQuestionIndex(0)
                      setAnswers({})
                    }}
                    className="w-full text-left px-3 py-2 rounded-md text-sm hover:bg-slate-700 transition-colors"
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )
      }

      // Indefinite Leave to Remain alt menüsü
      if (selectedVisaCategory === 'Indefinite leave to remain') {
        return (
          <div className={`bg-white rounded-2xl shadow-xl p-4 ${className}`}>
            <div className="flex items-center justify-between mb-4">
              <button
                onClick={() => {
                  setShowVisaSubTypeSelection(false)
                  setSelectedVisaCategory(null)
                }}
                className="flex items-center text-sm text-gray-600 hover:text-gray-900"
              >
                <ArrowLeft className="w-4 h-4 mr-1" />
                Back
              </button>
              <h2 className="text-base font-bold text-gray-900">
                Indefinite Leave to Remain
              </h2>
              <div className="w-8" />
            </div>

            <div className="bg-slate-800 rounded-xl p-3 text-white shadow-lg">
              <p className="text-xs text-slate-200 mb-3 px-1">
                Select the ILR route you are applying under
              </p>
              <div className="space-y-1">
                {ILR_OPTIONS.map(option => (
                  <button
                    key={option}
                    onClick={() => {
                      setSelectedVisaType(option)
                      setShowVisaTypeSelection(false)
                      setShowVisaSubTypeSelection(false)
                      setCurrentStep(1)
                      setCurrentQuestionIndex(0)
                      setAnswers({})
                    }}
                    className="w-full text-left px-3 py-2 rounded-md text-sm hover:bg-slate-700 transition-colors"
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )
      }

      // British citizenship alt menüsü
      if (selectedVisaCategory === 'British citizenship') {
        return (
          <div className={`bg-white rounded-2xl shadow-xl p-4 ${className}`}>
            <div className="flex items-center justify-between mb-4">
              <button
                onClick={() => {
                  setShowVisaSubTypeSelection(false)
                  setSelectedVisaCategory(null)
                }}
                className="flex items-center text-sm text-gray-600 hover:text-gray-900"
              >
                <ArrowLeft className="w-4 h-4 mr-1" />
                Back
              </button>
              <h2 className="text-base font-bold text-gray-900">
                British Citizenship
              </h2>
              <div className="w-8" />
            </div>

            <div className="bg-slate-800 rounded-xl p-3 text-white shadow-lg">
              <p className="text-xs text-slate-200 mb-3 px-1">
                Select the route you are applying under
              </p>
              <div className="space-y-1">
                {BRITISH_CITIZENSHIP_OPTIONS.map(option => (
                  <button
                    key={option}
                    onClick={() => {
                      setSelectedVisaType(option)
                      setShowVisaTypeSelection(false)
                      setShowVisaSubTypeSelection(false)
                      setCurrentStep(1)
                      setCurrentQuestionIndex(0)
                      setAnswers({})
                    }}
                    className="w-full text-left px-3 py-2 rounded-md text-sm hover:bg-slate-700 transition-colors"
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )
      }

      // Refused Appeals alt menüsü
      if (selectedVisaCategory === 'Refused Appeals') {
        return (
          <div className={`bg-white rounded-2xl shadow-xl p-4 ${className}`}>
            <div className="flex items-center justify-between mb-4">
              <button
                onClick={() => {
                  setShowVisaSubTypeSelection(false)
                  setSelectedVisaCategory(null)
                }}
                className="flex items-center text-sm text-gray-600 hover:text-gray-900"
              >
                <ArrowLeft className="w-4 h-4 mr-1" />
                Back
              </button>
              <h2 className="text-base font-bold text-gray-900">
                Refused Appeals
              </h2>
              <div className="w-8" />
            </div>

            <div className="bg-slate-800 rounded-xl p-3 text-white shadow-lg">
              <p className="text-xs text-slate-200 mb-3 px-1">
                Select the appeal route you are applying under
              </p>
              <div className="space-y-1">
                {REFUSED_APPEALS_OPTIONS.map(option => (
                  <button
                    key={option}
                    onClick={() => {
                      setSelectedVisaType(option)
                      setShowVisaTypeSelection(false)
                      setShowVisaSubTypeSelection(false)
                      setCurrentStep(1)
                      setCurrentQuestionIndex(0)
                      setAnswers({})
                    }}
                    className="w-full text-left px-3 py-2 rounded-md text-sm hover:bg-slate-700 transition-colors"
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )
      }

      // Business Immigration alt menüsü
      if (selectedVisaCategory === 'Business Immigration') {
        return (
          <div className={`bg-white rounded-2xl shadow-xl p-4 ${className}`}>
            <div className="flex items-center justify-between mb-4">
              <button
                onClick={() => {
                  setShowVisaSubTypeSelection(false)
                  setSelectedVisaCategory(null)
                }}
                className="flex items-center text-sm text-gray-600 hover:text-gray-900"
              >
                <ArrowLeft className="w-4 h-4 mr-1" />
                Back
              </button>
              <h2 className="text-base font-bold text-gray-900">
                Business Immigration
              </h2>
              <div className="w-8" />
            </div>

            <div className="bg-slate-800 rounded-xl p-3 text-white shadow-lg">
              <p className="text-xs text-slate-200 mb-3 px-1">
                Select the route you are applying under
              </p>
              <div className="space-y-1">
                {BUSINESS_IMMIGRATION_OPTIONS.map(option => (
                  <button
                    key={option}
                    onClick={() => {
                      setSelectedVisaType(option)
                      setShowVisaTypeSelection(false)
                      setShowVisaSubTypeSelection(false)
                      setCurrentStep(1)
                      setCurrentQuestionIndex(0)
                      setAnswers({})
                    }}
                    className="w-full text-left px-3 py-2 rounded-md text-sm hover:bg-slate-700 transition-colors"
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )
      }
    }

    // Ana kategori seçim ekranı
    return (
      <div className={`bg-white rounded-2xl shadow-xl p-3 ${className}`}>
        <div className="text-center mb-3">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Select Your Visa Type - Start Check Eligibility</h2>
          <p className="text-gray-600 mb-6">Choose the visa type you&apos;re applying for to get personalized questions</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-stretch">
          {MAIN_VISA_CATEGORIES.map((visa, index) => (
            <button
              key={index}
              onClick={() => {
                if (
                  visa.type === 'Visa Applications' ||
                  visa.type === 'Leave to Remain' ||
                  visa.type === 'Indefinite leave to remain' ||
                  visa.type === 'British citizenship' ||
                  visa.type === 'Refused Appeals' ||
                  visa.type === 'Business Immigration'
                ) {
                  setSelectedVisaCategory(visa.type)
                  setShowVisaSubTypeSelection(true)
                  return
                }
                setSelectedVisaType(visa.type)
                setShowVisaTypeSelection(false)
                setCurrentStep(1)
                setCurrentQuestionIndex(0)
                setAnswers({})
              }}
              className="relative p-2 border-2 border-gray-300 rounded-xl transition-all duration-300 text-left group bg-white hover:bg-gradient-to-br items-center justify-center hover:from-blue-50 hover:to-indigo-50 shadow-md hover:shadow-xl transform hover:-translate-y-1 overflow-hidden h-full min-h-[50px] flex flex-col"
            >
              <div className="relative z-10">
                <h3 className="font-bold text-sm from-blue-800 bg-clip-text group-hover:opacity-90 transition-all duration-300">
                  {visa.type}
                </h3>
              </div>
            </button>
          ))}
        </div>
      </div>
    )
  }

  // Başarı mesajı ekranı (sonuç hesaplama yok, sadece form gönderildi mesajı)
  if (saveStatus === 'success') {
    return (
      <div className={`bg-white rounded-2xl shadow-xl p-6 ${className}`}>
        <div className="text-center mb-6">
          <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3 bg-green-100">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">
            Your form has been submitted successfully!
          </h2>
        </div>

        <div className="space-y-4">
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <CheckCircle className="w-5 h-5 text-green-600" />
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-semibold text-green-900 mb-1">Form Submitted Successfully</h3>
                <p className="text-green-800 text-sm leading-relaxed">
                  Your information has been received. We will contact you with definitive results for your visa eligibility assessment.
                </p>
              </div>
            </div>
          </div>

          <div className="text-center">
            <button
              onClick={() => {
                setCurrentStep(1)
                setCurrentQuestionIndex(0)
                setAnswers({})
                setSaveStatus('idle')
                setIsSaving(false)
                setSelectedVisaType('')
                setShowVisaTypeSelection(true)
              }}
              className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-300 text-sm"
            >
              Take Test Again
            </button>
          </div>
        </div>
      </div>
    )
  }

  // Hata durumu
  if (saveStatus === 'error') {
    return (
      <div className={`bg-white rounded-2xl shadow-xl p-6 ${className}`}>
        <div className="text-center mb-6">
          <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3 bg-red-100">
            <Award className="w-8 h-8 text-red-600" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">
            Submission Error
          </h2>
        </div>

        <div className="space-y-4">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <Award className="w-5 h-5 text-red-600" />
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-semibold text-red-900 mb-1">Error</h3>
                <p className="text-red-800 text-sm leading-relaxed">
                  There was an error submitting your form. Please try again.
                </p>
              </div>
            </div>
          </div>

          <div className="text-center">
            <button
              onClick={() => {
                setSaveStatus('idle')
                setIsSaving(false)
              }}
              className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-300 text-sm"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    )
  }

  // Show error if no questions available
  if (questions.length === 0 || !currentQuestion) {
    return (
      <div className={`bg-white rounded-2xl shadow-xl p-6 ${className}`}>
        <div className="text-center py-8">
          <div className="text-red-600 mb-4">
            <FileText className="w-12 h-12 mx-auto" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">No Questions Available</h2>
          <p className="text-gray-600 mb-6">
            We couldn&apos;t load questions for the selected visa type. Please try selecting a different visa type.
          </p>
          <button
            onClick={() => {
              setSelectedVisaType('')
              setShowVisaTypeSelection(true)
              setCurrentStep(1)
              setCurrentQuestionIndex(0)
            }}
            className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-300"
          >
            Go Back to Visa Selection
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className={`bg-white rounded-2xl shadow-xl p-6 h-full relative ${className}`}>
      {/* Loading Overlay */}
      {isSaving && (
        <div className="absolute inset-0 bg-white bg-opacity-90 rounded-2xl flex flex-col items-center justify-center z-50">
          <Loader2 className="w-12 h-12 text-blue-600 animate-spin mb-4" />
          <p className="text-gray-700 font-medium text-sm">Submitting your form...</p>
          <p className="text-gray-500 text-xs mt-2">Please wait, this may take a few seconds</p>
        </div>
      )}

      {/* Başlangıca geri dön butonu */}
      <div className="mb-4 flex justify-between items-center">
        <button
          onClick={() => {
            setSelectedVisaType('')
            setShowVisaTypeSelection(true)
            setShowVisaSubTypeSelection(false)
            setSelectedVisaCategory(null)
            setCurrentStep(1)
            setCurrentQuestionIndex(0)
            setAnswers({})
          }}
          className="flex items-center text-xs text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="w-4 h-4 mr-1" />
          Back to visa selection
        </button>
        {selectedVisaType && (
          <span className="text-xs text-gray-500 font-medium">
            Selected: {selectedVisaType}
          </span>
        )}
      </div>

      {/* Progress Bar */}
      {showProgress && (
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-medium text-gray-600">
              Question {currentQuestionNumber} of {totalQuestions}
            </span>
            <span className="text-xs font-medium text-gray-600">
              {currentQuestion?.category}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      )}

      {/* Question */}
      <div className={`mb-6 ${isSaving ? 'opacity-50 pointer-events-none' : ''}`}>
        <div className="mb-4">
          <span className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-1 rounded-full mb-3">
            {currentQuestion?.category}
          </span>
          <h2 className="text-lg font-bold text-gray-900 mb-4">{currentQuestion?.question}</h2>
        </div>

        {/* Answer Options */}
        <div className="space-y-3 mb-6">
          {currentQuestion?.type === 'text' && (
            <input
              type="text"
              value={answers[currentQuestion.id] || ''}
              onChange={(e) => handleAnswerChange(currentQuestion.id, e.target.value)}
              disabled={isSaving}
              className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none text-sm disabled:opacity-50 disabled:cursor-not-allowed"
              placeholder="Enter your answer..."
            />
          )}

          {currentQuestion?.type === 'email' && (
            <input
              type="email"
              value={answers[currentQuestion.id] || ''}
              onChange={(e) => handleAnswerChange(currentQuestion.id, e.target.value)}
              disabled={isSaving}
              className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none text-sm disabled:opacity-50 disabled:cursor-not-allowed"
              placeholder="Enter your email address..."
              required
            />
          )}

          {currentQuestion?.type === 'date' && (
            <input
              type="date"
              value={answers[currentQuestion.id] || ''}
              onChange={(e) => handleAnswerChange(currentQuestion.id, e.target.value)}
              disabled={isSaving}
              className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none text-sm disabled:opacity-50 disabled:cursor-not-allowed"
            />
          )}

          {currentQuestion?.type === 'textarea' && (
            <textarea
              value={answers[currentQuestion.id] || ''}
              onChange={(e) => handleAnswerChange(currentQuestion.id, e.target.value)}
              disabled={isSaving}
              className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none h-24 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
              placeholder="Enter your answer..."
            />
          )}

          {currentQuestion?.type === 'select' && (
            <select
              value={answers[currentQuestion.id] || ''}
              onChange={(e) => handleAnswerChange(currentQuestion.id, e.target.value)}
              disabled={isSaving}
              className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none text-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <option value="">Select an option...</option>
              {currentQuestion.options?.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>
          )}

          {currentQuestion?.type === 'radio' && (
            <div className="space-y-2">
              {currentQuestion.options?.map((option, index) => (
                <label key={index} className={`flex items-center p-2 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer ${isSaving ? 'opacity-50 pointer-events-none' : ''}`}>
                  <input
                    type="radio"
                    name={`question-${currentQuestion.id}`}
                    value={option}
                    checked={answers[currentQuestion.id] === option}
                    onChange={(e) => handleAnswerChange(currentQuestion.id, e.target.value)}
                    disabled={isSaving}
                    className="mr-2 disabled:cursor-not-allowed"
                  />
                  <span className="text-gray-700 text-sm">{option}</span>
                </label>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between">
        <button
          onClick={handlePrevious}
          disabled={(currentStep === 1 && currentQuestionIndex === 0) || isSaving}
          className="flex items-center px-4 py-2 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
        >
          <ArrowLeft className="w-4 h-4 mr-1" />
          Previous
        </button>

        <button
          onClick={handleNext}
          disabled={!answers[currentQuestion?.id || 0] || isSaving}
          className="flex items-center px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
        >
          {isSaving ? (
            <>
              <Loader2 className="w-4 h-4 mr-1 animate-spin" />
              Submitting...
            </>
          ) : (
            <>
              {currentStep === totalSteps && currentQuestionIndex === currentStepQuestions.length - 1 ? 'Complete Test' : 'Next'}
              <ArrowRight className="w-4 h-4 ml-1" />
            </>
          )}
        </button>
      </div>
    </div>
  )
}
