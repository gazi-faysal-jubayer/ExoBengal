'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

type NavItem = {
  title: string
  href?: string
  items?: NavItem[]
}

export const docsNav: NavItem[] = [
  {
    title: 'Getting Started',
    items: [
      { title: 'Overview', href: '/docs' },
      { title: 'Installation', href: '/docs/installation' },
      { title: 'Quick Start', href: '/docs/getting-started' },
      { title: 'Examples', href: '/docs/examples' },
    ],
  },
  {
    title: 'Python Library',
    items: [
      { title: 'DetectExoplanet', href: '/docs/api/detect-exoplanet' },
      { title: 'ExoParams', href: '/docs/api/exo-params' },
      { title: 'Utilities', href: '/docs/api/utils' },
    ],
  },
  {
    title: 'Model Artifacts',
    items: [
      { title: 'Models Overview', href: '/docs/models' },
      { title: 'Random Forest', href: '/docs/models#random-forest' },
      { title: 'CNN', href: '/docs/models#cnn' },
      { title: 'k-Nearest Neighbors', href: '/docs/models#knn' },
      { title: 'Decision Tree', href: '/docs/models#decision-tree' },
    ],
  },
  {
    title: 'Tutorials & Learning',
    items: [
      { title: 'Tutorials Overview', href: '/docs/tutorials' },
      { title: 'Training Models', href: '/docs/tutorials/training' },
      { title: 'Making Predictions', href: '/docs/tutorials/prediction' },
      { title: 'Notebook Walkthrough', href: '/docs/notebook' },
    ],
  },
  {
    title: 'API Deployment',
    items: [
      { title: 'Cerebrium API', href: '/docs/api' },
      { title: 'Endpoints', href: '/docs/api#api-endpoints' },
      { title: 'Usage Examples', href: '/docs/api#usage-examples' },
      { title: 'Error Handling', href: '/docs/api#error-handling' },
    ],
  },
  {
    title: 'Data Reference',
    items: [
      { title: 'Data Format', href: '/docs/data-reference' },
      { title: 'Features', href: '/docs/data-reference#features' },
      { title: 'Preprocessing', href: '/docs/data-reference#preprocessing' },
    ],
  },
]

export function SidebarNav() {
  const pathname = usePathname()
  const navRef = useRef<HTMLElement>(null)
  
  // Smooth scroll to anchor links
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const link = target.closest('a')
      if (link?.hash) {
        e.preventDefault()
        const element = document.querySelector(link.hash)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' })
          // Update URL without scrolling
          window.history.pushState(null, '', link.hash)
        }
      }
    }
    
    const nav = navRef.current
    nav?.addEventListener('click', handleClick)
    return () => nav?.removeEventListener('click', handleClick)
  }, [])

  return (
    <nav ref={navRef} className="docs-nav text-sm relative z-10 space-y-6">
      {docsNav.map((section) => (
        <div key={section.title}>
          <div className="uppercase tracking-wide text-xs font-semibold text-light-text-secondary dark:text-dark-text-secondary mb-3 px-2">
            {section.title}
          </div>
          <ul className="space-y-0.5">
            {section.items?.map((item) => {
              const active = item.href && pathname.startsWith(item.href)
              return (
                <li key={item.title}>
                  {item.href ? (
                    <Link
                      href={item.href}
                      className={`block rounded-md px-3 py-2.5 transition-all duration-200 border relative z-10 cursor-pointer cursor-target text-sm sm:text-sm ${
                        active
                          ? 'bg-gradient-to-r from-primary-dark-blue/10 to-primary-light-blue/10 dark:from-primary-dark-blue/20 dark:to-primary-light-blue/20 text-primary-dark-blue dark:text-primary-light-blue border-primary-light-blue/40 dark:border-primary-light-blue/30 font-medium shadow-sm'
                          : 'text-light-text-secondary dark:text-dark-text-secondary hover:text-light-text-primary dark:hover:text-dark-text-primary border-transparent hover:border-light-border/50 dark:hover:border-dark-border/50 hover:bg-light-hover/70 dark:hover:bg-dark-hover/70'
                      }`}
                    >
                      {item.title}
                    </Link>
                  ) : (
                    <span className="block px-3 py-2.5 text-light-text-secondary dark:text-dark-text-secondary text-sm">
                      {item.title}
                    </span>
                  )}
                </li>
              )
            })}
          </ul>
        </div>
      ))}
    </nav>
  )
}



