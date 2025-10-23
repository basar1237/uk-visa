import type { Block } from 'payload'
import { blockToggleField } from '@/fields/blockToggle'

export const KnowledgeBase: Block = {
  slug: 'knowledgeBase',
  interfaceName: 'KnowledgeBaseBlock',
  fields: [
    blockToggleField,
    {
      name: 'title',
      type: 'text',
      required: true,
      admin: {
        description: 'Ana başlık (örn: "UK Visa Knowledge Base")',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
      admin: {
        description: 'Açıklama metni',
      },
    },
    {
      name: 'knowledgeItems',
      type: 'array',
      minRows: 6,
      maxRows: 6,
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
          admin: {
            description: 'Kart görseli',
          },
        },
        {
          name: 'title',
          type: 'text',
          required: true,
          admin: {
            description: 'Kart başlığı',
          },
        },
        {
          name: 'link',
          type: 'text',
          required: false,
          admin: {
            description: 'Kart linki (opsiyonel)',
          },
        },
      ],
    },
    {
      name: 'eligibilityTest',
      type: 'group',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          defaultValue: 'UK Visa Eligibility Test',
          admin: {
            description: 'Eligibility test başlığı',
          },
        },
        {
          name: 'description',
          type: 'textarea',
          required: true,
          defaultValue: 'Complete our comprehensive 20-question assessment to check your eligibility for UK visa applications.',
          admin: {
            description: 'Eligibility test açıklaması',
          },
        },
        {
          name: 'buttonText',
          type: 'text',
          required: true,
          defaultValue: 'Start Free Assessment',
          admin: {
            description: 'Buton metni',
          },
        },
        {
          name: 'link',
          type: 'text',
          required: true,
          defaultValue: '/eligibility-check',
          admin: {
            description: 'Test sayfası linki',
          },
        },
      ],
      admin: {
        description: 'UK Visa Eligibility Test alanı',
      },
    },
    {
      name: 'solicitorHelpline',
      type: 'group',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          defaultValue: 'Immigration Solicitor Helpline',
          admin: {
            description: 'Solicitor helpline başlığı',
          },
        },
        {
          name: 'description',
          type: 'textarea',
          required: true,
          defaultValue: 'Speak directly with qualified immigration solicitors for expert advice on your UK visa application.',
          admin: {
            description: 'Solicitor helpline açıklaması',
          },
        },
        {
          name: 'phoneNumber',
          type: 'text',
          required: true,
          defaultValue: '+02037288948',
          admin: {
            description: 'Telefon numarası',
          },
        },
        {
          name: 'buttonText',
          type: 'text',
          required: true,
          defaultValue: 'Contact Solicitor',
          admin: {
            description: 'Buton metni',
          },
        },
        {
          name: 'link',
          type: 'text',
          required: true,
          defaultValue: '/contact',
          admin: {
            description: 'İletişim sayfası linki',
          },
        },
      ],
      admin: {
        description: 'Immigration Solicitor Helpline alanı',
      },
    },
    {
      name: 'ctaButton',
      type: 'group',
      fields: [
        {
          name: 'text',
          type: 'text',
          required: true,
          defaultValue: 'View Knowledge Base',
          admin: {
            description: 'Buton metni',
          },
        },
        {
          name: 'link',
          type: 'text',
          required: false,
          admin: {
            description: 'Buton linki (opsiyonel)',
          },
        },
      ],
    },
  ],
  labels: {
    plural: 'Knowledge Base Blocks',
    singular: 'Knowledge Base Block',
  },
}
