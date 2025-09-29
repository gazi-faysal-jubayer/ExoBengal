/**
 * Utility functions for converting planet names to URL-safe slugs and vice versa
 */

export interface SlugConversionResult {
  success: boolean;
  result: string;
  error?: string;
}

/**
 * Converts a planet name to a URL-safe slug
 * Examples:
 * - 'Kepler-452 b' -> 'kepler-452-b'
 * - 'HD 209458 b' -> 'hd-209458-b'
 * - 'WASP-12 b' -> 'wasp-12-b'
 */
export function planetNameToSlug(planetName: string): string {
  if (!planetName) {
    return '';
  }

  return planetName
    .toLowerCase()
    .trim()
    // Replace spaces with hyphens
    .replace(/\s+/g, '-')
    // Replace multiple consecutive hyphens with single hyphen
    .replace(/-+/g, '-')
    // Remove invalid URL characters (keep letters, numbers, hyphens)
    .replace(/[^a-z0-9\-]/g, '')
    // Remove leading/trailing hyphens
    .replace(/^-+|-+$/g, '');
}

/**
 * Attempts to reverse slug conversion back to planet name
 * This is a best-effort conversion and may not perfectly restore the original name
 */
export function slugToPlanetName(slug: string): SlugConversionResult {
  if (!slug) {
    return {
      success: false,
      result: '',
      error: 'Empty slug provided'
    };
  }

  try {
    let restored = slug
      .toLowerCase()
      .trim()
      // Replace hyphens with spaces
      .replace(/-/g, ' ')
      // Capitalize common patterns
      .replace(/\b(hd|wasp|kepler|toi|koi|k2|tres|hat|qatar|corot|gj|gliese)\b/gi, (match) => match.toUpperCase())
      // Capitalize first letter of each word
      .replace(/\b\w/g, (char) => char.toUpperCase());

    return {
      success: true,
      result: restored
    };
  } catch (error) {
    return {
      success: false,
      result: '',
      error: `Failed to convert slug: ${error}`
    };
  }
}

/**
 * Validates if a slug is properly formatted
 */
export function isValidSlug(slug: string): boolean {
  if (!slug) return false;
  
  // Check if slug contains only lowercase letters, numbers, and hyphens
  const slugPattern = /^[a-z0-9]+(-[a-z0-9]+)*$/;
  return slugPattern.test(slug);
}

/**
 * Normalizes a slug to ensure consistency
 */
export function normalizeSlug(slug: string): string {
  return planetNameToSlug(slug);
}

/**
 * Creates a slug with fallback handling for edge cases
 */
export function createSafeSlug(planetName: string, fallbackId?: string): string {
  const slug = planetNameToSlug(planetName);
  
  if (!slug && fallbackId) {
    return planetNameToSlug(fallbackId);
  }
  
  if (!slug) {
    return 'unknown-planet';
  }
  
  return slug;
}

/**
 * Utility type for planet slug operations
 */
export interface PlanetSlugData {
  originalName: string;
  slug: string;
  isValid: boolean;
}

/**
 * Creates comprehensive slug data for a planet
 */
export function createPlanetSlugData(planetName: string): PlanetSlugData {
  const slug = planetNameToSlug(planetName);
  
  return {
    originalName: planetName,
    slug,
    isValid: isValidSlug(slug)
  };
}
