'use client'

import React, { useMemo, useRef, useState, useCallback } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls, Stars, Text, Html, GradientTexture, Environment } from '@react-three/drei'
import * as THREE from 'three'
import { useExplorerStore } from '@/lib/explorer-store'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Play, 
  Pause, 
  Camera, 
  Download, 
  Maximize2, 
  Minimize2,
  RotateCw,
  Info,
  Settings,
  ZoomIn,
  ZoomOut,
  Grid3X3,
  Eye,
  Timer
} from 'lucide-react'

interface Planet {
  name: string
  a: number // semi-major axis in AU
  e: number // eccentricity
  inc: number // inclination in radians
  omega: number // argument of periastron (rad)
  Omega: number // longitude of ascending node (rad)
  epoch: number // time of periastron (days) if known
  radius: number // relative visual radius (Earth radii)
  color: string
  period: number // Orbital period in days
}

function buildSystemFromRows(
  rows: ReturnType<typeof useExplorerStore.getState>['rows'],
  hostName?: string,
) {
  // Pick a host with several planets
  const byHost: Record<string, typeof rows> = {}
  for (const r of rows) {
    if (!r.hostname) continue
    if (!byHost[r.hostname]) byHost[r.hostname] = []
    byHost[r.hostname].push(r)
  }
  let host = hostName
  let planets: typeof rows = []
  if (host && byHost[host]) {
    planets = byHost[host]
  } else {
    const hosts = Object.entries(byHost).sort((a, b) => b[1].length - a[1].length)
    const picked = hosts[0] || ['Unknown System', []]
    host = picked[0]
    planets = picked[1]
  }
  // Star appearance by temperature
  const teff = Math.max(3000, Math.min(10000, Number(planets[0]?.st_teff || 5778)))
  const lerp = (a: number, b: number, t: number) => a + (b - a) * t
  const lerpColor = (c1: string, c2: string, t: number) => {
    const h = (c: string) => [parseInt(c.slice(1,3),16), parseInt(c.slice(3,5),16), parseInt(c.slice(5,7),16)]
    const [r1,g1,b1] = h(c1); const [r2,g2,b2] = h(c2)
    const r = Math.round(lerp(r1,r2,t)), g = Math.round(lerp(g1,g2,t)), b = Math.round(lerp(b1,b2,t))
    return `#${r.toString(16).padStart(2,'0')}${g.toString(16).padStart(2,'0')}${b.toString(16).padStart(2,'0')}`
  }
  const starColor = teff < 5800
    ? lerpColor('#ffb36b', '#fff1b2', (teff - 3000) / (5800 - 3000))
    : lerpColor('#fff1b2', '#a9c8ff', (teff - 5800) / (10000 - 5800))

  const starRadiusRsun = Math.max(0.2, Number(planets[0]?.st_rad || 1))

  return {
    name: host || 'Unknown System',
    star: { radius: starRadiusRsun, color: starColor },
    planets: planets.slice(0, 8).map(p => ({
      name: p.pl_name,
      a: Math.max(0.01, Number(p.pl_orbsmax || 0.05)),
      e: Math.max(0, Math.min(0.95, Number(p.pl_orbeccen || 0))),
      inc: Math.max(0, Math.min(Math.PI, Number(p.pl_orbincl || 0) * Math.PI / 180)),
      omega: Math.max(0, Number((p as any).pl_orblper || 0)) * Math.PI / 180,
      Omega: Math.max(0, Number((p as any).pl_orblong || (p as any).pl_orbomega || 0)) * Math.PI / 180,
      epoch: Number((p as any).pl_orbtper || 0),
      radius: Math.max(0.5, Number(p.pl_rade || 1.0)),
      color: '#82b2d7',
      period: Math.max(1, Number(p.pl_orbper || 10)),
    })),
  }
}

// Scale constants
const AU_TO_UNITS = 8 // scene units per 1 AU
const STAR_SCALE = AU_TO_UNITS * 0.00465047 // Rsun to AU -> to units

function Star({ radius, color }: { radius: number; color: string }) {
  const meshRef = useRef<THREE.Mesh>(null)
  const glowRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.002
    }
    if (glowRef.current) {
      glowRef.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime) * 0.05)
    }
  })

  const starRadius = Math.max(0.4, radius * STAR_SCALE)

  return (
    <group>
      {/* Star glow */}
      <mesh ref={glowRef}>
        <sphereGeometry args={[starRadius * 2.5, 32, 32]} />
        <meshBasicMaterial color={color} transparent opacity={0.3} />
      </mesh>
      
      {/* Star surface */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[starRadius, 64, 64]} />
        <meshStandardMaterial 
          color={color} 
          emissive={color}
          emissiveIntensity={0.5}
          roughness={0.8}
          metalness={0.2}
        />
      </mesh>
      
      {/* Star corona */}
      <mesh>
        <sphereGeometry args={[starRadius * 1.5, 32, 32]} />
        <meshBasicMaterial color={color} transparent opacity={0.1} wireframe />
      </mesh>
      
      <pointLight intensity={3} decay={0.1} color={color} />
      <pointLight position={[0, 0, 0]} intensity={1} distance={50} color={color} />
    </group>
  )
}

