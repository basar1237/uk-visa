import type { Block, Field } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

import { blockToggleField } from '@/fields/blockToggle'

const columnFields: Field[] = [
  {
    name: 'size',
    type: 'select',
    defaultValue: 'oneThird',
    options: [
      {
        label: 'One Fourth (1/4)',
        value: 'oneFourth',
      },
      {
        label: 'One Third (1/3)',
        value: 'oneThird',
      },
      {
        label: 'Half (1/2)',
        value: 'half',
      },
      {
        label: 'Two Thirds (2/3)',
        value: 'twoThirds',
      },
      {
        label: 'Three Fourths (3/4)',
        value: 'threeFourths',
      },
      {
        label: 'Full',
        value: 'full',
      },
    ],
  },
  {
    name: 'media',
    type: 'upload',
    relationTo: 'media',
    required: false,
    label: 'Image',
  },
  {
    name: 'badges',
    type: 'array',
    label: 'Badges',
    required: false,
    fields: [
      {
        name: 'text',
        type: 'text',
        label: 'Badge Text',
        required: false,
      },
    ],
  },
  {
    name: 'title',
    type: 'text',
    label: 'Title',
    required: false,
  },
  {
    name: 'richText',
    type: 'richText',
    editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [
            ...rootFeatures,
            HeadingFeature({ enabledHeadingSizes: ['h2', 'h3', 'h4', 'h5', 'h6'] }),
            FixedToolbarFeature(),
            InlineToolbarFeature(),
          ]
        },
    }),
    label: 'Content',
    required: false,
  },
  {
    name: 'links',
    type: 'array',
    label: 'Links',
    required: false,
    fields: [
      {
        name: 'link',
        type: 'group',
        admin: {
          hideGutter: true,
        },
        fields: [
          {
            type: 'row',
            fields: [
              {
                name: 'type',
                type: 'radio',
                admin: {
                  layout: 'horizontal',
                  width: '50%',
                },
                defaultValue: 'reference',
                options: [
                  {
                    label: 'Internal link',
                    value: 'reference',
                  },
                  {
                    label: 'Custom URL',
                    value: 'custom',
                  },
                ],
              },
              {
                name: 'newTab',
                type: 'checkbox',
                admin: {
                  style: {
                    alignSelf: 'flex-end',
                  },
                  width: '50%',
                },
                label: 'Open in new tab',
              },
            ],
          },
          {
            name: 'reference',
            type: 'relationship',
            admin: {
              condition: (_, siblingData) => siblingData?.type === 'reference',
            },
            label: 'Document to link to',
            relationTo: ['pages', 'posts'],
            required: false,
          },
          {
            name: 'url',
            type: 'text',
            admin: {
              condition: (_, siblingData) => siblingData?.type === 'custom',
            },
            label: 'Custom URL',
            required: false,
          },
          {
            name: 'label',
            type: 'text',
            admin: {
              width: '50%',
            },
            label: 'Label',
            required: false,
          },
        ],
      },
    ],
  },
  {
    name: 'greenSectionContent',
    type: 'richText',
    editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [
            ...rootFeatures,
            HeadingFeature({ enabledHeadingSizes: ['h4', 'h5', 'h6'] }),
            FixedToolbarFeature(),
            InlineToolbarFeature(),
          ]
        },
    }),
    label: 'Yeşil Bölüm İçeriği',
    required: false,
    admin: {
      description: 'Yeşil seçenek alanının içeriği (opsiyonel)',
    },
  },
]

export const LandingBlock: Block = {
  slug: 'landingBlock',
  interfaceName: 'LandingBlock',
  fields: [
    blockToggleField,
    {
      name: 'backgroundStyle',
      type: 'select',
      defaultValue: 'gradient',
      label: 'Background Style',
      options: [
        {
          label: 'Gradient (Blue to Green)',
          value: 'gradient',
        },
        {
          label: 'White',
          value: 'white',
        },
        {
          label: 'Gray',
          value: 'gray',
        },
      ],
    },
    {
      name: 'columns',
      type: 'array',
      admin: {
        initCollapsed: true,
      },
      fields: columnFields,
      minRows: 0,
      maxRows: 4,
    },
  ],
}

