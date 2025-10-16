import React from 'react'

import { HeaderThemeProvider } from './HeaderTheme'

export const Providers: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  return (
    <HeaderThemeProvider>{children}</HeaderThemeProvider>
  )
}
