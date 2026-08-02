/**
 * Spouse Visa sayfasını "Spouse Visa Page.pdf" tasarımına göre günceller.
 * Hedef: /spousa-visa (id 76). (Önceden yanlışlıkla /spouse-route'a uygulanmış,
 * o sayfa restoreVersion ile eski haline döndürüldü.)
 *
 * - Mevcut sayfa SİLİNMEZ; yerinde güncellenir (versiyonlama açık, eski hâl
 *   admin > Versions'tan geri yüklenebilir).
 * - Mevcut faqBlock ve meta.image korunur. Slug değişmez.
 *
 * Kullanım:
 *   pnpm tsx scripts/build-spouse-visa-page.ts           # dry run (yazmaz, özetler)
 *   pnpm tsx scripts/build-spouse-visa-page.ts --apply   # uygular
 */
import 'dotenv/config'
import { getPayload } from 'payload'
import config from '../src/payload.config'

const APPLY = process.argv.includes('--apply')
const PAGE_ID = 76
const EXPECTED_SLUG = 'spousa-visa'

/* ---------- Lexical yardımcıları ---------- */

function text(t: string, format = 0) {
  return { mode: 'normal', text: t, type: 'text', style: '', detail: 0, format, version: 1 }
}

function heading(tag: string, children: any[], format = '') {
  return { tag, type: 'heading', format, indent: 0, version: 1, children, direction: null }
}

function paragraph(children: any[], format = '') {
  return {
    type: 'paragraph',
    format,
    indent: 0,
    version: 1,
    children,
    direction: null,
    textStyle: '',
    textFormat: 0,
  }
}

function richTextRoot(children: any[]) {
  return {
    root: { type: 'root', format: '', indent: 0, version: 1, children, direction: null },
  }
}

function bulletList(items: string[]) {
  return {
    type: 'list',
    listType: 'bullet',
    tag: 'ul',
    start: 1,
    format: '',
    indent: 0,
    version: 1,
    direction: null,
    children: items.map((t, i) => ({
      type: 'listitem',
      value: i + 1,
      format: '',
      indent: 0,
      version: 1,
      direction: null,
      children: [text(t)],
    })),
  }
}

/* ---------- İçerik ---------- */

const hero = {
  type: 'highImpact' as const,
  eyebrow: 'UK SPOUSE VISA SUPPORT',
  richText: richTextRoot([
    heading('h1', [text('UK Spouse Visa – Bring Your Husband, Wife or Partner to the UK')], 'center'),
    paragraph(
      [
        text(
          'Receive clear, fixed-fee support with your UK Spouse Visa (Partner Visa) application from an IAA-regulated immigration adviser.',
        ),
      ],
      'center',
    ),
  ]),
  badges: [
    { text: 'Fixed-fee advice' },
    { text: 'Free eligibility check' },
    { text: 'Urgent appointments' },
    { text: 'UK and overseas clients' },
  ],
  links: [
    {
      link: {
        type: 'custom',
        url: '/eligibility-check',
        label: 'Check your eligibility',
        appearance: 'default',
        newTab: false,
      },
    },
    {
      link: {
        type: 'custom',
        url: '/contact',
        label: 'Book a consultation',
        appearance: 'outline',
        newTab: false,
      },
    },
  ],
  // media script içinde mevcut sayfadan korunur
}

const introContentBlock = {
  blockType: 'content',
  isActive: true,
  columns: [
    {
      size: 'full',
      richText: richTextRoot([
        heading('h2', [text('What is the UK Spouse Visa?', 1)]),
        paragraph([
          text('The '),
          text('UK Spouse Visa', 1),
          text(' (officially called the '),
          text('Partner Route under Appendix FM', 1),
          text(
            ' of the Immigration Rules) allows the husband, wife, civil partner or long-term partner of a British citizen or a person settled in the UK to live in the UK together.',
          ),
        ]),
        paragraph([
          text(
            'Whether you are applying for the first time from overseas, switching within the UK, or extending or renewing an existing spouse or partner visa, the requirements centre on four areas: your relationship, your sponsor’s status, your finances and your English language ability.',
          ),
        ]),
      ]),
      enableLink: false,
    },
  ],
}

