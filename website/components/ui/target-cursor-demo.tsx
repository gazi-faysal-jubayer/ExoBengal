'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Star, Rocket, Search, Settings, Heart, Code } from 'lucide-react'
import { LiquidButton } from '@/components/ui/liquid-glass-button'
import TargetCursor from '@/components/ui/target-cursor'

export function TargetCursorDemo() {
  const [cursorConfig, setCursorConfig] = useState({
    spinDuration: 2,
    hideDefaultCursor: true,
  })

  const demoButtons = [
    { icon: Star, label: 'Explore Stars', color: 'bg-yellow-500' },
    { icon: Rocket, label: 'Launch Mission', color: 'bg-red-500' },
    { icon: Search, label: 'Discover', color: 'bg-blue-500' },
    { icon: Settings, label: 'Configure', color: 'bg-gray-500' },
    { icon: Heart, label: 'Favorites', color: 'bg-pink-500' },
    { icon: Code, label: 'API Access', color: 'bg-green-500' },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 p-8">
      {/* Include the TargetCursor component */}
      <TargetCursor 
        targetSelector=".cursor-target"
        spinDuration={cursorConfig.spinDuration}
        hideDefaultCursor={cursorConfig.hideDefaultCursor}
      />
      
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-white mb-4">
            TargetCursor Demo
          </h1>
          <p className="text-lg text-blue-200">
            Interactive cursor that targets elements with the{' '}
            <code className="bg-blue-800 px-2 py-1 rounded text-blue-100">
              cursor-target
            </code>{' '}
            class
          </p>
        </motion.div>

        {/* Configuration Panel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white/10 backdrop-blur-lg rounded-lg p-6 mb-8 border border-white/20"
        >
          <h2 className="text-xl font-semibold text-white mb-4">Configuration</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-blue-200 mb-2">
                Spin Duration: {cursorConfig.spinDuration}s
              </label>
              <input
                type="range"
                min="0.5"
                max="5"
                step="0.1"
                value={cursorConfig.spinDuration}
                onChange={(e) => setCursorConfig(prev => ({ 
                  ...prev, 
                  spinDuration: parseFloat(e.target.value) 
                }))}
                className="w-full cursor-target"
              />
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="hideDefaultCursor"
                checked={cursorConfig.hideDefaultCursor}
                onChange={(e) => setCursorConfig(prev => ({ 
                  ...prev, 
                  hideDefaultCursor: e.target.checked 
                }))}
                className="mr-2 cursor-target"
              />
              <label htmlFor="hideDefaultCursor" className="text-blue-200 cursor-target">
                Hide Default Cursor
              </label>
            </div>
          </div>
        </motion.div>

        {/* Demo Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Buttons Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h2 className="text-2xl font-semibold text-white mb-6">Interactive Buttons</h2>
            <div className="grid grid-cols-2 gap-4">
              {demoButtons.map((button, index) => (
                <motion.div
                  key={button.label}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <LiquidButton
                    className={`cursor-target w-full h-20 ${button.color} text-white hover:opacity-90 transition-opacity`}
                    size="lg"
                  >
                    <div className="flex flex-col items-center gap-2">
                      <button.icon className="h-6 w-6" />
                      <span className="text-sm font-medium">{button.label}</span>
                    </div>
                  </LiquidButton>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Cards Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
          >
            <h2 className="text-2xl font-semibold text-white mb-6">Hover Cards</h2>
            <div className="space-y-4">
              {[1, 2, 3].map((num) => (
                <div
                  key={num}
                  className="cursor-target bg-white/10 backdrop-blur-lg rounded-lg p-6 border border-white/20 hover:bg-white/20 transition-all duration-300"
                >
                  <h3 className="text-lg font-semibold text-white mb-2">
                    Exoplanet Card {num}
                  </h3>
                  <p className="text-blue-200">
                    This is a demo card that responds to the target cursor. 
                    The cursor will create corner brackets around this element when you hover over it.
                  </p>
                  <div className="mt-4 flex gap-2">
                    <span className="cursor-target px-3 py-1 bg-blue-600 text-white rounded-full text-sm">
                      Habitable
                    </span>
                    <span className="cursor-target px-3 py-1 bg-green-600 text-white rounded-full text-sm">
                      Earth-like
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Text Elements */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-8 bg-white/10 backdrop-blur-lg rounded-lg p-6 border border-white/20"
        >
          <h2 className="text-2xl font-semibold text-white mb-4">Text Links</h2>
          <div className="space-y-4">
            <p className="text-blue-200">
              Try hovering over these{' '}
              <a href="#" className="cursor-target text-blue-400 hover:text-blue-300 underline">
                interactive links
              </a>{' '}
              to see the cursor in action. You can also hover over{' '}
              <span className="cursor-target bg-purple-600 px-2 py-1 rounded text-white">
                highlighted text
              </span>{' '}
              and other{' '}
              <button className="cursor-target text-yellow-400 hover:text-yellow-300 font-semibold">
                clickable elements
              </button>
              .
            </p>
          </div>
        </motion.div>

        {/* Instructions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
          className="mt-8 bg-gradient-to-r from-purple-600/20 to-blue-600/20 backdrop-blur-lg rounded-lg p-6 border border-purple-400/30"
        >
          <h2 className="text-xl font-semibold text-white mb-3">How it works</h2>
          <ul className="text-blue-200 space-y-2">
            <li>• The cursor automatically targets elements with the <code className="bg-blue-800 px-1 rounded">cursor-target</code> class</li>
            <li>• Corner brackets appear around targeted elements</li>
            <li>• The cursor follows mouse movement with smooth animations</li>
            <li>• When not targeting, the cursor spins continuously</li>
            <li>• Fully customizable spin duration and visibility settings</li>
          </ul>
        </motion.div>
      </div>
    </div>
  )
}

export default TargetCursorDemo
