/**
 * Analytics Utilities
 * 
 * Provides functions for tracking user interactions and events in Google Analytics 4.
 * All tracking functions are production-only and include error handling.
 * 
 * Usage:
 * - trackPageView() - Automatic page view tracking
 * - trackSearchQuery() - Track explorer searches
 * - trackPlanetView() - Track planet detail page views
 * - trackEvent() - Generic event tracking
 * - trackExternalLink() - Track external link clicks
 * - trackDownload() - Track file downloads
 * - trackAPICall() - Track API usage
 */

// TypeScript declaration for Google Analytics
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
}

// TypeScript interfaces for event parameters
export interface GAEvent {
  action: string;
  category: string;
  label?: string;
  value?: number;
}

export interface SearchEventParams {
  query: string;
  resultsCount: number;
  filters?: Record<string, any>;
}

export interface PlanetViewParams {
  planetName: string;
  slug: string;
  discoveryMethod?: string;
  discoveryYear?: number;
}

export interface CustomEventParams {
  [key: string]: any;
}

/**
 * Check if the application is running in production environment
 */
function isProduction(): boolean {
  return typeof window !== 'undefined' && process.env.NODE_ENV === 'production';
}

/**
 * Check if Google Analytics is loaded and available
 */
function hasGoogleAnalytics(): boolean {
  return typeof window !== 'undefined' && typeof window.gtag !== 'undefined';
}

/**
 * Tracks a page view in Google Analytics 4
 * @param url - The page URL to track
 * @param title - Optional page title
 */
export function trackPageView(url: string, title?: string): void {
  if (!isProduction() || !hasGoogleAnalytics()) {
    if (process.env.NODE_ENV === 'development') {
      console.log('Analytics: trackPageView', { url, title });
    }
    return;
  }

  try {
    window.gtag('event', 'page_view', {
      page_path: url,
      page_title: title,
    });
  } catch (error) {
    console.error('Analytics: Error tracking page view', error);
  }
}

/**
 * Tracks a search query in the explorer with results count and applied filters
 * @param params - Search event parameters
 */
export function trackSearchQuery(params: SearchEventParams): void {
  if (!isProduction() || !hasGoogleAnalytics()) {
    if (process.env.NODE_ENV === 'development') {
      console.log('Analytics: trackSearchQuery', params);
    }
    return;
  }

  try {
    window.gtag('event', 'search', {
      search_term: params.query,
      results_count: params.resultsCount,
      filters: JSON.stringify(params.filters || {}),
    });
  } catch (error) {
    console.error('Analytics: Error tracking search query', error);
  }
}

/**
 * Tracks when a user views a planet detail page
 * @param params - Planet view parameters
 */
export function trackPlanetView(params: PlanetViewParams): void {
  if (!isProduction() || !hasGoogleAnalytics()) {
    if (process.env.NODE_ENV === 'development') {
      console.log('Analytics: trackPlanetView', params);
    }
    return;
  }

  try {
    window.gtag('event', 'view_planet', {
      planet_name: params.planetName,
      planet_slug: params.slug,
      discovery_method: params.discoveryMethod,
      discovery_year: params.discoveryYear,
    });
  } catch (error) {
    console.error('Analytics: Error tracking planet view', error);
  }
}

/**
 * Tracks a custom event in Google Analytics 4
 * @param eventName - The name of the event to track
 * @param params - Optional event parameters
 */
export function trackEvent(eventName: string, params?: CustomEventParams): void {
  if (!isProduction() || !hasGoogleAnalytics()) {
    if (process.env.NODE_ENV === 'development') {
      console.log('Analytics: trackEvent', { eventName, params });
    }
    return;
  }

  try {
    window.gtag('event', eventName, params);
  } catch (error) {
    console.error('Analytics: Error tracking custom event', error);
  }
}

/**
 * Tracks clicks on external links (NASA, documentation, etc.)
 * @param url - The external URL that was clicked
 * @param linkText - The text content of the link
 */
export function trackExternalLink(url: string, linkText: string): void {
  trackEvent('click_external_link', {
    link_url: url,
    link_text: linkText,
  });
}

/**
 * Tracks file downloads (CSV exports, documentation PDFs, etc.)
 * @param fileName - The name of the downloaded file
 * @param fileType - The type/extension of the file
 */
export function trackDownload(fileName: string, fileType: string): void {
  trackEvent('file_download', {
    file_name: fileName,
    file_type: fileType,
  });
}

/**
 * Tracks API calls for monitoring usage patterns
 * @param endpoint - The API endpoint that was called
 * @param method - The HTTP method used
 * @param success - Whether the API call was successful
 */
export function trackAPICall(endpoint: string, method: string, success: boolean): void {
  trackEvent('api_call', {
    endpoint,
    method,
    success,
  });
}

