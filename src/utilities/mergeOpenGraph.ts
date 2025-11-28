import type { Metadata } from 'next'
import { getServerSideURL } from './getURL'

const defaultOpenGraph: Metadata['openGraph'] = {
  type: 'website',
  description: 'Expert UK immigration and visa services. Get professional advice from regulated immigration lawyers. Fast-track services available. Book your free consultation today.',
  images: [
    {
      url: `${getServerSideURL()}/website-template-OG.webp`,
      width: 1200,
      height: 630,
      alt: 'UK Immigration Helpline - Expert Immigration Services',
    },
  ],
  siteName: 'UK Immigration Helpline',
  title: 'UK Immigration Helpline - Expert Visa & Immigration Services',
  locale: 'en_GB',
}

export const mergeOpenGraph = (og?: Metadata['openGraph']): Metadata['openGraph'] => {
  return {
    ...defaultOpenGraph,
    ...og,
    images: og?.images ? og.images : defaultOpenGraph.images,
  }
}
