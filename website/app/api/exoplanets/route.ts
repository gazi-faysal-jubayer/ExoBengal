import { NextRequest, NextResponse } from 'next/server'

// Sample exoplanet data - in production, this would connect to NASA's API
const sampleExoplanets = [
  {
    id: '1',
    pl_name: 'Kepler-452b',
    hostname: 'Kepler-452',
    tic_id: 'TIC 281541555',
    discoverymethod: 'Transit',
    disc_year: 2015,
    disc_telescope: 'Kepler',
    pl_orbper: 384.843,
    pl_orbsmax: 1.046,
    pl_rade: 1.6,
    pl_radj: 0.143,
    pl_masse: 5.0,
    pl_massj: 0.016,
    pl_orbeccen: 0.097,
    pl_orbincl: 89.806,
    pl_tranmid: 2455006.71,
    pl_trandep: 0.00065,
    pl_orbtper: 8.5,
    st_rad: 1.11,
    st_mass: 1.04,
    st_teff: 5757,
    st_met: 0.21,
    st_age: 6.0,
    ra: 291.756,
    dec: 44.277,
    sy_dist: 429.2,
    reference: 'Jenkins et al. 2015',
    pl_facility: 'Kepler',
    disposition: 'Confirmed',
    habitable_zone: true,
    earth_similarity_index: 0.83,
  },
  {
    id: '2',
    pl_name: 'Proxima Centauri b',
    hostname: 'Proxima Centauri',
    tic_id: 'TIC 388857263',
    discoverymethod: 'Radial Velocity',
    disc_year: 2016,
    disc_telescope: 'ESO 3.6m',
    pl_orbper: 11.186,
    pl_orbsmax: 0.0485,
    pl_rade: 1.17,
    pl_radj: 0.104,
    pl_masse: 1.17,
    pl_massj: 0.004,
    pl_orbeccen: 0.109,
    pl_orbincl: 90.0,
    st_rad: 0.154,
    st_mass: 0.122,
    st_teff: 3042,
    st_met: 0.21,
    ra: 217.429,
    dec: -62.679,
    sy_dist: 1.295,
    reference: 'Anglada-Escudé et al. 2016',
    pl_facility: 'ESO 3.6m',
    disposition: 'Confirmed',
    habitable_zone: true,
    earth_similarity_index: 0.85,
  },
  // Add more sample data...
]

// Simulate NASA API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

export async function GET(request: NextRequest) {
  try {
    // Add artificial delay to simulate real API
    await delay(300)

    const { searchParams } = new URL(request.url)
    
    // Parse query parameters
    const search = searchParams.get('search')
    const method = searchParams.get('method')
    const yearMin = searchParams.get('year_min')
    const yearMax = searchParams.get('year_max')
    const radiusMin = searchParams.get('radius_min')
    const radiusMax = searchParams.get('radius_max')
    const massMin = searchParams.get('mass_min')
    const massMax = searchParams.get('mass_max')
    const habitableZone = searchParams.get('habitable_zone')
    const disposition = searchParams.get('disposition')
    const limit = parseInt(searchParams.get('limit') || '100')
    const offset = parseInt(searchParams.get('offset') || '0')
    const sortBy = searchParams.get('sort_by') || 'pl_name'
    const sortOrder = searchParams.get('sort_order') || 'asc'

    let filteredData = [...sampleExoplanets]

    // Apply filters
    if (search) {
      const searchLower = search.toLowerCase()
      filteredData = filteredData.filter(planet => 
        planet.pl_name.toLowerCase().includes(searchLower) ||
        planet.hostname.toLowerCase().includes(searchLower) ||
        planet.discoverymethod.toLowerCase().includes(searchLower)
      )
    }

    if (method) {
      filteredData = filteredData.filter(planet => planet.discoverymethod === method)
    }

    if (yearMin) {
      filteredData = filteredData.filter(planet => planet.disc_year >= parseInt(yearMin))
    }

    if (yearMax) {
      filteredData = filteredData.filter(planet => planet.disc_year <= parseInt(yearMax))
    }

    if (radiusMin) {
      filteredData = filteredData.filter(planet => planet.pl_rade && planet.pl_rade >= parseFloat(radiusMin))
    }

    if (radiusMax) {
      filteredData = filteredData.filter(planet => planet.pl_rade && planet.pl_rade <= parseFloat(radiusMax))
    }

    if (massMin) {
      filteredData = filteredData.filter(planet => planet.pl_masse && planet.pl_masse >= parseFloat(massMin))
    }

    if (massMax) {
      filteredData = filteredData.filter(planet => planet.pl_masse && planet.pl_masse <= parseFloat(massMax))
    }

    if (habitableZone === 'true') {
      filteredData = filteredData.filter(planet => planet.habitable_zone === true)
    }

    if (disposition) {
      filteredData = filteredData.filter(planet => planet.disposition === disposition)
    }

    // Sort data
    filteredData.sort((a, b) => {
      const aValue = a[sortBy as keyof typeof a]
      const bValue = b[sortBy as keyof typeof b]
      
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortOrder === 'asc' 
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue)
      }
      
      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return sortOrder === 'asc' ? aValue - bValue : bValue - aValue
      }
      
      return 0
    })

    // Apply pagination
    const paginatedData = filteredData.slice(offset, offset + limit)

    const response = {
      data: paginatedData,
      total: filteredData.length,
      offset,
      limit,
      has_more: offset + limit < filteredData.length,
      query_time: new Date().toISOString(),
      filters_applied: {
        search,
        method,
        year_range: yearMin || yearMax ? [yearMin, yearMax] : null,
        radius_range: radiusMin || radiusMax ? [radiusMin, radiusMax] : null,
        mass_range: massMin || massMax ? [massMin, massMax] : null,
        habitable_zone: habitableZone,
        disposition,
      },
      sorting: {
        sort_by: sortBy,
        sort_order: sortOrder,
      }
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error('Error fetching exoplanets:', error)
    return NextResponse.json(
      { error: 'Failed to fetch exoplanet data' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Handle advanced search queries
    const { 
      natural_language_query,
      filters,
      sort_options,
      limit = 100,
      offset = 0 
    } = body

    // In production, this would process natural language queries
    // and convert them to structured filters
    
    await delay(500) // Simulate processing time

    // For now, return sample results
    const response = {
      data: sampleExoplanets.slice(offset, offset + limit),
      total: sampleExoplanets.length,
      offset,
      limit,
      has_more: offset + limit < sampleExoplanets.length,
      query_interpretation: natural_language_query ? {
        original_query: natural_language_query,
        parsed_filters: filters || {},
        confidence: 0.85,
      } : null,
      suggestions: [
        'Try searching for "Earth-like planets"',
        'Filter by discovery method: Transit',
        'Look for planets in habitable zone',
      ]
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error('Error processing search:', error)
    return NextResponse.json(
      { error: 'Failed to process search query' },
      { status: 500 }
    )
  }
}
