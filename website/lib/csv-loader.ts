// Lightweight CSV loader for client-side use (handles quoted fields)
// Reads a CSV from the public folder and maps to objects by header

export interface CSVRowObject {
  [key: string]: string | number | null | undefined
}

function getBasePath(): string {
  if (typeof window === 'undefined') return ''
  const path = window.location.pathname || ''
  // Infer basePath like /ExoBengal if present at the start
  const match = path.match(/^\/(\w+)(?:\/|$)/)
  // Only treat certain known base path; fallback to env if provided
  const envBase = (process as any)?.env?.NEXT_PUBLIC_BASE_PATH || ''
  if (envBase) return envBase
  if (match && match[1] && match[1].toLowerCase() === 'exobengal') {
    return '/ExoBengal'
  }
  return ''
}

function buildPublicUrl(relativePath: string): string {
  const base = getBasePath()
  if (relativePath.startsWith('/')) return `${base}${relativePath}`
  return `${base}/${relativePath}`
}

function parseCSV(text: string): { headers: string[]; rows: string[][] } {
  const rows: string[][] = []
  let current: string[] = []
  let field = ''
  let inQuotes = false

  const pushField = () => {
    current.push(field)
    field = ''
  }

  const pushRow = () => {
    rows.push(current)
    current = []
  }

  for (let i = 0; i < text.length; i++) {
    const char = text[i]
    const next = text[i + 1]
    if (inQuotes) {
      if (char === '"') {
        if (next === '"') {
          field += '"'
          i++
        } else {
          inQuotes = false
        }
      } else {
        field += char
      }
    } else {
      if (char === '"') {
        inQuotes = true
      } else if (char === ',') {
        pushField()
      } else if (char === '\n') {
        pushField()
        pushRow()
      } else if (char === '\r') {
        // ignore CR (handle CRLF)
      } else {
        field += char
      }
    }
  }
  // flush last field/row
  pushField()
  if (current.length > 1 || (current.length === 1 && current[0] !== '')) {
    pushRow()
  }

  if (rows.length === 0) return { headers: [], rows: [] }
  const headers = rows[0].map(h => h.trim())
  const dataRows = rows.slice(1)
  return { headers, rows: dataRows }
}

function toNumber(value: string): number | undefined {
  if (value === undefined || value === null) return undefined
  const v = String(value).trim()
  if (v === '' || v.toLowerCase() === 'null') return undefined
  const n = Number(v)
  return Number.isFinite(n) ? n : undefined
}

export async function loadCSVObjects(
  relativePath: string,
  limit?: number
): Promise<CSVRowObject[]> {
  const url = buildPublicUrl(relativePath)
  const res = await fetch(url)
  if (!res.ok) throw new Error(`Failed to fetch CSV at ${url}: ${res.status}`)
  const text = await res.text()
  const { headers, rows } = parseCSV(text)
  const headerIndex: Record<string, number> = {}
  headers.forEach((h, idx) => (headerIndex[h] = idx))
  const mapped = rows.map(cols => {
    const obj: CSVRowObject = {}
    headers.forEach((h, idx) => {
      obj[h] = cols[idx] !== undefined ? cols[idx] : undefined
    })
    return obj
  })
  return typeof limit === 'number' ? mapped.slice(0, limit) : mapped
}

// Specific mapping to the app's ExoplanetData-like shape used by explorer
export interface ExplorerPlanetRow {
  pl_name: string
  hostname?: string
  default_flag?: number
  discoverymethod?: string
  disc_year?: number
  disc_refname?: string
  disc_pubdate?: string
  disc_locale?: string
  disc_facility?: string
  disc_telescope?: string
  pl_orbper?: number
  pl_orbsmax?: number
  pl_rade?: number
  pl_radj?: number
  pl_masse?: number
  pl_massj?: number
  pl_orbeccen?: number
  pl_orbincl?: number
  st_rad?: number
  st_mass?: number
  st_teff?: number
  ra?: number
  dec?: number
  sy_dist?: number
}

export async function loadExoplanetsFromCSV(
  relativePath: string,
  limit?: number
): Promise<ExplorerPlanetRow[]> {
  const rows = await loadCSVObjects(relativePath, limit)
  return rows.map(r => ({
    pl_name: String(r['pl_name'] || ''),
    hostname: r['hostname'] as string | undefined,
    default_flag: toNumber(r['default_flag'] as string) as number | undefined,
    discoverymethod: r['discoverymethod'] as string | undefined,
    disc_year: toNumber(r['disc_year'] as string),
    disc_refname: r['disc_refname'] as string | undefined,
    disc_pubdate: r['disc_pubdate'] as string | undefined,
    disc_locale: r['disc_locale'] as string | undefined,
    disc_facility: r['disc_facility'] as string | undefined,
    disc_telescope: r['disc_telescope'] as string | undefined,
    pl_orbper: toNumber(r['pl_orbper'] as string),
    pl_orbsmax: toNumber(r['pl_orbsmax'] as string),
    pl_rade: toNumber(r['pl_rade'] as string),
    pl_radj: toNumber(r['pl_radj'] as string),
    pl_masse: toNumber(r['pl_masse'] as string),
    pl_massj: toNumber((r['pl_massj'] as string) || (r['pl_bmassj'] as string)),
    pl_orbeccen: toNumber(r['pl_orbeccen'] as string),
    pl_orbincl: toNumber(r['pl_orbincl'] as string),
    st_rad: toNumber(r['st_rad'] as string),
    st_mass: toNumber(r['st_mass'] as string),
    st_teff: toNumber(r['st_teff'] as string),
    ra: toNumber(r['ra'] as string),
    dec: toNumber(r['dec'] as string),
    sy_dist: toNumber(r['sy_dist'] as string),
  }))
}


