import React from 'react'
import { getServerSideURL } from '@/utilities/getURL'

type BreadcrumbItem = { name: string; url: string }
type FaqItem = { question: string; answer: string }

type StructuredDataProps =
  | { type?: 'Organization'; pageUrl?: string }
  | { type: 'LocalBusiness'; pageUrl?: string }
  | { type: 'BreadcrumbList'; breadcrumbs: BreadcrumbItem[]; pageUrl?: string }
  | { type: 'FAQPage'; faqs: FaqItem[]; pageUrl?: string }
  | {
      type: 'LegalService'
      serviceName: string
      description?: string
      pageUrl?: string
    }

const ADDRESS = {
  '@type': 'PostalAddress',
  streetAddress: '422 Pitsmoor Road',
  addressLocality: 'Sheffield',
  addressRegion: 'South Yorkshire',
  postalCode: 'S3 9AY',
  addressCountry: 'GB',
} as const

const GEO = {
  '@type': 'GeoCoordinates',
  latitude: 53.3811,
  longitude: -1.4701,
} as const

const OPENING_HOURS = [
  {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    opens: '09:00',
    closes: '17:30',
  },
] as const

export const StructuredData: React.FC<StructuredDataProps> = (props) => {
  const baseUrl = getServerSideURL()
  const currentUrl = props.pageUrl || baseUrl

  let schema: Record<string, unknown> | null = null

  switch (props.type) {
    case 'BreadcrumbList': {
      schema = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: props.breadcrumbs.map((b, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          name: b.name,
          item: b.url.startsWith('http') ? b.url : `${baseUrl}${b.url}`,
        })),
      }
      break
    }

    case 'FAQPage': {
      schema = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: props.faqs.map((f) => ({
          '@type': 'Question',
          name: f.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: f.answer,
          },
        })),
      }
      break
    }

    case 'LegalService': {
      schema = {
        '@context': 'https://schema.org',
        '@type': 'LegalService',
        name: props.serviceName,
        provider: {
          '@type': 'LegalService',
          name: 'UK Immigration Helpline',
          url: baseUrl,
          telephone: '01143214047',
          email: 'info@ukimmigrationhelpline.com',
          address: ADDRESS,
        },
        url: currentUrl,
        areaServed: { '@type': 'Country', name: 'United Kingdom' },
        serviceType: 'Immigration Law Services',
        description:
          props.description ||
          `${props.serviceName} — expert UK immigration legal support from regulated immigration lawyers.`,
      }
      break
    }

    case 'LocalBusiness': {
      schema = {
        '@context': 'https://schema.org',
        '@type': 'LegalService',
        name: 'UK Immigration Helpline',
        image: `${baseUrl}/new-logo.png`,
        '@id': currentUrl,
        url: baseUrl,
        telephone: '01143214047',
        email: 'info@ukimmigrationhelpline.com',
        address: ADDRESS,
        geo: GEO,
        openingHoursSpecification: OPENING_HOURS,
        priceRange: '$$',
        areaServed: { '@type': 'Country', name: 'United Kingdom' },
        serviceType: 'Immigration Law Services',
        description:
          'Expert UK immigration and visa services. Professional advice from regulated immigration lawyers.',
      }
      break
    }

    case 'Organization':
    default: {
      schema = {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'UK Immigration Helpline',
        alternateName: 'Haleys Solicitors',
        url: baseUrl,
        logo: `${baseUrl}/new-logo.png`,
        description:
          'Expert UK immigration and visa services. Professional advice from regulated immigration lawyers.',
        address: ADDRESS,
        contactPoint: {
          '@type': 'ContactPoint',
          telephone: '01143214047',
          contactType: 'Customer Service',
          areaServed: 'GB',
          availableLanguage: ['en'],
        },
        sameAs: [],
      }
      break
    }
  }

  if (!schema) return null

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
