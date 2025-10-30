'use client'

import React, { useState } from 'react'
import { motion } from 'motion/react'
import { Breadcrumb } from '@/components/Breadcrumb'
import Link from 'next/link'

interface Question {
  id: number
  question: string
  type: 'text' | 'select' | 'radio' | 'textarea'
  options?: string[]
  required: boolean
  category: string
}

interface EligibilityResult {
  eligible: boolean
  score: number
  level: string
  description: string
  recommendations: string[]
  nextSteps: string[]
}

// Visa-specific questions organized by category
const visaSpecificQuestions: Record<string, Record<string, Question[]>> = {
  'Visitor Visa': {
    'About you': [
      { id: 101, question: "Nationality", type: 'text', required: true, category: "About you" },
      { id: 102, question: "Current location", type: 'select', options: ['In the UK', 'Outside the UK'], required: true, category: "About you" },
      { id: 103, question: "Age", type: 'select', options: ['Under 18', '18-30', '31-45', '46-60', 'Over 60'], required: true, category: "About you" },
      { id: 104, question: "English level", type: 'select', options: ['None / basic', 'Intermediate', 'Advanced / fluent'], required: true, category: "About you" },
    ],
    'Family & private life': [
      { id: 105, question: "Partner in the UK?", type: 'select', options: ['Yes', 'No'], required: true, category: "Family & private life" },
      { id: 106, question: "Married / 2+ years together?", type: 'select', options: ['Yes', 'No'], required: true, category: "Family & private life" },
      { id: 107, question: "Children in the UK?", type: 'select', options: ['Yes', 'No'], required: true, category: "Family & private life" },
      { id: 108, question: "Years you've lived in the UK (total)", type: 'select', options: ['0', '0-2 years', '2-5 years', '5-10 years', '10+ years'], required: true, category: "Family & private life" },
    ],
    'Work & study': [
      { id: 109, question: "Do you have a UK job offer?", type: 'select', options: ['Yes', 'No'], required: true, category: "Work & study" },
      { id: 110, question: "Purpose of visit", type: 'select', options: ['Tourism', 'Business', 'Family visit', 'Medical'], required: true, category: "Work & study" },
      { id: 111, question: "Duration of stay", type: 'select', options: ['Less than 6 months', '6-12 months'], required: true, category: "Work & study" },
    ],
    'Other factors': [
      { id: 112, question: "Any Home Office refusal in last 12 months?", type: 'select', options: ['Yes', 'No'], required: true, category: "Other factors" },
      { id: 113, question: "Priority speed required?", type: 'select', options: ['Yes', 'No'], required: true, category: "Other factors" },
    ],
  },
  'Student Visa': {
    'About you': [
      { id: 201, question: "Nationality", type: 'text', required: true, category: "About you" },
      { id: 202, question: "Current location", type: 'select', options: ['In the UK', 'Outside the UK'], required: true, category: "About you" },
      { id: 203, question: "Age", type: 'select', options: ['Under 18', '18-30', '31-45', '46-60', 'Over 60'], required: true, category: "About you" },
      { id: 204, question: "English level", type: 'select', options: ['None / basic', 'Intermediate', 'Advanced / fluent'], required: true, category: "About you" },
    ],
    'Family & private life': [
      { id: 205, question: "Partner in the UK?", type: 'select', options: ['Yes', 'No'], required: true, category: "Family & private life" },
      { id: 206, question: "Children in the UK?", type: 'select', options: ['Yes', 'No'], required: true, category: "Family & private life" },
      { id: 207, question: "Years you've lived in the UK (total)", type: 'select', options: ['0', '0-2 years', '2-5 years', '5-10 years', '10+ years'], required: true, category: "Family & private life" },
    ],
    'Work & study': [
      { id: 208, question: "Course you plan to study", type: 'text', required: true, category: "Work & study" },
      { id: 209, question: "Institution (licensed provider)", type: 'text', required: true, category: "Work & study" },
      { id: 210, question: "Course level", type: 'select', options: ['Undergraduate', 'Postgraduate', 'PhD', 'Language course'], required: true, category: "Work & study" },
      { id: 211, question: "Course duration", type: 'select', options: ['Less than 1 year', '1 year', '2 years', '3+ years'], required: true, category: "Work & study" },
    ],
    'Other factors': [
      { id: 212, question: "Any Home Office refusal in last 12 months?", type: 'select', options: ['Yes', 'No'], required: true, category: "Other factors" },
      { id: 213, question: "Priority speed required?", type: 'select', options: ['Yes', 'No'], required: true, category: "Other factors" },
    ],
  },
  'Work Visa': {
    'About you': [
      { id: 301, question: "Nationality", type: 'text', required: true, category: "About you" },
      { id: 302, question: "Current location", type: 'select', options: ['In the UK', 'Outside the UK'], required: true, category: "About you" },
      { id: 303, question: "Age", type: 'select', options: ['Under 18', '18-30', '31-45', '46-60', 'Over 60'], required: true, category: "About you" },
      { id: 304, question: "English level", type: 'select', options: ['None / basic', 'Intermediate', 'Advanced / fluent'], required: true, category: "About you" },
    ],
    'Family & private life': [
      { id: 305, question: "Partner in the UK?", type: 'select', options: ['Yes', 'No'], required: true, category: "Family & private life" },
      { id: 306, question: "Children in the UK?", type: 'select', options: ['Yes', 'No'], required: true, category: "Family & private life" },
    ],
    'Work & study': [
      { id: 307, question: "Do you have a UK job offer?", type: 'select', options: ['Yes', 'No'], required: true, category: "Work & study" },
      { id: 308, question: "Employer has/will get Sponsor Licence?", type: 'select', options: ['Yes', 'No', 'N/A'], required: true, category: "Work & study" },
      { id: 309, question: "Gross salary (if job offer)", type: 'text', required: false, category: "Work & study" },
      { id: 310, question: "Job title", type: 'text', required: false, category: "Work & study" },
    ],
    'Other factors': [
      { id: 311, question: "Any Home Office refusal in last 12 months?", type: 'select', options: ['Yes', 'No'], required: true, category: "Other factors" },
      { id: 312, question: "Priority speed required?", type: 'select', options: ['Yes', 'No'], required: true, category: "Other factors" },
    ],
  },
  'Spouse Visa': {
    'About you': [
      { id: 401, question: "Nationality", type: 'text', required: true, category: "About you" },
      { id: 402, question: "Current location", type: 'select', options: ['In the UK', 'Outside the UK'], required: true, category: "About you" },
      { id: 403, question: "Age", type: 'select', options: ['Under 18', '18-30', '31-45', '46-60', 'Over 60'], required: true, category: "About you" },
      { id: 404, question: "English level", type: 'select', options: ['None / basic', 'Intermediate', 'Advanced / fluent'], required: true, category: "About you" },
    ],
    'Family & private life': [
      { id: 405, question: "Partner is British/EU?", type: 'select', options: ['Yes', 'No'], required: true, category: "Family & private life" },
      { id: 406, question: "Married / 2+ years together?", type: 'select', options: ['Yes', 'No'], required: true, category: "Family & private life" },
      { id: 407, question: "Children in the UK?", type: 'select', options: ['Yes', 'No'], required: true, category: "Family & private life" },
      { id: 408, question: "Partner's annual income", type: 'select', options: ['Under £18,600', '£18,600-£25,000', '£25,000-£35,000', '£35,000+'], required: true, category: "Family & private life" },
    ],
    'Work & study': [
      { id: 409, question: "Partner employed in UK?", type: 'select', options: ['Yes', 'No'], required: true, category: "Work & study" },
    ],
    'Other factors': [
      { id: 410, question: "Any Home Office refusal in last 12 months?", type: 'select', options: ['Yes', 'No'], required: true, category: "Other factors" },
      { id: 411, question: "Priority speed required?", type: 'select', options: ['Yes', 'No'], required: true, category: "Other factors" },
    ],
  },
}

