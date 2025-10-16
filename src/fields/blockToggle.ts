import type { Field } from 'payload'

export const blockToggleField: Field = {
  name: 'isActive',
  type: 'checkbox',
  defaultValue: true,
  admin: {
    description: 'aktive/deactive',
    position: 'sidebar',
    width: '50%',
  },
  label: 'Aktif',
}