const requirementsBlock = {
  blockType: 'processSteps',
  isActive: true,
  eyebrow: 'QUICK ELIGIBILITY OVERVIEW',
  title: 'Do you meet the main requirements?',
  description: 'The four core requirements for a UK Spouse Visa at a glance.',
  style: 'grid',
  steps: [
    {
      title: 'Relationship',
      description: 'You are married, in a civil partnership or in a qualifying durable relationship.',
    },
    {
      title: 'Sponsor’s status',
      description: 'Your partner is British, settled or otherwise eligible to sponsor you.',
    },
    {
      title: 'Finances',
      description: 'You meet the applicable financial requirement or an accepted exception.',
    },
    {
      title: 'English language',
      description: 'You meet the required English-language level or qualify for an exemption.',
    },
  ],
}

const processOverviewBlock = {
  blockType: 'processSteps',
  isActive: true,
  eyebrow: 'APPLICATION PROCESS',
  title: 'Your route from eligibility to decision',
  style: 'compact',
  steps: [
    { title: 'Eligibility' },
    { title: 'Documents' },
    { title: 'Application' },
    { title: 'Biometrics' },
    { title: 'Decision' },
    { title: 'Next steps' },
  ],
}

const financialBlock = {
  blockType: 'financialRequirements',
  isActive: true,
  eyebrow: 'FINANCIAL REQUIREMENTS',
  title: 'Understand which financial rules apply to you',
  description:
    'The correct calculation depends on when you first entered the partner route, the income sources relied upon and whether an exemption applies.',
  highlight: {
    label: 'Usual minimum income requirement',
    value: '£29,000',
    suffix: 'combined gross annual income',
    note: 'This generally applies to new partner-route applications made on or after 11 April 2024. Different rules may apply to transitional or exempt cases.',
  },
  situationsTitle: 'Which situation best describes you?',
  situations: [
    {
      title: 'New application',
      description: 'First partner-route application on or after 11 April 2024.',
      resultTitle: 'Likely starting point: £29,000',
      resultText:
        'You will normally need to demonstrate combined gross annual income of at least £29,000, unless another permitted route or exception applies.',
    },
    {
      title: 'Existing route',
      description: 'First partner application made before 11 April 2024.',
      resultTitle: 'Transitional rules may apply',
      resultText:
        'If your first partner application was made before 11 April 2024, extensions on the same route are normally assessed under the previous financial requirement (usually £18,600) rather than £29,000.',
    },
    {
      title: 'Possible exemption',
      description: 'The sponsor receives a qualifying benefit or allowance.',
      resultTitle: 'Adequate maintenance instead',
      resultText:
        'Where the sponsor receives a qualifying benefit or allowance, you normally meet an “adequate maintenance” test instead of the minimum income requirement.',
    },
  ],
  categoriesTitle: 'What will you rely upon?',
  categoriesDescription:
    'Choose the financial category that best reflects your circumstances. We’ll explain the rules, the evidence normally required and any common issues to consider.',
  categories: [
    {
      icon: '💼',
      title: 'Employment Income',
      description: 'For salaried and non-salaried employees.',
      badge: 'Best for employed sponsors',
      items: [{ text: 'Payslips' }, { text: 'Bank statements' }, { text: 'Employer’s letter' }],
      buttonText: 'View requirements',
      buttonLink: '/eligibility-check',
    },
    {
      icon: '📈',
      title: 'Self-employment',
      description: 'For sole traders, partnerships and company directors.',
      badge: 'Business income',
      items: [{ text: 'Tax returns' }, { text: 'Company accounts' }, { text: 'Business statements' }],
      buttonText: 'View requirements',
      buttonLink: '/eligibility-check',
    },
    {
      icon: '🏦',
      title: 'Cash Savings',
      description: 'Savings held for the required qualifying period.',
      badge: 'Savings route',
      items: [{ text: 'Bank statements' }, { text: 'Savings evidence' }, { text: 'Source of funds' }],
      buttonText: 'View requirements',
      buttonLink: '/eligibility-check',
    },
    {
      icon: '👴',
      title: 'Pension Income',
      description: 'State, occupational or private pension income.',
      badge: 'Retired sponsors',
      items: [{ text: 'Pension award' }, { text: 'Payment statements' }, { text: 'Bank statements' }],
      buttonText: 'View requirements',
      buttonLink: '/eligibility-check',
    },
    {
      icon: '🏠',
      title: 'Property Income',
      description: 'Rental or other permitted non-employment income.',
      badge: 'Landlords',
      items: [{ text: 'Tenancy agreements' }, { text: 'Rental statements' }, { text: 'Bank statements' }],
      buttonText: 'View requirements',
      buttonLink: '/eligibility-check',
    },
    {
      icon: '🛡️',
      title: 'Adequate Maintenance',
      description: 'For sponsors receiving qualifying benefits.',
      badge: 'Exempt route',
      items: [{ text: 'Benefit letters' }, { text: 'Household finances' }, { text: 'Housing costs' }],
      buttonText: 'View requirements',
      buttonLink: '/eligibility-check',
    },
  ],
  bottomCta: {
    title: 'Not sure which category applies?',
    description:
      'Complete our free eligibility check and we’ll help you identify the correct financial category before you prepare your application.',
    buttonText: 'Check your eligibility',
    buttonLink: '/eligibility-check',
  },
}

