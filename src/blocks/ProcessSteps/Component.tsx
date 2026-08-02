'use client'

import React from 'react'
import { motion } from 'motion/react'
import { ArrowDown } from 'lucide-react'

import type { ProcessStepsBlock as ProcessStepsBlockProps } from '@/payload-types'

export const ProcessStepsComponent: React.FC<ProcessStepsBlockProps> = ({
  eyebrow,
  title,
  description,
  style,
  steps,
}) => {
  if (!steps || steps.length === 0) return null

  return (
    <section className="py-10">
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
            <p className="mx-auto max-w-2xl text-base text-foreground/70">{description}</p>
          )}
        </motion.div>

        {style === 'compact' && (
          <div className="mx-auto grid max-w-2xl grid-cols-2 gap-x-8 gap-y-6 sm:grid-cols-2">
            {steps.map((step, index) => (
              <motion.div
                key={step.id ?? index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                viewport={{ once: true }}
                className="flex flex-col items-center gap-2 text-center"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#2160b1] text-sm font-bold text-white">
                  {index + 1}
                </span>
                <span className="text-base font-semibold text-[#1e3a8a]">{step.title}</span>
              </motion.div>
            ))}
          </div>
        )}

        {style === 'grid' && (
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {steps.map((step, index) => (
              <motion.div
                key={step.id ?? index}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: index * 0.08 }}
                viewport={{ once: true }}
                className="rounded-2xl border border-border bg-background p-6 transition-all hover:border-[#2160b1] hover:shadow-lg"
              >
                <span className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-[#eaf1fa] text-sm font-bold text-[#2160b1]">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h3 className="mb-2 text-lg font-semibold text-[#1e3a8a]">{step.title}</h3>
                {step.description && (
                  <p className="text-sm leading-relaxed text-foreground/70">{step.description}</p>
                )}
              </motion.div>
            ))}
          </div>
        )}

        {style === 'timeline' && (
          <div className="mx-auto flex max-w-3xl flex-col items-stretch">
            {steps.map((step, index) => (
              <React.Fragment key={step.id ?? index}>
                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45 }}
                  viewport={{ once: true }}
                  className="rounded-2xl border border-border bg-background p-6 transition-all hover:border-[#2160b1] hover:shadow-lg"
                >
                  <div className="flex items-start gap-4">
                    <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#2160b1] text-sm font-bold text-white">
                      {index + 1}
                    </span>
                    <div>
                      <h3 className="mb-1 text-lg font-semibold text-[#1e3a8a]">{step.title}</h3>
                      {step.description && (
                        <p className="text-sm leading-relaxed text-foreground/70">
                          {step.description}
                        </p>
                      )}
                    </div>
                  </div>
                </motion.div>
                {index < steps.length - 1 && (
                  <div className="flex justify-center py-2">
                    <ArrowDown className="h-4 w-4 text-[#2160b1]/60" />
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
