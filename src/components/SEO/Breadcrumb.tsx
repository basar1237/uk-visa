import Link from 'next/link'
import { ChevronRight, Home } from 'lucide-react'
import React from 'react'
import { StructuredData } from './StructuredData'

export type BreadcrumbItem = {
  name: string
  url: string
}

interface BreadcrumbProps {
  items: BreadcrumbItem[]
  /**
   * Absolute URL of the current page (used by BreadcrumbList JSON-LD).
   * If omitted, the schema uses relative URLs based on baseUrl at runtime.
   */
  pageUrl?: string
  className?: string
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({ items, pageUrl, className }) => {
  if (!items || items.length === 0) return null

  const allItems: BreadcrumbItem[] = [{ name: 'Home', url: '/' }, ...items]

  return (
    <>
      <StructuredData type="BreadcrumbList" breadcrumbs={allItems} pageUrl={pageUrl} />
      <nav
        aria-label="Breadcrumb"
        className={
          className ||
          'container mx-auto px-4 sm:px-4 md:px-6 lg:px-8 py-3 text-sm text-gray-600'
        }
      >
        <ol className="flex flex-wrap items-center gap-1">
          {allItems.map((item, i) => {
            const isLast = i === allItems.length - 1
            return (
              <li key={item.url} className="flex items-center gap-1">
                {i === 0 && <Home className="h-3.5 w-3.5 text-gray-500" aria-hidden="true" />}
                {isLast ? (
                  <span className="font-medium text-gray-900" aria-current="page">
                    {item.name}
                  </span>
                ) : (
                  <Link
                    href={item.url}
                    className="hover:text-blue-700 hover:underline transition-colors"
                  >
                    {item.name}
                  </Link>
                )}
                {!isLast && (
                  <ChevronRight
                    className="h-3.5 w-3.5 text-gray-400 mx-0.5"
                    aria-hidden="true"
                  />
                )}
              </li>
            )
          })}
        </ol>
      </nav>
    </>
  )
}
