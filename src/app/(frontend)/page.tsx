import type { Metadata } from 'next'

import { PayloadRedirects } from '@/components/PayloadRedirects'
import { type RequiredDataFromCollectionSlug } from 'payload'
import { draftMode } from 'next/headers'
import React, { cache } from 'react'

import { RenderBlocks } from '@/blocks/RenderBlocks'
import { RenderHero } from '@/heros/RenderHero'
import { generateMeta } from '@/utilities/generateMeta'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import { getPayloadInstance } from '@/utilities/getPayloadInstance'
import { StatisticsSection } from '@/components/landing/StatisticsSection'
import { FastTrackSection } from '@/components/landing/FastTrackSection'
import { WhyTrustSection } from '@/components/landing/WhyTrustSection'
import { ExecutiveServiceSection } from '@/components/landing/ExecutiveServiceSection'
import { SimpleSection } from '@/components/landing/SimpleSection'
import { ContactFormSection } from '@/components/landing/ContactFormSection'
import { VisaJourneyCTA } from '@/components/landing/VisaJourneyCTA'
import { HomeFAQ } from '@/components/landing/HomeFAQ'
import { VisaTypesShowcase } from '@/components/landing/VisaTypesShowcase'
import { ProcessTimeline } from '@/components/landing/ProcessTimeline'
import { SuccessStories } from '@/components/landing/SuccessStories'
import { TrustBadges } from '@/components/landing/TrustBadges'
import { MultilingualSupport } from '@/components/landing/MultilingualSupport'

export default async function HomePage() {
  const { isEnabled: draft } = await draftMode()
  const slug = 'home'
  const url = '/'

  const page: RequiredDataFromCollectionSlug<'pages'> | null = await queryPageBySlug({
    slug,
  })


  if (!page) {
    return <PayloadRedirects url={url} />
  }

  const { hero, layout } = page

  return (
    <article>
       <PayloadRedirects disableNotFound url={url} />

      {draft && <LivePreviewListener />}

      <RenderHero {...hero} />
      <div className="hidden">
        <StatisticsSection />
      </div>    
      <RenderBlocks blocks={layout} />
      <VisaTypesShowcase />
      <div className="hidden">
        <WhyTrustSection />
      </div>

      <FastTrackSection />
      <div className="hidden">
        <ExecutiveServiceSection />
      </div>
      <div className="hidden">
      <SimpleSection />
      </div>
      <SuccessStories />  
      <ProcessTimeline />
     
      <MultilingualSupport />
      <HomeFAQ />
      <ContactFormSection />
      <TrustBadges />
      <VisaJourneyCTA />
    </article>
  )
}

export async function generateMetadata(): Promise<Metadata> {
  const page = await queryPageBySlug({
    slug: 'home',
  })

  return generateMeta({ doc: page })
}

const queryPageBySlug = cache(async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = await draftMode()

  const payload = await getPayloadInstance()

  const result = await payload.find({
    collection: 'pages',
    draft,
    limit: 1,
    pagination: false,
    overrideAccess: draft,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  return result.docs?.[0] || null
})
