'use client'

import React, { useRef, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Stars, Text } from '@react-three/drei'
import * as THREE from 'three'

interface Planet {
  name: string
  distance: number // AU from star
  radius: number // Relative to Earth
  color: string
  period: number // Orbital period in days
}

// Sample planetary system data
const sampleSystem = {
  name: 'TRAPPIST-1',
  star: {
    radius: 0.12, // Solar radii
    color: '#ff6b6b',
  },
  planets: [
    { name: 'TRAPPIST-1b', distance: 0.0115, radius: 1.09, color: '#8B4513', period: 1.51 },
    { name: 'TRAPPIST-1c', distance: 0.0158, radius: 1.06, color: '#CD853F', period: 2.42 },
    { name: 'TRAPPIST-1d', distance: 0.0223, radius: 0.78, color: '#4169E1', period: 4.05 },
    { name: 'TRAPPIST-1e', distance: 0.0293, radius: 0.92, color: '#228B22', period: 6.10 },
    { name: 'TRAPPIST-1f', distance: 0.0385, radius: 1.04, color: '#FF4500', period: 9.21 },
    { name: 'TRAPPIST-1g', distance: 0.0468, radius: 1.13, color: '#9932CC', period: 12.35 },
    { name: 'TRAPPIST-1h', distance: 0.0619, radius: 0.77, color: '#DC143C', period: 18.77 },
  ],
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
      <Star radius={sampleSystem.star.radius} color={sampleSystem.star.color} />
      
      {/* Planets */}
      {sampleSystem.planets.map((planet) => (
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
        {sampleSystem.name} System
      </Text>
    </>
  )
}

export default function OrbitalSystemViewer() {
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
        <h4 className="font-semibold mb-2">{sampleSystem.name} System</h4>
        <p className="mb-2">Ultra-cool dwarf star with 7 Earth-sized planets</p>
        <div className="space-y-1">
          <p>• Distance: 40.7 light-years</p>
          <p>• Star type: M8V</p>
          <p>• Planets: {sampleSystem.planets.length}</p>
          <p>• Potentially habitable: 3-4 planets</p>
        </div>
      </div>
    </div>
  )
}

