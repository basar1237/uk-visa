'use client'

import React, { useState } from 'react'
import { CheckCircle, Clock, Award, BookOpen, Globe, Users, TrendingUp, Star } from 'lucide-react'
import { Breadcrumb } from '@/components/Breadcrumb'

interface Question {
  id: number
  question: string
  options: string[]
  correctAnswer: number
  explanation: string
  category: string
}

interface TestResult {
  score: number
  level: string
  description: string
  recommendations: string[]
  visaEligibility: string
}

const questions: Question[] = [
  {
    id: 1,
    question: "Choose the correct sentence:",
    options: [
      "I have been living here since 2020",
      "I am living here since 2020",
      "I live here since 2020",
      "I was living here since 2020"
    ],
    correctAnswer: 0,
    explanation: "The present perfect continuous tense 'have been living' is used with 'since' to show an action that started in the past and continues to the present.",
    category: "Grammar"
  },
  {
    id: 2,
    question: "What is the meaning of 'procrastinate'?",
    options: [
      "To work very hard",
      "To delay or postpone something",
      "To celebrate an achievement",
      "To organize efficiently"
    ],
    correctAnswer: 1,
    explanation: "Procrastinate means to delay or postpone doing something, especially something that requires immediate attention.",
    category: "Vocabulary"
  },
  {
    id: 3,
    question: "Which word is the correct spelling?",
    options: [
      "Accomodation",
      "Accommodation",
      "Acommodation",
      "Accomodation"
    ],
    correctAnswer: 1,
    explanation: "Accommodation has double 'c' and double 'm' - it's one of the most commonly misspelled words in English.",
    category: "Spelling"
  },
  {
    id: 4,
    question: "Complete the sentence: 'If I _____ you, I would study harder.'",
    options: [
      "am",
      "was",
      "were",
      "will be"
    ],
    correctAnswer: 2,
    explanation: "In second conditional sentences (unreal situations), we use 'were' for all persons with 'if I were you'.",
    category: "Grammar"
  },
  {
    id: 5,
    question: "What does the idiom 'break the ice' mean?",
    options: [
      "To cause an argument",
      "To start a conversation in a social setting",
      "To end a relationship",
      "To solve a difficult problem"
    ],
    correctAnswer: 1,
    explanation: "To 'break the ice' means to initiate conversation in a social setting, especially when people don't know each other well.",
    category: "Idioms"
  },
  {
    id: 6,
    question: "Choose the correct preposition: 'I'm looking forward _____ your visit.'",
    options: [
      "to",
      "for",
      "at",
      "in"
    ],
    correctAnswer: 0,
    explanation: "The phrasal verb 'look forward to' is always followed by 'to' + noun/gerund.",
    category: "Prepositions"
  },
  {
    id: 7,
    question: "What is the plural of 'crisis'?",
    options: [
      "crisises",
      "crises",
      "crisis",
      "crisi"
    ],
    correctAnswer: 1,
    explanation: "Crisis is a Greek word, and its plural form is 'crises' (pronounced cry-sees).",
    category: "Grammar"
  },
  {
    id: 8,
    question: "Which sentence is grammatically correct?",
    options: [
      "She don't like coffee",
      "She doesn't likes coffee",
      "She doesn't like coffee",
      "She not like coffee"
    ],
    correctAnswer: 2,
    explanation: "In present simple negative, we use 'doesn't' + base form of the verb (without 's').",
    category: "Grammar"
  },
  {
    id: 9,
    question: "What does 'ubiquitous' mean?",
    options: [
      "Very expensive",
      "Present everywhere",
      "Extremely rare",
      "Very beautiful"
    ],
    correctAnswer: 1,
    explanation: "Ubiquitous means present, appearing, or found everywhere - something that seems to be everywhere at the same time.",
    category: "Vocabulary"
  },
  {
    id: 10,
    question: "Choose the correct word order:",
    options: [
      "I always have breakfast at 8 AM",
      "I have always breakfast at 8 AM",
      "I have breakfast always at 8 AM",
      "Always I have breakfast at 8 AM"
    ],
    correctAnswer: 0,
    explanation: "Adverbs of frequency like 'always' go before the main verb but after 'be' verb. 'I always have' is the correct order.",
    category: "Word Order"
  },
  {
    id: 11,
    question: "What is the past participle of 'swim'?",
    options: [
      "swimmed",
      "swam",
      "swum",
      "swimming"
    ],
    correctAnswer: 2,
    explanation: "The past participle of 'swim' is 'swum' (swim - swam - swum).",
    category: "Grammar"
  },
  {
    id: 12,
    question: "What does 'serendipity' mean?",
    options: [
      "A type of bird",
      "The occurrence of happy accidents",
      "A scientific method",
      "A musical instrument"
    ],
    correctAnswer: 1,
    explanation: "Serendipity means the occurrence of events by chance in a happy or beneficial way.",
    category: "Vocabulary"
  },
  {
    id: 13,
    question: "Which sentence uses the correct tense?",
    options: [
      "I will be working when you arrive",
      "I will work when you arrive",
      "I will have worked when you arrive",
      "I work when you arrive"
    ],
    correctAnswer: 0,
    explanation: "Future continuous 'will be working' is used to describe an action that will be in progress at a specific time in the future.",
    category: "Grammar"
  },
  {
    id: 14,
    question: "What is the correct spelling?",
    options: [
      "Occurrence",
      "Occurence",
      "Occurance",
      "Occurrance"
    ],
    correctAnswer: 0,
    explanation: "Occurrence has double 'c' and double 'r' - it's another commonly misspelled word.",
    category: "Spelling"
  },
  {
    id: 15,
    question: "What does 'ephemeral' mean?",
    options: [
      "Lasting for a very short time",
      "Very expensive",
      "Extremely large",
      "Very beautiful"
    ],
    correctAnswer: 0,
    explanation: "Ephemeral means lasting for a very short time, transient, or fleeting.",
    category: "Vocabulary"
  },
  {
    id: 16,
    question: "Choose the correct form: 'Neither John nor Mary _____ coming to the party.'",
    options: [
      "is",
      "are",
      "were",
      "have"
    ],
    correctAnswer: 0,
    explanation: "With 'neither...nor', the verb agrees with the subject closest to it. Since 'Mary' is singular, we use 'is'.",
    category: "Grammar"
  },
  {
    id: 17,
    question: "What does the idiom 'hit the nail on the head' mean?",
    options: [
      "To be very angry",
      "To be exactly right",
      "To work very hard",
      "To make a mistake"
    ],
    correctAnswer: 1,
    explanation: "To 'hit the nail on the head' means to be exactly right or to identify something correctly.",
    category: "Idioms"
  },
  {
    id: 18,
    question: "Which is the correct comparative form?",
    options: [
      "more good",
      "gooder",
      "better",
      "more better"
    ],
    correctAnswer: 2,
    explanation: "The comparative form of 'good' is 'better' (good - better - best).",
    category: "Grammar"
  },
  {
    id: 19,
    question: "What does 'meticulous' mean?",
    options: [
      "Very fast",
      "Showing great attention to detail",
      "Very loud",
      "Very old"
    ],
    correctAnswer: 1,
    explanation: "Meticulous means showing great attention to detail, very careful and precise.",
    category: "Vocabulary"
  },
  {
    id: 20,
    question: "Complete the sentence: 'I wish I _____ more time to study.'",
    options: [
      "have",
      "had",
      "will have",
      "would have"
    ],
    correctAnswer: 1,
    explanation: "After 'wish', we use the past simple tense to express present regrets. 'I wish I had' is correct.",
    category: "Grammar"
  }
]

