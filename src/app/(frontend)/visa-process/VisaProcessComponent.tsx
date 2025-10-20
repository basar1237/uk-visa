'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { 
  CheckCircle, 
  Clock, 
  FileText, 
  CreditCard, 
  Camera, 
  Plane, 
  Users,
  Upload,
  AlertCircle,
  ArrowRight,
  ArrowLeft,
  Award,
  Phone,
  Mail,
  MapPin,
  ChevronDown,
  ChevronUp,
  BookOpen,
  Target,
  Zap
} from 'lucide-react'

interface ProcessStep {
  id: number
  title: string
  description: string
  duration: string
  icon: React.ComponentType<{ className?: string }>
  details: string[]
  requirements: string[]
  tips: string[]
  documents: string[]
  cost?: string
  status: 'completed' | 'current' | 'upcoming'
}

interface VisaType {
  id: string
  name: string
  description: string
  duration: string
  requirements: string[]
  icon: React.ComponentType<{ className?: string }>
}

const visaTypes: VisaType[] = [
  {
    id: 'student',
    name: 'Student Visa',
    description: 'For international students studying in the UK',
    duration: '3-8 weeks',
    requirements: ['University acceptance letter', 'Financial proof', 'English proficiency'],
    icon: BookOpen
  },
  {
    id: 'work',
    name: 'Work Visa',
    description: 'For skilled workers with job offers',
    duration: '3-8 weeks',
    requirements: ['Job offer', 'Sponsor certificate', 'Skill assessment'],
    icon: Users
  },
  {
    id: 'family',
    name: 'Family Visa',
    description: 'For family members of UK residents',
    duration: '12-24 weeks',
    requirements: ['Family relationship proof', 'Financial support', 'Accommodation proof'],
    icon: Users
  },
  {
    id: 'tourist',
    name: 'Tourist Visa',
    description: 'For short-term visits and tourism',
    duration: '3-8 weeks',
    requirements: ['Travel itinerary', 'Financial proof', 'Return ticket'],
    icon: Plane
  }
]

