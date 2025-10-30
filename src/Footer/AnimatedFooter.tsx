"use client"

import React from 'react'
import { motion } from "motion/react"
import { CMSLink } from '@/components/Link'
import type { Footer } from '@/payload-types'
import { FooterContactSection } from '@/components/FooterContactSection'

interface AnimatedFooterProps {
  columns: Footer['columns']
  companyName: string
  companyDescription: string
}

export function AnimatedFooter({ columns, companyName, companyDescription }: AnimatedFooterProps) {
  const safeColumns = columns || []

  return (
    <>
      <footer className="border-t border-border bg-background relative z-20">
        <div className="mx-auto max-w-7xl px-6 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="grid gap-6 md:grid-cols-2 lg:grid-cols-6"
          >
            {/* CMS Links */}
            <div className="grid gap-8 sm:grid-cols-5 lg:col-span-6">
              {safeColumns.map((column, colIndex) => {
                const isLastColumn = colIndex === safeColumns.length - 1
                return (
                  <motion.div
                    key={column.id || colIndex}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 + (colIndex * 0.1) }}
                    viewport={{ once: true }}
                    className={isLastColumn ? "block" : "hidden md:block"}
                  >   
                    <h4 className="text-foreground mb-4 text-sm font-semibold uppercase tracking-wide">
                      {column.title}
                    </h4>
                    <ul className="space-y-3">
                      {column.navItems?.map(({ link }, i) => {
                        if (!link) return null
                        return (
                          <li key={i}>
                            <CMSLink 
                              className="text-foreground/70 hover:text-brand transition-colors text-sm" 
                              {...link} 
                            />
                          </li>
                        )
                      })}
                    </ul>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>

        </div>
      </footer>
      
      {/* Contact & Location Section */}
      <FooterContactSection />
      
      {/* Copyright */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        viewport={{ once: true }}
        className="bg-background border-t border-border py-6 text-center"
      >
        <p className="text-foreground/60 text-sm">
          © 2024 UK Legal Solutions. All rights reserved.
        </p>
      </motion.div>
    </>
  )
}
