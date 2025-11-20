"use client"

import { ReactNode } from "react"

interface AnimatedGroupProps {
  children: ReactNode
  className?: string
  preset?: "blur-slide" | "slide" | "fade"
  delay?: number
}

export function AnimatedGroup({ 
  children, 
  className = "", 
  preset = "blur-slide",
  delay = 0 
}: AnimatedGroupProps) {
  return (
    <div className={className}>
      {children}
    </div>
  )
}
