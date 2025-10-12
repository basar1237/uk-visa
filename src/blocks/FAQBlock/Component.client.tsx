'use client'

import React, { useState } from 'react'
import { ChevronDown } from 'lucide-react'

type FAQ = {
  id: string
  question: string
  answer: string
}

type Props = {
  title?: string | null
  description?: string | null
  faqs: FAQ[]
  displayStyle: 'accordion' | 'list' | 'grid'
}

export const FAQBlockClient: React.FC<Props> = ({
  title,
  description,
  faqs,
  displayStyle,
}) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  if (displayStyle === 'accordion') {
    return (
      <section className="py-5 bg-white container">
        <div className="container mx-auto px-4">
          {title && (
            <h2 className="text-3xl md:text-4xl font-bold text-start mb-4 text-gray-900">
              {title}
            </h2>
          )}
          {description && (
            <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
              {description}
            </p>
          )}
          <div className="container mx-auto space-y-4 border-gray-500 p-5 shadow rounded-2xl">
            {faqs.map((faq, index) => (
              <div
                key={faq.id}
                className="border border-gray-200 rounded-3xl overflow-hidden"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-6 py-4 text-left bg-white hover:bg-indigo-200 transition-colors flex justify-between items-center gap-4  rounded-t-3xl"
                >
                  <span className="font-semibold text-gray-900 text-lg">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-gray-500 flex-shrink-0 transition-transform ${
                      openIndex === index ? 'transform rotate-180' : ''
                    }`}
                  />
                </button>
                {openIndex === index && (
                  <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                    <div className="prose max-w-none text-gray-700">
                      <p className="whitespace-pre-wrap">{faq.answer}</p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  if (displayStyle === 'grid') {
    return (
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          {title && (
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-gray-900">
              {title}
            </h2>
          )}
          {description && (
            <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
              {description}
            </p>
          )}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {faqs.map((faq) => (
              <div
                key={faq.id}
                className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
              >
                <h3 className="font-semibold text-lg mb-3 text-gray-900">
                  {faq.question}
                </h3>
                <div className="prose prose-sm max-w-none text-gray-600">
                  <p className="whitespace-pre-wrap">{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  // List style
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        {title && (
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-gray-900">
            {title}
          </h2>
        )}
        {description && (
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            {description}
          </p>
        )}
        <div className="max-w-4xl mx-auto space-y-8">
          {faqs.map((faq) => (
            <div key={faq.id} className="border-b border-gray-200 pb-8 last:border-b-0">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                  Q
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-xl mb-3 text-gray-900">
                    {faq.question}
                  </h3>
                  <div className="prose max-w-none text-gray-600">
                    <p className="whitespace-pre-wrap">{faq.answer}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

