'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import { Menu, X, Search, Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'
import { LiquidButton } from '@/components/ui/liquid-glass-button'
import StarWarsToggle from '@/components/ui/star-wars-toggle-switch'


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
  const [windowWidth, setWindowWidth] = useState(0)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
    
    // Set initial window width
    if (typeof window !== 'undefined') {
      setWindowWidth(window.innerWidth)
      
      // Listen for window resize
      const handleResize = () => setWindowWidth(window.innerWidth)
      window.addEventListener('resize', handleResize)
      
      return () => window.removeEventListener('resize', handleResize)
    }
  }, [])

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (mobileMenuOpen && !(event.target as Element).closest('nav')) {
        setMobileMenuOpen(false)
      }
    }

    if (mobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [mobileMenuOpen])

  // Close mobile menu on escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false)
      }
    }

    if (mobileMenuOpen) {
      document.addEventListener('keydown', handleEscape)
      return () => document.removeEventListener('keydown', handleEscape)
    }
  }, [mobileMenuOpen])

  // Determine logo version and size based on window width
  const getLogoConfig = () => {
    if (windowWidth < 1024) {
      // Mobile - use full logo but smaller size
      return {
        src: '/exobengal.png',
        width: 180,
        height: 48
      }
    } else if (windowWidth < 1280) {
      // Medium desktop - use short version to avoid overlap
      return {
        src: '/exobengal-s.png',
        width: 50,
        height: 50
      }
    } else if (windowWidth < 1440) {
      // Large desktop - use medium full logo
      return {
        src: '/exobengal.png',
        width: 200,
        height: 54
      }
    } else {
      // Extra large desktop - use full logo
      return {
        src: '/exobengal.png',
        width: 280,
        height: 76
      }
    }
  }

  const logoConfig = getLogoConfig()

  return (
    <header className="fixed top-0 left-0 right-0 z-[55] w-full bg-light-background/95 dark:bg-dark-background/95 backdrop-blur-xl border-b border-light-border dark:border-dark-border">
      <div className="relative">
        {/* Desktop three-column layout */}
        <div className="hidden lg:flex h-16 w-full">
          {/* Left panel */}
          <div className="flex-shrink-0">
            <div className="glass-panel glass-left h-full flex items-center gap-x-2 pl-8 pr-6">
              {leftNavigation.map((item) => {
                const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      'navlink text-sm font-medium cursor-target',
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

          {/* Center logo area */}
          <div className="flex-1 flex items-center justify-center min-w-0 z-20">
            <Link href="/" className="inline-flex items-center cursor-target" aria-label="ExoBengal home">
              <div className="relative">
                <Image 
                  src={logoConfig.src}
                  alt="ExoBengal logo" 
                  width={logoConfig.width}
                  height={logoConfig.height}
                  priority 
                />
              </div>
            </Link>
          </div>

          {/* Right panel */}
          <div className="flex-shrink-0">
            <div className="glass-panel glass-right h-full flex items-center justify-end gap-x-2 pl-6 pr-8">
              {rightNavigation.map((item) => {
                const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      'navlink text-sm font-medium cursor-target',
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

              <LiquidButton
                size="icon"
                aria-label="Search"
                className="cursor-target"
              >
                <Search className="h-5 w-5" />
              </LiquidButton>

              <StarWarsToggle />
            </div>
          </div>
        </div>

        <nav className="container mx-auto px-4 sm:px-6 lg:px-8" aria-label="Global">
          <div className="relative flex h-16 items-center justify-between">
            <div className="flex w-full items-center justify-between lg:hidden">
              {/* Hamburger Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-light-text-primary dark:text-dark-text-primary hover:text-primary-dark-blue dark:hover:text-primary-light-blue hover:bg-light-hover dark:hover:bg-dark-hover focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-light-blue transition-colors duration-200"
                aria-expanded={mobileMenuOpen}
                aria-label="Toggle main menu"
              >
                <span className="sr-only">Open main menu</span>
                {mobileMenuOpen ? (
                  <X className="h-6 w-6" aria-hidden="true" />
                ) : (
                  <Menu className="h-6 w-6" aria-hidden="true" />
                )}
              </button>

              {/* Logo */}
              <Link href="/" className="inline-flex items-center cursor-target" aria-label="ExoBengal home">
                <Image 
                  src={logoConfig.src}
                  alt="ExoBengal logo" 
                  width={logoConfig.width}
                  height={logoConfig.height}
                />
              </Link>

              {/* Theme Toggle */}
              <StarWarsToggle />
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
            transition={{ duration: 0.2, ease: 'easeInOut' }}
            className="lg:hidden absolute top-full left-0 right-0 z-[60] bg-light-surface/95 dark:bg-dark-surface/95 mobile-menu border-t border-light-border dark:border-dark-border shadow-xl backdrop-blur-xl"
          >
            <div className="px-4 py-3 space-y-1">
              {/* Left Navigation */}
              <div className="space-y-1">
                {leftNavigation.map((item) => {
                  const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={cn(
                        'block rounded-md px-3 py-2 text-base font-medium transition-all duration-200 mobile-menu-item',
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

              {/* Divider */}
              <div className="border-t border-light-border dark:border-dark-border my-2"></div>

              {/* Right Navigation */}
              <div className="space-y-1">
                {rightNavigation.map((item) => {
                  const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={cn(
                        'block rounded-md px-3 py-2 text-base font-medium transition-all duration-200 mobile-menu-item',
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
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