const getEligibilityResult = (answers: Record<number, string>, visaType: string): EligibilityResult => {
  let score = 0
  const allQuestions = Object.values(visaSpecificQuestions[visaType] || {}).flat()
  const totalQuestions = allQuestions.length
  
  // Calculate score based on answers
  Object.entries(answers).forEach(([questionId, answer]) => {
    const id = parseInt(questionId)
    
    // Positive scoring
    if (answer === 'Yes' && [105, 106, 107, 109, 208, 209, 307, 308, 405, 406, 407, 409].includes(id)) {
      score += 2
    } else if (answer === 'No' && [112, 212, 311, 410].includes(id)) {
      score += 2
    } else if (answer && answer !== 'No' && answer !== 'Yes' && answer !== 'N/A') {
      score += 1
    }
  })

  const percentage = Math.round((score / (totalQuestions * 2)) * 100)

  if (percentage >= 80) {
    return {
      eligible: true,
      score,
      level: "Highly Eligible",
      description: `Excellent! You scored ${score} points (${percentage}%).`,
      recommendations: [
        "You have strong eligibility indicators",
        "Consider professional review for complex cases"
      ],
      nextSteps: ["Review your documentation", "Plan your application timeline"]
    }
  } else if (percentage >= 60) {
    return {
      eligible: true,
      score,
      level: "Eligible",
      description: `Good! You scored ${score} points (${percentage}%).`,
      recommendations: [
        "Address any identified issues",
        "Gather supporting documents"
      ],
      nextSteps: ["Prepare application", "Consult professional if needed"]
    }
  } else if (percentage >= 40) {
    return {
      eligible: false,
      score,
      level: "Partially Eligible",
      description: `You scored ${score} points (${percentage}%).`,
      recommendations: [
        "Address all identified issues",
        "Consider professional consultation"
      ],
      nextSteps: ["Consult immigration specialist", "Review alternative options"]
    }
  } else {
    return {
      eligible: false,
      score,
      level: "Needs Assessment",
      description: `You scored ${score} points (${percentage}%).`,
      recommendations: [
        "Consult with immigration specialist",
        "Review all requirements carefully"
      ],
      nextSteps: ["Book professional consultation", "Explore alternative routes"]
    }
  }
}

