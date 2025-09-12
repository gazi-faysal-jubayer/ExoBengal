'use client'

import { useState } from 'react'
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar, ScatterChart, Scatter, PieChart, Pie, Cell } from 'recharts'

// Sample data for different chart types
const discoveryTimelineData = [
  { year: 1995, cumulative: 1, transit: 0, radial_velocity: 1, microlensing: 0, direct_imaging: 0 },
  { year: 2000, cumulative: 69, transit: 0, radial_velocity: 69, microlensing: 0, direct_imaging: 0 },
  { year: 2005, cumulative: 180, transit: 12, radial_velocity: 168, microlensing: 0, direct_imaging: 0 },
  { year: 2010, cumulative: 490, transit: 70, radial_velocity: 410, microlensing: 8, direct_imaging: 2 },
  { year: 2015, cumulative: 1500, transit: 1200, radial_velocity: 280, microlensing: 15, direct_imaging: 5 },
  { year: 2020, cumulative: 4300, transit: 3800, radial_velocity: 450, microlensing: 30, direct_imaging: 20 },
  { year: 2024, cumulative: 5565, transit: 4200, radial_velocity: 1200, microlensing: 135, direct_imaging: 30 },
]

const massRadiusData = [
  { mass: 0.055, radius: 0.87, type: 'Rocky', name: 'Mercury-like' },
  { mass: 0.815, radius: 0.95, type: 'Rocky', name: 'Venus-like' },
  { mass: 1.0, radius: 1.0, type: 'Rocky', name: 'Earth-like' },
  { mass: 0.107, radius: 0.532, type: 'Rocky', name: 'Mars-like' },
  { mass: 17.1, radius: 4.0, type: 'Ice Giant', name: 'Neptune-like' },
  { mass: 95.2, radius: 9.4, type: 'Gas Giant', name: 'Saturn-like' },
  { mass: 317.8, radius: 11.2, type: 'Gas Giant', name: 'Jupiter-like' },
  // Add more scattered points for exoplanets
  ...Array.from({ length: 50 }, (_, i) => ({
    mass: Math.random() * 1000 + 0.1,
    radius: Math.random() * 15 + 0.5,
    type: Math.random() > 0.7 ? 'Gas Giant' : Math.random() > 0.4 ? 'Ice Giant' : 'Rocky',
    name: `Exoplanet ${i + 1}`,
  })),
]

const discoveryMethodData = [
  { name: 'Transit', value: 4200, color: '#355381' },
  { name: 'Radial Velocity', value: 1200, color: '#82b2d7' },
  { name: 'Microlensing', value: 135, color: '#b6e2f4' },
  { name: 'Direct Imaging', value: 30, color: '#ef7454' },
  { name: 'Astrometry', value: 15, color: '#2b3952' },
]

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

type ChartType = 'timeline' | 'mass-radius' | 'methods' | 'habitable-zone'

export default function StatisticalCharts() {
  const [activeChart, setActiveChart] = useState<ChartType>('timeline')

  const renderChart = () => {
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
