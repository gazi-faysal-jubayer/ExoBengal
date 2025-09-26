'use client'

import { SidebarNav } from '@/components/docs/sidebar-nav'

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-light-background dark:bg-dark-background">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <aside className="md:col-span-1 sticky top-16 h-max hidden md:block z-20">
            <div className="card p-4">
              <SidebarNav />
            </div>
          </aside>
          <main className="md:col-span-3">
            {children}
          </main>
        </div>
      </div>
    </div>
  )
}



