'use client'

import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { usePathname } from 'next/navigation'
import { SidebarNav } from '@/components/docs/sidebar-nav'
import { cn } from '@/lib/utils'

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    setMobileMenuOpen(false)
  }, [pathname])

  return (
    <div className="min-h-screen bg-light-background dark:bg-dark-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Mobile Menu Button */}
        <div className="md:hidden mb-4 flex items-center justify-between">
          <h1 className="text-xl font-bold text-light-text-primary dark:text-dark-text-primary">
            Documentation
          </h1>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="inline-flex items-center justify-center p-2 rounded-md text-light-text-primary dark:text-dark-text-primary hover:text-primary-dark-blue dark:hover:text-primary-light-blue hover:bg-light-hover dark:hover:bg-dark-hover focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-light-blue transition-colors duration-200"
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle documentation menu"
          >
            <span className="sr-only">Open documentation menu</span>
            {mobileMenuOpen ? (
              <X className="h-6 w-6" aria-hidden="true" />
            ) : (
              <Menu className="h-6 w-6" aria-hidden="true" />
            )}
          </button>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          <aside className="hidden md:block md:w-64 lg:w-72 flex-shrink-0 fixed left-0 top-24 max-h-[calc(100vh-6rem)] overflow-y-auto scrollbar-thin scrollbar-thumb-light-border dark:scrollbar-thumb-dark-border scrollbar-track-transparent z-30">
            <div className="card p-4">
              <SidebarNav />
            </div>
          </aside>
          <main className="flex-1 min-w-0 md:ml-72 lg:ml-80 max-w-none">
            <div className="max-w-5xl">
              {children}
            </div>
          </main>
        </div>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
                onClick={() => setMobileMenuOpen(false)}
                aria-hidden="true"
              />
              
              {/* Drawer */}
              <motion.div
                initial={{ x: '-100%' }}
                animate={{ x: 0 }}
                exit={{ x: '-100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className="fixed top-0 left-0 bottom-0 w-80 max-w-[85vw] bg-light-surface/95 dark:bg-dark-surface/95 backdrop-blur-xl border-r border-light-border dark:border-dark-border shadow-2xl z-50 md:hidden overflow-y-auto"
              >
                <div className="p-6">
                  {/* Drawer Header */}
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg font-bold text-light-text-primary dark:text-dark-text-primary">
                      Documentation
                    </h2>
                    <button
                      onClick={() => setMobileMenuOpen(false)}
                      className="p-2 rounded-md text-light-text-secondary dark:text-dark-text-secondary hover:text-light-text-primary dark:hover:text-dark-text-primary hover:bg-light-hover dark:hover:bg-dark-hover transition-colors"
                      aria-label="Close menu"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                  
                  {/* Navigation */}
                  <div className="card p-4">
                    <SidebarNav />
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}



