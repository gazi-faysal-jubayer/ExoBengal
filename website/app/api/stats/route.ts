import { NextRequest, NextResponse } from 'next/server'

// Simulate statistics data - in production, this would be calculated from the database
const getExoplanetStats = async () => {
  // Simulate database query delay
  await new Promise(resolve => setTimeout(resolve, 100))

  return {
    overview: {
      total_confirmed: 5565,
      total_candidates: 4140,
      planetary_systems: 4140,
      nasa_missions: 15,
      years_of_data: new Date().getFullYear() - 1992,
      last_updated: new Date().toISOString(),
    },
    
    discovery_methods: {
      transit: 4200,
      radial_velocity: 1200,
      microlensing: 135,
      direct_imaging: 30,
      astrometry: 15,
      orbital_brightness_modulation: 10,
      timing: 25,
      other: 5,
    },
    
    discovery_timeline: [
      { year: 1995, cumulative: 1, new_discoveries: 1 },
      { year: 2000, cumulative: 69, new_discoveries: 68 },
      { year: 2005, cumulative: 180, new_discoveries: 111 },
      { year: 2010, cumulative: 490, new_discoveries: 310 },
      { year: 2015, cumulative: 1500, new_discoveries: 1010 },
      { year: 2020, cumulative: 4300, new_discoveries: 2800 },
      { year: 2021, cumulative: 4800, new_discoveries: 500 },
      { year: 2022, cumulative: 5200, new_discoveries: 400 },
      { year: 2023, cumulative: 5400, new_discoveries: 200 },
      { year: 2024, cumulative: 5565, new_discoveries: 165 },
    ],
    
    missions: {
      kepler: {
        name: 'Kepler Space Telescope',
        discoveries: 2700,
        status: 'Retired',
        launch_year: 2009,
        end_year: 2018,
      },
      tess: {
        name: 'TESS',
        discoveries: 400,
        status: 'Active',
        launch_year: 2018,
        end_year: null,
      },
      k2: {
        name: 'K2 Mission',
        discoveries: 500,
        status: 'Retired',
        launch_year: 2014,
        end_year: 2018,
      },
      ground_based: {
        name: 'Ground-based Surveys',
        discoveries: 1800,
        status: 'Active',
        launch_year: 1995,
        end_year: null,
      },
    },
    
    planet_types: {
      gas_giant: { count: 1680, percentage: 30.2 },
      neptune_like: { count: 1890, percentage: 34.0 },
      super_earth: { count: 1560, percentage: 28.0 },
      terrestrial: { count: 435, percentage: 7.8 },
    },
    
    habitable_zone: {
      total_in_hz: 89,
      earth_like_candidates: 24,
      super_earth_hz: 45,
      mini_neptune_hz: 20,
    },
    
    stellar_hosts: {
      main_sequence: {
        m_dwarf: { count: 3340, percentage: 60.0 },
        k_dwarf: { count: 1113, percentage: 20.0 },
        g_dwarf: { count: 890, percentage: 16.0 },
        f_dwarf: { count: 167, percentage: 3.0 },
        a_dwarf: { count: 55, percentage: 1.0 },
      },
      evolved: {
        giant: { count: 112, percentage: 2.0 },
        subgiant: { count: 89, percentage: 1.6 },
        white_dwarf: { count: 11, percentage: 0.2 },
      },
    },
    
    distance_distribution: {
      nearby_10pc: 12,
      nearby_50pc: 89,
      nearby_100pc: 234,
      distant_1000pc: 2890,
      very_distant: 2340,
    },
    
    recent_highlights: [
      {
        name: 'TOI-715 b',
        discovery_date: '2024-01-31',
        significance: 'Super-Earth in habitable zone of nearby red dwarf',
        distance_ly: 137,
      },
      {
        name: 'WASP-193b',
        discovery_date: '2023-12-15',
        significance: 'Ultra-low density planet - cosmic cotton candy',
        distance_ly: 1200,
      },
      {
        name: 'LP 890-9 c',
        discovery_date: '2022-09-05',
        significance: 'Potentially habitable super-Earth',
        distance_ly: 105,
      },
    ],
    
    telescopes: {
      space_based: [
        { name: 'TESS', discoveries: 400, status: 'Active' },
        { name: 'Kepler', discoveries: 2700, status: 'Retired' },
        { name: 'JWST', discoveries: 5, status: 'Active' },
        { name: 'Spitzer', discoveries: 15, status: 'Retired' },
        { name: 'Hubble', discoveries: 8, status: 'Active' },
      ],
      ground_based: [
        { name: 'HARPS', discoveries: 300, status: 'Active' },
        { name: 'HIRES', discoveries: 250, status: 'Active' },
        { name: 'ESPRESSO', discoveries: 45, status: 'Active' },
        { name: 'CARMENES', discoveries: 78, status: 'Active' },
      ],
    },
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const format = searchParams.get('format') || 'json'

    const stats = await getExoplanetStats()

    // If specific category requested, return only that section
    if (category && category in stats) {
      const categoryData = stats[category as keyof typeof stats]
      return NextResponse.json({
        category,
        data: categoryData,
        generated_at: new Date().toISOString(),
      })
    }

    // Return all statistics
    const response = {
      ...stats,
      generated_at: new Date().toISOString(),
      data_source: 'NASA Exoplanet Archive',
      update_frequency: 'Daily',
    }

    // Handle different output formats
    if (format === 'csv') {
      // Convert to CSV format for download
      const csvData = convertStatsToCSV(stats)
      return new NextResponse(csvData, {
        headers: {
          'Content-Type': 'text/csv',
          'Content-Disposition': 'attachment; filename="exoplanet_stats.csv"',
        },
      })
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error('Error generating statistics:', error)
    return NextResponse.json(
      { error: 'Failed to generate statistics' },
      { status: 500 }
    )
  }
}

// Helper function to convert stats to CSV
function convertStatsToCSV(stats: any): string {
  const rows = []
  
  // Header
  rows.push('Category,Metric,Value,Unit')
  
  // Overview stats
  Object.entries(stats.overview).forEach(([key, value]) => {
    rows.push(`Overview,${key},${value},`)
  })
  
  // Discovery methods
  Object.entries(stats.discovery_methods).forEach(([key, value]) => {
    rows.push(`Discovery Methods,${key},${value},planets`)
  })
  
  // Planet types
  Object.entries(stats.planet_types).forEach(([key, value]: [string, any]) => {
    rows.push(`Planet Types,${key},${value.count},planets`)
    rows.push(`Planet Types,${key}_percentage,${value.percentage},%`)
  })
  
  return rows.join('\n')
}

// Handle POST requests for custom statistics queries
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { 
      metrics = [],
      filters = {},
      group_by = null,
      time_range = null 
    } = body

    // In production, this would run custom queries against the database
    await new Promise(resolve => setTimeout(resolve, 200))

    const customStats = {
      query: body,
      results: {
        filtered_count: 1234,
        metrics: metrics.reduce((acc: any, metric: string) => {
          acc[metric] = Math.random() * 1000
          return acc
        }, {}),
        groups: group_by ? generateGroupedResults(group_by) : null,
      },
      execution_time_ms: 150,
      generated_at: new Date().toISOString(),
    }

    return NextResponse.json(customStats)
  } catch (error) {
    console.error('Error processing custom statistics query:', error)
    return NextResponse.json(
      { error: 'Failed to process custom statistics query' },
      { status: 500 }
    )
  }
}

function generateGroupedResults(groupBy: string) {
  // Generate sample grouped results
  const groups = []
  for (let i = 0; i < 5; i++) {
    groups.push({
      group: `${groupBy}_${i + 1}`,
      count: Math.floor(Math.random() * 500) + 10,
      average_radius: Math.random() * 10 + 0.5,
      average_mass: Math.random() * 50 + 0.1,
    })
  }
  return groups
}