const getTestResult = (score: number, totalQuestions: number): TestResult => {
  const wrongAnswers = totalQuestions - score
  const percentage = Math.round((score / totalQuestions) * 100)
  
  if (score >= 18) {
    return {
      score,
      level: "Advanced (C1-C2)",
      description: `Excellent English proficiency! You scored ${score} out of ${totalQuestions} questions (${percentage}%). You have a very strong command of the language.`,
      recommendations: [
        "Your English level is suitable for academic and professional purposes",
        "You can confidently communicate in complex situations",
        "Consider taking official tests like IELTS or TOEFL for certification"
      ],
      visaEligibility: "IELTS 7.0+ equivalent - Suitable for all visa types"
    }
  } else if (score >= 14) {
    return {
      score,
      level: "Upper-Intermediate (B2)",
      description: `Good English proficiency! You scored ${score} out of ${totalQuestions} questions (${percentage}%). You have solid grammar and vocabulary knowledge.`,
      recommendations: [
        "Continue practicing with advanced materials",
        "Focus on complex grammar structures and idioms",
        "Consider taking an official English test for certification"
      ],
      visaEligibility: "IELTS 6.0-6.5 equivalent - Suitable for most visa types"
    }
  } else if (score >= 10) {
    return {
      score,
      level: "Intermediate (B1)",
      description: `Basic to intermediate English proficiency. You scored ${score} out of ${totalQuestions} questions (${percentage}%). Good foundation with room for improvement.`,
      recommendations: [
        "Focus on grammar fundamentals and vocabulary expansion",
        "Practice reading and listening to English materials daily",
        "Consider taking an English course to reach upper-intermediate level"
      ],
      visaEligibility: "IELTS 4.5-5.5 equivalent - May need improvement for visa requirements"
    }
  } else {
    return {
      score,
      level: "Elementary (A1-A2)",
      description: `Basic English knowledge. You scored ${score} out of ${totalQuestions} questions (${percentage}%). Significant improvement needed for most purposes.`,
      recommendations: [
        "Start with basic English courses focusing on grammar and vocabulary",
        "Practice daily with simple English materials",
        "Consider intensive English language programs"
      ],
      visaEligibility: "IELTS 3.0-4.0 equivalent - English improvement required for visa applications"
    }
  }
}

