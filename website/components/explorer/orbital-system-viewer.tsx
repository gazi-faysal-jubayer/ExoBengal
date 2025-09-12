'use client'

import React, { useMemo, useRef, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Stars, Text } from '@react-three/drei'
import * as THREE from 'three'
import { useExplorerStore } from '@/lib/explorer-store'

interface Planet {
  name: string
  distance: number // AU from star
  radius: number // Relative to Earth
  color: string
  period: number // Orbital period in days
}

function buildSystemFromRows(rows: ReturnType<typeof useExplorerStore.getState>['rows']) {
  // Pick a host with several planets
  const byHost: Record<string, typeof rows> = {}
  for (const r of rows) {
    if (!r.hostname) continue
    if (!byHost[r.hostname]) byHost[r.hostname] = []
    byHost[r.hostname].push(r)
  }
  const hosts = Object.entries(byHost).sort((a, b) => b[1].length - a[1].length)
  const [host, planets] = hosts[0] || ['Unknown System', []]
  return {
    name: host,
    star: { radius: 0.2, color: '#ffcc66' },
    planets: planets.slice(0, 8).map(p => ({
      name: p.pl_name,
      distance: Math.max(0.01, (p.pl_orbsmax || 0.05)),
      radius: Math.max(0.5, (p.pl_rade || 1.0)),
      color: '#82b2d7',
      period: Math.max(1, (p.pl_orbper || 10)),
    })),
  }
}

function Star({ radius, color }: { radius: number; color: string }) {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01
    }
  })

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[radius * 2, 32, 32]} />
      <meshBasicMaterial color={color} />
      <pointLight intensity={2} decay={0.1} />
    </mesh>
  )
}

function Planet({ planet, time }: { planet: Planet; time: number }) {
  const meshRef = useRef<THREE.Mesh>(null)
  const orbitRef = useRef<THREE.Group>(null)

  useFrame(() => {
    if (orbitRef.current) {
      // Calculate orbital position based on time and period
      const angle = (time * 0.001 * 360) / planet.period
      const radian = (angle * Math.PI) / 180
      orbitRef.current.rotation.y = radian
    }

    if (meshRef.current) {
      meshRef.current.rotation.y += 0.05
    }
  })

  return (
    <group ref={orbitRef}>
      {/* Orbit line */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[planet.distance * 10 - 0.05, planet.distance * 10 + 0.05, 64]} />
        <meshBasicMaterial color="#555" transparent opacity={0.3} />
      </mesh>

      {/* Planet */}
      <group position={[planet.distance * 10, 0, 0]}>
        <mesh ref={meshRef}>
          <sphereGeometry args={[planet.radius * 0.3, 16, 16]} />
          <meshStandardMaterial color={planet.color} />
        </mesh>
        
        {/* Planet label */}
        <Text
          position={[0, planet.radius * 0.3 + 0.5, 0]}
          fontSize={0.3}
          color="white"
          anchorX="center"
          anchorY="middle"
        >
          {planet.name.replace('TRAPPIST-1', '')}
        </Text>
      </group>
    </group>
  )
}

function OrbitalSystem() {
  const rows = useExplorerStore(s => s.rows)
  const system = useMemo(() => buildSystemFromRows(rows), [rows])
  const [time, setTime] = React.useState(0)

  useFrame((state) => {
    setTime(state.clock.elapsedTime * 1000)
  })

  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      
      {/* Background stars */}
      <Stars radius={100} depth={50} count={1000} factor={4} saturation={0} fade speed={1} />
      
      {/* Central star */}
      <Star radius={system.star.radius} color={system.star.color} />
      
      {/* Planets */}
      {system.planets.map((planet) => (
        <Planet key={planet.name} planet={planet} time={time} />
      ))}
      
      {/* System name */}
      <Text
        position={[0, 8, 0]}
        fontSize={1}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        {system.name} System
      </Text>
    </>
  )
}

export default function OrbitalSystemViewer() {
  const rows = useExplorerStore(s => s.rows)
  const system = useMemo(() => buildSystemFromRows(rows), [rows])
  return (
    <div className="h-96 bg-black rounded-lg overflow-hidden">
      <Canvas camera={{ position: [0, 15, 20], fov: 75 }}>
        <OrbitalSystem />
        <OrbitControls enableZoom={true} enablePan={true} enableRotate={true} />
      </Canvas>
      
      {/* Controls overlay */}
      <div className="absolute bottom-4 left-4 bg-dark-card/80 backdrop-blur-sm rounded-md p-3 text-white text-xs">
        <p className="font-semibold mb-2">Controls</p>
        <div className="space-y-1">
          <p>• Mouse: Rotate view</p>
          <p>• Scroll: Zoom in/out</p>
          <p>• Right-click + drag: Pan</p>
        </div>
      </div>
      
      {/* System info overlay */}
      <div className="absolute top-4 right-4 bg-dark-card/80 backdrop-blur-sm rounded-md p-3 text-white text-xs max-w-xs">
        <h4 className="font-semibold mb-2">{system.name} System</h4>
        <p className="mb-2">Visualized from local CSV data</p>
        <div className="space-y-1">
          <p>• Distance: 40.7 light-years</p>
          <p>• Star type: M8V</p>
          <p>• Planets: {system.planets.length}</p>
          <p>• Potentially habitable: 3-4 planets</p>
        </div>
      </div>
    </div>
  )
}

