'use client'

import { useEffect, useRef } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import { trackPageView } from '@/lib/analytics'

/**
 * PageViewTracker - Automatically tracks page views for Google Analytics
 * 
 * This component uses Next.js navigation hooks to detect route changes
 * and calls trackPageView() from lib/analytics.ts for each navigation.
 * 
 * Features:
 * - Tracks initial page load and subsequent client-side navigation
 * - Includes query parameters in the tracked URL
 * - Prevents duplicate tracking on component mount
 * - Works in both development (console logs) and production (GA4 events)
 */
export default function PageViewTracker() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const hasTrackedInitial = useRef(false)

  // Create a stable string representation of search params for dependency
  const searchString = searchParams.toString()

  useEffect(() => {
    // Construct the full URL by combining pathname and search params
    const url = pathname + (searchString ? `?${searchString}` : '')

    // Track the page view
    trackPageView(url)

    // Mark that we've tracked the initial page view
    if (!hasTrackedInitial.current) {
      hasTrackedInitial.current = true
    }
  }, [pathname, searchString])

  // This component has no UI - it only handles tracking
  return null
}
