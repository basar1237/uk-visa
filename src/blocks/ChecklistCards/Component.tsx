'use client'

import React from 'react'
import { motion } from 'motion/react'
import { Check } from 'lucide-react'

import type { ChecklistCardsBlock as ChecklistCardsBlockProps } from '@/payload-types'

import Link from 'next/link'

export const ChecklistCardsComponent: React.FC<ChecklistCardsBlockProps> = ({
  eyebrow,
  title,
  description,
  cards,
  bottomCta,
}) => {
  if (!cards || cards.length === 0) return null

  return (
    <section className="bg-[#f7fafd] py-12">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-10 text-center"
        >
          {eyebrow && (
            <p className="mb-2 text-xs font-bold uppercase tracking-widest text-[#2160b1]">
              {eyebrow}
            </p>
          )}
          <h2 className="mb-3 text-3xl font-bold text-[#1e3a8a] lg:text-4xl">{title}</h2>
          {description && (
            <p className="mx-auto max-w-3xl text-base text-foreground/70">{description}</p>
          )}
        </motion.div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {cards.map((card, index) => {
            const hasItems = card.items && card.items.length > 0

            // İçerik listesi olmayan kartlar kompakt ✓ rozeti olarak gösterilir
            if (!hasItems && !card.description) {
              return (
                <motion.div
                  key={card.id ?? index}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: (index % 2) * 0.06 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-2 rounded-xl border border-border bg-background px-5 py-4"
                >
                  <Check className="h-4 w-4 shrink-0 text-[#2160b1]" />
                  <span className="text-sm font-medium text-foreground/90">{card.title}</span>
                </motion.div>
              )
            }

            return (
              <motion.div
                key={card.id ?? index}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: (index % 2) * 0.08 }}
                viewport={{ once: true }}
                className="rounded-2xl border border-border bg-background p-6 transition-all hover:border-[#2160b1] hover:shadow-lg"
              >
                {card.icon && (
                  <span className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[#eaf1fa] text-2xl">
                    {card.icon}
                  </span>
                )}
                <h3 className="mb-1 text-lg font-semibold text-[#1e3a8a]">{card.title}</h3>
                {card.description && (
                  <p className="mb-4 text-sm leading-relaxed text-foreground/70">{card.description}</p>
                )}
                {hasItems && (
                  <ul className="space-y-2">
                    {(card.items || []).map((item, i) => (
                      <li key={item.id ?? i} className="flex items-start gap-2 text-sm text-foreground/80">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#2160b1]" />
                        <span>{item.text}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </motion.div>
            )
          })}
        </div>

        {bottomCta && (bottomCta.title || bottomCta.buttonText) && (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="mt-8 rounded-2xl bg-[#0f2a5c] p-8 text-center text-white sm:p-10"
          >
            {bottomCta.icon && (
              <span className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-full bg-white/10 text-3xl">
                {bottomCta.icon}
              </span>
            )}
            {bottomCta.title && <h3 className="mb-2 text-xl font-bold">{bottomCta.title}</h3>}
            {bottomCta.description && (
              <p className="mx-auto mb-6 max-w-xl text-sm leading-relaxed text-white/80">
                {bottomCta.description}
              </p>
            )}
            {bottomCta.buttonText && bottomCta.buttonLink && (
              <Link
                href={bottomCta.buttonLink}
                className="inline-block rounded-xl bg-white px-6 py-3 text-sm font-semibold text-[#0f2a5c] transition-colors hover:bg-white/90"
              >
                {bottomCta.buttonText}
              </Link>
            )}
          </motion.div>
        )}
      </div>
    </section>
  )
}
