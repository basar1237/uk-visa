import type { Block } from 'payload'
import { blockToggleField } from '@/fields/blockToggle'

export const FinancialRequirements: Block = {
  slug: 'financialRequirements',
  interfaceName: 'FinancialRequirementsBlock',
  fields: [
    blockToggleField,
    {
      name: 'eyebrow',
      type: 'text',
      admin: {
        description: 'Başlık üstündeki küçük etiket (örn: "FINANCIAL REQUIREMENTS")',
      },
    },
    {
      name: 'title',
      type: 'text',
      required: true,
      admin: {
        description: 'Bölüm başlığı (örn: "Understand which financial rules apply to you")',
      },
    },
    {
      name: 'description',
      type: 'textarea',
    },
    {
      type: 'group',
      name: 'highlight',
      label: 'Öne çıkan gelir kartı (koyu mavi kutu)',
      fields: [
        {
          name: 'label',
          type: 'text',
          admin: { description: 'örn: "Usual minimum income requirement"' },
        },
        {
          name: 'value',
          type: 'text',
          admin: { description: 'örn: "£29,000"' },
        },
        {
          name: 'suffix',
          type: 'text',
          admin: { description: 'örn: "combined gross annual income"' },
        },
        {
          name: 'note',
          type: 'textarea',
          admin: { description: 'Kutunun altındaki küçük açıklama' },
        },
      ],
    },
    {
      name: 'situationsTitle',
      type: 'text',
      admin: { description: 'örn: "Which situation best describes you?"' },
    },
    {
      name: 'situations',
      type: 'array',
      maxRows: 6,
      admin: {
        description: 'Tıklanabilir durum kartları; seçilen kartın sonuç metni altta gösterilir',
      },
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'description', type: 'textarea' },
        {
          name: 'resultTitle',
          type: 'text',
          admin: { description: 'Seçilince altta çıkan kutunun başlığı (örn: "Likely starting point: £29,000")' },
        },
        {
          name: 'resultText',
          type: 'textarea',
          admin: { description: 'Seçilince altta çıkan kutunun metni' },
        },
      ],
    },
    {
      name: 'categoriesTitle',
      type: 'text',
      admin: { description: 'örn: "What will you rely upon?"' },
    },
    {
      name: 'categoriesDescription',
      type: 'textarea',
    },
    {
      name: 'categories',
      type: 'array',
      maxRows: 8,
      admin: { description: 'Gelir kategorisi kartları (Employment Income, Self-employment vb.)' },
      fields: [
        {
          name: 'icon',
          type: 'text',
          admin: { description: 'Emoji ikon (örn: 💼 📈 🏦 👴 🏠 🛡️)' },
        },
        { name: 'title', type: 'text', required: true },
        { name: 'description', type: 'textarea' },
        {
          name: 'badge',
          type: 'text',
          admin: { description: 'Kart üstündeki küçük rozet (örn: "Best for employed sponsors")' },
        },
        {
          name: 'items',
          type: 'array',
          maxRows: 8,
          fields: [{ name: 'text', type: 'text', required: true }],
        },
        {
          name: 'buttonText',
          type: 'text',
          admin: { description: 'Kart butonu metni (boşsa buton gösterilmez, örn: "View requirements")' },
        },
        {
          name: 'buttonLink',
          type: 'text',
          admin: { description: 'Kart butonu linki (örn: /eligibility-check)' },
        },
      ],
    },
    {
      type: 'group',
      name: 'bottomCta',
      label: 'Alt CTA kutusu',
      fields: [
        { name: 'title', type: 'text', admin: { description: 'örn: "Not sure which category applies?"' } },
        { name: 'description', type: 'textarea' },
        { name: 'buttonText', type: 'text' },
        { name: 'buttonLink', type: 'text', admin: { description: 'örn: /eligibility-check' } },
      ],
    },
  ],
  labels: {
    plural: 'Financial Requirements',
    singular: 'Financial Requirements',
  },
}
