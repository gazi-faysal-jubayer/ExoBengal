'use client'

import { useMemo, useState } from 'react'
import { useExplorerStore } from '@/lib/explorer-store'

type NumericKey =
  | 'pl_rade'
  | 'pl_masse'
  | 'pl_orbper'
  | 'pl_orbsmax'
  | 'pl_orbeccen'
  | 'pl_orbincl'
  | 'st_rad'
  | 'st_mass'
  | 'st_teff'
  | 'sy_dist'

const PARAMS: { key: NumericKey; label: string; unit?: string }[] = [
  { key: 'pl_rade', label: 'Radius (R⊕)' },
  { key: 'pl_masse', label: 'Mass (M⊕)' },
  { key: 'pl_orbper', label: 'Period (days)' },
  { key: 'pl_orbsmax', label: 'Semi-Major Axis (AU)' },
  { key: 'pl_orbeccen', label: 'Eccentricity' },
  { key: 'pl_orbincl', label: 'Inclination (°)' },
  { key: 'st_rad', label: 'Stellar Radius (R☉)' },
  { key: 'st_mass', label: 'Stellar Mass (M☉)' },
  { key: 'st_teff', label: 'Stellar Teff (K)' },
  { key: 'sy_dist', label: 'Distance (pc)' },
]

function isFiniteNumber(n: unknown): n is number {
  return typeof n === 'number' && Number.isFinite(n)
}

function pearsonCorrelation(a: number[], b: number[]): number | null {
  const n = Math.min(a.length, b.length)
  if (n === 0) return null
  let sumX = 0
  let sumY = 0
  let sumXY = 0
  let sumX2 = 0
  let sumY2 = 0
  let count = 0
  for (let i = 0; i < n; i++) {
    const x = a[i]
    const y = b[i]
    if (!isFiniteNumber(x) || !isFiniteNumber(y)) continue
    sumX += x
    sumY += y
    sumXY += x * y
    sumX2 += x * x
    sumY2 += y * y
    count++
  }
  if (count < 3) return null
  const num = count * sumXY - sumX * sumY
  const den = Math.sqrt((count * sumX2 - sumX * sumX) * (count * sumY2 - sumY * sumY))
  if (den === 0) return null
  const r = num / den
  return Math.max(-1, Math.min(1, r))
}

function colorForCorrelation(r: number | null): string {
  if (r === null || Number.isNaN(r)) return 'bg-gray-200 dark:bg-gray-800'
  // Map [-1,1] -> red to blue with white at 0
  // We'll compute via HSL: red ~ 0deg, blue ~ 220deg; interpolate 0..1 to 0..220
  const t = (r + 1) / 2 // 0..1
  const hue = 220 * t // 0 red -> 220 blue
  const light = 50
  return `bg-[hsl(${hue}deg_70%_${light}%)]`
}

