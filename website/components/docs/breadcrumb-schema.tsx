/**
 * BreadcrumbSchema Component
 * 
 * Generates BreadcrumbList JSON-LD structured data for docs pages
 * to improve SEO and search engine understanding of site navigation.
 */

import { generateBreadcrumbListSchema, jsonLdScriptProps } from '@/lib/structured-data'

interface BreadcrumbSchemaProps {
  pathname: string
}

/**
 * Component that generates breadcrumb structured data based on the current route
 * Maps docs routes to human-readable breadcrumb hierarchy
 */
export default function BreadcrumbSchema({ pathname }: BreadcrumbSchemaProps) {
  // Route mapping for human-readable names
  const routeNames: Record<string, string> = {
    '/docs': 'Documentation',
    '/docs/getting-started': 'Getting Started',
    '/docs/installation': 'Installation',
    '/docs/api': 'API Reference',
    '/docs/api/detect-exoplanet': 'DetectExoplanet',
    '/docs/api/exo-params': 'ExoParams',
    '/docs/api/utils': 'Utilities',
    '/docs/data-reference': 'Data Reference',
    '/docs/models': 'Models',
    '/docs/notebook': 'Jupyter Notebook',
    '/docs/examples': 'Examples',
    '/docs/tutorials': 'Tutorials',
    '/docs/tutorials/prediction': 'Prediction Tutorial',
    '/docs/tutorials/training': 'Training Tutorial'
  }

  // Build breadcrumb items array
  const items = [{ name: 'Home', url: 'https://exo-bengal.vercel.app/' }]
  
  // Split pathname and build cumulative paths
  const pathSegments = pathname.split('/').filter(Boolean)
  let currentPath = ''
  
  for (const segment of pathSegments) {
    currentPath += `/${segment}`
    const routeName = routeNames[currentPath]
    
    if (routeName) {
      items.push({
        name: routeName,
        url: `https://exo-bengal.vercel.app${currentPath}`
      })
    }
  }

  // Generate the breadcrumb schema
  const schema = generateBreadcrumbListSchema(items)

  return <script {...jsonLdScriptProps(schema)} />
}
