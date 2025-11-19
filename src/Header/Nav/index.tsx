'use client'

import React, { useState } from 'react'
import { ChevronDown, ChevronRight, ChevronUp } from 'lucide-react'

import type { Header as HeaderType } from '@/payload-types'

import { CMSLink } from '@/components/Link'

interface HeaderNavProps {
  data: HeaderType
  isMobile?: boolean
  onLinkClick?: () => void
}

export const HeaderNav: React.FC<HeaderNavProps> = ({ data, isMobile = false, onLinkClick }) => {
  const navItems = data?.navItems || []
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null)
  const [hoverTimeout, setHoverTimeout] = useState<NodeJS.Timeout | null>(null)
  const [mobileOpenDropdowns, setMobileOpenDropdowns] = useState<Set<number>>(new Set())

  const toggleMobileDropdown = (index: number) => {
    const newOpenDropdowns = new Set(mobileOpenDropdowns)
    if (newOpenDropdowns.has(index)) {
      newOpenDropdowns.delete(index)
    } else {
      newOpenDropdowns.add(index)
    }
    setMobileOpenDropdowns(newOpenDropdowns)
  }

  if (isMobile) {
    return (
      <nav className="flex flex-col space-y-4">
        {navItems.map((navItem, i) => {
          const { link, hasDropdown, dropdownItems } = navItem
          const isDropdownOpen = mobileOpenDropdowns.has(i)

          return (
            <div key={i} className="border-b border-gray-200 pb-4 last:border-b-0">
              {link && (
                <div className="flex items-center justify-between">
                  <CMSLink 
                    {...link} 
                    appearance="link"
                    className="transition-colors text-gray-900 hover:text-blue-600 text-lg font-medium"
                    onClick={hasDropdown ? (e) => {
                      e?.preventDefault()
                      e?.stopPropagation()
                      toggleMobileDropdown(i)
                    } : onLinkClick}
                  />
                  {hasDropdown && (
                    <button
                      onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        toggleMobileDropdown(i)
                      }}
                      className="p-2 text-gray-600 hover:text-gray-900 transition-colors"
                    >
                      {isDropdownOpen ? (
                        <ChevronUp className="w-5 h-5" />
                      ) : (
                        <ChevronDown className="w-5 h-5" />
                      )}
                    </button>
                  )}
                </div>
              )}
              
              {hasDropdown && dropdownItems && isDropdownOpen && (
                <div className="mt-4 ml-4 space-y-4">
                  {dropdownItems.map((dropdownItem, j) => (
                    <div key={j}>
                      {dropdownItem.titleLink?.link && (
                        <div className="mb-2">
                          <CMSLink
                            {...dropdownItem.titleLink.link}
                            className="text-gray-700 font-medium text-base block py-2"
                            onClick={onLinkClick}
                          />
                        </div>
                      )}
                      {dropdownItem.hasSubDropdown && dropdownItem.items && (
                        <div className="ml-4 space-y-2">
                          {dropdownItem.items.map((item, k) => {
                            if (!item.link) return null
                            return (
                              <CMSLink
                                key={k}
                                {...item.link}
                                className="text-gray-600 hover:text-blue-600 transition-colors text-sm block py-1"
                                onClick={onLinkClick}
                              />
                            )
                          })}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )
        })}
      </nav>
    )
  }

  // Desktop version
  return (
    <nav className="flex gap-1 xl:gap-2 2xl:gap-3 items-center overflow-hidden justify-center">
      {navItems.map((navItem, i) => {
        const { link, hasDropdown, dropdownItems } = navItem

        return (
          <div 
            key={i}
            className="relative flex-shrink-0"
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
            <div className="flex items-center gap-0.5">
              {link && (
                <CMSLink 
                  {...link} 
                  appearance="link"
                  className="transition-colors text-gray-900 hover:shadow-xl hover:text-blue-800 text-xs xl:text-sm 2xl:text-base whitespace-nowrap px-1 xl:px-1.5"
                />
              )}
              {hasDropdown && (
                <ChevronDown className="w-3 h-3 xl:w-3.5 xl:h-3.5 text-gray-900 flex-shrink-0" />
              )}
            </div>
            {hasDropdown && dropdownItems && activeDropdown === i && (
                <div 
                  className="absolute top-full left-0 min-w-56 w-auto bg-gray-600 rounded-lg shadow-xl z-50"
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
                <div className="p-4">
                  {dropdownItems.map((dropdownItem, j) => (
                    <div key={j} className="relative group mb-3 last:mb-0">
                      {dropdownItem.titleLink?.link && (
                        <div className="flex items-center justify-between gap-4 px-3 py-2 rounded-md hover:bg-gray-500 transition-colors cursor-pointer">
                          <CMSLink
                            {...dropdownItem.titleLink.link}
                            className="text-white font-medium text-sm block whitespace-nowrap"
                          />
                          {dropdownItem.hasSubDropdown && (
                            <ChevronRight className="w-4 h-4 text-white flex-shrink-0" />
                          )}
                        </div>
                      )}
                      {dropdownItem.hasSubDropdown && dropdownItem.items && (
                        <div className="absolute top-0 left-full ml-2 bg-gray-700 rounded-lg shadow-lg p-3 min-w-[200px] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                          <ul className="space-y-2">
                            {dropdownItem.items.map((item, k) => {
                              if (!item.link) return null
                              return (
                                <li key={k}>
                                  <CMSLink
                                    {...item.link}
                                    className="text-gray-300 hover:text-white transition-colors text-sm block py-1"
                                  />
                                </li>
                              )
                            })}
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
