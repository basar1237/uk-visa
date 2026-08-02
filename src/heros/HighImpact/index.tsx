'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import React, { useEffect } from 'react'
import { ArrowDownRight } from 'lucide-react'

import type { Page } from '@/payload-types'
import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'
import { Button } from '@/components/ui/button'
import { AnimatedGroup } from '@/components/landing/animated-group'
import { AnimatedText } from '@/components/landing/animated-text'
import Link from 'next/link'

type HighImpactHeroProps = Page['hero'] & {
  /**
   * When true (homepage), the hero renders hardcoded marketing copy.
   * When false/undefined (inner pages), it renders the CMS `richText` heading.
   * Layout is identical either way: single centered column, no eligibility form.
   */
  staticContent?: boolean
}

export const HighImpactHero: React.FC<HighImpactHeroProps> = ({
  media,
  richText,
  links,
  badges,
  staticContent,
}) => {
  const { setHeaderTheme } = useHeaderTheme()

  useEffect(() => {
    setHeaderTheme('dark')
  }, [setHeaderTheme])

  return (
    <main>
      <section className="relative overflow-hidden">
        {/* Background Media with Overlay */}
        <div className="absolute inset-0 z-0">
          {media && typeof media === 'object' && (
            <Media fill imgClassName="object-cover blur-[2px]" priority resource={media} />
          )}
          <div className="absolute inset-0 bg-black/20" />
        </div>

        <div className="mx-auto py-5 grid max-w-5xl gap-6 sm:gap-8 md:gap-10 lg:gap-12 xl:gap-16 mt-8 sm:mt-12 md:mt-16 pt-20 sm:pt-12 md:pt-16 pb-6 sm:pb-8 md:pb-10 relative z-10 justify-items-center min-h-[550px] md:min-h-[500px] grid-cols-1 px-4 sm:px-6 md:px-8">
          <AnimatedGroup
            preset="blur-slide"
            className="mx-auto flex flex-col items-center text-center w-full"
          >
            <AnimatedText
              as="h1"
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-bold text-pretty mb-4 sm:mb-6 md:mb-8 text-white"
            >
              {staticContent ? (
                'UK Immigration Lawyers Helping You Secure Your UK Visa'
              ) : richText ? (
                <div className="hero-content">
                  <RichText data={richText} enableGutter={false} />
                </div>
              ) : (
                'UK Immigration Lawyers Helping You Secure Your UK Visa'
              )}
            </AnimatedText>

            {staticContent && (
              <p className="text-base sm:text-lg text-white/90 max-w-2xl mb-6 sm:mb-8 leading-relaxed">
                Fixed-fee immigration advice for family visas, work visas, ILR and British
                citizenship. Speak to an experienced IAA regulated visa &amp; immigration
                professional today.
              </p>
            )}

            {badges && badges.length > 0 && (
              <div className="mb-6 flex flex-wrap items-center justify-center gap-2 sm:mb-8">
                {badges.map((badge, i) => (
                  <span
                    key={badge.id ?? i}
                    className="rounded-full border border-white/30 bg-white/15 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm sm:text-sm"
                  >
                    {badge.text}
                  </span>
                ))}
              </div>
            )}

            <AnimatedGroup
              preset="slide"
              className="flex w-full flex-col items-center justify-center gap-2 sm:gap-2 sm:flex-row sm:items-start lg:justify-center"
            >
              {links && links.length > 0 ? (
                links.map(({ link }, i) => (
                  <CMSLink
                    key={i}
                    {...link}
                    className="w-3/4 sm:w-auto rounded-xl text-xs sm:text-sm hover:translate-y-[-3px] transition-all duration-200 py-2 sm:py-2 px-4 sm:px-8"
                  />
                ))
              ) : (
                <>
                  <Button
                    asChild
                    variant="outline"
                    className="w-3/4 sm:w-auto rounded-xl text-xs sm:text-sm hover:translate-y-[-3px] transition-all duration-200 py-2 sm:py-2 px-4 sm:px-8"
                  >
                    <Link href="/eligibility-check">
                      Check Eligibility
                      <ArrowDownRight className="size-3 sm:size-4" />
                    </Link>
                  </Button>
                  <Button
                    asChild
                    className="w-3/4 sm:w-auto shadow-xl bg-red-600 hover:bg-red-500 rounded-xl hover:translate-y-[-3px] text-xs sm:text-sm md:text-sm py-2 sm:py-2 md:py-3 px-4 sm:px-3"
                  >
                    <Link href="tel:01143214047">☎ Urgent Help: 01143214047</Link>
                  </Button>
                </>
              )}
            </AnimatedGroup>
          </AnimatedGroup>
        </div>
      </section>
    </main>
  )
}
