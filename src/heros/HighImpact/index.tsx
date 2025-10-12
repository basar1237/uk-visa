'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import React, { useEffect, useState } from 'react'

import type { Page } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'
import { Button } from '@/components/ui/button'

export const HighImpactHero: React.FC<Page['hero']> = ({ links, media, richText }) => {
  const { setHeaderTheme } = useHeaderTheme()
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<{[key: number]: string}>({})

  useEffect(() => {
    setHeaderTheme('dark')
  })

  const visaQuestions = [
    {
      id: 1,
      question: "Are you over the age of 18?",
      options: ["Yes", "No"]
    },
    {
      id: 2,
      question: "What is your English language level?",
      options: ["B1 and above", "A2", "Beginner level"]
    },
    {
      id: 3,
      question: "Do you have sufficient financial resources for visa application?",
      options: ["Yes", "No", "Uncertain"]
    },
    {
      id: 4,
      question: "Have you traveled to the UK before?",
      options: ["Yes", "No"]
    },
    {
      id: 5,
      question: "What type of visa are you planning to apply for?",
      options: ["Tourist visa", "Student visa", "Work visa", "Family visa"]
    }
  ]

  const handleAnswer = (questionId: number, answer: string) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }))
  }

  const handleNext = () => {
    if (currentQuestion < visaQuestions.length - 1) {
      setCurrentQuestion(prev => prev + 1)
    } else {
      // Test tamamlandı, sonuçları göster
      console.log('Test tamamlandı:', answers)
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1)
    }
  }

  return (
    <div
      className="relative grid items-center justify-center text-white"
      data-theme="dark"
    >
      {/* Background Media with Dark Overlay */}
      <div className="absolute inset-0 z-0">
        {media && typeof media === 'object' && (
          <Media fill imgClassName="-z-10 object-cover" priority resource={media} />
        )}
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black opacity-60" />
      </div>

      <div className="container mb-3 py-3 z-10 relative flex items-center justify-between gap-8">
        <div className="max-w-[40.5rem] md:text-start">
          {richText && <RichText className="mb-6" data={richText} enableGutter={false} />}
          {Array.isArray(links) && links.length > 0 && (
            <ul className="flex md:justify-center gap-4">
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

        {/* UK Visa Eligibility Test */}
        <div className="bg-white rounded-lg p-6 shadow-lg max-w-md w-full text-gray-800">
          <div className="flex items-center gap-2 mb-4">
            <h3 className="text-xl font-bold text-gray-800">UK Visa</h3>
            <h3 className="text-2xl font-bold text-purple-600">Eligibility Test</h3>
            <div className="w-6 h-6 border-2 border-gray-800 rounded flex items-center justify-center ml-auto">
              <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
            </div>
          </div>
          
          <p className="text-sm text-gray-600 mb-2">
            Do You Meet The Minimum Requirements Of The Visa Type That You Want To Apply For?
          </p>
          <p className="text-sm text-gray-600 mb-6">
            Answer The Questions Below To Get Your Results.
          </p>

          <div className="mb-6">
            <h4 className="font-semibold text-gray-800 mb-4">
              {visaQuestions[currentQuestion].question}
            </h4>
            
            <div className="space-y-3">
              {visaQuestions[currentQuestion].options.map((option, index) => (
                <label key={index} className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name={`question-${currentQuestion}`}
                    value={option}
                    checked={answers[visaQuestions[currentQuestion].id] === option}
                    onChange={(e) => handleAnswer(visaQuestions[currentQuestion].id, e.target.value)}
                    className="w-4 h-4 text-purple-600 border-gray-300 focus:ring-purple-500"
                  />
                  <span className="text-gray-700">{option}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="flex justify-center">
            <button
              onClick={handleNext}
              className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
            >
              {currentQuestion === visaQuestions.length - 1 ? 'Complete' : 'Next'}
            </button>
          </div>

          {currentQuestion > 0 && (
            <div className="flex justify-center mt-3">
              <button
                onClick={handlePrevious}
                className="text-gray-500 hover:text-gray-700 text-sm"
              >
                ← Previous
              </button>
            </div>
          )}

          <div className="mt-4 text-center">
            <span className="text-xs text-gray-500">
              Question {currentQuestion + 1} / {visaQuestions.length}
            </span>
          </div>
        </div>
      </div>
      {/* Three Action Buttons - Full Width Below Content */}
      <div className="w-full mb-8 z-10 relative">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-9 gap-4">
            {/* Book Free Consultation */}
            <Button 
              variant="default" 
              size="lg"
              className="bg-blue-600 py-4 hover:bg-blue-700 text-white col-span-2"
            >
              Book Free Consultation
            </Button>
            
            {/* Check Eligibility */}
            <Button 
              variant="default" 
              size="lg"
              className="bg-teal-600 hover:bg-teal-700 text-white col-span-2"
            >
              Check Eligibility
            </Button>
            
            {/* Urgent Help */}
            <Button 
              variant="destructive" 
              size="lg"
              className="bg-red-600 hover:bg-red-700 text-white col-span-2 gap-2"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
              Urgent Help: 07858 780841
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}