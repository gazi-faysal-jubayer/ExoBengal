import type { Metadata } from 'next'
import Script from 'next/script'
import { Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import 'prismjs/themes/prism-tomorrow.css'
import 'prismjs/plugins/line-numbers/prism-line-numbers.css'
import { Providers } from '@/components/providers'
import { Header } from '@/components/layout/header'
import { Component as Footer } from '@/components/ui/footer-taped-design'
import { ChatWidget } from '@/components/ai-chat/chat-widget'
import { NewsBar } from '@/components/news/news-bar'
import { BackgroundAudioPlayer } from '@/components/audio/background-audio-player'
import { Toaster } from 'react-hot-toast'
import TargetCursor from '@/components/ui/target-cursor'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { Analytics } from "@vercel/analytics/next"
import { generateOrganizationSchema, generateWebSiteSchema, jsonLdScriptProps } from '@/lib/structured-data'
import PageViewTracker from '@/components/analytics/page-view-tracker'
import GlobalLoader from '@/components/loader/global-loader'
import { Suspense } from 'react'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://exo-bengal.vercel.app'),
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
  alternates: {
    canonical: 'https://exo-bengal.vercel.app/',
  },
  verification: { google: process.env.NEXT_PUBLIC_GSC_VERIFICATION || '' },
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#1e3a5f' },
    { media: '(prefers-color-scheme: dark)', color: '#0a1628' },
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Generate structured data schemas for SEO
  const organizationSchema = generateOrganizationSchema()
  const websiteSchema = generateWebSiteSchema()

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${jetbrainsMono.variable} font-body overflow-x-hidden`}>
        {/* JSON-LD structured data for SEO */}
        <script {...jsonLdScriptProps(organizationSchema)} />
        <script {...jsonLdScriptProps(websiteSchema)} />
        
        {/* Google Analytics 4 - tracks user behavior and site performance */}
        {process.env.NODE_ENV === 'production' && process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}', {
                  page_path: window.location.pathname,
                });
              `}
            </Script>
          </>
        )}
        
        <Providers>
          {/* Automatic page view tracking for Google Analytics */}
          <Suspense fallback={null}>
            <PageViewTracker />
          </Suspense>
          <div className="flex min-h-screen flex-col overflow-x-hidden max-w-full">
            <Header />
            <NewsBar className="hidden md:block sticky md:fixed top-16 md:left-0 md:right-0 z-[60]" />
            <main className="flex-1 overflow-x-hidden max-w-full pt-16 md:pt-32">
              {children}
            </main>
            <Footer />
          </div>
          <ChatWidget />
          <BackgroundAudioPlayer />
          {/* 
            TargetCursor automatically targets common interactive elements:
            - button, a, input, select, textarea elements
            - Elements with [data-target-cursor] attribute
            - Elements with .cursor-target class
            Additional elements can use cursor-target class or data-target-cursor attribute for custom targeting
          */}
          <TargetCursor 
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
          <SpeedInsights />
          {/* Vercel Analytics - tracks page views and Web Vitals */}
          <Analytics />
          <GlobalLoader />
        </Providers>
      </body>
    </html>
  )
}

