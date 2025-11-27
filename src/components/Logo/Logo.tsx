import clsx from 'clsx'
import React from 'react'

interface Props {
  className?: string
  loading?: 'lazy' | 'eager'
  priority?: 'auto' | 'high' | 'low'
}

export const Logo = (props: Props) => {
  const { loading: loadingFromProps, priority: priorityFromProps, className } = props

  const loading = loadingFromProps || 'lazy'
  const priority = priorityFromProps || 'low'

  return (
    /* eslint-disable @next/next/no-img-element */
    <img
      alt="UK Visa Logo"
      width={277}
      height={44}
      loading={loading}
      fetchPriority={priority}
      decoding="async"
      className={clsx('md:w-[300px] w-[227px] h-auto px-0 mx-0 mt-3', className)}
      src="/new-logo.png"
    />
  )
}
