// NASA Exoplanet Archive API client - Full data structure
export interface ExoplanetData {
  pl_name: string
  pl_letter?: string
  hostname: string
  hd_name?: string | null
  hip_name?: string | null
  tic_id?: string | null
  gaia_id?: string | null
  default_flag?: number
  pl_refname?: string
  sy_refname?: string
  disc_pubdate?: string
  disc_year?: number
  discoverymethod?: string
  disc_locale?: string
  disc_facility?: string
  disc_instrument?: string
  disc_telescope?: string
  disc_refname?: string
  ra?: number
  rastr?: string
  dec?: number
  decstr?: string
  glon?: number
  glat?: number
  elon?: number
  elat?: number
  pl_orbper?: number
  pl_orbpererr1?: number
  pl_orbpererr2?: number
  pl_orbperlim?: number
  pl_orbperstr?: string
  pl_orblper?: number | null
  pl_orblpererr1?: number | null
  pl_orblpererr2?: number | null
  pl_orblperlim?: number | null
  pl_orblperstr?: string | null
  pl_orbsmax?: number
  pl_orbsmaxerr1?: number
  pl_orbsmaxerr2?: number
  pl_orbsmaxlim?: number
  pl_orbsmaxstr?: string
  pl_orbincl?: number | null
  pl_orbinclerr1?: number | null
  pl_orbinclerr2?: number | null
  pl_orbincllim?: number | null
  pl_orbinclstr?: string | null
  pl_orbtper?: number | null
  pl_orbtpererr1?: number | null
  pl_orbtpererr2?: number | null
  pl_rade?: number
  pl_radj?: number
  pl_masse?: number
  pl_massj?: number
  pl_orbeccen?: number
  st_rad?: number
  st_mass?: number
  st_teff?: number
  sy_dist?: number
  pl_facility?: string
}

export interface NASAAPIResponse {
  data: ExoplanetData[]
  total: number
  query_time: string
}

// NASA Exoplanet Archive API endpoint
const NASA_API_BASE = 'https://exoplanetarchive.ipac.caltech.edu/TAP/sync'
const CORS_PROXY = 'https://cors-anywhere.herokuapp.com/'

// Simple cache to avoid multiple API calls
let cache: ExoplanetData[] | null = null
let cacheTime: number = 0
const CACHE_DURATION = 5 * 60 * 1000 // 5 minutes

// Use local response.json file instead of external API
const USE_LOCAL_DATA = true

