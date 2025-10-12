import type { Block, Field } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

import { link } from '@/fields/link'

const columnFields: Field[] = [
  {
    name: 'size',
    type: 'select',
    defaultValue: 'oneThird',
    options: [
      {
        label: 'One Third',
        value: 'oneThird',
      },
      {
        label: 'Half',
        value: 'half',
      },
      {
        label: 'Two Thirds',
        value: 'twoThirds',
      },
      {
        label: 'Full',
        value: 'full',
      },
    ],
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
        required: true,
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
      link(),
    ],
  },
]

export const LandingBlock: Block = {
  slug: 'landingBlock',
  interfaceName: 'LandingBlock',
  fields: [
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

