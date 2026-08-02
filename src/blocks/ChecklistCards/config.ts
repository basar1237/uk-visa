import type { Block } from 'payload'
import { blockToggleField } from '@/fields/blockToggle'

export const ChecklistCards: Block = {
  slug: 'checklistCards',
  interfaceName: 'ChecklistCardsBlock',
  fields: [
    blockToggleField,
    {
      name: 'eyebrow',
      type: 'text',
      admin: {
        description: 'Başlık üstündeki küçük etiket (opsiyonel)',
      },
    },
    {
      name: 'title',
      type: 'text',
      required: true,
      admin: {
        description: 'Bölüm başlığı (örn: "Everything you need for a successful UK Spouse Visa application")',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      admin: {
        description: 'Başlık altı açıklama (opsiyonel)',
      },
    },
    {
      name: 'cards',
      type: 'array',
      minRows: 1,
      maxRows: 12,
      required: true,
      fields: [
        {
          name: 'icon',
          type: 'text',
          admin: {
            description: 'Emoji ikon (örn: 🪪 ❤️ 💷 🏠 🗣️ 📄)',
          },
        },
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
        },
        {
          name: 'items',
          type: 'array',
          minRows: 1,
          maxRows: 10,
          required: true,
          fields: [
            {
              name: 'text',
              type: 'text',
              required: true,
            },
          ],
        },
      ],
    },
  ],
  labels: {
    plural: 'Checklist Cards',
    singular: 'Checklist Cards',
  },
}
