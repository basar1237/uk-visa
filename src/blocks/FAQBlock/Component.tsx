import React from 'react'
import { FAQBlockClient } from './Component.client'

import type { FAQBlock } from '@/payload-types'

export const FAQBlockComponent: React.FC<FAQBlock> = async (props) => {
  const {
    title,
    description,
    faqs,
    displayStyle = 'accordion',
  } = props

  // FAQs'i uygun formata çevir
  const formattedFaqs = (faqs || []).map((faq, index) => ({
    id: `faq-${index}`,
    question: faq.question,
    answer: faq.answer,
  }))

  if (!formattedFaqs || formattedFaqs.length === 0) {
    return null
  }

  return (
    <FAQBlockClient
      title={title}
      description={description}
      faqs={formattedFaqs}
      displayStyle={displayStyle || 'accordion'}
    />
  )
}

