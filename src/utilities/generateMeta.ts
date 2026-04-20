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

const HOME_TITLE = 'UK Visa & Immigration Services | Expert Immigration Lawyers'
const HOME_DESCRIPTION =
  'Expert UK immigration and visa services from regulated lawyers. Visa applications, appeals, settlement, citizenship and sponsor licences. Free initial consultation.'
const DEFAULT_DESCRIPTION =
  'Expert UK immigration and visa services. Professional advice from regulated immigration lawyers. Fast-track services available. Book your consultation today.'

const isGenericTitle = (value?: string | null) => {
  if (!value) return true
  const normalized = value.trim().toLowerCase()
  return normalized === '' || normalized === 'home' || normalized === 'homepage'
}

export const generateMeta = async (args: {
  doc: Partial<Page> | Partial<Post> | null
}): Promise<Metadata> => {
  const { doc } = args

  const ogImage = getImageURL(doc?.meta?.image)

  // Canonical URL sabit olarak ayarlandı
  const CANONICAL_BASE_URL = 'https://www.ukimmigrationhelpline.com'
  const slug = Array.isArray(doc?.slug) ? doc?.slug.join('/') : (doc?.slug || '/')
  const isHome = slug === 'home' || slug === '/'
  const canonicalUrl = isHome ? CANONICAL_BASE_URL : `${CANONICAL_BASE_URL}/${slug}`

  // Home sayfası için absolute title (layout template'i `%s | UK Immigration Helpline`
  // eklemesin diye). CMS'ten gelen title generic ("HomePage" vb.) ise de override edilir.
  const rawTitle = doc?.meta?.title
  const title: Metadata['title'] = isHome || isGenericTitle(rawTitle)
    ? { absolute: HOME_TITLE }
    : (rawTitle as string)

  const description =
    doc?.meta?.description || (isHome ? HOME_DESCRIPTION : DEFAULT_DESCRIPTION)

  const ogTitle = isHome || isGenericTitle(rawTitle)
    ? HOME_TITLE
    : `${rawTitle} | UK Immigration Helpline`

  return {
    description,
    openGraph: mergeOpenGraph({
      description,
      images: ogImage
        ? [
            {
              url: ogImage,
              width: 1200,
              height: 630,
            },
          ]
        : undefined,
      title: ogTitle,
      url: canonicalUrl,
    }),
    title,
    alternates: {
      canonical: canonicalUrl,
    },
  }
}
