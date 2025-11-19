'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from "motion/react"
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
        <div className="mx-auto max-w-4xl px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
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
          </motion.div>

          <div className="space-y-3 md:space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={faq.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group overflow-hidden rounded-2xl border border-border bg-background transition-all hover:border-brand hover:shadow-lg"
              >
                <motion.button
                  onClick={() => toggleFAQ(index)}
                  className="flex w-full items-center justify-between p-4 md:p-6 text-left transition-colors hover:bg-background/50"
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                >
                  <h3 className="text-foreground text-lg font-semibold pr-4">
                    {faq.question}
                  </h3>
                  <motion.div
                    animate={{ rotate: openIndex === index ? 180 : 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="flex-shrink-0"
                  >
                    <ChevronDown className="h-5 w-5 text-foreground/60" />
                  </motion.div>
                </motion.button>

                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <motion.div
                        initial={{ y: -10 }}
                        animate={{ y: 0 }}
                        exit={{ y: -10 }}
                        transition={{ duration: 0.3, delay: 0.1 }}
                        className="px-4 md:px-6 pb-4 md:pb-6"
                      >
                        <p className="text-foreground/70 leading-relaxed whitespace-pre-wrap">
                          {faq.answer}
                        </p>
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
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
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
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
          </motion.div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {faqs.map((faq, index) => (
              <motion.div
                key={faq.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group overflow-hidden rounded-2xl border border-border bg-background transition-all hover:border-brand hover:shadow-lg"
              >
                <div className="p-4 md:p-6">
                  <h3 className="text-foreground text-lg font-semibold mb-3">
                    {faq.question}
                  </h3>
                  <p className="text-foreground/70 leading-relaxed whitespace-pre-wrap">
                    {faq.answer}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  // List style
  return (
    <section className="">
      <div className="mx-auto max-w-4xl px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
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
        </motion.div>
        
        <div className="space-y-8">
          {faqs.map((faq, index) => (
            <motion.div
              key={faq.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="border-b border-border pb-8 last:border-b-0"
            >
              <div className="flex items-start gap-4">
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
                  viewport={{ once: true }}
                  className="flex-shrink-0 w-8 h-8 bg-brand text-white rounded-full flex items-center justify-center font-bold text-sm"
                >
                  Q
                </motion.div>
                <div className="flex-1">
                  <h3 className="text-foreground font-semibold text-xl mb-3">
                    {faq.question}
                  </h3>
                  <p className="text-foreground/70 leading-relaxed whitespace-pre-wrap">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

