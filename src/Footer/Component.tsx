import { getCachedGlobal } from '@/utilities/getGlobals'
import React from 'react'

import type { Footer } from '@/payload-types'

import { CMSLink } from '@/components/Link'

export async function Footer() {
  const footerData: Footer = await getCachedGlobal('footer', 1)()

  const columns = footerData?.columns || []
  const columnRows = []
  for (let i = 0; i < columns.length; i += 5) {
    columnRows.push(columns.slice(i, i + 5))
  }

  return (
    <footer className="mt-auto bg-gradient-to-br from-gray-50 to-green-50/30 text-gray-800">
      {/* Ana İçerik Alanı */}
      <div className="container mx-auto px-4 py-12">
        {/* Kolonlar */}
        {columnRows.map((row, rowIndex) => (
          <div key={rowIndex} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 mb-8">
            {row.map((column, colIndex) => (
              <div key={colIndex} className="space-y-3">
                <h3 className="font-bold text-blue-600 text-lg">
                  {column.title}
                </h3>
                <ul className="space-y-2">
                  {column.navItems?.map(({ link }, i) => {
                    if (!link) return null
                    return (
                      <li key={i}>
                        <CMSLink 
                          className="text-gray-700 hover:text-blue-600 transition-colors duration-200" 
                          {...link} 
                        />
                      </li>
                    )
                  })}
                </ul>
              </div>
            ))}
          </div>
        ))}
      </div>
    </footer>
  )
}