export default function ParameterCorrelations() {
  const rows = useExplorerStore(s => s.rows)

  const [selectedX, setSelectedX] = useState<NumericKey>('pl_rade')
  const [selectedY, setSelectedY] = useState<NumericKey>('pl_masse')

  const numericData: Record<NumericKey, number[]> = useMemo(() => {
    const out: Record<NumericKey, number[]> = {
      pl_rade: [],
      pl_masse: [],
      pl_orbper: [],
      pl_orbsmax: [],
      pl_orbeccen: [],
      pl_orbincl: [],
      st_rad: [],
      st_mass: [],
      st_teff: [],
      sy_dist: [],
    }
    for (const r of rows) {
      for (const p of PARAMS) {
        const v = (r as any)[p.key]
        out[p.key].push(typeof v === 'number' ? v : NaN)
      }
    }
    return out
  }, [rows])

  const matrix = useMemo(() => {
    const size = PARAMS.length
    const m: (number | null)[][] = Array.from({ length: size }, () => Array(size).fill(null))
    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        const r = pearsonCorrelation(numericData[PARAMS[i].key], numericData[PARAMS[j].key])
        m[i][j] = r
      }
    }
    return m
  }, [numericData])

  const scatterPoints = useMemo(() => {
    const xs = numericData[selectedX]
    const ys = numericData[selectedY]
    const pts: { x: number; y: number }[] = []
    for (let i = 0; i < Math.min(xs.length, ys.length); i++) {
      const x = xs[i]
      const y = ys[i]
      if (isFiniteNumber(x) && isFiniteNumber(y)) pts.push({ x, y })
    }
    // sample to at most 4000 points for perf
    if (pts.length > 4000) return pts.filter((_, idx) => idx % Math.ceil(pts.length / 4000) === 0)
    return pts
  }, [numericData, selectedX, selectedY])

  const rXY = useMemo(() => pearsonCorrelation(numericData[selectedX], numericData[selectedY]), [numericData, selectedX, selectedY])

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="flex flex-wrap gap-3 items-end">
        <div>
          <label className="block text-xs mb-1 text-light-text-secondary dark:text-dark-text-secondary">X Axis</label>
          <select value={selectedX} onChange={e => setSelectedX(e.target.value as NumericKey)} className="input-base text-sm py-1">
            {PARAMS.map(p => (
              <option key={p.key} value={p.key}>{p.label}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-xs mb-1 text-light-text-secondary dark:text-dark-text-secondary">Y Axis</label>
          <select value={selectedY} onChange={e => setSelectedY(e.target.value as NumericKey)} className="input-base text-sm py-1">
            {PARAMS.map(p => (
              <option key={p.key} value={p.key}>{p.label}</option>
            ))}
          </select>
        </div>
        <div className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
          Correlation r: <span className="font-medium text-light-text-primary dark:text-dark-text-primary">{rXY === null ? '—' : rXY.toFixed(3)}</span>
        </div>
      </div>

      {/* Heatmap */}
      <div className="overflow-x-auto">
        <div className="min-w-[640px]">
          <div className="grid" style={{ gridTemplateColumns: `160px repeat(${PARAMS.length}, minmax(36px, 1fr))` }}>
            <div></div>
            {PARAMS.map((p) => (
              <div key={`col-${p.key}`} className="p-1 text-[10px] text-center text-light-text-secondary dark:text-dark-text-secondary truncate">{p.label}</div>
            ))}
            {PARAMS.map((rowParam, i) => (
              <>
                <div key={`row-label-${rowParam.key}`} className="p-1 text-[10px] text-right pr-2 text-light-text-secondary dark:text-dark-text-secondary truncate">{rowParam.label}</div>
                {PARAMS.map((colParam, j) => {
                  const r = matrix[i][j]
                  return (
                    <div
                      key={`cell-${rowParam.key}-${colParam.key}`}
                      className={`h-8 w-full border border-light-border/40 dark:border-dark-border/40 ${colorForCorrelation(r)}`}
                      title={`${rowParam.label} vs ${colParam.label}: ${r === null ? 'n/a' : r.toFixed(3)}`}
                    />
                  )
                })}
              </>
            ))}
          </div>
        </div>
      </div>

      {/* Scatter plot */}
      <div className="h-80 bg-light-surface dark:bg-dark-surface rounded-md relative overflow-hidden">
        <svg className="w-full h-full">
          {(() => {
            if (scatterPoints.length === 0) return null
            const xs = scatterPoints.map(p => p.x)
            const ys = scatterPoints.map(p => p.y)
            const minX = Math.min(...xs)
            const maxX = Math.max(...xs)
            const minY = Math.min(...ys)
            const maxY = Math.max(...ys)
            const padX = (maxX - minX) * 0.05 || 1
            const padY = (maxY - minY) * 0.05 || 1
            const x0 = minX - padX
            const x1 = maxX + padX
            const y0 = minY - padY
            const y1 = maxY + padY
            const project = (x: number, y: number) => {
              const px = ((x - x0) / (x1 - x0)) * 100
              const py = 100 - ((y - y0) / (y1 - y0)) * 100
              return { px, py }
            }
            return (
              <g>
                {scatterPoints.map((pt, idx) => {
                  const { px, py } = project(pt.x, pt.y)
                  return <circle key={idx} cx={`${px}%`} cy={`${py}%`} r={1.5} fill="#60a5fa" fillOpacity={0.6} />
                })}
              </g>
            )
          })()}
        </svg>
        <div className="absolute bottom-2 left-2 text-xs text-light-text-secondary dark:text-dark-text-secondary">
          {PARAMS.find(p => p.key === selectedX)?.label} vs {PARAMS.find(p => p.key === selectedY)?.label}
        </div>
      </div>
    </div>
  )
}


