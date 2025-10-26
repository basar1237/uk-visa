'use client'

import React, { useState } from 'react'
import { CheckCircle, Clock, Award, FileText, Globe, Users, TrendingUp, Star, ArrowRight, ArrowLeft } from 'lucide-react'

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
    { id: 210, question: "Which university will you attend?", type: 'text', required: true, step: 3, category: "Study Information" },
    { id: 211, question: "What course will you study?", type: 'text', required: true, step: 3, category: "Study Information" },
    { id: 212, question: "What is your English proficiency level?", type: 'select', options: ['IELTS 6.0', 'IELTS 6.5', 'IELTS 7.0', 'IELTS 7.5', 'IELTS 8.0', 'TOEFL 80', 'TOEFL 90', 'TOEFL 100', 'TOEFL 110', 'Other'], required: true, step: 3, category: "Study Information" },
    { id: 213, question: "Do you have a Confirmation of Acceptance for Studies (CAS)?", type: 'radio', options: ['Yes', 'No'], required: true, step: 3, category: "Study Information" },
    { id: 214, question: "How will you fund your studies?", type: 'select', options: ['Personal savings', 'Family support', 'Scholarship', 'Student loan', 'Other'], required: true, step: 3, category: "Study Information" },
    { id: 215, question: "Do you have any dependents joining you?", type: 'radio', options: ['Yes', 'No'], required: true, step: 3, category: "Study Information" }
  ],
  'Skilled Worker Visa': [
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
    { id: 311, question: "What is your annual salary?", type: 'select', options: ['£20,000 - £30,000', '£30,000 - £40,000', '£40,000 - £50,000', '£50,000 - £60,000', '£60,000 - £70,000', '£70,000 - £80,000', '£80,000+'], required: true, step: 3, category: "Work Information" },
    { id: 312, question: "Do you have a Certificate of Sponsorship (COS)?", type: 'radio', options: ['Yes', 'No'], required: true, step: 3, category: "Work Information" },
    { id: 313, question: "What is your English proficiency level?", type: 'select', options: ['IELTS 6.0', 'IELTS 6.5', 'IELTS 7.0', 'IELTS 7.5', 'IELTS 8.0', 'TOEFL 80', 'TOEFL 90', 'TOEFL 100', 'TOEFL 110', 'Other'], required: true, step: 3, category: "Work Information" },
    { id: 314, question: "Do you have any dependents joining you?", type: 'radio', options: ['Yes', 'No'], required: true, step: 3, category: "Work Information" },
    { id: 315, question: "Have you worked in the UK before?", type: 'radio', options: ['Yes', 'No'], required: true, step: 3, category: "Work Information" }
  ],
  'Spouse Visa': [
    { id: 401, question: "What is your full name?", type: 'text', required: true, step: 1, category: "Personal Information" },
    { id: 402, question: "What is your date of birth?", type: 'date', required: true, step: 1, category: "Personal Information" },
    { id: 403, question: "What is your nationality?", type: 'select', options: ['Turkish', 'English', 'Arabic', 'French', 'German', 'Italian', 'Spanish', 'Portuguese', 'Russian', 'Chinese', 'Japanese', 'Korean', 'Indian', 'Pakistani', 'Bangladeshi', 'Iranian', 'Iraqi', 'Syrian', 'Lebanese', 'Jordanian', 'Egyptian', 'Moroccan', 'Algerian', 'Tunisian', 'Libyan', 'Sudanese', 'Saudi Arabian', 'Emirati', 'Kuwaiti', 'Qatari', 'Bahraini', 'Omani', 'Yemeni', 'Afghan', 'Kazakh', 'Uzbek', 'Kyrgyz', 'Tajik', 'Turkmen', 'Azerbaijani', 'Georgian', 'Armenian', 'Ukrainian', 'Belarusian', 'Polish', 'Czech', 'Slovak', 'Hungarian', 'Romanian', 'Bulgarian', 'Croatian', 'Serbian', 'Bosnian', 'Albanian', 'Macedonian', 'Slovenian', 'Estonian', 'Latvian', 'Lithuanian', 'Finnish', 'Swedish', 'Norwegian', 'Danish', 'Icelandic', 'Dutch', 'Belgian', 'Swiss', 'Austrian', 'Greek', 'Cypriot', 'Maltese', 'Irish', 'Scottish', 'Welsh', 'Canadian', 'American', 'Mexican', 'Brazilian', 'Argentinian', 'Chilean', 'Colombian', 'Peruvian', 'Venezuelan', 'Ecuadorian', 'Uruguayan', 'Paraguayan', 'Bolivian', 'Australian', 'New Zealander', 'South African', 'Nigerian', 'Kenyan', 'Ghanaian', 'Ethiopian', 'Ugandan', 'Tanzanian', 'Moroccan', 'Algerian', 'Tunisian', 'Libyan', 'Sudanese', 'Other'], required: true, step: 1, category: "Personal Information" },
    { id: 404, question: "What is your gender?", type: 'radio', options: ['Male', 'Female', 'Other', 'Prefer not to say'], required: true, step: 1, category: "Personal Information" },
    { id: 405, question: "What is your contact email?", type: 'email', required: true, step: 1, category: "Personal Information" },
    { id: 406, question: "What is your contact phone number?", type: 'tel', required: true, step: 1, category: "Personal Information" },
    { id: 407, question: "What is your passport number?", type: 'passport', required: true, step: 2, category: "Passport Information" },
    { id: 408, question: "When does your passport expire?", type: 'passport-date', required: true, step: 2, category: "Passport Information" },
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
    { id: 506, question: "What is your contact phone number?", type: 'tel', required: true, step: 1, category: "Personal Information" },
    { id: 507, question: "What is your passport number?", type: 'passport', required: true, step: 2, category: "Passport Information" },
    { id: 508, question: "When does your passport expire?", type: 'passport-date', required: true, step: 2, category: "Passport Information" },
    { id: 509, question: "Where was your passport issued?", type: 'text', required: true, step: 2, category: "Passport Information" },
    { id: 510, question: "What is your child's name?", type: 'text', required: true, step: 3, category: "Child Information" },
    { id: 511, question: "What is your child's age?", type: 'select', options: ['Under 18', '18-21', '21+'], required: true, step: 3, category: "Child Information" },
    { id: 512, question: "What is your child's nationality?", type: 'select', options: ['British', 'EU Citizen', 'Other'], required: true, step: 3, category: "Child Information" },
    { id: 513, question: "Does your child live in the UK?", type: 'radio', options: ['Yes', 'No'], required: true, step: 3, category: "Child Information" },
    { id: 514, question: "What is your child's annual income?", type: 'select', options: ['£18,600 - £25,000', '£25,000 - £35,000', '£35,000 - £50,000', '£50,000+'], required: true, step: 3, category: "Child Information" },
    { id: 515, question: "Do you have evidence of your relationship?", type: 'radio', options: ['Yes', 'No'], required: true, step: 3, category: "Child Information" }
  ],
  'Other': [
    { id: 601, question: "What is your full name?", type: 'text', required: true, step: 1, category: "Personal Information" },
    { id: 602, question: "What is your date of birth?", type: 'date', required: true, step: 1, category: "Personal Information" },
    { id: 603, question: "What is your nationality?", type: 'select', options: ['Turkish', 'English', 'Arabic', 'French', 'German', 'Italian', 'Spanish', 'Portuguese', 'Russian', 'Chinese', 'Japanese', 'Korean', 'Indian', 'Pakistani', 'Bangladeshi', 'Iranian', 'Iraqi', 'Syrian', 'Lebanese', 'Jordanian', 'Egyptian', 'Moroccan', 'Algerian', 'Tunisian', 'Libyan', 'Sudanese', 'Saudi Arabian', 'Emirati', 'Kuwaiti', 'Qatari', 'Bahraini', 'Omani', 'Yemeni', 'Afghan', 'Kazakh', 'Uzbek', 'Kyrgyz', 'Tajik', 'Turkmen', 'Azerbaijani', 'Georgian', 'Armenian', 'Ukrainian', 'Belarusian', 'Polish', 'Czech', 'Slovak', 'Hungarian', 'Romanian', 'Bulgarian', 'Croatian', 'Serbian', 'Bosnian', 'Albanian', 'Macedonian', 'Slovenian', 'Estonian', 'Latvian', 'Lithuanian', 'Finnish', 'Swedish', 'Norwegian', 'Danish', 'Icelandic', 'Dutch', 'Belgian', 'Swiss', 'Austrian', 'Greek', 'Cypriot', 'Maltese', 'Irish', 'Scottish', 'Welsh', 'Canadian', 'American', 'Mexican', 'Brazilian', 'Argentinian', 'Chilean', 'Colombian', 'Peruvian', 'Venezuelan', 'Ecuadorian', 'Uruguayan', 'Paraguayan', 'Bolivian', 'Australian', 'New Zealander', 'South African', 'Nigerian', 'Kenyan', 'Ghanaian', 'Ethiopian', 'Ugandan', 'Tanzanian', 'Moroccan', 'Algerian', 'Tunisian', 'Libyan', 'Sudanese', 'Other'], required: true, step: 1, category: "Personal Information" },
    { id: 604, question: "What is your gender?", type: 'radio', options: ['Male', 'Female', 'Other', 'Prefer not to say'], required: true, step: 1, category: "Personal Information" },
    { id: 605, question: "What is your contact email?", type: 'email', required: true, step: 1, category: "Personal Information" },
    { id: 606, question: "What is your contact phone number?", type: 'tel', required: true, step: 1, category: "Personal Information" },
    { id: 607, question: "What is your passport number?", type: 'passport', required: true, step: 2, category: "Passport Information" },
    { id: 608, question: "When does your passport expire?", type: 'passport-date', required: true, step: 2, category: "Passport Information" },
    { id: 609, question: "Where was your passport issued?", type: 'text', required: true, step: 2, category: "Passport Information" },
    { id: 610, question: "What type of visa are you applying for?", type: 'text', required: true, step: 3, category: "Visa Information" },
    { id: 611, question: "What is the purpose of your visit?", type: 'text', required: true, step: 3, category: "Visa Information" },
    { id: 612, question: "How long do you plan to stay?", type: 'select', options: ['Less than 6 months', '6-12 months', '1-2 years', 'More than 2 years'], required: true, step: 3, category: "Visa Information" },
    { id: 613, question: "Do you have a sponsor in the UK?", type: 'radio', options: ['Yes', 'No'], required: true, step: 3, category: "Visa Information" },
    { id: 614, question: "What is your English proficiency level?", type: 'select', options: ['IELTS 6.0', 'IELTS 6.5', 'IELTS 7.0', 'IELTS 7.5', 'IELTS 8.0', 'TOEFL 80', 'TOEFL 90', 'TOEFL 100', 'TOEFL 110', 'Other'], required: true, step: 3, category: "Visa Information" },
    { id: 615, question: "Do you have any dependents joining you?", type: 'radio', options: ['Yes', 'No'], required: true, step: 3, category: "Visa Information" }
  ]
}

