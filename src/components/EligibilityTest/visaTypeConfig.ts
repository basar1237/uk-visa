export const VISA_APPLICATION_OPTIONS = [
  'Spouse Visa',
  'Fiancé Visa',
  'Visitors Visa',
  'Student Visa',
  'UK Ancestors Visa',
  'Skilled Worker Visa',
] as const

export const LEAVE_TO_REMAIN_OPTIONS = [
  'Fee Waiver',
  'Spouse Route',
  'Parent Route',
  'Family & Private Life (10 Year Route)',
  'Skilled Worker Route',
  'Graduate Visa',
] as const

// British citizenship alt seçenekleri
export const BRITISH_CITIZENSHIP_OPTIONS = [
  'Naturalisation',
  'Children Registration',
] as const

// Refused Appeals alt seçenekleri
export const REFUSED_APPEALS_OPTIONS = [
  'First-tier Tribunal Appeals',
  'Upper Tribunal Appeals',
  'Administrative Reviews',
] as const

// Business Immigration alt seçenekleri
export const BUSINESS_IMMIGRATION_OPTIONS = [
  'Sponsor Licence',
  'Civil Penalty Fine',
] as const

// Indefinite Leave to Remain alt seçenekleri
export const ILR_OPTIONS = [
  'Parent Route',
  'Family & Private Life ILR',
  'Spouse Route',
  'Ancestors Route',
  'Skilled Worker Visa',
  'Domestic Violence',
] as const

export const MAIN_VISA_CATEGORIES = [
  { type: 'Visa Applications' },
  { type: 'Leave to Remain' },
  { type: 'Indefinite leave to remain' },
  { type: 'British citizenship' },
  { type: 'Asylum & Human rights' },
  { type: 'Refused Appeals' },
  { type: 'Business Immigration' },
  { type: 'Immigration Bail' },
] as const

export const VISA_TYPE_MAPPING: Record<string, string> = {
  // Main groups
  'Visitor Visa Applications': 'Visitor Visa',
  'Leave to Remain': 'Leave to Remain',
  'Indefinite leave to remain': 'Indefinite Leave to Remain',
  'British citizenship': 'British Citizenship',
  'Asylum & Human rights': 'Asylum & Human rights',
  'Refused Appeals & Business Immigration': 'Business Immigration',

  // Sub-types under Visa Applications menu
  'Spouse Visa': 'Spouse Visa',
  'Fiancé Visa': 'Fiancé Visa',
  'Visitors Visa': 'Visitors Visa',
  'Student Visa': 'Student Visa',
  'UK Ancestors Visa': 'UK Ancestors Visa',
  'Skilled Worker Visa': 'Skilled Worker Visa',

  // Sub-types under Leave to Remain menu
  'Fee Waiver': 'Fee Waiver',
  'Spouse Route': 'Spouse Route',
  'Parent Route': 'Parent Route',
  'Family & Private Life (10 Year Route)': 'Family & Private Life (10 Year Route)',
  'Skilled Worker Route': 'Skilled Worker Route',
  'Graduate Visa': 'Graduate Visa',

  // Sub-types under Indefinite Leave to Remain menu
  'Family & Private Life ILR': 'Indefinite Leave to Remain',
  'Ancestors Route': 'Indefinite Leave to Remain',
  'Domestic Violence': 'Leave to Remain',

  // Sub-types under British citizenship menu
  'Naturalisation': 'Naturalisation',
  'Children Registration': 'Children Registration',

  // Sub-types under Refused Appeals menu
  'First-tier Tribunal Appeals': 'First-tier Tribunal Appeals',
  'Upper Tribunal Appeals': 'Upper Tribunal Appeals',
  'Administrative Reviews': 'Administrative Reviews',

  // Sub-types under Business Immigration menu
  'Sponsor Licence': 'Sponsor Licence',
  'Civil Penalty Fine': 'Civil Penalty Fine',
  
  // Immigration Bail
  'Immigration Bail': 'Immigration Bail',
}


