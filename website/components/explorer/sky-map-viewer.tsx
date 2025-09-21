'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import * as d3 from 'd3'
import { useExplorerStore } from '@/lib/explorer-store'

type PlanetPoint = { name: string; ra: number; dec: number; distance?: number; radius?: number; method?: string }

const constellationLines = [
  // Big Dipper (part of Ursa Major)
  { from: { ra: 165.931, dec: 61.751 }, to: { ra: 183.856, dec: 57.032 } },
  { from: { ra: 183.856, dec: 57.032 }, to: { ra: 200.981, dec: 54.925 } },
  { from: { ra: 200.981, dec: 54.925 }, to: { ra: 206.885, dec: 49.313 } },
  { from: { ra: 206.885, dec: 49.313 }, to: { ra: 194.006, dec: 53.694 } },
  { from: { ra: 194.006, dec: 53.694 }, to: { ra: 183.856, dec: 57.032 } },
  { from: { ra: 194.006, dec: 53.694 }, to: { ra: 210.801, dec: 51.677 } },
  { from: { ra: 210.801, dec: 51.677 }, to: { ra: 210.955, dec: 44.499 } },
  // Cassiopeia
  { from: { ra: 14.177, dec: 60.717 }, to: { ra: 21.453, dec: 62.928 } },
  { from: { ra: 21.453, dec: 62.928 }, to: { ra: 28.599, dec: 63.670 } },
  { from: { ra: 28.599, dec: 63.670 }, to: { ra: 35.062, dec: 57.815 } },
  { from: { ra: 35.062, dec: 57.815 }, to: { ra: 37.740, dec: 55.753 } },
]

