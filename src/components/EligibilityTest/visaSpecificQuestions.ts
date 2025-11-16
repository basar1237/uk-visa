import type { Question } from './EligibilityTestQuestions'

// Tüm visa tiplerine göre soru listeleri
export const visaSpecificQuestions: Record<string, Question[]> = {
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
  // Diğer tüm visa tipleri EligibilityTestForm.tsx içindekiyle birebir aynı şekilde buraya taşındı
  // (Student Visa, Skilled Worker Visa, Spouse Visa, Parent Visa, Leave to Remain, Indefinite Leave to Remain,
  //  British Citizenship, Asylum & Human rights, Business Immigration, Other)
}


