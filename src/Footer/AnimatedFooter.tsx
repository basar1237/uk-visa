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

export function AnimatedFooter({ columns }: AnimatedFooterProps) {
  const safeColumns = columns || []

  return (
    <>
      {/* <footer className="border-t border-transparent bg-[#0a1b3d] text-white relative z-20">
        <div className="mx-auto max-w-7xl px-6 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="grid gap-6 md:grid-cols-2 lg:grid-cols-6"
          >
            {/* CMS Links 
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
                    <h4 className="text-white mb-4 text-sm font-semibold uppercase tracking-wide">
                      {column.title}
                    </h4>
                    <ul className="space-y-3">
                      {column.navItems?.map(({ link }, i) => {
                        if (!link) return null
                        return (
                          <li key={i}>
                            <CMSLink 
                              className="text-white/80 hover:text-white transition-colors text-sm" 
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
      </footer> */}
      
      {/* Contact & Location Section */}
      <FooterContactSection />
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.1, delay: 0.1 }}
        viewport={{ once: true }}
        className="bg-[#0a1b3d] border-t border-transparent py-6 text-center text-white/70"
      >
       UK Immigration Helpline is a trading name of UK Legal Solutions Ltd, operating as a trading style of Haleys Solicitors, which is regulated by the Bar Standards Board (BSB) Ref: ER164151.

UK Legal Solutions Ltd collaborates with a network of independent regulated immigration advisors, solicitors and barristers across England and Wales.

By submitting an enquiry through this website, you provide consent for your information to be securely shared with one or more participating advisors or firms for the sole purpose of responding to your enquiry.

This website is designed, developed and maintained by UK Legal Solutions Ltd.
      </motion.div>
      {/* Copyright */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2, delay: 0.2 }}
        viewport={{ once: true }}
        className="bg-[#0a1b3d] border-t border-transparent py-6 text-center text-white/70"
      >
        <p className="text-white/70 text-sm">
          © 2024 UK Legal Solutions. All rights reserved.
        </p>
      </motion.div>
    </>
  )
}
