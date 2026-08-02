import type { Block } from 'payload'
import { blockToggleField } from '@/fields/blockToggle'

export const ProcessSteps: Block = {
  slug: 'processSteps',
  interfaceName: 'ProcessStepsBlock',
  fields: [
    blockToggleField,
    {
      name: 'eyebrow',
      type: 'text',
      admin: {
        description: 'Başlık üstündeki küçük etiket (örn: "APPLICATION PROCESS")',
      },
    },
    {
      name: 'title',
      type: 'text',
      required: true,
      admin: {
        description: 'Bölüm başlığı (örn: "Your route from eligibility to decision")',
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
      name: 'style',
      type: 'select',
      defaultValue: 'grid',
      required: true,
      options: [
        { label: 'Grid — 2 sütunlu numaralı kartlar', value: 'grid' },
        { label: 'Compact — sadece numara + etiket', value: 'compact' },
        { label: 'Timeline — dikey adım kartları (oklu)', value: 'timeline' },
      ],
      admin: {
        description: 'Görünüm: grid (gereklilik kartları), compact (süreç özeti), timeline (başvuru yolculuğu)',
      },
    },
    {
      name: 'steps',
      type: 'array',
      minRows: 1,
      maxRows: 12,
      required: true,
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
          admin: {
            description: 'Compact stilde gösterilmez',
          },
        },
      ],
    },
  ],
  labels: {
    plural: 'Process Steps',
    singular: 'Process Steps',
  },
}