const processSteps: ProcessStep[] = [
  {
    id: 1,
    title: 'Determine Visa Type',
    description: 'Identify the correct visa category for your purpose',
    duration: '1-2 days',
    icon: Target,
    details: [
      'Assess your purpose of visit',
      'Check eligibility requirements',
      'Review visa categories',
      'Consider duration of stay'
    ],
    requirements: [
      'Clear purpose of visit',
      'Valid passport',
      'Basic personal information'
    ],
    tips: [
      'Use our eligibility checker tool',
      'Consult with immigration experts',
      'Review all visa categories carefully'
    ],
    documents: [
      'Passport (valid for 6+ months)',
      'Purpose of visit documentation',
      'Personal information form'
    ],
    status: 'upcoming'
  },
  {
    id: 2,
    title: 'Gather Required Documents',
    description: 'Collect all necessary documents and evidence',
    duration: '2-4 weeks',
    icon: FileText,
    details: [
      'Financial documents',
      'Educational certificates',
      'Employment records',
      'Accommodation proof'
    ],
    requirements: [
      'All original documents',
      'English translations if needed',
      'Document authentication',
      'Recent photographs'
    ],
    tips: [
      'Start collecting documents early',
      'Keep digital copies',
      'Ensure all documents are current',
      'Get professional translations'
    ],
    documents: [
      'Bank statements (6 months)',
      'Educational certificates',
      'Employment letter',
      'Accommodation proof',
      'Passport photos'
    ],
    status: 'upcoming'
  },
  {
    id: 3,
    title: 'Complete Online Application',
    description: 'Fill out the visa application form online',
    duration: '1-3 days',
    icon: Upload,
    details: [
      'Create UKVI account',
      'Fill application form',
      'Upload documents',
      'Review and submit'
    ],
    requirements: [
      'Valid email address',
      'All required documents',
      'Payment method',
      'Accurate information'
    ],
    tips: [
      'Double-check all information',
      'Save progress regularly',
      'Use clear document scans',
      'Follow file size limits'
    ],
    documents: [
      'Completed application form',
      'Uploaded document scans',
      'Payment confirmation',
      'Appointment booking'
    ],
    status: 'upcoming'
  },
  {
    id: 4,
    title: 'Pay Application Fee',
    description: 'Complete the visa application payment',
    duration: 'Same day',
    icon: CreditCard,
    details: [
      'Calculate total fees',
      'Choose payment method',
      'Complete payment',
      'Receive confirmation'
    ],
    requirements: [
      'Valid payment method',
      'Sufficient funds',
      'Payment confirmation',
      'Receipt for records'
    ],
    tips: [
      'Check current fee rates',
      'Keep payment receipts',
      'Use secure payment methods',
      'Note transaction reference'
    ],
    documents: [
      'Payment confirmation',
      'Receipt copy',
      'Transaction reference',
      'Fee breakdown'
    ],
    cost: 'Varies by visa type',
    status: 'upcoming'
  },
  {
    id: 5,
    title: 'Book Biometric Appointment',
    description: 'Schedule and attend biometric data collection',
    duration: '1-2 weeks',
    icon: Camera,
    details: [
      'Find nearest VAC',
      'Book appointment slot',
      'Attend appointment',
      'Submit biometrics'
    ],
    requirements: [
      'Valid appointment booking',
      'Original passport',
      'Application reference',
      'Biometric fee payment'
    ],
    tips: [
      'Book early for preferred dates',
      'Arrive 15 minutes early',
      'Bring all required documents',
      'Dress appropriately'
    ],
    documents: [
      'Appointment confirmation',
      'Original passport',
      'Application reference',
      'Biometric fee receipt'
    ],
    status: 'upcoming'
  },
  {
    id: 6,
    title: 'Submit Documents',
    description: 'Submit all required documents to VAC',
    duration: 'Same day',
    icon: Upload,
    details: [
      'Organize documents',
      'Submit at VAC',
      'Receive receipt',
      'Track application'
    ],
    requirements: [
      'All original documents',
      'Document checklist',
      'VAC appointment',
      'Submission receipt'
    ],
    tips: [
      'Follow document order',
      'Keep submission receipt',
      'Note tracking number',
      'Take photos of documents'
    ],
    documents: [
      'Original passport',
      'All supporting documents',
      'Application form',
      'Submission receipt'
    ],
    status: 'upcoming'
  },
  {
    id: 7,
    title: 'Application Processing',
    description: 'UKVI processes your application',
    duration: '3-24 weeks',
    icon: Clock,
    details: [
      'Application review',
      'Background checks',
      'Document verification',
      'Decision making'
    ],
    requirements: [
      'Complete application',
      'All required documents',
      'Valid payment',
      'Biometric data'
    ],
    tips: [
      'Be patient during processing',
      'Check status regularly',
      'Respond to requests quickly',
      'Avoid unnecessary inquiries'
    ],
    documents: [
      'Processing confirmation',
      'Status updates',
      'Any additional requests',
      'Decision notification'
    ],
    status: 'upcoming'
  },
  {
    id: 8,
    title: 'Receive Decision',
    description: 'Get your visa decision and passport',
    duration: '1-3 days',
    icon: Award,
    details: [
      'Decision notification',
      'Passport collection',
      'Visa sticker check',
      'Travel preparation'
    ],
    requirements: [
      'Valid identification',
      'Collection appointment',
      'Decision letter',
      'Passport receipt'
    ],
    tips: [
      'Check visa details carefully',
      'Note entry conditions',
      'Plan travel accordingly',
      'Keep decision letter safe'
    ],
    documents: [
      'Passport with visa',
      'Decision letter',
      'Entry clearance',
      'Travel documents'
    ],
    status: 'upcoming'
  }
]

