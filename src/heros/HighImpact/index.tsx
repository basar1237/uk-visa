'use client'
import { motion } from "motion/react"
import { useHeaderTheme } from '@/providers/HeaderTheme'
import React, { useEffect, useState } from 'react'
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
      <motion.section
        className="relative overflow-hidden"
        initial={{ opacity: 0, scale: 1.04, filter: "blur(12px)" }}
        animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
        transition={{ type: "spring", bounce: 0.32, duration: 0.9 }}
      >
        {/* Background Media with Overlay */}
        <div className="absolute inset-0 z-0">
          {media && typeof media === 'object' && (
            <Media fill imgClassName="object-cover blur-[2px]" priority resource={media} />
          )}
          <div className="absolute inset-0 bg-black/30" />
        </div>
        <div className="mx-auto grid max-w-7xl items-start gap-6 mt-16 pt-16 pb-10 lg:grid-cols-2 lg:gap-20 relative z-10 justify-between min-h-[600px]">
          <AnimatedGroup
            preset="blur-slide"
            className="mx-auto flex flex-col items-center text-center md:ml-auto lg:max-w-3xl lg:items-start lg:text-left"
          >
            <AnimatedText
              as="h1"
              className=" text-2xl sm:text-3xl md:text-4xl font-bold text-pretty lg:text-6xl xl:text-7xl md:mb-10"
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
              className="flex w-full flex-col items-center justify-center gap-3 sm:flex-row sm:items-start lg:justify-start"
            >
              <Button asChild className="w-3/4 sm:w-auto shadow-xl bg-blue-700 hover:bg-blue-800 rounded-xl hover:translate-y-[-3px] text-sm sm:text-base py-3 sm:py-6">
                <Link href="/contact">Book Free Consultation</Link>
              </Button>
              <Button asChild variant="outline" className="w-3/4 sm:w-auto rounded-xl text-sm sm:text-base hover:translate-y-[-3px] transition-all duration-200 py-3 sm:py-6">
                <Link href="/eligibility-check">
                  Check Eligibility
                  <ArrowDownRight className="size-4" />
                </Link>
              </Button>
              <Button asChild className="w-3/4 sm:w-auto shadow-xl bg-red-600 hover:bg-red-700 rounded-xl hover:translate-y-[-3px] text-sm sm:text-base py-3 sm:py-6">
                <Link href="tel:07858780841">☎ Urgent Help: 07858 780841</Link>
              </Button>
            </AnimatedGroup>
          </AnimatedGroup>

          {/* Right Side - UK Visa Eligibility Test */}
          <motion.div
            className="hidden lg:block w-full max-h-[500px] overflow-y-auto"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <EligibilityTestForm 
              maxQuestions={20}
              showProgress={true}
              className="bg-white/90 backdrop-blur-sm shadow-2xl"
            />
          </motion.div>
           
        </div>
      </motion.section>
    </main>
  )
}