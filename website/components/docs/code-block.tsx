'use client'

import { useEffect, useRef, useState } from 'react'
import { Copy, Check } from 'lucide-react'

// PrismJS is loaded dynamically to keep the initial bundle smaller
let Prism: any

type SupportedLanguage =
  | 'python'
  | 'bash'
  | 'json'
  | 'ts'
  | 'tsx'
  | 'js'

interface CodeBlockProps {
  code: string
  language?: SupportedLanguage
  title?: string
}

export function CodeBlock({ code, language = 'python', title }: CodeBlockProps) {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const codeRef = useRef<HTMLElement | null>(null)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    let isMounted = true
    ;(async () => {
      if (!Prism) {
        const mod = await import('prismjs')
        Prism = mod.default ?? mod
        // Load languages in dependency order to avoid runtime errors
        await import('prismjs/components/prism-markup')
        await import('prismjs/components/prism-clike')
        await import('prismjs/components/prism-javascript')
        await import('prismjs/components/prism-typescript')
        await import('prismjs/components/prism-jsx')
        await import('prismjs/components/prism-tsx')
        await import('prismjs/components/prism-python')
        await import('prismjs/components/prism-bash')
        await import('prismjs/components/prism-json')
        await import('prismjs/plugins/line-numbers/prism-line-numbers')
      }

      if (isMounted && Prism && containerRef.current) {
        Prism.highlightAllUnder(containerRef.current)
      }
    })()
    return () => {
      isMounted = false
    }
  }, [code, language])

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch (err) {
      // no-op
    }
  }

  return (
    <div ref={containerRef} className="relative group">
      {title && (
        <div className="rounded-t-lg border border-b-0 border-light-border dark:border-dark-border bg-light-surface/60 dark:bg-dark-surface/60 px-3 py-2 text-xs text-light-text-secondary dark:text-dark-text-secondary">
          {title}
        </div>
      )}
      <pre className={`line-numbers rounded-lg ${title ? 'rounded-t-none' : ''}`}>
        <code ref={codeRef} className={`language-${language}`}>{code}</code>
      </pre>
      <button
        type="button"
        aria-label="Copy code"
        onClick={handleCopy}
        className="absolute top-2 right-2 inline-flex items-center gap-1 rounded-md bg-black/40 text-white px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity"
      >
        {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
        <span className="text-xs">{copied ? 'Copied' : 'Copy'}</span>
      </button>
    </div>
  )
}


