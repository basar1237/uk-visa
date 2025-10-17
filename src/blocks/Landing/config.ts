import type { Block, Field } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

import { link } from '@/fields/link'
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
    defaultValue: [],
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
    defaultValue: [],
    fields: [
      link(),
    ],
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
      defaultValue: [],
      admin: {
        initCollapsed: true,
      },
      fields: columnFields,
      minRows: 0,
      maxRows: 4,
    },
  ],
}