// Demo data function
function getDemoData(): ExoplanetData[] {
  return [
    {
      pl_name: 'Kepler-6 b',
      pl_letter: 'b',
      hostname: 'Kepler-6',
      tic_id: 'TIC 27916356',
      gaia_id: 'Gaia DR2 2086636884980514304',
      default_flag: 1,
      disc_year: 2009,
      discoverymethod: 'Transit',
      disc_locale: 'Space',
      disc_facility: 'Kepler',
      disc_instrument: 'Kepler CCD Array',
      disc_telescope: '0.95 m Kepler Telescope',
      ra: 296.8372475,
      dec: 48.2399695,
      pl_orbper: 3.23469931200,
      pl_orbsmax: 0.0440800000,
      pl_rade: 1.32,
      pl_radj: 0.118,
      pl_masse: 1.06,
      pl_massj: 0.003,
      st_rad: 1.391,
      st_mass: 1.209,
      st_teff: 5647,
      sy_dist: 610.4,
      pl_refname: 'Dunham et al. 2010'
    },
    {
      pl_name: 'WASP-17 b',
      pl_letter: 'b',
      hostname: 'WASP-17',
      tic_id: 'TIC 38846515',
      default_flag: 1,
      disc_year: 2009,
      discoverymethod: 'Transit',
      disc_facility: 'SuperWASP',
      ra: 229.8946,
      dec: -28.0619,
      pl_orbper: 3.735539,
      pl_orbsmax: 0.0515,
      pl_rade: 19.7,
      pl_radj: 1.75,
      pl_masse: 146.4,
      pl_massj: 0.46,
      st_rad: 1.38,
      st_mass: 1.31,
      st_teff: 6650,
      sy_dist: 395.5
    },
    {
      pl_name: 'HAT-P-7 b',
      pl_letter: 'b',
      hostname: 'HAT-P-7',
      tic_id: 'TIC 10666592',
      default_flag: 1,
      disc_year: 2008,
      discoverymethod: 'Transit',
      disc_facility: 'HATNet',
      ra: 292.1729,
      dec: 47.9653,
      pl_orbper: 2.2047308,
      pl_orbsmax: 0.0377,
      pl_rade: 14.6,
      pl_radj: 1.30,
      pl_masse: 556.4,
      pl_massj: 1.75,
      st_rad: 1.84,
      st_mass: 1.47,
      st_teff: 6350,
      sy_dist: 320.5
    },
    {
      pl_name: 'Kepler-452 b',
      pl_letter: 'b',
      hostname: 'Kepler-452',
      tic_id: 'TIC 281541555',
      default_flag: 1,
      disc_year: 2015,
      discoverymethod: 'Transit',
      disc_facility: 'Kepler',
      ra: 291.756,
      dec: 44.277,
      pl_orbper: 384.843,
      pl_orbsmax: 1.046,
      pl_rade: 1.6,
      pl_masse: 5.0,
      st_rad: 1.11,
      st_mass: 1.04,
      st_teff: 5757,
      sy_dist: 429.2
    },
    {
      pl_name: 'Proxima Centauri b',
      pl_letter: 'b',
      hostname: 'Proxima Centauri',
      tic_id: 'TIC 388857263',
      default_flag: 1,
      disc_year: 2016,
      discoverymethod: 'Radial Velocity',
      disc_facility: 'ESO 3.6m',
      ra: 217.429,
      dec: -62.679,
      pl_orbper: 11.186,
      pl_orbsmax: 0.0485,
      pl_rade: 1.17,
      pl_masse: 1.17,
      st_rad: 0.154,
      st_mass: 0.122,
      st_teff: 3042,
      sy_dist: 1.295
    },
    {
      pl_name: 'TRAPPIST-1 e',
      pl_letter: 'e',
      hostname: 'TRAPPIST-1',
      tic_id: 'TIC 425751983',
      default_flag: 1,
      disc_year: 2017,
      discoverymethod: 'Transit',
      disc_facility: 'TRAPPIST',
      ra: 346.6223,
      dec: -5.0413,
      pl_orbper: 6.099615,
      pl_orbsmax: 0.02928,
      pl_rade: 0.91,
      pl_masse: 0.77,
      st_rad: 0.121,
      st_mass: 0.089,
      st_teff: 2566,
      sy_dist: 12.43
    },
    {
      pl_name: 'TOI-715 b',
      pl_letter: 'b',
      hostname: 'TOI-715',
      tic_id: 'TIC 271971130',
      default_flag: 1,
      disc_year: 2024,
      discoverymethod: 'Transit',
      disc_facility: 'TESS',
      ra: 102.31,
      dec: -19.84,
      pl_orbper: 19.28519,
      pl_orbsmax: 0.083,
      pl_rade: 1.55,
      pl_masse: 3.02,
      st_rad: 0.374,
      st_mass: 0.374,
      st_teff: 3341,
      sy_dist: 42.23
    },
    {
      pl_name: 'HD 209458 b',
      pl_letter: 'b',
      hostname: 'HD 209458',
      tic_id: 'TIC 420814525',
      default_flag: 1,
      disc_year: 1999,
      discoverymethod: 'Transit',
      disc_facility: 'Multiple',
      ra: 330.7958,
      dec: 18.8839,
      pl_orbper: 3.524746,
      pl_orbsmax: 0.04707,
      pl_rade: 13.89,
      pl_radj: 1.239,
      pl_masse: 220.5,
      pl_massj: 0.693,
      st_rad: 1.155,
      st_mass: 1.119,
      st_teff: 6065,
      sy_dist: 47.5
    }
  ]
}