export const EligibilityCheckComponent: React.FC = () => {
  const [selectedVisaType, setSelectedVisaType] = useState<string>('')
  const [showResult, setShowResult] = useState(false)
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const [showVisaTypeSelection, setShowVisaTypeSelection] = useState(true)

  const handleAnswerChange = (questionId: number, value: string) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: value
    }))
  }

  const resetForm = () => {
    setAnswers({})
    setShowResult(false)
  }

  const handleVisaTypeSelect = (visaType: string) => {
    setSelectedVisaType(visaType)
    setShowVisaTypeSelection(false)
    // Set default values for the selected visa type
    const defaultAnswers: Record<string, Record<number, string>> = {
      'Visitor Visa': { 102: 'Outside the UK', 103: '18-30', 104: 'None / basic', 105: 'No', 106: 'No', 107: 'No', 108: '0', 109: 'No', 112: 'No', 113: 'No' },
      'Student Visa': { 202: 'Outside the UK', 203: '18-30', 204: 'None / basic', 205: 'No', 206: 'No', 207: '0', 212: 'No', 213: 'No' },
      'Work Visa': { 302: 'Outside the UK', 303: '18-30', 304: 'None / basic', 305: 'No', 306: 'No', 307: 'No', 308: 'No', 311: 'No', 312: 'No' },
      'Spouse Visa': { 402: 'Outside the UK', 403: '18-30', 404: 'None / basic', 405: 'Yes', 406: 'No', 407: 'No', 409: 'Yes', 410: 'No', 411: 'No' },
    }
    setAnswers(defaultAnswers[visaType] || {})
  }

  const handleSubmit = () => {
    setShowResult(true)
  }

  const handleBackToSelection = () => {
    setShowVisaTypeSelection(true)
    setSelectedVisaType('')
    setAnswers({})
    setShowResult(false)
  }

  const currentQuestions = selectedVisaType ? visaSpecificQuestions[selectedVisaType] || {} : {}

  if (showResult) {
    const result = getEligibilityResult(answers, selectedVisaType)
    
    return (
      <div className="min-h-screen bg-gray-50 py-6 md:py-8 md:mt-20">
        <div className="container mx-auto px-4 sm:px-4 md:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-2xl shadow-xl p-4 md:p-6 lg:p-8"
            >
              <div className="text-center mb-6 md:mb-8">
                <div className={`inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-full mb-4 ${
                  result.eligible ? 'bg-green-100' : 'bg-yellow-100'
                }`}>
                  <span className={`text-xl md:text-2xl ${result.eligible ? 'text-green-600' : 'text-yellow-600'}`}>
                    {result.score}
                  </span>
                </div>
                <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">{result.level}</h2>
                <p className="text-base md:text-lg text-gray-600">{result.description}</p>
              </div>

              <div className="mb-6 md:mb-8">
                <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-3 md:mb-4">Recommendations</h3>
                <ul className="space-y-2 md:space-y-3">
                  {result.recommendations.map((rec, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-blue-600 mr-3 mt-1">•</span>
                      <span className="text-sm md:text-base text-gray-700">{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
                <button
                  onClick={() => {
                    setShowResult(false)
                    resetForm()
                  }}
                  className="w-full sm:w-auto px-6 md:px-8 py-2 md:py-3 text-sm md:text-base bg-gray-500 text-white font-semibold rounded-lg hover:bg-gray-600 transition-colors"
                >
                  Reset
                </button>
                <Link
                  href="/contact"
                  className="w-full sm:w-auto px-6 md:px-8 py-2 md:py-3 text-sm md:text-base bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors text-center"
                >
                  Send Enquiry to UK Legal Solutions
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    )
  }

  if (showVisaTypeSelection) {
    return (
      <div className="min-h-screen bg-gray-50 py-6 md:py-8 md:mt-20"> 
        <Breadcrumb items={[{ label: 'Smart Eligibility & Route Finder' }]} />
        
        <div className="container mx-auto px-4 sm:px-4 md:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* Header */}
              <div className="text-center mb-8 md:mb-12 px-4">
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-900 mb-3 md:mb-4">
                  Smart Eligibility & Route Finder
                </h1>
                <p className="text-sm md:text-base lg:text-lg text-gray-700 max-w-2xl mx-auto">
                  Answer a few questions and we&apos;ll suggest the best immigration route(s). 
                  Then send your enquiry to UK Legal Solutions. This is an initial screening only and not legal advice.
                </p>
              </div>

              {/* Visa Type Selection */}
              <div className="bg-white rounded-2xl shadow-xl p-4 md:p-6 lg:p-8">
                <h2 className="text-lg md:text-xl font-bold text-gray-900 mb-4 md:mb-6">Select a visa type to begin:</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                  {Object.keys(visaSpecificQuestions).map((visaType) => (
                    <button
                      key={visaType}
                      onClick={() => handleVisaTypeSelect(visaType)}
                      className="p-4 md:p-6 bg-blue-50 hover:bg-blue-100 rounded-lg border-2 border-blue-200 hover:border-blue-400 transition-all text-left"
                    >
                      <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-2">{visaType}</h3>
                      <p className="text-xs md:text-sm text-gray-600">
                        {Object.values(visaSpecificQuestions[visaType]).flat().length} questions
                      </p>
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-6 md:py-8 md:mt-20">
      <Breadcrumb items={[{ label: 'Smart Eligibility & Route Finder' }]} />
      
      <div className="container mx-auto px-4 sm:px-4 md:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Header */}
            <div className="text-center mb-8 md:mb-12 px-4">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-900 mb-3 md:mb-4">
                Smart Eligibility & Route Finder
              </h1>
              <p className="text-sm md:text-base lg:text-lg text-gray-700 max-w-2xl mx-auto">
                Answer a few questions and we&apos;ll suggest the best immigration route(s). 
                Then send your enquiry to UK Legal Solutions. This is an initial screening only and not legal advice.
              </p>
              
              {/* Steps */}
              <div className="flex flex-col sm:flex-row justify-center items-center mt-6 md:mt-8 space-y-2 sm:space-y-0 sm:space-x-4 md:space-x-8 px-4">
                <div className="flex items-center">
                  <div className="w-8 h-8 md:w-12 md:h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm md:text-base font-bold">
                    1
                  </div>
                  <span className="ml-2 md:ml-3 text-xs sm:text-sm md:text-base font-semibold text-gray-900">Screening</span>
                </div>
                <div className="hidden sm:block w-12 md:w-16 h-0.5 bg-gray-300"></div>
                <div className="flex items-center">
                  <div className="w-8 h-8 md:w-12 md:h-12 bg-gray-200 text-gray-600 rounded-full flex items-center justify-center text-sm md:text-base font-bold">
                    2
                  </div>
                  <span className="ml-2 md:ml-3 text-xs sm:text-sm md:text-base text-gray-600">Route recommendation</span>
                </div>
                <div className="hidden sm:block w-12 md:w-16 h-0.5 bg-gray-300"></div>
                <div className="flex items-center">
                  <div className="w-8 h-8 md:w-12 md:h-12 bg-gray-200 text-gray-600 rounded-full flex items-center justify-center text-sm md:text-base font-bold">
                    3
                  </div>
                  <span className="ml-2 md:ml-3 text-xs sm:text-sm md:text-base text-gray-600">Consultation</span>
                </div>
              </div>

              {/* Selected Visa Type */}
              <div className="mt-4 md:mt-6 inline-block bg-blue-100 text-blue-800 text-xs md:text-sm font-semibold px-3 md:px-4 py-1 md:py-2 rounded-full">
                Selected: {selectedVisaType}
              </div>
            </div>

            {/* Form */}
            <div className="bg-white rounded-2xl shadow-xl p-4 md:p-6 lg:p-8">
              {Object.entries(currentQuestions).map(([category, questions]) => (
                <div key={category} className="mb-6 md:mb-8">
                  <h2 className="text-lg md:text-xl font-bold text-gray-900 mb-3 md:mb-4 border-b pb-2">
                    {category}
                  </h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                    {questions.map((question) => (
                      <div key={question.id}>
                        <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1 md:mb-2">
                          {question.question} {question.required && <span className="text-red-500">*</span>}
                        </label>
                        
                        {question.type === 'text' && (
                          <input
                            type="text"
                            value={answers[question.id] || ''}
                            onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                            placeholder={question.question}
                            className="w-full px-3 md:px-4 py-2 text-sm md:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        )}
                        
                        {question.type === 'select' && (
                          <select
                            value={answers[question.id] || ''}
                            onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                            className="w-full px-3 md:px-4 py-2 text-sm md:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          >
                            <option value="">Select an option</option>
                            {question.options?.map((option) => (
                              <option key={option} value={option}>{option}</option>
                            ))}
                          </select>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-between">
                <button
                  onClick={handleBackToSelection}
                  className="w-full sm:w-auto px-6 md:px-8 py-2 md:py-3 text-sm md:text-base bg-gray-500 text-white font-semibold rounded-lg hover:bg-gray-600 transition-colors"
                >
                  ← Back to Selection
                </button>
                <div className="flex flex-col sm:flex-row gap-3 md:gap-4 w-full sm:w-auto">
                  <button
                    onClick={resetForm}
                    className="w-full sm:w-auto px-6 md:px-8 py-2 md:py-3 text-sm md:text-base bg-white border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Reset
                  </button>
                  <button
                    onClick={handleSubmit}
                    className="w-full sm:w-auto px-6 md:px-8 py-2 md:py-3 text-sm md:text-base bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Assess routes
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default EligibilityCheckComponent
