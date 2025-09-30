'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Copy, Check, Terminal, Download, Code } from 'lucide-react'
import { cn } from '@/lib/utils'

interface PipInstallSectionProps {
  className?: string
}

export function PipInstallSection({ className }: PipInstallSectionProps) {
  const [copied, setCopied] = useState(false)

  const command = 'pip install exobengal'

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(command)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy command:', err)
    }
  }

  return (
    <section className={cn("py-20 bg-light-surface dark:bg-dark-surface", className)}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-light-text-primary dark:text-dark-text-primary mb-4">
              Get Started with ExoBengal
            </h2>
            <p className="text-lg text-light-text-secondary dark:text-dark-text-secondary max-w-2xl mx-auto">
              Install ExoBengal in seconds and start exploring the universe of exoplanets with our powerful Python package.
            </p>
          </motion.div>

          {/* Terminal Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="mb-8"
          >
            <div className="terminal-wrapper">
              <div className="card">
                <div className="wrap">
                  <div className="terminal">
                    <hgroup className="head">
                      <p className="title">
                        <Terminal className="w-4 h-4" />
                        Terminal
                      </p>
                      <button
                        className="copy_toggle"
                        onClick={handleCopy}
                        title="Copy command"
                      >
                        {copied ? (
                          <Check className="w-4 h-4" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </button>
                    </hgroup>
                    <div className="body">
                      <pre className="pre">
                        <code>$ </code>
                        <code className="cmd" data-cmd={command}></code>
                      </pre>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>


          {/* Features */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            <div className="text-center">
              <div className="w-12 h-12 bg-primary-dark-blue/10 dark:bg-primary-dark-blue/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Download className="w-6 h-6 text-primary-dark-blue" />
              </div>
              <h3 className="font-semibold text-light-text-primary dark:text-dark-text-primary mb-1">
                Easy Installation
              </h3>
              <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
                One command to install everything you need
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-primary-dark-blue/10 dark:bg-primary-dark-blue/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Code className="w-6 h-6 text-primary-dark-blue" />
              </div>
              <h3 className="font-semibold text-light-text-primary dark:text-dark-text-primary mb-1">
                Developer Friendly
              </h3>
              <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
                Full development tools and documentation
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-primary-dark-blue/10 dark:bg-primary-dark-blue/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Terminal className="w-6 h-6 text-primary-dark-blue" />
              </div>
              <h3 className="font-semibold text-light-text-primary dark:text-dark-text-primary mb-1">
                CLI Tools
              </h3>
              <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
                Command-line interface for data exploration
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-primary-dark-blue/10 dark:bg-primary-dark-blue/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6 text-primary-dark-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="font-semibold text-light-text-primary dark:text-dark-text-primary mb-1">
                Fast & Efficient
              </h3>
              <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
                Optimized for performance and speed
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      <style jsx>{`
        .card {
          padding: 1rem;
          overflow: hidden;
          border: 1px solid #c5c5c5;
          border-radius: 12px;
          background-color: #d9d9d92f;
          backdrop-filter: blur(8px);
          min-width: 344px;
        }
        .wrap {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          position: relative;
          z-index: 10;
          border: 0.5px solid #525252;
          border-radius: 8px;
          overflow: hidden;
        }
        .terminal {
          display: flex;
          flex-direction: column;
          font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas,
            "Liberation Mono", "Courier New", monospace;
        }
        .head {
          display: flex;
          align-items: center;
          justify-content: space-between;
          overflow: hidden;
          min-height: 40px;
          padding-inline: 12px;
          border-top-left-radius: 8px;
          border-top-right-radius: 8px;
          background-color: #202425;
        }
        .title {
          display: flex;
          align-items: center;
          gap: 8px;
          height: 2.5rem;
          user-select: none;
          font-weight: 600;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          color: #8e8e8e;
        }
        .copy_toggle {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0.25rem;
          border: 0.65px solid #c1c2c5;
          margin-left: auto;
          border-radius: 6px;
          background-color: #202425;
          color: #8e8e8e;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .copy_toggle:hover {
          background-color: #2a2d2e;
          color: #fff;
        }
        .body {
          display: flex;
          flex-direction: column;
          position: relative;
          border-bottom-right-radius: 8px;
          border-bottom-left-radius: 8px;
          overflow-x: auto;
          padding: 1rem;
          line-height: 19px;
          color: white;
          background-color: black;
          white-space: nowrap;
        }
        .pre {
          display: flex;
          flex-direction: row;
          align-items: center;
          text-wrap: nowrap;
          white-space: pre;
          background-color: transparent;
          overflow: hidden;
          box-sizing: border-box;
          font-size: 16px;
        }
        .pre code:nth-child(1) {
          color: #575757;
        }
        .cmd {
          height: 19px;
          position: relative;
          display: flex;
          align-items: center;
          flex-direction: row;
          color: #e34ba9;
        }
        .cmd::before {
          content: attr(data-cmd);
          position: relative;
          display: block;
          white-space: nowrap;
          overflow: hidden;
          background-color: transparent;
          animation: inputs 8s steps(22) infinite;
        }
        .cmd::after {
          content: "";
          position: relative;
          display: block;
          height: 100%;
          overflow: hidden;
          background-color: transparent;
          border-right: 0.15em solid #e34ba9;
          animation: cursor 0.5s step-end infinite alternate, blinking 0.5s infinite;
        }

        @keyframes blinking {
          20%,
          80% {
            transform: scaleY(1);
          }
          50% {
            transform: scaleY(0);
          }
        }
        @keyframes cursor {
          50% {
            border-right-color: transparent;
          }
        }
        @keyframes inputs {
          0%,
          100% {
            width: 0;
          }
          10%,
          90% {
            width: 58px;
          }
          30%,
          70% {
            width: 215px;
            max-width: max-content;
          }
        }
      `}</style>
    </section>
  )
}
