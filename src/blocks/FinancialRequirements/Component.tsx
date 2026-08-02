'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { motion } from 'motion/react'
import { Check } from 'lucide-react'

import type { FinancialRequirementsBlock as FinancialRequirementsBlockProps } from '@/payload-types'

export const FinancialRequirementsComponent: React.FC<FinancialRequirementsBlockProps> = ({
  eyebrow,
  title,
  description,
  highlight,
  situationsTitle,
  situations,
  categoriesTitle,
  categoriesDescription,
  categories,
  bottomCta,
}) => {
  const [selected, setSelected] = useState(0)
  const activeSituation = situations && situations.length > 0 ? situations[selected] : null

  return (
    <section className="py-12">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          {eyebrow && (
            <p className="mb-2 text-xs font-bold uppercase tracking-widest text-[#2160b1]">
              {eyebrow}
            </p>
          )}
          <h2 className="mb-3 text-3xl font-bold text-[#1e3a8a] lg:text-4xl">{title}</h2>
          {description && <p className="max-w-3xl text-base text-foreground/70">{description}</p>}
        </motion.div>

        {highlight && (highlight.value || highlight.label) && (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="mt-8 rounded-2xl bg-[#0f2a5c] p-6 text-white sm:p-8"
          >
            {highlight.label && (
              <p className="mb-2 text-sm font-semibold text-white/80">{highlight.label}</p>
            )}
            <p className="flex flex-wrap items-baseline gap-3">
              {highlight.value && <span className="text-4xl font-bold sm:text-5xl">{highlight.value}</span>}
              {highlight.suffix && <span className="text-sm text-white/80">{highlight.suffix}</span>}
            </p>
            {highlight.note && <p className="mt-3 text-xs leading-relaxed text-white/70">{highlight.note}</p>}
          </motion.div>
        )}

        {situations && situations.length > 0 && (
          <div className="mt-10">
            {situationsTitle && (
              <h3 className="mb-4 text-xl font-semibold text-[#1e3a8a]">{situationsTitle}</h3>
            )}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {situations.map((s, index) => (
                <button
                  key={s.id ?? index}
                  type="button"
                  onClick={() => setSelected(index)}
                  aria-pressed={selected === index}
                  className={`rounded-xl border p-4 text-left transition-all ${
                    selected === index
                      ? 'border-[#2160b1] bg-[#eaf1fa] shadow-sm'
                      : 'border-border bg-background hover:border-[#2160b1]/50'
                  }`}
                >
                  <span className="mb-1 block text-sm font-semibold text-[#1e3a8a]">{s.title}</span>
                  {s.description && (
                    <span className="block text-xs leading-relaxed text-foreground/70">
                      {s.description}
                    </span>
                  )}
                </button>
              ))}
            </div>
            {activeSituation && (activeSituation.resultTitle || activeSituation.resultText) && (
              <div className="mt-4 rounded-xl border border-[#2160b1]/30 bg-[#eaf1fa] p-5">
                {activeSituation.resultTitle && (
                  <p className="mb-1 text-sm font-bold text-[#1e3a8a]">
                    {activeSituation.resultTitle}
                  </p>
                )}
                {activeSituation.resultText && (
                  <p className="text-sm leading-relaxed text-foreground/80">
                    {activeSituation.resultText}
                  </p>
                )}
              </div>
            )}
          </div>
        )}

        {categories && categories.length > 0 && (
          <div className="mt-14">
            <div className="mb-8 text-center">
              {categoriesTitle && (
                <h3 className="mb-2 text-2xl font-bold text-[#1e3a8a]">{categoriesTitle}</h3>
              )}
              {categoriesDescription && (
                <p className="mx-auto max-w-2xl text-sm text-foreground/70">
                  {categoriesDescription}
                </p>
              )}
            </div>
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              {categories.map((cat, index) => (
                <motion.div
                  key={cat.id ?? index}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: (index % 2) * 0.08 }}
                  viewport={{ once: true }}
                  className="flex flex-col rounded-2xl border border-border bg-background p-6 transition-all hover:border-[#2160b1] hover:shadow-lg"
                >
                  {cat.icon && (
                    <span className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[#eaf1fa] text-2xl">
                      {cat.icon}
                    </span>
                  )}
                  <h4 className="mb-1 text-lg font-semibold text-[#1e3a8a]">{cat.title}</h4>
                  {cat.description && (
                    <p className="mb-3 text-sm text-foreground/70">{cat.description}</p>
                  )}
                  {cat.badge && (
                    <span className="mb-3 inline-block w-fit rounded-full bg-[#eaf1fa] px-3 py-1 text-xs font-medium text-[#2160b1]">
                      {cat.badge}
                    </span>
                  )}
                  {cat.items && cat.items.length > 0 && (
                    <ul className="mb-4 space-y-1.5">
                      {cat.items.map((item, i) => (
                        <li
                          key={item.id ?? i}
                          className="flex items-start gap-2 text-sm text-foreground/80"
                        >
                          <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#2160b1]" />
                          <span>{item.text}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                  {cat.buttonText && cat.buttonLink && (
                    <Link
                      href={cat.buttonLink}
                      className="mt-auto inline-block rounded-xl bg-[#2160b1] px-5 py-2.5 text-center text-sm font-semibold text-white transition-colors hover:bg-[#1a4d8f]"
                    >
                      {cat.buttonText}
                    </Link>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {bottomCta && (bottomCta.title || bottomCta.buttonText) && (
          <div className="mt-10 rounded-2xl bg-[#eaf1fa] p-8 text-center">
            {bottomCta.title && (
              <h3 className="mb-2 text-xl font-bold text-[#1e3a8a]">{bottomCta.title}</h3>
            )}
            {bottomCta.description && (
              <p className="mx-auto mb-4 max-w-xl text-sm text-foreground/70">
                {bottomCta.description}
              </p>
            )}
            {bottomCta.buttonText && bottomCta.buttonLink && (
              <Link
                href={bottomCta.buttonLink}
                className="inline-block rounded-xl bg-[#2160b1] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#1a4d8f]"
              >
                {bottomCta.buttonText}
              </Link>
            )}
          </div>
        )}
      </div>
    </section>
  )
}
