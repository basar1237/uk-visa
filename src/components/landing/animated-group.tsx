"use client"

import { motion } from "motion/react"
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
  const getInitialProps = () => {
    switch (preset) {
      case "blur-slide":
        return {
          initial: { opacity: 0, y: 20, filter: "blur(4px)" },
          animate: { opacity: 1, y: 0, filter: "blur(0px)" },
          transition: { duration: 0.6, delay }
        }
      case "slide":
        return {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.5, delay }
        }
      case "fade":
        return {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          transition: { duration: 0.4, delay }
        }
      default:
        return {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.5, delay }
        }
    }
  }

  return (
    <motion.div
      className={className}
      {...getInitialProps()}
    >
      {children}
    </motion.div>
  )
}
