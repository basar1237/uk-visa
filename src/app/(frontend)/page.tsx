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
import EligibilityCheckComponent from '@/app/(frontend)/eligibility-check/EligibilityCheckComponent'

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
      {/* Allows redirects for valid pages too */}
      <PayloadRedirects disableNotFound url={url} />

      {draft && <LivePreviewListener />}

      <RenderHero {...hero} />

      {/* Eligibility Check Form */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                UK Visa Eligibility Check
              </h2>
              <p className="text-lg text-gray-600">
                Find out if you&apos;re eligible for a UK visa in just a few minutes
              </p>
            </div>
            <EligibilityCheckComponent />
          </div>
        </div>
      </section>

      <RenderBlocks blocks={layout} />
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