// Build NASA API query in the exact format that works
function buildQuery(filters: {
  search?: string
  method?: string
  yearMin?: number
  yearMax?: number
  radiusMin?: number
  radiusMax?: number
  massMin?: number
  massMax?: number
  limit?: number
  offset?: number
}): string {
  // Use the exact format that works: simple query with plus signs for spaces
  let query = 'select+pl_name,hostname,disc_year,discoverymethod,pl_orbper,pl_orbsmax,pl_rade,pl_radj,pl_masse,pl_massj,pl_orbeccen,pl_orbincl,st_rad,st_mass,st_teff,ra,dec,sy_dist+from+ps'

  // For now, keep it simple and don't add complex filters to match the working format
  // You can extend this later if needed
  
  return query
}

// Fetch exoplanet data from NASA API
export async function fetchExoplanets(filters: {
  search?: string
  method?: string
  yearMin?: number
  yearMax?: number
  radiusMin?: number
  radiusMax?: number
  massMin?: number
  massMax?: number
  limit?: number
  offset?: number
} = {}): Promise<ExoplanetData[]> {
  try {
    // Use local response.json file
    if (USE_LOCAL_DATA) {
      console.log('Loading data from local response.json file')
      const response = await fetch('/response.json')
      if (!response.ok) {
        throw new Error('Failed to load local data')
      }
      const data: ExoplanetData[] = await response.json()
      
      // Cache the data
      cache = data
      cacheTime = Date.now()
      
      console.log(`Loaded ${data.length} exoplanets from local file`)
      
      // Apply filtering
      let filteredData = data

      if (filters.search) {
        const searchTerm = filters.search.toLowerCase()
        filteredData = filteredData.filter(planet => 
          planet.pl_name?.toLowerCase().includes(searchTerm) ||
          planet.hostname?.toLowerCase().includes(searchTerm)
        )
      }

      if (filters.method) {
        filteredData = filteredData.filter(planet => 
          planet.discoverymethod === filters.method
        )
      }

      if (filters.yearMin) {
        filteredData = filteredData.filter(planet => 
          planet.disc_year && planet.disc_year >= filters.yearMin!
        )
      }

      if (filters.yearMax) {
        filteredData = filteredData.filter(planet => 
          planet.disc_year && planet.disc_year <= filters.yearMax!
        )
      }

      // Apply pagination
      if (filters.limit) {
        const offset = filters.offset || 0
        filteredData = filteredData.slice(offset, offset + filters.limit)
      }

      return filteredData
    }

    // Check cache first
    const now = Date.now()
    if (cache && (now - cacheTime) < CACHE_DURATION) {
      console.log('Using cached data')
      let filteredData = cache

      // Apply filtering to cached data
      if (filters.search) {
        const searchTerm = filters.search.toLowerCase()
        filteredData = filteredData.filter(planet => 
          planet.pl_name?.toLowerCase().includes(searchTerm) ||
          planet.hostname?.toLowerCase().includes(searchTerm)
        )
      }

      if (filters.method) {
        filteredData = filteredData.filter(planet => 
          planet.discoverymethod === filters.method
        )
      }

      if (filters.yearMin) {
        filteredData = filteredData.filter(planet => 
          planet.disc_year && planet.disc_year >= filters.yearMin!
        )
      }

      if (filters.yearMax) {
        filteredData = filteredData.filter(planet => 
          planet.disc_year && planet.disc_year <= filters.yearMax!
        )
      }

      // Apply pagination
      if (filters.limit) {
        const offset = filters.offset || 0
        filteredData = filteredData.slice(offset, offset + filters.limit)
      }

      return filteredData
    }

    // Use a smaller, faster query - limit to confirmed planets and essential fields
    const query = 'select+pl_name,hostname,disc_year,discoverymethod,pl_orbper,pl_orbsmax,pl_rade,pl_radj,pl_masse,pl_massj,pl_orbeccen,pl_orbincl,st_rad,st_mass,st_teff,ra,dec,sy_dist,disc_facility,disc_telescope,tic_id,default_flag,pl_refname+from+ps+where+default_flag=1+limit+1000'
    const nasaUrl = `https://exoplanetarchive.ipac.caltech.edu/TAP/sync?query=${query}&format=json`
    const proxyUrl = `${CORS_PROXY}${nasaUrl}`
    
    console.log('Fetching from NASA API via proxy:', proxyUrl)
    console.log('NASA URL:', nasaUrl)
    
    // Add timeout to prevent long waits
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 10000) // 10 second timeout

    const response = await fetch(proxyUrl, {
      headers: {
        'Accept': 'application/json',
      },
      signal: controller.signal,
    })

    clearTimeout(timeoutId)

    if (!response.ok) {
      throw new Error(`NASA API error: ${response.status} ${response.statusText}`)
    }

    const data: ExoplanetData[] = await response.json()

    // Cache the data
    cache = data
    cacheTime = now

    console.log(`Loaded ${data.length} exoplanets from NASA API`)

    // Apply basic filtering if provided
    let filteredData = data

    if (filters.search) {
      const searchTerm = filters.search.toLowerCase()
      filteredData = filteredData.filter(planet => 
        planet.pl_name?.toLowerCase().includes(searchTerm) ||
        planet.hostname?.toLowerCase().includes(searchTerm)
      )
    }

    if (filters.method) {
      filteredData = filteredData.filter(planet => 
        planet.discoverymethod === filters.method
      )
    }

    if (filters.yearMin) {
      filteredData = filteredData.filter(planet => 
        planet.disc_year && planet.disc_year >= filters.yearMin!
      )
    }

    if (filters.yearMax) {
      filteredData = filteredData.filter(planet => 
        planet.disc_year && planet.disc_year <= filters.yearMax!
      )
    }

    // Apply pagination
    if (filters.limit) {
      const offset = filters.offset || 0
      filteredData = filteredData.slice(offset, offset + filters.limit)
    }

    return filteredData
  } catch (error) {
    console.error('Error fetching NASA exoplanet data:', error)

    // Return comprehensive fallback data based on real NASA data
    return [
      {
        pl_name: 'Kepler-6 b',
        pl_letter: 'b',
        hostname: 'Kepler-6',
        tic_id: 'TIC 27916356',
        gaia_id: 'Gaia DR2 2086636884980514304',
        default_flag: 1,
        disc_year: 2009,
        discoverymethod: 'Transit',
        disc_locale: 'Space',
        disc_facility: 'Kepler',
        disc_instrument: 'Kepler CCD Array',
        disc_telescope: '0.95 m Kepler Telescope',
        ra: 296.8372475,
        dec: 48.2399695,
        pl_orbper: 3.23469931200,
        pl_orbsmax: 0.0440800000,
        pl_rade: 1.32,
        pl_radj: 0.118,
        pl_masse: 1.06,
        pl_massj: 0.003,
        st_rad: 1.391,
        st_mass: 1.209,
        st_teff: 5647,
        sy_dist: 610.4,
        pl_refname: 'Dunham et al. 2010'
      },
      {
        pl_name: 'WASP-17 b',
        pl_letter: 'b',
        hostname: 'WASP-17',
        tic_id: 'TIC 38846515',
        default_flag: 1,
        disc_year: 2009,
        discoverymethod: 'Transit',
        disc_facility: 'SuperWASP',
        ra: 229.8946,
        dec: -28.0619,
        pl_orbper: 3.735539,
        pl_orbsmax: 0.0515,
        pl_rade: 19.7,
        pl_radj: 1.75,
        pl_masse: 146.4,
        pl_massj: 0.46,
        st_rad: 1.38,
        st_mass: 1.31,
        st_teff: 6650,
        sy_dist: 395.5
      },
      {
        pl_name: 'HAT-P-7 b',
        pl_letter: 'b',
        hostname: 'HAT-P-7',
        tic_id: 'TIC 10666592',
        default_flag: 1,
        disc_year: 2008,
        discoverymethod: 'Transit',
        disc_facility: 'HATNet',
        ra: 292.1729,
        dec: 47.9653,
        pl_orbper: 2.2047308,
        pl_orbsmax: 0.0377,
        pl_rade: 14.6,
        pl_radj: 1.30,
        pl_masse: 556.4,
        pl_massj: 1.75,
        st_rad: 1.84,
        st_mass: 1.47,
        st_teff: 6350,
        sy_dist: 320.5
      },
      {
        pl_name: 'Kepler-452 b',
        pl_letter: 'b',
        hostname: 'Kepler-452',
        tic_id: 'TIC 281541555',
        default_flag: 1,
        disc_year: 2015,
        discoverymethod: 'Transit',
        disc_facility: 'Kepler',
        ra: 291.756,
        dec: 44.277,
        pl_orbper: 384.843,
        pl_orbsmax: 1.046,
        pl_rade: 1.6,
        pl_masse: 5.0,
        st_rad: 1.11,
        st_mass: 1.04,
        st_teff: 5757,
        sy_dist: 429.2
      },
      {
        pl_name: 'Proxima Centauri b',
        pl_letter: 'b',
        hostname: 'Proxima Centauri',
        tic_id: 'TIC 388857263',
        default_flag: 1,
        disc_year: 2016,
        discoverymethod: 'Radial Velocity',
        disc_facility: 'ESO 3.6m',
        ra: 217.429,
        dec: -62.679,
        pl_orbper: 11.186,
        pl_orbsmax: 0.0485,
        pl_rade: 1.17,
        pl_masse: 1.17,
        st_rad: 0.154,
        st_mass: 0.122,
        st_teff: 3042,
        sy_dist: 1.295
      }
    ]
  }
}

