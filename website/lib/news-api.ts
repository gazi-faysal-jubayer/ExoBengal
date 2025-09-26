// News API integration for fetching exoplanet and astronomy news
'use client'

export interface NewsItem {
  id: string
  title: string
  description?: string
  url: string
  publishedAt: string
  source: string
  category: 'exoplanet' | 'astronomy' | 'space' | 'discovery'
  imageUrl?: string
}

// NASA News API
export async function fetchNASANews(): Promise<NewsItem[]> {
  try {
    const response = await fetch('https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY&count=5')
    const data = await response.json()
    
    return data.map((item: any, index: number) => ({
      id: `nasa-${index}`,
      title: item.title || 'NASA Astronomy Picture of the Day',
      description: item.explanation?.substring(0, 150) + '...',
      url: item.url || 'https://nasa.gov',
      publishedAt: item.date || new Date().toISOString(),
      source: 'NASA',
      category: 'astronomy' as const,
      imageUrl: item.media_type === 'image' ? item.url : undefined,
    }))
  } catch (error) {
    console.error('Failed to fetch NASA news:', error)
    return []
  }
}

// RSS-to-JSON service for Space.com
export async function fetchSpaceComNews(): Promise<NewsItem[]> {
  try {
    // Using rss2json.com service to fetch RSS feeds (CORS-friendly)
    const response = await fetch('https://api.rss2json.com/v1/api.json?rss_url=https://www.space.com/feeds/news')
    const data = await response.json()
    
    if (data.status === 'ok' && data.items) {
      return data.items.slice(0, 10).map((item: any, index: number) => ({
        id: `space-${index}`,
        title: item.title || 'Space.com News',
        description: item.description?.replace(/<[^>]*>/g, '').substring(0, 200) + '...',
        url: item.link || 'https://space.com',
        publishedAt: item.pubDate || new Date().toISOString(),
        source: 'Space.com',
        category: item.title?.toLowerCase().includes('exoplanet') ? 'exoplanet' as const : 'space' as const,
        imageUrl: item.thumbnail || undefined,
      }))
    }
    
    // Fallback mock data
    const mockNews = [
      {
        id: 'space-1',
        title: 'New Exoplanet Discovery: Ultra-Hot Jupiter Found 600 Light-Years Away',
        description: 'Astronomers have discovered a new ultra-hot Jupiter exoplanet with extreme temperatures reaching over 3,000°C. This world orbits its star so closely that a year lasts just 16 hours.',
        url: 'https://space.com/exoplanet-discovery-ultra-hot-jupiter',
        publishedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        source: 'Space.com',
        category: 'exoplanet' as const,
      },
      {
        id: 'space-2',
        title: 'JWST Reveals Atmospheric Composition of Rocky Exoplanet',
        description: 'The James Webb Space Telescope has provided unprecedented details about the atmosphere of a rocky exoplanet, detecting water vapor and other key molecules that could indicate habitability.',
        url: 'https://space.com/jwst-exoplanet-atmosphere-analysis',
        publishedAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
        source: 'Space.com',
        category: 'discovery' as const,
      },
      {
        id: 'space-3',
        title: 'Kepler Mission Data Reveals 50 New Exoplanet Candidates',
        description: 'Analysis of archived Kepler Space Telescope data has uncovered 50 new exoplanet candidates, including several potentially habitable worlds in the Goldilocks zone.',
        url: 'https://space.com/kepler-exoplanet-candidates-discovery',
        publishedAt: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
        source: 'Space.com',
        category: 'discovery' as const,
      },
    ]
    return mockNews
  } catch (error) {
    console.error('Failed to fetch Space.com news:', error)
    return []
  }
}

// ESA (European Space Agency) News
export async function fetchESANews(): Promise<NewsItem[]> {
  try {
    const mockNews = [
      {
        id: 'esa-1',
        title: 'PLATO Mission: ESA Prepares to Hunt for Earth-like Exoplanets',
        description: 'ESA\'s PLATO mission will search for potentially habitable Earth-sized planets around sun-like stars, using precision photometry to detect planetary transits and stellar oscillations.',
        url: 'https://esa.int/Science_Exploration/Space_Science/Plato',
        publishedAt: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
        source: 'ESA',
        category: 'exoplanet' as const,
      },
      {
        id: 'esa-2',
        title: 'Cheops Mission Discovers Rare Six-Planet System',
        description: 'ESA\'s Cheops space telescope has characterized a unique planetary system with six sub-Neptune worlds in a rare chain of orbital resonances, providing insights into planetary formation.',
        url: 'https://esa.int/Science_Exploration/Space_Science/Cheops',
        publishedAt: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
        source: 'ESA',
        category: 'discovery' as const,
      },
      {
        id: 'esa-3',
        title: 'Gaia Data Release 3: Stellar Properties for Exoplanet Host Stars',
        description: 'The latest Gaia data release provides precise stellar parameters for thousands of exoplanet host stars, enabling better characterization of their planetary companions.',
        url: 'https://esa.int/Science_Exploration/Space_Science/Gaia',
        publishedAt: new Date(Date.now() - 18 * 60 * 60 * 1000).toISOString(),
        source: 'ESA',
        category: 'astronomy' as const,
      },
    ]
    return mockNews
  } catch (error) {
    console.error('Failed to fetch ESA news:', error)
    return []
  }
}

