import type { GlobalConfig } from 'payload'

import { link } from '@/fields/link'
import { revalidateHeader } from './hooks/revalidateHeader'

export const Header: GlobalConfig = {
  slug: 'header',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'navItems',
      type: 'array',
      fields: [
        link({
          appearances: false,
        }),
        {
          name: 'hasDropdown',
          type: 'checkbox',
          label: 'Dropdown Menü Var mı?',
          defaultValue: false,
        },
        {
          name: 'dropdownItems',
          type: 'array',
          label: 'Dropdown Menü Öğeleri',
          admin: {
            condition: (_, siblingData) => siblingData.hasDropdown,
          },
          fields: [
            {
              name: 'titleLink',
              type: 'group',
              label: 'Başlık Linki',
              fields: [
                link({
                  appearances: false,
                }),
              ],
            },
            {
              name: 'hasSubDropdown',
              type: 'checkbox',
              label: 'Bu başlık altında dropdown var mı?',
              defaultValue: false,
            },
            {
              name: 'items',
              type: 'array',
              label: 'Alt Öğeler',
              admin: {
                condition: (_, siblingData) => siblingData.hasSubDropdown,
              },
              fields: [
                link({
                  appearances: false,
                }),
              ],
            },
          ],
        },
      ],
      maxRows: 8,
      admin: {
        initCollapsed: true,
        components: {
          RowLabel: '@/Header/RowLabel#RowLabel',
        },
      },
    },
    {
      name: 'phoneNumber',
      type: 'text',
      label: 'Telefon Numarası',
      defaultValue: '07858780841',
    },
  ],
  hooks: {
    afterChange: [revalidateHeader],
  },
}
