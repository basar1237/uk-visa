export interface Question {
  id: number
  question: string
  type: 'text' | 'email' | 'date' | 'select' | 'radio' | 'textarea'
  options?: string[]
  required: boolean
  step: number
  category: string
}

export const eligibilityQuestions: Question[] = [
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
    type: 'text',
    required: true,
    step: 1,
    category: "Personal Information"
  },
  {
    id: 7,
    question: "What is your current occupation?",
    type: 'text',
    required: true,
    step: 2,
    category: "Passport Information"
  },
  {
    id: 8,
    question: "When does your passport expire?",
    type: 'date',
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
  {
    id: 10,
    question: "What type of UK visa are you applying for?",
    type: 'select',
    options: [
      'Student Visa',
      'Work Visa',
      'Family Visa',
      'Tourist Visa',
      'Business Visa',
      'Transit Visa',
      'Other'
    ],
    required: true,
    step: 3,
    category: "Visa Type"
  },
  {
    id: 11,
    question: "What is the purpose of your visit to the UK?",
    type: 'textarea',
    required: true,
    step: 3,
    category: "Visa Type"
  },
  {
    id: 12,
    question: "How long do you plan to stay in the UK?",
    type: 'select',
    options: [
      'Less than 6 months',
      '6 months to 1 year',
      '1 to 2 years',
      '2 to 5 years',
      'More than 5 years',
      'Permanent'
    ],
    required: true,
    step: 3,
    category: "Visa Type"
  },
  {
    id: 13,
    question: "Do you have a job offer or acceptance letter from a UK institution?",
    type: 'radio',
    options: ['Yes', 'No'],
    required: true,
    step: 4,
    category: "Background Information"
  },
  {
    id: 14,
    question: "Have you ever been refused a UK visa before?",
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
    question: "Do you have sufficient funds to support yourself in the UK?",
    type: 'radio',
    options: ['Yes', 'No'],
    required: true,
    step: 4,
    category: "Background Information"
  },
  {
    id: 17,
    question: "Do you have travel insurance?",
    type: 'radio',
    options: ['Yes', 'No'],
    required: true,
    step: 5,
    category: "Additional Information"
  },
  {
    id: 18,
    question: "Do you have accommodation arranged in the UK?",
    type: 'radio',
    options: ['Yes', 'No'],
    required: true,
    step: 5,
    category: "Additional Information"
  },
  {
    id: 19,
    question: "Are you traveling with family members?",
    type: 'radio',
    options: ['Yes', 'No'],
    required: true,
    step: 5,
    category: "Additional Information"
  },
  {
    id: 20,
    question: "Do you have any medical conditions that require treatment in the UK?",
    type: 'radio',
    options: ['Yes', 'No'],
    required: true,
    step: 5,
    category: "Additional Information"
  }
]

export interface EligibilityResult {
  eligible: boolean
  score: number
  level: string
  description: string
  recommendations: string[]
  visaEligibility: string
}

export const getEligibilityResult = (answers: Record<number, string>): EligibilityResult => {
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
    recommendations.push('Obtain police clearance certificate')
  }

  if (answers[16] === 'No') {
    score -= 25
    issues.push('Insufficient funds')
    recommendations.push('Provide bank statements showing sufficient funds')
  }

  if (answers[13] === 'Yes') {
    score += 20
  }

  if (answers[17] === 'Yes') {
    score += 10
  }

  if (answers[18] === 'Yes') {
    score += 10
  }

  // Base score for completing the form
  score += 50

  // Determine eligibility level
  if (score >= 80) {
    return {
      eligible: true,
      score,
      level: "Highly Eligible",
      description: `Excellent! You appear to be highly eligible for a UK visa. Your application has strong supporting factors.`,
      recommendations: [
        "Gather all required documents",
        "Prepare detailed supporting evidence",
        "Consider professional consultation for complex cases"
      ],
      visaEligibility: "High chance of approval - proceed with application"
    }
  } else if (score >= 60) {
    return {
      eligible: true,
      score,
      level: "Eligible",
      description: `Good! You appear to be eligible for a UK visa. Address any issues before applying.`,
      recommendations: [
        "Address any identified issues",
        "Gather comprehensive supporting documents",
        "Consider professional guidance"
      ],
      visaEligibility: "Good chance of approval - address issues first"
    }
  } else if (score >= 40) {
    return {
      eligible: false,
      score,
      level: "Conditionally Eligible",
      description: `You may be eligible but need to address several issues before applying.`,
      recommendations: [
        "Address all identified issues",
        "Strengthen your application",
        "Consider professional consultation",
        "Review visa requirements carefully"
      ],
      visaEligibility: "Conditional eligibility - significant improvements needed"
    }
  } else {
    return {
      eligible: false,
      score,
      level: "Not Currently Eligible",
      description: `Significant issues need to be addressed before you can apply for a UK visa.`,
      recommendations: [
        "Address all critical issues",
        "Seek professional immigration advice",
        "Consider alternative visa options",
        "Build stronger case over time"
      ],
      visaEligibility: "Not currently eligible - major improvements required"
    }
  }
}
