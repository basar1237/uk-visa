import type { CollectionConfig } from 'payload'

export const EligibilitySubmissions: CollectionConfig = {
  slug: 'eligibility-submissions',
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
    defaultColumns: ['fullName', 'email', 'nationality', 'visaType', 'eligible', 'score', 'createdAt'],
    useAsTitle: 'fullName',
    group: 'Forms',
  },
  fields: [
    // Personal Information
    {
      name: 'fullName',
      type: 'text',
      required: true,
      label: 'Full Name',
    },
    {
      name: 'dateOfBirth',
      type: 'date',
      required: true,
      label: 'Date of Birth',
    },
    {
      name: 'nationality',
      type: 'text',
      required: true,
      label: 'Nationality',
    },
    {
      name: 'gender',
      type: 'text',
      required: true,
      label: 'Gender',
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
      required: true,
      label: 'Phone Number',
    },

    // Passport Information
    {
      name: 'passportNumber',
      type: 'text',
      required: true,
      label: 'Passport Number',
    },
    {
      name: 'passportExpiry',
      type: 'date',
      required: true,
      label: 'Passport Expiry Date',
    },
    {
      name: 'passportIssuedBy',
      type: 'text',
      required: true,
      label: 'Passport Issued By',
    },

    // Visa Information
    {
      name: 'visaType',
      type: 'text',
      required: true,
      label: 'Visa Type',
    },
    {
      name: 'applicationFor',
      type: 'text',
      required: true,
      label: 'Application For',
    },
    {
      name: 'visitPurpose',
      type: 'text',
      required: true,
      label: 'Main Purpose of Visit',
    },

    // Background Information
    {
      name: 'previousUKVisa',
      type: 'text',
      required: true,
      label: 'Previous UK Visa Application',
    },
    {
      name: 'visaRefusal',
      type: 'text',
      required: true,
      label: 'Visa Refusal History',
    },
    {
      name: 'criminalConvictions',
      type: 'text',
      required: true,
      label: 'Criminal Convictions',
    },
    {
      name: 'sufficientFunds',
      type: 'text',
      required: true,
      label: 'Sufficient Funds',
    },

    // Additional Information
    {
      name: 'familyInUK',
      type: 'text',
      required: true,
      label: 'Family Members in UK',
    },
    {
      name: 'familyRelationship',
      type: 'text',
      label: 'Family Relationship Details',
    },
    {
      name: 'ukSponsor',
      type: 'text',
      required: true,
      label: 'UK Sponsor',
    },
    {
      name: 'additionalInfo',
      type: 'textarea',
      label: 'Additional Information',
    },

    // Assessment Results
    {
      name: 'eligible',
      type: 'checkbox',
      required: true,
      label: 'Eligible',
      defaultValue: false,
    },
    {
      name: 'score',
      type: 'number',
      required: true,
      label: 'Eligibility Score',
    },
    {
      name: 'level',
      type: 'text',
      required: true,
      label: 'Eligibility Level',
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
      label: 'Eligibility Description',
    },
    {
      name: 'recommendations',
      type: 'array',
      label: 'Recommendations',
      fields: [
        {
          name: 'recommendation',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'nextSteps',
      type: 'array',
      label: 'Next Steps',
      fields: [
        {
          name: 'step',
          type: 'text',
          required: true,
        },
      ],
    },

    // Admin Fields
    {
      name: 'status',
      type: 'select',
      label: 'Status',
      options: [
        { label: 'New', value: 'new' },
        { label: 'In Progress', value: 'in-progress' },
        { label: 'Contacted', value: 'contacted' },
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
          Field: '@/components/EligibilitySubmissionExportField',
        },
        position: 'sidebar',
      },
    },
  ],
  timestamps: true,
}