const documentsBlock = {
  blockType: 'checklistCards',
  isActive: true,
  title: 'Everything you need for a successful UK Spouse Visa application',
  description:
    'Every application is different. Your supporting evidence depends on your financial category, immigration history and personal circumstances. We provide each client with a personalised document checklist before submission.',
  cards: [
    {
      icon: '🪪',
      title: 'Identity',
      description: 'Documents confirming your identity and immigration status.',
      items: [
        { text: 'Current passport' },
        { text: 'Previous passports (where relevant)' },
        { text: 'BRP or eVisa' },
        { text: 'National identity card (if applicable)' },
      ],
    },
    {
      icon: '❤️',
      title: 'Relationship',
      description: 'Evidence demonstrating a genuine and subsisting relationship.',
      items: [
        { text: 'Marriage certificate' },
        { text: 'Photographs together' },
        { text: 'Messages and calls' },
        { text: 'Travel history' },
        { text: 'Joint bills or tenancy' },
      ],
    },
    {
      icon: '💷',
      title: 'Financial',
      description: 'Supporting evidence depends upon the financial category selected.',
      items: [
        { text: 'Payslips' },
        { text: 'Bank statements' },
        { text: 'Employer’s letter' },
        { text: 'Tax documents' },
        { text: 'Company accounts' },
      ],
    },
    {
      icon: '🏡',
      title: 'Accommodation',
      description: 'Evidence that suitable accommodation is available.',
      items: [
        { text: 'Tenancy agreement' },
        { text: 'Mortgage statement' },
        { text: 'Land Registry documents' },
        { text: 'Property inspection report (where required)' },
      ],
    },
    {
      icon: '🗣️',
      title: 'English Language',
      description: 'Evidence that you meet the English language requirement.',
      items: [
        { text: 'Approved SELT' },
        { text: 'Degree certificate' },
        { text: 'Ecctis statement (where applicable)' },
        { text: 'Exemption evidence' },
      ],
    },
    {
      icon: '📄',
      title: 'Additional Documents',
      description: 'Documents required only in particular circumstances.',
      items: [
        { text: 'Birth certificates' },
        { text: 'Divorce documents' },
        { text: 'Certified translations' },
        { text: 'Change of name evidence' },
      ],
    },
  ],
}

