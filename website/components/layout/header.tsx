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
  { name: 'News', href: '/news' },
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
      <div className="relative">
        {/* Left glass panel - extends to screen edge */}
        <div className="hidden lg:block absolute left-0 top-0 h-16 z-10">
          <div className="glass-panel glass-left h-full flex items-center gap-x-2 pl-8 pr-6">
            {leftNavigation.map((item) => {
              const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    'navlink text-sm font-medium',
                    isActive
                      ? 'active'
                      : 'text-light-text-secondary dark:text-dark-text-secondary hover:text-primary-dark-blue dark:hover:text-primary-light-blue'
                  )}
                >
                  {item.name}
                </Link>
              );
            })}
          </div>
        </div>

        {/* Right glass panel - extends to screen edge */}
        <div className="hidden lg:block absolute right-0 top-0 h-16 z-10">
          <div className="glass-panel glass-right h-full flex items-center justify-end gap-x-2 pl-6 pr-8">
            {rightNavigation.map((item) => {
              const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    'navlink text-sm font-medium',
                    isActive
                      ? 'active'
                      : 'text-light-text-secondary dark:text-dark-text-secondary hover:text-primary-dark-blue dark:hover:text-primary-light-blue'
                  )}
                >
                  {item.name}
                </Link>
              );
            })}

            <div className="nav-separator mx-2" />

            <button
              type="button"
              className="nav-button text-light-text-secondary hover:text-primary-dark-blue dark:text-dark-text-secondary dark:hover:text-primary-light-blue"
              aria-label="Search"
            >
              <Search className="h-5 w-5" />
            </button>

            <button
              type="button"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="nav-button text-light-text-secondary hover:text-primary-dark-blue dark:text-dark-text-secondary dark:hover:text-primary-light-blue"
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

        {/* Center logo with stroke - Desktop only */}
        <div className="hidden lg:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
          <Link href="/" className="inline-flex items-center" aria-label="ExoBengal home">
            <div className="relative">
              <Image 
                src="/full logo.png" 
                alt="ExoBengal logo" 
                width={280} 
                height={76} 
                priority 
                className="logo-glass-stroke"
              />
            </div>
          </Link>
        </div>

        <nav className="container mx-auto px-4 sm:px-6 lg:px-8" aria-label="Global">
          <div className="relative flex h-16 items-center justify-between">
            <div className="flex w-full items-center justify-between lg:hidden">
            <button
              type="button"
              className="nav-button -m-2.5 inline-flex items-center justify-center text-light-text-primary dark:text-dark-text-primary"
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
              <Image 
                src="/full logo.png" 
                alt="ExoBengal logo" 
                width={150} 
                height={38} 
                className="logo-glass-stroke-mobile"
              />
            </Link>

            <button
              type="button"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="nav-button text-light-text-secondary hover:text-primary-dark-blue dark:text-dark-text-secondary dark:hover:text-primary-light-blue"
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
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden"
          >
            <div className="space-y-1 px-4 pb-3 pt-2">
              {[...leftNavigation, ...rightNavigation].map((item) => {
                const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      'block rounded-md px-3 py-2 text-base font-medium transition-all duration-200',
                      isActive
                        ? 'bg-gradient-to-r from-primary-dark-blue to-primary-light-blue text-white shadow-lg'
                        : 'text-light-text-primary hover:bg-primary-dark-blue/10 hover:text-primary-dark-blue dark:text-dark-text-primary dark:hover:bg-primary-light-blue/10 dark:hover:text-primary-light-blue'
                    )}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

