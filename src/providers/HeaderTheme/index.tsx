'use client'

import React, { createContext, useCallback, use, useState } from 'react'

import canUseDOM from '@/utilities/canUseDOM'

export interface ContextType {
  headerTheme?: string | null
  setHeaderTheme: (theme: string | null) => void
}

const initialContext: ContextType = {
  headerTheme: undefined,
  setHeaderTheme: () => null,
}

const HeaderThemeContext = createContext(initialContext)

export const HeaderThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [headerTheme, setThemeState] = useState<string | undefined | null>(
    canUseDOM ? (document.documentElement.getAttribute('data-theme')) : undefined,
  )

  const setHeaderTheme = useCallback((themeToSet: string | null) => {
    setThemeState(themeToSet)
  }, [])

  return <HeaderThemeContext.Provider value={{ headerTheme, setHeaderTheme }}>{children}</HeaderThemeContext.Provider>
}

export const useHeaderTheme = (): ContextType => use(HeaderThemeContext)
