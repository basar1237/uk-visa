'use client'

import React, { useState } from 'react'
import { ChevronDown, ChevronRight } from 'lucide-react'

import type { Header as HeaderType } from '@/payload-types'

import { CMSLink } from '@/components/Link'

export const HeaderNav: React.FC<{ data: HeaderType }> = ({ data }) => {
  const navItems = data?.navItems || []
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null)
  const [hoverTimeout, setHoverTimeout] = useState<NodeJS.Timeout | null>(null)

  return (
    <nav className="flex gap-5 items-center">
      {navItems.map((navItem, i) => {
        const { link, hasDropdown, dropdownItems } = navItem

        return (
          <div 
            key={i}
            className="relative"
            onMouseEnter={() => {
              if (hoverTimeout) {
                clearTimeout(hoverTimeout)
                setHoverTimeout(null)
              }
              if (hasDropdown) {
                setActiveDropdown(i)
              }
            }}
            onMouseLeave={() => {
              const timeout = setTimeout(() => {
                setActiveDropdown(null)
              }, 150)
              setHoverTimeout(timeout)
            }}
          >
            <div className="flex items-center space-x-1 mb-3">
              <CMSLink 
                {...link} 
                appearance="link"
                className="transition-colors"
              />
              {hasDropdown && (
                <ChevronDown className="w-6 h-6" />
              )}
            </div>
            {hasDropdown && dropdownItems && activeDropdown === i && (
                <div 
                  className="absolute top-full left-0 w-56 bg-gray-600 hover:bg-gray-400 rounded-lg shadow-xl z-50"
                onMouseEnter={() => {
                  if (hoverTimeout) {
                    clearTimeout(hoverTimeout)
                    setHoverTimeout(null)
                  }
                  setActiveDropdown(i)
                }}
                onMouseLeave={() => {
                  const timeout = setTimeout(() => {
                    setActiveDropdown(null)
                  }, 150)
                  setHoverTimeout(timeout)
                }}
                style={{ marginTop: '0px', paddingTop: '8px' }}
              >
                <div className="flex items-center p-4">
                  {dropdownItems.map((dropdownItem, j) => (
                    <div key={j} className="relative group">
                      {dropdownItem.titleLink?.link && (
                        <div className="flex items-center space-x-1">
                          <CMSLink
                            {...dropdownItem.titleLink.link}
                            className="text-white font-medium text-sm block whitespace-nowrap"
                          />
                          {dropdownItem.hasSubDropdown && (
                            <ChevronRight className="w-4 h-4 text-white" />
                          )}
                        </div>
                      )}
                      {dropdownItem.hasSubDropdown && dropdownItem.items && (
                        <div className="absolute top-0 left-full ml-2 bg-gray-700 rounded-lg shadow-lg p-3 min-w-[200px] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                          <ul className="space-y-2">
                            {dropdownItem.items.map((item, k) => (
                              <li key={k}>
                                <CMSLink
                                  {...item.link}
                                  className="text-gray-300 hover:text-white transition-colors text-sm block py-1"
                                />
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )
      })}
    </nav>
  )
}
