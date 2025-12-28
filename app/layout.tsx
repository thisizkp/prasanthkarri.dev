import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import '@fontsource-variable/bricolage-grotesque'
import Header from '@/components/Header'
import { ThemeProvider } from '@/components/ThemeProvider'
import { BackToTop } from '@/components/BackToTop'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default: 'Prasanth Karri',
    template: '%s | Prasanth Karri'
  },
  description: 'Personal blog',
  icons: {
    icon: '/favicon.svg',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-gray-50 dark:bg-zinc-800 w-full max-w-2xl mx-auto px-6 pt-24 pb-16 min-h-screen flex flex-col">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Header />
          <main className="flex-1">
            {children}
          </main>
          <BackToTop />
          <Analytics />
          <SpeedInsights />
        </ThemeProvider>
      </body>
    </html>
  )
}