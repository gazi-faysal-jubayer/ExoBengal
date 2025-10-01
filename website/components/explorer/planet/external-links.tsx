'use client'

import { ExplorerPlanetRow } from '@/lib/csv-loader'
import { motion } from 'framer-motion'
import { 
  Archive, 
  Book, 
  Database, 
  ExternalLink, 
  Globe, 
  Map, 
  Search, 
  Telescope,
  Calculator,
  FileText
} from 'lucide-react'
import { trackExternalLink, trackDownload } from '@/lib/analytics'

interface ExternalLinksProps {
  planet: ExplorerPlanetRow
}

export function ExternalLinks({ planet }: ExternalLinksProps) {
  // Generate dynamic URLs based on planet data
  const generateSimbadUrl = () => {
    if (planet.ra && planet.dec) {
      return `http://simbad.u-strasbg.fr/simbad/sim-coo?Coord=${planet.ra}+${planet.dec}&Radius=2&Radius.unit=arcmin`
    }
    return `http://simbad.u-strasbg.fr/simbad/sim-id?Ident=${encodeURIComponent(planet.hostname || planet.pl_name)}`
  }

  const generateNASAArchiveUrl = () => {
    return `https://exoplanetarchive.ipac.caltech.edu/overview/${encodeURIComponent(planet.pl_name)}#planet_${encodeURIComponent(planet.pl_name)}_collapsible`
  }

  const generateADSUrl = () => {
    return `https://ui.adsabs.harvard.edu/search/q=object:"${encodeURIComponent(planet.pl_name)}" OR object:"${encodeURIComponent(planet.hostname || '')}"&sort=date desc`
  }

  const generateGaiaUrl = () => {
    if (planet.ra && planet.dec) {
      return `https://gea.esac.esa.int/archive/search/?q=CIRCLE('ICRS',${planet.ra},${planet.dec},0.016667)`
    }
    return null
  }

  const generateMASTUrl = () => {
    return `https://mast.stsci.edu/portal/Mashup/Clients/Mast/Portal.html?searchQuery=${encodeURIComponent(planet.hostname || planet.pl_name)}`
  }

  const generateExoFOPUrl = () => {
    // Try to extract TOI number if available
    const toiMatch = planet.pl_name.match(/TOI[- ]?(\d+)/i)
    if (toiMatch) {
      return `https://exofop.ipac.caltech.edu/tess/target.php?id=${toiMatch[1]}`
    }
    return 'https://exofop.ipac.caltech.edu/tess/'
  }

  const generateNASAEyesUrl = () => {
    // Convert planet name to NASA Eyes format (replace spaces with underscores)
    const formattedName = planet.pl_name.replace(/\s+/g, '_')
    return `https://eyes.nasa.gov/apps/exo/#/planet/${encodeURIComponent(formattedName)}`
  }

  // Organize links by category
  const linkCategories = [
    {
      title: 'Data Archives',
      icon: Archive,
      links: [
        {
          name: 'NASA Exoplanet Archive',
          url: generateNASAArchiveUrl(),
          description: 'Official NASA database entry'
        },
        {
          name: 'MAST Portal',
          url: generateMASTUrl(),
          description: 'Space telescope data'
        },
        {
          name: 'ExoFOP-TESS',
          url: generateExoFOPUrl(),
          description: 'TESS follow-up portal'
        }
      ]
    },
    {
      title: 'Astronomical Catalogs',
      icon: Database,
      links: [
        {
          name: 'SIMBAD',
          url: generateSimbadUrl(),
          description: 'Astronomical object database'
        },
        {
          name: 'Gaia Archive',
          url: generateGaiaUrl(),
          description: 'Precision astrometry data'
        },
        {
          name: 'VizieR',
          url: `https://vizier.u-strasbg.fr/viz-bin/VizieR?-source=&-c=${planet.ra || 0},${planet.dec || 0}&-c.r=2&-c.u=arcmin`,
          description: 'Catalog collection'
        }
      ]
    },
    {
      title: 'Tools & Calculators',
      icon: Calculator,
      links: [
        {
          name: 'NASA Eyes on Exoplanets',
          url: generateNASAEyesUrl(),
          description: 'Interactive 3D visualization'
        },
        {
          name: 'Aladin Sky Atlas',
          url: `https://aladin.u-strasbg.fr/AladinLite/?target=${planet.ra || 0} ${planet.dec || 0}&fov=0.2&survey=CDS/P/DSS2/color`,
          description: 'Interactive sky viewer'
        },
        {
          name: 'Exoplanet Calculator',
          url: 'https://exoplanetarchive.ipac.caltech.edu/tools/calc_basic.html',
          description: 'Physical parameters calculator'
        },
        {
          name: 'Finding Charts',
          url: `http://irsa.ipac.caltech.edu/applications/finderchart/?__action=layout.showDropDown&submit=Search&ra=${planet.ra || 0}&dec=${planet.dec || 0}`,
          description: 'Generate finder charts'
        }
      ]
    },
    {
      title: 'Literature & Research',
      icon: Book,
      links: [
        {
          name: 'NASA ADS',
          url: generateADSUrl(),
          description: 'Scientific publications'
        },
        {
          name: 'arXiv',
          url: `https://arxiv.org/search/?query="${encodeURIComponent(planet.pl_name)}" OR "${encodeURIComponent(planet.hostname || '')}"&searchtype=all`,
          description: 'Preprint archive'
        },
        {
          name: 'Google Scholar',
          url: `https://scholar.google.com/scholar?q="${encodeURIComponent(planet.pl_name)}" OR "${encodeURIComponent(planet.hostname || '')}"`,
          description: 'Academic search'
        }
      ]
    }
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      className="bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border overflow-hidden clip-corner-cut backdrop-blur-sm"
    >
      <div className="p-6">
        <h2 className="text-xl font-semibold text-light-text-primary dark:text-dark-text-primary mb-4">
          External Resources
        </h2>

        <div className="space-y-6">
          {linkCategories.map((category, categoryIndex) => {
            const CategoryIcon = category.icon
            return (
              <div key={categoryIndex}>
                <div className="flex items-center gap-2 mb-3">
                  <CategoryIcon className="h-4 w-4 text-primary-light-blue" />
                  <h3 className="text-sm font-medium text-light-text-primary dark:text-dark-text-primary">
                    {category.title}
                  </h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {category.links.map((link, linkIndex) => (
                    link.url && (
                      <a
                        key={linkIndex}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => link.url && trackExternalLink(link.url, link.name)}
                        className="group bg-light-surface dark:bg-dark-surface p-3 rounded-lg hover:shadow-md transition-all hover:scale-[1.02]"
                      >
                        <div className="flex items-start justify-between mb-1">
                          <span className="font-medium text-sm text-light-text-primary dark:text-dark-text-primary group-hover:text-primary-dark-blue dark:group-hover:text-primary-light-blue transition-colors">
                            {link.name}
                          </span>
                          <ExternalLink className="h-3 w-3 text-light-text-secondary dark:text-dark-text-secondary group-hover:text-primary-dark-blue dark:group-hover:text-primary-light-blue transition-colors" />
                        </div>
                        <p className="text-xs text-light-text-secondary dark:text-dark-text-secondary">
                          {link.description}
                        </p>
                      </a>
                    )
                  ))}
                </div>
              </div>
            )
          })}
        </div>

        {/* Quick Reference */}
        <div className="mt-6 p-4 bg-light-surface/50 dark:bg-dark-surface/50 rounded-lg">
          <h3 className="text-sm font-medium text-light-text-primary dark:text-dark-text-primary mb-2">
            Quick Reference
          </h3>
          <div className="grid grid-cols-2 gap-2 text-xs text-light-text-secondary dark:text-dark-text-secondary">
            <div>
              <span className="font-medium">Coordinates:</span> 
              <span className="ml-1">
                {planet.ra && planet.dec ? `${planet.ra.toFixed(4)}°, ${planet.dec.toFixed(4)}°` : 'Not available'}
              </span>
            </div>
            <div>
              <span className="font-medium">Host Star:</span> 
              <span className="ml-1">{planet.hostname || 'Unknown'}</span>
            </div>
          </div>
          <p className="text-xs text-light-text-secondary dark:text-dark-text-secondary mt-2">
            Use these identifiers when searching external databases
          </p>
        </div>
      </div>
    </motion.div>
  )
}

