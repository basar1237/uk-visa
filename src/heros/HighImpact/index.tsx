'use client'
import { motion } from "motion/react"
import { useHeaderTheme } from '@/providers/HeaderTheme'
import React, { useEffect } from 'react'
import { ArrowDownRight } from "lucide-react"

import type { Page } from '@/payload-types'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'
import { Button } from '@/components/ui/button'
import { AnimatedGroup } from '@/components/landing/animated-group'
import { AnimatedText } from '@/components/landing/animated-text'
import { EligibilityTestForm } from '@/components/EligibilityTest/EligibilityTestForm'
import Link from 'next/link'

export const HighImpactHero: React.FC<Page['hero']> = ({ media, richText }) => {
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
          <div className="absolute inset-0 bg-black/30" />
        </div>
        <div className="mx-auto grid max-w-7xl items-start gap-4 sm:gap-6 mt-8 sm:mt-12 md:mt-16 pt-20 sm:pt-12 md:pt-16 pb-6 sm:pb-8 md:pb-10 lg:grid-cols-2 lg:gap-20 relative z-10 justify-between min-h-[400px] sm:min-h-[450px] md:min-h-[500px]">
          <AnimatedGroup
            preset="blur-slide"
            className="mx-auto flex flex-col items-center text-center md:ml-auto lg:max-w-3xl lg:items-start lg:text-left"
          >
            <AnimatedText
              as="h1"
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-bold text-pretty md:mb-10"
            >
              {richText ? (
                <div className="hero-content">
                  <RichText data={richText} enableGutter={false} />
                </div>
              ) : (
                <>
                  Welcome to <span className="font-bold">First Migration</span>, a London<br />
                  Based Immigration Consultancy. We<br />
                  Specialise in <span className="font-bold">UK Work and Family<br />
                  Visas.</span>
                </>
              )}
            </AnimatedText>
            <AnimatedGroup
              preset="slide"
              className="flex w-full flex-col items-center justify-center gap-2 sm:gap-3 sm:flex-row sm:items-start lg:justify-start"
            >
              <Button asChild className="w-3/4 sm:w-auto shadow-xl bg-blue-700 hover:bg-blue-800 rounded-xl hover:translate-y-[-3px] text-sm sm:text-base md:text-base py-3 sm:py-4 md:py-6">
                <Link href="/contact">Book Free Consultation</Link>
              </Button>
              <Button asChild variant="outline" className="w-3/4 sm:w-auto rounded-xl text-sm sm:text-base md:text-base hover:translate-y-[-3px] transition-all duration-200 py-3 sm:py-4 md:py-6">
                <Link href="/eligibility-check">
                  Check Eligibility
                  <ArrowDownRight className="size-4 sm:size-5" />
                </Link>
              </Button>
              <Button asChild className="w-3/4 sm:w-auto shadow-xl bg-red-600 hover:bg-red-700 rounded-xl hover:translate-y-[-3px] text-sm sm:text-base md:text-base py-3 sm:py-4 md:py-6">
                <Link href="tel: 02037288948">☎ Urgent Help: 02037288948</Link>
              </Button>
            </AnimatedGroup>
          </AnimatedGroup>

          {/* Right Side - UK Visa Eligibility Test */}
          <motion.div
            className="hidden lg:block w-full max-h-[700px] overflow-y-auto motion-safe"
            initial={{ opacity: 0, x: 30, y: 20 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ 
              delay: 0.8, 
              duration: 0.8,
              ease: [0.25, 0.46, 0.45, 0.94]
            }}
          >
            <EligibilityTestForm 
              showProgress={true}
              className="bg-white/90 backdrop-blur-sm shadow-2xl"
            />
          </motion.div>
           
        </div>
      </section>
    </main>
  )
}