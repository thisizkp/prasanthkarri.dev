import type { Metadata } from 'next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import '@fontsource-variable/bricolage-grotesque'
import Header from '@/components/Header'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default: 'Prasanth Karri',
    template: '%s | Prasanth Karri'
  },
  description: 'Personal blog',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50 w-full max-w-2xl mx-auto px-6 pt-4 pb-16 min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <SpeedInsights />
      </body>
    </html>
  )
}