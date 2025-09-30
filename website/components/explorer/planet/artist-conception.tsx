'use client'

import { useRef, useState } from 'react'
import type { ExplorerPlanetRow } from '@/lib/csv-loader'
import { NasaVisualization } from './nasa-visualization'

interface ArtistConceptionProps {
  planet: ExplorerPlanetRow
}

export function ArtistConception({ planet }: ArtistConceptionProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [viewMode, setViewMode] = useState<'custom' | 'nasa'>('custom')
  const [selectedPlanet, setSelectedPlanet] = useState(planet.pl_name)
  const [tooltip, setTooltip] = useState<{ 
    x: number
    y: number
    title: string
    subtitle?: string
    lines: string[]
    visible: boolean 
  }>({ x: 0, y: 0, title: '', subtitle: '', lines: [], visible: false })

  const showTip = (e: React.MouseEvent, title: string, subtitle: string | undefined, lines: string[]) => {
    const rect = containerRef.current?.getBoundingClientRect()
    const cx = e.clientX - (rect?.left || 0)
    const cy = e.clientY - (rect?.top || 0)
    setTooltip({ x: cx + 10, y: cy + 10, title, subtitle, lines, visible: true })
  }
  
  const moveTip = (e: React.MouseEvent) => {
    if (!tooltip.visible) return
    const rect = containerRef.current?.getBoundingClientRect()
    const cx = e.clientX - (rect?.left || 0)
    const cy = e.clientY - (rect?.top || 0)
    setTooltip(t => ({ ...t, x: cx + 10, y: cy + 10 }))
  }
  
  const hideTip = () => setTooltip(t => ({ ...t, visible: false }))
  const clamp = (v: number, min: number, max: number) => Math.max(min, Math.min(max, v))

  // Extract planet and star properties with defaults
  const starRadius = planet.st_rad || 1
  const starTeff = planet.st_teff || 5800
  const planetRadius = planet.pl_rade || 1
  const semiMajorAxis = planet.pl_orbsmax || 1
  const eccentricity = planet.pl_orbeccen || 0
  const inclination = planet.pl_orbincl || 0
  const period = planet.pl_orbper || 365
  const starName = planet.hostname || 'Unknown Star'
  const planetName = planet.pl_name

  // Visual scaling to fit a wide range of systems nicely into the 100x100 viewBox
  const aAU = clamp(semiMajorAxis, 0.05, 30)
  const ecc = clamp(eccentricity, 0, 0.95)
  const srSolar = clamp(starRadius, 0.1, 20)
  const prEarth = clamp(planetRadius, 0.2, 20)

  // Determine scene scale so that apoapsis fits with some padding
  const apo = aAU * (1 + ecc)
  const scale = 34 / (apo + srSolar * 0.7 + 1.5) // px per AU in the 100x100 box
  const aPx = aAU * scale
  const bPx = aPx * Math.sqrt(1 - ecc * ecc)
  const incRad = clamp(inclination * Math.PI / 180, 0, Math.PI)
  const ry = bPx * Math.cos(incRad)

  // Star appearance by temperature (approximate color interpolation)
  function lerp(a: number, b: number, t: number) { return a + (b - a) * t }
  function lerpColor(c1: string, c2: string, t: number) {
    const h = (c: string) => [parseInt(c.slice(1, 3), 16), parseInt(c.slice(3, 5), 16), parseInt(c.slice(5, 7), 16)]
    const [r1, g1, b1] = h(c1)
    const [r2, g2, b2] = h(c2)
    const r = Math.round(lerp(r1, r2, t))
    const g = Math.round(lerp(g1, g2, t))
    const b = Math.round(lerp(b1, b2, t))
    return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`
  }
  const teff = clamp(starTeff, 3000, 10000)
  // keypoints: 3000K->orange, 5800K->yellow-white, 10000K->blue-white
  const starColor = teff < 5800
    ? lerpColor('#ffb36b', '#fff1b2', (teff - 3000) / (5800 - 3000))
    : lerpColor('#fff1b2', '#a9c8ff', (teff - 5800) / (10000 - 5800))

  // Sizes in px
  const starR = clamp(srSolar * scale * 0.9 + 2, 2, 12)
  const planetR = clamp(prEarth * scale * 0.3 + 0.6, 0.5, 5)

  // Orbit and position
  const cx = 50 + ecc * aPx
  const cy = 50
  const now = Date.now() / 1000
  const T = clamp(period / 10, 4, 50) // visual period seconds
  const theta = ((now % T) / T) * 2 * Math.PI
  const px = cx + aPx * Math.cos(theta)
  const py = cy + ry * Math.sin(theta)

  // Planet shading: gradient pointing away from star
  const dx = px - 50
  const dy = py - 50
  const dist = Math.max(0.0001, Math.sqrt(dx * dx + dy * dy))
  const lx = dx / dist
  const ly = dy / dist
  const gradId = `planetShade-${Math.round(px * 100)}-${Math.round(py * 100)}`

  // Trail points
  const trailSteps = 14
  const trail: { x: number; y: number; o: number }[] = []
  for (let i = 1; i <= trailSteps; i++) {
    const t = theta - (i * 2 * Math.PI) / (trailSteps * 18)
    trail.push({ x: cx + aPx * Math.cos(t), y: cy + ry * Math.sin(t), o: 1 - i / (trailSteps + 1) })
  }

  // Periapsis/Apoapsis markers
  const peri = { x: cx - aPx, y: cy }
  const apoP = { x: cx + aPx, y: cy }

  // Background stars
  const bgStars = Array.from({ length: 60 }, (_, i) => ({
    x: (i * 131) % 100,
    y: (i * 197) % 100,
    r: ((i * 37) % 3) * 0.12 + 0.25,
    o: 0.35 + (((i * 53) % 10) / 40),
  }))

  // Check if this planet has a NASA visualization
  const nasaPlanets = ['HIP 65426 b', 'Kepler-22 b', 'GJ 15 A b', '55 Cancri e', 'PSR B1257+12 b']
  const hasNasaVisualization = nasaPlanets.includes(planetName)

  return (
    <div className="bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border clip-corner-cut">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold text-light-text-primary dark:text-dark-text-primary">
            Artist's Conception
          </h3>
          {hasNasaVisualization && (
            <div className="flex gap-2">
              <button
                onClick={() => setViewMode('custom')}
                className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                  viewMode === 'custom'
                    ? 'bg-primary-light-blue text-white'
                    : 'bg-light-border dark:bg-dark-border text-light-text-primary dark:text-dark-text-primary hover:bg-light-border/80 dark:hover:bg-dark-border/80'
                }`}
              >
                Custom View
              </button>
              <button
                onClick={() => setViewMode('nasa')}
                className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                  viewMode === 'nasa'
                    ? 'bg-primary-light-blue text-white'
                    : 'bg-light-border dark:bg-dark-border text-light-text-primary dark:text-dark-text-primary hover:bg-light-border/80 dark:hover:bg-dark-border/80'
                }`}
              >
                NASA View
              </button>
            </div>
          )}
        </div>
        
        {viewMode === 'nasa' && hasNasaVisualization ? (
          <div className="space-y-4">
            <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
              Interactive NASA visualization of the {planetName} system. Explore the exoplanet in 3D space with real astronomical data.
            </p>
            
            {/* Planet Selector */}
            <div>
              <label className="block text-sm font-medium text-light-text-primary dark:text-dark-text-primary mb-2">
                Select Planet:
              </label>
              <div className="flex flex-wrap gap-2">
                {['HIP 65426 b', 'Kepler-22 b', 'GJ 15 A b', '55 Cancri e', 'PSR B1257+12 b'].map((planet) => (
                  <button
                    key={planet}
                    onClick={() => setSelectedPlanet(planet)}
                    className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                      selectedPlanet === planet
                        ? 'bg-primary-light-blue text-white'
                        : 'bg-light-border dark:bg-dark-border text-light-text-primary dark:text-dark-text-primary hover:bg-light-border/80 dark:hover:bg-dark-border/80'
                    }`}
                  >
                    {planet}
                  </button>
                ))}
              </div>
            </div>

            {/* NASA Eyes Container */}
            <div className="relative h-[500px] rounded-lg overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900">
              <iframe
                src={`https://eyes.nasa.gov/apps/exo/#/planet/${selectedPlanet.replace(/\s+/g, '_')}`}
                title={`NASA Eyes on Exoplanets - ${selectedPlanet}`}
                className="w-full h-full border-0"
                loading="eager"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
                allowFullScreen
                style={{ width: '100%', height: '100%' }}
              />
            </div>

            <div className="text-xs text-light-text-secondary dark:text-dark-text-secondary">
              <p className="mb-1">
                <strong>Data Source:</strong> NASA Exoplanet Exploration Program
              </p>
              <p>
                This interactive visualization is provided by NASA and shows real exoplanet data 
                from various space missions and ground-based observations.
              </p>
            </div>
          </div>
        ) : (
          <>
            <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary mb-6">
              Interactive 2D visualization of the {planetName} system showing orbital mechanics in real-time. 
              Hover over elements for detailed information.
            </p>
        
        <div ref={containerRef} className="relative w-full aspect-square bg-black rounded-lg overflow-hidden" onMouseMove={moveTip}>
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <defs>
              <radialGradient id="bgGlow" cx="50%" cy="50%" r="75%">
                <stop offset="0%" stopColor="#0b1220" />
                <stop offset="100%" stopColor="#070c16" />
              </radialGradient>
              <radialGradient id="starCore" cx="50%" cy="50%" r="60%">
                <stop offset="0%" stopColor={starColor} />
                <stop offset="70%" stopColor={starColor} />
                <stop offset="100%" stopColor="transparent" />
              </radialGradient>
              <radialGradient id={gradId} cx={`${50 - lx * 30}%`} cy={`${50 - ly * 30}%`} r="60%">
                <stop offset="0%" stopColor="#d1ecff" />
                <stop offset="60%" stopColor="#6eb7ff" />
                <stop offset="100%" stopColor="#2b74b8" />
              </radialGradient>
              <filter id="softGlow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Background */}
            <rect x="0" y="0" width="100" height="100" fill="url(#bgGlow)" />
            {bgStars.map((s, i) => (
              <circle key={i} cx={s.x} cy={s.y} r={s.r} fill="#cbd5e1" opacity={s.o} />
            ))}

            {/* Star */}
            <g filter="url(#softGlow)"
               onMouseEnter={(e) => showTip(e, 'Star', starName, [
                 `Teff: ${Math.round(teff)} K`,
                 `Radius: ${srSolar.toFixed(2)} R☉`,
               ])}
               onMouseLeave={hideTip}
            >
              <circle cx="50" cy="50" r={starR * 2.6} fill="url(#starCore)" opacity="0.6" />
              <circle cx="50" cy="50" r={starR} fill={starColor} />
            </g>

            {/* Orbit ellipse */}
            <ellipse cx={cx} cy={cy} rx={aPx} ry={ry} fill="none" stroke="#4b5d88" strokeWidth="0.35"
              onMouseEnter={(e) => showTip(e, 'Orbit', undefined, [
                `a: ${aAU.toFixed(3)} AU`,
                `e: ${ecc.toFixed(3)}`,
                `i: ${inclination.toFixed(2)}°`,
                `P: ${period.toFixed(2)} d`,
              ])}
              onMouseLeave={hideTip}
            />
            {/* Periapsis & Apoapsis */}
            <g>
              <circle cx={peri.x} cy={peri.y} r={0.7} fill="#9fb3ff" />
              <circle cx={apoP.x} cy={apoP.y} r={0.7} fill="#9fb3ff" />
            </g>

            {/* Trail */}
            <g>
              {trail.map((t, i) => (
                <circle key={i} cx={t.x} cy={t.y} r={planetR * 0.6} fill="#7cc0ff" opacity={0.08 * t.o} />
              ))}
            </g>

            {/* Planet */}
            <g filter="url(#softGlow)"
              onMouseEnter={(e) => showTip(e, 'Planet', planetName, [
                `Radius: ${prEarth.toFixed(2)} R⊕`,
                `a: ${aAU.toFixed(3)} AU`,
                `P: ${period.toFixed(2)} d`,
              ])}
              onMouseLeave={hideTip}
            >
              <circle cx={px} cy={py} r={planetR} fill={`url(#${gradId})`} stroke="#bde1ff" strokeWidth="0.15" />
            </g>
          </svg>

          {tooltip.visible && (
            <div
              className="absolute z-10 bg-black/80 text-white text-xs px-3 py-2 pointer-events-none shadow-lg border border-white/20 max-w-[220px] clip-angled-tag backdrop-blur-sm"
              style={{ left: tooltip.x, top: tooltip.y }}
            >
              <div className="font-semibold mb-1">{tooltip.title}</div>
              {tooltip.subtitle && (
                <div className="text-[10px] opacity-80 mb-1">{tooltip.subtitle}</div>
              )}
              {tooltip.lines.map((l, i) => (
                <div key={i} className="leading-snug">{l}</div>
              ))}
            </div>
          )}
        </div>
        
        <div className="mt-4 text-xs text-light-text-secondary dark:text-dark-text-secondary">
          <p className="mb-1">
            <strong>Visualization Notes:</strong> Animation speed is accelerated for viewing. 
            Real orbital periods range from hours to years.
          </p>
          <p>
            Sizes and distances are scaled for visibility. Actual exoplanet systems may vary significantly from this representation.
          </p>
        </div>
          </>
        )}
      </div>
    </div>
  )
}

