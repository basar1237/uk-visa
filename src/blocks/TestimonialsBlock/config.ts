import type { Block } from 'payload'

export const TestimonialsBlock: Block = {
  slug: 'testimonialsBlock',
  interfaceName: 'TestimonialsBlock',
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Başlık',
      defaultValue: 'Müşteri Yorumları',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Açıklama',
      required: false,
    },
    {
      name: 'testimonials',
      type: 'array',
      label: 'Müşteri Yorumları',
      defaultValue: [],
      admin: {
        initCollapsed: false,
        description: 'Müşteri yorumlarını buraya ekleyin',
      },
      fields: [
        {
          name: 'name',
          type: 'text',
          label: 'İsim',
          required: true,
        },
        {
          name: 'role',
          type: 'text',
          label: 'Pozisyon/Şirket',
          required: true,
        },
        {
          name: 'content',
          type: 'textarea',
          label: 'Yorum İçeriği',
          required: true,
        },
        {
          name: 'avatar',
          type: 'upload',
          relationTo: 'media',
          label: 'Profil Fotoğrafı',
          required: false,
        },
        {
          name: 'rating',
          type: 'number',
          label: 'Puan (1-5)',
          min: 1,
          max: 5,
          defaultValue: 5,
          required: false,
        },
      ],
      minRows: 1,
      maxRows: 10,
    },
    {
      name: 'autoplay',
      type: 'checkbox',
      label: 'Otomatik Oynatma',
      defaultValue: false,
    },
  ],
  labels: {
    singular: 'Testimonials Block',
    plural: 'Testimonials Blocks',
  },
}
