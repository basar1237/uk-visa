'use client'

import React, { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { usePathname } from 'next/navigation'

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
  const [openIndex, setOpenIndex] = useState<number | null>(0)
  const pathname = usePathname()
  const effectiveStyle: Props['displayStyle'] = pathname === '/' ? 'accordion' : displayStyle

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  if (effectiveStyle === 'accordion') {
    return (
      <section className='pb-40'>
        <div className="mx-auto max-w-4xl md:px-6">
          <div className="text-center mb-16">
            {title && (
              <h2 className="text-foreground mb-4 text-3xl font-bold lg:text-4xl">
                {title}
              </h2>
            )}
            {description && (
              <p className="text-foreground/70 text-lg max-w-2xl mx-auto">
                {description}
              </p>
            )}
          </div>

          <div className="space-y-3 md:space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={faq.id}
                className="group overflow-hidden rounded-2xl border border-border bg-background hover:border-brand hover:shadow-lg"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="flex w-full items-center justify-between p-4 md:p-6 text-left hover:bg-background/50"
                >
                  <h3 className="text-foreground text-lg font-semibold pr-4">
                    {faq.question}
                  </h3>
                  <div
                    className={`flex-shrink-0 ${openIndex === index ? 'rotate-180' : ''}`}
                  >
                    <ChevronDown className="h-5 w-5 text-foreground/60" />
                  </div>
                </button>

                  {openIndex === index && (
                    <div
                      className="overflow-hidden"
                    >
                      <div
                        className="px-4 md:px-6 pb-4 md:pb-6"
                      >
                        <p className="text-foreground/70 leading-relaxed whitespace-pre-wrap">
                          {faq.answer}
                        </p>
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

  if (effectiveStyle === 'grid') {
    return (
      <section className="">
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <div className="text-center mb-16">
            {title && (
              <h2 className="text-foreground mb-4 text-3xl font-bold lg:text-4xl">
                {title}
              </h2>
            )}
            {description && (
              <p className="text-foreground/70 text-lg max-w-2xl mx-auto">
                {description}
              </p>
            )}
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {faqs.map((faq, index) => (
              <div
                key={faq.id}
                className="group overflow-hidden rounded-2xl border border-border bg-background hover:border-brand hover:shadow-lg"
              >
                <div className="p-4 md:p-6">
                  <h3 className="text-foreground text-lg font-semibold mb-3">
                    {faq.question}
                  </h3>
                  <p className="text-foreground/70 leading-relaxed whitespace-pre-wrap">
                    {faq.answer}
                  </p>
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
    <section className="">
      <div className="mx-auto max-w-4xl md:px-6">
        <div className="text-center mb-16">
          {title && (
            <h2 className="text-foreground mb-4 text-3xl font-bold lg:text-4xl">
              {title}
            </h2>
          )}
          {description && (
            <p className="text-foreground/70 text-lg max-w-2xl mx-auto">
              {description}
            </p>
          )}
        </div>
        
        <div className="space-y-8">
          {faqs.map((faq, index) => (
            <div
              key={faq.id}
              className="border-b border-border pb-8 last:border-b-0"
            >
              <div className="flex items-start gap-4">
                <div
                  className="flex-shrink-0 w-8 h-8 bg-brand text-white rounded-full flex items-center justify-center font-bold text-sm"
                >
                  Q
                </div>
                <div className="flex-1">
                  <h3 className="text-foreground font-semibold text-xl mb-3">
                    {faq.question}
                  </h3>
                  <p className="text-foreground/70 leading-relaxed whitespace-pre-wrap">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

