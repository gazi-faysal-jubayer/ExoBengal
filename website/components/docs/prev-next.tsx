'use client'

import Link from 'next/link'

type Nav = { title: string; href: string }

export function PrevNext({ prev, next }: { prev?: Nav; next?: Nav }) {
  return (
    <div className="mt-10 flex items-center justify-between gap-4">
      {prev ? (
        <Link
          href={prev.href}
          className="group flex-1 card p-4 hover:shadow-lg transition-all border-l-4 border-primary-light-blue dark:border-primary-light-blue/60 cursor-target"
        >
          <div className="text-xs text-light-text-secondary dark:text-dark-text-secondary">Previous</div>
          <div className="font-medium text-light-text-primary dark:text-dark-text-primary group-hover:underline">
            {prev.title}
          </div>
        </Link>
      ) : (
        <div className="flex-1" />
      )}
      {next ? (
        <Link
          href={next.href}
          className="group flex-1 text-right card p-4 hover:shadow-lg transition-all border-r-4 border-primary-dark-blue dark:border-primary-light-blue cursor-target"
        >
          <div className="text-xs text-light-text-secondary dark:text-dark-text-secondary">Next</div>
          <div className="font-medium text-light-text-primary dark:text-dark-text-primary group-hover:underline">
            {next.title}
          </div>
        </Link>
      ) : (
        <div className="flex-1" />
      )}
    </div>
  )
}