const journeyBlock = {
  blockType: 'processSteps',
  isActive: true,
  eyebrow: 'APPLICATION PROCESS',
  title: 'Your UK Spouse Visa journey',
  description:
    'From your initial enquiry through to the Home Office decision, we’ll guide you through each stage of the application process.',
  style: 'timeline',
  steps: [
    {
      title: 'Eligibility review',
      description:
        'We assess your circumstances and identify the most suitable immigration route before you apply.',
    },
    {
      title: 'Prepare your documents',
      description:
        'Gather and review your supporting evidence to ensure it meets the Immigration Rules.',
    },
    {
      title: 'Submit your application',
      description:
        'Complete the online application, upload your evidence and pay the relevant Home Office fees.',
    },
    {
      title: 'Attend your biometric appointment',
      description:
        'Provide your fingerprints and photograph at the appropriate application centre.',
    },
    {
      title: 'Home Office decision',
      description:
        'The Home Office reviews your application and supporting evidence before reaching a decision.',
    },
    {
      title: 'Receive your decision',
      description:
        'If successful, you’ll receive your immigration permission and guidance on the next stage of your journey.',
    },
  ],
}

const whyUsBlock = {
  blockType: 'featuresGrid',
  isActive: true,
  eyebrow: 'WHY CHOOSE US',
  title: 'Trusted guidance for your UK Spouse Visa application',
  description:
    'Applying for a UK Spouse Visa can feel overwhelming. Our role is to provide clear advice, prepare a well-organised application and support you throughout the process.',
  style: 'banners',
  features: [
    {
      icon: 'shield',
      title: 'IAA Regulated',
      description: 'Advice provided by an IAA-regulated immigration adviser.',
    },
    {
      icon: 'filecheck',
      title: 'Document Review',
      description: 'Every supporting document is checked before submission.',
    },
    {
      icon: 'banknote',
      title: 'Fixed Fees',
      description: 'Transparent pricing with no unexpected legal fees.',
    },
    {
      icon: 'users',
      title: 'Personal Service',
      description: 'Advice tailored to your individual circumstances.',
    },
  ],
}

// PDF sf.8: "Supporting you at every stage" — 4 kompakt ✓ rozet + koyu "Need guidance?" kartı
const supportBlock = {
  blockType: 'checklistCards',
  isActive: true,
  title: 'Supporting you at every stage',
  description:
    'Whether you need a full application service or assistance with specific stages, our advisers are here to help throughout the process.',
  cards: [
    { title: 'Eligibility assessment' },
    { title: 'Document review' },
    { title: 'Application preparation' },
    { title: 'Ongoing support' },
  ],
  bottomCta: {
    icon: '🧭',
    title: 'Need guidance?',
    description:
      'Book a consultation with one of our IAA-regulated immigration advisers and receive tailored advice for your circumstances.',
    buttonText: 'Book a consultation',
    buttonLink: '/contact',
  },
}

// PDF sf.9: "What you can expect" — kalın başlık + açıklama satırları
const expectBlock = {
  blockType: 'checklistCards',
  isActive: true,
  title: 'What you can expect',
  cards: [
    {
      title: 'Thorough eligibility assessment',
      description: 'We assess your circumstances before preparing your application.',
    },
    {
      title: 'Personalised document checklist',
      description: 'Know exactly which documents are required for your case.',
    },
    {
      title: 'Clear communication',
      description: 'Straightforward advice without unnecessary legal jargon.',
    },
    {
      title: 'Support throughout your application',
      description: 'From your first enquiry until your application has been submitted.',
    },
  ],
}

