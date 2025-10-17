import { Button, type ButtonProps } from '@/components/ui/button'
import { cn } from '@/utilities/ui'
import Link from 'next/link'
import React from 'react'

import type { Page, Post } from '@/payload-types'

type CMSLinkType = {
  appearance?: 'inline' | ButtonProps['variant'] | 'default' | 'outline' | 'red' | 'blue' | 'green'
  children?: React.ReactNode
  className?: string
  label?: string | null
  newTab?: boolean | null
  reference?: {
    relationTo: 'pages' | 'posts'
    value: Page | Post | string | number
  } | null
  size?: ButtonProps['size'] | null
  type?: 'custom' | 'reference' | null
  url?: string | null
  onClick?: (e?: React.MouseEvent) => void
}

export const CMSLink: React.FC<CMSLinkType> = (props) => {
  const {
    type,
    appearance = 'inline',
    children,
    className,
    label,
    newTab,
    reference,
    size: sizeFromProps,
    url,
    onClick,
  } = props

  const href =
    type === 'reference' && typeof reference?.value === 'object' && reference.value.slug
      ? `${reference?.relationTo !== 'pages' ? `/${reference?.relationTo}` : ''}/${
          reference.value.slug
        }`
      : url

  if (!href) return null

  const size = appearance === 'link' ? 'default' : sizeFromProps
  const newTabProps = newTab ? { rel: 'noopener noreferrer', target: '_blank' } : {}

  // Map appearance values to Button variants
  const getButtonVariant = (appearance: string | null): ButtonProps['variant'] => {
    if (!appearance) return 'default'
    
    switch (appearance) {
      case 'default':
        return 'default'
      case 'outline':
        return 'outline'
      case 'red':
        return 'red'
      case 'blue':
        return 'blue'
      case 'green':
        return 'green'
      default:
        return appearance as ButtonProps['variant']
    }
  }

  /* Ensure we don't break any styles set by richText */
  if (appearance === 'inline') {
    return (
      <Link className={cn(className)} href={href || url || ''} onClick={(e) => onClick?.(e)} {...newTabProps}>
        {label && label}
        {children && children}
      </Link>
    )
  }

  return (
    <Button asChild className={className} size={size} variant={getButtonVariant(appearance)}>
      <Link className={cn(className)} href={href || url || ''} onClick={(e) => onClick?.(e)} {...newTabProps}>
        {label && label}
        {children && children}
      </Link>
    </Button>
  )
}
