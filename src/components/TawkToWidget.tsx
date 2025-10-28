'use client'

import { useEffect } from 'react'

export const TawkToWidget: React.FC = () => {
  useEffect(() => {
    // Tawk.to script'ini yükle
    const script = document.createElement('script')
    script.async = true
    script.src = 'https://embed.tawk.to/69013d45e1db901950c46a25/1j8mdem45'
    script.charset = 'UTF-8'
    script.setAttribute('crossorigin', '*')
    
    // Script'i head'e ekle
    document.head.appendChild(script)

    // Tawk.to widget'ının konumunu ayarla
    const style = document.createElement('style')
    style.textContent = `
      #tawk-widget {
        bottom: 20px !important;
        right: 20px !important;
      }
    `
    document.head.appendChild(style)

    // Cleanup function
    return () => {
      // Script'i kaldır
      const existingScript = document.querySelector('script[src*="tawk.to"]')
      if (existingScript) {
        document.head.removeChild(existingScript)
      }
      // Style'ı kaldır
      const existingStyle = document.querySelector('style')
      if (existingStyle && existingStyle.textContent?.includes('tawk-widget')) {
        document.head.removeChild(existingStyle)
      }
    }
  }, [])

  return null // Bu component görsel bir şey render etmez
}