const questions: Question[] = [
  {
    id: 1,
    question: "What is your full name?",
    type: 'text',
    required: true,
    step: 1,
    category: "Personal Information"
  },
  {
    id: 2,
    question: "What is your date of birth?",
    type: 'date',
    required: true,
    step: 1,
    category: "Personal Information"
  },
  {
    id: 3,
    question: "What is your nationality?",
    type: 'select',
    options: [
      'Turkish',
      'English',
      'Arabic',
      'French',
      'German',
      'Italian',
      'Spanish',
      'Portuguese',
      'Russian',
      'Chinese',
      'Japanese',
      'Korean',
      'Indian',
      'Pakistani',
      'Bangladeshi',
      'Iranian',
      'Iraqi',
      'Syrian',
      'Lebanese',
      'Jordanian',
      'Egyptian',
      'Moroccan',
      'Algerian',
      'Tunisian',
      'Libyan',
      'Sudanese',
      'Saudi Arabian',
      'Emirati',
      'Kuwaiti',
      'Qatari',
      'Bahraini',
      'Omani',
      'Yemeni',
      'Afghan',
      'Kazakh',
      'Uzbek',
      'Kyrgyz',
      'Tajik',
      'Turkmen',
      'Azerbaijani',
      'Georgian',
      'Armenian',
      'Ukrainian',
      'Belarusian',
      'Polish',
      'Czech',
      'Slovak',
      'Hungarian',
      'Romanian',
      'Bulgarian',
      'Croatian',
      'Serbian',
      'Bosnian',
      'Albanian',
      'Macedonian',
      'Slovenian',
      'Estonian',
      'Latvian',
      'Lithuanian',
      'Finnish',
      'Swedish',
      'Norwegian',
      'Danish',
      'Icelandic',
      'Dutch',
      'Belgian',
      'Swiss',
      'Austrian',
      'Greek',
      'Cypriot',
      'Maltese',
      'Irish',
      'Scottish',
      'Welsh',
      'Canadian',
      'American',
      'Mexican',
      'Brazilian',
      'Argentinian',
      'Chilean',
      'Colombian',
      'Peruvian',
      'Venezuelan',
      'Ecuadorian',
      'Uruguayan',
      'Paraguayan',
      'Bolivian',
      'Australian',
      'New Zealander',
      'South African',
      'Nigerian',
      'Kenyan',
      'Ghanaian',
      'Ethiopian',
      'Ugandan',
      'Tanzanian',
      'Moroccan',
      'Algerian',
      'Tunisian',
      'Libyan',
      'Sudanese',
      'Other'
    ],
    required: true,
    step: 1,
    category: "Personal Information"
  },
  {
    id: 4,
    question: "What is your gender?",
    type: 'radio',
    options: ['Male', 'Female', 'Other', 'Prefer not to say'],
    required: true,
    step: 1,
    category: "Personal Information"
  },
  {
    id: 5,
    question: "What is your contact email?",
    type: 'email',
    required: true,
    step: 1,
    category: "Personal Information"
  },
  {
    id: 6,
    question: "What is your contact phone number?",
    type: 'tel',
    required: true,
    step: 1,
    category: "Personal Information"
  },

  // Step 2: Passport Information
  {
    id: 7,
    question: "What is your passport number?",
    type: 'passport',
    required: true,
    step: 2,
    category: "Passport Information"
  },
  {
    id: 8,
    question: "When does your passport expire?",
    type: 'passport-date',
    required: true,
    step: 2,
    category: "Passport Information"
  },
  {
    id: 9,
    question: "Where was your passport issued?",
    type: 'text',
    required: true,
    step: 2,
    category: "Passport Information"
  },

  // Step 3: Visa Type & Purpose
  {
    id: 10,
    question: "Which visa are you applying for?",
    type: 'select',
    options: ['Visitor Visa', 'Student Visa', 'Skilled Worker Visa', 'Spouse Visa', 'Parent Visa', 'Other'],
    required: true,
    step: 3,
    category: "Visa Type & Purpose"
  },
  {
    id: 11,
    question: "Who is the application for?",
    type: 'radio',
    options: ['Myself', 'On behalf of someone else'],
    required: true,
    step: 3,
    category: "Visa Type & Purpose"
  },
  {
    id: 12,
    question: "What is the main purpose of your visit?",
    type: 'select',
    options: ['Tourism', 'Study', 'Work', 'Family / Spouse reunion', 'Other'],
    required: true,
    step: 3,
    category: "Visa Type & Purpose"
  },

  // Step 4: Background Information
  {
    id: 13,
    question: "Have you ever applied for a UK visa before?",
    type: 'radio',
    options: ['Yes', 'No'],
    required: true,
    step: 4,
    category: "Background Information"
  },
  {
    id: 14,
    question: "Have you ever been refused a visa or entry to the UK or another country?",
    type: 'radio',
    options: ['Yes', 'No'],
    required: true,
    step: 4,
    category: "Background Information"
  },
  {
    id: 15,
    question: "Do you have any criminal convictions?",
    type: 'radio',
    options: ['Yes', 'No'],
    required: true,
    step: 4,
    category: "Background Information"
  },
  {
    id: 16,
    question: "Do you have sufficient funds to support your stay in the UK?",
    type: 'radio',
    options: ['Yes', 'No'],
    required: true,
    step: 4,
    category: "Background Information"
  },

  // Step 5: Additional Information
  {
    id: 17,
    question: "Do you have any family members in the UK?",
    type: 'radio',
    options: ['Yes', 'No'],
    required: true,
    step: 5,
    category: "Additional Information"
  },
  {
    id: 18,
    question: "If yes, what is their relationship to you?",
    type: 'text',
    required: false,
    step: 5,
    category: "Additional Information"
  },
  {
    id: 19,
    question: "Do you have a sponsor in the UK?",
    type: 'radio',
    options: ['Yes', 'No'],
    required: true,
    step: 5,
    category: "Additional Information"
  },
  {
    id: 20,
    question: "Any other relevant information you would like to provide?",
    type: 'textarea',
    required: false,
    step: 5,
    category: "Additional Information"
  }
]

