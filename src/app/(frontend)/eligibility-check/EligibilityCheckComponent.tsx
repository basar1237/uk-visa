'use client'

import React, { useState } from 'react'
import { CheckCircle, Clock, Award, FileText, Globe, Users, TrendingUp, Star, ArrowRight, ArrowLeft } from 'lucide-react'
import { Breadcrumb } from '@/components/Breadcrumb'

interface Question {
  id: number
  question: string
  type: 'text' | 'email' | 'date' | 'select' | 'radio' | 'textarea' | 'tel' | 'passport' | 'passport-date'
  options?: string[]
  required: boolean
  step: number
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

// Visa-specific questions
const visaSpecificQuestions: Record<string, Question[]> = {
  'Visitor Visa': [
    { id: 101, question: "What is your full name?", type: 'text', required: true, step: 1, category: "Personal Information" },
    { id: 102, question: "What is your date of birth?", type: 'date', required: true, step: 1, category: "Personal Information" },
    { id: 103, question: "What is your nationality?", type: 'select', options: ['Turkish', 'English', 'Arabic', 'French', 'German', 'Italian', 'Spanish', 'Portuguese', 'Russian', 'Chinese', 'Japanese', 'Korean', 'Indian', 'Pakistani', 'Bangladeshi', 'Iranian', 'Iraqi', 'Syrian', 'Lebanese', 'Jordanian', 'Egyptian', 'Moroccan', 'Algerian', 'Tunisian', 'Libyan', 'Sudanese', 'Saudi Arabian', 'Emirati', 'Kuwaiti', 'Qatari', 'Bahraini', 'Omani', 'Yemeni', 'Afghan', 'Kazakh', 'Uzbek', 'Kyrgyz', 'Tajik', 'Turkmen', 'Azerbaijani', 'Georgian', 'Armenian', 'Ukrainian', 'Belarusian', 'Polish', 'Czech', 'Slovak', 'Hungarian', 'Romanian', 'Bulgarian', 'Croatian', 'Serbian', 'Bosnian', 'Albanian', 'Macedonian', 'Slovenian', 'Estonian', 'Latvian', 'Lithuanian', 'Finnish', 'Swedish', 'Norwegian', 'Danish', 'Icelandic', 'Dutch', 'Belgian', 'Swiss', 'Austrian', 'Greek', 'Cypriot', 'Maltese', 'Irish', 'Scottish', 'Welsh', 'Canadian', 'American', 'Mexican', 'Brazilian', 'Argentinian', 'Chilean', 'Colombian', 'Peruvian', 'Venezuelan', 'Ecuadorian', 'Uruguayan', 'Paraguayan', 'Bolivian', 'Australian', 'New Zealander', 'South African', 'Nigerian', 'Kenyan', 'Ghanaian', 'Ethiopian', 'Ugandan', 'Tanzanian', 'Moroccan', 'Algerian', 'Tunisian', 'Libyan', 'Sudanese', 'Other'], required: true, step: 1, category: "Personal Information" },
    { id: 104, question: "What is your gender?", type: 'radio', options: ['Male', 'Female', 'Other', 'Prefer not to say'], required: true, step: 1, category: "Personal Information" },
    { id: 105, question: "What is your contact email?", type: 'email', required: true, step: 1, category: "Personal Information" },
    { id: 106, question: "What is your contact phone number?", type: 'tel', required: true, step: 1, category: "Personal Information" },
    { id: 107, question: "What is your passport number?", type: 'passport', required: true, step: 2, category: "Passport Information" },
    { id: 108, question: "When does your passport expire?", type: 'passport-date', required: true, step: 2, category: "Passport Information" },
    { id: 109, question: "Where was your passport issued?", type: 'text', required: true, step: 2, category: "Passport Information" },
    { id: 110, question: "What is the main purpose of your visit?", type: 'select', options: ['Tourism', 'Business', 'Family visit', 'Medical treatment', 'Other'], required: true, step: 3, category: "Visit Purpose" },
    { id: 111, question: "How long do you plan to stay in the UK?", type: 'select', options: ['Less than 6 months', '6-12 months', '1-2 years', 'More than 2 years'], required: true, step: 3, category: "Visit Purpose" },
    { id: 112, question: "Do you have accommodation arranged in the UK?", type: 'radio', options: ['Yes', 'No'], required: true, step: 3, category: "Visit Purpose" },
    { id: 113, question: "Do you have sufficient funds for your stay?", type: 'radio', options: ['Yes', 'No'], required: true, step: 3, category: "Visit Purpose" },
    { id: 114, question: "Have you visited the UK before?", type: 'radio', options: ['Yes', 'No'], required: true, step: 3, category: "Visit Purpose" },
    { id: 115, question: "Do you have any family or friends in the UK?", type: 'radio', options: ['Yes', 'No'], required: true, step: 3, category: "Visit Purpose" }
  ],
  'Student Visa': [
    { id: 201, question: "What is your full name?", type: 'text', required: true, step: 1, category: "Personal Information" },
    { id: 202, question: "What is your date of birth?", type: 'date', required: true, step: 1, category: "Personal Information" },
    { id: 203, question: "What is your nationality?", type: 'select', options: ['Turkish', 'English', 'Arabic', 'French', 'German', 'Italian', 'Spanish', 'Portuguese', 'Russian', 'Chinese', 'Japanese', 'Korean', 'Indian', 'Pakistani', 'Bangladeshi', 'Iranian', 'Iraqi', 'Syrian', 'Lebanese', 'Jordanian', 'Egyptian', 'Moroccan', 'Algerian', 'Tunisian', 'Libyan', 'Sudanese', 'Saudi Arabian', 'Emirati', 'Kuwaiti', 'Qatari', 'Bahraini', 'Omani', 'Yemeni', 'Afghan', 'Kazakh', 'Uzbek', 'Kyrgyz', 'Tajik', 'Turkmen', 'Azerbaijani', 'Georgian', 'Armenian', 'Ukrainian', 'Belarusian', 'Polish', 'Czech', 'Slovak', 'Hungarian', 'Romanian', 'Bulgarian', 'Croatian', 'Serbian', 'Bosnian', 'Albanian', 'Macedonian', 'Slovenian', 'Estonian', 'Latvian', 'Lithuanian', 'Finnish', 'Swedish', 'Norwegian', 'Danish', 'Icelandic', 'Dutch', 'Belgian', 'Swiss', 'Austrian', 'Greek', 'Cypriot', 'Maltese', 'Irish', 'Scottish', 'Welsh', 'Canadian', 'American', 'Mexican', 'Brazilian', 'Argentinian', 'Chilean', 'Colombian', 'Peruvian', 'Venezuelan', 'Ecuadorian', 'Uruguayan', 'Paraguayan', 'Bolivian', 'Australian', 'New Zealander', 'South African', 'Nigerian', 'Kenyan', 'Ghanaian', 'Ethiopian', 'Ugandan', 'Tanzanian', 'Moroccan', 'Algerian', 'Tunisian', 'Libyan', 'Sudanese', 'Other'], required: true, step: 1, category: "Personal Information" },
    { id: 204, question: "What is your gender?", type: 'radio', options: ['Male', 'Female', 'Other', 'Prefer not to say'], required: true, step: 1, category: "Personal Information" },
    { id: 205, question: "What is your contact email?", type: 'email', required: true, step: 1, category: "Personal Information" },
    { id: 206, question: "What is your contact phone number?", type: 'tel', required: true, step: 1, category: "Personal Information" },
    { id: 207, question: "What is your passport number?", type: 'passport', required: true, step: 2, category: "Passport Information" },
    { id: 208, question: "When does your passport expire?", type: 'passport-date', required: true, step: 2, category: "Passport Information" },
    { id: 209, question: "Where was your passport issued?", type: 'text', required: true, step: 2, category: "Passport Information" },
    { id: 210, question: "What course will you study?", type: 'text', required: true, step: 3, category: "Study Information" },
    { id: 211, question: "Which university will you attend?", type: 'text', required: true, step: 3, category: "Study Information" },
    { id: 212, question: "What is your English proficiency level?", type: 'select', options: ['IELTS 6.0', 'IELTS 6.5', 'IELTS 7.0', 'IELTS 7.5', 'IELTS 8.0', 'TOEFL 80', 'TOEFL 90', 'TOEFL 100', 'TOEFL 110', 'Other'], required: true, step: 3, category: "Study Information" },
    { id: 213, question: "Do you have sufficient funds for your studies?", type: 'radio', options: ['Yes', 'No'], required: true, step: 3, category: "Study Information" },
    { id: 214, question: "Do you have a sponsor?", type: 'radio', options: ['Yes', 'No'], required: true, step: 3, category: "Study Information" },
    { id: 215, question: "Have you been refused a UK visa before?", type: 'radio', options: ['Yes', 'No'], required: true, step: 3, category: "Additional Information" }
  ],
  'Work Visa': [
    { id: 301, question: "What is your full name?", type: 'text', required: true, step: 1, category: "Personal Information" },
    { id: 302, question: "What is your date of birth?", type: 'date', required: true, step: 1, category: "Personal Information" },
    { id: 303, question: "What is your nationality?", type: 'select', options: ['Turkish', 'English', 'Arabic', 'French', 'German', 'Italian', 'Spanish', 'Portuguese', 'Russian', 'Chinese', 'Japanese', 'Korean', 'Indian', 'Pakistani', 'Bangladeshi', 'Iranian', 'Iraqi', 'Syrian', 'Lebanese', 'Jordanian', 'Egyptian', 'Moroccan', 'Algerian', 'Tunisian', 'Libyan', 'Sudanese', 'Saudi Arabian', 'Emirati', 'Kuwaiti', 'Qatari', 'Bahraini', 'Omani', 'Yemeni', 'Afghan', 'Kazakh', 'Uzbek', 'Kyrgyz', 'Tajik', 'Turkmen', 'Azerbaijani', 'Georgian', 'Armenian', 'Ukrainian', 'Belarusian', 'Polish', 'Czech', 'Slovak', 'Hungarian', 'Romanian', 'Bulgarian', 'Croatian', 'Serbian', 'Bosnian', 'Albanian', 'Macedonian', 'Slovenian', 'Estonian', 'Latvian', 'Lithuanian', 'Finnish', 'Swedish', 'Norwegian', 'Danish', 'Icelandic', 'Dutch', 'Belgian', 'Swiss', 'Austrian', 'Greek', 'Cypriot', 'Maltese', 'Irish', 'Scottish', 'Welsh', 'Canadian', 'American', 'Mexican', 'Brazilian', 'Argentinian', 'Chilean', 'Colombian', 'Peruvian', 'Venezuelan', 'Ecuadorian', 'Uruguayan', 'Paraguayan', 'Bolivian', 'Australian', 'New Zealander', 'South African', 'Nigerian', 'Kenyan', 'Ghanaian', 'Ethiopian', 'Ugandan', 'Tanzanian', 'Moroccan', 'Algerian', 'Tunisian', 'Libyan', 'Sudanese', 'Other'], required: true, step: 1, category: "Personal Information" },
    { id: 304, question: "What is your gender?", type: 'radio', options: ['Male', 'Female', 'Other', 'Prefer not to say'], required: true, step: 1, category: "Personal Information" },
    { id: 305, question: "What is your contact email?", type: 'email', required: true, step: 1, category: "Personal Information" },
    { id: 306, question: "What is your contact phone number?", type: 'tel', required: true, step: 1, category: "Personal Information" },
    { id: 307, question: "What is your passport number?", type: 'passport', required: true, step: 2, category: "Passport Information" },
    { id: 308, question: "When does your passport expire?", type: 'passport-date', required: true, step: 2, category: "Passport Information" },
    { id: 309, question: "Where was your passport issued?", type: 'text', required: true, step: 2, category: "Passport Information" },
    { id: 310, question: "What is your job title?", type: 'text', required: true, step: 3, category: "Work Information" },
    { id: 311, question: "Which company will you work for?", type: 'text', required: true, step: 3, category: "Work Information" },
    { id: 312, question: "What is your annual salary?", type: 'select', options: ['£20,000 - £30,000', '£30,000 - £40,000', '£40,000 - £50,000', '£50,000 - £70,000', '£70,000+'], required: true, step: 3, category: "Work Information" },
    { id: 313, question: "Do you have a job offer?", type: 'radio', options: ['Yes', 'No'], required: true, step: 3, category: "Work Information" },
    { id: 314, question: "Do you have the required qualifications?", type: 'radio', options: ['Yes', 'No'], required: true, step: 3, category: "Work Information" },
    { id: 315, question: "Have you been refused a UK visa before?", type: 'radio', options: ['Yes', 'No'], required: true, step: 3, category: "Additional Information" }
  ],
  'Spouse Visa': [
    { id: 401, question: "What is your full name?", type: 'text', required: true, step: 1, category: "Personal Information" },
    { id: 402, question: "What is your date of birth?", type: 'date', required: true, step: 1, category: "Personal Information" },
    { id: 403, question: "What is your nationality?", type: 'select', options: ['Turkish', 'English', 'Arabic', 'French', 'German', 'Italian', 'Spanish', 'Portuguese', 'Russian', 'Chinese', 'Japanese', 'Korean', 'Indian', 'Pakistani', 'Bangladeshi', 'Iranian', 'Iraqi', 'Syrian', 'Lebanese', 'Jordanian', 'Egyptian', 'Moroccan', 'Algerian', 'Tunisian', 'Libyan', 'Sudanese', 'Saudi Arabian', 'Emirati', 'Kuwaiti', 'Qatari', 'Bahraini', 'Omani', 'Yemeni', 'Afghan', 'Kazakh', 'Uzbek', 'Kyrgyz', 'Tajik', 'Turkmen', 'Azerbaijani', 'Georgian', 'Armenian', 'Ukrainian', 'Belarusian', 'Polish', 'Czech', 'Slovak', 'Hungarian', 'Romanian', 'Bulgarian', 'Croatian', 'Serbian', 'Bosnian', 'Albanian', 'Macedonian', 'Slovenian', 'Estonian', 'Latvian', 'Lithuanian', 'Finnish', 'Swedish', 'Norwegian', 'Danish', 'Icelandic', 'Dutch', 'Belgian', 'Swiss', 'Austrian', 'Greek', 'Cypriot', 'Maltese', 'Irish', 'Scottish', 'Welsh', 'Canadian', 'American', 'Mexican', 'Brazilian', 'Argentinian', 'Chilean', 'Colombian', 'Peruvian', 'Venezuelan', 'Ecuadorian', 'Uruguayan', 'Paraguayan', 'Bolivian', 'Australian', 'New Zealander', 'South African', 'Nigerian', 'Kenyan', 'Ghanaian', 'Ethiopian', 'Ugandan', 'Tanzanian', 'Moroccan', 'Algerian', 'Tunisian', 'Libyan', 'Sudanese', 'Other'], required: true, step: 1, category: "Personal Information" },
    { id: 404, question: "What is your gender?", type: 'radio', options: ['Male', 'Female', 'Other', 'Prefer not to say'], required: true, step: 1, category: "Personal Information" },
    { id: 405, question: "What is your contact email?", type: 'email', required: true, step: 1, category: "Personal Information" },
    { id: 406, question: "What is your contact phone number?", type: 'text', required: true, step: 1, category: "Personal Information" },
    { id: 407, question: "What is your passport number?", type: 'text', required: true, step: 2, category: "Passport Information" },
    { id: 408, question: "When does your passport expire?", type: 'date', required: true, step: 2, category: "Passport Information" },
    { id: 409, question: "Where was your passport issued?", type: 'text', required: true, step: 2, category: "Passport Information" },
    { id: 410, question: "What is your spouse's name?", type: 'text', required: true, step: 3, category: "Spouse Information" },
    { id: 411, question: "What is your spouse's nationality?", type: 'select', options: ['British', 'EU Citizen', 'Other'], required: true, step: 3, category: "Spouse Information" },
    { id: 412, question: "How long have you been married?", type: 'select', options: ['Less than 1 year', '1-2 years', '2-5 years', '5-10 years', 'More than 10 years'], required: true, step: 3, category: "Spouse Information" },
    { id: 413, question: "Do you have children together?", type: 'radio', options: ['Yes', 'No'], required: true, step: 3, category: "Spouse Information" },
    { id: 414, question: "What is your spouse's annual income?", type: 'select', options: ['£18,600 - £25,000', '£25,000 - £35,000', '£35,000 - £50,000', '£50,000+'], required: true, step: 3, category: "Spouse Information" },
    { id: 415, question: "Do you have evidence of your relationship?", type: 'radio', options: ['Yes', 'No'], required: true, step: 3, category: "Spouse Information" }
  ],
  'Parent Visa': [
    { id: 501, question: "What is your full name?", type: 'text', required: true, step: 1, category: "Personal Information" },
    { id: 502, question: "What is your date of birth?", type: 'date', required: true, step: 1, category: "Personal Information" },
    { id: 503, question: "What is your nationality?", type: 'select', options: ['Turkish', 'English', 'Arabic', 'French', 'German', 'Italian', 'Spanish', 'Portuguese', 'Russian', 'Chinese', 'Japanese', 'Korean', 'Indian', 'Pakistani', 'Bangladeshi', 'Iranian', 'Iraqi', 'Syrian', 'Lebanese', 'Jordanian', 'Egyptian', 'Moroccan', 'Algerian', 'Tunisian', 'Libyan', 'Sudanese', 'Saudi Arabian', 'Emirati', 'Kuwaiti', 'Qatari', 'Bahraini', 'Omani', 'Yemeni', 'Afghan', 'Kazakh', 'Uzbek', 'Kyrgyz', 'Tajik', 'Turkmen', 'Azerbaijani', 'Georgian', 'Armenian', 'Ukrainian', 'Belarusian', 'Polish', 'Czech', 'Slovak', 'Hungarian', 'Romanian', 'Bulgarian', 'Croatian', 'Serbian', 'Bosnian', 'Albanian', 'Macedonian', 'Slovenian', 'Estonian', 'Latvian', 'Lithuanian', 'Finnish', 'Swedish', 'Norwegian', 'Danish', 'Icelandic', 'Dutch', 'Belgian', 'Swiss', 'Austrian', 'Greek', 'Cypriot', 'Maltese', 'Irish', 'Scottish', 'Welsh', 'Canadian', 'American', 'Mexican', 'Brazilian', 'Argentinian', 'Chilean', 'Colombian', 'Peruvian', 'Venezuelan', 'Ecuadorian', 'Uruguayan', 'Paraguayan', 'Bolivian', 'Australian', 'New Zealander', 'South African', 'Nigerian', 'Kenyan', 'Ghanaian', 'Ethiopian', 'Ugandan', 'Tanzanian', 'Moroccan', 'Algerian', 'Tunisian', 'Libyan', 'Sudanese', 'Other'], required: true, step: 1, category: "Personal Information" },
    { id: 504, question: "What is your gender?", type: 'radio', options: ['Male', 'Female', 'Other', 'Prefer not to say'], required: true, step: 1, category: "Personal Information" },
    { id: 505, question: "What is your contact email?", type: 'email', required: true, step: 1, category: "Personal Information" },
    { id: 506, question: "What is your contact phone number?", type: 'text', required: true, step: 1, category: "Personal Information" },
    { id: 507, question: "What is your passport number?", type: 'text', required: true, step: 2, category: "Passport Information" },
    { id: 508, question: "When does your passport expire?", type: 'date', required: true, step: 2, category: "Passport Information" },
    { id: 509, question: "Where was your passport issued?", type: 'text', required: true, step: 2, category: "Passport Information" },
    { id: 510, question: "What is your child's name?", type: 'text', required: true, step: 3, category: "Child Information" },
    { id: 511, question: "What is your child's age?", type: 'select', options: ['Under 18', '18-21', 'Over 21'], required: true, step: 3, category: "Child Information" },
    { id: 512, question: "Is your child a British citizen?", type: 'radio', options: ['Yes', 'No'], required: true, step: 3, category: "Child Information" },
    { id: 513, question: "Do you have sole responsibility for your child?", type: 'radio', options: ['Yes', 'No'], required: true, step: 3, category: "Child Information" },
    { id: 514, question: "Do you have access rights to your child?", type: 'radio', options: ['Yes', 'No'], required: true, step: 3, category: "Child Information" },
    { id: 515, question: "Can you maintain and accommodate yourself without public funds?", type: 'radio', options: ['Yes', 'No'], required: true, step: 3, category: "Additional Information" }
  ],
  'Other': [
    { id: 601, question: "What is your full name?", type: 'text', required: true, step: 1, category: "Personal Information" },
    { id: 602, question: "What is your date of birth?", type: 'date', required: true, step: 1, category: "Personal Information" },
    { id: 603, question: "What is your nationality?", type: 'select', options: ['Turkish', 'English', 'Arabic', 'French', 'German', 'Italian', 'Spanish', 'Portuguese', 'Russian', 'Chinese', 'Japanese', 'Korean', 'Indian', 'Pakistani', 'Bangladeshi', 'Iranian', 'Iraqi', 'Syrian', 'Lebanese', 'Jordanian', 'Egyptian', 'Moroccan', 'Algerian', 'Tunisian', 'Libyan', 'Sudanese', 'Saudi Arabian', 'Emirati', 'Kuwaiti', 'Qatari', 'Bahraini', 'Omani', 'Yemeni', 'Afghan', 'Kazakh', 'Uzbek', 'Kyrgyz', 'Tajik', 'Turkmen', 'Azerbaijani', 'Georgian', 'Armenian', 'Ukrainian', 'Belarusian', 'Polish', 'Czech', 'Slovak', 'Hungarian', 'Romanian', 'Bulgarian', 'Croatian', 'Serbian', 'Bosnian', 'Albanian', 'Macedonian', 'Slovenian', 'Estonian', 'Latvian', 'Lithuanian', 'Finnish', 'Swedish', 'Norwegian', 'Danish', 'Icelandic', 'Dutch', 'Belgian', 'Swiss', 'Austrian', 'Greek', 'Cypriot', 'Maltese', 'Irish', 'Scottish', 'Welsh', 'Canadian', 'American', 'Mexican', 'Brazilian', 'Argentinian', 'Chilean', 'Colombian', 'Peruvian', 'Venezuelan', 'Ecuadorian', 'Uruguayan', 'Paraguayan', 'Bolivian', 'Australian', 'New Zealander', 'South African', 'Nigerian', 'Kenyan', 'Ghanaian', 'Ethiopian', 'Ugandan', 'Tanzanian', 'Moroccan', 'Algerian', 'Tunisian', 'Libyan', 'Sudanese', 'Other'], required: true, step: 1, category: "Personal Information" },
    { id: 604, question: "What is your gender?", type: 'radio', options: ['Male', 'Female', 'Other', 'Prefer not to say'], required: true, step: 1, category: "Personal Information" },
    { id: 605, question: "What is your contact email?", type: 'email', required: true, step: 1, category: "Personal Information" },
    { id: 606, question: "What is your contact phone number?", type: 'text', required: true, step: 1, category: "Personal Information" },
    { id: 607, question: "What is your passport number?", type: 'text', required: true, step: 2, category: "Passport Information" },
    { id: 608, question: "When does your passport expire?", type: 'date', required: true, step: 2, category: "Passport Information" },
    { id: 609, question: "Where was your passport issued?", type: 'text', required: true, step: 2, category: "Passport Information" },
    { id: 610, question: "What type of visa are you applying for?", type: 'text', required: true, step: 3, category: "Visa Information" },
    { id: 611, question: "What is the purpose of your visit?", type: 'text', required: true, step: 3, category: "Visa Information" },
    { id: 612, question: "How long do you plan to stay?", type: 'select', options: ['Less than 6 months', '6-12 months', '1-2 years', 'More than 2 years'], required: true, step: 3, category: "Visa Information" },
    { id: 613, question: "Do you have a sponsor in the UK?", type: 'radio', options: ['Yes', 'No'], required: true, step: 3, category: "Visa Information" },
    { id: 614, question: "What is your English proficiency level?", type: 'select', options: ['IELTS 6.0', 'IELTS 6.5', 'IELTS 7.0', 'IELTS 7.5', 'IELTS 8.0', 'TOEFL 80', 'TOEFL 90', 'TOEFL 100', 'TOEFL 110', 'Other'], required: true, step: 3, category: "Visa Information" },
    { id: 615, question: "Do you have any dependents joining you?", type: 'radio', options: ['Yes', 'No'], required: true, step: 3, category: "Visa Information" }
  ]
}

const getEligibilityResult = (answers: Record<number, string>, visaType: string): EligibilityResult => {
  const totalQuestions = visaSpecificQuestions[visaType]?.length || 0
  let score = 0
  const recommendations: string[] = []
  const nextSteps: string[] = []

  // Basic scoring logic
  Object.entries(answers).forEach(([questionId, answer]) => {
    const id = parseInt(questionId)
    
    // Positive scoring for good answers
    if (answer === 'Yes' && (id === 112 || id === 113 || id === 213 || id === 313 || id === 314 || id === 415 || id === 515)) {
      score += 2
    } else if (answer === 'No' && (id === 114 || id === 215 || id === 315)) {
      score += 2
    } else if (answer && answer !== 'No' && answer !== 'Yes') {
      score += 1
    }
  })

  const percentage = Math.round((score / (totalQuestions * 2)) * 100)

  if (percentage >= 80) {
    return {
      eligible: true,
      score,
      level: "Highly Eligible",
      description: `Excellent! You scored ${score} points (${percentage}%). You have a very strong case for your ${visaType} application.`,
      recommendations: [
        "Gather all required documents",
        "Prepare a strong application",
        "Consider professional assistance for complex cases"
      ],
      nextSteps: ["Submit application", "Prepare for interview if required", "Monitor application status"]
    }
  } else if (percentage >= 60) {
    return {
      eligible: true,
      score,
      level: "Eligible",
      description: `Good! You scored ${score} points (${percentage}%). You meet the basic requirements for your ${visaType} application.`,
      recommendations: [
        "Address any identified issues",
        "Gather supporting documents",
        "Consider professional consultation"
      ],
      nextSteps: ["Address identified issues", "Prepare application", "Submit when ready"]
    }
  } else if (percentage >= 40) {
    return {
      eligible: false,
      score,
      level: "Partially Eligible",
      description: `You scored ${score} points (${percentage}%). You may be eligible but need to address some issues first.`,
      recommendations: [
        "Address all identified issues",
        "Consider professional consultation",
        "Gather additional supporting documents"
      ],
      nextSteps: ["Consult immigration specialist", "Address all negative factors", "Consider alternative visa options"]
    }
  } else {
    return {
      eligible: false,
      score,
      level: "Not Eligible",
      description: `You scored ${score} points (${percentage}%). Significant improvements are needed before applying.`,
      recommendations: [
        "Address all critical issues",
        "Consider alternative visa types",
        "Seek professional immigration advice"
      ],
      nextSteps: ["Consult immigration specialist", "Address all critical issues", "Consider alternative visa options"]
    }
  }
}

export const EligibilityCheckComponent: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1)
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const [showResult, setShowResult] = useState(false)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedVisaType, setSelectedVisaType] = useState<string>('')
  const [showVisaTypeSelection, setShowVisaTypeSelection] = useState(true)

  // Get questions based on selected visa type
  const currentQuestions = selectedVisaType ? visaSpecificQuestions[selectedVisaType] || [] : []
  const currentStepQuestions = currentQuestions.filter(q => q.step === currentStep)
  const totalSteps = Math.max(...currentQuestions.map(q => q.step), 0)
  const currentQuestion = currentStepQuestions[currentQuestionIndex]

  const handleAnswerChange = (questionId: number, value: string) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: value
    }))
  }

  const handleNext = () => {
    if (currentQuestionIndex < currentStepQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    } else if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
      setCurrentQuestionIndex(0)
    } else {
      // Assessment completed
      const result = getEligibilityResult(answers, selectedVisaType)
      setShowResult(true)
    }
  }

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1)
    } else if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
      const prevStepQuestions = currentQuestions.filter(q => q.step === currentStep - 1)
      setCurrentQuestionIndex(prevStepQuestions.length - 1)
    }
  }

  const handleVisaTypeSelect = (visaType: string) => {
    setSelectedVisaType(visaType)
    setShowVisaTypeSelection(false)
    setCurrentStep(1)
    setCurrentQuestionIndex(0)
    setAnswers({})
  }

  const resetAssessment = () => {
    setCurrentStep(1)
    setAnswers({})
    setShowResult(false)
    setCurrentQuestionIndex(0)
    setSelectedVisaType('')
    setShowVisaTypeSelection(true)
  }

  if (showResult) {
    const result = getEligibilityResult(answers, selectedVisaType)
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
              <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full mb-6 ${
                result.eligible ? 'bg-green-100' : 'bg-yellow-100'
              }`}>
                <Award className={`w-10 h-10 ${result.eligible ? 'text-green-600' : 'text-yellow-600'}`} />
              </div>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">Assessment Complete!</h1>
              <p className="text-xl text-gray-600">Here are your results</p>
            </div>

            {/* Result Card */}
            <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
              <div className="text-center mb-8">
                <div className={`inline-flex items-center justify-center w-24 h-24 rounded-full mb-4 ${
                  result.eligible ? 'bg-green-100' : 'bg-yellow-100'
                }`}>
                  <span className={`text-3xl font-bold ${result.eligible ? 'text-green-600' : 'text-yellow-600'}`}>
                    {result.score}
                  </span>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">{result.level}</h2>
                <p className="text-lg text-gray-600">{result.description}</p>
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

              {/* Next Steps */}
              <div className="mb-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Next Steps</h3>
                <ul className="space-y-3">
                  {result.nextSteps.map((step, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{step}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={resetAssessment}
                  className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Retake Assessment
                </button>
                <button
                  onClick={() => window.location.href = '/contact'}
                  className="px-8 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors"
                >
                  Get Professional Help
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (showVisaTypeSelection) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">UK Visa Eligibility Check</h1>
              <p className="text-xl text-gray-600 mb-6">Select your visa type to get personalized questions</p>
            </div>

            {/* Visa Type Selection */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Object.keys(visaSpecificQuestions).map((visaType) => (
                <button
                  key={visaType}
                  onClick={() => handleVisaTypeSelect(visaType)}
                  className="p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 text-left"
                >
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                      <FileText className="w-6 h-6 text-blue-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">{visaType}</h3>
                  </div>
                  <p className="text-gray-600 text-sm">
                    {visaSpecificQuestions[visaType].length} questions • ~10 minutes
                  </p>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Breadcrumb */}
      <Breadcrumb items={[{ label: 'Eligibility Check' }]} />
      
      <div className="py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">UK Visa Eligibility Check</h1>
              <p className="text-xl text-gray-600 mb-6">Complete our assessment to check your visa eligibility</p>
              <div className="inline-block bg-blue-100 text-blue-800 text-sm font-semibold px-4 py-2 rounded-full mb-4">
                Selected: {selectedVisaType}
              </div>
              
              {/* Progress Bar */}
              <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
                <div 
                  className="bg-blue-600 h-3 rounded-full transition-all duration-300"
                  style={{ width: `${((currentStep - 1) * 100 + (currentQuestionIndex + 1) * (100 / currentStepQuestions.length)) / totalSteps}%` }}
                ></div>
              </div>
              <p className="text-sm text-gray-600">
                Step {currentStep} of {totalSteps} • Question {currentQuestionIndex + 1} of {currentStepQuestions.length}
              </p>
            </div>

            {/* Question Card */}
            <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
              <div className="mb-6">
                <span className="inline-block bg-blue-100 text-blue-800 text-sm font-semibold px-3 py-1 rounded-full mb-4">
                  {currentQuestion?.category}
                </span>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">{currentQuestion?.question}</h2>
              </div>

              {/* Answer Options */}
              <div className="space-y-4 mb-8">
                {currentQuestion?.type === 'text' && (
                  <input
                    type="text"
                    value={answers[currentQuestion.id] || ''}
                    onChange={(e) => handleAnswerChange(currentQuestion.id, e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your answer"
                  />
                )}

                {currentQuestion?.type === 'email' && (
                  <input
                    type="email"
                    value={answers[currentQuestion.id] || ''}
                    onChange={(e) => handleAnswerChange(currentQuestion.id, e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your email"
                  />
                )}

                {currentQuestion?.type === 'date' && (
                  <input
                    type="date"
                    value={answers[currentQuestion.id] || ''}
                    onChange={(e) => handleAnswerChange(currentQuestion.id, e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                )}

                {currentQuestion?.type === 'tel' && (
                  <input
                    type="tel"
                    value={answers[currentQuestion.id] || ''}
                    onChange={(e) => handleAnswerChange(currentQuestion.id, e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your phone number"
                  />
                )}

                {currentQuestion?.type === 'select' && (
                  <select
                    value={answers[currentQuestion.id] || ''}
                    onChange={(e) => handleAnswerChange(currentQuestion.id, e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select an option</option>
                    {currentQuestion.options?.map((option, index) => (
                      <option key={index} value={option}>{option}</option>
                    ))}
                  </select>
                )}

                {currentQuestion?.type === 'radio' && (
                  <div className="space-y-3">
                    {currentQuestion.options?.map((option, index) => (
                      <label key={index} className="flex items-center p-4 border-2 border-gray-200 rounded-lg hover:border-gray-300 cursor-pointer">
                        <input
                          type="radio"
                          name={`question-${currentQuestion.id}`}
                          value={option}
                          checked={answers[currentQuestion.id] === option}
                          onChange={(e) => handleAnswerChange(currentQuestion.id, e.target.value)}
                          className="mr-3"
                        />
                        <span className="text-gray-900">{option}</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>

              {/* Navigation Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-between">
                <button
                  onClick={handlePrevious}
                  disabled={currentStep === 1 && currentQuestionIndex === 0}
                  className="px-6 py-3 bg-gray-500 text-white font-semibold rounded-lg hover:bg-gray-600 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center"
                >
                  <ArrowLeft className="w-5 h-5 mr-2" />
                  Previous
                </button>
                
                <button
                  onClick={handleNext}
                  disabled={currentQuestion?.required && !answers[currentQuestion.id]}
                  className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center"
                >
                  {currentStep === totalSteps && currentQuestionIndex === currentStepQuestions.length - 1 ? 'Complete Assessment' : 'Next'}
                  <ArrowRight className="w-5 h-5 ml-2" />
                </button>
              </div>
            </div>

            {/* Assessment Info */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg p-6 text-center shadow-lg">
                <Users className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900 mb-1">Free Assessment</h3>
                <p className="text-sm text-gray-600">No registration required</p>
              </div>
              <div className="bg-white rounded-lg p-6 text-center shadow-lg">
                <TrendingUp className="w-8 h-8 text-green-600 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900 mb-1">Instant Results</h3>
                <p className="text-sm text-gray-600">Get your eligibility score</p>
              </div>
              <div className="bg-white rounded-lg p-6 text-center shadow-lg">
                <Globe className="w-8 h-8 text-purple-600 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900 mb-1">Comprehensive</h3>
                <p className="text-sm text-gray-600">All visa types covered</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EligibilityCheckComponent