// PDF sf.10: "Our commitment" — açık mavi kutu + liste + "Book a consultation" butonu
const commitmentBlock = {
  blockType: 'cta',
  isActive: true,
  richText: richTextRoot([
    heading('h3', [text('Our commitment', 1)]),
    bulletList([
      'Advice based on the current Immigration Rules.',
      'Applications prepared carefully and thoroughly.',
      'Honest guidance about your available options.',
      'Professional and confidential service.',
      'Support for clients in the UK and overseas.',
    ]),
  ]),
  links: [
    {
      link: {
        type: 'custom',
        url: '/contact',
        label: 'Book a consultation',
        appearance: 'default',
        newTab: false,
      },
    },
  ],
}

const closingCtaBlock = {
  blockType: 'cta',
  isActive: true,
  richText: richTextRoot([
    heading('h2', [text('Ready to begin your application?')]),
    paragraph([
      text(
        'Speak to one of our IAA-regulated immigration advisers and receive guidance tailored to your circumstances.',
      ),
    ]),
  ]),
  links: [
    {
      link: {
        type: 'custom',
        url: '/eligibility-check',
        label: 'Free eligibility check',
        appearance: 'default',
        newTab: false,
      },
    },
    {
      link: {
        type: 'custom',
        url: '/contact',
        label: 'Book a consultation',
        appearance: 'outline',
        newTab: false,
      },
    },
  ],
}

/* ---------- Uygulama ---------- */

async function main() {
  const payload = await getPayload({ config })

  const page = await payload.findByID({
    collection: 'pages',
    id: PAGE_ID,
    depth: 0,
    draft: true,
    overrideAccess: true,
  })

  if (!page || page.slug !== EXPECTED_SLUG) {
    throw new Error(`Beklenen sayfa bulunamadı: id=${PAGE_ID} slug=${EXPECTED_SLUG} (bulunan: ${page?.slug})`)
  }

  // Mevcut FAQ bloğunu koru (id'ler dahil aynen taşınır)
  const existingFaq = (page.layout || []).find((b: any) => b.blockType === 'faqBlock')

  // Kapanış CTA'sı ("Ready to begin your application?") istek üzerine kaldırıldı
  const newLayout: any[] = [
    introContentBlock,
    requirementsBlock,
    processOverviewBlock,
    financialBlock,
    documentsBlock,
    journeyBlock,
    supportBlock,
    whyUsBlock,
    expectBlock,
    commitmentBlock,
  ]
  if (existingFaq) newLayout.push(existingFaq)

  const data: any = {
    title: 'UK Spouse Visa (Partner Visa)',
    hero: {
      ...hero,
      media: (page as any).hero?.media ?? null, // mevcut arkaplan görseli korunur
    },
    layout: newLayout,
    meta: {
      ...(page as any).meta,
      title: 'UK Spouse Visa (Partner Visa) | Expert Application Help',
      description:
        'UK Spouse Visa help from IAA-regulated advisers. Fixed fees, free eligibility check, £29,000 financial requirement guidance and full application support.',
    },
    _status: 'published',
  }

  console.log(`Sayfa: ${page.id} /${page.slug} "${page.title}"`)
  console.log(`Mevcut blok sayısı: ${(page.layout || []).length} → Yeni: ${newLayout.length}`)
  console.log(`FAQ korundu: ${existingFaq ? 'evet' : 'hayır (mevcut sayfada faqBlock yok)'}`)
  console.log(`Yeni bloklar: ${newLayout.map((b) => b.blockType).join(', ')}`)

  if (!APPLY) {
    console.log('\nDRY RUN — hiçbir şey yazılmadı. Uygulamak için --apply ile çalıştırın.')
    return
  }

  const updated = await payload.update({
    collection: 'pages',
    id: PAGE_ID,
    data,
    depth: 0,
    overrideAccess: true,
    context: { disableRevalidate: true },
  })

  console.log(`\nGüncellendi: /${updated.slug} _status=${(updated as any)._status}`)
}

main()
  .then(() => process.exit(0))
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
