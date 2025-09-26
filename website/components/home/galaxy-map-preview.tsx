'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Maximize2, Info } from 'lucide-react'
import * as d3 from 'd3'

interface ExoplanetData {
  name: string
  ra: number // Right ascension
  dec: number // Declination
  distance: number // Distance in light years
  radius: number // Planet radius in Earth radii
}

// Sample data - in production, this would come from NASA API
const sampleExoplanets: ExoplanetData[] = [
  { name: 'Kepler-452b', ra: 291.756, dec: 44.277, distance: 1400, radius: 1.6 },
  { name: 'Proxima Centauri b', ra: 217.429, dec: -62.679, distance: 4.24, radius: 1.17 },
  { name: 'TRAPPIST-1e', ra: 346.622, dec: -5.041, distance: 39.6, radius: 0.92 },
  { name: 'HD 209458 b', ra: 330.795, dec: 18.884, distance: 159, radius: 1.38 },
  { name: 'Gliese 667Cc', ra: 260.979, dec: -34.993, distance: 23.62, radius: 1.54 },
]

export function GalaxyMapPreview() {
  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    if (!svgRef.current) return

    const width = svgRef.current.clientWidth
    const height = svgRef.current.clientHeight

    // Clear previous content
    d3.select(svgRef.current).selectAll('*').remove()

    const svg = d3.select(svgRef.current)
    
    // Create a group for zooming and panning
    const g = svg.append('g')

    // Add a gradient background
    const gradient = svg.append('defs')
      .append('radialGradient')
      .attr('id', 'space-gradient')
      .attr('cx', '50%')
      .attr('cy', '50%')
      .attr('r', '50%')

    gradient.append('stop')
      .attr('offset', '0%')
      .attr('stop-color', '#1e293b')

    gradient.append('stop')
      .attr('offset', '100%')
      .attr('stop-color', '#0f172a')

    g.append('rect')
      .attr('width', width)
      .attr('height', height)
      .attr('fill', 'url(#space-gradient)')

    // Add stars background
    const starsData = d3.range(200).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: Math.random() * 1.5,
      opacity: Math.random() * 0.8 + 0.2,
    }))

    g.selectAll('.star')
      .data(starsData)
      .enter()
      .append('circle')
      .attr('class', 'star')
      .attr('cx', d => d.x)
      .attr('cy', d => d.y)
      .attr('r', d => d.r)
      .attr('fill', 'white')
      .attr('opacity', d => d.opacity)

    // Convert RA/Dec to screen coordinates (simple projection)
    const xScale = d3.scaleLinear()
      .domain([0, 360])
      .range([0, width])

    const yScale = d3.scaleLinear()
      .domain([-90, 90])
      .range([height, 0])

    // Size scale based on planet radius
    const sizeScale = d3.scaleSqrt()
      .domain([0.5, 2])
      .range([3, 10])

    // Add exoplanets
    const planets = g.selectAll('.exoplanet')
      .data(sampleExoplanets)
      .enter()
      .append('g')
      .attr('class', 'exoplanet')
      .attr('transform', d => `translate(${xScale(d.ra)}, ${yScale(d.dec)})`)

    // Add glow effect
    planets.append('circle')
      .attr('r', d => sizeScale(d.radius) + 3)
      .attr('fill', 'none')
      .attr('stroke', '#82b2d7')
      .attr('stroke-width', 1)
      .attr('opacity', 0.3)
      .attr('class', 'animate-pulse-slow')

    // Add planet circle
    planets.append('circle')
      .attr('r', d => sizeScale(d.radius))
      .attr('fill', '#b6e2f4')
      .attr('cursor', 'pointer')
      .on('mouseover', function(event, d) {
        // Show tooltip
        const tooltip = d3.select('body').append('div')
          .attr('class', 'tooltip')
          .style('position', 'absolute')
          .style('background', 'rgba(30, 41, 59, 0.9)')
          .style('color', 'white')
          .style('padding', '8px 12px')
          .style('border-radius', '4px')
          .style('font-size', '12px')
          .style('pointer-events', 'none')
          .style('opacity', 0)

        tooltip.html(`
          <strong>${d.name}</strong><br/>
          Distance: ${d.distance} ly<br/>
          Radius: ${d.radius} R⊕
        `)
          .style('left', (event.pageX + 10) + 'px')
          .style('top', (event.pageY - 28) + 'px')
          .transition()
          .duration(200)
          .style('opacity', 1)

        d3.select(this).transition().duration(200).attr('r', sizeScale(d.radius) + 2)
      })
      .on('mouseout', function(event, d) {
        d3.selectAll('.tooltip').remove()
        d3.select(this).transition().duration(200).attr('r', sizeScale(d.radius))
      })

    // Add zoom behavior
    const zoom = d3.zoom()
      .scaleExtent([1, 8])
      .on('zoom', (event) => {
        g.attr('transform', event.transform)
      })

    svg.call(zoom as any)

  }, [])

  return (
    <section className="py-16 bg-light-background dark:bg-dark-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-light-text-primary dark:text-dark-text-primary">
              Interactive Galaxy Map
            </h2>
            <p className="mt-4 text-lg text-light-text-secondary dark:text-dark-text-secondary">
              Explore exoplanets in their celestial positions
            </p>
          </div>

          <div className="relative max-w-6xl mx-auto">
            <div className="card p-4 overflow-hidden card-hover">
              {/* Map Container */}
              <div className="relative h-[500px] rounded-lg overflow-hidden">
                <svg
                  ref={svgRef}
                  className="w-full h-full"
                  style={{ background: '#0f172a' }}
                />
                
                {/* Controls Overlay */}
                <div className="absolute top-4 right-4 flex gap-2">
                  <button className="p-2 bg-dark-card/80 backdrop-blur-sm rounded-md text-white hover:bg-dark-card transition-colors">
                    <Info className="h-4 w-4" />
                  </button>
                  <Link
                    href="/visualizations/sky-map"
                    className="p-2 bg-dark-card/80 backdrop-blur-sm rounded-md text-white hover:bg-dark-card transition-colors"
                  >
                    <Maximize2 className="h-4 w-4" />
                  </Link>
                </div>

                {/* Legend */}
                <div className="absolute bottom-4 left-4 bg-dark-card/80 backdrop-blur-sm rounded-md p-3 text-white text-sm">
                  <p className="font-semibold mb-2">Legend</p>
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-3 h-3 rounded-full bg-primary-cyan"></div>
                    <span>Exoplanet</span>
                  </div>
                  <p className="text-xs text-gray-400 mt-2">
                    Scroll to zoom • Drag to pan
                  </p>
                </div>
              </div>
            </div>

            {/* Call to Action */}
            <div className="text-center mt-8">
              <Link href="/visualizations/sky-map" className="btn-primary inline-flex items-center gap-2">
                Explore Full Sky Map
                <Maximize2 className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

