'use client'

import React, { useState } from 'react'
import { CheckCircle, Clock, Award, FileText, Globe, Users, TrendingUp, Star, ArrowRight, ArrowLeft } from 'lucide-react'
import { eligibilityQuestions, getEligibilityResult, type Question, type EligibilityResult } from './EligibilityTestQuestions'

// Import visa-specific questions from eligibility-check page
const visaSpecificQuestions: Record<string, Question[]> = {
  'Visitor Visa': [
    { id: 101, question: "What is your full name?", type: 'text', required: true, step: 1, category: "Personal Information" },
    { id: 102, question: "What is your date of birth?", type: 'date', required: true, step: 1, category: "Personal Information" },
    { id: 103, question: "What is your nationality?", type: 'select', options: ['Turkish', 'English', 'Arabic', 'French', 'German', 'Italian', 'Spanish', 'Portuguese', 'Russian', 'Chinese', 'Japanese', 'Korean', 'Indian', 'Pakistani', 'Bangladeshi', 'Iranian', 'Iraqi', 'Syrian', 'Lebanese', 'Jordanian', 'Egyptian', 'Moroccan', 'Algerian', 'Tunisian', 'Libyan', 'Sudanese', 'Saudi Arabian', 'Emirati', 'Kuwaiti', 'Qatari', 'Bahraini', 'Omani', 'Yemeni', 'Afghan', 'Kazakh', 'Uzbek', 'Kyrgyz', 'Tajik', 'Turkmen', 'Azerbaijani', 'Georgian', 'Armenian', 'Ukrainian', 'Belarusian', 'Polish', 'Czech', 'Slovak', 'Hungarian', 'Romanian', 'Bulgarian', 'Croatian', 'Serbian', 'Bosnian', 'Albanian', 'Macedonian', 'Slovenian', 'Estonian', 'Latvian', 'Lithuanian', 'Finnish', 'Swedish', 'Norwegian', 'Danish', 'Icelandic', 'Dutch', 'Belgian', 'Swiss', 'Austrian', 'Greek', 'Cypriot', 'Maltese', 'Irish', 'Scottish', 'Welsh', 'Canadian', 'American', 'Mexican', 'Brazilian', 'Argentinian', 'Chilean', 'Colombian', 'Peruvian', 'Venezuelan', 'Ecuadorian', 'Uruguayan', 'Paraguayan', 'Bolivian', 'Australian', 'New Zealander', 'South African', 'Nigerian', 'Kenyan', 'Ghanaian', 'Ethiopian', 'Ugandan', 'Tanzanian', 'Moroccan', 'Algerian', 'Tunisian', 'Libyan', 'Sudanese', 'Other'], required: true, step: 1, category: "Personal Information" },
    { id: 104, question: "What is your gender?", type: 'radio', options: ['Male', 'Female', 'Other', 'Prefer not to say'], required: true, step: 1, category: "Personal Information" },
    { id: 105, question: "What is your contact email?", type: 'email', required: true, step: 1, category: "Personal Information" },
    { id: 106, question: "What is your contact phone number?", type: 'text', required: true, step: 1, category: "Personal Information" },
    { id: 107, question: "What is your passport number?", type: 'text', required: true, step: 2, category: "Passport Information" },
    { id: 108, question: "When does your passport expire?", type: 'date', required: true, step: 2, category: "Passport Information" },
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
    { id: 206, question: "What is your contact phone number?", type: 'text', required: true, step: 1, category: "Personal Information" },
    { id: 207, question: "What is your passport number?", type: 'text', required: true, step: 2, category: "Passport Information" },
    { id: 208, question: "When does your passport expire?", type: 'date', required: true, step: 2, category: "Passport Information" },
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
    { id: 306, question: "What is your contact phone number?", type: 'text', required: true, step: 1, category: "Personal Information" },
    { id: 307, question: "What is your passport number?", type: 'text', required: true, step: 2, category: "Passport Information" },
    { id: 308, question: "When does your passport expire?", type: 'date', required: true, step: 2, category: "Passport Information" },
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
    { id: 511, question: "What is your child's age?", type: 'select', options: ['Under 18', '18-21', '21+'], required: true, step: 3, category: "Child Information" },
    { id: 512, question: "What is your child's nationality?", type: 'select', options: ['British', 'EU Citizen', 'Other'], required: true, step: 3, category: "Child Information" },
    { id: 513, question: "Does your child live in the UK?", type: 'radio', options: ['Yes', 'No'], required: true, step: 3, category: "Child Information" },
    { id: 514, question: "What is your child's annual income?", type: 'select', options: ['£18,600 - £25,000', '£25,000 - £35,000', '£35,000 - £50,000', '£50,000+'], required: true, step: 3, category: "Child Information" },
    { id: 515, question: "Do you have evidence of your relationship?", type: 'radio', options: ['Yes', 'No'], required: true, step: 3, category: "Child Information" }
  ],
  'Leave to Remain': [
    { id: 701, question: "What is your full name?", type: 'text', required: true, step: 1, category: "Personal Information" },
    { id: 702, question: "What is your date of birth?", type: 'date', required: true, step: 1, category: "Personal Information" },
    { id: 703, question: "What is your nationality?", type: 'select', options: ['Turkish', 'English', 'Arabic', 'French', 'German', 'Italian', 'Spanish', 'Portuguese', 'Russian', 'Chinese', 'Japanese', 'Korean', 'Indian', 'Pakistani', 'Bangladeshi', 'Iranian', 'Iraqi', 'Syrian', 'Lebanese', 'Jordanian', 'Egyptian', 'Moroccan', 'Algerian', 'Tunisian', 'Libyan', 'Sudanese', 'Saudi Arabian', 'Emirati', 'Kuwaiti', 'Qatari', 'Bahraini', 'Omani', 'Yemeni', 'Afghan', 'Kazakh', 'Uzbek', 'Kyrgyz', 'Tajik', 'Turkmen', 'Azerbaijani', 'Georgian', 'Armenian', 'Ukrainian', 'Belarusian', 'Polish', 'Czech', 'Slovak', 'Hungarian', 'Romanian', 'Bulgarian', 'Croatian', 'Serbian', 'Bosnian', 'Albanian', 'Macedonian', 'Slovenian', 'Estonian', 'Latvian', 'Lithuanian', 'Finnish', 'Swedish', 'Norwegian', 'Danish', 'Icelandic', 'Dutch', 'Belgian', 'Swiss', 'Austrian', 'Greek', 'Cypriot', 'Maltese', 'Irish', 'Scottish', 'Welsh', 'Canadian', 'American', 'Mexican', 'Brazilian', 'Argentinian', 'Chilean', 'Colombian', 'Peruvian', 'Venezuelan', 'Ecuadorian', 'Uruguayan', 'Paraguayan', 'Bolivian', 'Australian', 'New Zealander', 'South African', 'Nigerian', 'Kenyan', 'Ghanaian', 'Ethiopian', 'Ugandan', 'Tanzanian', 'Moroccan', 'Algerian', 'Tunisian', 'Libyan', 'Sudanese', 'Other'], required: true, step: 1, category: "Personal Information" },
    { id: 704, question: "What is your gender?", type: 'radio', options: ['Male', 'Female', 'Other', 'Prefer not to say'], required: true, step: 1, category: "Personal Information" },
    { id: 705, question: "What is your contact email?", type: 'email', required: true, step: 1, category: "Personal Information" },
    { id: 706, question: "What is your contact phone number?", type: 'text', required: true, step: 1, category: "Personal Information" },
    { id: 707, question: "What is your current visa type?", type: 'select', options: ['Spouse Visa', 'Work Visa', 'Student Visa', 'Family Visa', 'Other'], required: true, step: 2, category: "Current Status" },
    { id: 708, question: "When does your current visa expire?", type: 'date', required: true, step: 2, category: "Current Status" },
    { id: 709, question: "What type of extension are you applying for?", type: 'select', options: ['Extension of current visa', 'Switch to different visa', 'Family reunion', 'Work permit extension', 'Other'], required: true, step: 3, category: "Extension Details" },
    { id: 710, question: "How long have you been in the UK on your current visa?", type: 'select', options: ['Less than 1 year', '1-2 years', '2-5 years', '5-10 years', 'More than 10 years'], required: true, step: 3, category: "Extension Details" },
    { id: 711, question: "Do you meet the financial requirements for your visa extension?", type: 'radio', options: ['Yes', 'No', 'Not sure'], required: true, step: 3, category: "Extension Details" },
    { id: 712, question: "Do you have any dependents applying with you?", type: 'radio', options: ['Yes', 'No'], required: true, step: 3, category: "Extension Details" }
  ],
  'Indefinite Leave to Remain': [
    { id: 801, question: "What is your full name?", type: 'text', required: true, step: 1, category: "Personal Information" },
    { id: 802, question: "What is your date of birth?", type: 'date', required: true, step: 1, category: "Personal Information" },
    { id: 803, question: "What is your nationality?", type: 'select', options: ['Turkish', 'English', 'Arabic', 'French', 'German', 'Italian', 'Spanish', 'Portuguese', 'Russian', 'Chinese', 'Japanese', 'Korean', 'Indian', 'Pakistani', 'Bangladeshi', 'Iranian', 'Iraqi', 'Syrian', 'Lebanese', 'Jordanian', 'Egyptian', 'Moroccan', 'Algerian', 'Tunisian', 'Libyan', 'Sudanese', 'Saudi Arabian', 'Emirati', 'Kuwaiti', 'Qatari', 'Bahraini', 'Omani', 'Yemeni', 'Afghan', 'Kazakh', 'Uzbek', 'Kyrgyz', 'Tajik', 'Turkmen', 'Azerbaijani', 'Georgian', 'Armenian', 'Ukrainian', 'Belarusian', 'Polish', 'Czech', 'Slovak', 'Hungarian', 'Romanian', 'Bulgarian', 'Croatian', 'Serbian', 'Bosnian', 'Albanian', 'Macedonian', 'Slovenian', 'Estonian', 'Latvian', 'Lithuanian', 'Finnish', 'Swedish', 'Norwegian', 'Danish', 'Icelandic', 'Dutch', 'Belgian', 'Swiss', 'Austrian', 'Greek', 'Cypriot', 'Maltese', 'Irish', 'Scottish', 'Welsh', 'Canadian', 'American', 'Mexican', 'Brazilian', 'Argentinian', 'Chilean', 'Colombian', 'Peruvian', 'Venezuelan', 'Ecuadorian', 'Uruguayan', 'Paraguayan', 'Bolivian', 'Australian', 'New Zealander', 'South African', 'Nigerian', 'Kenyan', 'Ghanaian', 'Ethiopian', 'Ugandan', 'Tanzanian', 'Moroccan', 'Algerian', 'Tunisian', 'Libyan', 'Sudanese', 'Other'], required: true, step: 1, category: "Personal Information" },
    { id: 804, question: "What is your gender?", type: 'radio', options: ['Male', 'Female', 'Other', 'Prefer not to say'], required: true, step: 1, category: "Personal Information" },
    { id: 805, question: "What is your contact email?", type: 'email', required: true, step: 1, category: "Personal Information" },
    { id: 806, question: "What is your contact phone number?", type: 'text', required: true, step: 1, category: "Personal Information" },
    { id: 807, question: "What is your current visa status?", type: 'select', options: ['Work Visa', 'Spouse Visa', 'Student Visa', 'Family Visa', 'Other'], required: true, step: 2, category: "Immigration History" },
    { id: 808, question: "How long have you been living in the UK continuously?", type: 'select', options: ['Less than 2 years', '2-3 years', '3-5 years', '5-10 years', '10+ years'], required: true, step: 2, category: "Immigration History" },
    { id: 809, question: "Have you spent more than 180 days outside the UK in any 12-month period?", type: 'radio', options: ['Yes', 'No'], required: true, step: 2, category: "Immigration History" },
    { id: 810, question: "Do you have Life in the UK test certificate?", type: 'radio', options: ['Yes', 'No', 'Not yet'], required: true, step: 3, category: "ILR Requirements" },
    { id: 811, question: "What is your English language proficiency level?", type: 'select', options: ['B1 (Intermediate)', 'B2 (Upper Intermediate)', 'C1 (Advanced)', 'C2 (Proficient)', 'Not tested yet'], required: true, step: 3, category: "ILR Requirements" },
    { id: 812, question: "Do you have any criminal convictions in the UK or abroad?", type: 'radio', options: ['Yes', 'No'], required: true, step: 3, category: "ILR Requirements" },
    { id: 813, question: "Are you planning to apply for British citizenship after ILR?", type: 'radio', options: ['Yes', 'No', 'Not sure'], required: true, step: 3, category: "ILR Requirements" }
  ],
  'British Citizenship': [
    { id: 901, question: "What is your full name?", type: 'text', required: true, step: 1, category: "Personal Information" },
    { id: 902, question: "What is your date of birth?", type: 'date', required: true, step: 1, category: "Personal Information" },
    { id: 903, question: "What is your nationality?", type: 'select', options: ['Turkish', 'English', 'Arabic', 'French', 'German', 'Italian', 'Spanish', 'Portuguese', 'Russian', 'Chinese', 'Japanese', 'Korean', 'Indian', 'Pakistani', 'Bangladeshi', 'Iranian', 'Iraqi', 'Syrian', 'Lebanese', 'Jordanian', 'Egyptian', 'Moroccan', 'Algerian', 'Tunisian', 'Libyan', 'Sudanese', 'Saudi Arabian', 'Emirati', 'Kuwaiti', 'Qatari', 'Bahraini', 'Omani', 'Yemeni', 'Afghan', 'Kazakh', 'Uzbek', 'Kyrgyz', 'Tajik', 'Turkmen', 'Azerbaijani', 'Georgian', 'Armenian', 'Ukrainian', 'Belarusian', 'Polish', 'Czech', 'Slovak', 'Hungarian', 'Romanian', 'Bulgarian', 'Croatian', 'Serbian', 'Bosnian', 'Albanian', 'Macedonian', 'Slovenian', 'Estonian', 'Latvian', 'Lithuanian', 'Finnish', 'Swedish', 'Norwegian', 'Danish', 'Icelandic', 'Dutch', 'Belgian', 'Swiss', 'Austrian', 'Greek', 'Cypriot', 'Maltese', 'Irish', 'Scottish', 'Welsh', 'Canadian', 'American', 'Mexican', 'Brazilian', 'Argentinian', 'Chilean', 'Colombian', 'Peruvian', 'Venezuelan', 'Ecuadorian', 'Uruguayan', 'Paraguayan', 'Bolivian', 'Australian', 'New Zealander', 'South African', 'Nigerian', 'Kenyan', 'Ghanaian', 'Ethiopian', 'Ugandan', 'Tanzanian', 'Moroccan', 'Algerian', 'Tunisian', 'Libyan', 'Sudanese', 'Other'], required: true, step: 1, category: "Personal Information" },
    { id: 904, question: "What is your gender?", type: 'radio', options: ['Male', 'Female', 'Other', 'Prefer not to say'], required: true, step: 1, category: "Personal Information" },
    { id: 905, question: "What is your contact email?", type: 'email', required: true, step: 1, category: "Personal Information" },
    { id: 906, question: "What is your contact phone number?", type: 'text', required: true, step: 1, category: "Personal Information" },
    { id: 907, question: "Do you have Indefinite Leave to Remain (ILR) or settled status?", type: 'radio', options: ['Yes, ILR', 'Yes, Settled Status', 'No'], required: true, step: 2, category: "Current Status" },
    { id: 908, question: "How long have you held ILR or settled status?", type: 'select', options: ['Less than 12 months', '12-24 months', '2-5 years', '5+ years'], required: true, step: 2, category: "Current Status" },
    { id: 909, question: "Have you spent more than 450 days outside the UK in the last 5 years?", type: 'radio', options: ['Yes', 'No'], required: true, step: 2, category: "Current Status" },
    { id: 910, question: "Do you have Life in the UK test certificate?", type: 'radio', options: ['Yes', 'No'], required: true, step: 3, category: "Citizenship Requirements" },
    { id: 911, question: "What is your English language proficiency level?", type: 'select', options: ['B1 (Intermediate)', 'B2 (Upper Intermediate)', 'C1 (Advanced)', 'C2 (Proficient)', 'Native speaker'], required: true, step: 3, category: "Citizenship Requirements" },
    { id: 912, question: "Have you had any criminal convictions in the UK or abroad?", type: 'radio', options: ['Yes', 'No'], required: true, step: 3, category: "Citizenship Requirements" },
    { id: 913, question: "Do you intend to make the UK your permanent home?", type: 'radio', options: ['Yes', 'No'], required: true, step: 3, category: "Citizenship Requirements" }
  ],
  'Asylum & Human rights': [
    { id: 1001, question: "What is your full name?", type: 'text', required: true, step: 1, category: "Personal Information" },
    { id: 1002, question: "What is your date of birth?", type: 'date', required: true, step: 1, category: "Personal Information" },
    { id: 1003, question: "What is your nationality?", type: 'select', options: ['Turkish', 'English', 'Arabic', 'French', 'German', 'Italian', 'Spanish', 'Portuguese', 'Russian', 'Chinese', 'Japanese', 'Korean', 'Indian', 'Pakistani', 'Bangladeshi', 'Iranian', 'Iraqi', 'Syrian', 'Lebanese', 'Jordanian', 'Egyptian', 'Moroccan', 'Algerian', 'Tunisian', 'Libyan', 'Sudanese', 'Saudi Arabian', 'Emirati', 'Kuwaiti', 'Qatari', 'Bahraini', 'Omani', 'Yemeni', 'Afghan', 'Kazakh', 'Uzbek', 'Kyrgyz', 'Tajik', 'Turkmen', 'Azerbaijani', 'Georgian', 'Armenian', 'Ukrainian', 'Belarusian', 'Polish', 'Czech', 'Slovak', 'Hungarian', 'Romanian', 'Bulgarian', 'Croatian', 'Serbian', 'Bosnian', 'Albanian', 'Macedonian', 'Slovenian', 'Estonian', 'Latvian', 'Lithuanian', 'Finnish', 'Swedish', 'Norwegian', 'Danish', 'Icelandic', 'Dutch', 'Belgian', 'Swiss', 'Austrian', 'Greek', 'Cypriot', 'Maltese', 'Irish', 'Scottish', 'Welsh', 'Canadian', 'American', 'Mexican', 'Brazilian', 'Argentinian', 'Chilean', 'Colombian', 'Peruvian', 'Venezuelan', 'Ecuadorian', 'Uruguayan', 'Paraguayan', 'Bolivian', 'Australian', 'New Zealander', 'South African', 'Nigerian', 'Kenyan', 'Ghanaian', 'Ethiopian', 'Ugandan', 'Tanzanian', 'Moroccan', 'Algerian', 'Tunisian', 'Libyan', 'Sudanese', 'Other'], required: true, step: 1, category: "Personal Information" },
    { id: 1004, question: "What is your gender?", type: 'radio', options: ['Male', 'Female', 'Other', 'Prefer not to say'], required: true, step: 1, category: "Personal Information" },
    { id: 1005, question: "What is your contact email?", type: 'email', required: true, step: 1, category: "Personal Information" },
    { id: 1006, question: "What is your contact phone number?", type: 'text', required: true, step: 1, category: "Personal Information" },
    { id: 1007, question: "What type of application are you making?", type: 'select', options: ['Asylum claim', 'Human rights application (Article 8)', 'Protection claim', 'Family life application', 'Private life application', 'Other'], required: true, step: 2, category: "Application Type" },
    { id: 1008, question: "Are you currently in the UK?", type: 'radio', options: ['Yes', 'No'], required: true, step: 2, category: "Application Type" },
    { id: 1009, question: "Do you have family members (spouse/children) in the UK?", type: 'radio', options: ['Yes', 'No'], required: true, step: 2, category: "Application Type" },
    { id: 1010, question: "Have you previously claimed asylum in the UK?", type: 'radio', options: ['Yes', 'No'], required: true, step: 3, category: "Claim Details" },
    { id: 1011, question: "Do you fear persecution in your home country?", type: 'radio', options: ['Yes', 'No'], required: true, step: 3, category: "Claim Details" },
    { id: 1012, question: "How long have you been living in the UK?", type: 'select', options: ['Less than 6 months', '6-12 months', '1-2 years', '2-5 years', '5-10 years', '10+ years'], required: true, step: 3, category: "Claim Details" }
  ],
  'Business Immigration': [
    { id: 1101, question: "What is your full name?", type: 'text', required: true, step: 1, category: "Personal Information" },
    { id: 1102, question: "What is your date of birth?", type: 'date', required: true, step: 1, category: "Personal Information" },
    { id: 1103, question: "What is your nationality?", type: 'select', options: ['Turkish', 'English', 'Arabic', 'French', 'German', 'Italian', 'Spanish', 'Portuguese', 'Russian', 'Chinese', 'Japanese', 'Korean', 'Indian', 'Pakistani', 'Bangladeshi', 'Iranian', 'Iraqi', 'Syrian', 'Lebanese', 'Jordanian', 'Egyptian', 'Moroccan', 'Algerian', 'Tunisian', 'Libyan', 'Sudanese', 'Saudi Arabian', 'Emirati', 'Kuwaiti', 'Qatari', 'Bahraini', 'Omani', 'Yemeni', 'Afghan', 'Kazakh', 'Uzbek', 'Kyrgyz', 'Tajik', 'Turkmen', 'Azerbaijani', 'Georgian', 'Armenian', 'Ukrainian', 'Belarusian', 'Polish', 'Czech', 'Slovak', 'Hungarian', 'Romanian', 'Bulgarian', 'Croatian', 'Serbian', 'Bosnian', 'Albanian', 'Macedonian', 'Slovenian', 'Estonian', 'Latvian', 'Lithuanian', 'Finnish', 'Swedish', 'Norwegian', 'Danish', 'Icelandic', 'Dutch', 'Belgian', 'Swiss', 'Austrian', 'Greek', 'Cypriot', 'Maltese', 'Irish', 'Scottish', 'Welsh', 'Canadian', 'American', 'Mexican', 'Brazilian', 'Argentinian', 'Chilean', 'Colombian', 'Peruvian', 'Venezuelan', 'Ecuadorian', 'Uruguayan', 'Paraguayan', 'Bolivian', 'Australian', 'New Zealander', 'South African', 'Nigerian', 'Kenyan', 'Ghanaian', 'Ethiopian', 'Ugandan', 'Tanzanian', 'Moroccan', 'Algerian', 'Tunisian', 'Libyan', 'Sudanese', 'Other'], required: true, step: 1, category: "Personal Information" },
    { id: 1104, question: "What is your gender?", type: 'radio', options: ['Male', 'Female', 'Other', 'Prefer not to say'], required: true, step: 1, category: "Personal Information" },
    { id: 1105, question: "What is your contact email?", type: 'email', required: true, step: 1, category: "Personal Information" },
    { id: 1106, question: "What is your contact phone number?", type: 'text', required: true, step: 1, category: "Personal Information" },
    { id: 1107, question: "What type of business visa are you applying for?", type: 'select', options: ['Innovator Founder Visa', 'Start-up Visa', 'Investor Visa', 'Skilled Worker Visa (Business)', 'Representative of Overseas Business', 'Other'], required: true, step: 2, category: "Business Details" },
    { id: 1108, question: "How much capital do you have available for investment?", type: 'select', options: ['Less than £50,000', '£50,000 - £200,000', '£200,000 - £500,000', '£500,000 - £1,000,000', '£1,000,000+'], required: true, step: 2, category: "Business Details" },
    { id: 1109, question: "Do you have a business plan for your UK venture?", type: 'radio', options: ['Yes', 'No', 'In progress'], required: true, step: 2, category: "Business Details" },
    { id: 1110, question: "Have you had a previous visa refused or cancelled?", type: 'radio', options: ['Yes', 'No'], required: true, step: 3, category: "Application History" },
    { id: 1111, question: "Are you appealing a visa refusal decision?", type: 'radio', options: ['Yes', 'No'], required: true, step: 3, category: "Application History" },
    { id: 1112, question: "Do you have an endorsement from an approved body?", type: 'radio', options: ['Yes', 'No', 'Applying for one'], required: true, step: 3, category: "Application History" }
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

interface EligibilityTestFormProps {
  maxQuestions?: number
  showProgress?: boolean
  onComplete?: (result: EligibilityResult) => void
  className?: string
  testMode?: boolean
}

export const EligibilityTestForm: React.FC<EligibilityTestFormProps> = ({
  maxQuestions = 20,
  showProgress = true,
  onComplete,
  className = '',
  testMode = false
}) => {
  const [currentStep, setCurrentStep] = useState(1)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const [showResult, setShowResult] = useState(false)
  const [result, setResult] = useState<EligibilityResult | null>(null)
  const [isSaving, setIsSaving] = useState(false)
  const [saveStatus, setSaveStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [selectedVisaType, setSelectedVisaType] = useState<string>('')
  const [showVisaTypeSelection, setShowVisaTypeSelection] = useState(true)

  // Map selected visa type to questions key
  const visaTypeMapping: Record<string, string> = {
    'Visitor Visa Applications': 'Visitor Visa',
    'Leave to Remain': 'Leave to Remain',
    'Indefinite leave to remain': 'Indefinite Leave to Remain',
    'British citizenship': 'British Citizenship',
    'Asylum & Human rights': 'Asylum & Human rights',
    'Refused Appeals & Business Immigration': 'Business Immigration'
  }

  // Get questions based on selected visa type or default questions
  const getMappedVisaType = (visaType: string): string => {
    return visaTypeMapping[visaType] || visaType
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

  const saveEligibilitySubmission = async (answers: Record<number, string>, result: EligibilityResult) => {
    try {
      setIsSaving(true)
      setSaveStatus('idle')


      // Get the first question ID for the selected visa type
      const firstQuestionId = questions[0]?.id || 1
      
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
        recommendations: result.recommendations.map(rec => ({ recommendation: rec }))
      }


      const response = await fetch('/api/eligibility-submissions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submissionData),
      })


      if (response.ok) {
        const data = await response.json()
        setSaveStatus('success')
      } else {
        const errorData = await response.json()
        setSaveStatus('error')
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Bilinmeyen hata'
      setSaveStatus('error')
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

    // Test mode için hızlı sonuç
    if (testMode && currentQuestionIndex >= 1) {
      const testResult = getEligibilityResult(answers)
      setResult(testResult)
      setShowResult(true)
      await saveEligibilitySubmission(answers, testResult)
      onComplete?.(testResult)
      return
    }

    if (currentQuestionIndex < currentStepQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    } else if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
      setCurrentQuestionIndex(0)
    } else {
      // Test completed - save to database
      const testResult = getEligibilityResult(answers)
      setResult(testResult)
      setShowResult(true)
      await saveEligibilitySubmission(answers, testResult)
      onComplete?.(testResult)
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
    return (
      <div className={`bg-white rounded-2xl shadow-xl p-3 ${className}`}>
        <div className="text-center mb-3">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Select Your Visa Type - Start Check Eligibility</h2>
          <p className="text-gray-600 mb-6">Choose the visa type you&apos;re applying for to get personalized questions</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { 
              type: 'Visitor Visa Applications', 
              description: 'Tourism, business trips, family visits. Up to 6 months stay.',
              color: 'from-blue-500 to-indigo-600'
            },
            { 
              type: 'Leave to Remain', 
              description: 'Extend or switch your visa. Spouse, work, and family visas.',
              color: 'from-green-500 to-emerald-600'
            },
            { 
              type: 'Indefinite leave to remain', 
              description: 'Permanent residence. No time limits, path to citizenship.',
              color: 'from-purple-500 to-violet-600'
            },
            { 
              type: 'British citizenship', 
              description: 'Become a British citizen. Full rights, passport, voting.',
              color: 'from-amber-500 to-orange-600'
            },
            { 
              type: 'Asylum & Human rights', 
              description: 'Protection claims, refugee status, human rights applications.',
              color: 'from-pink-500 to-rose-600'
            },
            { 
              type: 'Refused Appeals & Business Immigration', 
              description: 'Appeal visa decisions. Business visas for entrepreneurs.',
              color: 'from-teal-500 to-cyan-600'
            }
          ].map((visa, index) => (
            <button
              key={index}
              onClick={() => {
                setSelectedVisaType(visa.type)
                setShowVisaTypeSelection(false)
              }}
              className="relative p-2 px-5 border-2 border-gray-300 rounded-xl transition-all duration-300 text-left group bg-white hover:bg-gradient-to-br hover:from-blue-50 hover:to-indigo-50 shadow-md hover:shadow-xl transform hover:-translate-y-1 overflow-hidden"
            >
              {/* Gradient top border on hover */}
              <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${visa.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
              
              <div className="relative z-10">
                <h3 className={`font-bold mb-2 text-sm bg-gradient-to-r ${visa.color} bg-clip-text text-transparent group-hover:opacity-90 transition-all duration-300`}>
                  {visa.type}
                </h3>
                <p className="text-xs text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                  {visa.description}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>
    )
  }

  if (showResult && result) {
    return (
      <div className={`bg-white rounded-2xl shadow-xl p-6 ${className}`}>
        <div className="text-center mb-6">
          <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3 ${
            result.eligible ? 'bg-green-100' : 'bg-red-100'
          }`}>
            {result.eligible ? (
              <CheckCircle className="w-8 h-8 text-green-600" />
            ) : (
              <Award className="w-8 h-8 text-red-600" />
            )}
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">
            {result.level}
          </h2>
        </div>

        <div className="space-y-4">
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-gray-700 text-sm leading-relaxed">{result.description}</p>
          </div>

          <div className="bg-blue-50 rounded-lg p-4">
            <h3 className="text-sm font-semibold text-blue-900 mb-2">Visa Eligibility</h3>
            <p className="text-blue-800 font-medium text-sm">{result.visaEligibility}</p>
          </div>

          <div className="bg-green-50 rounded-lg p-4">
            <h3 className="text-sm font-semibold text-green-900 mb-2">Recommendations</h3>
            <ul className="space-y-1">
              {result.recommendations.slice(0, 3).map((rec, index) => (
                <li key={index} className="flex items-start">
                  <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-green-800 text-sm">{rec}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* English Information Message */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <CheckCircle className="w-5 h-5 text-blue-600" />
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-semibold text-blue-900 mb-1">Information Received</h3>
                <p className="text-blue-800 text-sm leading-relaxed">
                  Your information has been received. We will contact you with definitive results for your visa eligibility assessment.
                </p>
              </div>
            </div>
          </div>

          {/* Save Status Messages */}
          {isSaving && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
              <div className="flex items-center">
                <Clock className="w-4 h-4 text-yellow-600 mr-2" />
                <span className="text-yellow-800 text-sm">Saving your results...</span>
              </div>
            </div>
          )}

          {saveStatus === 'success' && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-3">
              <div className="flex items-center">
                <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                <span className="text-green-800 text-sm">Your results have been saved successfully!</span>
              </div>
            </div>
          )}

          {saveStatus === 'error' && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
              <div className="flex items-center">
                <Award className="w-4 h-4 text-red-600 mr-2" />
                <span className="text-red-800 text-sm">There was an error saving your results. Please try again.</span>
              </div>
            </div>
          )}

          <div className="text-center">
            <button
              onClick={() => {
                setShowResult(false)
                setCurrentStep(1)
                setCurrentQuestionIndex(0)
                setAnswers({})
                setResult(null)
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
    <div className={`bg-white rounded-2xl shadow-xl p-6 h-full ${className}`}>
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
      <div className="mb-6">
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
              className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none text-sm"
              placeholder="Enter your answer..."
            />
          )}

          {currentQuestion?.type === 'email' && (
            <input
              type="email"
              value={answers[currentQuestion.id] || ''}
              onChange={(e) => handleAnswerChange(currentQuestion.id, e.target.value)}
              className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none text-sm"
              placeholder="Enter your email address..."
              required
            />
          )}

          {currentQuestion?.type === 'date' && (
            <input
              type="date"
              value={answers[currentQuestion.id] || ''}
              onChange={(e) => handleAnswerChange(currentQuestion.id, e.target.value)}
              className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none text-sm"
            />
          )}

          {currentQuestion?.type === 'textarea' && (
            <textarea
              value={answers[currentQuestion.id] || ''}
              onChange={(e) => handleAnswerChange(currentQuestion.id, e.target.value)}
              className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none h-24 text-sm"
              placeholder="Enter your answer..."
            />
          )}

          {currentQuestion?.type === 'select' && (
            <select
              value={answers[currentQuestion.id] || ''}
              onChange={(e) => handleAnswerChange(currentQuestion.id, e.target.value)}
              className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none text-sm"
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
                <label key={index} className="flex items-center p-2 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                  <input
                    type="radio"
                    name={`question-${currentQuestion.id}`}
                    value={option}
                    checked={answers[currentQuestion.id] === option}
                    onChange={(e) => handleAnswerChange(currentQuestion.id, e.target.value)}
                    className="mr-2"
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
          disabled={currentStep === 1 && currentQuestionIndex === 0}
          className="flex items-center px-4 py-2 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
        >
          <ArrowLeft className="w-4 h-4 mr-1" />
          Previous
        </button>

        <button
          onClick={handleNext}
          disabled={!answers[currentQuestion?.id || 0]}
          className="flex items-center px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
        >
          {currentStep === totalSteps && currentQuestionIndex === currentStepQuestions.length - 1 ? 'Complete Test' : 'Next'}
          <ArrowRight className="w-4 h-4 ml-1" />
        </button>
      </div>
    </div>
  )
}
