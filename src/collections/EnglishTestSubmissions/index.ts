import type { CollectionConfig } from 'payload'

export const EnglishTestSubmissions: CollectionConfig = {
  slug: 'english-test-submissions',
  admin: {
    useAsTitle: 'fullName',
    defaultColumns: ['fullName', 'email', 'score', 'level', 'createdAt'],
    group: 'Submissions',
  },
  access: {
    create: () => true, // Herkes test sonucu gönderebilir
    read: ({ req: { user } }) => {
      // Sadece authenticated kullanıcılar görebilir
      return !!user
    },
    update: ({ req: { user } }) => {
      // Sadece authenticated kullanıcılar güncelleyebilir
      return !!user
    },
    delete: ({ req: { user } }) => {
      // Sadece authenticated kullanıcılar silebilir
      return !!user
    },
  },
  fields: [
    {
      name: 'fullName',
      type: 'text',
      required: true,
      label: 'Full Name',
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
      name: 'score',
      type: 'number',
      required: true,
      label: 'Test Score',
      min: 0,
      max: 20,
    },
    {
      name: 'totalQuestions',
      type: 'number',
      required: true,
      label: 'Total Questions',
      defaultValue: 20,
    },
    {
      name: 'percentage',
      type: 'number',
      required: true,
      label: 'Percentage',
      min: 0,
      max: 100,
    },
    {
      name: 'level',
      type: 'text',
      required: true,
      label: 'English Level',
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Test Description',
    },
    {
      name: 'visaEligibility',
      type: 'text',
      label: 'Visa Eligibility',
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
      name: 'correctAnswers',
      type: 'number',
      required: true,
      label: 'Correct Answers',
    },
    {
      name: 'wrongAnswers',
      type: 'number',
      required: true,
      label: 'Wrong Answers',
    },
    {
      name: 'testDuration',
      type: 'number',
      label: 'Test Duration (minutes)',
    },
    {
      name: 'questionDetails',
      type: 'array',
      label: 'Question Details',
      fields: [
        {
          name: 'questionId',
          type: 'number',
          required: true,
          label: 'Question ID',
        },
        {
          name: 'question',
          type: 'text',
          required: true,
          label: 'Question Text',
        },
        {
          name: 'options',
          type: 'array',
          label: 'Options',
          fields: [
            {
              name: 'option',
              type: 'text',
              required: true,
            },
          ],
        },
        {
          name: 'correctAnswer',
          type: 'number',
          required: true,
          label: 'Correct Answer Index',
        },
        {
          name: 'selectedAnswer',
          type: 'number',
          label: 'Selected Answer Index',
        },
        {
          name: 'isCorrect',
          type: 'checkbox',
          label: 'Is Correct',
        },
        {
          name: 'explanation',
          type: 'text',
          label: 'Explanation',
        },
        {
          name: 'category',
          type: 'text',
          label: 'Category',
        },
      ],
    },
    {
      name: 'status',
      type: 'select',
      options: [
        { label: 'New', value: 'new' },
        { label: 'Reviewed', value: 'reviewed' },
        { label: 'Contacted', value: 'contacted' },
      ],
      defaultValue: 'new',
      required: true,
    },
    {
      name: 'notes',
      type: 'textarea',
      label: 'Admin Notes',
    },
    {
      name: 'exportActions',
      type: 'ui',
      admin: {
        components: {
          Field: '@/components/EnglishTestSubmissionExportField',
        },
      },
    },
  ],
  timestamps: true,
}