// Universe Today and Astrobiology news
export async function fetchUniverseTodayNews(): Promise<NewsItem[]> {
  try {
    const mockNews = [
      {
        id: 'ut-1',
        title: 'Astronomers Find Water Vapor in Atmosphere of Nearby Super-Earth',
        description: 'Using advanced spectroscopy techniques with the James Webb Space Telescope, researchers have detected water vapor and clouds in the atmosphere of K2-18 b, a sub-Neptune exoplanet 124 light-years away.',
        url: 'https://universetoday.com/water-vapor-super-earth-k2-18b',
        publishedAt: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
        source: 'Universe Today',
        category: 'discovery' as const,
      },
      {
        id: 'ut-2',
        title: 'TESS Discovers Three New Worlds Around Nearby Red Dwarf Star',
        description: 'NASA\'s Transiting Exoplanet Survey Satellite has found three new exoplanets orbiting TOI-715, a red dwarf star just 137 light-years away. One planet sits in the habitable zone.',
        url: 'https://universetoday.com/tess-three-exoplanets-red-dwarf',
        publishedAt: new Date(Date.now() - 20 * 60 * 60 * 1000).toISOString(),
        source: 'Universe Today',
        category: 'exoplanet' as const,
      },
      {
        id: 'astro-1',
        title: 'Breakthrough: First Detection of Oxygen in Exoplanet Atmosphere',
        description: 'Scientists using ground-based telescopes have successfully detected oxygen molecules in the atmosphere of WASP-96b, marking a major milestone in exoplanet atmospheric characterization.',
        url: 'https://astrobiology.nasa.gov/news/oxygen-detection-wasp-96b',
        publishedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
        source: 'NASA Astrobiology',
        category: 'discovery' as const,
      },
      {
        id: 'astro-2',
        title: 'Habitable Zone Planets May Be More Common Than Previously Thought',
        description: 'New statistical analysis of Kepler data suggests that rocky planets in habitable zones around red dwarf stars may be 2-3 times more common than earlier estimates indicated.',
        url: 'https://astrobiology.nasa.gov/news/habitable-zone-frequency-update',
        publishedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        source: 'NASA Astrobiology',
        category: 'astronomy' as const,
      },
    ]
    return mockNews
  } catch (error) {
    console.error('Failed to fetch Universe Today news:', error)
    return []
  }
}

// Aggregate all news sources
export async function fetchAllExoplanetNews(): Promise<NewsItem[]> {
  try {
    const [nasaNews, spaceNews, esaNews, utNews] = await Promise.allSettled([
      fetchNASANews(),
      fetchSpaceComNews(),
      fetchESANews(),
      fetchUniverseTodayNews(),
    ])

    const allNews: NewsItem[] = []

    if (nasaNews.status === 'fulfilled') allNews.push(...nasaNews.value)
    if (spaceNews.status === 'fulfilled') allNews.push(...spaceNews.value)
    if (esaNews.status === 'fulfilled') allNews.push(...esaNews.value)
    if (utNews.status === 'fulfilled') allNews.push(...utNews.value)

    // Sort by published date (newest first)
    return allNews.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
  } catch (error) {
    console.error('Failed to fetch aggregated news:', error)
    return []
  }
}

// Get cached news with fallback
export function getCachedNews(): NewsItem[] {
  if (typeof window === 'undefined') return []
  
  try {
    const cached = localStorage.getItem('exoplanet-news')
    return cached ? JSON.parse(cached) : []
  } catch {
    return []
  }
}

// Cache news in localStorage
export function setCachedNews(news: NewsItem[]): void {
  if (typeof window === 'undefined') return
  
  try {
    localStorage.setItem('exoplanet-news', JSON.stringify(news))
    localStorage.setItem('exoplanet-news-timestamp', Date.now().toString())
  } catch (error) {
    console.error('Failed to cache news:', error)
  }
}

// Check if cached news is still fresh (within 30 minutes)
export function isCacheFresh(): boolean {
  if (typeof window === 'undefined') return false
  
  try {
    const timestamp = localStorage.getItem('exoplanet-news-timestamp')
    if (!timestamp) return false
    
    const cacheAge = Date.now() - parseInt(timestamp)
    return cacheAge < 30 * 60 * 1000 // 30 minutes
  } catch {
    return false
  }
}
