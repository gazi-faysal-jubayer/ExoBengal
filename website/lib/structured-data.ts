/**
 * Structured Data Utility for JSON-LD Schema Generation
 * 
 * This module provides helper functions to generate JSON-LD structured data schemas
 * for SEO optimization and search engine understanding of the ExoBengal platform.
 */

import { ExplorerPlanetRow } from './csv-loader'

// TypeScript interfaces for schema type safety
export interface OrganizationSchema {
  '@context': string
  '@type': 'Organization'
  name: string
  url: string
  logo: string
  description: string
  sameAs: string[]
  contactPoint: {
    '@type': 'ContactPoint'
    contactType: string
    email: string
  }
}

export interface WebSiteSchema {
  '@context': string
  '@type': 'WebSite'
  name: string
  url: string
  description: string
  potentialAction: {
    '@type': 'SearchAction'
    target: {
      '@type': 'EntryPoint'
      urlTemplate: string
    }
    'query-input': string
  }
}

export interface DatasetSchema {
  '@context': string
  '@type': 'Dataset'
  name: string
  description: string
  url: string
  creator: {
    '@type': 'Organization'
    name: string
    url: string
  }
  publisher: {
    '@type': 'Organization'
    name: string
  }
  keywords: string[]
  license: string
  distribution: {
    '@type': 'DataDownload'
    encodingFormat: string
    contentUrl: string
  }
  [key: string]: any
}

export interface BreadcrumbListSchema {
  '@context': string
  '@type': 'BreadcrumbList'
  itemListElement: Array<{
    '@type': 'ListItem'
    position: number
    name: string
    item: string
  }>
}

export interface ArticleSchema {
  '@context': string
  '@type': 'Article'
  headline: string
  description: string
  url: string
  author: {
    '@type': 'Organization'
    name: string
  }
  publisher: {
    '@type': 'Organization'
    name: string
    logo: {
      '@type': 'ImageObject'
      url: string
    }
  }
  datePublished: string
  dateModified: string
  educationalLevel: string
  learningResourceType: string
}

/**
 * Generates Organization JSON-LD schema for ExoBengal
 * @returns OrganizationSchema object
 */
export function generateOrganizationSchema(): OrganizationSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'ExoBengal',
    url: 'https://exo-bengal.vercel.app',
    logo: 'https://exo-bengal.vercel.app/logo.png',
    description: 'Interactive platform for exploring NASA exoplanet data with machine learning tools and comprehensive documentation',
    sameAs: [
      'https://github.com/exobengal',
      'https://twitter.com/exobengal'
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'technical support',
      email: 'contact@exobengal.com'
    }
  }
}

/**
 * Generates WebSite JSON-LD schema with search functionality
 * @returns WebSiteSchema object
 */
export function generateWebSiteSchema(): WebSiteSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'ExoBengal',
    url: 'https://exo-bengal.vercel.app',
    description: 'NASA Exoplanet Data Explorer and Analysis Platform',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://exo-bengal.vercel.app/explorer?search={search_term_string}'
      },
      'query-input': 'required name=search_term_string'
    }
  }
}

/**
 * Generates Dataset JSON-LD schema for exoplanet data
 * @param name - Dataset name
 * @param description - Dataset description
 * @param url - Dataset URL
 * @param additionalInfo - Optional additional properties
 * @returns DatasetSchema object
 */
export function generateDatasetSchema(
  name: string,
  description: string,
  url: string,
  additionalInfo?: object
): DatasetSchema {
  const baseSchema: DatasetSchema = {
    '@context': 'https://schema.org',
    '@type': 'Dataset',
    name,
    description,
    url,
    creator: {
      '@type': 'Organization',
      name: 'NASA Exoplanet Science Institute',
      url: 'https://exoplanetarchive.ipac.caltech.edu/'
    },
    publisher: {
      '@type': 'Organization',
      name: 'ExoBengal'
    },
    keywords: ['exoplanets', 'NASA', 'astronomy', 'planetary science', 'space exploration'],
    license: 'https://exoplanetarchive.ipac.caltech.edu/docs/acknowledge.html',
    distribution: {
      '@type': 'DataDownload',
      encodingFormat: 'text/csv',
      contentUrl: url
    }
  }

  // Merge additional info if provided
  if (additionalInfo) {
    return { ...baseSchema, ...additionalInfo }
  }

  return baseSchema
}

/**
 * Generates planet-specific Dataset JSON-LD schema
 * @param planet - Planet data from CSV
 * @param slug - URL slug for the planet
 * @returns DatasetSchema object
 */
export function generatePlanetDatasetSchema(
  planet: ExplorerPlanetRow,
  slug: string
): DatasetSchema {
  const variableMeasured = []
  
  // Add key parameters that are available
  if (planet.pl_orbper) variableMeasured.push('Orbital Period')
  if (planet.pl_rade) variableMeasured.push('Planet Radius')
  if (planet.pl_masse) variableMeasured.push('Planet Mass')
  if (planet.pl_orbsmax) variableMeasured.push('Semi-major Axis')
  if (planet.pl_orbeccen) variableMeasured.push('Orbital Eccentricity')
  if (planet.st_teff) variableMeasured.push('Stellar Temperature')
  if (planet.st_rad) variableMeasured.push('Stellar Radius')
  if (planet.st_mass) variableMeasured.push('Stellar Mass')
  if (planet.sy_dist) variableMeasured.push('System Distance')

  return generateDatasetSchema(
    `${planet.pl_name} Exoplanet Data`,
    `Detailed scientific data for ${planet.pl_name} including orbital parameters, stellar characteristics, and discovery information`,
    `https://exo-bengal.vercel.app/explorer/planet/${slug}`,
    {
      variableMeasured,
      about: {
        '@type': 'Thing',
        name: planet.pl_name,
        description: `Exoplanet ${planet.pl_name} discovered in ${planet.disc_year || 'unknown year'}`
      }
    }
  )
}

/**
 * Generates BreadcrumbList JSON-LD schema for navigation
 * @param items - Array of breadcrumb items with name and url
 * @returns BreadcrumbListSchema object
 */
export function generateBreadcrumbListSchema(
  items: Array<{ name: string; url: string }>
): BreadcrumbListSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url
    }))
  }
}

/**
 * Generates Article JSON-LD schema for educational content
 * @param headline - Article headline
 * @param description - Article description
 * @param url - Article URL
 * @param datePublished - Publication date (optional, defaults to current date)
 * @param dateModified - Last modified date (optional, defaults to current date)
 * @returns ArticleSchema object
 */
export function generateArticleSchema(
  headline: string,
  description: string,
  url: string,
  datePublished?: string,
  dateModified?: string
): ArticleSchema {
  const currentDate = new Date().toISOString().split('T')[0]
  
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline,
    description,
    url,
    author: {
      '@type': 'Organization',
      name: 'ExoBengal Team'
    },
    publisher: {
      '@type': 'Organization',
      name: 'ExoBengal',
      logo: {
        '@type': 'ImageObject',
        url: 'https://exo-bengal.vercel.app/logo.png'
      }
    },
    datePublished: datePublished || currentDate,
    dateModified: dateModified || currentDate,
    educationalLevel: 'Beginner to Advanced',
    learningResourceType: 'Educational Content'
  }
}

/**
 * Helper function to create props for Next.js Script component
 * @param schema - JSON-LD schema object
 * @returns Props object for Script component
 */
export function jsonLdScriptProps(schema: object) {
  return {
    type: 'application/ld+json',
    dangerouslySetInnerHTML: {
      __html: JSON.stringify(schema, null, 2)
    }
  }
}