function Planet({ planet, time, speed, showLabels, showOrbits }: { 
  planet: Planet; 
  time: number; 
  speed: number;
  showLabels: boolean;
  showOrbits: boolean;
}) {
  const meshRef = useRef<THREE.Mesh>(null)
  const orbitRef = useRef<THREE.Group>(null)
  const labelRef = useRef<THREE.Group>(null)
  const [hovered, setHovered] = useState(false)
  
  // Determine planet color based on size/type
  const getPlanetColor = () => {
    if (planet.radius < 1.5) return '#8B7355' // Rocky/terrestrial
    if (planet.radius < 4) return '#4A90E2' // Sub-Neptune
    if (planet.radius < 11) return '#F39C12' // Neptune-like
    return '#E67E22' // Jupiter-like
  }
  
  const planetColor = getPlanetColor()

  // Precompute orbit curve (projected with inclination)
  const orbitGeometry = useMemo(() => {
    const points: THREE.Vector3[] = []
    const a = planet.a * AU_TO_UNITS
    const b = planet.a * Math.sqrt(1 - planet.e * planet.e) * AU_TO_UNITS
    const cosI = Math.cos(planet.inc)
    const sinI = Math.sin(planet.inc)
    const cosO = Math.cos(planet.Omega)
    const sinO = Math.sin(planet.Omega)
    const cosw = Math.cos(planet.omega)
    const sinw = Math.sin(planet.omega)
    for (let i = 0; i <= 256; i++) {
      const E = (i / 256) * Math.PI * 2
      const x = a * (Math.cos(E) - planet.e)
      const y = b * Math.sin(E)
      // Rotate by omega in orbital plane (argument of periapsis)
      const xo = x * cosw - y * sinw
      const yo = x * sinw + y * cosw
      // Rotate to inertial frame using Omega and inclination
      const X = xo * cosO - yo * sinO * cosI
      const Y = xo * sinO + yo * cosO * cosI
      const Z = yo * sinI
      points.push(new THREE.Vector3(X, Z, Y)) // y-up scene
    }
    const geo = new THREE.BufferGeometry().setFromPoints(points)
    return geo
  }, [planet.a, planet.e, planet.inc])

  // Calculate current position and velocity
  const [position, setPosition] = useState<[number, number, number]>([0, 0, 0])
  const [velocity, setVelocity] = useState(0)
  
  useFrame(() => {
    if (!meshRef.current) return
    // Keplerian propagation
    const tDays = time * Math.max(0, speed) // time (seconds) * days-per-second
    const n = (2 * Math.PI) / planet.period
    // If epoch (time of periastron) provided, phase the orbit accordingly
    const M = n * (tDays - (planet.epoch || 0))
    // Solve Kepler: M = E - e sin E
    let E = M % (2 * Math.PI)
    for (let i = 0; i < 6; i++) {
      E = E - (E - planet.e * Math.sin(E) - M) / (1 - planet.e * Math.cos(E))
    }
    const a = planet.a * AU_TO_UNITS
    const b = planet.a * Math.sqrt(1 - planet.e * planet.e) * AU_TO_UNITS
    const cosI = Math.cos(planet.inc)
    const sinI = Math.sin(planet.inc)
    const cosO = Math.cos(planet.Omega)
    const sinO = Math.sin(planet.Omega)
    const cosw = Math.cos(planet.omega)
    const sinw = Math.sin(planet.omega)
    const x = a * (Math.cos(E) - planet.e)
    const y = b * Math.sin(E)
    const xo = x * cosw - y * sinw
    const yo = x * sinw + y * cosw
    const X = xo * cosO - yo * sinO * cosI
    const Y = xo * sinO + yo * cosO * cosI
    const Z = yo * sinI
    meshRef.current.position.set(X, Z, Y)
    meshRef.current.rotation.y += 0.01
    setPosition([X, Z, Y])
    
    // Calculate velocity (km/s)
    const r = Math.sqrt(X*X + Y*Y + Z*Z) / AU_TO_UNITS // back to AU
    const v = 29.78 * Math.sqrt((2/r) - (1/planet.a)) // vis-viva equation
    setVelocity(v)
    
    // Keep label facing camera
    if (labelRef.current) {
      labelRef.current.lookAt(0, 0, 50)
    }
  })

  const planetRadius = Math.max(0.1, planet.radius * 0.08)
  
  return (
    <group ref={orbitRef}>
      {/* Orbit ellipse (projected with inclination) */}
      {showOrbits && (
        <line>
          <primitive object={orbitGeometry} attach="geometry" />
          <lineBasicMaterial 
            color={hovered ? "#ffffff" : "#555555"} 
            transparent 
            opacity={hovered ? 0.8 : 0.3} 
            linewidth={hovered ? 2 : 1}
          />
        </line>
      )}

      {/* Planet */}
      <mesh 
        ref={meshRef}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <sphereGeometry args={[planetRadius, 32, 32]} />
        <meshStandardMaterial 
          color={planetColor}
          emissive={planetColor}
          emissiveIntensity={hovered ? 0.2 : 0.05}
          roughness={0.7}
          metalness={0.3}
        />
      </mesh>
      
      {/* Planet atmosphere (for larger planets) */}
      {planet.radius > 2 && (
        <mesh>
          <sphereGeometry args={[planetRadius * 1.05, 32, 32]} />
          <meshBasicMaterial 
            color={planetColor} 
            transparent 
            opacity={0.1} 
            side={THREE.BackSide}
          />
        </mesh>
      )}

      {/* Planet label and info */}
      {(showLabels || hovered) && (
        <group ref={labelRef} position={position}>
          <Html
            center
            distanceFactor={8}
            style={{
              pointerEvents: 'none',
              userSelect: 'none',
            }}
          >
            <div className={`
              bg-dark-card/90 backdrop-blur-sm rounded-lg px-3 py-2 
              text-white text-xs whitespace-nowrap
              transition-all duration-300 transform
              ${hovered ? 'scale-110' : 'scale-100'}
            `}>
              <div className="font-semibold mb-1">{planet.name}</div>
              {hovered && (
                <div className="space-y-0.5 text-gray-300">
                  <div>Period: {planet.period.toFixed(1)} days</div>
                  <div>Radius: {planet.radius.toFixed(2)} R⊕</div>
                  <div>Velocity: {velocity.toFixed(1)} km/s</div>
                  <div>Distance: {(Math.sqrt(position[0]**2 + position[1]**2 + position[2]**2) / AU_TO_UNITS).toFixed(3)} AU</div>
                </div>
              )}
            </div>
          </Html>
        </group>
      )}
    </group>
  )
}

