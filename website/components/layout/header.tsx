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
    <header className="sticky top-0 z-50 w-full">
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

          {/* Center logo area */}
          <div className="flex-1 flex items-center justify-center min-w-0 z-20">
            <Link href="/" className="inline-flex items-center" aria-label="ExoBengal home">
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

              <LiquidButton
                size="icon"
                aria-label="Search"
              >
                <Search className="h-5 w-5" />
              </LiquidButton>

              <LiquidButton
                size="icon"
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                aria-label="Toggle theme"
              >
                {mounted && theme === 'dark' ? (
                  <Sun className="h-5 w-5" />
                ) : (
                  <Moon className="h-5 w-5" />
                )}
              </LiquidButton>
            </div>
          </div>
        </div>

        <nav className="container mx-auto px-4 sm:px-6 lg:px-8" aria-label="Global">
          <div className="relative flex h-16 items-center justify-between">
            <div className="flex w-full items-center justify-between lg:hidden">
            <LiquidButton
              size="icon"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span className="sr-only">Open main menu</span>
              {mobileMenuOpen ? (
                <X className="h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="h-6 w-6" aria-hidden="true" />
              )}
            </LiquidButton>

            <Link href="/" className="inline-flex items-center" aria-label="ExoBengal home">
              <Image 
                src={logoConfig.src}
                alt="ExoBengal logo" 
                width={logoConfig.width}
                height={logoConfig.height}
              />
            </Link>

            <LiquidButton
              size="icon"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              aria-label="Toggle theme"
            >
              {mounted && theme === 'dark' ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </LiquidButton>
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

