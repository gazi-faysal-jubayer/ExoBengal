'use client'

import { useMemo, useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Star, Orbit, Thermometer, Ruler, Weight, Clock, ExternalLink, Heart, Share2 } from 'lucide-react'
import { useExplorerStore } from '@/lib/explorer-store'
import dynamic from 'next/dynamic'

function NotesPanel({ planetName }: { planetName: string }) {
  const notesByPlanet = useExplorerStore(s => s.notesByPlanet)
  const addNote = useExplorerStore(s => s.addNote)
  const deleteNote = useExplorerStore(s => s.deleteNote)
  const [text, setText] = useState('')
  const notes = (notesByPlanet && notesByPlanet[planetName]) || []
  return (
    <div className="space-y-3">
      <div className="flex gap-2">
        <input
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="Add a note about this planet..."
          className="flex-1 input-base py-2"
        />
        <button
          onClick={() => { if (text.trim()) { addNote(planetName, text.trim()); setText('') } }}
          className="btn-primary text-sm"
        >
          Add
        </button>
      </div>
      {notes.length === 0 ? (
        <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">No notes yet.</p>
      ) : (
        <ul className="space-y-2">
          {notes.map((n, i) => (
            <li key={i} className="flex items-start justify-between gap-3 p-3 rounded border border-light-border dark:border-dark-border">
              <span className="text-sm">{n}</span>
              <button onClick={() => deleteNote(planetName, i)} className="text-xs text-light-text-secondary hover:text-semantic-warning">Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

interface DetailViewProps {
  planetId: string
  onClose: () => void
}

function stripHtml(input?: string): string {
  if (!input) return ''
  return input.replace(/<[^>]*>/g, '').trim()
}

function extractAtUrl(ref?: string): string | null {
  if (!ref) return null
  const hrefMatch = ref.match(/href\s*=\s*['"]?([^'">\s]+)['"]?/i)
  if (hrefMatch && hrefMatch[1]) return `${hrefMatch[1]}`
  const urlMatch = ref.match(/https?:\/\/[^\s'">]+/i)
  if (urlMatch && urlMatch[0]) return `${urlMatch[0]}`
  return null
}

function formatNum(n?: number, unit?: string) {
  if (n === undefined || n === null) return '—'
  return `${n}${unit ? ` ${unit}` : ''}`
}

const OrbitalSystemViewer = dynamic(() => import('./orbital-system-viewer'), { ssr: false })

function ArtistConception({
  starRadius,
  starTeff,
  planetRadius,
  semiMajorAxis,
  eccentricity,
  inclination,
  period,
  starName,
  planetName,
}: {
  starRadius?: number
  starTeff?: number
  planetRadius?: number
  semiMajorAxis?: number
  eccentricity?: number
  inclination?: number
  period?: number
  starName?: string
  planetName?: string
}) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [tooltip, setTooltip] = useState<{ x: number; y: number; title: string; subtitle?: string; lines: string[]; visible: boolean }>({ x: 0, y: 0, title: '', subtitle: '', lines: [], visible: false })

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

  // Visual scaling to fit a wide range of systems nicely into the 100x100 viewBox
  const aAU = clamp(semiMajorAxis || 1, 0.05, 30)
  const ecc = clamp(eccentricity || 0, 0, 0.95)
  const srSolar = clamp(starRadius || 1, 0.1, 20)
  const prEarth = clamp(planetRadius || 1, 0.2, 20)

  // Determine scene scale so that apoapsis fits with some padding
  const apo = aAU * (1 + ecc)
  const scale = 34 / (apo + srSolar * 0.7 + 1.5) // px per AU in the 100x100 box
  const aPx = aAU * scale
  const bPx = aPx * Math.sqrt(1 - ecc * ecc)
  const incRad = clamp((inclination || 0) * Math.PI / 180, 0, Math.PI)
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
  const teff = clamp(starTeff || 5800, 3000, 10000)
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
  const T = clamp((period || 365) / 10, 4, 50) // visual period seconds
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

  return (
    <div ref={containerRef} className="relative w-full h-full" onMouseMove={moveTip}>
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
          `i: ${(inclination || 0).toFixed(2)}°`,
          `P: ${(period || 0).toFixed(2)} d`,
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
          `P: ${(period || 0).toFixed(2)} d`,
        ])}
        onMouseLeave={hideTip}
      >
        <circle cx={px} cy={py} r={planetR} fill={`url(#${gradId})`} stroke="#bde1ff" strokeWidth="0.15" />
      </g>
      </svg>

      {tooltip.visible && (
        <div
          className="absolute z-10 rounded-md bg-black/75 text-white text-xs px-3 py-2 pointer-events-none shadow-lg border border-white/10 max-w-[220px]"
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
  )
}

export function DetailView({ planetId, onClose }: DetailViewProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'physical' | 'orbital' | 'host-star' | 'habitability' | 'references' | 'notes'>('overview')
  const [isFavorite, setIsFavorite] = useState(false)
  const rows = useExplorerStore(s => s.rows)
  const planet = useMemo(() => rows.find(r => r.pl_name === planetId), [rows, planetId])

  if (!planet) {
    return null
  }

  const tabs = [
    { id: 'overview' as const, label: 'Overview', icon: Star },
    { id: 'physical' as const, label: 'Physical', icon: Ruler },
    { id: 'orbital' as const, label: 'Orbital', icon: Orbit },
    { id: 'host-star' as const, label: 'Host Star', icon: Star },
    { id: 'habitability' as const, label: 'Habitability', icon: Thermometer },
    { id: 'references' as const, label: 'References', icon: ExternalLink },
    { id: 'notes' as const, label: 'Notes', icon: Heart },
  ]

  const formatValue = (value: any) => {
    if (typeof value === 'object' && value.value !== undefined) {
      return `${value.value}${value.unit ? ` ${value.unit}` : ''}${value.uncertainty ? ` ${value.uncertainty}` : ''}${value.estimated ? ' (est.)' : ''}`
    }
    return value
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-6">
            {/* 3D Orbital System Viewer */}
            <div className="aspect-video rounded-lg overflow-hidden bg-black">
              <OrbitalSystemViewer hostName={planet.hostname} />
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-2">Discovery Story</h3>
              <p className="text-light-text-secondary dark:text-dark-text-secondary">
                {stripHtml(planet.disc_refname) || 'Discovered and cataloged in the NASA Exoplanet Archive.'}
              </p>
              {extractAtUrl(planet.disc_refname) && (
                <button
                  onClick={() => window.open(extractAtUrl(planet.disc_refname)!, '_blank', 'noopener,noreferrer')}
                  className="btn-secondary text-sm inline-flex items-center gap-2 mt-2"
                >
                  Open Reference <ExternalLink className="h-3 w-3" />
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="card p-4">
                <h4 className="font-medium mb-2 flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  Discovery Details
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-light-text-secondary dark:text-dark-text-secondary">Date:</span>
                    <span>{planet.disc_pubdate || (planet.disc_year ? String(planet.disc_year) : '—')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-light-text-secondary dark:text-dark-text-secondary">Method:</span>
                    <span>{planet.discoverymethod || '—'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-light-text-secondary dark:text-dark-text-secondary">Telescope:</span>
                    <span>{planet.disc_telescope || planet.disc_facility || '—'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-light-text-secondary dark:text-dark-text-secondary">Instrument:</span>
                    <span>{(planet as any).disc_instrument || '—'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-light-text-secondary dark:text-dark-text-secondary">Solution Type:</span>
                    <span>{(planet as any).soltype || '—'}</span>
                  </div>
                </div>
              </div>

              <div className="card p-4">
                <h4 className="font-medium mb-2">Quick Facts</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-light-text-secondary dark:text-dark-text-secondary">Radius:</span>
                    <span>{formatNum(planet.pl_rade, 'R⊕')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-light-text-secondary dark:text-dark-text-secondary">Period:</span>
                    <span>{formatNum(planet.pl_orbper, 'days')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-light-text-secondary dark:text-dark-text-secondary">Distance:</span>
                    <span>{formatNum(planet.sy_dist, 'pc')}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )

      case 'physical':
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Physical Properties</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="card p-4"><h4 className="font-medium mb-2">Radius</h4><p className="text-xl font-bold text-primary-dark-blue">{formatNum(planet.pl_rade, 'R⊕')}</p></div>
              <div className="card p-4"><h4 className="font-medium mb-2">Mass</h4><p className="text-xl font-bold text-primary-dark-blue">{formatNum(planet.pl_masse, 'M⊕')}</p></div>
              <div className="card p-4"><h4 className="font-medium mb-2">Radius (Jupiter)</h4><p className="text-xl font-bold text-primary-dark-blue">{formatNum(planet.pl_radj, 'R♃')}</p></div>
              <div className="card p-4"><h4 className="font-medium mb-2">Mass (Jupiter)</h4><p className="text-xl font-bold text-primary-dark-blue">{formatNum(planet.pl_massj, 'M♃')}</p></div>
              <div className="card p-4"><h4 className="font-medium mb-2">Equilibrium Temp</h4><p className="text-xl font-bold text-primary-dark-blue">{formatNum((planet as any).pl_eqt, 'K')}</p></div>
            </div>
          </div>
        )

      case 'orbital':
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Orbital Characteristics</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="card p-4"><h4 className="font-medium mb-2">Period</h4><p className="text-xl font-bold text-primary-dark-blue">{formatNum(planet.pl_orbper, 'days')}</p></div>
              <div className="card p-4"><h4 className="font-medium mb-2">Semi-Major Axis</h4><p className="text-xl font-bold text-primary-dark-blue">{formatNum(planet.pl_orbsmax, 'AU')}</p></div>
              <div className="card p-4"><h4 className="font-medium mb-2">Eccentricity</h4><p className="text-xl font-bold text-primary-dark-blue">{formatNum(planet.pl_orbeccen)}</p></div>
              <div className="card p-4"><h4 className="font-medium mb-2">Inclination</h4><p className="text-xl font-bold text-primary-dark-blue">{formatNum(planet.pl_orbincl, '°')}</p></div>
            </div>
          </div>
        )

      case 'host-star':
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Host Star: {planet.hostname}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="card p-4"><h4 className="font-medium mb-2">Stellar Radius</h4><p className="text-xl font-bold text-primary-dark-blue">{formatNum(planet.st_rad, 'R☉')}</p></div>
              <div className="card p-4"><h4 className="font-medium mb-2">Stellar Mass</h4><p className="text-xl font-bold text-primary-dark-blue">{formatNum(planet.st_mass, 'M☉')}</p></div>
              <div className="card p-4"><h4 className="font-medium mb-2">Effective Temperature</h4><p className="text-xl font-bold text-primary-dark-blue">{formatNum(planet.st_teff, 'K')}</p></div>
            </div>
          </div>
        )

      case 'habitability':
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Habitability Assessment</h3>
            <div className="space-y-4">
              <div className="card p-4">
                <h4 className="font-medium mb-2">Habitable Zone Status</h4>
                <div className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full bg-gray-500`}></div>
                  <span>Not available from CSV</span>
                </div>
              </div>
            </div>
          </div>
        )

      case 'references':
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Scientific References</h3>
            <div className="space-y-4">
              <div className="card p-4">
                <h4 className="font-medium mb-2">Reference</h4>
                <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary mb-2">
                  {stripHtml(planet.disc_refname) || '—'}
                </p>
                {extractAtUrl(planet.disc_refname) && (
                  <button
                    onClick={() => window.open(extractAtUrl(planet.disc_refname)!, '_blank', 'noopener,noreferrer')}
                    className="btn-secondary text-sm inline-flex items-center gap-2"
                  >
                    Open Reference <ExternalLink className="h-3 w-3" />
                  </button>
                )}
              </div>
            </div>
          </div>
        )

      case 'notes':
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Notes for {planet.pl_name}</h3>
            <NotesPanel planetName={planet.pl_name} />
          </div>
        )

      default:
        return null
    }
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="bg-light-card dark:bg-dark-card rounded-lg shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
          onClick={e => e.stopPropagation()}
        >
          {/* Header */}
          <div className="p-6 border-b border-light-border dark:border-dark-border">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-light-text-primary dark:text-dark-text-primary">
                  {planet.pl_name}
                </h2>
                <p className="text-light-text-secondary dark:text-dark-text-secondary">
                  {planet.hostname}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsFavorite(!isFavorite)}
                  className={`p-2 rounded-md transition-colors ${
                    isFavorite 
                      ? 'text-semantic-warning' 
                      : 'text-light-text-secondary dark:text-dark-text-secondary hover:text-semantic-warning'
                  }`}
                >
                  <Heart className={`h-5 w-5 ${isFavorite ? 'fill-current' : ''}`} />
                </button>
                <button className="p-2 rounded-md text-light-text-secondary dark:text-dark-text-secondary hover:text-light-text-primary dark:hover:text-dark-text-primary transition-colors">
                  <Share2 className="h-5 w-5" />
                </button>
                <button
                  onClick={onClose}
                  className="p-2 rounded-md text-light-text-secondary dark:text-dark-text-secondary hover:text-light-text-primary dark:hover:text-dark-text-primary transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="border-b border-light-border dark:border-dark-border">
            <div className="flex overflow-x-auto scrollbar-hide">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-3 text-sm whitespace-nowrap border-b-2 transition-colors ${
                    activeTab === tab.id
                      ? 'border-primary-dark-blue text-primary-dark-blue dark:text-primary-light-blue'
                      : 'border-transparent text-light-text-secondary dark:text-dark-text-secondary hover:text-light-text-primary dark:hover:text-dark-text-primary'
                  }`}
                >
                  <tab.icon className="h-4 w-4" />
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="p-6 max-h-[60vh] overflow-y-auto">
            {renderTabContent()}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
