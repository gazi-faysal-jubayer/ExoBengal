import type { Metadata } from 'next'
import { readFileSync } from 'fs'
import { join } from 'path'
import { planetNameToSlug } from '@/lib/planet-utils'
import { generatePlanetDatasetSchema, jsonLdScriptProps } from '@/lib/structured-data'
import { ExplorerPlanetRow } from '@/lib/csv-loader'

interface Props {
  params: { slug: string }
  children: React.ReactNode
}

// Server-side CSV loader for metadata generation
function loadExoplanetsFromCSVServer(csvPath: string): ExplorerPlanetRow[] {
  try {
    const fullPath = join(process.cwd(), 'public', csvPath)
    const csvContent = readFileSync(fullPath, 'utf-8')
    
    const lines = csvContent.split('\n')
    const headers = lines[0].split(',').map(h => h.trim().replace(/"/g, ''))
    const rows = lines.slice(1).filter(line => line.trim())
    
    return rows.map(row => {
      const values = row.split(',').map(v => v.trim().replace(/"/g, ''))
      const obj: any = {}
      headers.forEach((header, index) => {
        const value = values[index]
        if (value && value !== 'null' && value !== '') {
          // Try to convert to number if possible
          const numValue = Number(value)
          obj[header] = isNaN(numValue) ? value : numValue
        } else {
          obj[header] = undefined
        }
      })
      return obj as ExplorerPlanetRow
    })
  } catch (error) {
    console.error('Error loading CSV for metadata:', error)
    return []
  }
}

// This generates dynamic metadata for each planet page
// Uses server-side file system access for reliable CSV loading
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  try {
    // Load the CSV data using server-side file system access
    const planets = loadExoplanetsFromCSVServer('PS_2025.09.12_22.39.25.csv')
    
    // Find the planet by comparing slug with planet name
    const planet = planets.find(p => planetNameToSlug(p.pl_name) === params.slug)
    
    if (planet) {
      const discoveryYear = planet.disc_year ? `in ${planet.disc_year}` : ''
      const discoveryMethod = planet.discoverymethod || 'unknown method'
      const hostSystem = planet.hostname || 'unknown'
      
      return {
        title: `${planet.pl_name} | ExoBengal`,
        description: `Explore ${planet.pl_name}, an exoplanet in the ${hostSystem} system. Discovered using ${discoveryMethod} ${discoveryYear}. View detailed parameters, visualizations, and scientific data.`,
        keywords: [
          planet.pl_name,
          hostSystem,
          discoveryMethod,
          planet.disc_year?.toString() || '',
          'exoplanet',
          'NASA',
          'astronomy',
          'space exploration',
          'planet discovery',
          'orbital parameters',
          'stellar parameters'
        ].filter(Boolean),
        openGraph: {
          title: `${planet.pl_name} | ExoBengal`,
          description: `Explore ${planet.pl_name}, an exoplanet in the ${hostSystem} system. Discovered using ${discoveryMethod} ${discoveryYear}.`,
          url: `https://exo-bengal.vercel.app/explorer/planet/${params.slug}`,
          type: 'website',
          images: [{
            url: 'https://exo-bengal.vercel.app/og-image.png',
            width: 1200,
            height: 630,
            alt: `${planet.pl_name} - ExoBengal Exoplanet Explorer`
          }]
        },
        twitter: {
          card: 'summary_large_image',
          title: `${planet.pl_name} | ExoBengal`,
          description: `Explore ${planet.pl_name}, an exoplanet in the ${hostSystem} system. Discovered using ${discoveryMethod} ${discoveryYear}.`,
          images: ['https://exo-bengal.vercel.app/og-image.png']
        },
        alternates: {
          canonical: 'https://exo-bengal.vercel.app/explorer/planet/' + params.slug,
        }
      }
    }
  } catch (error) {
    console.error('Error loading planet data for metadata:', error)
  }
  
  // Fallback metadata if planet not found or CSV fails to load
  return {
    title: 'Planet Details | ExoBengal',
    description: 'Explore detailed information about exoplanets from NASA\'s archive. Interactive visualizations, scientific data, and comprehensive planet parameters.',
    keywords: ['exoplanet', 'NASA', 'astronomy', 'space exploration', 'planet details', 'scientific data'],
    openGraph: {
      title: 'Planet Details | ExoBengal',
      description: 'Explore detailed information about exoplanets from NASA\'s archive',
      url: `https://exo-bengal.vercel.app/explorer/planet/${params.slug}`,
      type: 'website',
      images: [{
        url: 'https://exo-bengal.vercel.app/og-image.png',
        width: 1200,
        height: 630,
        alt: 'ExoBengal Exoplanet Explorer'
      }]
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Planet Details | ExoBengal',
      description: 'Explore detailed information about exoplanets from NASA\'s archive',
      images: ['https://exo-bengal.vercel.app/og-image.png']
    },
    alternates: {
      canonical: 'https://exo-bengal.vercel.app/explorer/planet/' + params.slug,
    }
  }
}

export default async function PlanetLayout({ children, params }: Props) {
  // Load planet data for dynamic Dataset schema
  const planets = loadExoplanetsFromCSVServer('PS_2025.09.12_22.39.25.csv')
  const planet = planets.find(p => planetNameToSlug(p.pl_name) === params.slug)
  
  // Generate dynamic Dataset schema for the specific planet
  const datasetSchema = planet ? generatePlanetDatasetSchema(planet, params.slug) : null

  return (
    <>
      {/* Dynamic Dataset structured data for individual planet */}
      {datasetSchema && <script {...jsonLdScriptProps(datasetSchema)} />}
      {children}
    </>
  )
}
