import { HeaderClient } from './Component.client'
import { getPayloadInstance } from '@/utilities/getPayloadInstance'
import React from 'react'

import type { Header } from '@/payload-types'

export async function Header() {
  try {
    const payload = await getPayloadInstance()
    const headerData = await payload.findGlobal({
      slug: 'header',
      depth: 2, // Reference'ları populate etmek için depth artırıldı
    })
    
    if (!headerData) {
      // Fallback default header
      const defaultHeader: Partial<Header> = {
        navItems: [],
        phoneNumber: ' 02037288948',
      }
      return <HeaderClient data={defaultHeader as Header} />
    }

    return <HeaderClient data={headerData as Header} />
  } catch (_error) {
    // Fallback on error
    const defaultHeader: Partial<Header> = {
      navItems: [],
      phoneNumber: ' 02037288948',
    }
    return <HeaderClient data={defaultHeader as Header} />
  }
}