export const VisaProcessComponent: React.FC = () => {
  const [selectedVisaType, setSelectedVisaType] = useState<string>('student')
  const [currentStep, setCurrentStep] = useState<number>(1)
  const [expandedStep, setExpandedStep] = useState<number | null>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const handleStepClick = (stepId: number) => {
    setCurrentStep(stepId)
    setExpandedStep(expandedStep === stepId ? null : stepId)
  }

  const getStepStatus = (stepId: number): 'completed' | 'current' | 'upcoming' => {
    if (stepId < currentStep) return 'completed'
    if (stepId === currentStep) return 'current'
    return 'upcoming'
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-500'
      case 'current': return 'bg-blue-500'
      case 'upcoming': return 'bg-gray-300'
      default: return 'bg-gray-300'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="w-6 h-6 text-white" />
      case 'current': return <Clock className="w-6 h-6 text-white" />
      case 'upcoming': return <Clock className="w-6 h-6 text-gray-600" />
      default: return <Clock className="w-6 h-6 text-gray-600" />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 py-32 overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-20 h-20 bg-blue-500/20 rounded-full animate-pulse"></div>
          <div className="absolute top-32 right-20 w-16 h-16 bg-indigo-500/20 rounded-full animate-pulse delay-1000"></div>
          <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-purple-500/20 rounded-full animate-pulse delay-2000"></div>
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className={`transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
                UK Visa Application
                <span className="block bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                  Step by Step Process
                </span>
              </h1>
              <p className="text-xl text-blue-100 mb-8 leading-relaxed">
                Complete guide to UK visa application process. Follow our interactive steps to understand the entire journey from start to finish.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button 
                  onClick={() => setCurrentStep(1)}
                  className="px-8 py-4 bg-white text-blue-900 font-semibold rounded-lg hover:bg-blue-50 transition-colors duration-300 shadow-lg"
                >
                  Start Process Guide
                </button>
                <Link
                  href="/eligibility-check"
                  className="px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-blue-900 transition-colors duration-300"
                >
                  Check Eligibility
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Visa Types Selection */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Choose Your Visa Type
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Select your visa category to see the specific process and requirements.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {visaTypes.map((visa) => (
              <div
                key={visa.id}
                onClick={() => setSelectedVisaType(visa.id)}
                className={`group cursor-pointer p-6 rounded-2xl border-2 transition-all duration-300 transform hover:-translate-y-2 ${
                  selectedVisaType === visa.id
                    ? 'border-blue-500 bg-blue-50 shadow-lg'
                    : 'border-gray-200 bg-white hover:border-blue-300 hover:shadow-md'
                }`}
              >
                <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${
                  selectedVisaType === visa.id ? 'bg-blue-600' : 'bg-gray-100 group-hover:bg-blue-100'
                }`}>
                  <visa.icon className={`w-8 h-8 ${
                    selectedVisaType === visa.id ? 'text-white' : 'text-gray-600 group-hover:text-blue-600'
                  }`} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2 text-center">{visa.name}</h3>
                <p className="text-gray-600 text-sm mb-4 text-center">{visa.description}</p>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Duration:</span>
                    <span className="font-semibold text-gray-900">{visa.duration}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Timeline */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Application Process Timeline
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Follow these 8 steps to complete your UK visa application successfully.
            </p>
          </div>

          {/* Timeline */}
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-300"></div>

              {processSteps.map((step, index) => {
                const status = getStepStatus(step.id)
                const isExpanded = expandedStep === step.id
                
                return (
                  <div key={step.id} className="relative mb-12">
                    {/* Timeline Node */}
                    <div className={`absolute left-6 w-4 h-4 rounded-full border-4 border-white shadow-lg ${getStatusColor(status)}`}>
                      {getStatusIcon(status)}
                    </div>

                    {/* Step Content */}
                    <div className="ml-20">
                      <div
                        onClick={() => handleStepClick(step.id)}
                        className={`group cursor-pointer p-6 rounded-2xl transition-all duration-300 ${
                          status === 'current'
                            ? 'bg-blue-600 text-white shadow-xl'
                            : status === 'completed'
                            ? 'bg-green-50 border-2 border-green-200 hover:shadow-lg'
                            : 'bg-white border-2 border-gray-200 hover:border-blue-300 hover:shadow-lg'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center">
                            <div className={`w-12 h-12 rounded-full flex items-center justify-center mr-4 ${
                              status === 'current'
                                ? 'bg-white/20'
                                : status === 'completed'
                                ? 'bg-green-100'
                                : 'bg-gray-100 group-hover:bg-blue-100'
                            }`}>
                              <step.icon className={`w-6 h-6 ${
                                status === 'current'
                                  ? 'text-white'
                                  : status === 'completed'
                                  ? 'text-green-600'
                                  : 'text-gray-600 group-hover:text-blue-600'
                              }`} />
                            </div>
                            <div>
                              <h3 className={`text-xl font-bold ${
                                status === 'current' ? 'text-white' : 'text-gray-900'
                              }`}>
                                Step {step.id}: {step.title}
                              </h3>
                              <p className={`text-sm ${
                                status === 'current' ? 'text-blue-100' : 'text-gray-600'
                              }`}>
                                Duration: {step.duration}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center">
                            {step.cost && (
                              <span className={`px-3 py-1 rounded-full text-sm font-semibold mr-3 ${
                                status === 'current'
                                  ? 'bg-white/20 text-white'
                                  : 'bg-green-100 text-green-800'
                              }`}>
                                {step.cost}
                              </span>
                            )}
                            {isExpanded ? (
                              <ChevronUp className="w-5 h-5 text-gray-500" />
                            ) : (
                              <ChevronDown className="w-5 h-5 text-gray-500" />
                            )}
                          </div>
                        </div>

                        <p className={`mb-4 ${
                          status === 'current' ? 'text-blue-100' : 'text-gray-600'
                        }`}>
                          {step.description}
                        </p>

                        {/* Expanded Content */}
                        {isExpanded && (
                          <div className="mt-6 space-y-6">
                            {/* Details */}
                            <div>
                              <h4 className={`font-semibold mb-3 ${
                                status === 'current' ? 'text-white' : 'text-gray-900'
                              }`}>
                                Process Details
                              </h4>
                              <ul className="space-y-2">
                                {step.details.map((detail, idx) => (
                                  <li key={idx} className={`flex items-start ${
                                    status === 'current' ? 'text-blue-100' : 'text-gray-600'
                                  }`}>
                                    <CheckCircle className="w-4 h-4 mt-0.5 mr-2 flex-shrink-0" />
                                    <span className="text-sm">{detail}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>

                            {/* Requirements */}
                            <div>
                              <h4 className={`font-semibold mb-3 ${
                                status === 'current' ? 'text-white' : 'text-gray-900'
                              }`}>
                                Requirements
                              </h4>
                              <ul className="space-y-2">
                                {step.requirements.map((req, idx) => (
                                  <li key={idx} className={`flex items-start ${
                                    status === 'current' ? 'text-blue-100' : 'text-gray-600'
                                  }`}>
                                    <AlertCircle className="w-4 h-4 mt-0.5 mr-2 flex-shrink-0" />
                                    <span className="text-sm">{req}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>

                            {/* Tips */}
                            <div>
                              <h4 className={`font-semibold mb-3 ${
                                status === 'current' ? 'text-white' : 'text-gray-900'
                              }`}>
                                Pro Tips
                              </h4>
                              <ul className="space-y-2">
                                {step.tips.map((tip, idx) => (
                                  <li key={idx} className={`flex items-start ${
                                    status === 'current' ? 'text-blue-100' : 'text-gray-600'
                                  }`}>
                                    <Zap className="w-4 h-4 mt-0.5 mr-2 flex-shrink-0" />
                                    <span className="text-sm">{tip}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>

                            {/* Documents */}
                            <div>
                              <h4 className={`font-semibold mb-3 ${
                                status === 'current' ? 'text-white' : 'text-gray-900'
                              }`}>
                                Required Documents
                              </h4>
                              <ul className="space-y-2">
                                {step.documents.map((doc, idx) => (
                                  <li key={idx} className={`flex items-start ${
                                    status === 'current' ? 'text-blue-100' : 'text-gray-600'
                                  }`}>
                                    <FileText className="w-4 h-4 mt-0.5 mr-2 flex-shrink-0" />
                                    <span className="text-sm">{doc}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Progress Summary */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">Your Progress Summary</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="text-center">
                  <div className="text-3xl font-bold mb-2">{currentStep}</div>
                  <div className="text-blue-100">Current Step</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold mb-2">{processSteps.length}</div>
                  <div className="text-blue-100">Total Steps</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold mb-2">
                    {Math.round((currentStep / processSteps.length) * 100)}%
                  </div>
                  <div className="text-blue-100">Complete</div>
                </div>
              </div>
              <div className="w-full bg-white/20 rounded-full h-2 mb-4">
                <div 
                  className="bg-white h-2 rounded-full transition-all duration-500"
                  style={{ width: `${(currentStep / processSteps.length) * 100}%` }}
                ></div>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
                  disabled={currentStep === 1}
                  className="px-6 py-3 bg-white/20 text-white font-semibold rounded-lg hover:bg-white/30 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ArrowLeft className="w-4 h-4 mr-2 inline" />
                  Previous Step
                </button>
                <button
                  onClick={() => setCurrentStep(Math.min(processSteps.length, currentStep + 1))}
                  disabled={currentStep === processSteps.length}
                  className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next Step
                  <ArrowRight className="w-4 h-4 ml-2 inline" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Help Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Need Help with Your Application?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our expert team is here to guide you through every step of the process.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Phone className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Expert Consultation</h3>
              <p className="text-gray-600 mb-6">Get personalized advice from qualified immigration solicitors.</p>
              <Link
                href="/contact"
                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-300"
              >
                Book Consultation
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </div>

            <div className="text-center p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Eligibility Check</h3>
              <p className="text-gray-600 mb-6">Take our free assessment to check your visa eligibility.</p>
              <Link
                href="/eligibility-check"
                className="inline-flex items-center px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors duration-300"
              >
                Check Eligibility
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </div>

            <div className="text-center p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <FileText className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Document Review</h3>
              <p className="text-gray-600 mb-6">Let us review your documents before submission.</p>
              <Link
                href="/contact"
                className="inline-flex items-center px-6 py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition-colors duration-300"
              >
                Get Review
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Info */}
      <section className="py-12 bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="flex flex-col items-center">
              <Phone className="w-8 h-8 text-blue-400 mb-3" />
              <h3 className="text-white font-semibold mb-2">Call Us</h3>
              <p className="text-gray-400">+44 20 7123 4567</p>
            </div>
            <div className="flex flex-col items-center">
              <Mail className="w-8 h-8 text-blue-400 mb-3" />
              <h3 className="text-white font-semibold mb-2">Email Us</h3>
              <p className="text-gray-400">info@ukvisa.com</p>
            </div>
            <div className="flex flex-col items-center">
              <MapPin className="w-8 h-8 text-blue-400 mb-3" />
              <h3 className="text-white font-semibold mb-2">Visit Us</h3>
              <p className="text-gray-400">London, UK</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