const getEligibilityResult = (answers: Record<number, string>): EligibilityResult => {
  let score = 0
  const issues: string[] = []
  const recommendations: string[] = []

  // Check critical eligibility factors
  if (answers[14] === 'Yes') {
    score -= 20
    issues.push('Previous visa refusal')
    recommendations.push('Provide detailed explanation of previous refusal')
  }

  if (answers[15] === 'Yes') {
    score -= 30
    issues.push('Criminal convictions')
    recommendations.push('Obtain police clearance certificates')
  }

  if (answers[16] === 'No') {
    score -= 25
    issues.push('Insufficient funds')
    recommendations.push('Gather financial documents and bank statements')
  }

  // Positive factors
  if (answers[13] === 'Yes') {
    score += 10
    recommendations.push('Previous UK visa experience is beneficial')
  }

  if (answers[17] === 'Yes') {
    score += 5
    recommendations.push('Family connections can support your application')
  }

  if (answers[19] === 'Yes') {
    score += 15
    recommendations.push('UK sponsor will strengthen your application')
  }

  // Determine eligibility level
  if (score >= 50) {
    return {
      eligible: true,
      score,
      level: "Highly Eligible",
      description: "Your application has a very strong chance of success. You meet most requirements and have positive factors supporting your case.",
      recommendations: [...recommendations, "Proceed with confidence", "Gather all required documents"],
      nextSteps: ["Complete visa application form", "Book biometric appointment", "Submit application"]
    }
  } else if (score >= 20) {
    return {
      eligible: true,
      score,
      level: "Likely Eligible",
      description: "Your application has a good chance of success. Address any issues identified to strengthen your case.",
      recommendations: [...recommendations, "Address identified issues", "Gather supporting documents"],
      nextSteps: ["Review requirements carefully", "Prepare additional documentation", "Consider professional advice"]
    }
  } else if (score >= 0) {
    return {
      eligible: false,
      score,
      level: "Conditionally Eligible",
      description: "Your application may face challenges. Significant preparation and documentation will be required.",
      recommendations: [...recommendations, "Address all identified issues", "Consider professional consultation"],
      nextSteps: ["Consult with immigration lawyer", "Gather comprehensive documentation", "Prepare detailed explanations"]
    }
  } else {
    return {
      eligible: false,
      score,
      level: "Not Currently Eligible",
      description: "Your application faces significant challenges. Major issues need to be resolved before applying.",
      recommendations: [...recommendations, "Resolve critical issues first", "Seek professional legal advice"],
      nextSteps: ["Consult immigration specialist", "Address all negative factors", "Consider alternative visa options"]
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
  const currentQuestion = currentStepQuestions[currentQuestionIndex]
  const totalSteps = 3 // All visa types have 3 steps
  const totalQuestions = currentQuestions.length
  const currentQuestionNumber = currentQuestions.findIndex(q => q.id === currentQuestion?.id) + 1
  const progress = (currentQuestionNumber / totalQuestions) * 100

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

  const handleNext = async () => {
    // Email validation for email type questions
    if (currentQuestion?.type === 'email' && answers[currentQuestion.id]) {
      if (!isValidEmail(answers[currentQuestion.id])) {
        alert('Please enter a valid email address')
        return
      }
    }

    if (currentQuestionIndex < currentStepQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    } else if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
      setCurrentQuestionIndex(0)
    } else {
      // Test completed - save to database
      const result = getEligibilityResult(answers)
      await saveEligibilitySubmission(answers, result)
      setShowResult(true)
    }
  }

  const saveEligibilitySubmission = async (answers: Record<number, string>, result: EligibilityResult) => {
    try {
      // Get the first question ID for the selected visa type
      const firstQuestionId = currentQuestions[0]?.id || 1
      
      // Form verilerini collection'a gönder
      const submissionData = {
        fullName: answers[firstQuestionId] || '',
        dateOfBirth: answers[firstQuestionId + 1] || '',
        nationality: answers[firstQuestionId + 2] || '',
        gender: answers[firstQuestionId + 3] || '',
        email: answers[firstQuestionId + 4] || '',
        phone: answers[firstQuestionId + 5] || '',
        passportNumber: answers[firstQuestionId + 6] || '',
        passportExpiry: answers[firstQuestionId + 7] || '',
        passportIssuedBy: answers[firstQuestionId + 8] || '',
        visaType: selectedVisaType,
        applicationFor: 'myself',
        visitPurpose: answers[firstQuestionId + 9] || '',
        previousUKVisa: 'no',
        visaRefusal: 'no',
        criminalConvictions: 'no',
        sufficientFunds: 'yes',
        familyInUK: 'no',
        familyRelationship: '',
        ukSponsor: 'no',
        additionalInfo: '',
        eligible: result.eligible,
        score: result.score,
        level: result.level,
        description: result.description,
        recommendations: result.recommendations.map(rec => ({ recommendation: rec })),
        nextSteps: result.nextSteps.map(step => ({ step }))
      }

      console.log('Sending eligibility submission data:', submissionData)

      const response = await fetch('/api/eligibility-submissions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submissionData),
      })

      if (response.ok) {
        const data = await response.json()
        console.log('Eligibility submission saved successfully:', data)
      } else {
        const errorData = await response.json()
        console.error('Failed to save eligibility submission:', errorData)
        console.error('Response status:', response.status)
        console.error('Response headers:', response.headers)
        alert(`Form kaydedilirken hata oluştu: ${errorData.details || errorData.error || 'Bilinmeyen hata'}`)
      }
    } catch (error) {
      console.error('Error saving eligibility submission:', error)
      alert('Form kaydedilirken hata oluştu. Lütfen tekrar deneyin.')
    }
  }

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1)
    } else if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
      setCurrentQuestionIndex(currentStepQuestions.length - 1)
    }
  }

  const resetAssessment = () => {
    setCurrentStep(1)
    setCurrentQuestionIndex(0)
    setAnswers({})
    setShowResult(false)
    setSelectedVisaType('')
    setShowVisaTypeSelection(true)
  }

  if (showResult) {
    const result = getEligibilityResult(answers)
    
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
              <p className="text-xl text-gray-600">Here are your eligibility results</p>
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
                  Get Professional Consultation
                </button>
              </div>
            </div>

            {/* Assessment Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg p-6 text-center shadow-lg">
                <FileText className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900 mb-1">Questions Answered</h3>
                <p className="text-2xl font-bold text-blue-600">{Object.keys(answers).length}</p>
              </div>
              <div className="bg-white rounded-lg p-6 text-center shadow-lg">
                <Clock className="w-8 h-8 text-green-600 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900 mb-1">Assessment Time</h3>
                <p className="text-2xl font-bold text-green-600">~10 minutes</p>
              </div>
              <div className="bg-white rounded-lg p-6 text-center shadow-lg">
                <Globe className="w-8 h-8 text-purple-600 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900 mb-1">Coverage</h3>
                <p className="text-2xl font-bold text-purple-600">UK Visas</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Visa type selection screen
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
            <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Which visa are you applying for?</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  { type: 'Visitor Visa', description: 'Tourism, business, family visits' },
                  { type: 'Student Visa', description: 'Study at UK universities' },
                  { type: 'Skilled Worker Visa', description: 'Work in the UK' },
                  { type: 'Spouse Visa', description: 'Join family in the UK' },
                  { type: 'Parent Visa', description: 'Join children in the UK' },
                  { type: 'Other', description: 'Other visa types' }
                ].map((visa, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setSelectedVisaType(visa.type)
                      setShowVisaTypeSelection(false)
                    }}
                    className="p-6 border-2 border-gray-200 rounded-lg hover:border-blue-500 transition-all text-left group bg-gray-50 hover:bg-blue-100"
                  >
                    <h3 className="font-semibold text-gray-900 mb-2">{visa.type}</h3>
                    <p className="text-sm text-gray-600">{visa.description}</p>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-32">
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
                style={{ width: `${progress}%` }}
              ></div>
            </div>
             <p className="text-sm text-gray-600">Question {currentQuestionNumber} of {totalQuestions} - {currentQuestion?.category}</p>
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
                  className="w-full p-4 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
                  placeholder="Enter your answer..."
                />
              )}

              {currentQuestion?.type === 'email' && (
                <input
                  type="email"
                  value={answers[currentQuestion.id] || ''}
                  onChange={(e) => handleAnswerChange(currentQuestion.id, e.target.value)}
                  className="w-full p-4 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
                  placeholder="Enter your email address..."
                />
              )}

              {currentQuestion?.type === 'tel' && (
                <input
                  type="tel"
                  value={answers[currentQuestion.id] || ''}
                  onChange={(e) => {
                    let value = e.target.value.replace(/\D/g, '') // Sadece rakamları al
                    if (value.length > 0 && !value.startsWith('0')) {
                      value = '0' + value // Başında 0 yoksa ekle
                    }
                    if (value.length > 11) {
                      value = value.substring(0, 11) // Maksimum 11 karakter
                    }
                    // Format: 0 5XX XXX XX XX
                    if (value.length > 1) {
                      value = value.replace(/(\d)(\d{3})(\d{3})(\d{2})(\d{2})/, '$1 $2 $3 $4 $5')
                    }
                    handleAnswerChange(currentQuestion.id, value)
                  }}
                  className="w-full p-4 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
                  placeholder="Enter your phone number (e.g., 0 546 531 49 10)"
                  maxLength={15}
                />
              )}

              {currentQuestion?.type === 'passport' && (
                <input
                  type="text"
                  value={answers[currentQuestion.id] || ''}
                  onChange={(e) => handleAnswerChange(currentQuestion.id, e.target.value)}
                  className="w-full p-4 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
                  placeholder="Enter your passport number (e.g., A1234567)"
                  pattern="[A-Za-z0-9]+"
                  style={{ textTransform: 'uppercase' }}
                />
              )}

              {currentQuestion?.type === 'date' && (
                <input
                  type="date"
                  value={answers[currentQuestion.id] || ''}
                  onChange={(e) => handleAnswerChange(currentQuestion.id, e.target.value)}
                  className="w-full p-4 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
                  min={new Date().toISOString().split('T')[0]}
                  max="2050-12-31"
                />
              )}

              {currentQuestion?.type === 'passport-date' && (
                <input
                  type="date"
                  value={answers[currentQuestion.id] || ''}
                  onChange={(e) => handleAnswerChange(currentQuestion.id, e.target.value)}
                  className="w-full p-4 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
                  min="2030-01-01"
                  max="2050-12-31"
                />
              )}

              {currentQuestion?.type === 'textarea' && (
                <textarea
                  value={answers[currentQuestion.id] || ''}
                  onChange={(e) => handleAnswerChange(currentQuestion.id, e.target.value)}
                  className="w-full p-4 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none h-32"
                  placeholder="Enter your answer..."
                />
              )}

              {currentQuestion?.type === 'select' && (
                <select
                  value={answers[currentQuestion.id] || ''}
                  onChange={(e) => handleAnswerChange(currentQuestion.id, e.target.value)}
                  className="w-full p-4 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
                >
                  <option value="">Select an option...</option>
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
  )
}

export default EligibilityCheckComponent
