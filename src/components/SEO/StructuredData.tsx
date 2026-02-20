'use client'

import React from 'react'
import { getServerSideURL } from '@/utilities/getURL'

interface StructuredDataProps {
  type?: 'Organization' | 'LocalBusiness'
  pageUrl?: string
}

export const StructuredData: React.FC<StructuredDataProps> = ({ 
  type = 'Organization',
  pageUrl 
}) => {
  const baseUrl = typeof window !== 'undefined' 
    ? window.location.origin 
    : getServerSideURL()
  
  const currentUrl = pageUrl || baseUrl

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'UK Immigration Helpline',
    alternateName: 'Haleys Solicitors',
    url: baseUrl,
    logo: `${baseUrl}/new-logo.png`,
    description: 'Expert UK immigration and visa services. Professional advice from regulated immigration lawyers.',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '422 Pitsmoor Road',
      addressLocality: 'Sheffield',
      addressRegion: 'South Yorkshire',
      postalCode: 'S3 9AY',
      addressCountry: 'GB',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '01143214047',
      contactType: 'Customer Service',
      areaServed: 'GB',
      availableLanguage: ['en'],
    },
    sameAs: [
      // Social media links buraya eklenebilir
    ],
  }

  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'LegalService',
    name: 'UK Immigration Helpline',
    image: `${baseUrl}/new-logo.png`,
    '@id': currentUrl,
    url: baseUrl,
    telephone: '01143214047',
    email: 'info@ukimmigrationhelpline.com',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '422 Pitsmoor Road',
      addressLocality: 'Sheffield',
      addressRegion: 'South Yorkshire',
      postalCode: 'S3 9AY',
      addressCountry: 'GB',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 53.3811,
      longitude: -1.4701,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '09:00',
        closes: '17:30',
      },
    ],
    priceRange: '$$',
    areaServed: {
      '@type': 'Country',
      name: 'United Kingdom',
    },
    serviceType: 'Immigration Law Services',
    description: 'Expert UK immigration and visa services. Professional advice from regulated immigration lawyers.',
  }

  const schema = type === 'LocalBusiness' ? localBusinessSchema : organizationSchema

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

