import { getCachedGlobal } from '@/utilities/getGlobals'
import React from 'react'

import type { Footer } from '@/payload-types'

import { AnimatedFooter } from './AnimatedFooter'

export async function Footer() {
  const footerData: Footer = await getCachedGlobal('footer', 1)()

  const columns = footerData?.columns || []

  // Get the first column for company info (if available)
  const companyColumn = columns[0]
  const companyName = companyColumn?.title || "UK Legal Solutions"
  const companyDescription = "Professional legal services for UK visa applications and immigration matters."

  return (
    <AnimatedFooter 
      columns={columns}
      companyName={companyName}
      companyDescription={companyDescription}
    />
  )
}
