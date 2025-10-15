import React from 'react'
import { StatsBoxesClient } from './Component.client'

import type { StatsBoxesBlock } from '@/payload-types'

export const StatsBoxesBlockComponent: React.FC<StatsBoxesBlock> = async (props) => {
  const {
    title,
    description,
    stats,
  } = props

  // Stats'ı uygun formata çevir
  const formattedStats = (stats || []).map((stat, index) => ({
    id: `stat-${index}`,
    value: stat.value,
    label: stat.label,
    description: stat.description || undefined,
  }))

  if (!formattedStats || formattedStats.length === 0) {
    return null
  }

  return (
    <StatsBoxesClient
      title={title}
      description={description}
      stats={formattedStats}
    />
  )
}