export default function SkyMapViewer() {
  const svgRef = useRef<SVGSVGElement>(null)
  const rows = useExplorerStore(s => s.rows)
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  const exoplanetData: PlanetPoint[] = useMemo(() => {
    const out: PlanetPoint[] = []
    for (const r of rows) {
      if (typeof r.ra === 'number' && typeof r.dec === 'number') {
        out.push({
          name: r.pl_name,
          ra: r.ra,
          dec: r.dec,
          distance: r.sy_dist,
          radius: r.pl_rade,
          method: r.discoverymethod,
        })
      }
      if (out.length >= 2000) break
    }
    return out
  }, [rows])

  useEffect(() => {
    if (!svgRef.current) return

    const svg = d3.select(svgRef.current)
    const width = svgRef.current.clientWidth
    const height = svgRef.current.clientHeight

    // Clear previous content
    svg.selectAll('*').remove()

    // Create projection (stereographic projection)
    const projection = d3.geoStereographic()
      .scale(height / 3)
      .translate([width / 2, height / 2])
      .clipAngle(90)

    // Convert RA/Dec to longitude/latitude for projection
    const convertCoords = (ra: number, dec: number): [number, number] => {
      // Convert RA from degrees to longitude (-180 to 180)
      const longitude = ra > 180 ? ra - 360 : ra
      return [longitude, dec]
    }

    // Create dark space background
    svg.append('rect')
      .attr('width', width)
      .attr('height', height)
      .attr('fill', '#0f172a')

    // Add background stars
    const backgroundStars = d3.range(500).map(() => ({
      ra: Math.random() * 360,
      dec: (Math.random() - 0.5) * 180,
      magnitude: Math.random(),
    }))

    svg.selectAll('.background-star')
      .data(backgroundStars)
      .enter()
      .append('circle')
      .attr('class', 'background-star')
      .attr('cx', d => {
        const projected = projection(convertCoords(d.ra || 0, d.dec || 0))
        return projected ? projected[0] : 0
      })
      .attr('cy', d => {
        const projected = projection(convertCoords(d.ra || 0, d.dec || 0))
        return projected ? projected[1] : 0
      })
      .attr('r', d => d.magnitude * 1.5)
      .attr('fill', 'white')
      .attr('opacity', d => 0.3 + d.magnitude * 0.7)

    // Add constellation lines
    svg.selectAll('.constellation-line')
      .data(constellationLines)
      .enter()
      .append('line')
      .attr('class', 'constellation-line')
      .attr('x1', d => {
        const projected = projection(convertCoords(d.from.ra, d.from.dec))
        return projected ? projected[0] : 0
      })
      .attr('y1', d => {
        const projected = projection(convertCoords(d.from.ra, d.from.dec))
        return projected ? projected[1] : 0
      })
      .attr('x2', d => {
        const projected = projection(convertCoords(d.to.ra, d.to.dec))
        return projected ? projected[0] : 0
      })
      .attr('y2', d => {
        const projected = projection(convertCoords(d.to.ra, d.to.dec))
        return projected ? projected[1] : 0
      })
      .attr('stroke', '#374151')
      .attr('stroke-width', 1)
      .attr('opacity', 0.6)

    // Color scale for discovery methods
    const colorScale = d3.scaleOrdinal<string>()
      .domain(['Transit', 'Radial Velocity', 'Microlensing', 'Direct Imaging', 'Astrometry', 'Unknown'])
      .range(['#82b2d7', '#ef7454', '#b6e2f4', '#355381', '#2b3952', '#6b7280'])

    // Size scale for planet radius
    const sizeScale = d3.scaleSqrt<number, number>()
      .domain([0.5, 3])
      .range([2, 8])

    // Add exoplanets
    const planets = svg.selectAll('.exoplanet')
      .data(exoplanetData)
      .enter()
      .append('g')
      .attr('class', 'exoplanet')
      .attr('transform', d => {
        const projected = projection(convertCoords(d.ra || 0, d.dec || 0))
        return projected ? `translate(${projected[0]}, ${projected[1]})` : 'translate(0,0)'
      })

    // Add glow effect
    planets.append('circle')
      .attr('r', d => sizeScale(d.radius || 1) + 2)
      .attr('fill', 'none')
      .attr('stroke', d => colorScale(d.method || 'Transit'))
      .attr('stroke-width', 1)
      .attr('opacity', 0.6)

    // Add planet circles
    planets.append('circle')
      .attr('r', d => sizeScale(d.radius || 1))
      .attr('fill', d => colorScale(d.method || 'Transit'))
      .attr('cursor', 'pointer')
      .on('mouseover', function(event, d) {
        // Show tooltip
        const tooltip = d3.select('body').append('div')
          .attr('class', 'sky-map-tooltip')
          .style('position', 'absolute')
          .style('background', 'rgba(15, 23, 42, 0.95)')
          .style('color', 'white')
          .style('padding', '12px')
          .style('border-radius', '8px')
          .style('border', '1px solid #334155')
          .style('font-size', '12px')
          .style('pointer-events', 'none')
          .style('z-index', '1000')
          .style('opacity', 0)

        tooltip.html(`
          <strong>${d.name}</strong><br/>
          <span style="color: #94a3b8;">RA:</span> ${d.ra.toFixed(2)}°<br/>
          <span style="color: #94a3b8;">Dec:</span> ${d.dec.toFixed(2)}°<br/>
          <span style="color: #94a3b8;">Distance:</span> ${d.distance ? d.distance.toFixed(1) : '—'} pc<br/>
          <span style="color: #94a3b8;">Radius:</span> ${d.radius ? d.radius.toFixed(2) : '—'} R⊕<br/>
          <span style="color: #94a3b8;">Method:</span> ${d.method || '—'}
        `)
          .style('left', (event.pageX + 10) + 'px')
          .style('top', (event.pageY - 10) + 'px')
          .transition()
          .duration(200)
          .style('opacity', 1)

        d3.select(this)
          .transition()
          .duration(200)
          .attr('r', sizeScale((d.radius ?? 1)) + 2)
      })
      .on('mouseout', function(event, d) {
        d3.selectAll('.sky-map-tooltip').remove()
        d3.select(this)
          .transition()
          .duration(200)
          .attr('r', sizeScale((d.radius ?? 1)))
      })

    // Add coordinate grid
    const gridLines = []
    // RA lines (longitude)
    for (let ra = 0; ra < 360; ra += 30) {
      for (let dec = -80; dec <= 80; dec += 10) {
        gridLines.push({
          start: convertCoords(ra, dec),
          end: convertCoords(ra, dec + 10)
        })
      }
    }
    // Dec lines (latitude)
    for (let dec = -60; dec <= 60; dec += 30) {
      for (let ra = 0; ra < 360; ra += 10) {
        gridLines.push({
          start: convertCoords(ra, dec),
          end: convertCoords(ra + 10, dec)
        })
      }
    }

    svg.selectAll('.grid-line')
      .data(gridLines)
      .enter()
      .append('line')
      .attr('class', 'grid-line')
      .attr('x1', d => {
        const projected = projection(d.start)
        return projected ? projected[0] : 0
      })
      .attr('y1', d => {
        const projected = projection(d.start)
        return projected ? projected[1] : 0
      })
      .attr('x2', d => {
        const projected = projection(d.end)
        return projected ? projected[0] : 0
      })
      .attr('y2', d => {
        const projected = projection(d.end)
        return projected ? projected[1] : 0
      })
      .attr('stroke', '#1e293b')
      .attr('stroke-width', 0.5)
      .attr('opacity', 0.3)

  }, [exoplanetData])

  return (
    <div className="relative h-96 bg-slate-900 rounded-lg overflow-hidden">
      <svg
        ref={svgRef}
        className="w-full h-full"
        style={{ background: '#0f172a' }}
      />
      
      {/* Legend */}
      <div className="absolute top-4 left-4 bg-slate-800/90 backdrop-blur-sm rounded-lg p-3 text-white text-xs">
        <h4 className="font-semibold mb-2">Discovery Methods</h4>
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#82b2d7]"></div>
            <span>Transit</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#ef7454]"></div>
            <span>Radial Velocity</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#b6e2f4]"></div>
            <span>Microlensing</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#355381]"></div>
            <span>Direct Imaging</span>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="absolute bottom-4 right-4 bg-slate-800/90 backdrop-blur-sm rounded-lg p-3 text-white text-xs">
        <p className="font-semibold mb-1">Sky Map</p>
        <p>Stereographic projection</p>
        <p className="mt-2 text-slate-400">
          Hover over planets for details
        </p>
      </div>

      {/* Statistics */}
      <div className="absolute top-4 right-4 bg-slate-800/90 backdrop-blur-sm rounded-lg p-3 text-white text-xs">
        <h4 className="font-semibold mb-2">Statistics</h4>
        <div className="space-y-1">
          <p>Total Exoplanets: {exoplanetData.length}</p>
          <p>Transit: {exoplanetData.filter(d => d.method === 'Transit').length}</p>
          <p>Radial Velocity: {exoplanetData.filter(d => d.method === 'Radial Velocity').length}</p>
          <p>Other Methods: {exoplanetData.filter(d => !['Transit', 'Radial Velocity'].includes(d.method || '')).length}</p>
        </div>
      </div>
    </div>
  )
}
