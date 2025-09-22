'use client'

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
      { title: 'Next Steps', href: '/docs/examples' },
    ],
  },
  {
    title: 'Data',
    items: [
      { title: 'Data Reference', href: '/docs/data-reference' },
    ],
  },
  {
    title: 'Models',
    items: [
      { title: 'Models & Artifacts', href: '/docs/models' },
    ],
  },
  {
    title: 'API Reference',
    items: [
      { title: 'DetectExoplanet', href: '/docs/api/detect-exoplanet' },
      { title: 'ExoParams', href: '/docs/api/exo-params' },
      { title: 'Utilities', href: '/docs/api/utils' },
    ],
  },
  {
    title: 'Tutorials',
    items: [
      { title: 'Training', href: '/docs/tutorials/training' },
      { title: 'Prediction', href: '/docs/tutorials/prediction' },
    ],
  },
]

export function SidebarNav() {
  const pathname = usePathname()
  return (
    <nav className="text-sm">
      {docsNav.map((section) => (
        <div key={section.title} className="mb-6">
          <div className="uppercase tracking-wide text-xs text-light-text-secondary dark:text-dark-text-secondary mb-2">
            {section.title}
          </div>
          <ul className="space-y-1">
            {section.items?.map((item) => {
              const active = item.href && pathname.startsWith(item.href)
              return (
                <li key={item.title}>
                  {item.href ? (
                    <Link
                      href={item.href}
                      className={`block rounded px-2 py-1 transition-colors border ${
                        active
                          ? 'bg-light-hover dark:bg-dark-hover text-light-text-primary dark:text-dark-text-primary border-primary-light-blue/60'
                          : 'text-light-text-secondary dark:text-dark-text-secondary hover:text-light-text-primary dark:hover:text-dark-text-primary border-transparent hover:border-light-border dark:hover:border-dark-border'
                      }`}
                    >
                      {item.title}
                    </Link>
                  ) : (
                    <span className="px-2 py-1 text-light-text-secondary dark:text-dark-text-secondary">
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



