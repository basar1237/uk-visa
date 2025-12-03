import type { Metadata } from 'next'

import type { Media, Page, Post, Config } from '../payload-types'

import { mergeOpenGraph } from './mergeOpenGraph'
import { getServerSideURL } from './getURL'

const getImageURL = (image?: Media | Config['db']['defaultIDType'] | null) => {
  const serverUrl = getServerSideURL()

  let url = serverUrl + '/website-template-OG.webp'

  if (image && typeof image === 'object' && 'url' in image) {
    const ogUrl = image.sizes?.og?.url

    url = ogUrl ? serverUrl + ogUrl : serverUrl + image.url
  }

  return url
}

export const generateMeta = async (args: {
  doc: Partial<Page> | Partial<Post> | null
}): Promise<Metadata> => {
  const { doc } = args

  const ogImage = getImageURL(doc?.meta?.image)

  const title = doc?.meta?.title
    ? doc?.meta?.title + ' | UK Immigration Helpline'
    : 'UK Immigration Helpline - Expert Visa & Immigration Services'

  // Canonical URL sabit olarak ayarlandı
  const CANONICAL_BASE_URL = 'https://www.ukimmigrationhelpline.com'
  const slug = Array.isArray(doc?.slug) ? doc?.slug.join('/') : (doc?.slug || '/')
  const canonicalUrl = slug === 'home' ? CANONICAL_BASE_URL : `${CANONICAL_BASE_URL}/${slug}`

  return {
    description: doc?.meta?.description || 'Expert UK immigration and visa services. Professional advice from regulated immigration lawyers.',
    openGraph: mergeOpenGraph({
      description: doc?.meta?.description || '',
      images: ogImage
        ? [
            {
              url: ogImage,
              width: 1200,
              height: 630,
            },
          ]
        : undefined,
      title,
      url: canonicalUrl,
    }),
    title,
    alternates: {
      canonical: canonicalUrl,
    },
  }
}
