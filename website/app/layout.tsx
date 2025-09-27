import type { Metadata } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import 'prismjs/themes/prism-tomorrow.css'
import 'prismjs/plugins/line-numbers/prism-line-numbers.css'
import { Providers } from '@/components/providers'
import { Header } from '@/components/layout/header'
import { Component as Footer } from '@/components/ui/footer-taped-design'
import { ChatWidget } from '@/components/ai-chat/chat-widget'
import { NewsBar } from '@/components/news/news-bar'
import { Toaster } from 'react-hot-toast'
import TargetCursor from '@/components/ui/target-cursor'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
})

export const metadata: Metadata = {
  title: 'ExoBengal',
  description: 'Interactive web platform for exploring and visualizing NASA exoplanet data with documentation and AI assistance',
  keywords: ['exoplanets', 'NASA', 'astronomy', 'space', 'visualization', 'data science'],
  authors: [{ name: 'ExoBengal Team' }],
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '32x32' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      { url: '/android-chrome-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/android-chrome-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
  },
  manifest: '/site.webmanifest',
  openGraph: {
    title: 'NASA Exoplanet Archive Visualization Platform',
    description: 'Explore the cosmos with our interactive exoplanet data visualization platform',
    type: 'website',
    url: 'https://exobengal.com',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'NASA Exoplanet Archive Visualization Platform',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NASA Exoplanet Archive Visualization Platform',
    description: 'Explore the cosmos with our interactive exoplanet data visualization platform',
    images: ['/og-image.png'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${jetbrainsMono.variable} font-body`}>
        <Providers>
          <div className="flex min-h-screen flex-col">
            <Header />
            <NewsBar className="sticky top-16 z-50 -mt-16" />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
          </div>
          <ChatWidget />
          <TargetCursor 
            targetSelector=".cursor-target"
            spinDuration={2}
            hideDefaultCursor={true}
          />
          <Toaster 
            position="bottom-right"
            toastOptions={{
              className: 'dark:bg-dark-card dark:text-dark-text-primary',
              duration: 4000,
            }}
          />
        </Providers>
      </body>
    </html>
  )
}

