'use client'

import React from 'react'
import { motion } from 'motion/react'
  import { EligibilityTestForm } from '@/components/EligibilityTest/EligibilityTestForm'
  
 
export const EligibilityCheckComponent: React.FC = () => {
 
  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-20 px-4 bg-gradient-to-br from-blue-500 shadow-xl via-blue-200 to-blue-500">
      <motion.div
        className="w-full max-w-4xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.h1
          className="text-4xl md:text-5xl font-bold text-center mb-8 text-gray-800"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Check Your Visa Eligibility
        </motion.h1>
        <motion.div
          className="overflow-y-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <EligibilityTestForm 
            showProgress={true}
            className="bg-white/95 backdrop-blur-md shadow-2xl rounded-2xl p-6 md:p-8"
          />
        </motion.div>
      </motion.div>
    </div>
   )
}

export default EligibilityCheckComponent
