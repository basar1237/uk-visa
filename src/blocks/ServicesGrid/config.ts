import type { Block } from 'payload'
import { blockToggleField } from '@/fields/blockToggle'

export const ServicesGrid: Block = {
  slug: 'servicesGrid',
  interfaceName: 'ServicesGridBlock',
  fields: [
    blockToggleField,
    {
      name: 'title',
      type: 'text',
      required: false,
      admin: {
        description: 'Ana başlık (örn: "Our Immigration Services")',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      required: false,
      admin: {
        description: 'Açıklama metni (opsiyonel)',
      },
    },
    {
      name: 'services',
      type: 'array',
      minRows: 1,
      maxRows: 12,
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          admin: {
            description: 'Hizmet başlığı',
          },
        },
        {
          name: 'description',
          type: 'textarea',
          required: true,
          admin: {
            description: 'Hizmet açıklaması',
          },
        },
        {
          name: 'badges',
          type: 'array',
          minRows: 0,
          maxRows: 10,
          fields: [
            {
              name: 'text',
              type: 'text',
              required: true,
              admin: {
                description: 'Badge metni',
              },
            },
            {
              name: 'link',
              type: 'text',
              admin: {
                description: 'Badge linki (opsiyonel)',
              },
            },
          ],
          admin: {
            description: 'Badge\'ler ekleyin',
          },
        },
      ],
    },
  ],
  labels: {
    plural: 'Services Grids',
    singular: 'Services Grid',
  },
}
