import type { Block } from 'payload'
import { blockToggleField } from '@/fields/blockToggle'

export const FAQBlock: Block = {
  slug: 'faqBlock',
  interfaceName: 'FAQBlock',
  fields: [
    blockToggleField,
    {
      name: 'title',
      type: 'text',
      label: 'Başlık',
      defaultValue: 'Sıkça Sorulan Sorular',
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Açıklama',
      required: false,
    },
    {
      name: 'faqs',
      type: 'array',
      label: 'Sıkça Sorulan Sorular',
      defaultValue: [],
      admin: {
        initCollapsed: true,
        description: 'Soru ve cevapları buraya ekleyin',
      },
      fields: [
        {
          name: 'question',
          type: 'text',
          label: 'Soru',
          required: true,
        },
        {
          name: 'answer',
          type: 'textarea',
          label: 'Cevap',
          required: true,
        },
      ],
      minRows: 1,
    },
    {
      name: 'displayStyle',
      type: 'select',
      label: 'Görünüm Stili',
      defaultValue: 'accordion',
      options: [
        {
          label: 'Accordion (Açılır/Kapanır)',
          value: 'accordion',
        },
        {
          label: 'Liste',
          value: 'list',
        },
        {
          label: 'Grid',
          value: 'grid',
        },
      ],
    },
  ],
  labels: {
    singular: 'FAQ Block',
    plural: 'FAQ Blocks',
  },
}