function OrbitalSystem({ 
  system, 
  speed, 
  showLabels, 
  showOrbits,
  showGrid 
}: { 
  system: ReturnType<typeof buildSystemFromRows>; 
  speed: number;
  showLabels: boolean;
  showOrbits: boolean;
  showGrid: boolean;
}) {
  const [time, setTime] = React.useState(0)

  useFrame((state) => {
    setTime(state.clock.elapsedTime) // seconds
  })

  return (
    <>
      <ambientLight intensity={0.2} />
      <pointLight position={[10, 10, 10]} intensity={0.5} />
      
      {/* Background stars */}
      <Stars radius={200} depth={100} count={5000} factor={4} saturation={0} fade speed={0.5} />
      
      {/* Grid helper */}
      {showGrid && (
        <gridHelper 
          args={[50, 50, 0x444444, 0x222222]} 
          rotation={[Math.PI / 2, 0, 0]} 
        />
      )}
      
      {/* Central star */}
      <Star radius={system.star.radius} color={system.star.color} />
      
      {/* Planets */}
      {system.planets.map((planet) => (
        <Planet 
          key={planet.name} 
          planet={planet} 
          time={time} 
          speed={speed} 
          showLabels={showLabels}
          showOrbits={showOrbits}
        />
      ))}
      
      {/* System name */}
      <Text
        position={[0, 12, 0]}
        fontSize={1.5}
        color="white"
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.05}
        outlineColor="#000000"
      >
        {system.name} System
      </Text>
    </>
  )
}

export default function OrbitalSystemViewer({ hostName }: { hostName?: string }) {
  const rows = useExplorerStore(s => s.rows)
  const system = useMemo(() => buildSystemFromRows(rows, hostName), [rows, hostName])
  const [speed, setSpeed] = React.useState<number>(0.1)
  return (
    <div className="relative h-96 bg-black rounded-lg overflow-hidden">
      <Canvas camera={{ position: [0, 15, 20], fov: 75 }}>
        <OrbitalSystem 
          system={system} 
          speed={speed} 
          showLabels={true}
          showOrbits={true}
          showGrid={false}
        />
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

      {/* Speed controls */}
      <div className="absolute bottom-4 right-4 bg-dark-card/80 backdrop-blur-sm rounded-md p-3 text-white text-xs flex items-center gap-3">
        <span className="opacity-80">Speed:</span>
        <input
          type="range"
          min={0.01}
          max={20}
          step={0.01}
          value={speed}
          onChange={(e) => setSpeed(Number(e.target.value))}
          className="w-40"
        />
        <span className="min-w-[3.5rem] text-center">{speed.toFixed(2)}x</span>
        <button
          onClick={() => setSpeed(s => (s === 0 ? 1 : 0))}
          className="ml-1 px-2 py-1 bg-black/40 rounded hover:bg-black/60"
        >
          {speed === 0 ? 'Play' : 'Pause'}
        </button>
      </div>
    </div>
  )
}

