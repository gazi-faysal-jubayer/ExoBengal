'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Sparkles, Telescope } from 'lucide-react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Stars } from '@react-three/drei'
import * as THREE from 'three'

function AnimatedPlanet() {
  const meshRef = useRef<THREE.Mesh>(null)

  useEffect(() => {
    const animate = () => {
      if (meshRef.current) {
        meshRef.current.rotation.y += 0.005
      }
      requestAnimationFrame(animate)
    }
    animate()
  }, [])

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[2, 32, 32]} />
      <meshStandardMaterial color="#82b2d7" metalness={0.5} roughness={0.5} />
    </mesh>
  )
}

export function HeroSection() {
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const words = ['Explore', 'Discover', 'Visualize', 'Analyze']

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWordIndex((prev) => (prev + 1) % words.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative min-h-[90vh] overflow-hidden bg-gradient-to-b from-light-background to-light-surface dark:from-dark-background dark:to-dark-surface">
      {/* 3D Background */}
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 8], fov: 75 }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
          <AnimatedPlanet />
          <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
        </Canvas>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
              <span className="block">
                <motion.span
                  key={currentWordIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="text-gradient inline-block"
                >
                  {words[currentWordIndex]}
                </motion.span>{' '}
                the Universe
              </span>
              <span className="block mt-2 text-light-text-primary dark:text-dark-text-primary">
                of Exoplanets
              </span>
            </h1>

            <p className="mt-6 text-lg leading-8 text-light-text-secondary dark:text-dark-text-secondary max-w-2xl mx-auto">
              Dive into NASA&apos;s comprehensive exoplanet archive with our interactive visualization platform. 
              Discover thousands of worlds beyond our solar system through stunning visualizations and AI-powered insights.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/explorer"
                className="group btn-primary px-8 py-3 text-lg font-semibold flex items-center gap-2"
              >
                <Telescope className="h-5 w-5" />
                Start Exploring
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/docs/getting-started"
                className="btn-secondary px-8 py-3 text-lg font-semibold flex items-center gap-2"
              >
                <Sparkles className="h-5 w-5" />
                View Documentation
              </Link>
            </div>
          </motion.div>

          {/* Feature badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-4"
          >
            <div className="card p-4 text-center">
              <p className="text-3xl font-bold text-primary-dark-blue">5,000+</p>
              <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">Confirmed Exoplanets</p>
            </div>
            <div className="card p-4 text-center">
              <p className="text-3xl font-bold text-primary-dark-blue">Real-time</p>
              <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">NASA Data Updates</p>
            </div>
            <div className="card p-4 text-center">
              <p className="text-3xl font-bold text-primary-dark-blue">AI-Powered</p>
              <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">Smart Assistant</p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-primary-light-blue opacity-10 blur-3xl" />
      <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-primary-cyan opacity-10 blur-3xl" />
    </section>
  )
}

