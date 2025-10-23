import type { CollectionConfig } from 'payload'

export const ContactSubmissions: CollectionConfig = {
  slug: 'contact-submissions',
  access: {
    create: () => true, // Herkes form gönderebilir
    read: ({ req: { user } }) => {
      // Sadece admin kullanıcılar okuyabilir
      return Boolean(user)
    },
    update: ({ req: { user } }) => {
      return Boolean(user)
    },
    delete: ({ req: { user } }) => {
      return Boolean(user)
    },
  },
  admin: {
    defaultColumns: ['firstName', 'lastName', 'email', 'subject', 'urgency', 'createdAt'],
    useAsTitle: 'subject',
    group: 'Forms',
  },
  fields: [
    {
      name: 'firstName',
      type: 'text',
      required: true,
      label: 'First Name',
    },
    {
      name: 'lastName',
      type: 'text',
      required: true,
      label: 'Last Name',
    },
    {
      name: 'email',
      type: 'email',
      required: true,
      label: 'Email Address',
    },
    {
      name: 'phone',
      type: 'text',
      label: 'Phone Number',
    },
    {
      name: 'visaType',
      type: 'select',
      required: true,
      label: 'Visa Type',
      options: [
        { label: 'Visitor Visa', value: 'visitor' },
        { label: 'Student Visa', value: 'student' },
        { label: 'Skilled Worker Visa', value: 'work' },
        { label: 'Spouse Visa', value: 'spouse' },
        { label: 'Parent Visa', value: 'parent' },
        { label: 'Other', value: 'other' },
      ],
    },
    {
      name: 'subject',
      type: 'text',
      required: true,
      label: 'Subject',
    },
    {
      name: 'message',
      type: 'textarea',
      required: true,
      label: 'Message',
    },
    {
      name: 'preferredContact',
      type: 'select',
      required: true,
      label: 'Preferred Contact Method',
      options: [
        { label: 'Email', value: 'email' },
        { label: 'Phone', value: 'phone' },
        { label: 'Both', value: 'both' },
      ],
      defaultValue: 'email',
    },
    {
      name: 'urgency',
      type: 'select',
      required: true,
      label: 'Urgency Level',
      options: [
        { label: 'Normal', value: 'normal' },
        { label: 'Urgent', value: 'urgent' },
        { label: 'Very Urgent', value: 'very-urgent' },
      ],
      defaultValue: 'normal',
    },
    {
      name: 'status',
      type: 'select',
      label: 'Status',
      options: [
        { label: 'New', value: 'new' },
        { label: 'In Progress', value: 'in-progress' },
        { label: 'Resolved', value: 'resolved' },
        { label: 'Closed', value: 'closed' },
      ],
      defaultValue: 'new',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'adminNotes',
      type: 'textarea',
      label: 'Admin Notes',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'exportActions',
      type: 'ui',
      admin: {
        components: {
          Field: '@/components/ContactSubmissionExportField',
        },
        position: 'sidebar',
      },
    },
  ],
  timestamps: true,
}
