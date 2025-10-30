'use client'

import React from 'react'
import { FAQBlockClient } from '@/blocks/FAQBlock/Component.client'

const faqs = [
  {
    id: 'faq-1',
    question: 'How much does it cost to hire an immigration lawyer?',
    answer:
      'Fees vary by case complexity and service level. We provide a transparent quote after a quick assessment and offer fixed-fee options for most routes.'
  },
  {
    id: 'faq-2',
    question: 'What does a UK immigration lawyer do?',
    answer:
      'We assess eligibility, prepare your application and evidence, manage Home Office correspondence, and guide you through timelines and risks.'
  },
  {
    id: 'faq-3',
    question: 'How quickly can you prepare my application?',
    answer:
      'Simple applications can be prepared within days once documents are received. Priority services may be available for urgent cases.'
  },
  {
    id: 'faq-4',
    question: 'Do you offer a free initial consultation?',
    answer:
      'Yes. A brief assessment helps us understand your situation and outline next steps, timelines, and fees before you decide.'
  },
  {
    id: 'faq-5',
    question: 'Which visa categories do you cover?',
    answer:
      'Visitor, Student, Skilled Worker, Family (Spouse/Partner/Parent), Settlement (ILR), Citizenship, Appeals and more.'
  },
  {
    id: 'faq-6',
    question: 'Can you help if my application was refused?',
    answer:
      'We review the refusal letter, identify issues, and advise on administrative review, appeal, or a fresh application with stronger evidence.'
  },
  {
    id: 'faq-7',
    question: 'What documents are usually required?',
    answer:
      'Identity documents, financial evidence, relationship/employment proof, and any category-specific documents. We provide a tailored checklist.'
  },
  {
    id: 'faq-8',
    question: 'Can you work with clients outside the UK?',
    answer:
      'Yes. We support clients worldwide via video calls, secure document portals, and email/phone communication.'
  },
  {
    id: 'faq-9',
    question: 'How long do visa decisions usually take?',
    answer:
      'Timelines vary by route and country. Standard decisions can take weeks; priority/super priority may be faster where available.'
  },
  {
    id: 'faq-10',
    question: 'Do you handle urgent or time‑sensitive cases?',
    answer:
      'Yes, subject to capacity. We triage urgent matters, advise on feasible timelines, and use priority services where possible.'
  },
  {
    id: 'faq-11',
    question: 'Can you review my self-prepared application?',
    answer:
      'We offer document and application reviews, flagging risks and gaps before submission to improve your chances.'
  },
  {
    id: 'faq-12',
    question: 'How do you keep my data secure?',
    answer:
      'We use secure systems, limit access to authorised staff, and follow UK GDPR requirements for data protection.'
  }
]

export const HomeFAQ: React.FC = () => {
  return (
    <section className="pt-8 md:pt-10">
      <div className="container mx-auto px-4 sm:px-4 md:px-6 lg:px-8 max-w-5xl">
        <div className="text-center">
          <h2 className="text-blue-900 mb-3 text-4xl md:text-5xl font-extrabold leading-tight">
            Frequently Asked Questions
          </h2>
          <div className="h-1 w-28 bg-[#17174B] rounded-full opacity-80 mx-auto"></div>
        </div>

        <FAQBlockClient
          title={null}
          description={null}
          faqs={faqs}
          displayStyle="accordion"
        />
      </div>
    </section>
  )
}
