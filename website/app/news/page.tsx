import type { Metadata } from 'next'
import { NewsPageClient } from './news-page-client'

export const metadata: Metadata = {
  title: 'News | ExoBengal',
  description: 'Stay up-to-date with the latest exoplanet discoveries, research, and missions from NASA, ESA, and leading astronomy publications.',
  keywords: ['exoplanet news', 'NASA news', 'astronomy news', 'space discoveries', 'exoplanet research', 'space missions', 'astronomy updates'],
  openGraph: {
    title: 'News | ExoBengal',
    description: 'Stay up-to-date with the latest exoplanet discoveries, research, and missions from NASA, ESA, and leading astronomy publications.',
    url: 'https://exo-bengal.vercel.app/news',
    siteName: 'ExoBengal',
    type: 'website',
    images: [{
      url: 'https://exo-bengal.vercel.app/og-image.png',
      width: 1200,
      height: 630,
      alt: 'ExoBengal News - Latest Exoplanet Discoveries'
    }]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'News | ExoBengal',
    description: 'Stay up-to-date with the latest exoplanet discoveries, research, and missions from NASA, ESA, and leading astronomy publications.',
    images: ['https://exo-bengal.vercel.app/og-image.png']
  },
  alternates: {
    canonical: 'https://exo-bengal.vercel.app/news',
  }
}

export default function NewsPage() {
  return <NewsPageClient />
}
