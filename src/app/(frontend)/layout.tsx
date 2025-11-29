import type { Metadata } from 'next'

import { cn } from '@/utilities/ui'
import { GeistMono } from 'geist/font/mono'
import { GeistSans } from 'geist/font/sans'
import React from 'react'

import { Footer } from '@/Footer/Component'
import { Header } from '@/Header/Component'
import { Providers } from '@/providers'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import { WhatsAppButton } from '@/components/WhatsAppButton'
import { TawkToWidget } from '@/components/TawkToWidget'
import { GoogleAnalytics } from '@/components/GoogleAnalytics'
import { Analytics } from '@vercel/analytics/react'

import './globals.css'
import { getServerSideURL } from '@/utilities/getURL'

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html className={cn(GeistSans.variable, GeistMono.variable)} lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5, user-scalable=yes" />
        <link href="/favicon.ico" rel="icon" sizes="32x32" />
        <link href="/favicon.svg" rel="icon" type="image/svg+xml" />
      </head>
      <body>
        <GoogleAnalytics />
        <Analytics />
        <Providers>
          <Header />
          {children}
          <Footer />
          <WhatsAppButton />
          <TawkToWidget />
        </Providers>
      </body>
    </html>
  )
}

export const metadata: Metadata = {
  metadataBase: new URL(getServerSideURL()),
  title: {
    default: 'UK Immigration Helpline - Expert Visa & Immigration Services',
    template: '%s | UK Immigration Helpline',
  },
  openGraph: mergeOpenGraph(),
  twitter: {
    card: 'summary_large_image',
    creator: '@ukimmigrationhelpline',
    site: '@ukimmigrationhelpline',
  },
  keywords: [
    'UK immigration',
    'UK visa',
    'immigration lawyer',
    'UK visa application',
    'immigration advice',
    'UK visa services',
    'UK immigration helpline',
    'visa consultation',
    'UK settlement',
    'immigration solicitor',
  ],
  authors: [{ name: 'UK Immigration Helpline' }],
  creator: 'UK Immigration Helpline',
  publisher: 'UK Immigration Helpline',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    // Google Search Console verification - Vercel environment variable'dan alınacak
    google: process.env.GOOGLE_SITE_VERIFICATION,
  },
}