export const EnglishTestComponent: React.FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<number[]>([])
  const [showResult, setShowResult] = useState(false)
  const [showExplanation, setShowExplanation] = useState(false)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [userInfo, setUserInfo] = useState({
    fullName: '',
    email: '',
    phone: ''
  })
  const [showUserForm, setShowUserForm] = useState(true)

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex)
    // Cevap seçildikten sonra otomatik olarak açıklamayı göster
    setShowExplanation(true)
  }

  const handleNext = async () => {
    if (selectedAnswer !== null) {
      const newAnswers = [...answers, selectedAnswer]
      setAnswers(newAnswers)
      
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1)
        setSelectedAnswer(null)
        setShowExplanation(false)
      } else {
        // Test completed - save to database
        const score = calculateScore()
        const result = getTestResult(score, questions.length)
        await saveEnglishTestSubmission(score, result)
        setShowResult(true)
      }
    }
  }

  const handleShowExplanation = () => {
    setShowExplanation(true)
  }

  const handleUserInfoSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (userInfo.fullName && userInfo.email) {
      setShowUserForm(false)
    } else {
      alert('Please fill in the full name and email fields.')
    }
  }

  const handleUserInfoChange = (field: string, value: string) => {
    setUserInfo(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const saveEnglishTestSubmission = async (score: number, result: TestResult) => {
    try {
      // Her sorunun detaylı bilgilerini hazırla
      const questionDetails = questions.map((question, index) => {
        const selectedAnswer = answers[index]
        return {
          questionId: question.id,
          question: question.question,
          options: question.options.map(option => ({ option })),
          correctAnswer: question.correctAnswer,
          selectedAnswer: selectedAnswer,
          isCorrect: selectedAnswer === question.correctAnswer,
          explanation: question.explanation,
          category: question.category
        }
      })

      // Test verilerini collection'a gönder
      const submissionData = {
        fullName: userInfo.fullName,
        email: userInfo.email,
        phone: userInfo.phone,
        score,
        totalQuestions: questions.length,
        percentage: Math.round((score / questions.length) * 100),
        level: result.level,
        description: result.description,
        visaEligibility: result.visaEligibility,
        recommendations: result.recommendations.map(rec => ({ recommendation: rec })),
        correctAnswers: score,
        wrongAnswers: questions.length - score,
        testDuration: 5,
        questionDetails: questionDetails
      }

      console.log('Sending English test submission data:', submissionData)

      const response = await fetch('/api/english-test-submissions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submissionData),
      })

      if (response.ok) {
        const data = await response.json()
        console.log('English test submission saved successfully:', data)
      } else {
        const errorData = await response.json()
        console.error('Failed to save English test submission:', errorData)
        alert('An error occurred while saving the test result. Please try again.')
      }
    } catch (error) {
      console.error('English test submission error:', error)
      alert('An error occurred while saving the test result. Please try again.')
    }
  }

  const calculateScore = () => {
    return answers.reduce((score, answer, index) => {
      // questions dizisinin sınırları içinde olduğundan emin ol
      if (index < questions.length) {
        return score + (answer === questions[index].correctAnswer ? 1 : 0)
      }
      return score
    }, 0)
  }

  const getDetailedResults = () => {
    const correctAnswers = calculateScore()
    const wrongAnswers = questions.length - correctAnswers
    const percentage = Math.round((correctAnswers / questions.length) * 100)
    
    return {
      correct: correctAnswers,
      wrong: wrongAnswers,
      total: questions.length,
      percentage
    }
  }

  const resetTest = () => {
    setCurrentQuestion(0)
    setAnswers([])
    setShowResult(false)
    setShowExplanation(false)
    setSelectedAnswer(null)
    setShowUserForm(true)
    setUserInfo({
      fullName: '',
      email: '',
      phone: ''
    })
  }

  if (showResult) {
    const score = calculateScore()
    const detailedResults = getDetailedResults()
    const result = getTestResult(score, questions.length)
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
                <Award className="w-10 h-10 text-green-600" />
              </div>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">Test Completed!</h1>
              <p className="text-xl text-gray-600">Here are your results</p>
            </div>

            {/* Score Card */}
            <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-24 h-24 bg-blue-100 rounded-full mb-4">
                  <span className="text-3xl font-bold text-blue-600">{score}/{questions.length}</span>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">{result.level}</h2>
                <p className="text-lg text-gray-600">{result.description}</p>
              </div>

              {/* Detailed Results */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
                  <div className="text-3xl font-bold text-green-600 mb-2">{detailedResults.correct}</div>
                  <h3 className="font-semibold text-green-800 mb-1">Correct Answers</h3>
                  <p className="text-sm text-green-600">Right answers</p>
                </div>
                <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
                  <div className="text-3xl font-bold text-red-600 mb-2">{detailedResults.wrong}</div>
                  <h3 className="font-semibold text-red-800 mb-1">Wrong Answers</h3>
                  <p className="text-sm text-red-600">Incorrect answers</p>
                </div>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">{detailedResults.percentage}%</div>
                  <h3 className="font-semibold text-blue-800 mb-1">Success Rate</h3>
                  <p className="text-sm text-blue-600">Overall performance</p>
                </div>
              </div>

              {/* Visa Eligibility */}
              <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
                <div className="flex items-center mb-3">
                  <CheckCircle className="w-6 h-6 text-green-600 mr-2" />
                  <h3 className="text-lg font-semibold text-green-800">Visa Eligibility</h3>
                </div>
                <p className="text-green-700">{result.visaEligibility}</p>
              </div>

              {/* Recommendations */}
              <div className="mb-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Recommendations</h3>
                <ul className="space-y-3">
                  {result.recommendations.map((rec, index) => (
                    <li key={index} className="flex items-start">
                      <Star className="w-5 h-5 text-yellow-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={resetTest}
                  className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Retake Test
                </button>
                <button
                  onClick={() => window.location.href = '/contact'}
                  className="px-8 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors"
                >
                  Get Visa Consultation
                </button>
              </div>
            </div>

            {/* Test Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white rounded-lg p-6 text-center shadow-lg">
                <Clock className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900 mb-1">Test Duration</h3>
                <p className="text-2xl font-bold text-blue-600">~5 minutes</p>
              </div>
              <div className="bg-white rounded-lg p-6 text-center shadow-lg">
                <BookOpen className="w-8 h-8 text-green-600 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900 mb-1">Questions</h3>
                <p className="text-2xl font-bold text-green-600">{questions.length}</p>
              </div>
              <div className="bg-white rounded-lg p-6 text-center shadow-lg">
                <Globe className="w-8 h-8 text-purple-600 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900 mb-1">Coverage</h3>
                <p className="text-2xl font-bold text-purple-600">English Skills</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Kullanıcı bilgi formunu göster
  if (showUserForm) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-100 rounded-full mb-6">
                <BookOpen className="w-10 h-10 text-blue-600" />
              </div>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">English Language Test</h1>
              <p className="text-xl text-gray-600 mb-6">Test your English proficiency level with our comprehensive assessment</p>
            </div>

            {/* User Info Form */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Test Information</h2>
              <form onSubmit={handleUserInfoSubmit} className="space-y-6">
                <div>
                  <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    value={userInfo.fullName}
                    onChange={(e) => handleUserInfoChange('fullName', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your full name"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={userInfo.email}
                    onChange={(e) => handleUserInfoChange('email', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your email address"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    value={userInfo.phone}
                    onChange={(e) => handleUserInfoChange('phone', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your phone number (optional)"
                  />
                </div>
                
                <button
                  type="submit"
                  className="w-full px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Start Test
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const question = questions[currentQuestion]
  const progress = ((currentQuestion + 1) / questions.length) * 100

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Breadcrumb */}
      <Breadcrumb items={[{ label: 'English Test' }]} />
      
      <div className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-100 rounded-full mb-6">
              <BookOpen className="w-10 h-10 text-blue-600" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">English Language Test</h1>
            <p className="text-xl text-gray-600 mb-6">Test your English proficiency level with our comprehensive assessment</p>
            
            {/* Progress Bar */}
            <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
              <div 
                className="bg-blue-600 h-3 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <p className="text-sm text-gray-600">Question {currentQuestion + 1} of {questions.length}</p>
          </div>

          {/* Question Card */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <div className="mb-6">
              <span className="inline-block bg-blue-100 text-blue-800 text-sm font-semibold px-3 py-1 rounded-full mb-4">
                {question.category}
              </span>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">{question.question}</h2>
            </div>

            {/* Answer Options */}
            <div className="space-y-4 mb-8">
              {question.options.map((option, index) => {
                const isCorrectAnswer = index === question.correctAnswer
                const isSelected = selectedAnswer === index
                const isAnswered = selectedAnswer !== null
                
                let buttonClass = 'w-full p-4 text-left rounded-lg border-2 transition-all '
                
                if (isAnswered) {
                  // Cevap verildikten sonra doğru cevabı yeşil çerçeveyle göster
                  if (isCorrectAnswer) {
                    buttonClass += 'border-green-500 bg-green-50 text-green-900'
                  } else if (isSelected && !isCorrectAnswer) {
                    // Seçilen yanlış cevabı kırmızı çerçeveyle göster
                    buttonClass += 'border-red-500 bg-red-50 text-red-900'
                  } else {
                    // Diğer seçenekleri gri göster
                    buttonClass += 'border-gray-200 bg-gray-50 text-gray-500'
                  }
                } else {
                  // Henüz cevap verilmediğinde normal durum
                  buttonClass += isSelected
                    ? 'border-blue-500 bg-blue-50 text-blue-900'
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                }
                
                return (
                  <button
                    key={index}
                    onClick={() => handleAnswerSelect(index)}
                    disabled={isAnswered}
                    className={buttonClass}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <span className="font-semibold mr-3">{String.fromCharCode(65 + index)}.</span>
                        {option}
                      </div>
                      {isAnswered && isCorrectAnswer && (
                        <CheckCircle className="w-5 h-5 text-green-600" />
                      )}
                      {isAnswered && isSelected && !isCorrectAnswer && (
                        <span className="w-5 h-5 text-red-600 text-xl">✗</span>
                      )}
                    </div>
                  </button>
                )
              })}
            </div>

            {/* Explanation */}
            {showExplanation && selectedAnswer !== null && (
              <div className={`border rounded-lg p-6 mb-6 ${
                selectedAnswer === question.correctAnswer 
                  ? 'bg-green-50 border-green-200' 
                  : 'bg-red-50 border-red-200'
              }`}>
                <div className="flex items-center mb-3">
                  {selectedAnswer === question.correctAnswer ? (
                    <>
                      <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                      <h3 className="font-semibold text-green-800">Correct Answer!</h3>
                    </>
                  ) : (
                    <>
                      <span className="w-5 h-5 text-red-600 text-xl mr-2">✗</span>
                      <h3 className="font-semibold text-red-800">Incorrect Answer</h3>
                    </>
                  )}
                </div>
                <p className={selectedAnswer === question.correctAnswer ? 'text-green-700' : 'text-red-700'}>
                  {question.explanation}
                </p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex justify-end">
              <button
                onClick={handleNext}
                disabled={selectedAnswer === null || !showExplanation}
                className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {currentQuestion === questions.length - 1 ? 'Finish Test' : 'Next Question'}
              </button>
            </div>
          </div>

          {/* Test Info */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg p-6 text-center shadow-lg">
              <Users className="w-8 h-8 text-blue-600 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-1">Free Test</h3>
              <p className="text-sm text-gray-600">No registration required</p>
            </div>
            <div className="bg-white rounded-lg p-6 text-center shadow-lg">
              <TrendingUp className="w-8 h-8 text-green-600 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-1">Instant Results</h3>
              <p className="text-sm text-gray-600">Get your score imediately</p>
            </div>
            <div className="bg-white rounded-lg p-6 text-center shadow-lg">
              <Globe className="w-8 h-8 text-purple-600 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-1">Comprehensive Assessment</h3>
              <p className="text-sm text-gray-600">Grammar, vocabulary, and usage</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}
