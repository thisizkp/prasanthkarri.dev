import type { Metadata } from 'next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import '@fontsource-variable/bricolage-grotesque'
import './globals.css'
import Header from '@/components/Header'

export const metadata: Metadata = {
  title: {
    default: 'Blog',
    template: '%s | Blog'
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
      <body className="bg-gray-50 w-5/6 xl:w-1/2 mx-auto my-4 h-screen">
        <Header />
        {children}
        <SpeedInsights />
      </body>
    </html>
  )
}