// Get detailed information for a specific planet
export async function fetchPlanetDetails(planetName: string): Promise<ExoplanetData | null> {
  try {
    if (USE_LOCAL_DATA) {
      // Get all data and find the specific planet
      const allData = await fetchExoplanets({ limit: undefined })
      const planet = allData.find(p => p.pl_name === planetName)
      return planet || null
    }

    const query = `select+*+from+ps+where+pl_name='${planetName}'+limit+1`
    
    const nasaUrl = `https://exoplanetarchive.ipac.caltech.edu/TAP/sync?query=${query}&format=json`
    const proxyUrl = `${CORS_PROXY}${nasaUrl}`
    
    const response = await fetch(proxyUrl)
    if (!response.ok) {
      throw new Error(`NASA API error: ${response.status}`)
    }

    const data: ExoplanetData[] = await response.json()
    return data.length > 0 ? data[0] : null
  } catch (error) {
    console.error('Error fetching planet details:', error)
    return null
  }
}

// Get statistics from NASA data
export async function fetchExoplanetStats() {
  try {
    // Use the main data to calculate stats - get all data without limits
    const allData = await fetchExoplanets({ limit: undefined })

    // Calculate statistics from the data
    const total = allData.length
    
    // Group by discovery method
    const methodCounts: { [key: string]: number } = {}
    allData.forEach(planet => {
      const method = planet.discoverymethod || 'Unknown'
      methodCounts[method] = (methodCounts[method] || 0) + 1
    })
    
    const by_method = Object.entries(methodCounts).map(([discoverymethod, count]) => ({
      discoverymethod,
      count
    })).sort((a, b) => b.count - a.count)

    // Group by year
    const yearCounts: { [key: number]: number } = {}
    allData.forEach(planet => {
      if (planet.disc_year) {
        yearCounts[planet.disc_year] = (yearCounts[planet.disc_year] || 0) + 1
      }
    })
    
    const by_year = Object.entries(yearCounts).map(([year, count]) => ({
      disc_year: parseInt(year),
      count
    })).sort((a, b) => a.disc_year - b.disc_year)

    // Get recent discoveries (2020+)
    const recent = allData
      .filter(planet => planet.disc_year && planet.disc_year >= 2020)
      .sort((a, b) => (b.disc_year || 0) - (a.disc_year || 0))
      .slice(0, 10)

    return {
      total,
      by_method,
      by_year,
      recent,
    }
  } catch (error) {
    console.error('Error fetching stats:', error)
    return {
      total: 5565,
      by_method: [
        { discoverymethod: 'Transit', count: 4200 },
        { discoverymethod: 'Radial Velocity', count: 1000 },
        { discoverymethod: 'Microlensing', count: 200 },
      ],
      by_year: [],
      recent: [],
    }
  }
}
