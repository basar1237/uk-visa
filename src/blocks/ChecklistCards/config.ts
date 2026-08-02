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
          maxRows: 10,
          admin: {
            description: 'Boş bırakılırsa kart, ✓ işaretli kompakt rozet olarak gösterilir',
          },
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
    {
      type: 'group',
      name: 'bottomCta',
      label: 'Alt CTA kartı (koyu lacivert kutu, opsiyonel)',
      fields: [
        {
          name: 'icon',
          type: 'text',
          admin: { description: 'Emoji ikon (örn: 🧭)' },
        },
        { name: 'title', type: 'text', admin: { description: 'örn: "Need guidance?"' } },
        { name: 'description', type: 'textarea' },
        { name: 'buttonText', type: 'text' },
        { name: 'buttonLink', type: 'text', admin: { description: 'örn: /contact' } },
      ],
    },
  ],
  labels: {
    plural: 'Checklist Cards',
    singular: 'Checklist Cards',
  },
}
