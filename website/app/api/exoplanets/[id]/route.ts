import { NextRequest, NextResponse } from 'next/server'

// Sample detailed planet data
const detailedPlanetData = {
  '1': {
    id: '1',
    pl_name: 'Kepler-452b',
    nickname: 'Earth\'s Cousin',
    description: 'Kepler-452b is an exoplanet orbiting within the habitable zone of the Sun-like star Kepler-452, located about 1,400 light-years from Earth in the constellation Cygnus. It was discovered by NASA\'s Kepler Space Telescope in 2015.',
    discovered: '2015-07-23',
    discoverymethod: 'Transit',
    disc_facility: 'Kepler Space Telescope',
    
    // Physical properties
    physical_properties: {
      pl_rade: { value: 1.6, unit: 'R⊕', uncertainty: '±0.2', source: 'photometry' },
      pl_masse: { value: 5.0, unit: 'M⊕', uncertainty: '±1.0', estimated: true, source: 'mass-radius relation' },
      pl_dens: { value: 5.0, unit: 'g/cm³', uncertainty: '±1.0', estimated: true },
      pl_eqt: { value: 265, unit: 'K', uncertainty: '±15', source: 'equilibrium temperature model' },
      pl_gravity: { value: 1.94, unit: 'g', uncertainty: '±0.4', estimated: true },
    },
    
    // Orbital characteristics
    orbital_characteristics: {
      pl_orbper: { value: 384.843, unit: 'days', uncertainty: '±0.007' },
      pl_orbsmax: { value: 1.046, unit: 'AU', uncertainty: '±0.014' },
      pl_orbeccen: { value: 0.097, unit: '', uncertainty: '±0.06' },
      pl_orbincl: { value: 89.806, unit: '°', uncertainty: '±0.2' },
      pl_tranmid: { value: 2455006.71, unit: 'BJD', uncertainty: '±0.1' },
      pl_trandep: { value: 0.00065, unit: '', uncertainty: '±0.00005' },
      pl_orbtper: { value: 8.5, unit: 'hours', uncertainty: '±0.3' },
    },
    
    // Host star properties
    host_star: {
      hostname: 'Kepler-452',
      st_spectype: 'G2V',
      st_teff: { value: 5757, unit: 'K', uncertainty: '±85' },
      st_rad: { value: 1.11, unit: 'R☉', uncertainty: '±0.09' },
      st_mass: { value: 1.04, unit: 'M☉', uncertainty: '±0.05' },
      st_lum: { value: 1.2, unit: 'L☉', uncertainty: '±0.2' },
      st_age: { value: 6.0, unit: 'Gyr', uncertainty: '±2.0' },
      st_met: { value: 0.21, unit: '[Fe/H]', uncertainty: '±0.05' },
      st_logg: { value: 4.32, unit: 'log(cm/s²)', uncertainty: '±0.09' },
    },
    
    // Location
    location: {
      constellation: 'Cygnus',
      ra: { value: 291.756, unit: 'degrees', formatted: '19h 44m 00.89s' },
      dec: { value: 44.277, unit: 'degrees', formatted: '+41° 53\' 20.4"' },
      sy_dist: { value: 429.2, unit: 'pc', uncertainty: '±30.1', ly_equivalent: 1400 },
      sy_pmra: { value: -3.9, unit: 'mas/yr', uncertainty: '±1.2' },
      sy_pmdec: { value: -8.1, unit: 'mas/yr', uncertainty: '±1.1' },
    },
    
    // Habitability assessment
    habitability: {
      habitable_zone: true,
      habitable_zone_classification: 'Conservative Habitable Zone',
      earth_similarity_index: 0.83,
      potential_for_liquid_water: 'High',
      atmospheric_retention: 'Likely',
      greenhouse_effect: 'Moderate to Strong',
      biosignature_potential: 'Moderate',
      climate_stability: 'Good',
    },
    
    // Discovery and observation details
    discovery: {
      disc_year: 2015,
      disc_refname: 'Jenkins et al. 2015',
      disc_pubdate: '2015-07-23',
      disc_locale: 'Space',
      disc_instrument: 'Kepler Photometer',
      disc_telescope: 'Kepler Space Telescope',
    },
    
    // Transit parameters
    transit_parameters: {
      pl_trandep: { value: 0.00065, unit: '', uncertainty: '±0.00005', description: 'Transit depth' },
      pl_trandur: { value: 8.5, unit: 'hours', uncertainty: '±0.3', description: 'Transit duration' },
      pl_tranmid: { value: 2455006.71, unit: 'BJD', uncertainty: '±0.1', description: 'Transit midpoint' },
      pl_imppar: { value: 0.7, unit: '', uncertainty: '±0.2', description: 'Impact parameter' },
    },
    
    // Observations and follow-up
    observations: {
      kepler_observations: {
        quarters: 'Q1-Q17',
        total_observations: 4641,
        data_span: '4 years',
        signal_to_noise: 18.4,
      },
      ground_based_followup: [
        'HIRES/Keck',
        'HARPS-N/TNG',
        'Spitzer Space Telescope',
      ],
    },
    
    // Scientific significance
    significance: {
      first_earth_size_hz_sunlike: true,
      importance: 'Benchmark for Earth-analog searches',
      atmospheric_characterization_potential: 'Limited due to distance',
      jwst_observable: false,
    },
    
    // References
    references: [
      {
        title: 'Kepler-452b: A Possibly Rocky Planet in the Habitable Zone',
        authors: 'Jenkins, J. M. et al.',
        journal: 'The Astronomical Journal',
        year: 2015,
        volume: 150,
        issue: 2,
        article_id: 56,
        doi: '10.1088/0004-6256/150/2/56',
        bibcode: '2015AJ....150...56J',
        link: 'https://iopscience.iop.org/article/10.1088/0004-6256/150/2/56',
      },
      {
        title: 'Terrestrial Planet Occurrence Rates for the Kepler GK Dwarf Sample',
        authors: 'Burke, C. J. et al.',
        journal: 'The Astrophysical Journal',
        year: 2015,
        volume: 809,
        issue: 1,
        article_id: 8,
        doi: '10.1088/0004-637X/809/1/8',
        bibcode: '2015ApJ...809....8B',
        link: 'https://iopscience.iop.org/article/10.1088/0004-637X/809/1/8',
      },
    ],
    
    // Data quality and flags
    data_quality: {
      pl_rade_quality: 'Good',
      pl_masse_quality: 'Estimated',
      orbital_quality: 'High',
      stellar_quality: 'Good',
      disposition: 'Confirmed',
      controversial: false,
    },
    
    // Related objects
    related_objects: {
      system_planets: ['Kepler-452b'],
      similar_planets: ['Kepler-438b', 'Kepler-442b', 'TOI-715b'],
      host_star_companions: null,
    },
    
    // External links
    external_links: {
      nasa_archive: 'https://exoplanetarchive.ipac.caltech.edu/overview/Kepler-452b',
      nasa_eyes: 'https://eyes.nasa.gov/apps/exo/#/planet/Kepler-452_b',
      exoplanet_eu: 'http://exoplanet.eu/catalog/kepler-452_b/',
      simbad: 'http://simbad.u-strasbg.fr/simbad/sim-id?Ident=Kepler-452b',
    },
  },
}

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const planetId = params.id
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 200))
    
    const planet = detailedPlanetData[planetId as keyof typeof detailedPlanetData]
    
    if (!planet) {
      return NextResponse.json(
        { error: 'Planet not found' },
        { status: 404 }
      )
    }
    
    const response = {
      data: planet,
      last_updated: new Date().toISOString(),
      data_source: 'NASA Exoplanet Archive',
      version: '1.0.0',
    }
    
    return NextResponse.json(response)
  } catch (error) {
    console.error('Error fetching planet details:', error)
    return NextResponse.json(
      { error: 'Failed to fetch planet details' },
      { status: 500 }
    )
  }
}

// Handle updates to planet data (for user favorites, notes, etc.)
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const planetId = params.id
    const updates = await request.json()
    
    // In a real application, this would update user-specific data
    // like favorites, personal notes, etc.
    
    const response = {
      success: true,
      planet_id: planetId,
      updates_applied: updates,
      updated_at: new Date().toISOString(),
    }
    
    return NextResponse.json(response)
  } catch (error) {
    console.error('Error updating planet data:', error)
    return NextResponse.json(
      { error: 'Failed to update planet data' },
      { status: 500 }
    )
  }
}
