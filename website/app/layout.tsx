import type { Metadata } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import 'prismjs/themes/prism-tomorrow.css'
import 'prismjs/plugins/line-numbers/prism-line-numbers.css'
import { Providers } from '@/components/providers'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { ChatWidget } from '@/components/ai-chat/chat-widget'
import { NewsBar } from '@/components/news/news-bar'
import { Toaster } from 'react-hot-toast'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
})

export const metadata: Metadata = {
  title: 'NASA Exoplanet Archive Visualization Platform',
  description: 'Interactive web platform for exploring and visualizing NASA exoplanet data with documentation and AI assistance',
  keywords: ['exoplanets', 'NASA', 'astronomy', 'space', 'visualization', 'data science'],
  authors: [{ name: 'ExoBengal Team' }],
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
            <NewsBar />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
          </div>
          <ChatWidget />
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

