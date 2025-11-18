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
  // Visa Applications Routes
  'Spouse Visa': [
    // 1. Applicant Personal Details
    { id: 1801, question: "What is your full name?", type: 'text', required: true, step: 1, category: "Applicant Personal Details" },
    { id: 1802, question: "What is your date of birth?", type: 'date', required: true, step: 1, category: "Applicant Personal Details" },
    { id: 1803, question: "What is your nationality?", type: 'select', options: ['Turkish', 'English', 'Arabic', 'French', 'German', 'Italian', 'Spanish', 'Portuguese', 'Russian', 'Chinese', 'Japanese', 'Korean', 'Indian', 'Pakistani', 'Bangladeshi', 'Iranian', 'Iraqi', 'Syrian', 'Lebanese', 'Jordanian', 'Egyptian', 'Moroccan', 'Algerian', 'Tunisian', 'Libyan', 'Sudanese', 'Saudi Arabian', 'Emirati', 'Kuwaiti', 'Qatari', 'Bahraini', 'Omani', 'Yemeni', 'Afghan', 'Kazakh', 'Uzbek', 'Kyrgyz', 'Tajik', 'Turkmen', 'Azerbaijani', 'Georgian', 'Armenian', 'Ukrainian', 'Belarusian', 'Polish', 'Czech', 'Slovak', 'Hungarian', 'Romanian', 'Bulgarian', 'Croatian', 'Serbian', 'Bosnian', 'Albanian', 'Macedonian', 'Slovenian', 'Estonian', 'Latvian', 'Lithuanian', 'Finnish', 'Swedish', 'Norwegian', 'Danish', 'Icelandic', 'Dutch', 'Belgian', 'Swiss', 'Austrian', 'Greek', 'Cypriot', 'Maltese', 'Irish', 'Scottish', 'Welsh', 'Canadian', 'American', 'Mexican', 'Brazilian', 'Argentinian', 'Chilean', 'Colombian', 'Peruvian', 'Venezuelan', 'Ecuadorian', 'Uruguayan', 'Paraguayan', 'Bolivian', 'Australian', 'New Zealander', 'South African', 'Nigerian', 'Kenyan', 'Ghanaian', 'Ethiopian', 'Ugandan', 'Tanzanian', 'Other'], required: true, step: 1, category: "Applicant Personal Details" },
    { id: 1804, question: "What is your contact phone number?", type: 'text', required: true, step: 1, category: "Applicant Personal Details" },
    { id: 1805, question: "What is your contact email address?", type: 'email', required: true, step: 1, category: "Applicant Personal Details" },
    
    // 2. Sponsor / Partner Details
    { id: 1806, question: "What is your sponsor/partner's full name?", type: 'text', required: true, step: 2, category: "Sponsor / Partner Details" },
    { id: 1807, question: "What is your sponsor/partner's date of birth?", type: 'date', required: true, step: 2, category: "Sponsor / Partner Details" },
    { id: 1808, question: "What is your sponsor/partner's nationality?", type: 'select', options: ['Turkish', 'English', 'Arabic', 'French', 'German', 'Italian', 'Spanish', 'Portuguese', 'Russian', 'Chinese', 'Japanese', 'Korean', 'Indian', 'Pakistani', 'Bangladeshi', 'Iranian', 'Iraqi', 'Syrian', 'Lebanese', 'Jordanian', 'Egyptian', 'Moroccan', 'Algerian', 'Tunisian', 'Libyan', 'Sudanese', 'Saudi Arabian', 'Emirati', 'Kuwaiti', 'Qatari', 'Bahraini', 'Omani', 'Yemeni', 'Afghan', 'Kazakh', 'Uzbek', 'Kyrgyz', 'Tajik', 'Turkmen', 'Azerbaijani', 'Georgian', 'Armenian', 'Ukrainian', 'Belarusian', 'Polish', 'Czech', 'Slovak', 'Hungarian', 'Romanian', 'Bulgarian', 'Croatian', 'Serbian', 'Bosnian', 'Albanian', 'Macedonian', 'Slovenian', 'Estonian', 'Latvian', 'Lithuanian', 'Finnish', 'Swedish', 'Norwegian', 'Danish', 'Icelandic', 'Dutch', 'Belgian', 'Swiss', 'Austrian', 'Greek', 'Cypriot', 'Maltese', 'Irish', 'Scottish', 'Welsh', 'Canadian', 'American', 'Mexican', 'Brazilian', 'Argentinian', 'Chilean', 'Colombian', 'Peruvian', 'Venezuelan', 'Ecuadorian', 'Uruguayan', 'Paraguayan', 'Bolivian', 'Australian', 'New Zealander', 'South African', 'Nigerian', 'Kenyan', 'Ghanaian', 'Ethiopian', 'Ugandan', 'Tanzanian', 'British', 'ILR', 'Refugee', 'Settled/Pre-Settled', 'Other'], required: true, step: 2, category: "Sponsor / Partner Details" },
    { id: 1809, question: "What is your sponsor/partner's current immigration status in the UK? (e.g., British Citizen, ILR, Refugee Status, Settled/Pre-Settled Status, Visa Category)", type: 'text', required: true, step: 2, category: "Sponsor / Partner Details" },
    
    // 3. Relationship Information
    { id: 1810, question: "What is your relationship status?", type: 'select', options: ['Married', 'Civil partnership', 'Engaged', 'Unmarried partners'], required: true, step: 3, category: "Relationship Information" },
    { id: 1811, question: "Do you and your partner have any children together?", type: 'radio', options: ['Yes', 'No'], required: true, step: 3, category: "Relationship Information" },
    
    // 4. Financial Requirement
    { id: 1812, question: "What is your combined annual income (Applicant + Sponsor)?", type: 'text', required: true, step: 4, category: "Financial Requirement" },
    { id: 1813, question: "Do you have savings?", type: 'radio', options: ['Yes', 'No'], required: true, step: 4, category: "Financial Requirement" },
    { id: 1815, question: "Do you or your sponsor have any additional sources of income?", type: 'radio', options: ['Yes', 'No'], required: true, step: 4, category: "Financial Requirement" },
    
    // 5. English Language Requirement (Applicant)
    { id: 1817, question: "Have you passed an approved English language test?", type: 'radio', options: ['Yes', 'No'], required: true, step: 5, category: "English Language Requirement (Applicant)" },
    { id: 1819, question: "Are you exempt from the English language requirement? (e.g., nationality, degree taught in English, disability)", type: 'radio', options: ['Yes', 'No'], required: true, step: 5, category: "English Language Requirement (Applicant)" },
  ],
  'Fiancé Visa': [
    // 1. Applicant Personal Details
    { id: 1901, question: "What is your full name?", type: 'text', required: true, step: 1, category: "Applicant Personal Details" },
    { id: 1902, question: "What is your date of birth?", type: 'date', required: true, step: 1, category: "Applicant Personal Details" },
    { id: 1903, question: "What is your nationality?", type: 'select', options: ['Turkish', 'English', 'Arabic', 'French', 'German', 'Italian', 'Spanish', 'Portuguese', 'Russian', 'Chinese', 'Japanese', 'Korean', 'Indian', 'Pakistani', 'Bangladeshi', 'Iranian', 'Iraqi', 'Syrian', 'Lebanese', 'Jordanian', 'Egyptian', 'Moroccan', 'Algerian', 'Tunisian', 'Libyan', 'Sudanese', 'Saudi Arabian', 'Emirati', 'Kuwaiti', 'Qatari', 'Bahraini', 'Omani', 'Yemeni', 'Afghan', 'Kazakh', 'Uzbek', 'Kyrgyz', 'Tajik', 'Turkmen', 'Azerbaijani', 'Georgian', 'Armenian', 'Ukrainian', 'Belarusian', 'Polish', 'Czech', 'Slovak', 'Hungarian', 'Romanian', 'Bulgarian', 'Croatian', 'Serbian', 'Bosnian', 'Albanian', 'Macedonian', 'Slovenian', 'Estonian', 'Latvian', 'Lithuanian', 'Finnish', 'Swedish', 'Norwegian', 'Danish', 'Icelandic', 'Dutch', 'Belgian', 'Swiss', 'Austrian', 'Greek', 'Cypriot', 'Maltese', 'Irish', 'Scottish', 'Welsh', 'Canadian', 'American', 'Mexican', 'Brazilian', 'Argentinian', 'Chilean', 'Colombian', 'Peruvian', 'Venezuelan', 'Ecuadorian', 'Uruguayan', 'Paraguayan', 'Bolivian', 'Australian', 'New Zealander', 'South African', 'Nigerian', 'Kenyan', 'Ghanaian', 'Ethiopian', 'Ugandan', 'Tanzanian', 'Other'], required: true, step: 1, category: "Applicant Personal Details" },
    { id: 1904, question: "What is your contact phone number?", type: 'text', required: true, step: 1, category: "Applicant Personal Details" },
    { id: 1905, question: "What is your contact email address?", type: 'email', required: true, step: 1, category: "Applicant Personal Details" },
    
    // 2. Sponsor / Partner Details
    { id: 1906, question: "What is your sponsor/partner's full name?", type: 'text', required: true, step: 2, category: "Sponsor / Partner Details" },
    { id: 1907, question: "What is your sponsor/partner's date of birth?", type: 'date', required: true, step: 2, category: "Sponsor / Partner Details" },
    { id: 1908, question: "What is your sponsor/partner's nationality?", type: 'select', options: ['Turkish', 'English', 'Arabic', 'French', 'German', 'Italian', 'Spanish', 'Portuguese', 'Russian', 'Chinese', 'Japanese', 'Korean', 'Indian', 'Pakistani', 'Bangladeshi', 'Iranian', 'Iraqi', 'Syrian', 'Lebanese', 'Jordanian', 'Egyptian', 'Moroccan', 'Algerian', 'Tunisian', 'Libyan', 'Sudanese', 'Saudi Arabian', 'Emirati', 'Kuwaiti', 'Qatari', 'Bahraini', 'Omani', 'Yemeni', 'Afghan', 'Kazakh', 'Uzbek', 'Kyrgyz', 'Tajik', 'Turkmen', 'Azerbaijani', 'Georgian', 'Armenian', 'Ukrainian', 'Belarusian', 'Polish', 'Czech', 'Slovak', 'Hungarian', 'Romanian', 'Bulgarian', 'Croatian', 'Serbian', 'Bosnian', 'Albanian', 'Macedonian', 'Slovenian', 'Estonian', 'Latvian', 'Lithuanian', 'Finnish', 'Swedish', 'Norwegian', 'Danish', 'Icelandic', 'Dutch', 'Belgian', 'Swiss', 'Austrian', 'Greek', 'Cypriot', 'Maltese', 'Irish', 'Scottish', 'Welsh', 'Canadian', 'American', 'Mexican', 'Brazilian', 'Argentinian', 'Chilean', 'Colombian', 'Peruvian', 'Venezuelan', 'Ecuadorian', 'Uruguayan', 'Paraguayan', 'Bolivian', 'Australian', 'New Zealander', 'South African', 'Nigerian', 'Kenyan', 'Ghanaian', 'Ethiopian', 'Ugandan', 'Tanzanian', 'British', 'ILR', 'Refugee', 'Settled/Pre-Settled', 'Other'], required: true, step: 2, category: "Sponsor / Partner Details" },
    { id: 1909, question: "What is your sponsor/partner's current immigration status in the UK? (e.g., British Citizen, ILR, Refugee Status, Settled/Pre-Settled Status, Visa Category)", type: 'text', required: true, step: 2, category: "Sponsor / Partner Details" },
    
    // 3. Relationship Information
    { id: 1910, question: "What is your relationship status?", type: 'select', options: ['Married', 'Civil partnership', 'Engaged', 'Unmarried partners'], required: true, step: 3, category: "Relationship Information" },
    { id: 1911, question: "Do you and your partner have any children together?", type: 'radio', options: ['Yes', 'No'], required: true, step: 3, category: "Relationship Information" },
    
    // 4. Financial Requirement
    { id: 1912, question: "What is your combined annual income (Applicant + Sponsor)?", type: 'text', required: true, step: 4, category: "Financial Requirement" },
    { id: 1913, question: "Do you have savings?", type: 'radio', options: ['Yes', 'No'], required: true, step: 4, category: "Financial Requirement" },
    { id: 1915, question: "Do you or your sponsor have any additional sources of income?", type: 'radio', options: ['Yes', 'No'], required: true, step: 4, category: "Financial Requirement" },
    
    // 5. English Language Requirement (Applicant)
    { id: 1917, question: "Have you passed an approved English language test?", type: 'radio', options: ['Yes', 'No'], required: true, step: 5, category: "English Language Requirement (Applicant)" },
    { id: 1919, question: "Are you exempt from the English language requirement? (e.g., nationality, degree taught in English, disability)", type: 'radio', options: ['Yes', 'No'], required: true, step: 5, category: "English Language Requirement (Applicant)" },
  ],
  'Student Visa': [
    // 1. Personal Details
    { id: 2001, question: "What is your full name?", type: 'text', required: true, step: 1, category: "Personal Details" },
    { id: 2002, question: "What is your date of birth?", type: 'date', required: true, step: 1, category: "Personal Details" },
    { id: 2003, question: "What is your nationality?", type: 'select', options: ['Turkish', 'English', 'Arabic', 'French', 'German', 'Italian', 'Spanish', 'Portuguese', 'Russian', 'Chinese', 'Japanese', 'Korean', 'Indian', 'Pakistani', 'Bangladeshi', 'Iranian', 'Iraqi', 'Syrian', 'Lebanese', 'Jordanian', 'Egyptian', 'Moroccan', 'Algerian', 'Tunisian', 'Libyan', 'Sudanese', 'Saudi Arabian', 'Emirati', 'Kuwaiti', 'Qatari', 'Bahraini', 'Omani', 'Yemeni', 'Afghan', 'Kazakh', 'Uzbek', 'Kyrgyz', 'Tajik', 'Turkmen', 'Azerbaijani', 'Georgian', 'Armenian', 'Ukrainian', 'Belarusian', 'Polish', 'Czech', 'Slovak', 'Hungarian', 'Romanian', 'Bulgarian', 'Croatian', 'Serbian', 'Bosnian', 'Albanian', 'Macedonian', 'Slovenian', 'Estonian', 'Latvian', 'Lithuanian', 'Finnish', 'Swedish', 'Norwegian', 'Danish', 'Icelandic', 'Dutch', 'Belgian', 'Swiss', 'Austrian', 'Greek', 'Cypriot', 'Maltese', 'Irish', 'Scottish', 'Welsh', 'Canadian', 'American', 'Mexican', 'Brazilian', 'Argentinian', 'Chilean', 'Colombian', 'Peruvian', 'Venezuelan', 'Ecuadorian', 'Uruguayan', 'Paraguayan', 'Bolivian', 'Australian', 'New Zealander', 'South African', 'Nigerian', 'Kenyan', 'Ghanaian', 'Ethiopian', 'Ugandan', 'Tanzanian', 'Other'], required: true, step: 1, category: "Personal Details" },
    { id: 2004, question: "What is your country of residence?", type: 'text', required: true, step: 1, category: "Personal Details" },
    { id: 2005, question: "What is your contact phone number?", type: 'text', required: true, step: 1, category: "Personal Details" },
    { id: 2006, question: "What is your contact email?", type: 'email', required: true, step: 1, category: "Personal Details" },
    
    // 2. Course Information
    { id: 2007, question: "Do you have a CAS (Confirmation of Acceptance for Studies)?", type: 'radio', options: ['Yes', 'No'], required: true, step: 2, category: "Course Information" },
    { id: 2008, question: "What is the name of UK university/college?", type: 'text', required: true, step: 2, category: "Course Information" },
    { id: 2009, question: "What is your course name?", type: 'text', required: true, step: 2, category: "Course Information" },
    { id: 2010, question: "What is your course level? (e.g., Undergraduate / Postgraduate / PhD)", type: 'select', options: ['Undergraduate', 'Postgraduate', 'PhD', 'Other'], required: true, step: 2, category: "Course Information" },
    
    // 3. English Language
    { id: 2011, question: "Have you taken an English test (IELTS UKVI, PTE UKVI, etc.)?", type: 'radio', options: ['Yes', 'No'], required: true, step: 3, category: "English Language" },
    
    // 4. Financial Details
    { id: 2012, question: "Do you have enough funds for tuition + living costs?", type: 'radio', options: ['Yes', 'No'], required: true, step: 4, category: "Financial Details" },
    { id: 2013, question: "Are you sponsored by government/university/scholarship?", type: 'radio', options: ['Yes', 'No'], required: true, step: 4, category: "Financial Details" },
    
    // 5. Immigration History
    { id: 2014, question: "Any previous UK visas?", type: 'radio', options: ['Yes', 'No'], required: true, step: 5, category: "Immigration History" },
    { id: 2015, question: "Any visa refusals?", type: 'radio', options: ['Yes', 'No'], required: true, step: 5, category: "Immigration History" },
    { id: 2016, question: "Any overstaying/immigration issues?", type: 'radio', options: ['Yes', 'No'], required: true, step: 5, category: "Immigration History" },
    { id: 2017, question: "Any bans or deportations?", type: 'radio', options: ['Yes', 'No'], required: true, step: 5, category: "Immigration History" },
    { id: 2018, question: "Studied in the UK before?", type: 'radio', options: ['Yes', 'No'], required: true, step: 5, category: "Immigration History" },
    
    // 6. Accommodation in the UK
    { id: 2019, question: "Where will you live?", type: 'select', options: ['University accommodation', 'Private accommodation', 'Family/friends'], required: true, step: 6, category: "Accommodation in the UK" },
  ],
  'UK Ancestors Visa': [
    // 1. Personal Details
    { id: 2101, question: "What is your full name?", type: 'text', required: true, step: 1, category: "Personal Details" },
    { id: 2102, question: "What is your date of birth?", type: 'date', required: true, step: 1, category: "Personal Details" },
    { id: 2103, question: "What is your nationality?", type: 'select', options: ['Turkish', 'English', 'Arabic', 'French', 'German', 'Italian', 'Spanish', 'Portuguese', 'Russian', 'Chinese', 'Japanese', 'Korean', 'Indian', 'Pakistani', 'Bangladeshi', 'Iranian', 'Iraqi', 'Syrian', 'Lebanese', 'Jordanian', 'Egyptian', 'Moroccan', 'Algerian', 'Tunisian', 'Libyan', 'Sudanese', 'Saudi Arabian', 'Emirati', 'Kuwaiti', 'Qatari', 'Bahraini', 'Omani', 'Yemeni', 'Afghan', 'Kazakh', 'Uzbek', 'Kyrgyz', 'Tajik', 'Turkmen', 'Azerbaijani', 'Georgian', 'Armenian', 'Ukrainian', 'Belarusian', 'Polish', 'Czech', 'Slovak', 'Hungarian', 'Romanian', 'Bulgarian', 'Croatian', 'Serbian', 'Bosnian', 'Albanian', 'Macedonian', 'Slovenian', 'Estonian', 'Latvian', 'Lithuanian', 'Finnish', 'Swedish', 'Norwegian', 'Danish', 'Icelandic', 'Dutch', 'Belgian', 'Swiss', 'Austrian', 'Greek', 'Cypriot', 'Maltese', 'Irish', 'Scottish', 'Welsh', 'Canadian', 'American', 'Mexican', 'Brazilian', 'Argentinian', 'Chilean', 'Colombian', 'Peruvian', 'Venezuelan', 'Ecuadorian', 'Uruguayan', 'Paraguayan', 'Bolivian', 'Australian', 'New Zealander', 'South African', 'Nigerian', 'Kenyan', 'Ghanaian', 'Ethiopian', 'Ugandan', 'Tanzanian', 'Other'], required: true, step: 1, category: "Personal Details" },
    { id: 2104, question: "What is your country of residence?", type: 'text', required: true, step: 1, category: "Personal Details" },
    { id: 2105, question: "What is your contact phone number?", type: 'text', required: true, step: 1, category: "Personal Details" },
    { id: 2106, question: "What is your contact email?", type: 'email', required: true, step: 1, category: "Personal Details" },
    
    // 2. Family Line (Ancestry Details)
    { id: 2107, question: "Do you have a grandparent born in the UK, Channel Islands or Isle of Man?", type: 'radio', options: ['Yes', 'No'], required: true, step: 2, category: "Family Line (Ancestry Details)" },
    { id: 2108, question: "If born before 1922, was the place of birth in what is now Ireland?", type: 'radio', options: ['Yes', 'No'], required: false, step: 2, category: "Family Line (Ancestry Details)" },
    { id: 2109, question: "Do you have a birth certificate?", type: 'radio', options: ['Yes', 'No'], required: true, step: 2, category: "Family Line (Ancestry Details)" },
    { id: 2110, question: "Do you have your parents' birth certificate?", type: 'radio', options: ['Yes', 'No'], required: true, step: 2, category: "Family Line (Ancestry Details)" },
    { id: 2111, question: "Do you have your grandparent's birth certificate?", type: 'radio', options: ['Yes', 'No'], required: true, step: 2, category: "Family Line (Ancestry Details)" },
    
    // 3. Work Plans in the UK
    { id: 2112, question: "Do you plan to work in the UK?", type: 'radio', options: ['Yes', 'No'], required: true, step: 3, category: "Work Plans in the UK" },
    { id: 2113, question: "What type of work/industry do you plan to work in?", type: 'text', required: false, step: 3, category: "Work Plans in the UK" },
    { id: 2114, question: "Do you have a job offer?", type: 'radio', options: ['Yes', 'No'], required: true, step: 3, category: "Work Plans in the UK" },
    
    // 4. Financial Details
    { id: 2115, question: "Do you have enough funds to support yourself?", type: 'radio', options: ['Yes', 'No'], required: true, step: 4, category: "Financial Details" },
    { id: 2116, question: "What is your bank balance / savings?", type: 'text', required: false, step: 4, category: "Financial Details" },
    { id: 2117, question: "Any financial support from others?", type: 'radio', options: ['Yes', 'No'], required: true, step: 4, category: "Financial Details" },
    
    // 5. Accommodation in the UK
    { id: 2118, question: "Where will you live?", type: 'select', options: ['Renting', 'With family', 'Own property'], required: true, step: 5, category: "Accommodation in the UK" },
    
    // 7. Dependants
    { id: 2119, question: "Are dependants applying with you?", type: 'radio', options: ['Yes', 'No'], required: true, step: 7, category: "Dependants" },
  ],
  'Visitors Visa': [
    // 1. About You
    { id: 2201, question: "What is your full name (as in passport)?", type: 'text', required: true, step: 1, category: "About You" },
    { id: 2202, question: "What is your date of birth?", type: 'date', required: true, step: 1, category: "About You" },
    { id: 2203, question: "What is your nationality?", type: 'select', options: ['Turkish', 'English', 'Arabic', 'French', 'German', 'Italian', 'Spanish', 'Portuguese', 'Russian', 'Chinese', 'Japanese', 'Korean', 'Indian', 'Pakistani', 'Bangladeshi', 'Iranian', 'Iraqi', 'Syrian', 'Lebanese', 'Jordanian', 'Egyptian', 'Moroccan', 'Algerian', 'Tunisian', 'Libyan', 'Sudanese', 'Saudi Arabian', 'Emirati', 'Kuwaiti', 'Qatari', 'Bahraini', 'Omani', 'Yemeni', 'Afghan', 'Kazakh', 'Uzbek', 'Kyrgyz', 'Tajik', 'Turkmen', 'Azerbaijani', 'Georgian', 'Armenian', 'Ukrainian', 'Belarusian', 'Polish', 'Czech', 'Slovak', 'Hungarian', 'Romanian', 'Bulgarian', 'Croatian', 'Serbian', 'Bosnian', 'Albanian', 'Macedonian', 'Slovenian', 'Estonian', 'Latvian', 'Lithuanian', 'Finnish', 'Swedish', 'Norwegian', 'Danish', 'Icelandic', 'Dutch', 'Belgian', 'Swiss', 'Austrian', 'Greek', 'Cypriot', 'Maltese', 'Irish', 'Scottish', 'Welsh', 'Canadian', 'American', 'Mexican', 'Brazilian', 'Argentinian', 'Chilean', 'Colombian', 'Peruvian', 'Venezuelan', 'Ecuadorian', 'Uruguayan', 'Paraguayan', 'Bolivian', 'Australian', 'New Zealander', 'South African', 'Nigerian', 'Kenyan', 'Ghanaian', 'Ethiopian', 'Ugandan', 'Tanzanian', 'Other'], required: true, step: 1, category: "About You" },
    { id: 2204, question: "What is your country of residence?", type: 'text', required: true, step: 1, category: "About You" },
    { id: 2205, question: "What is your contact phone number?", type: 'text', required: true, step: 1, category: "About You" },
    { id: 2206, question: "What is your contact email address?", type: 'email', required: true, step: 1, category: "About You" },
    { id: 2207, question: "What is your job/occupation?", type: 'text', required: true, step: 1, category: "About You" },
    { id: 2208, question: "What is your monthly income?", type: 'text', required: true, step: 1, category: "About You" },
    
    // 2. Your Visit to the UK
    { id: 2209, question: "What is the main reason for your visit?", type: 'select', options: ['Tourism / Holiday', 'Visiting family or friends', 'Business', 'Medical treatment', 'Short study course (<6 months)', 'Other'], required: true, step: 2, category: "Your Visit to the UK" },
    { id: 2210, question: "If other, please explain", type: 'textarea', required: false, step: 2, category: "Your Visit to the UK" },
    { id: 2211, question: "Where will you stay?", type: 'select', options: ['Hotel', 'Family/friends', 'Sponsor/host'], required: true, step: 2, category: "Your Visit to the UK" },
    
    // 3. Sponsor/Host Details (if someone is inviting or hosting you)
    { id: 2212, question: "What is your sponsor/host's name?", type: 'text', required: false, step: 3, category: "Sponsor/Host Details" },
    { id: 2213, question: "What is your sponsor/host's relationship to you?", type: 'text', required: false, step: 3, category: "Sponsor/Host Details" },
    { id: 2214, question: "Is your sponsor/host British or Settled in the UK?", type: 'radio', options: ['Yes', 'No'], required: false, step: 3, category: "Sponsor/Host Details" },
    { id: 2215, question: "What are your sponsor/host's contact details?", type: 'textarea', required: false, step: 3, category: "Sponsor/Host Details" },
    
    // 4. Financial Information
    { id: 2216, question: "Who will pay for your trip?", type: 'select', options: ['Me', 'Sponsor', 'Shared'], required: true, step: 4, category: "Financial Information" },
    
    // 5. Immigration History
    { id: 2217, question: "Have you visited the UK before?", type: 'radio', options: ['Yes', 'No'], required: true, step: 5, category: "Immigration History" },
    { id: 2218, question: "Do you have visas for other countries? (e.g., Schengen, USA)", type: 'radio', options: ['Yes', 'No'], required: true, step: 5, category: "Immigration History" },
    { id: 2219, question: "Any visa refusals?", type: 'radio', options: ['Yes', 'No'], required: true, step: 5, category: "Immigration History" },
    { id: 2220, question: "Any overstays, immigration issues, or bans?", type: 'radio', options: ['Yes', 'No'], required: true, step: 5, category: "Immigration History" },
    
    // 6. Ties to Your Home Country
    { id: 2221, question: "What is your residential status?", type: 'select', options: ['Own', 'Rent', 'Live with family'], required: true, step: 6, category: "Ties to Your Home Country" },
    { id: 2222, question: "Do you have family responsibilities?", type: 'radio', options: ['Yes', 'No'], required: true, step: 6, category: "Ties to Your Home Country" },
    { id: 2223, question: "Can you provide proof of employment?", type: 'radio', options: ['Yes', 'No'], required: true, step: 6, category: "Ties to Your Home Country" },
    { id: 2224, question: "Do you own a business?", type: 'radio', options: ['Yes', 'No'], required: true, step: 6, category: "Ties to Your Home Country" },
    { id: 2225, question: "Are you a student?", type: 'radio', options: ['Yes', 'No'], required: true, step: 6, category: "Ties to Your Home Country" },
  ],
  'Asylum & Human rights': [
    // 1. Applicant Details
    { id: 201, question: "What is your full name?", type: 'text', required: true, step: 1, category: "Applicant Details" },
    { id: 202, question: "What is your date of birth?", type: 'date', required: true, step: 1, category: "Applicant Details" },
    { id: 203, question: "What is your nationality?", type: 'select', options: ['Turkish', 'English', 'Arabic', 'French', 'German', 'Italian', 'Spanish', 'Portuguese', 'Russian', 'Chinese', 'Japanese', 'Korean', 'Indian', 'Pakistani', 'Bangladeshi', 'Iranian', 'Iraqi', 'Syrian', 'Lebanese', 'Jordanian', 'Egyptian', 'Moroccan', 'Algerian', 'Tunisian', 'Libyan', 'Sudanese', 'Saudi Arabian', 'Emirati', 'Kuwaiti', 'Qatari', 'Bahraini', 'Omani', 'Yemeni', 'Afghan', 'Kazakh', 'Uzbek', 'Kyrgyz', 'Tajik', 'Turkmen', 'Azerbaijani', 'Georgian', 'Armenian', 'Ukrainian', 'Belarusian', 'Polish', 'Czech', 'Slovak', 'Hungarian', 'Romanian', 'Bulgarian', 'Croatian', 'Serbian', 'Bosnian', 'Albanian', 'Macedonian', 'Slovenian', 'Estonian', 'Latvian', 'Lithuanian', 'Finnish', 'Swedish', 'Norwegian', 'Danish', 'Icelandic', 'Dutch', 'Belgian', 'Swiss', 'Austrian', 'Greek', 'Cypriot', 'Maltese', 'Irish', 'Scottish', 'Welsh', 'Canadian', 'American', 'Mexican', 'Brazilian', 'Argentinian', 'Chilean', 'Colombian', 'Peruvian', 'Venezuelan', 'Ecuadorian', 'Uruguayan', 'Paraguayan', 'Bolivian', 'Australian', 'New Zealander', 'South African', 'Nigerian', 'Kenyan', 'Ghanaian', 'Ethiopian', 'Ugandan', 'Tanzanian', 'Other'], required: true, step: 1, category: "Applicant Details" },
    { id: 204, question: "What is your contact phone number?", type: 'text', required: true, step: 1, category: "Applicant Details" },
    { id: 205, question: "What is your contact email address?", type: 'email', required: true, step: 1, category: "Applicant Details" },
    { id: 206, question: "What is your gender?", type: 'radio', options: ['Male', 'Female', 'Other', 'Prefer not to say'], required: true, step: 1, category: "Applicant Details" },
    
    // 2. Travel / Arrival Information
    { id: 207, question: "What is your date of arrival in the UK?", type: 'date', required: true, step: 2, category: "Travel / Arrival Information" },
    
    // 3. Reasons for Claim
    { id: 208, question: "Why are you seeking protection? (Brief description)", type: 'textarea', required: true, step: 3, category: "Reasons for Claim" },
    { id: 209, question: "Are you at risk in your home country?", type: 'radio', options: ['Yes', 'No'], required: true, step: 3, category: "Reasons for Claim" },
    
    // 4. Family / Dependants
    { id: 210, question: "Are you applying with dependants?", type: 'radio', options: ['Yes', 'No'], required: true, step: 4, category: "Family / Dependants" },
    
    // 5. Previous Claims / Immigration History
    { id: 211, question: "Have you claimed asylum in another country?", type: 'radio', options: ['Yes', 'No'], required: true, step: 5, category: "Previous Claims / Immigration History" },
    { id: 212, question: "Any previous UK visas or refusals?", type: 'radio', options: ['Yes', 'No'], required: true, step: 5, category: "Previous Claims / Immigration History" },
    { id: 213, question: "Any deportations, overstays, or immigration breaches?", type: 'radio', options: ['Yes', 'No'], required: true, step: 5, category: "Previous Claims / Immigration History" },
  ],
  // Leave to Remain Routes
  'Fee Waiver': [
    // 1. Personal Details
    { id: 301, question: "What is your full name?", type: 'text', required: true, step: 1, category: "Personal Details" },
    { id: 302, question: "What is your date of birth?", type: 'date', required: true, step: 1, category: "Personal Details" },
    { id: 303, question: "What is your nationality?", type: 'select', options: ['Turkish', 'English', 'Arabic', 'French', 'German', 'Italian', 'Spanish', 'Portuguese', 'Russian', 'Chinese', 'Japanese', 'Korean', 'Indian', 'Pakistani', 'Bangladeshi', 'Iranian', 'Iraqi', 'Syrian', 'Lebanese', 'Jordanian', 'Egyptian', 'Moroccan', 'Algerian', 'Tunisian', 'Libyan', 'Sudanese', 'Saudi Arabian', 'Emirati', 'Kuwaiti', 'Qatari', 'Bahraini', 'Omani', 'Yemeni', 'Afghan', 'Kazakh', 'Uzbek', 'Kyrgyz', 'Tajik', 'Turkmen', 'Azerbaijani', 'Georgian', 'Armenian', 'Ukrainian', 'Belarusian', 'Polish', 'Czech', 'Slovak', 'Hungarian', 'Romanian', 'Bulgarian', 'Croatian', 'Serbian', 'Bosnian', 'Albanian', 'Macedonian', 'Slovenian', 'Estonian', 'Latvian', 'Lithuanian', 'Finnish', 'Swedish', 'Norwegian', 'Danish', 'Icelandic', 'Dutch', 'Belgian', 'Swiss', 'Austrian', 'Greek', 'Cypriot', 'Maltese', 'Irish', 'Scottish', 'Welsh', 'Canadian', 'American', 'Mexican', 'Brazilian', 'Argentinian', 'Chilean', 'Colombian', 'Peruvian', 'Venezuelan', 'Ecuadorian', 'Uruguayan', 'Paraguayan', 'Bolivian', 'Australian', 'New Zealander', 'South African', 'Nigerian', 'Kenyan', 'Ghanaian', 'Ethiopian', 'Ugandan', 'Tanzanian', 'Other'], required: true, step: 1, category: "Personal Details" },
    { id: 304, question: "What is your contact phone number?", type: 'text', required: true, step: 1, category: "Personal Details" },
    { id: 305, question: "What is your contact email?", type: 'email', required: true, step: 1, category: "Personal Details" },
    { id: 306, question: "What visa/route are you applying for?", type: 'text', required: true, step: 1, category: "Personal Details" },
    
    // 2. Household
    { id: 307, question: "What is your marital status?", type: 'select', options: ['Single', 'Married', 'Divorced', 'Widowed', 'Civil Partnership', 'Separated'], required: true, step: 2, category: "Household" },
    { id: 308, question: "Who lives with you? (partner, children, others)", type: 'textarea', required: true, step: 2, category: "Household" },
    { id: 309, question: "Number of dependants", type: 'text', required: true, step: 2, category: "Household" },
    
    // 3. Income & Savings
    { id: 310, question: "Do you receive any income?", type: 'radio', options: ['Yes', 'No'], required: true, step: 3, category: "Income & Savings" },
    { id: 312, question: "Do you have any savings?", type: 'radio', options: ['Yes', 'No'], required: true, step: 3, category: "Income & Savings" },
    
    // 4. Monthly Expenses
    { id: 314, question: "What is your rent/mortgage amount?", type: 'text', required: true, step: 4, category: "Monthly Expenses" },
    { id: 315, question: "What is your total bills (utilities) amount?", type: 'text', required: true, step: 4, category: "Monthly Expenses" },
    { id: 316, question: "What is your total food/essentials amount?", type: 'text', required: true, step: 4, category: "Monthly Expenses" },
    { id: 317, question: "What is the total amount of any other expenses?", type: 'text', required: true, step: 4, category: "Monthly Expenses" },
    
    // 5. Employment
    { id: 318, question: "Are you currently working?", type: 'radio', options: ['Yes', 'No'], required: true, step: 5, category: "Employment" },
  ],
  'Spouse Route': [
    // 1. Applicant Details
    { id: 401, question: "What is your full name?", type: 'text', required: true, step: 1, category: "Applicant Details" },
    { id: 402, question: "What is your date of birth?", type: 'date', required: true, step: 1, category: "Applicant Details" },
    { id: 403, question: "What is your nationality?", type: 'select', options: ['Turkish', 'English', 'Arabic', 'French', 'German', 'Italian', 'Spanish', 'Portuguese', 'Russian', 'Chinese', 'Japanese', 'Korean', 'Indian', 'Pakistani', 'Bangladeshi', 'Iranian', 'Iraqi', 'Syrian', 'Lebanese', 'Jordanian', 'Egyptian', 'Moroccan', 'Algerian', 'Tunisian', 'Libyan', 'Sudanese', 'Saudi Arabian', 'Emirati', 'Kuwaiti', 'Qatari', 'Bahraini', 'Omani', 'Yemeni', 'Afghan', 'Kazakh', 'Uzbek', 'Kyrgyz', 'Tajik', 'Turkmen', 'Azerbaijani', 'Georgian', 'Armenian', 'Ukrainian', 'Belarusian', 'Polish', 'Czech', 'Slovak', 'Hungarian', 'Romanian', 'Bulgarian', 'Croatian', 'Serbian', 'Bosnian', 'Albanian', 'Macedonian', 'Slovenian', 'Estonian', 'Latvian', 'Lithuanian', 'Finnish', 'Swedish', 'Norwegian', 'Danish', 'Icelandic', 'Dutch', 'Belgian', 'Swiss', 'Austrian', 'Greek', 'Cypriot', 'Maltese', 'Irish', 'Scottish', 'Welsh', 'Canadian', 'American', 'Mexican', 'Brazilian', 'Argentinian', 'Chilean', 'Colombian', 'Peruvian', 'Venezuelan', 'Ecuadorian', 'Uruguayan', 'Paraguayan', 'Bolivian', 'Australian', 'New Zealander', 'South African', 'Nigerian', 'Kenyan', 'Ghanaian', 'Ethiopian', 'Ugandan', 'Tanzanian', 'Other'], required: true, step: 1, category: "Applicant Details" },
    { id: 404, question: "What is your contact phone number?", type: 'text', required: true, step: 1, category: "Applicant Details" },
    { id: 405, question: "What is your contact email?", type: 'email', required: true, step: 1, category: "Applicant Details" },
    { id: 406, question: "What is your current immigration status in the UK? (if applicable, e.g., Spouse Visa, Tier 4, Visitor, Student, Work visa)", type: 'text', required: false, step: 1, category: "Applicant Details" },
    
    // 2. Partner / Sponsor Details
    { id: 407, question: "What is your partner/sponsor's full name?", type: 'text', required: true, step: 2, category: "Partner / Sponsor Details" },
    { id: 408, question: "What is your partner/sponsor's date of birth?", type: 'date', required: true, step: 2, category: "Partner / Sponsor Details" },
    { id: 409, question: "What is your partner/sponsor's nationality?", type: 'select', options: ['Turkish', 'English', 'Arabic', 'French', 'German', 'Italian', 'Spanish', 'Portuguese', 'Russian', 'Chinese', 'Japanese', 'Korean', 'Indian', 'Pakistani', 'Bangladeshi', 'Iranian', 'Iraqi', 'Syrian', 'Lebanese', 'Jordanian', 'Egyptian', 'Moroccan', 'Algerian', 'Tunisian', 'Libyan', 'Sudanese', 'Saudi Arabian', 'Emirati', 'Kuwaiti', 'Qatari', 'Bahraini', 'Omani', 'Yemeni', 'Afghan', 'Kazakh', 'Uzbek', 'Kyrgyz', 'Tajik', 'Turkmen', 'Azerbaijani', 'Georgian', 'Armenian', 'Ukrainian', 'Belarusian', 'Polish', 'Czech', 'Slovak', 'Hungarian', 'Romanian', 'Bulgarian', 'Croatian', 'Serbian', 'Bosnian', 'Albanian', 'Macedonian', 'Slovenian', 'Estonian', 'Latvian', 'Lithuanian', 'Finnish', 'Swedish', 'Norwegian', 'Danish', 'Icelandic', 'Dutch', 'Belgian', 'Swiss', 'Austrian', 'Greek', 'Cypriot', 'Maltese', 'Irish', 'Scottish', 'Welsh', 'Canadian', 'American', 'Mexican', 'Brazilian', 'Argentinian', 'Chilean', 'Colombian', 'Peruvian', 'Venezuelan', 'Ecuadorian', 'Uruguayan', 'Paraguayan', 'Bolivian', 'Australian', 'New Zealander', 'South African', 'Nigerian', 'Kenyan', 'Ghanaian', 'Ethiopian', 'Ugandan', 'Tanzanian', 'British', 'ILR', 'Refugee', 'Settled/Pre-Settled', 'Other'], required: true, step: 2, category: "Partner / Sponsor Details" },
    { id: 410, question: "What is your partner/sponsor's current immigration status in the UK? (British, ILR, Refugee, Settled/Pre-Settled, Visa category)", type: 'text', required: true, step: 2, category: "Partner / Sponsor Details" },
    
    // 3. Relationship Details
    { id: 411, question: "What is your relationship status?", type: 'select', options: ['Married', 'Civil partnership', 'Engaged', 'Unmarried partners'], required: true, step: 3, category: "Relationship Details" },
    { id: 412, question: "Do you and your partner have children together?", type: 'radio', options: ['Yes', 'No'], required: true, step: 3, category: "Relationship Details" },
    
    // 4. Financial Information
    { id: 413, question: "What is your combined annual income (applicant + partner)?", type: 'text', required: true, step: 4, category: "Financial Information" },
    { id: 414, question: "Do you have savings?", type: 'radio', options: ['Yes', 'No'], required: true, step: 4, category: "Financial Information" },
    { id: 416, question: "Any other sources of income?", type: 'radio', options: ['Yes', 'No'], required: true, step: 4, category: "Financial Information" },
    
    // 5. English Language (Applicant)
    { id: 418, question: "Have you passed an approved English test?", type: 'radio', options: ['Yes', 'No'], required: true, step: 5, category: "English Language (Applicant)" },
    { id: 420, question: "Are you exempt from English requirement?", type: 'radio', options: ['Yes', 'No'], required: true, step: 5, category: "English Language (Applicant)" },
    
    // 7. Immigration History
    { id: 422, question: "Previous UK visas?", type: 'radio', options: ['Yes', 'No'], required: true, step: 7, category: "Immigration History" },
    { id: 423, question: "Any visa refusals?", type: 'radio', options: ['Yes', 'No'], required: true, step: 7, category: "Immigration History" },
    { id: 424, question: "Any overstaying or immigration breaches?", type: 'radio', options: ['Yes', 'No'], required: true, step: 7, category: "Immigration History" },
    { id: 425, question: "Any criminal convictions?", type: 'radio', options: ['Yes', 'No'], required: true, step: 7, category: "Immigration History" },
  ],
  'Parent Route': [
    // 1. Applicant Details
    { id: 501, question: "What is your full name?", type: 'text', required: true, step: 1, category: "Applicant Details" },
    { id: 502, question: "What is your date of birth?", type: 'date', required: true, step: 1, category: "Applicant Details" },
    { id: 503, question: "What is your nationality?", type: 'select', options: ['Turkish', 'English', 'Arabic', 'French', 'German', 'Italian', 'Spanish', 'Portuguese', 'Russian', 'Chinese', 'Japanese', 'Korean', 'Indian', 'Pakistani', 'Bangladeshi', 'Iranian', 'Iraqi', 'Syrian', 'Lebanese', 'Jordanian', 'Egyptian', 'Moroccan', 'Algerian', 'Tunisian', 'Libyan', 'Sudanese', 'Saudi Arabian', 'Emirati', 'Kuwaiti', 'Qatari', 'Bahraini', 'Omani', 'Yemeni', 'Afghan', 'Kazakh', 'Uzbek', 'Kyrgyz', 'Tajik', 'Turkmen', 'Azerbaijani', 'Georgian', 'Armenian', 'Ukrainian', 'Belarusian', 'Polish', 'Czech', 'Slovak', 'Hungarian', 'Romanian', 'Bulgarian', 'Croatian', 'Serbian', 'Bosnian', 'Albanian', 'Macedonian', 'Slovenian', 'Estonian', 'Latvian', 'Lithuanian', 'Finnish', 'Swedish', 'Norwegian', 'Danish', 'Icelandic', 'Dutch', 'Belgian', 'Swiss', 'Austrian', 'Greek', 'Cypriot', 'Maltese', 'Irish', 'Scottish', 'Welsh', 'Canadian', 'American', 'Mexican', 'Brazilian', 'Argentinian', 'Chilean', 'Colombian', 'Peruvian', 'Venezuelan', 'Ecuadorian', 'Uruguayan', 'Paraguayan', 'Bolivian', 'Australian', 'New Zealander', 'South African', 'Nigerian', 'Kenyan', 'Ghanaian', 'Ethiopian', 'Ugandan', 'Tanzanian', 'Other'], required: true, step: 1, category: "Applicant Details" },
    { id: 504, question: "What is your contact phone number?", type: 'text', required: true, step: 1, category: "Applicant Details" },
    { id: 505, question: "What is your contact email?", type: 'email', required: true, step: 1, category: "Applicant Details" },
    { id: 506, question: "What is your current immigration status in the UK? (e.g., Family Route, Student, Visitor, Work visa)", type: 'text', required: false, step: 1, category: "Applicant Details" },
    
    // 2. Child Details
    { id: 507, question: "What is the full name of child(ren) in the UK?", type: 'text', required: true, step: 2, category: "Child Details" },
    { id: 508, question: "What is the date(s) of birth of child(ren)?", type: 'date', required: true, step: 2, category: "Child Details" },
    { id: 509, question: "What is the nationality of child(ren)?", type: 'select', options: ['Turkish', 'English', 'Arabic', 'French', 'German', 'Italian', 'Spanish', 'Portuguese', 'Russian', 'Chinese', 'Japanese', 'Korean', 'Indian', 'Pakistani', 'Bangladeshi', 'Iranian', 'Iraqi', 'Syrian', 'Lebanese', 'Jordanian', 'Egyptian', 'Moroccan', 'Algerian', 'Tunisian', 'Libyan', 'Sudanese', 'Saudi Arabian', 'Emirati', 'Kuwaiti', 'Qatari', 'Bahraini', 'Omani', 'Yemeni', 'Afghan', 'Kazakh', 'Uzbek', 'Kyrgyz', 'Tajik', 'Turkmen', 'Azerbaijani', 'Georgian', 'Armenian', 'Ukrainian', 'Belarusian', 'Polish', 'Czech', 'Slovak', 'Hungarian', 'Romanian', 'Bulgarian', 'Croatian', 'Serbian', 'Bosnian', 'Albanian', 'Macedonian', 'Slovenian', 'Estonian', 'Latvian', 'Lithuanian', 'Finnish', 'Swedish', 'Norwegian', 'Danish', 'Icelandic', 'Dutch', 'Belgian', 'Swiss', 'Austrian', 'Greek', 'Cypriot', 'Maltese', 'Irish', 'Scottish', 'Welsh', 'Canadian', 'American', 'Mexican', 'Brazilian', 'Argentinian', 'Chilean', 'Colombian', 'Peruvian', 'Venezuelan', 'Ecuadorian', 'Uruguayan', 'Paraguayan', 'Bolivian', 'Australian', 'New Zealander', 'South African', 'Nigerian', 'Kenyan', 'Ghanaian', 'Ethiopian', 'Ugandan', 'Tanzanian', 'British', 'Other'], required: true, step: 2, category: "Child Details" },
    { id: 510, question: "Is your child a British citizen or settled in the UK?", type: 'radio', options: ['Yes', 'No'], required: true, step: 2, category: "Child Details" },
    
    // 3. Relationship to Child
    { id: 511, question: "Are you the parent or legal guardian?", type: 'radio', options: ['Yes', 'No'], required: true, step: 3, category: "Relationship to Child" },
    { id: 512, question: "Do you live with the child in the UK?", type: 'radio', options: ['Yes', 'No'], required: true, step: 3, category: "Relationship to Child" },
    { id: 513, question: "Does the child live with another parent?", type: 'radio', options: ['Yes', 'No'], required: true, step: 3, category: "Relationship to Child" },
    
    // 4. Financial Information
    { id: 515, question: "Do you have income in the UK?", type: 'radio', options: ['Yes', 'No'], required: true, step: 4, category: "Financial Information" },
    
    // 5. English Language (Applicant)
    { id: 516, question: "Have you passed an approved English test?", type: 'radio', options: ['Yes', 'No'], required: true, step: 5, category: "English Language (Applicant)" },
    { id: 518, question: "Are you exempt from English requirement?", type: 'radio', options: ['Yes', 'No'], required: true, step: 5, category: "English Language (Applicant)" },
  ],
  'Family & Private Life (10 Year Route)': [
    // 1. Applicant Details
    { id: 601, question: "What is your full name?", type: 'text', required: true, step: 1, category: "Applicant Details" },
    { id: 602, question: "What is your date of birth?", type: 'date', required: true, step: 1, category: "Applicant Details" },
    { id: 603, question: "What is your nationality?", type: 'select', options: ['Turkish', 'English', 'Arabic', 'French', 'German', 'Italian', 'Spanish', 'Portuguese', 'Russian', 'Chinese', 'Japanese', 'Korean', 'Indian', 'Pakistani', 'Bangladeshi', 'Iranian', 'Iraqi', 'Syrian', 'Lebanese', 'Jordanian', 'Egyptian', 'Moroccan', 'Algerian', 'Tunisian', 'Libyan', 'Sudanese', 'Saudi Arabian', 'Emirati', 'Kuwaiti', 'Qatari', 'Bahraini', 'Omani', 'Yemeni', 'Afghan', 'Kazakh', 'Uzbek', 'Kyrgyz', 'Tajik', 'Turkmen', 'Azerbaijani', 'Georgian', 'Armenian', 'Ukrainian', 'Belarusian', 'Polish', 'Czech', 'Slovak', 'Hungarian', 'Romanian', 'Bulgarian', 'Croatian', 'Serbian', 'Bosnian', 'Albanian', 'Macedonian', 'Slovenian', 'Estonian', 'Latvian', 'Lithuanian', 'Finnish', 'Swedish', 'Norwegian', 'Danish', 'Icelandic', 'Dutch', 'Belgian', 'Swiss', 'Austrian', 'Greek', 'Cypriot', 'Maltese', 'Irish', 'Scottish', 'Welsh', 'Canadian', 'American', 'Mexican', 'Brazilian', 'Argentinian', 'Chilean', 'Colombian', 'Peruvian', 'Venezuelan', 'Ecuadorian', 'Uruguayan', 'Paraguayan', 'Bolivian', 'Australian', 'New Zealander', 'South African', 'Nigerian', 'Kenyan', 'Ghanaian', 'Ethiopian', 'Ugandan', 'Tanzanian', 'Other'], required: true, step: 1, category: "Applicant Details" },
    { id: 604, question: "What is your contact phone number?", type: 'text', required: true, step: 1, category: "Applicant Details" },
    { id: 605, question: "What is your contact email?", type: 'email', required: true, step: 1, category: "Applicant Details" },
    { id: 606, question: "What is your current immigration status in the UK? (e.g., Tier 2/4, Spouse visa, Visitor, Student, Work visa or overstayer)", type: 'text', required: false, step: 1, category: "Applicant Details" },
    
    // 2. Family / Private Life Details
    { id: 607, question: "Do you have a partner in the UK?", type: 'radio', options: ['Yes', 'No'], required: true, step: 2, category: "Family / Private Life Details" },
    { id: 608, question: "Do you have children in the UK?", type: 'radio', options: ['Yes', 'No'], required: true, step: 2, category: "Family / Private Life Details" },
    { id: 609, question: "Do you live with your partner/children?", type: 'radio', options: ['Yes', 'No'], required: true, step: 2, category: "Family / Private Life Details" },
    { id: 610, question: "How long have you been living in the UK continuously?", type: 'text', required: true, step: 2, category: "Family / Private Life Details" },
    
    // 3. Relationship
    { id: 611, question: "Are you married or in a civil partnership?", type: 'radio', options: ['Yes', 'No'], required: true, step: 3, category: "Relationship" },
    
    // 7. Immigration History
    { id: 612, question: "Previous UK visas?", type: 'radio', options: ['Yes', 'No'], required: true, step: 7, category: "Immigration History" },
    { id: 613, question: "Any visa refusals?", type: 'radio', options: ['Yes', 'No'], required: true, step: 7, category: "Immigration History" },
    { id: 614, question: "Any overstaying or immigration breaches?", type: 'radio', options: ['Yes', 'No'], required: true, step: 7, category: "Immigration History" },
    { id: 615, question: "Any deportation or entry bans?", type: 'radio', options: ['Yes', 'No'], required: true, step: 7, category: "Immigration History" },
    { id: 616, question: "Any criminal convictions?", type: 'radio', options: ['Yes', 'No'], required: true, step: 7, category: "Immigration History" },
  ],
  'Skilled Worker Route': [
    // 1. Applicant Details
    { id: 701, question: "What is your full name?", type: 'text', required: true, step: 1, category: "Applicant Details" },
    { id: 702, question: "What is your date of birth?", type: 'date', required: true, step: 1, category: "Applicant Details" },
    { id: 703, question: "What is your nationality?", type: 'select', options: ['Turkish', 'English', 'Arabic', 'French', 'German', 'Italian', 'Spanish', 'Portuguese', 'Russian', 'Chinese', 'Japanese', 'Korean', 'Indian', 'Pakistani', 'Bangladeshi', 'Iranian', 'Iraqi', 'Syrian', 'Lebanese', 'Jordanian', 'Egyptian', 'Moroccan', 'Algerian', 'Tunisian', 'Libyan', 'Sudanese', 'Saudi Arabian', 'Emirati', 'Kuwaiti', 'Qatari', 'Bahraini', 'Omani', 'Yemeni', 'Afghan', 'Kazakh', 'Uzbek', 'Kyrgyz', 'Tajik', 'Turkmen', 'Azerbaijani', 'Georgian', 'Armenian', 'Ukrainian', 'Belarusian', 'Polish', 'Czech', 'Slovak', 'Hungarian', 'Romanian', 'Bulgarian', 'Croatian', 'Serbian', 'Bosnian', 'Albanian', 'Macedonian', 'Slovenian', 'Estonian', 'Latvian', 'Lithuanian', 'Finnish', 'Swedish', 'Norwegian', 'Danish', 'Icelandic', 'Dutch', 'Belgian', 'Swiss', 'Austrian', 'Greek', 'Cypriot', 'Maltese', 'Irish', 'Scottish', 'Welsh', 'Canadian', 'American', 'Mexican', 'Brazilian', 'Argentinian', 'Chilean', 'Colombian', 'Peruvian', 'Venezuelan', 'Ecuadorian', 'Uruguayan', 'Paraguayan', 'Bolivian', 'Australian', 'New Zealander', 'South African', 'Nigerian', 'Kenyan', 'Ghanaian', 'Ethiopian', 'Ugandan', 'Tanzanian', 'Other'], required: true, step: 1, category: "Applicant Details" },
    { id: 704, question: "What is your contact phone number?", type: 'text', required: true, step: 1, category: "Applicant Details" },
    { id: 705, question: "What is your contact email?", type: 'email', required: true, step: 1, category: "Applicant Details" },
    { id: 706, question: "What is your current immigration status in the UK? (e.g., Student, Tier 2, Visitor, Work visa, ILR)", type: 'text', required: false, step: 1, category: "Applicant Details" },
    
    // 2. Certificate of Sponsorship (CoS)
    { id: 707, question: "Do you have a CoS (Certificate of Sponsorship) issued?", type: 'radio', options: ['Yes', 'No'], required: true, step: 2, category: "Certificate of Sponsorship (CoS)" },
    
    // 3. Job & Salary Details
    { id: 708, question: "What is your job title?", type: 'text', required: true, step: 3, category: "Job & Salary Details" },
    { id: 709, question: "What is your annual salary?", type: 'text', required: true, step: 3, category: "Job & Salary Details" },
    
    // 4. English Language Requirement
    { id: 710, question: "Have you passed an approved English test?", type: 'radio', options: ['Yes', 'No'], required: true, step: 4, category: "English Language Requirement" },
    { id: 712, question: "Are you exempt from the English requirement?", type: 'radio', options: ['Yes', 'No'], required: true, step: 4, category: "English Language Requirement" },
    
    // 5. Dependents
    { id: 714, question: "Are dependants applying with you?", type: 'radio', options: ['Yes', 'No'], required: true, step: 5, category: "Dependents" },
    
    // 8. Immigration History
    { id: 715, question: "Previous UK visas?", type: 'radio', options: ['Yes', 'No'], required: true, step: 8, category: "Immigration History" },
    { id: 716, question: "Any visa refusals?", type: 'radio', options: ['Yes', 'No'], required: true, step: 8, category: "Immigration History" },
    { id: 717, question: "Any overstaying or immigration breaches?", type: 'radio', options: ['Yes', 'No'], required: true, step: 8, category: "Immigration History" },
    { id: 718, question: "Any deportation or entry bans?", type: 'radio', options: ['Yes', 'No'], required: true, step: 8, category: "Immigration History" },
    { id: 719, question: "Any criminal convictions?", type: 'radio', options: ['Yes', 'No'], required: true, step: 8, category: "Immigration History" },
    { id: 720, question: "Previously worked in the UK?", type: 'radio', options: ['Yes', 'No'], required: true, step: 8, category: "Immigration History" },
  ],
  'Graduate Visa': [
    // 1. Applicant Details
    { id: 801, question: "What is your full name?", type: 'text', required: true, step: 1, category: "Applicant Details" },
    { id: 802, question: "What is your date of birth?", type: 'date', required: true, step: 1, category: "Applicant Details" },
    { id: 803, question: "What is your nationality?", type: 'select', options: ['Turkish', 'English', 'Arabic', 'French', 'German', 'Italian', 'Spanish', 'Portuguese', 'Russian', 'Chinese', 'Japanese', 'Korean', 'Indian', 'Pakistani', 'Bangladeshi', 'Iranian', 'Iraqi', 'Syrian', 'Lebanese', 'Jordanian', 'Egyptian', 'Moroccan', 'Algerian', 'Tunisian', 'Libyan', 'Sudanese', 'Saudi Arabian', 'Emirati', 'Kuwaiti', 'Qatari', 'Bahraini', 'Omani', 'Yemeni', 'Afghan', 'Kazakh', 'Uzbek', 'Kyrgyz', 'Tajik', 'Turkmen', 'Azerbaijani', 'Georgian', 'Armenian', 'Ukrainian', 'Belarusian', 'Polish', 'Czech', 'Slovak', 'Hungarian', 'Romanian', 'Bulgarian', 'Croatian', 'Serbian', 'Bosnian', 'Albanian', 'Macedonian', 'Slovenian', 'Estonian', 'Latvian', 'Lithuanian', 'Finnish', 'Swedish', 'Norwegian', 'Danish', 'Icelandic', 'Dutch', 'Belgian', 'Swiss', 'Austrian', 'Greek', 'Cypriot', 'Maltese', 'Irish', 'Scottish', 'Welsh', 'Canadian', 'American', 'Mexican', 'Brazilian', 'Argentinian', 'Chilean', 'Colombian', 'Peruvian', 'Venezuelan', 'Ecuadorian', 'Uruguayan', 'Paraguayan', 'Bolivian', 'Australian', 'New Zealander', 'South African', 'Nigerian', 'Kenyan', 'Ghanaian', 'Ethiopian', 'Ugandan', 'Tanzanian', 'Other'], required: true, step: 1, category: "Applicant Details" },
    { id: 804, question: "What is your contact phone number?", type: 'text', required: true, step: 1, category: "Applicant Details" },
    { id: 805, question: "What is your contact email?", type: 'email', required: true, step: 1, category: "Applicant Details" },
    { id: 806, question: "What is your current UK visa status? (e.g., Student / Tier 4 / Other)", type: 'text', required: false, step: 1, category: "Applicant Details" },
    
    // 2. Education Details
    { id: 807, question: "What UK institution did you attend?", type: 'text', required: true, step: 2, category: "Education Details" },
    { id: 808, question: "What was your course title?", type: 'text', required: true, step: 2, category: "Education Details" },
    { id: 809, question: "What was the level of course?", type: 'select', options: ['Undergraduate', 'Postgraduate', 'PhD'], required: true, step: 2, category: "Education Details" },
    { id: 810, question: "What was your course end date?", type: 'date', required: true, step: 2, category: "Education Details" },
    { id: 811, question: "Is your Confirmation of Completion / CAS reference available?", type: 'radio', options: ['Yes', 'No'], required: true, step: 2, category: "Education Details" },
    
    // 3. Financial Information
    { id: 812, question: "Do you have sufficient funds to support yourself in the UK?", type: 'radio', options: ['Yes', 'No'], required: true, step: 3, category: "Financial Information" },
    { id: 813, question: "What is your personal savings amount?", type: 'text', required: true, step: 3, category: "Financial Information" },
    { id: 814, question: "Any additional sources of income?", type: 'radio', options: ['Yes', 'No'], required: true, step: 3, category: "Financial Information" },
    
    // 4. Immigration History
    { id: 815, question: "Previous UK visas?", type: 'radio', options: ['Yes', 'No'], required: true, step: 4, category: "Immigration History" },
    { id: 816, question: "Any visa refusals?", type: 'radio', options: ['Yes', 'No'], required: true, step: 4, category: "Immigration History" },
    { id: 817, question: "Any overstaying or immigration breaches?", type: 'radio', options: ['Yes', 'No'], required: true, step: 4, category: "Immigration History" },
    { id: 818, question: "Any deportation or entry bans?", type: 'radio', options: ['Yes', 'No'], required: true, step: 4, category: "Immigration History" },
    { id: 819, question: "Any criminal convictions?", type: 'radio', options: ['Yes', 'No'], required: true, step: 4, category: "Immigration History" },
  ],
  // British Citizenship Routes
  'Naturalisation': [
    // 1. Personal Details
    { id: 901, question: "What is your full name?", type: 'text', required: true, step: 1, category: "Personal Details" },
    { id: 902, question: "What is your date of birth?", type: 'date', required: true, step: 1, category: "Personal Details" },
    { id: 903, question: "What is your nationality?", type: 'select', options: ['Turkish', 'English', 'Arabic', 'French', 'German', 'Italian', 'Spanish', 'Portuguese', 'Russian', 'Chinese', 'Japanese', 'Korean', 'Indian', 'Pakistani', 'Bangladeshi', 'Iranian', 'Iraqi', 'Syrian', 'Lebanese', 'Jordanian', 'Egyptian', 'Moroccan', 'Algerian', 'Tunisian', 'Libyan', 'Sudanese', 'Saudi Arabian', 'Emirati', 'Kuwaiti', 'Qatari', 'Bahraini', 'Omani', 'Yemeni', 'Afghan', 'Kazakh', 'Uzbek', 'Kyrgyz', 'Tajik', 'Turkmen', 'Azerbaijani', 'Georgian', 'Armenian', 'Ukrainian', 'Belarusian', 'Polish', 'Czech', 'Slovak', 'Hungarian', 'Romanian', 'Bulgarian', 'Croatian', 'Serbian', 'Bosnian', 'Albanian', 'Macedonian', 'Slovenian', 'Estonian', 'Latvian', 'Lithuanian', 'Finnish', 'Swedish', 'Norwegian', 'Danish', 'Icelandic', 'Dutch', 'Belgian', 'Swiss', 'Austrian', 'Greek', 'Cypriot', 'Maltese', 'Irish', 'Scottish', 'Welsh', 'Canadian', 'American', 'Mexican', 'Brazilian', 'Argentinian', 'Chilean', 'Colombian', 'Peruvian', 'Venezuelan', 'Ecuadorian', 'Uruguayan', 'Paraguayan', 'Bolivian', 'Australian', 'New Zealander', 'South African', 'Nigerian', 'Kenyan', 'Ghanaian', 'Ethiopian', 'Ugandan', 'Tanzanian', 'Other'], required: true, step: 1, category: "Personal Details" },
    { id: 904, question: "What is your contact phone number?", type: 'text', required: true, step: 1, category: "Personal Details" },
    { id: 905, question: "What is your contact email address?", type: 'email', required: true, step: 1, category: "Personal Details" },
    
    // 2. Immigration Status
    { id: 906, question: "Please confirm if you entered the UK illegally?", type: 'radio', options: ['Yes', 'No'], required: true, step: 2, category: "Immigration Status" },
    { id: 907, question: "Do you currently hold Indefinite leave to remain (ILR) status in the UK?", type: 'radio', options: ['Yes', 'No'], required: true, step: 2, category: "Immigration Status" },
    { id: 908, question: "What date was your ILR granted?", type: 'date', required: false, step: 2, category: "Immigration Status" },
    
    // 3. Residence in the UK
    { id: 909, question: "What date did you first arrive in the UK?", type: 'date', required: true, step: 3, category: "Residence in the UK" },
    { id: 910, question: "Have you lived in the UK continuously for the required period?", type: 'radio', options: ['Yes', 'No'], required: true, step: 3, category: "Residence in the UK" },
    { id: 911, question: "Number of days outside the UK in the last 5 years", type: 'text', required: true, step: 3, category: "Residence in the UK" },
    { id: 912, question: "Number of days outside the UK in the last 12 months", type: 'text', required: true, step: 3, category: "Residence in the UK" },
    
    // 4. Family
    { id: 913, question: "Are you married or in a civil partnership?", type: 'radio', options: ['Yes', 'No'], required: true, step: 4, category: "Family" },
    { id: 914, question: "Do you have children?", type: 'radio', options: ['Yes', 'No'], required: true, step: 4, category: "Family" },
    
    // 5. English & Life in the UK
    { id: 915, question: "Have you passed an approved English test?", type: 'radio', options: ['Yes', 'No'], required: true, step: 5, category: "English & Life in the UK" },
    { id: 916, question: "Are you exempt from English requirement?", type: 'radio', options: ['Yes', 'No'], required: true, step: 5, category: "English & Life in the UK" },
    { id: 917, question: "Have you passed the Life in the UK Test?", type: 'radio', options: ['Yes', 'No'], required: true, step: 5, category: "English & Life in the UK" },
    
    // 6. Good Character
    { id: 918, question: "Any criminal convictions in the UK or abroad?", type: 'radio', options: ['Yes', 'No'], required: true, step: 6, category: "Good Character" },
    { id: 919, question: "Any immigration fraud or legal penalties?", type: 'radio', options: ['Yes', 'No'], required: true, step: 6, category: "Good Character" },
  ],
  'Children Registration': [
    // 1. Child's Details
    { id: 1001, question: "What is the child's full name?", type: 'text', required: true, step: 1, category: "Child's Details" },
    { id: 1002, question: "What is the child's date of birth?", type: 'date', required: true, step: 1, category: "Child's Details" },
    { id: 1003, question: "What is the child's place of birth?", type: 'text', required: true, step: 1, category: "Child's Details" },
    { id: 1004, question: "What is the child's current nationality?", type: 'select', options: ['Turkish', 'English', 'Arabic', 'French', 'German', 'Italian', 'Spanish', 'Portuguese', 'Russian', 'Chinese', 'Japanese', 'Korean', 'Indian', 'Pakistani', 'Bangladeshi', 'Iranian', 'Iraqi', 'Syrian', 'Lebanese', 'Jordanian', 'Egyptian', 'Moroccan', 'Algerian', 'Tunisian', 'Libyan', 'Sudanese', 'Saudi Arabian', 'Emirati', 'Kuwaiti', 'Qatari', 'Bahraini', 'Omani', 'Yemeni', 'Afghan', 'Kazakh', 'Uzbek', 'Kyrgyz', 'Tajik', 'Turkmen', 'Azerbaijani', 'Georgian', 'Armenian', 'Ukrainian', 'Belarusian', 'Polish', 'Czech', 'Slovak', 'Hungarian', 'Romanian', 'Bulgarian', 'Croatian', 'Serbian', 'Bosnian', 'Albanian', 'Macedonian', 'Slovenian', 'Estonian', 'Latvian', 'Lithuanian', 'Finnish', 'Swedish', 'Norwegian', 'Danish', 'Icelandic', 'Dutch', 'Belgian', 'Swiss', 'Austrian', 'Greek', 'Cypriot', 'Maltese', 'Irish', 'Scottish', 'Welsh', 'Canadian', 'American', 'Mexican', 'Brazilian', 'Argentinian', 'Chilean', 'Colombian', 'Peruvian', 'Venezuelan', 'Ecuadorian', 'Uruguayan', 'Paraguayan', 'Bolivian', 'Australian', 'New Zealander', 'South African', 'Nigerian', 'Kenyan', 'Ghanaian', 'Ethiopian', 'Ugandan', 'Tanzanian', 'British', 'Other'], required: true, step: 1, category: "Child's Details" },
    { id: 1005, question: "What is the child's country of residence?", type: 'text', required: true, step: 1, category: "Child's Details" },
    { id: 1006, question: "What is the child's gender?", type: 'radio', options: ['Male', 'Female', 'Other', 'Prefer not to say'], required: true, step: 1, category: "Child's Details" },
    
    // 2. Parent / Guardian Details
    { id: 1007, question: "What is the first parent/guardian's full name?", type: 'text', required: true, step: 2, category: "Parent / Guardian Details" },
    { id: 1008, question: "What is the first parent/guardian's date of birth?", type: 'date', required: true, step: 2, category: "Parent / Guardian Details" },
    { id: 1009, question: "What is the first parent/guardian's nationality?", type: 'select', options: ['Turkish', 'English', 'Arabic', 'French', 'German', 'Italian', 'Spanish', 'Portuguese', 'Russian', 'Chinese', 'Japanese', 'Korean', 'Indian', 'Pakistani', 'Bangladeshi', 'Iranian', 'Iraqi', 'Syrian', 'Lebanese', 'Jordanian', 'Egyptian', 'Moroccan', 'Algerian', 'Tunisian', 'Libyan', 'Sudanese', 'Saudi Arabian', 'Emirati', 'Kuwaiti', 'Qatari', 'Bahraini', 'Omani', 'Yemeni', 'Afghan', 'Kazakh', 'Uzbek', 'Kyrgyz', 'Tajik', 'Turkmen', 'Azerbaijani', 'Georgian', 'Armenian', 'Ukrainian', 'Belarusian', 'Polish', 'Czech', 'Slovak', 'Hungarian', 'Romanian', 'Bulgarian', 'Croatian', 'Serbian', 'Bosnian', 'Albanian', 'Macedonian', 'Slovenian', 'Estonian', 'Latvian', 'Lithuanian', 'Finnish', 'Swedish', 'Norwegian', 'Danish', 'Icelandic', 'Dutch', 'Belgian', 'Swiss', 'Austrian', 'Greek', 'Cypriot', 'Maltese', 'Irish', 'Scottish', 'Welsh', 'Canadian', 'American', 'Mexican', 'Brazilian', 'Argentinian', 'Chilean', 'Colombian', 'Peruvian', 'Venezuelan', 'Ecuadorian', 'Uruguayan', 'Paraguayan', 'Bolivian', 'Australian', 'New Zealander', 'South African', 'Nigerian', 'Kenyan', 'Ghanaian', 'Ethiopian', 'Ugandan', 'Tanzanian', 'British', 'ILR', 'Settled', 'Other'], required: true, step: 2, category: "Parent / Guardian Details" },
    { id: 1010, question: "What is the first parent/guardian's current UK immigration status? (e.g., British citizen, ILR, settled, other visa)", type: 'text', required: true, step: 2, category: "Parent / Guardian Details" },
    { id: 1011, question: "What is the first parent/guardian's relationship to child? (mother/father/legal guardian)", type: 'select', options: ['Mother', 'Father', 'Legal Guardian'], required: true, step: 2, category: "Parent / Guardian Details" },
    { id: 1012, question: "What is the second parent/guardian's full name?", type: 'text', required: false, step: 2, category: "Parent / Guardian Details" },
    { id: 1013, question: "What is the second parent/guardian's date of birth?", type: 'date', required: false, step: 2, category: "Parent / Guardian Details" },
    { id: 1014, question: "What is the second parent/guardian's nationality?", type: 'select', options: ['Turkish', 'English', 'Arabic', 'French', 'German', 'Italian', 'Spanish', 'Portuguese', 'Russian', 'Chinese', 'Japanese', 'Korean', 'Indian', 'Pakistani', 'Bangladeshi', 'Iranian', 'Iraqi', 'Syrian', 'Lebanese', 'Jordanian', 'Egyptian', 'Moroccan', 'Algerian', 'Tunisian', 'Libyan', 'Sudanese', 'Saudi Arabian', 'Emirati', 'Kuwaiti', 'Qatari', 'Bahraini', 'Omani', 'Yemeni', 'Afghan', 'Kazakh', 'Uzbek', 'Kyrgyz', 'Tajik', 'Turkmen', 'Azerbaijani', 'Georgian', 'Armenian', 'Ukrainian', 'Belarusian', 'Polish', 'Czech', 'Slovak', 'Hungarian', 'Romanian', 'Bulgarian', 'Croatian', 'Serbian', 'Bosnian', 'Albanian', 'Macedonian', 'Slovenian', 'Estonian', 'Latvian', 'Lithuanian', 'Finnish', 'Swedish', 'Norwegian', 'Danish', 'Icelandic', 'Dutch', 'Belgian', 'Swiss', 'Austrian', 'Greek', 'Cypriot', 'Maltese', 'Irish', 'Scottish', 'Welsh', 'Canadian', 'American', 'Mexican', 'Brazilian', 'Argentinian', 'Chilean', 'Colombian', 'Peruvian', 'Venezuelan', 'Ecuadorian', 'Uruguayan', 'Paraguayan', 'Bolivian', 'Australian', 'New Zealander', 'South African', 'Nigerian', 'Kenyan', 'Ghanaian', 'Ethiopian', 'Ugandan', 'Tanzanian', 'British', 'ILR', 'Settled', 'Other'], required: false, step: 2, category: "Parent / Guardian Details" },
    { id: 1015, question: "What is the second parent/guardian's current UK immigration status? (e.g., British citizen, ILR, settled, other visa)", type: 'text', required: false, step: 2, category: "Parent / Guardian Details" },
    { id: 1016, question: "What is the second parent/guardian's relationship to child? (mother/father/legal guardian)", type: 'select', options: ['Mother', 'Father', 'Legal Guardian'], required: false, step: 2, category: "Parent / Guardian Details" },
    
    // 3. Child's Status
    { id: 1017, question: "Is the child currently living in the UK?", type: 'radio', options: ['Yes', 'No'], required: true, step: 3, category: "Child's Status" },
    { id: 1018, question: "Does the child have another nationality?", type: 'radio', options: ['Yes', 'No'], required: true, step: 3, category: "Child's Status" },
    
    // 4. Eligibility
    { id: 1019, question: "Is at least one parent a British citizen or settled in the UK?", type: 'radio', options: ['Yes', 'No'], required: true, step: 4, category: "Eligibility" },
    { id: 1020, question: "Was the child born in the UK or abroad?", type: 'select', options: ['UK', 'Abroad'], required: true, step: 4, category: "Eligibility" },
    { id: 1021, question: "Any previous applications for UK citizenship/registration?", type: 'radio', options: ['Yes', 'No'], required: true, step: 4, category: "Eligibility" },
    
    // 5. Residence
    { id: 1022, question: "How long has the child lived in the UK (if applicable)?", type: 'text', required: false, step: 5, category: "Residence" },
  ],
  // Refused Appeals Routes
  'Refused Appeals': [
    // 1. Applicant Details
    { id: 1101, question: "What is your full name?", type: 'text', required: true, step: 1, category: "Applicant Details" },
    { id: 1102, question: "What is your date of birth?", type: 'date', required: true, step: 1, category: "Applicant Details" },
    { id: 1103, question: "What is your nationality?", type: 'select', options: ['Turkish', 'English', 'Arabic', 'French', 'German', 'Italian', 'Spanish', 'Portuguese', 'Russian', 'Chinese', 'Japanese', 'Korean', 'Indian', 'Pakistani', 'Bangladeshi', 'Iranian', 'Iraqi', 'Syrian', 'Lebanese', 'Jordanian', 'Egyptian', 'Moroccan', 'Algerian', 'Tunisian', 'Libyan', 'Sudanese', 'Saudi Arabian', 'Emirati', 'Kuwaiti', 'Qatari', 'Bahraini', 'Omani', 'Yemeni', 'Afghan', 'Kazakh', 'Uzbek', 'Kyrgyz', 'Tajik', 'Turkmen', 'Azerbaijani', 'Georgian', 'Armenian', 'Ukrainian', 'Belarusian', 'Polish', 'Czech', 'Slovak', 'Hungarian', 'Romanian', 'Bulgarian', 'Croatian', 'Serbian', 'Bosnian', 'Albanian', 'Macedonian', 'Slovenian', 'Estonian', 'Latvian', 'Lithuanian', 'Finnish', 'Swedish', 'Norwegian', 'Danish', 'Icelandic', 'Dutch', 'Belgian', 'Swiss', 'Austrian', 'Greek', 'Cypriot', 'Maltese', 'Irish', 'Scottish', 'Welsh', 'Canadian', 'American', 'Mexican', 'Brazilian', 'Argentinian', 'Chilean', 'Colombian', 'Peruvian', 'Venezuelan', 'Ecuadorian', 'Uruguayan', 'Paraguayan', 'Bolivian', 'Australian', 'New Zealander', 'South African', 'Nigerian', 'Kenyan', 'Ghanaian', 'Ethiopian', 'Ugandan', 'Tanzanian', 'Other'], required: true, step: 1, category: "Applicant Details" },
    { id: 1104, question: "What is your contact phone number?", type: 'text', required: true, step: 1, category: "Applicant Details" },
    { id: 1105, question: "What is your contact email address?", type: 'email', required: true, step: 1, category: "Applicant Details" },
    
    // 2. Original Application Details
    { id: 1106, question: "What type of visa/application was refused?", type: 'text', required: true, step: 2, category: "Original Application Details" },
    { id: 1107, question: "What was the date of your original application?", type: 'date', required: true, step: 2, category: "Original Application Details" },
    { id: 1108, question: "What was the date of the refusal decision?", type: 'date', required: true, step: 2, category: "Original Application Details" },
    { id: 1109, question: "What was the refusal reference number?", type: 'text', required: false, step: 2, category: "Original Application Details" },
    
    // 3. Refusal Reasons
    { id: 1110, question: "What were the main reasons for refusal? (Please provide details)", type: 'textarea', required: true, step: 3, category: "Refusal Reasons" },
    { id: 1111, question: "Do you have a copy of the refusal letter?", type: 'radio', options: ['Yes', 'No'], required: true, step: 3, category: "Refusal Reasons" },
    
    // 4. Appeal Details
    { id: 1112, question: "What type of appeal are you making?", type: 'select', options: ['First-tier Tribunal Appeals', 'Upper Tribunal Appeals', 'Administrative Reviews'], required: true, step: 4, category: "Appeal Details" },
    { id: 1113, question: "What are your grounds for appeal? (Please explain why you believe the decision was wrong)", type: 'textarea', required: true, step: 4, category: "Appeal Details" },
    { id: 1114, question: "Do you have new evidence to support your appeal?", type: 'radio', options: ['Yes', 'No'], required: true, step: 4, category: "Appeal Details" },
    
    // 5. Immigration History
    { id: 1116, question: "Previous UK visas?", type: 'radio', options: ['Yes', 'No'], required: true, step: 5, category: "Immigration History" },
    { id: 1117, question: "Any previous visa refusals?", type: 'radio', options: ['Yes', 'No'], required: true, step: 5, category: "Immigration History" },
    { id: 1118, question: "Any previous appeals?", type: 'radio', options: ['Yes', 'No'], required: true, step: 5, category: "Immigration History" },
    { id: 1119, question: "Any overstaying or immigration breaches?", type: 'radio', options: ['Yes', 'No'], required: true, step: 5, category: "Immigration History" },
    { id: 1120, question: "Any criminal convictions?", type: 'radio', options: ['Yes', 'No'], required: true, step: 5, category: "Immigration History" },
    { id: 1121, question: "Any deportation or entry bans?", type: 'radio', options: ['Yes', 'No'], required: true, step: 5, category: "Immigration History" },
    
    // 6. Current Status
    { id: 1122, question: "What is your current immigration status in the UK?", type: 'text', required: true, step: 6, category: "Current Status" },
    { id: 1123, question: "Are you currently in the UK?", type: 'radio', options: ['Yes', 'No'], required: true, step: 6, category: "Current Status" },
  ],
  'First-tier Tribunal Appeals': [
    // 1. Applicant Details
    { id: 1201, question: "What is your full name?", type: 'text', required: true, step: 1, category: "Applicant Details" },
    { id: 1202, question: "What is your date of birth?", type: 'date', required: true, step: 1, category: "Applicant Details" },
    { id: 1203, question: "What is your nationality?", type: 'select', options: ['Turkish', 'English', 'Arabic', 'French', 'German', 'Italian', 'Spanish', 'Portuguese', 'Russian', 'Chinese', 'Japanese', 'Korean', 'Indian', 'Pakistani', 'Bangladeshi', 'Iranian', 'Iraqi', 'Syrian', 'Lebanese', 'Jordanian', 'Egyptian', 'Moroccan', 'Algerian', 'Tunisian', 'Libyan', 'Sudanese', 'Saudi Arabian', 'Emirati', 'Kuwaiti', 'Qatari', 'Bahraini', 'Omani', 'Yemeni', 'Afghan', 'Kazakh', 'Uzbek', 'Kyrgyz', 'Tajik', 'Turkmen', 'Azerbaijani', 'Georgian', 'Armenian', 'Ukrainian', 'Belarusian', 'Polish', 'Czech', 'Slovak', 'Hungarian', 'Romanian', 'Bulgarian', 'Croatian', 'Serbian', 'Bosnian', 'Albanian', 'Macedonian', 'Slovenian', 'Estonian', 'Latvian', 'Lithuanian', 'Finnish', 'Swedish', 'Norwegian', 'Danish', 'Icelandic', 'Dutch', 'Belgian', 'Swiss', 'Austrian', 'Greek', 'Cypriot', 'Maltese', 'Irish', 'Scottish', 'Welsh', 'Canadian', 'American', 'Mexican', 'Brazilian', 'Argentinian', 'Chilean', 'Colombian', 'Peruvian', 'Venezuelan', 'Ecuadorian', 'Uruguayan', 'Paraguayan', 'Bolivian', 'Australian', 'New Zealander', 'South African', 'Nigerian', 'Kenyan', 'Ghanaian', 'Ethiopian', 'Ugandan', 'Tanzanian', 'Other'], required: true, step: 1, category: "Applicant Details" },
    { id: 1204, question: "What is your contact phone number?", type: 'text', required: true, step: 1, category: "Applicant Details" },
    { id: 1205, question: "What is your contact email address?", type: 'email', required: true, step: 1, category: "Applicant Details" },
    
    // 2. Original Application Details
    { id: 1206, question: "What type of visa/application was refused?", type: 'text', required: true, step: 2, category: "Original Application Details" },
    { id: 1207, question: "What was the date of your original application?", type: 'date', required: true, step: 2, category: "Original Application Details" },
    { id: 1208, question: "What was the date of the refusal decision?", type: 'date', required: true, step: 2, category: "Original Application Details" },
    { id: 1209, question: "What was the refusal reference number?", type: 'text', required: false, step: 2, category: "Original Application Details" },
    
    // 3. Refusal Reasons
    { id: 1210, question: "What were the main reasons for refusal? (Please provide details)", type: 'textarea', required: true, step: 3, category: "Refusal Reasons" },
    { id: 1211, question: "Do you have a copy of the refusal letter?", type: 'radio', options: ['Yes', 'No'], required: true, step: 3, category: "Refusal Reasons" },
    
    // 4. Appeal Grounds
    { id: 1212, question: "What are your grounds for appeal? (Please explain why you believe the decision was wrong)", type: 'textarea', required: true, step: 4, category: "Appeal Grounds" },
    { id: 1213, question: "Do you have new evidence to support your appeal?", type: 'radio', options: ['Yes', 'No'], required: true, step: 4, category: "Appeal Grounds" },
    
    // 5. Immigration History
    { id: 1215, question: "Previous UK visas?", type: 'radio', options: ['Yes', 'No'], required: true, step: 5, category: "Immigration History" },
    { id: 1216, question: "Any previous visa refusals?", type: 'radio', options: ['Yes', 'No'], required: true, step: 5, category: "Immigration History" },
    { id: 1217, question: "Any previous appeals?", type: 'radio', options: ['Yes', 'No'], required: true, step: 5, category: "Immigration History" },
    { id: 1218, question: "Any overstaying or immigration breaches?", type: 'radio', options: ['Yes', 'No'], required: true, step: 5, category: "Immigration History" },
    { id: 1219, question: "Any criminal convictions?", type: 'radio', options: ['Yes', 'No'], required: true, step: 5, category: "Immigration History" },
    { id: 1220, question: "Any deportation or entry bans?", type: 'radio', options: ['Yes', 'No'], required: true, step: 5, category: "Immigration History" },
    
    // 6. Current Status
    { id: 1221, question: "What is your current immigration status in the UK?", type: 'text', required: true, step: 6, category: "Current Status" },
    { id: 1222, question: "Are you currently in the UK?", type: 'radio', options: ['Yes', 'No'], required: true, step: 6, category: "Current Status" },
  ],
  'Upper Tribunal Appeals': [
    // 1. Applicant Details
    { id: 1301, question: "What is your full name?", type: 'text', required: true, step: 1, category: "Applicant Details" },
    { id: 1302, question: "What is your date of birth?", type: 'date', required: true, step: 1, category: "Applicant Details" },
    { id: 1303, question: "What is your nationality?", type: 'select', options: ['Turkish', 'English', 'Arabic', 'French', 'German', 'Italian', 'Spanish', 'Portuguese', 'Russian', 'Chinese', 'Japanese', 'Korean', 'Indian', 'Pakistani', 'Bangladeshi', 'Iranian', 'Iraqi', 'Syrian', 'Lebanese', 'Jordanian', 'Egyptian', 'Moroccan', 'Algerian', 'Tunisian', 'Libyan', 'Sudanese', 'Saudi Arabian', 'Emirati', 'Kuwaiti', 'Qatari', 'Bahraini', 'Omani', 'Yemeni', 'Afghan', 'Kazakh', 'Uzbek', 'Kyrgyz', 'Tajik', 'Turkmen', 'Azerbaijani', 'Georgian', 'Armenian', 'Ukrainian', 'Belarusian', 'Polish', 'Czech', 'Slovak', 'Hungarian', 'Romanian', 'Bulgarian', 'Croatian', 'Serbian', 'Bosnian', 'Albanian', 'Macedonian', 'Slovenian', 'Estonian', 'Latvian', 'Lithuanian', 'Finnish', 'Swedish', 'Norwegian', 'Danish', 'Icelandic', 'Dutch', 'Belgian', 'Swiss', 'Austrian', 'Greek', 'Cypriot', 'Maltese', 'Irish', 'Scottish', 'Welsh', 'Canadian', 'American', 'Mexican', 'Brazilian', 'Argentinian', 'Chilean', 'Colombian', 'Peruvian', 'Venezuelan', 'Ecuadorian', 'Uruguayan', 'Paraguayan', 'Bolivian', 'Australian', 'New Zealander', 'South African', 'Nigerian', 'Kenyan', 'Ghanaian', 'Ethiopian', 'Ugandan', 'Tanzanian', 'Other'], required: true, step: 1, category: "Applicant Details" },
    { id: 1304, question: "What is your contact phone number?", type: 'text', required: true, step: 1, category: "Applicant Details" },
    { id: 1305, question: "What is your contact email address?", type: 'email', required: true, step: 1, category: "Applicant Details" },
    
    // 2. First-tier Tribunal Decision
    { id: 1306, question: "What was the First-tier Tribunal decision date?", type: 'date', required: true, step: 2, category: "First-tier Tribunal Decision" },
    { id: 1307, question: "What was the First-tier Tribunal case reference number?", type: 'text', required: true, step: 2, category: "First-tier Tribunal Decision" },
    { id: 1308, question: "What was the outcome of the First-tier Tribunal appeal?", type: 'select', options: ['Refused', 'Partially Allowed', 'Dismissed'], required: true, step: 2, category: "First-tier Tribunal Decision" },
    
    // 3. Grounds for Upper Tribunal Appeal
    { id: 1309, question: "What are your grounds for appealing to the Upper Tribunal? (Please explain the legal error or point of law)", type: 'textarea', required: true, step: 3, category: "Grounds for Upper Tribunal Appeal" },
    { id: 1310, question: "Do you have permission to appeal to the Upper Tribunal?", type: 'radio', options: ['Yes', 'No', 'Pending'], required: true, step: 3, category: "Grounds for Upper Tribunal Appeal" },
    
    // 4. Immigration History
    { id: 1311, question: "Previous UK visas?", type: 'radio', options: ['Yes', 'No'], required: true, step: 4, category: "Immigration History" },
    { id: 1312, question: "Any previous visa refusals?", type: 'radio', options: ['Yes', 'No'], required: true, step: 4, category: "Immigration History" },
    { id: 1313, question: "Any previous appeals?", type: 'radio', options: ['Yes', 'No'], required: true, step: 4, category: "Immigration History" },
    { id: 1314, question: "Any overstaying or immigration breaches?", type: 'radio', options: ['Yes', 'No'], required: true, step: 4, category: "Immigration History" },
    { id: 1315, question: "Any criminal convictions?", type: 'radio', options: ['Yes', 'No'], required: true, step: 4, category: "Immigration History" },
    
    // 5. Current Status
    { id: 1316, question: "What is your current immigration status in the UK?", type: 'text', required: true, step: 5, category: "Current Status" },
    { id: 1317, question: "Are you currently in the UK?", type: 'radio', options: ['Yes', 'No'], required: true, step: 5, category: "Current Status" },
  ],
  'Administrative Reviews': [
    // 1. Applicant Details
    { id: 1401, question: "What is your full name?", type: 'text', required: true, step: 1, category: "Applicant Details" },
    { id: 1402, question: "What is your date of birth?", type: 'date', required: true, step: 1, category: "Applicant Details" },
    { id: 1403, question: "What is your nationality?", type: 'select', options: ['Turkish', 'English', 'Arabic', 'French', 'German', 'Italian', 'Spanish', 'Portuguese', 'Russian', 'Chinese', 'Japanese', 'Korean', 'Indian', 'Pakistani', 'Bangladeshi', 'Iranian', 'Iraqi', 'Syrian', 'Lebanese', 'Jordanian', 'Egyptian', 'Moroccan', 'Algerian', 'Tunisian', 'Libyan', 'Sudanese', 'Saudi Arabian', 'Emirati', 'Kuwaiti', 'Qatari', 'Bahraini', 'Omani', 'Yemeni', 'Afghan', 'Kazakh', 'Uzbek', 'Kyrgyz', 'Tajik', 'Turkmen', 'Azerbaijani', 'Georgian', 'Armenian', 'Ukrainian', 'Belarusian', 'Polish', 'Czech', 'Slovak', 'Hungarian', 'Romanian', 'Bulgarian', 'Croatian', 'Serbian', 'Bosnian', 'Albanian', 'Macedonian', 'Slovenian', 'Estonian', 'Latvian', 'Lithuanian', 'Finnish', 'Swedish', 'Norwegian', 'Danish', 'Icelandic', 'Dutch', 'Belgian', 'Swiss', 'Austrian', 'Greek', 'Cypriot', 'Maltese', 'Irish', 'Scottish', 'Welsh', 'Canadian', 'American', 'Mexican', 'Brazilian', 'Argentinian', 'Chilean', 'Colombian', 'Peruvian', 'Venezuelan', 'Ecuadorian', 'Uruguayan', 'Paraguayan', 'Bolivian', 'Australian', 'New Zealander', 'South African', 'Nigerian', 'Kenyan', 'Ghanaian', 'Ethiopian', 'Ugandan', 'Tanzanian', 'Other'], required: true, step: 1, category: "Applicant Details" },
    { id: 1404, question: "What is your contact phone number?", type: 'text', required: true, step: 1, category: "Applicant Details" },
    { id: 1405, question: "What is your contact email address?", type: 'email', required: true, step: 1, category: "Applicant Details" },
    
    // 2. Original Application Details
    { id: 1406, question: "What type of visa/application was refused?", type: 'text', required: true, step: 2, category: "Original Application Details" },
    { id: 1407, question: "What was the date of your original application?", type: 'date', required: true, step: 2, category: "Original Application Details" },
    { id: 1408, question: "What was the date of the refusal decision?", type: 'date', required: true, step: 2, category: "Original Application Details" },
    { id: 1409, question: "What was the refusal reference number?", type: 'text', required: false, step: 2, category: "Original Application Details" },
    
    // 3. Administrative Review Grounds
    { id: 1410, question: "What are the specific caseworking errors you believe were made? (Administrative reviews can only challenge caseworking errors, not the decision itself)", type: 'textarea', required: true, step: 3, category: "Administrative Review Grounds" },
    { id: 1411, question: "Do you have evidence of the caseworking error?", type: 'radio', options: ['Yes', 'No'], required: true, step: 3, category: "Administrative Review Grounds" },
    
    // 4. Immigration History
    { id: 1413, question: "Previous UK visas?", type: 'radio', options: ['Yes', 'No'], required: true, step: 4, category: "Immigration History" },
    { id: 1414, question: "Any previous visa refusals?", type: 'radio', options: ['Yes', 'No'], required: true, step: 4, category: "Immigration History" },
    { id: 1415, question: "Any previous administrative reviews?", type: 'radio', options: ['Yes', 'No'], required: true, step: 4, category: "Immigration History" },
    { id: 1416, question: "Any overstaying or immigration breaches?", type: 'radio', options: ['Yes', 'No'], required: true, step: 4, category: "Immigration History" },
    { id: 1417, question: "Any criminal convictions?", type: 'radio', options: ['Yes', 'No'], required: true, step: 4, category: "Immigration History" },
    
    // 5. Current Status
    { id: 1418, question: "What is your current immigration status in the UK?", type: 'text', required: true, step: 5, category: "Current Status" },
    { id: 1419, question: "Are you currently in the UK?", type: 'radio', options: ['Yes', 'No'], required: true, step: 5, category: "Current Status" },
  ],
  // Immigration Bail
  'Immigration Bail': [
    // 1. Applicant Details
    { id: 1501, question: "What is your full name?", type: 'text', required: true, step: 1, category: "Applicant Details" },
    { id: 1502, question: "What is your date of birth?", type: 'date', required: true, step: 1, category: "Applicant Details" },
    { id: 1503, question: "What is your nationality?", type: 'select', options: ['Turkish', 'English', 'Arabic', 'French', 'German', 'Italian', 'Spanish', 'Portuguese', 'Russian', 'Chinese', 'Japanese', 'Korean', 'Indian', 'Pakistani', 'Bangladeshi', 'Iranian', 'Iraqi', 'Syrian', 'Lebanese', 'Jordanian', 'Egyptian', 'Moroccan', 'Algerian', 'Tunisian', 'Libyan', 'Sudanese', 'Saudi Arabian', 'Emirati', 'Kuwaiti', 'Qatari', 'Bahraini', 'Omani', 'Yemeni', 'Afghan', 'Kazakh', 'Uzbek', 'Kyrgyz', 'Tajik', 'Turkmen', 'Azerbaijani', 'Georgian', 'Armenian', 'Ukrainian', 'Belarusian', 'Polish', 'Czech', 'Slovak', 'Hungarian', 'Romanian', 'Bulgarian', 'Croatian', 'Serbian', 'Bosnian', 'Albanian', 'Macedonian', 'Slovenian', 'Estonian', 'Latvian', 'Lithuanian', 'Finnish', 'Swedish', 'Norwegian', 'Danish', 'Icelandic', 'Dutch', 'Belgian', 'Swiss', 'Austrian', 'Greek', 'Cypriot', 'Maltese', 'Irish', 'Scottish', 'Welsh', 'Canadian', 'American', 'Mexican', 'Brazilian', 'Argentinian', 'Chilean', 'Colombian', 'Peruvian', 'Venezuelan', 'Ecuadorian', 'Uruguayan', 'Paraguayan', 'Bolivian', 'Australian', 'New Zealander', 'South African', 'Nigerian', 'Kenyan', 'Ghanaian', 'Ethiopian', 'Ugandan', 'Tanzanian', 'Other'], required: true, step: 1, category: "Applicant Details" },
    { id: 1504, question: "What is your contact phone number?", type: 'text', required: true, step: 1, category: "Applicant Details" },
    { id: 1505, question: "What is your contact email address?", type: 'email', required: true, step: 1, category: "Applicant Details" },
    
    // 2. Detention Details
    { id: 1506, question: "What was the date of your detention?", type: 'date', required: true, step: 2, category: "Detention Details" },
    { id: 1507, question: "What is the detention location / immigration removal centre?", type: 'text', required: true, step: 2, category: "Detention Details" },
    { id: 1508, question: "What is your current immigration status?", type: 'text', required: true, step: 2, category: "Detention Details" },
    
    // 3. Bail Request Details
    { id: 1509, question: "What are your grounds for bail? (e.g., family, health, work or other)", type: 'textarea', required: true, step: 3, category: "Bail Request Details" },
    { id: 1510, question: "Do you have an address where you will live if granted bail?", type: 'radio', options: ['Yes', 'No'], required: true, step: 3, category: "Bail Request Details" },
    
    // 4. Immigration History
    { id: 1511, question: "Previous UK visas or refusals?", type: 'radio', options: ['Yes', 'No'], required: true, step: 4, category: "Immigration History" },
    { id: 1512, question: "Any previous immigration bail applications?", type: 'radio', options: ['Yes', 'No'], required: true, step: 4, category: "Immigration History" },
    { id: 1513, question: "Any previous overstays, breaches, or deportations?", type: 'radio', options: ['Yes', 'No'], required: true, step: 4, category: "Immigration History" },
  ],
  // Business Immigration Routes
  'Sponsor Licence': [
    // 1. Business / Organisation Details
    { id: 1601, question: "What is your organisation / company name?", type: 'text', required: true, step: 1, category: "Business / Organisation Details" },
    { id: 1602, question: "What is your business phone number?", type: 'text', required: true, step: 1, category: "Business / Organisation Details" },
    { id: 1603, question: "What is your business email address?", type: 'email', required: true, step: 1, category: "Business / Organisation Details" },
    
    // 2. Authorised Signatory
    { id: 1604, question: "What is the authorised signatory's full name?", type: 'text', required: true, step: 2, category: "Authorised Signatory" },
    { id: 1605, question: "What is the authorised signatory's position in organisation?", type: 'text', required: true, step: 2, category: "Authorised Signatory" },
    
    // 4. Employment & Recruitment
    { id: 1606, question: "Do you intend to sponsor workers under Skilled Worker route?", type: 'radio', options: ['Yes', 'No'], required: true, step: 4, category: "Employment & Recruitment" },
    { id: 1607, question: "Do you intend to sponsor workers under other UK visa routes?", type: 'radio', options: ['Yes', 'No'], required: true, step: 4, category: "Employment & Recruitment" },
    { id: 1608, question: "Do you have HR and recruitment processes in place?", type: 'radio', options: ['Yes', 'No'], required: true, step: 4, category: "Employment & Recruitment" },
    
    // 5. Financial & Business Evidence
    { id: 1609, question: "Do you have proof of business trading?", type: 'radio', options: ['Yes', 'No'], required: true, step: 5, category: "Financial & Business Evidence" },
    { id: 1610, question: "Do you have enough funds to operate as a sponsor?", type: 'radio', options: ['Yes', 'No'], required: true, step: 5, category: "Financial & Business Evidence" },
    { id: 1611, question: "Any previous issues with UK immigration or sponsor licences?", type: 'radio', options: ['Yes', 'No'], required: true, step: 5, category: "Financial & Business Evidence" },
    
    // 6. Additional Information
    { id: 1612, question: "Any previous applications for a sponsor licence?", type: 'radio', options: ['Yes', 'No'], required: true, step: 6, category: "Additional Information" },
  ],
  'Civil Penalty Fine': [
    // 1. Employer / Business Details
    { id: 1701, question: "What is your organisation / company name?", type: 'text', required: true, step: 1, category: "Employer / Business Details" },
    { id: 1702, question: "What is your business phone number?", type: 'text', required: true, step: 1, category: "Employer / Business Details" },
    { id: 1703, question: "What is your business email address?", type: 'email', required: true, step: 1, category: "Employer / Business Details" },
    { id: 1704, question: "What is your business type? (e.g., limited company, partnership, charity)", type: 'text', required: true, step: 1, category: "Employer / Business Details" },
    
    // 2. Contact Person
    { id: 1705, question: "What is the contact person's full name?", type: 'text', required: true, step: 2, category: "Contact Person" },
    { id: 1706, question: "What is the contact person's position / job title?", type: 'text', required: true, step: 2, category: "Contact Person" },
    { id: 1707, question: "What is the contact person's phone number?", type: 'text', required: true, step: 2, category: "Contact Person" },
    { id: 1708, question: "What is the contact person's email address?", type: 'email', required: true, step: 2, category: "Contact Person" },
    
    // 3. Penalty Details
    { id: 1709, question: "What was the date of alleged offence?", type: 'date', required: true, step: 3, category: "Penalty Details" },
    { id: 1710, question: "How many employees were involved?", type: 'text', required: true, step: 3, category: "Penalty Details" },
    { id: 1711, question: "What is the type of penalty? (e.g., employing someone illegally, immigration compliance breach)", type: 'textarea', required: true, step: 3, category: "Penalty Details" },
    
    // 4. Employee / Worker Details
    { id: 1712, question: "What is the worker's full name?", type: 'text', required: true, step: 4, category: "Employee / Worker Details" },
    { id: 1713, question: "What is the worker's date of birth?", type: 'date', required: true, step: 4, category: "Employee / Worker Details" },
    { id: 1714, question: "What is the worker's nationality?", type: 'select', options: ['Turkish', 'English', 'Arabic', 'French', 'German', 'Italian', 'Spanish', 'Portuguese', 'Russian', 'Chinese', 'Japanese', 'Korean', 'Indian', 'Pakistani', 'Bangladeshi', 'Iranian', 'Iraqi', 'Syrian', 'Lebanese', 'Jordanian', 'Egyptian', 'Moroccan', 'Algerian', 'Tunisian', 'Libyan', 'Sudanese', 'Saudi Arabian', 'Emirati', 'Kuwaiti', 'Qatari', 'Bahraini', 'Omani', 'Yemeni', 'Afghan', 'Kazakh', 'Uzbek', 'Kyrgyz', 'Tajik', 'Turkmen', 'Azerbaijani', 'Georgian', 'Armenian', 'Ukrainian', 'Belarusian', 'Polish', 'Czech', 'Slovak', 'Hungarian', 'Romanian', 'Bulgarian', 'Croatian', 'Serbian', 'Bosnian', 'Albanian', 'Macedonian', 'Slovenian', 'Estonian', 'Latvian', 'Lithuanian', 'Finnish', 'Swedish', 'Norwegian', 'Danish', 'Icelandic', 'Dutch', 'Belgian', 'Swiss', 'Austrian', 'Greek', 'Cypriot', 'Maltese', 'Irish', 'Scottish', 'Welsh', 'Canadian', 'American', 'Mexican', 'Brazilian', 'Argentinian', 'Chilean', 'Colombian', 'Peruvian', 'Venezuelan', 'Ecuadorian', 'Uruguayan', 'Paraguayan', 'Bolivian', 'Australian', 'New Zealander', 'South African', 'Nigerian', 'Kenyan', 'Ghanaian', 'Ethiopian', 'Ugandan', 'Tanzanian', 'Other'], required: true, step: 4, category: "Employee / Worker Details" },
    { id: 1715, question: "What is the worker's immigration status / visa type?", type: 'text', required: true, step: 4, category: "Employee / Worker Details" },
    { id: 1716, question: "What was the worker's employment start date?", type: 'date', required: true, step: 4, category: "Employee / Worker Details" },
    
    // 5. Business Practices & Compliance
    { id: 1717, question: "Do you have right-to-work checks in place?", type: 'radio', options: ['Yes', 'No'], required: true, step: 5, category: "Business Practices & Compliance" },
    { id: 1718, question: "Do you have HR / recruitment procedures to ensure compliance?", type: 'radio', options: ['Yes', 'No'], required: true, step: 5, category: "Business Practices & Compliance" },
    { id: 1719, question: "Have you taken any steps to correct the issue?", type: 'radio', options: ['Yes', 'No'], required: true, step: 5, category: "Business Practices & Compliance" },
    
    // 6. Dispute / Representation
    { id: 1720, question: "Are you disputing the penalty?", type: 'radio', options: ['Yes', 'No'], required: true, step: 6, category: "Dispute / Representation" },
    { id: 1721, question: "Any additional evidence or information to support your case?", type: 'radio', options: ['Yes', 'No'], required: true, step: 6, category: "Dispute / Representation" },
  ],
  // Diğer tüm visa tipleri EligibilityTestForm.tsx içindekiyle birebir aynı şekilde buraya taşındı
  // (Student Visa, Skilled Worker Visa, Spouse Visa, Parent Visa, Indefinite Leave to Remain,
  //  Other)
}


