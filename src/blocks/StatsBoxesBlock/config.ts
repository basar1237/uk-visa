import type { Block } from 'payload'

export const StatsBoxesBlock: Block = {
  slug: 'statsBoxesBlock',
  interfaceName: 'StatsBoxesBlock',
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Başlık',
      defaultValue: 'İstatistiklerimiz',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Açıklama',
      required: false,
    },
    {
      name: 'stats',
      type: 'array',
      label: 'İstatistik Kutuları',
      defaultValue: [],
      admin: {
        initCollapsed: false,
        description: 'İstatistik kutularını buraya ekleyin',
      },
      fields: [
        {
          name: 'value',
          type: 'text',
          label: 'Büyük Değer (örn: 10M+, 99.9%)',
          required: true,
        },
        {
          name: 'label',
          type: 'text',
          label: 'Ana Etiket',
          required: true,
        },
        {
          name: 'description',
          type: 'text',
          label: 'Alt Açıklama',
          required: false,
        },
      ],
      minRows: 1,
      maxRows: 4,
    },
  ],
  labels: {
    singular: 'Stats Boxes Block',
    plural: 'Stats Boxes Blocks',
  },
}
