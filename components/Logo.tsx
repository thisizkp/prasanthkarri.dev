'use client'

import { useTheme } from 'next-themes'
import Image from 'next/image'
import { useEffect, useState } from 'react'

export function Logo() {
  const { theme, resolvedTheme } = useTheme()
  const [isHydrated, setIsHydrated] = useState(false)

  useEffect(() => {
    setIsHydrated(true)
  }, [])

  if (!isHydrated) {
    return <Image src="/logo.svg" alt="KP" width={32} height={32} />
  }

  const currentTheme = theme === 'system' ? resolvedTheme : theme
  const logoSrc = currentTheme === 'dark' ? '/logo-dark.svg' : '/logo.svg'

  return <Image src={logoSrc} alt="KP" width={32} height={32} />
}
