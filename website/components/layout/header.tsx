'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import { Menu, X, Search, Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

const leftNavigation = [
  { name: 'Home', href: '/' },
  { name: 'Explorer', href: '/explorer' },
  { name: 'Visualizations', href: '/visualizations' },
]

const rightNavigation = [
  { name: 'Documentation', href: '/docs' },
  { name: 'Learn', href: '/learn' },
  { name: 'API', href: '/api-access' },
  { name: 'About', href: '/about' },
]

export function Header() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <header className="sticky top-0 z-50 w-full">
      <div className="absolute inset-0 -z-10 h-16 bg-white/10 backdrop-blur-xl dark:bg-black/20" />
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <span className="absolute -top-24 left-1/2 h-48 w-[36rem] -translate-x-1/2 rounded-full bg-gradient-to-r from-primary-dark-blue/30 to-primary-light-blue/30 blur-3xl" />
      </div>

      <nav className="container mx-auto px-4 sm:px-6 lg:px-8" aria-label="Global">
        <div className="relative flex h-16 items-center justify-between">
          <div className="hidden lg:flex lg:flex-1 lg:items-center">
            <div className="glass-panel glass-left flex items-center gap-x-2 px-3 py-2">
              {leftNavigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    'navlink text-sm font-medium',
                    pathname === item.href
                      ? 'text-primary-dark-blue dark:text-primary-light-blue'
                      : 'text-light-text-secondary dark:text-dark-text-secondary'
                  )}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          <div className="absolute left-1/2 -translate-x-1/2">
            <Link href="/" className="inline-flex items-center" aria-label="ExoBengal home">
              <Image src="/logo.png" alt="ExoBengal logo" width={120} height={32} priority />
            </Link>
          </div>

          <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end">
            <div className="glass-panel glass-right flex items-center gap-x-2 px-2 py-2">
              {rightNavigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    'navlink text-sm font-medium',
                    pathname === item.href
                      ? 'text-primary-dark-blue dark:text-primary-light-blue'
                      : 'text-light-text-secondary dark:text-dark-text-secondary'
                  )}
                >
                  {item.name}
                </Link>
              ))}

              <span className="mx-1 h-5 w-px bg-white/20" />

              <button
                type="button"
                className="navlink text-light-text-secondary hover:text-light-text-primary dark:text-dark-text-secondary dark:hover:text-dark-text-primary"
                aria-label="Search"
              >
                <Search className="h-5 w-5" />
              </button>

              <button
                type="button"
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="navlink text-light-text-secondary hover:text-light-text-primary dark:text-dark-text-secondary dark:hover:text-dark-text-primary"
                aria-label="Toggle theme"
              >
                {mounted && theme === 'dark' ? (
                  <Sun className="h-5 w-5" />
                ) : (
                  <Moon className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>

          <div className="flex w-full items-center justify-between lg:hidden">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-light-text-primary dark:text-dark-text-primary"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span className="sr-only">Open main menu</span>
              {mobileMenuOpen ? (
                <X className="h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="h-6 w-6" aria-hidden="true" />
              )}
            </button>

            <Link href="/" className="inline-flex items-center" aria-label="ExoBengal home">
              <Image src="/logo.png" alt="ExoBengal logo" width={110} height={28} />
            </Link>

            <button
              type="button"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="rounded-md p-2.5 text-light-text-secondary hover:text-light-text-primary dark:text-dark-text-secondary dark:hover:text-dark-text-primary"
              aria-label="Toggle theme"
            >
              {mounted && theme === 'dark' ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden"
          >
            <div className="space-y-1 px-4 pb-3 pt-2">
              {[...leftNavigation, ...rightNavigation].map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    'block rounded-md px-3 py-2 text-base font-medium',
                    pathname === item.href
                      ? 'bg-primary-dark-blue text-white'
                      : 'text-light-text-primary hover:bg-light-hover dark:text-dark-text-primary dark:hover:bg-dark-hover'
                  )}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

