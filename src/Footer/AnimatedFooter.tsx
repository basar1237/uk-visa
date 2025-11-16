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
        © 2025 UK Legal Solutions. UK Legal Solutions is a network of independent solicitors and law firms operating across England and Wales. Each participating firm is authorised and regulated by the Solicitors Regulation Authority (SRA) and adheres to the SRA Standards and Regulations governing professional conduct, ethics, and client care.

UK Legal Solutions is not itself a law firm but operates as a collective trading and marketing platform connecting clients with regulated legal professionals.

By submitting an enquiry through this website, you consent to your details being securely shared with one or more participating firms for the purpose of responding to your enquiry. Each firm is individually responsible for compliance with the UK General Data Protection Regulation (UK GDPR) and applicable data protection laws. UK Legal Solutions Ltd does not retain or process your personal data beyond what is necessary to facilitate initial contact.

Please note that any legal services provided — and any contractual relationships formed — are strictly between you and the individual law firm(s) that engage with you. UK Legal Solutions Ltd accepts no responsibility or liability for any legal advice or services delivered by member firms.

All logos, names, and associated branding (including “UK Legal Solutions”) are registered trademarks. All rights reserved. VAT numbers and SRA registration details for participating firms are available upon request. We do not accept service of legal documents by email or fax.

Designed and maintained by UK Legal Solutions Ltd.
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
