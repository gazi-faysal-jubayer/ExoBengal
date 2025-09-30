# CSV Data Setup for ExoBengal

## Required CSV File

The ExoBengal website requires a CSV file containing NASA exoplanet data to enable dynamic planet routes in the sitemap and explorer functionality.

### File Details
- **Filename**: `PS_2025.09.12_22.39.25.csv`
- **Location**: `website/public/` directory
- **Source**: NASA Exoplanet Archive

### Setup Instructions

1. **Download the data**:
   - Visit the [NASA Exoplanet Archive](https://exoplanetarchive.ipac.caltech.edu/)
   - Navigate to the "Planetary Systems Composite Parameters" table
   - Export the data as CSV format

2. **Prepare the file**:
   - Rename the downloaded file to `PS_2025.09.12_22.39.25.csv`
   - Ensure the CSV includes at minimum these columns:
     - `pl_name` (planet name)
     - `hostname` (host star name)
     - `discoverymethod` (discovery method)
     - `disc_year` (discovery year)
     - `pl_rade` (planet radius)
     - `pl_masse` (planet mass)
     - `st_teff` (stellar effective temperature)
     - `ra` (right ascension)
     - `dec` (declination)

3. **Place the file**:
   - Copy the CSV file to `website/public/PS_2025.09.12_22.39.25.csv`
   - The file will be served statically by Next.js

### Impact on Functionality

**With CSV file**:
- Sitemap includes dynamic routes for all planets (`/explorer/planet/[slug]`)
- Explorer functionality works with full planet data
- Search and filtering features are fully operational

**Without CSV file**:
- Sitemap only includes static routes and documentation pages
- Explorer shows empty state or placeholder content
- A warning is logged during build time
- Website remains functional but with limited planet data

### Fallback Behavior

The sitemap generator (`app/sitemap.ts`) includes graceful error handling:
- If the CSV file is missing, it logs a warning and continues
- Only static and documentation routes are included in the sitemap
- No build errors occur due to missing data

### Alternative Configuration

If you prefer a different filename or location:
1. Update the path in `lib/explorer-store.ts` (line with CSV path)
2. Update the path in `app/sitemap.ts` (line with CSV path)
3. Ensure the file is accessible from the public directory
