import { HeaderClient } from './Component.client'
import { getCachedGlobal } from '@/utilities/getGlobals'
import React from 'react'

import type { Header } from '@/payload-types'

export async function Header() {
  try {
    const getCachedHeader = getCachedGlobal('header', 2)
    const headerData = await getCachedHeader()

    if (!headerData) {
      // Fallback default header
      const defaultHeader: Partial<Header> = {
        navItems: [],
        phoneNumber: '+44 7858 780841',
      }
      return <HeaderClient data={defaultHeader as Header} />
    }

    return <HeaderClient data={headerData as Header} />
  } catch (_error) {
    // Fallback on error
    const defaultHeader: Partial<Header> = {
      navItems: [],
      phoneNumber: '+44 7858 780841',
    }
    return <HeaderClient data={defaultHeader as Header} />
  }
}
