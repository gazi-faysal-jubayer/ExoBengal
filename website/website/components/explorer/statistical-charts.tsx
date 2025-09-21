'use client'

import { useEffect, useMemo, useState } from 'react'
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ScatterChart, Scatter, PieChart, Pie, Cell, BarChart, Bar } from 'recharts'
import { loadExoplanetsFromCSV, type ExplorerPlanetRow } from '@/lib/csv-loader'

const METHOD_COLORS: Record<string, string> = {
  Transit: '#355381',
  'Radial Velocity': '#82b2d7',
  Microlensing: '#b6e2f4',
  'Direct Imaging': '#ef7454',
  Astrometry: '#2b3952',
}

const RADIAN = Math.PI / 180
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: any) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5
  const x = cx + radius * Math.cos(-midAngle * RADIAN)
  const y = cy + radius * Math.sin(-midAngle * RADIAN)

  return (
    <text 
      x={x} 
      y={y} 
      fill="white" 
      textAnchor={x > cx ? 'start' : 'end'} 
      dominantBaseline="central"
      fontSize={12}
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  )
}

type ChartType = 'timeline' | 'mass-radius' | 'methods' | 'radius-dist' | 'mass-dist' | 'period-axis' | 'habitable-zone'

export default function StatisticalCharts() {
  const [activeChart, setActiveChart] = useState<ChartType>('timeline')
  const [rows, setRows] = useState<ExplorerPlanetRow[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false
    const load = async () => {
      try {
        const data = await loadExoplanetsFromCSV('/PS_2025.09.12_13.49.08.csv')
        if (!cancelled) setRows(data)
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    load()
    return () => { cancelled = true }
  }, [])

  const discoveryTimelineData = useMemo(() => {
    const yearCounts: Record<number, { cumulative: number; transit: number; radial_velocity: number; microlensing: number; direct_imaging: number }> = {}
    const years = new Set<number>()
    rows.forEach(r => {
      if (!r.disc_year) return
      years.add(r.disc_year)
      if (!yearCounts[r.disc_year]) {
        yearCounts[r.disc_year] = { cumulative: 0, transit: 0, radial_velocity: 0, microlensing: 0, direct_imaging: 0 }
      }
      const method = (r.discoverymethod || '').toLowerCase()
      if (method.includes('transit')) yearCounts[r.disc_year].transit++
      else if (method.includes('radial')) yearCounts[r.disc_year].radial_velocity++
      else if (method.includes('micro')) yearCounts[r.disc_year].microlensing++
      else if (method.includes('imaging')) yearCounts[r.disc_year].direct_imaging++
    })
    const sortedYears = Array.from(years).sort((a, b) => a - b)
    let cumulative = 0
    return sortedYears.map(year => {
      const yc = yearCounts[year] || { cumulative: 0, transit: 0, radial_velocity: 0, microlensing: 0, direct_imaging: 0 }
      const totalYear = yc.transit + yc.radial_velocity + yc.microlensing + yc.direct_imaging
      cumulative += totalYear
      return { year, transit: yc.transit, radial_velocity: yc.radial_velocity, microlensing: yc.microlensing, direct_imaging: yc.direct_imaging, cumulative }
    })
  }, [rows])

  const massRadiusData = useMemo(() => {
    const MAX_POINTS = 1000
    const out: { mass: number; radius: number; type: string; name: string }[] = []
    for (const r of rows) {
      if (r.pl_masse && r.pl_rade) {
        const type = r.pl_rade > 8 ? 'Gas Giant' : r.pl_rade > 2 ? 'Ice Giant' : 'Rocky'
        out.push({ mass: r.pl_masse, radius: r.pl_rade, type, name: r.pl_name })
        if (out.length >= MAX_POINTS) break
      }
    }
    return out
  }, [rows])

  const discoveryMethodData = useMemo(() => {
    const counts: Record<string, number> = {}
    rows.forEach(r => {
      const key = r.discoverymethod || 'Unknown'
      counts[key] = (counts[key] || 0) + 1
    })
    return Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 8)
      .map(([name, value]) => ({ name, value, color: METHOD_COLORS[name] || '#6b7280' }))
  }, [rows])

  const radiusDistData = useMemo(() => {
    const bins: { label: string; min: number; max: number }[] = []
    for (let i = 0; i < 20; i++) {
      bins.push({ label: `${i}-${i + 1}`, min: i, max: i + 1 })
    }
    bins.push({ label: '20+', min: 20, max: Infinity })
    const counts: Record<string, number> = {}
    rows.forEach(r => {
      const val = r.pl_rade
      if (!val && val !== 0) return
      const bin = bins.find(b => val >= b.min && val < b.max)
      if (!bin) return
      counts[bin.label] = (counts[bin.label] || 0) + 1
    })
    return bins.map(b => ({ bin: b.label, count: counts[b.label] || 0 }))
  }, [rows])

  const massDistData = useMemo(() => {
    const bins = [
      { label: '0-1', min: 0, max: 1 },
      { label: '1-10', min: 1, max: 10 },
      { label: '10-100', min: 10, max: 100 },
      { label: '100-1000', min: 100, max: 1000 },
      { label: '1000+', min: 1000, max: Infinity },
    ]
    const counts: Record<string, number> = {}
    rows.forEach(r => {
      const val = r.pl_masse
      if (!val && val !== 0) return
      const bin = bins.find(b => val >= b.min && val < b.max)
      if (!bin) return
      counts[bin.label] = (counts[bin.label] || 0) + 1
    })
    return bins.map(b => ({ bin: b.label, count: counts[b.label] || 0 }))
  }, [rows])

  const periodAxisData = useMemo(() => {
    const pts: { period: number; axis: number; name: string }[] = []
    for (const r of rows) {
      if (typeof r.pl_orbper === 'number' && typeof r.pl_orbsmax === 'number') {
        pts.push({ period: r.pl_orbper, axis: r.pl_orbsmax, name: r.pl_name })
      }
      if (pts.length >= 1500) break
    }
    return pts
  }, [rows])

  const renderChart = () => {
    if (loading) {
      return <div className="h-80 flex items-center justify-center text-light-text-secondary dark:text-dark-text-secondary">Loading charts…</div>
    }
    switch (activeChart) {
      case 'timeline':
        return (
          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={discoveryTimelineData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis 
                dataKey="year" 
                stroke="#9CA3AF"
                tick={{ fill: '#9CA3AF' }}
              />
              <YAxis 
                stroke="#9CA3AF"
                tick={{ fill: '#9CA3AF' }}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1F2937',
                  border: '1px solid #374151',
                  borderRadius: '8px',
                  color: '#F9FAFB'
                }}
              />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="cumulative" 
                stroke="#355381" 
                strokeWidth={3}
                name="Total Discoveries"
              />
              <Line 
                type="monotone" 
                dataKey="transit" 
                stroke="#82b2d7" 
                strokeWidth={2}
                name="Transit Method"
              />
              <Line 
                type="monotone" 
                dataKey="radial_velocity" 
                stroke="#b6e2f4" 
                strokeWidth={2}
                name="Radial Velocity"
              />
            </LineChart>
          </ResponsiveContainer>
        )

      case 'mass-radius':
        return (
          <ResponsiveContainer width="100%" height={350}>
            <ScatterChart data={massRadiusData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis 
                dataKey="mass" 
                type="number"
                scale="log"
                domain={['dataMin', 'dataMax']}
                stroke="#9CA3AF"
                tick={{ fill: '#9CA3AF' }}
                label={{ value: 'Mass (Earth Masses)', position: 'insideBottom', offset: -5, fill: '#9CA3AF' }}
              />
              <YAxis 
                dataKey="radius"
                type="number"
                scale="log"
                domain={['dataMin', 'dataMax']}
                stroke="#9CA3AF"
                tick={{ fill: '#9CA3AF' }}
                label={{ value: 'Radius (Earth Radii)', angle: -90, position: 'insideLeft', fill: '#9CA3AF' }}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1F2937',
                  border: '1px solid #374151',
                  borderRadius: '8px',
                  color: '#F9FAFB'
                }}
                formatter={(value, name) => [value, name]}
                labelFormatter={(label, payload) => payload?.[0]?.payload?.name || 'Planet'}
              />
              <Scatter 
                name="Rocky Planets" 
                data={massRadiusData.filter(d => d.type === 'Rocky')}
                fill="#ef7454" 
              />
              <Scatter 
                name="Ice Giants" 
                data={massRadiusData.filter(d => d.type === 'Ice Giant')}
                fill="#82b2d7" 
              />
              <Scatter 
                name="Gas Giants" 
                data={massRadiusData.filter(d => d.type === 'Gas Giant')}
                fill="#355381" 
              />
            </ScatterChart>
          </ResponsiveContainer>
        )

      case 'methods':
        return (
          <ResponsiveContainer width="100%" height={350}>
            <PieChart>
              <Pie
                data={discoveryMethodData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={120}
                fill="#8884d8"
                dataKey="value"
              >
                {discoveryMethodData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1F2937',
                  border: '1px solid #374151',
                  borderRadius: '8px',
                  color: '#F9FAFB'
                }}
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        )

      case 'radius-dist':
        return (
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={radiusDistData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="bin" stroke="#9CA3AF" tick={{ fill: '#9CA3AF' }} angle={-30} height={60} textAnchor="end" interval={0} />
              <YAxis stroke="#9CA3AF" tick={{ fill: '#9CA3AF' }} />
              <Tooltip contentStyle={{ backgroundColor: '#1F2937', border: '1px solid #374151', borderRadius: '8px', color: '#F9FAFB' }} />
              <Legend />
              <Bar dataKey="count" name="Planets" fill="#355381" />
            </BarChart>
          </ResponsiveContainer>
        )

      case 'mass-dist':
        return (
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={massDistData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="bin" stroke="#9CA3AF" tick={{ fill: '#9CA3AF' }} />
              <YAxis stroke="#9CA3AF" tick={{ fill: '#9CA3AF' }} />
              <Tooltip contentStyle={{ backgroundColor: '#1F2937', border: '1px solid #374151', borderRadius: '8px', color: '#F9FAFB' }} />
              <Legend />
              <Bar dataKey="count" name="Planets" fill="#82b2d7" />
            </BarChart>
          </ResponsiveContainer>
        )

      case 'period-axis':
        return (
          <ResponsiveContainer width="100%" height={350}>
            <ScatterChart data={periodAxisData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="period" type="number" scale="log" stroke="#9CA3AF" tick={{ fill: '#9CA3AF' }} label={{ value: 'Orbital Period (days)', position: 'insideBottom', offset: -5, fill: '#9CA3AF' }} />
              <YAxis dataKey="axis" type="number" scale="log" stroke="#9CA3AF" tick={{ fill: '#9CA3AF' }} label={{ value: 'Semi-Major Axis (AU)', angle: -90, position: 'insideLeft', fill: '#9CA3AF' }} />
              <Tooltip contentStyle={{ backgroundColor: '#1F2937', border: '1px solid #374151', borderRadius: '8px', color: '#F9FAFB' }} formatter={(value, name) => [value, name]} labelFormatter={(label, payload) => payload?.[0]?.payload?.name || 'Planet'} />
              <Scatter name="Planets" fill="#ef7454" />
            </ScatterChart>
          </ResponsiveContainer>
        )

      case 'habitable-zone':
        return (
          <div className="h-350 flex items-center justify-center">
            <div className="text-center">
              <div className="w-64 h-64 mx-auto mb-4 bg-gradient-to-br from-blue-500 to-green-500 rounded-full flex items-center justify-center">
                <div className="w-32 h-32 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">Star</span>
                </div>
              </div>
              <p className="text-light-text-secondary dark:text-dark-text-secondary">
                Habitable Zone Visualization
              </p>
              <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary mt-2">
                Interactive habitable zone calculator coming soon
              </p>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="space-y-4">
      {/* Chart Type Selector */}
      <div className="flex flex-wrap gap-2 mb-4">
        <button
          onClick={() => setActiveChart('timeline')}
          className={`px-4 py-2 text-sm rounded-md transition-colors ${
            activeChart === 'timeline'
              ? 'bg-primary-dark-blue text-white'
              : 'bg-light-surface dark:bg-dark-surface text-light-text-primary dark:text-dark-text-primary hover:bg-light-hover dark:hover:bg-dark-hover'
          }`}
        >
          Discovery Timeline
        </button>
        <button
          onClick={() => setActiveChart('mass-radius')}
          className={`px-4 py-2 text-sm rounded-md transition-colors ${
            activeChart === 'mass-radius'
              ? 'bg-primary-dark-blue text-white'
              : 'bg-light-surface dark:bg-dark-surface text-light-text-primary dark:text-dark-text-primary hover:bg-light-hover dark:hover:bg-dark-hover'
          }`}
        >
          Mass-Radius Diagram
        </button>
        <button
          onClick={() => setActiveChart('methods')}
          className={`px-4 py-2 text-sm rounded-md transition-colors ${
            activeChart === 'methods'
              ? 'bg-primary-dark-blue text-white'
              : 'bg-light-surface dark:bg-dark-surface text-light-text-primary dark:text-dark-text-primary hover:bg-light-hover dark:hover:bg-dark-hover'
          }`}
        >
          Discovery Methods
        </button>
        <button
          onClick={() => setActiveChart('radius-dist')}
          className={`px-4 py-2 text-sm rounded-md transition-colors ${
            activeChart === 'radius-dist'
              ? 'bg-primary-dark-blue text-white'
              : 'bg-light-surface dark:bg-dark-surface text-light-text-primary dark:text-dark-text-primary hover:bg-light-hover dark:hover:bg-dark-hover'
          }`}
        >
          Radius Distribution
        </button>
        <button
          onClick={() => setActiveChart('mass-dist')}
          className={`px-4 py-2 text-sm rounded-md transition-colors ${
            activeChart === 'mass-dist'
              ? 'bg-primary-dark-blue text-white'
              : 'bg-light-surface dark:bg-dark-surface text-light-text-primary dark:text-dark-text-primary hover:bg-light-hover dark:hover:bg-dark-hover'
          }`}
        >
          Mass Distribution
        </button>
        <button
          onClick={() => setActiveChart('period-axis')}
          className={`px-4 py-2 text-sm rounded-md transition-colors ${
            activeChart === 'period-axis'
              ? 'bg-primary-dark-blue text-white'
              : 'bg-light-surface dark:bg-dark-surface text-light-text-primary dark:text-dark-text-primary hover:bg-light-hover dark:hover:bg-dark-hover'
          }`}
        >
          Period vs Axis
        </button>
        <button
          onClick={() => setActiveChart('habitable-zone')}
          className={`px-4 py-2 text-sm rounded-md transition-colors ${
            activeChart === 'habitable-zone'
              ? 'bg-primary-dark-blue text-white'
              : 'bg-light-surface dark:bg-dark-surface text-light-text-primary dark:text-dark-text-primary hover:bg-light-hover dark:hover:bg-dark-hover'
          }`}
        >
          Habitable Zone
        </button>
      </div>

      {/* Chart Container */}
      <div className="bg-light-surface dark:bg-dark-surface rounded-lg p-4">
        {renderChart()}
      </div>

      {/* Chart Description */}
      <div className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
        {activeChart === 'timeline' && (
          <p>
            Cumulative exoplanet discoveries over time, showing the dramatic increase after the launch of space-based missions like Kepler and TESS.
          </p>
        )}
        {activeChart === 'mass-radius' && (
          <p>
            Mass-radius relationship of known exoplanets compared to Solar System planets. Different planet types occupy distinct regions of this parameter space.
          </p>
        )}
        {activeChart === 'methods' && (
          <p>
            Distribution of exoplanet discoveries by detection method. Transit photometry has been the most successful technique.
          </p>
        )}
        {activeChart === 'habitable-zone' && (
          <p>
            Conceptual visualization of the habitable zone around a star where liquid water could exist on a planet&apos;s surface.
          </p>
        )}
      </div>
    </div>
  )
}
