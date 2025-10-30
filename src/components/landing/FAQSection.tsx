'use client'

import React, { useState } from 'react'

interface FAQItem {
  question: string
  answer: string
}

const DEFAULT_FAQS: FAQItem[] = [
  {
    question: 'How much does it cost to hire an immigration lawyer?',
    answer:
      'Fees depend on the complexity of your case and the service level. We provide a transparent quote after a quick assessment, and fixed-fee options are available for most routes.'
  },
  {
    question: 'What does a UK immigration lawyer do?',
    answer:
      'We assess eligibility, prepare your application and evidence, manage communications with the Home Office, and guide you through timelines, risks and next steps.'
  },
  {
    question: 'How do I find a good immigration lawyer?',
    answer:
      'Check accreditations, reviews, case experience and response times. Book a short consultation to understand their approach before proceeding.'
  },
  {
    question: 'Why should I hire an immigration lawyer?',
    answer:
      'A specialist improves application quality, reduces avoidable refusals and delays, and can significantly increase the chance of a successful outcome.'
  },
  {
    question: "How quickly can you prepare my application?",
    answer:
      'Simple applications can be prepared within days once documents are received. Urgent priority services are available subject to capacity.'
  },
]

export const FAQSection: React.FC<{ faqs?: FAQItem[] } > = ({ faqs = DEFAULT_FAQS }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section className="py-12 md:py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-4 md:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8 md:mb-12">
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-[#17174B]">Frequently Asked<br/>Questions</h2>
            <div className="h-1 mt-3 w-28 bg-[#17174B] rounded-full opacity-70"></div>
          </div>

          <div className="divide-y divide-gray-200 rounded-2xl border border-gray-100 bg-white shadow-sm">
            {faqs.map((item, index) => {
              const isOpen = openIndex === index
              return (
                <button
                  key={index}
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full text-left px-5 md:px-6 py-4 md:py-5 focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-base md:text-lg font-semibold text-gray-900">{item.question}</span>
                    <span
                      className={`shrink-0 h-6 w-6 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 transition-transform ${
                        isOpen ? 'rotate-45' : ''
                      }`}
                      aria-hidden
                    >
                      +
                    </span>
                  </div>
                  {isOpen && (
                    <p className="mt-3 text-sm md:text-base text-gray-600 leading-relaxed">
                      {item.answer}
                    </p>
                  )}
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}


