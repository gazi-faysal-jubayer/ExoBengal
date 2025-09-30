import { MetadataRoute } from 'next'
import { planetNameToSlug } from '@/lib/planet-utils'
import { promises as fs } from 'fs'
import path from 'path'

// Base URL for the production site
// This should match the Vercel deployment URL
const baseUrl = 'https://exo-bengal.vercel.app'

// Static routes with their SEO metadata
const staticRoutes: MetadataRoute.Sitemap = [
  {
    url: baseUrl,
    lastModified: new Date(),
    changeFrequency: 'daily',
    priority: 1.0,
  },
  {
    url: `${baseUrl}/about`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.8,
  },
  {
    url: `${baseUrl}/explorer`,
    lastModified: new Date(),
    changeFrequency: 'daily',
    priority: 1.0,
  },
  {
    url: `${baseUrl}/docs`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.9,
  },
  {
    url: `${baseUrl}/learn`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  },
  {
    url: `${baseUrl}/visualizations`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  },
  {
    url: `${baseUrl}/demo`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.7,
  },
  {
    url: `${baseUrl}/api-access`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.7,
  },
]

// Documentation subpage routes
const docsRoutes: MetadataRoute.Sitemap = [
  {
    url: `${baseUrl}/docs/getting-started`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  },
  {
    url: `${baseUrl}/docs/installation`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  },
  {
    url: `${baseUrl}/docs/api`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  },
  {
    url: `${baseUrl}/docs/api/detect-exoplanet`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.7,
  },
  {
    url: `${baseUrl}/docs/api/exo-params`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.7,
  },
  {
    url: `${baseUrl}/docs/api/utils`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.7,
  },
  {
    url: `${baseUrl}/docs/data-reference`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  },
  {
    url: `${baseUrl}/docs/models`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  },
  {
    url: `${baseUrl}/docs/notebook`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  },
  {
    url: `${baseUrl}/docs/examples`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  },
  {
    url: `${baseUrl}/docs/tutorials`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  },
  {
    url: `${baseUrl}/docs/tutorials/prediction`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.7,
  },
  {
    url: `${baseUrl}/docs/tutorials/training`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.7,
  },
]

/**
 * Server-side CSV parser for sitemap generation
 * Parses CSV content and returns planet data
 */
function parseCSVServerSide(text: string): { headers: string[]; rows: string[][] } {
  const rows: string[][] = []
  let current: string[] = []
  let field = ''
  let inQuotes = false

  const pushField = () => {
    current.push(field)
    field = ''
  }

  const pushRow = () => {
    rows.push(current)
    current = []
  }

  for (let i = 0; i < text.length; i++) {
    const char = text[i]
    const next = text[i + 1]
    if (inQuotes) {
      if (char === '"') {
        if (next === '"') {
          field += '"'
          i++
        } else {
          inQuotes = false
        }
      } else {
        field += char
      }
    } else {
      if (char === '"') {
        inQuotes = true
      } else if (char === ',') {
        pushField()
      } else if (char === '\n') {
        pushField()
        pushRow()
      } else if (char === '\r') {
        // ignore CR (handle CRLF)
      } else {
        field += char
      }
    }
  }
  // flush last field/row
  pushField()
  if (current.length > 1 || (current.length === 1 && current[0] !== '')) {
    pushRow()
  }

  if (rows.length === 0) return { headers: [], rows: [] }
  const headers = rows[0].map(h => h.trim())
  const dataRows = rows.slice(1)
  return { headers, rows: dataRows }
}

/**
 * Converts string values to numbers where appropriate
 */
function toNumber(value: string): number | undefined {
  if (value === undefined || value === null) return undefined
  const v = String(value).trim()
  if (v === '' || v.toLowerCase() === 'null') return undefined
  const n = Number(v)
  return Number.isFinite(n) ? n : undefined
}

/**
 * Loads planet data from CSV using fs/promises and generates sitemap entries for dynamic planet routes
 * @returns Promise<MetadataRoute.Sitemap> Array of sitemap entries for planet pages
 */
async function getPlanetRoutes(): Promise<MetadataRoute.Sitemap> {
  try {
    // Read CSV file from public directory using fs/promises
    const csvPath = path.join(process.cwd(), 'public', 'PS_2025.09.12_22.39.25.csv')
    const csvContent = await fs.readFile(csvPath, 'utf-8')
    
    // Parse CSV content
    const { headers, rows } = parseCSVServerSide(csvContent)
    
    if (headers.length === 0 || rows.length === 0) {
      console.warn('CSV file is empty or invalid')
      return []
    }
    
    // Create header index for quick lookup
    const headerIndex: Record<string, number> = {}
    headers.forEach((h, idx) => (headerIndex[h] = idx))
    
    // Convert rows to planet objects
    const planets = rows.map(cols => {
      const planet: any = {}
      headers.forEach((h, idx) => {
        planet[h] = cols[idx] !== undefined ? cols[idx] : undefined
      })
      return planet
    })
    
    // Generate sitemap entries for each planet
    return planets
      .filter(planet => planet.pl_name && planet.pl_name.trim() !== '')
      .map(planet => {
        try {
          const slug = planetNameToSlug(planet.pl_name)
          return {
            url: `${baseUrl}/explorer/planet/${slug}`,
            lastModified: new Date(),
            changeFrequency: 'monthly' as const,
            priority: 0.6,
          }
        } catch (error) {
          // Skip planets that fail slug generation
          console.warn(`Failed to generate slug for planet: ${planet.pl_name}`, error)
          return null
        }
      })
      .filter((entry): entry is MetadataRoute.Sitemap[0] => entry !== null)
  } catch (error) {
    // Log warning and continue without planet routes if CSV is not available
    console.warn('CSV file not available for sitemap generation. Planet routes will be skipped.', error)
    // Return empty array as fallback - planet routes will be added once CSV file is placed in public folder
    return []
  }
}

/**
 * Generates the sitemap for search engines
 * Next.js will automatically serve this at /sitemap.xml
 * 
 * @returns Promise<MetadataRoute.Sitemap> Complete sitemap with static, docs, and planet routes
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Get dynamic planet routes
  const planetRoutes = await getPlanetRoutes()
  
  // Combine all routes: static + docs + planet routes
  return [...staticRoutes, ...docsRoutes, ...planetRoutes]
}
