# RFC: Payload CMS - Yeni Block ve Collection Şablonları Oluşturma Rehberi

## 📋 İçindekiler

1. [Proje Genel Bakış](#proje-genel-bakış)
2. [Mevcut Yapı Analizi](#mevcut-yapı-analizi)
3. [Yeni Block Oluşturma](#yeni-block-oluşturma)
4. [Yeni Collection Oluşturma](#yeni-collection-oluşturma)
5. [Örnekler ve Şablonlar](#örnekler-ve-şablonlar)
6. [Terminal Komutları](#terminal-komutları)
7. [Best Practices](#best-practices)
8. [Troubleshooting](#troubleshooting)

---

## 🎯 Proje Genel Bakış

### Teknoloji Stack
- **Framework**: Next.js 15.4.4
- **CMS**: Payload CMS 3.59.1
- **Database**: PostgreSQL (@payloadcms/db-postgres)
- **Rich Text Editor**: Lexical (@payloadcms/richtext-lexical)
- **UI**: React 19 + Tailwind CSS
- **Package Manager**: pnpm

### Mevcut Proje Yapısı

```
src/
├── blocks/              # Yeniden kullanılabilir içerik blokları
├── collections/         # Veri koleksiyonları (Posts, Pages, vb.)
├── components/          # React bileşenleri
├── fields/             # Özel alan tanımları
├── heros/              # Hero bileşenleri
├── hooks/              # Payload hooks
└── utilities/          # Yardımcı fonksiyonlar
```

---

## 🔍 Mevcut Yapı Analizi

### Mevcut Block'lar

1. **ArchiveBlock** (`/blocks/ArchiveBlock/`)
   - Collection'lardan içerik listeler
   - Filtreleme ve sınırlama özellikleri
   - RichText intro içeriği

2. **CallToAction** (`/blocks/CallToAction/`)
   - RichText içerik
   - Link group (max 2 link)
   - Appearance seçenekleri

3. **Content** (`/blocks/Content/`)
   - Kolon bazlı düzen (max 4 kolon)
   - Esnek boyutlandırma (1/3, 1/2, 2/3, full)
   - Her kolonda RichText ve opsiyonel link

4. **FeaturesGrid** & **ServicesGrid**
   - Grid düzeni
   - Özellik/hizmet kartları

5. **MediaBlock**
   - Resim/video gösterimi
   - Farklı pozisyon seçenekleri

6. **Form**
   - Form builder entegrasyonu
   - Çeşitli input tipleri

7. **Banner** & **Code**
   - Post içinde kullanılan özel bloklar

### Mevcut Collection'lar

1. **Pages** (`/collections/Pages/`)
   - Hero section
   - Layout (blocks)
   - SEO meta fields
   - Slug ve publish date

2. **Posts** (`/collections/Posts/`)
   - Hero image
   - RichText content
   - Categories ve related posts
   - SEO meta fields

3. **Categories** (`/collections/Categories.ts`)
   - Basit kategori yönetimi

4. **Media** (`/collections/Media.ts`)
   - Dosya yükleme
   - Vercel Blob storage entegrasyonu

5. **Users** (`/collections/Users/`)
   - Kullanıcı yönetimi
   - Authentication

---

## 🆕 Yeni Block Oluşturma

### Adım 1: Dizin Yapısını Oluştur

```bash
# Yeni block için klasör oluştur
mkdir src/blocks/YourBlockName

# İçinde config ve component dosyaları oluştur
touch src/blocks/YourBlockName/config.ts
touch src/blocks/YourBlockName/Component.tsx
```

### Adım 2: Config Dosyası Oluştur (`config.ts`)

**Temel Şablon:**

```typescript
import type { Block } from 'payload'
import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

export const YourBlockName: Block = {
  slug: 'yourBlockSlug',
  interfaceName: 'YourBlockInterface',
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Block Title',
    },
    {
      name: 'description',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [
            ...rootFeatures,
            HeadingFeature({ enabledHeadingSizes: ['h2', 'h3', 'h4'] }),
            FixedToolbarFeature(),
            InlineToolbarFeature(),
          ]
        },
      }),
      label: 'Description',
      required: false,
    },
  ],
  labels: {
    plural: 'Your Blocks',
    singular: 'Your Block',
  },
}
```

**Field Tipleri:**

| Field Type | Kullanım Alanı | Örnek |
|------------|----------------|-------|
| `text` | Kısa metin | Başlık, isim |
| `textarea` | Uzun metin (düz) | Açıklama |
| `richText` | Biçimlendirilmiş metin | İçerik |
| `number` | Sayısal değer | Fiyat, miktar |
| `email` | Email adresi | İletişim |
| `select` | Seçenek listesi | Kategori |
| `checkbox` | Boolean değer | Aktif/Pasif |
| `relationship` | Başka collection'a referans | Post, Category |
| `upload` | Dosya yükleme | Resim, PDF |
| `array` | Liste/dizi | Özellikler listesi |
| `group` | Alan grubu | İlgili alanları grupla |
| `blocks` | İç içe bloklar | Karmaşık yapılar |

### Adım 3: Component Dosyası Oluştur (`Component.tsx`)

**Temel Şablon:**

```typescript
import React from 'react'
import type { YourBlockInterface } from '@/payload-types'
import { RichText } from '@/components/RichText'

type Props = {
  data: YourBlockInterface
}

export const YourBlockComponent: React.FC<Props> = ({ data }) => {
  const { title, description } = data

  return (
    <div className="container my-16">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-6">{title}</h2>
        {description && (
          <div className="prose prose-lg">
            <RichText data={description} enableGutter={false} />
          </div>
        )}
      </div>
    </div>
  )
}
```

### Adım 4: RenderBlocks'a Ekle

`src/blocks/RenderBlocks.tsx` dosyasını düzenle:

```typescript
// Import ekle
import { YourBlockComponent } from './YourBlockName/Component'

// blockComponents objesine ekle
const blockComponents = {
  // ... mevcut blocklar
  yourBlockSlug: YourBlockComponent,
}
```

### Adım 5: Pages/Posts Collection'larına Ekle

**Pages için** (`src/collections/Pages/index.ts`):

```typescript
// Import ekle
import { YourBlockName } from '../../blocks/YourBlockName/config'

// Layout blocks array'ine ekle
{
  name: 'layout',
  type: 'blocks',
  blocks: [
    CallToAction, 
    Content, 
    MediaBlock, 
    Archive, 
    FormBlock, 
    FeaturesGrid, 
    ServicesGrid,
    YourBlockName, // EKLE
  ],
  required: true,
}
```

### Adım 6: Type Generation

```bash
# Payload type'ları yeniden oluştur
pnpm generate:types
```

---

## 📦 Yeni Collection Oluşturma

### Adım 1: Collection Dosyası Oluştur

**Basit Collection:**

```bash
# Tekil dosya olarak
touch src/collections/YourCollectionName.ts
```

**Kompleks Collection (hooks ile):**

```bash
# Klasör yapısı ile
mkdir src/collections/YourCollectionName
touch src/collections/YourCollectionName/index.ts
mkdir src/collections/YourCollectionName/hooks
```

### Adım 2: Collection Config Oluştur

**Temel Şablon:**

```typescript
import type { CollectionConfig } from 'payload'
import { authenticated } from '../access/authenticated'
import { authenticatedOrPublished } from '../access/authenticatedOrPublished'
import { slugField } from 'payload'

export const YourCollection: CollectionConfig<'yourCollection'> = {
  slug: 'yourCollection',
  
  // Erişim kontrolleri
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },

  // Admin panel ayarları
  admin: {
    defaultColumns: ['title', 'status', 'updatedAt'],
    useAsTitle: 'title',
  },

  // Alanlar
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Başlık',
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Açıklama',
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'draft',
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Published', value: 'published' },
      ],
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        position: 'sidebar',
      },
    },
    slugField(),
  ],

  // Version kontrolü
  versions: {
    drafts: {
      autosave: {
        interval: 100,
      },
      schedulePublish: true,
    },
    maxPerDoc: 50,
  },
}
```

**SEO Destekli Collection Şablonu:**

```typescript
import type { CollectionConfig } from 'payload'
import { authenticated } from '../access/authenticated'
import { authenticatedOrPublished } from '../access/authenticatedOrPublished'
import { slugField } from 'payload'
import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'

export const YourCollection: CollectionConfig<'yourCollection'> = {
  slug: 'yourCollection',
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  admin: {
    defaultColumns: ['title', 'slug', 'updatedAt'],
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'İçerik',
          fields: [
            {
              name: 'content',
              type: 'richText',
              required: true,
            },
          ],
        },
        {
          name: 'meta',
          label: 'SEO',
          fields: [
            OverviewField({
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
              imagePath: 'meta.image',
            }),
            MetaTitleField({ hasGenerateFn: true }),
            MetaImageField({ relationTo: 'media' }),
            MetaDescriptionField({}),
            PreviewField({
              hasGenerateFn: true,
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
            }),
          ],
        },
      ],
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        position: 'sidebar',
      },
    },
    slugField(),
  ],
  versions: {
    drafts: {
      autosave: { interval: 100 },
      schedulePublish: true,
    },
    maxPerDoc: 50,
  },
}
```

### Adım 3: Payload Config'e Ekle

`src/payload.config.ts` dosyasını düzenle:

```typescript
// Import ekle
import { YourCollection } from './collections/YourCollectionName'

// collections array'ine ekle
export default buildConfig({
  collections: [
    Pages,
    Posts,
    Media,
    Categories,
    Users,
    YourCollection, // EKLE
  ],
  // ... diğer ayarlar
})
```

### Adım 4: Type Generation

```bash
# Payload type'ları yeniden oluştur
pnpm generate:types
```

### Adım 5: Frontend Sayfası Oluştur (Opsiyonel)

```bash
# Yeni collection için route oluştur
mkdir -p src/app/\(frontend\)/your-collection
touch src/app/\(frontend\)/your-collection/page.tsx
touch src/app/\(frontend\)/your-collection/page.client.tsx

# Detay sayfası için
mkdir src/app/\(frontend\)/your-collection/\[slug\]
touch src/app/\(frontend\)/your-collection/\[slug\]/page.tsx
```

---

## 🎨 Örnekler ve Şablonlar

### Örnek 1: Testimonial (Referans) Block

#### Terminal Komutları:
```bash
# 1. Dizin oluştur
mkdir src/blocks/TestimonialBlock

# 2. Dosyaları oluştur
touch src/blocks/TestimonialBlock/config.ts
touch src/blocks/TestimonialBlock/Component.tsx

# 3. Type'ları generate et (config'i yazdıktan sonra)
pnpm generate:types
```

#### `config.ts`:
```typescript
import type { Block } from 'payload'

export const Testimonial: Block = {
  slug: 'testimonial',
  interfaceName: 'TestimonialBlock',
  fields: [
    {
      name: 'testimonials',
      type: 'array',
      minRows: 1,
      maxRows: 6,
      fields: [
        {
          name: 'quote',
          type: 'textarea',
          required: true,
          label: 'Alıntı',
        },
        {
          name: 'author',
          type: 'text',
          required: true,
          label: 'Yazar',
        },
        {
          name: 'role',
          type: 'text',
          label: 'Pozisyon',
        },
        {
          name: 'company',
          type: 'text',
          label: 'Şirket',
        },
        {
          name: 'avatar',
          type: 'upload',
          relationTo: 'media',
          label: 'Profil Resmi',
        },
        {
          name: 'rating',
          type: 'number',
          min: 1,
          max: 5,
          label: 'Puan',
        },
      ],
    },
  ],
  labels: {
    plural: 'Referanslar',
    singular: 'Referans',
  },
}
```

#### `Component.tsx`:
```typescript
import React from 'react'
import type { TestimonialBlock } from '@/payload-types'
import { Media } from '@/components/Media'

type Props = {
  data: TestimonialBlock
}

export const TestimonialComponent: React.FC<Props> = ({ data }) => {
  const { testimonials } = data

  return (
    <div className="container my-16">
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {testimonials?.map((testimonial, index) => (
          <div 
            key={index} 
            className="bg-white p-6 rounded-lg shadow-lg"
          >
            <div className="flex items-center mb-4">
              {testimonial.avatar && typeof testimonial.avatar !== 'string' && (
                <div className="w-16 h-16 rounded-full overflow-hidden mr-4">
                  <Media resource={testimonial.avatar} imgClassName="w-full h-full object-cover" />
                </div>
              )}
              <div>
                <h3 className="font-bold">{testimonial.author}</h3>
                {testimonial.role && (
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                )}
                {testimonial.company && (
                  <p className="text-sm text-gray-500">{testimonial.company}</p>
                )}
              </div>
            </div>
            <p className="text-gray-700 italic">"{testimonial.quote}"</p>
            {testimonial.rating && (
              <div className="mt-4 flex">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <span key={i} className="text-yellow-400">★</span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
```

#### Entegrasyon:
```bash
# RenderBlocks.tsx'e ekle (manuel olarak)
# Pages/index.ts'e ekle (manuel olarak)
```

---

### Örnek 2: FAQ (Sık Sorulan Sorular) Block

#### Terminal Komutları:
```bash
mkdir src/blocks/FAQBlock
touch src/blocks/FAQBlock/config.ts
touch src/blocks/FAQBlock/Component.tsx
```

#### `config.ts`:
```typescript
import type { Block } from 'payload'
import {
  FixedToolbarFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

export const FAQ: Block = {
  slug: 'faq',
  interfaceName: 'FAQBlock',
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Başlık',
      defaultValue: 'Sık Sorulan Sorular',
    },
    {
      name: 'questions',
      type: 'array',
      minRows: 1,
      fields: [
        {
          name: 'question',
          type: 'text',
          required: true,
          label: 'Soru',
        },
        {
          name: 'answer',
          type: 'richText',
          required: true,
          label: 'Cevap',
          editor: lexicalEditor({
            features: ({ rootFeatures }) => {
              return [
                ...rootFeatures,
                FixedToolbarFeature(),
                InlineToolbarFeature(),
              ]
            },
          }),
        },
      ],
    },
  ],
  labels: {
    plural: 'SSS Blokları',
    singular: 'SSS Bloğu',
  },
}
```

#### `Component.tsx`:
```typescript
'use client'

import React, { useState } from 'react'
import type { FAQBlock } from '@/payload-types'
import { RichText } from '@/components/RichText'

type Props = {
  data: FAQBlock
}

export const FAQComponent: React.FC<Props> = ({ data }) => {
  const { title, questions } = data
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleQuestion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <div className="container my-16">
      <h2 className="text-3xl font-bold text-center mb-12">{title}</h2>
      <div className="max-w-3xl mx-auto space-y-4">
        {questions?.map((item, index) => (
          <div 
            key={index} 
            className="border border-gray-200 rounded-lg overflow-hidden"
          >
            <button
              onClick={() => toggleQuestion(index)}
              className="w-full p-6 text-left font-semibold flex justify-between items-center hover:bg-gray-50 transition-colors"
            >
              <span>{item.question}</span>
              <span className="text-2xl">
                {openIndex === index ? '−' : '+'}
              </span>
            </button>
            {openIndex === index && (
              <div className="p-6 pt-0 prose prose-sm">
                <RichText data={item.answer} enableGutter={false} />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
```

---

### Örnek 3: Portfolio/Projects Collection

#### Terminal Komutları:
```bash
mkdir src/collections/Projects
touch src/collections/Projects/index.ts
mkdir src/collections/Projects/hooks
touch src/collections/Projects/hooks/revalidateProject.ts
```

#### `index.ts`:
```typescript
import type { CollectionConfig } from 'payload'
import { authenticated } from '../../access/authenticated'
import { authenticatedOrPublished } from '../../access/authenticatedOrPublished'
import { slugField } from 'payload'
import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'
import { lexicalEditor } from '@payloadcms/richtext-lexical'

export const Projects: CollectionConfig<'projects'> = {
  slug: 'projects',
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  defaultPopulate: {
    title: true,
    slug: true,
    thumbnail: true,
  },
  admin: {
    defaultColumns: ['title', 'client', 'status', 'updatedAt'],
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Proje Başlığı',
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Proje Detayları',
          fields: [
            {
              name: 'thumbnail',
              type: 'upload',
              relationTo: 'media',
              required: true,
              label: 'Kapak Görseli',
            },
            {
              name: 'gallery',
              type: 'array',
              label: 'Proje Galeri',
              fields: [
                {
                  name: 'image',
                  type: 'upload',
                  relationTo: 'media',
                  required: true,
                },
              ],
            },
            {
              name: 'description',
              type: 'richText',
              editor: lexicalEditor(),
              required: true,
              label: 'Açıklama',
            },
            {
              name: 'client',
              type: 'text',
              label: 'Müşteri',
            },
            {
              name: 'projectDate',
              type: 'date',
              label: 'Proje Tarihi',
            },
            {
              name: 'technologies',
              type: 'array',
              label: 'Kullanılan Teknolojiler',
              fields: [
                {
                  name: 'tech',
                  type: 'text',
                },
              ],
            },
            {
              name: 'projectUrl',
              type: 'text',
              label: 'Proje URL',
            },
            {
              name: 'githubUrl',
              type: 'text',
              label: 'GitHub URL',
            },
          ],
        },
        {
          label: 'Kategori',
          fields: [
            {
              name: 'categories',
              type: 'relationship',
              relationTo: 'categories',
              hasMany: true,
              label: 'Kategoriler',
            },
            {
              name: 'featured',
              type: 'checkbox',
              label: 'Öne Çıkan Proje',
              defaultValue: false,
            },
          ],
        },
        {
          name: 'meta',
          label: 'SEO',
          fields: [
            OverviewField({
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
              imagePath: 'meta.image',
            }),
            MetaTitleField({ hasGenerateFn: true }),
            MetaImageField({ relationTo: 'media' }),
            MetaDescriptionField({}),
            PreviewField({
              hasGenerateFn: true,
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
            }),
          ],
        },
      ],
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'draft',
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Published', value: 'published' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    slugField(),
  ],
  versions: {
    drafts: {
      autosave: { interval: 100 },
      schedulePublish: true,
    },
    maxPerDoc: 50,
  },
}
```

#### Frontend Sayfaları:
```bash
# Liste sayfası
mkdir -p src/app/\(frontend\)/projects
touch src/app/\(frontend\)/projects/page.tsx

# Detay sayfası
mkdir src/app/\(frontend\)/projects/\[slug\]
touch src/app/\(frontend\)/projects/\[slug\]/page.tsx
```

#### `projects/page.tsx`:
```typescript
import React from 'react'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import configPromise from '@payload-config'
import { Card } from '@/components/Card'

export default async function ProjectsPage() {
  const payload = await getPayloadHMR({ config: configPromise })
  
  const projects = await payload.find({
    collection: 'projects',
    where: {
      status: { equals: 'published' },
    },
    limit: 12,
    sort: '-projectDate',
  })

  return (
    <div className="container my-16">
      <h1 className="text-4xl font-bold mb-12">Projelerimiz</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.docs.map((project) => (
          <Card
            key={project.id}
            doc={project}
            relationTo="projects"
            showCategories
          />
        ))}
      </div>
    </div>
  )
}
```

---

### Örnek 4: Pricing (Fiyatlandırma) Block

#### Terminal Komutları:
```bash
mkdir src/blocks/PricingBlock
touch src/blocks/PricingBlock/config.ts
touch src/blocks/PricingBlock/Component.tsx
```

#### `config.ts`:
```typescript
import type { Block } from 'payload'

export const Pricing: Block = {
  slug: 'pricing',
  interfaceName: 'PricingBlock',
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Başlık',
      defaultValue: 'Fiyatlandırma Planları',
    },
    {
      name: 'subtitle',
      type: 'textarea',
      label: 'Alt Başlık',
    },
    {
      name: 'plans',
      type: 'array',
      minRows: 1,
      maxRows: 4,
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
          label: 'Plan Adı',
        },
        {
          name: 'price',
          type: 'number',
          required: true,
          label: 'Fiyat',
        },
        {
          name: 'currency',
          type: 'text',
          defaultValue: '₺',
          label: 'Para Birimi',
        },
        {
          name: 'period',
          type: 'select',
          defaultValue: 'monthly',
          options: [
            { label: 'Aylık', value: 'monthly' },
            { label: 'Yıllık', value: 'yearly' },
            { label: 'Tek Seferlik', value: 'onetime' },
          ],
        },
        {
          name: 'features',
          type: 'array',
          label: 'Özellikler',
          fields: [
            {
              name: 'feature',
              type: 'text',
              required: true,
            },
          ],
        },
        {
          name: 'highlighted',
          type: 'checkbox',
          label: 'Öne Çıkan Plan',
          defaultValue: false,
        },
        {
          name: 'buttonText',
          type: 'text',
          defaultValue: 'Başla',
          label: 'Buton Metni',
        },
        {
          name: 'buttonLink',
          type: 'text',
          label: 'Buton Linki',
        },
      ],
    },
  ],
  labels: {
    plural: 'Fiyatlandırma Blokları',
    singular: 'Fiyatlandırma Bloğu',
  },
}
```

#### `Component.tsx`:
```typescript
import React from 'react'
import type { PricingBlock } from '@/payload-types'
import Link from 'next/link'

type Props = {
  data: PricingBlock
}

export const PricingComponent: React.FC<Props> = ({ data }) => {
  const { title, subtitle, plans } = data

  const periodLabels = {
    monthly: '/ay',
    yearly: '/yıl',
    onetime: '',
  }

  return (
    <div className="container my-16">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold mb-4">{title}</h2>
        {subtitle && (
          <p className="text-xl text-gray-600">{subtitle}</p>
        )}
      </div>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {plans?.map((plan, index) => (
          <div
            key={index}
            className={`rounded-lg p-8 ${
              plan.highlighted
                ? 'bg-blue-600 text-white transform scale-105 shadow-2xl'
                : 'bg-white border-2 border-gray-200'
            }`}
          >
            <h3 className="text-2xl font-bold mb-4">{plan.name}</h3>
            <div className="mb-6">
              <span className="text-4xl font-bold">
                {plan.currency}{plan.price}
              </span>
              <span className="text-lg">
                {periodLabels[plan.period as keyof typeof periodLabels]}
              </span>
            </div>
            
            <ul className="space-y-3 mb-8">
              {plan.features?.map((item, idx) => (
                <li key={idx} className="flex items-start">
                  <svg
                    className={`w-5 h-5 mr-2 mt-0.5 ${
                      plan.highlighted ? 'text-white' : 'text-green-500'
                    }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>{item.feature}</span>
                </li>
              ))}
            </ul>
            
            {plan.buttonLink && (
              <Link
                href={plan.buttonLink}
                className={`block text-center py-3 px-6 rounded-lg font-semibold transition-colors ${
                  plan.highlighted
                    ? 'bg-white text-blue-600 hover:bg-gray-100'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                {plan.buttonText}
              </Link>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
```

---

## 🔧 Terminal Komutları

### Geliştirme

```bash
# Development server başlat (Port 3000)
pnpm dev

# Production build oluştur
pnpm build

# Production server başlat
pnpm start

# Production modunda test
pnpm dev:prod
```

### Payload CMS

```bash
# Type'ları generate et (her config değişikliğinde)
pnpm generate:types

# Import map generate et
pnpm generate:importmap

# Payload CLI
pnpm payload

# Seed data (test verisi oluştur)
pnpm payload seed
```

### Linting & Formatting

```bash
# Lint kontrolü
pnpm lint

# Lint otomatik düzeltme
pnpm lint:fix
```

### Testing

```bash
# Tüm testleri çalıştır
pnpm test

# Integration testleri
pnpm test:int

# E2E testleri
pnpm test:e2e
```

### Package Management

```bash
# Dependency yükleme
pnpm install

# Yeni package ekle
pnpm add [package-name]

# Dev dependency ekle
pnpm add -D [package-name]

# Tüm dependency'leri yeniden yükle
pnpm reinstall
```

### Git İşlemleri

```bash
# Değişiklikleri görüntüle
git status

# Dosya ekle
git add .

# Commit oluştur
git commit -m "feat: add new testimonial block"

# Push
git push origin main

# Branch oluştur
git checkout -b feature/new-block

# Branch'i merge et
git checkout main
git merge feature/new-block
```

### Yeni Block/Collection Oluşturma Workflow

```bash
# 1. Block için
mkdir src/blocks/YourBlock
touch src/blocks/YourBlock/{config.ts,Component.tsx}

# 2. Collection için
mkdir -p src/collections/YourCollection/hooks
touch src/collections/YourCollection/index.ts

# 3. Type'ları generate et
pnpm generate:types

# 4. Dev server'ı restart et (gerekirse)
# Ctrl+C ile durdur, sonra:
pnpm dev

# 5. Test et
# Admin panel: http://localhost:3007/admin
# Frontend: http://localhost:3007
```

---

## 🎯 Best Practices

### 1. Naming Conventions

**Block İsimlendirme:**
- PascalCase kullan: `TestimonialBlock`, `PricingBlock`
- `Block` soneki ekle
- Slug kebab-case: `testimonial`, `pricing`

**Collection İsimlendirme:**
- PascalCase, çoğul: `Projects`, `Testimonials`
- Slug camelCase, çoğul: `projects`, `testimonials`

**Component İsimlendirme:**
- Component dosyası: `Component.tsx`
- Export: `YourBlockComponent`

### 2. Dizin Yapısı

```
src/blocks/YourBlock/
├── config.ts          # Block config
├── Component.tsx      # React component
└── Component.client.tsx  # Client component (gerekirse)

src/collections/YourCollection/
├── index.ts          # Collection config
└── hooks/            # Collection hooks
    ├── revalidateYourCollection.ts
    └── populateRelations.ts
```

### 3. Field Organization

**Logical Grouping:** İlgili alanları grupla

```typescript
{
  type: 'group',
  name: 'socialMedia',
  fields: [
    { name: 'twitter', type: 'text' },
    { name: 'linkedin', type: 'text' },
    { name: 'github', type: 'text' },
  ],
}
```

**Tabs Kullan:** Karmaşık form'ları böl

```typescript
{
  type: 'tabs',
  tabs: [
    { label: 'İçerik', fields: [...] },
    { label: 'Medya', fields: [...] },
    { label: 'SEO', fields: [...] },
  ],
}
```

### 4. Access Control

**Standart Access Patterns:**

```typescript
// Sadece admin
access: {
  create: authenticated,
  read: authenticated,
  update: authenticated,
  delete: authenticated,
}

// Public okuma, admin düzenleme
access: {
  create: authenticated,
  read: () => true,
  update: authenticated,
  delete: authenticated,
}

// Published içerik public
access: {
  create: authenticated,
  read: authenticatedOrPublished,
  update: authenticated,
  delete: authenticated,
}
```

### 5. Performance Optimization

**Default Populate:** Sadece gerekli alanları getir

```typescript
defaultPopulate: {
  title: true,
  slug: true,
  thumbnail: true,
  // İlişkili koleksiyonları dahil etme (performans)
}
```

**Limit ve Pagination:** Her zaman limit kullan

```typescript
const results = await payload.find({
  collection: 'posts',
  limit: 10,
  page: 1,
})
```

### 6. Rich Text Konfigürasyonu

**Minimal Özelliklere Sahip:**

```typescript
editor: lexicalEditor({
  features: ({ rootFeatures }) => {
    return [
      ...rootFeatures,
      HeadingFeature({ enabledHeadingSizes: ['h2', 'h3'] }),
      FixedToolbarFeature(),
      InlineToolbarFeature(),
    ]
  },
})
```

### 7. Validation ve Required Fields

```typescript
{
  name: 'email',
  type: 'email',
  required: true,
  validate: (value) => {
    if (!value?.includes('@')) {
      return 'Geçerli bir email adresi giriniz'
    }
    return true
  },
}
```

### 8. Admin UI Optimization

```typescript
admin: {
  defaultColumns: ['title', 'status', 'updatedAt'], // Liste görünümü
  useAsTitle: 'title', // Başlık alanı
  group: 'Content', // Admin panelde gruplama
  description: 'Proje portföyünüzü yönetin', // Açıklama
}
```

### 9. Conditional Fields

```typescript
{
  name: 'customUrl',
  type: 'text',
  admin: {
    condition: (data, siblingData) => {
      return siblingData.useCustomUrl === true
    },
  },
}
```

### 10. Type Safety

**Her zaman TypeScript type'larını kullan:**

```typescript
import type { TestimonialBlock } from '@/payload-types'

type Props = {
  data: TestimonialBlock
}
```

---

## 🛠️ Troubleshooting

### Sık Karşılaşılan Sorunlar ve Çözümler

#### 1. Type Hataları

**Sorun:** `Property 'yourField' does not exist on type...`

**Çözüm:**
```bash
pnpm generate:types
# Server'ı restart et
```

#### 2. Block Görünmüyor

**Kontrol Listesi:**
- [ ] `config.ts` doğru export ediliyor mu?
- [ ] `RenderBlocks.tsx`'e eklendi mi?
- [ ] Pages/Posts collection'ına eklendi mi?
- [ ] Type'lar generate edildi mi?
- [ ] Server restart edildi mi?

#### 3. Collection Admin Panelde Görünmüyor

**Kontrol Listesi:**
- [ ] `payload.config.ts`'e eklendi mi?
- [ ] Collection slug unique mi?
- [ ] Access control doğru mu?
- [ ] Type'lar generate edildi mi?

#### 4. RichText Render Olmuyor

**Çözüm:**
```typescript
// RichText component'ini kullan
import { RichText } from '@/components/RichText'

<RichText data={data.yourRichTextField} enableGutter={false} />
```

#### 5. Media/Upload Alanları Çalışmıyor

**Kontrol:**
- Vercel Blob veya başka storage konfigürasyonu yapıldı mı?
- `relationTo: 'media'` doğru mu?
- Media collection var mı?

#### 6. Slug Çakışması

**Sorun:** "Collection with slug 'xyz' already exists"

**Çözüm:** Her collection/block için unique slug kullan

#### 7. Database Connection Hataları

**Çözüm:**
```bash
# .env dosyasını kontrol et
DATABASE_URI=postgresql://user:pass@host:port/dbname

# PostgreSQL çalışıyor mu?
# Docker kullanıyorsan:
docker-compose up -d
```

#### 8. Port Zaten Kullanımda

**Çözüm:**
```bash
# Farklı port kullan
PORT=3000 pnpm dev

# veya package.json'da:
"dev": "cross-env PORT=3000 next dev"
```

---

## 📚 Ek Kaynaklar

### Payload CMS Docs
- [Official Documentation](https://payloadcms.com/docs)
- [Fields API](https://payloadcms.com/docs/fields/overview)
- [Collections](https://payloadcms.com/docs/configuration/collections)
- [Blocks](https://payloadcms.com/docs/fields/blocks)
- [Access Control](https://payloadcms.com/docs/access-control/overview)

### Proje Specific
- Admin Panel: `http://localhost:3000/admin`
- GraphQL Playground: `http://localhost:3000/api/graphql-playground`
- REST API: `http://localhost:3000/api`

### Kullanışlı Komutlar (Hızlı Referans)

```bash
# Yeni Block
mkdir src/blocks/YourBlock && touch src/blocks/YourBlock/{config.ts,Component.tsx}

# Yeni Collection
mkdir -p src/collections/YourCollection/hooks && touch src/collections/YourCollection/index.ts

# Type Generate & Dev
pnpm generate:types && pnpm dev

# Full Cleanup & Restart
pnpm reinstall && pnpm build && pnpm start
```

---

## 🎓 Sonuç ve Sonraki Adımlar

Bu RFC dokümanını kullanarak:

1. ✅ Mevcut yapıyı anladınız
2. ✅ Yeni block'lar oluşturabilirsiniz
3. ✅ Yeni collection'lar ekleyebilirsiniz
4. ✅ Terminal komutlarını biliyorsunuz
5. ✅ Best practices'leri öğrendiniz

### Önerilen Sıra:

1. **Basit Block ile Başla:** Testimonial gibi basit bir block oluştur
2. **Component Geliştir:** Block'un frontend component'ini yaz
3. **Test Et:** Admin panelden ekle, frontend'de görüntüle
4. **Collection Ekle:** Projects gibi bir collection oluştur
5. **İleri Seviye:** İlişkiler, hooks ve custom validations ekle

### İletişim ve Destek

Sorunlarla karşılaşırsanız:
- Payload CMS Discord: [discord.gg/payload](https://discord.gg/payload)
- GitHub Issues
- Stack Overflow

---

**Son Güncelleme:** 2025-01-11
**Payload CMS Versiyon:** 3.59.1
**Next.js Versiyon:** 15.4.4

