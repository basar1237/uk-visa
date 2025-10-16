"use client"

import { motion } from "motion/react"
import { ReactNode } from "react"

interface AnimatedTextProps {
  children: ReactNode
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "div" | "span"
  className?: string
  delay?: number
}

export function AnimatedText({ 
  children, 
  as = "div", 
  className = "",
  delay = 0 
}: AnimatedTextProps) {
  const motionProps = {
    className,
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, delay }
  }

  switch (as) {
    case "h1":
      return <motion.h1 {...motionProps}>{children}</motion.h1>
    case "h2":
      return <motion.h2 {...motionProps}>{children}</motion.h2>
    case "h3":
      return <motion.h3 {...motionProps}>{children}</motion.h3>
    case "h4":
      return <motion.h4 {...motionProps}>{children}</motion.h4>
    case "h5":
      return <motion.h5 {...motionProps}>{children}</motion.h5>
    case "h6":
      return <motion.h6 {...motionProps}>{children}</motion.h6>
    case "p":
      return <motion.p {...motionProps}>{children}</motion.p>
    case "span":
      return <motion.span {...motionProps}>{children}</motion.span>
    default:
      return <motion.div {...motionProps}>{children}</motion.div>
  }
}
