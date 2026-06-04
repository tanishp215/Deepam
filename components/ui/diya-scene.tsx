'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import * as THREE from 'three'

/* ── Flame ─────────────────────────────────────────── */
function Flame() {
  const groupRef = useRef<THREE.Group>(null)
  const outerRef = useRef<THREE.Mesh>(null)
  const midRef   = useRef<THREE.Mesh>(null)
  const coreRef  = useRef<THREE.Mesh>(null)
  const lightRef = useRef<THREE.PointLight>(null)
  const fillRef  = useRef<THREE.PointLight>(null)

  const outerPts = useMemo(() => [
    new THREE.Vector2(0.000, 0.00),
    new THREE.Vector2(0.058, 0.05),
    new THREE.Vector2(0.075, 0.14),
    new THREE.Vector2(0.062, 0.27),
    new THREE.Vector2(0.036, 0.40),
    new THREE.Vector2(0.010, 0.50),
    new THREE.Vector2(0.000, 0.54),
  ], [])

  const midPts = useMemo(() => [
    new THREE.Vector2(0.000, 0.00),
    new THREE.Vector2(0.036, 0.04),
    new THREE.Vector2(0.046, 0.12),
    new THREE.Vector2(0.034, 0.24),
    new THREE.Vector2(0.014, 0.36),
    new THREE.Vector2(0.000, 0.42),
  ], [])

  const corePts = useMemo(() => [
    new THREE.Vector2(0.000, 0.00),
    new THREE.Vector2(0.018, 0.03),
    new THREE.Vector2(0.022, 0.09),
    new THREE.Vector2(0.012, 0.18),
    new THREE.Vector2(0.000, 0.24),
  ], [])

  useFrame(({ clock }) => {
    const t = clock.elapsedTime
    if (groupRef.current) {
      groupRef.current.position.x = Math.sin(t * 1.9) * 0.02 + Math.sin(t * 3.7) * 0.008
      groupRef.current.position.z = Math.cos(t * 2.3) * 0.015
    }
    if (outerRef.current) {
      outerRef.current.scale.y = 1 + Math.sin(t * 3.1) * 0.09
      outerRef.current.scale.x = 1 + Math.cos(t * 2.7) * 0.05
    }
    if (midRef.current) {
      midRef.current.scale.y = 1 + Math.sin(t * 4.3 + 0.6) * 0.10
    }
    if (coreRef.current) {
      coreRef.current.scale.y = 1 + Math.sin(t * 5.5 + 1.2) * 0.08
    }
    if (lightRef.current) {
      lightRef.current.intensity = 5.5 + Math.sin(t * 4.8) * 1.8
    }
    if (fillRef.current) {
      fillRef.current.intensity = 2.0 + Math.sin(t * 3.6 + 1.0) * 0.7
    }
  })

  return (
    <group position={[0, 0.48, 0]}>
      <pointLight ref={lightRef} color="#FF8800" intensity={5.5} distance={7} decay={2} />
      <pointLight ref={fillRef}  color="#FF5500" intensity={2.0} distance={3} decay={2} position={[0, -0.35, 0]} />

      <group ref={groupRef}>
        <mesh ref={outerRef}>
          <latheGeometry args={[outerPts, 20]} />
          <meshStandardMaterial
            color="#FF4400" emissive="#FF3300" emissiveIntensity={2.2}
            transparent opacity={0.72} side={THREE.DoubleSide} depthWrite={false}
          />
        </mesh>
        <mesh ref={midRef} position={[0, 0.02, 0]}>
          <latheGeometry args={[midPts, 18]} />
          <meshStandardMaterial
            color="#FFB300" emissive="#FFA000" emissiveIntensity={3.5}
            transparent opacity={0.88} side={THREE.DoubleSide} depthWrite={false}
          />
        </mesh>
        <mesh ref={coreRef} position={[0, 0.04, 0]}>
          <latheGeometry args={[corePts, 14]} />
          <meshStandardMaterial
            color="#FFFDE7" emissive="#FFE082" emissiveIntensity={6}
            transparent opacity={1} side={THREE.DoubleSide} depthWrite={false}
          />
        </mesh>
      </group>

      {/* Wick */}
      <mesh position={[0, -0.16, 0]}>
        <cylinderGeometry args={[0.008, 0.008, 0.09, 8]} />
        <meshStandardMaterial color="#1c0900" roughness={1} />
      </mesh>
    </group>
  )
}

/* ── Bowl — clean, no floating rings ───────────────── */
function Bowl() {
  const pts = useMemo(() => [
    // Authentic diya: flat base, gentle outward curve, wide shallow opening
    new THREE.Vector2(0.04,  0.000),
    new THREE.Vector2(0.36,  0.000),
    new THREE.Vector2(0.62,  0.055),
    new THREE.Vector2(0.82,  0.145),
    new THREE.Vector2(0.96,  0.260),
    new THREE.Vector2(1.03,  0.360),
    new THREE.Vector2(1.04,  0.415),
    new THREE.Vector2(1.00,  0.445),
    new THREE.Vector2(0.92,  0.460),
  ], [])

  return (
    <group>
      {/* Clay body — single clean mesh, no decorative rings */}
      <mesh receiveShadow castShadow>
        <latheGeometry args={[pts, 64]} />
        <meshStandardMaterial
          color="#C04A18"
          roughness={0.85}
          metalness={0.02}
        />
      </mesh>

      {/* Dark oil surface — glows from flame above */}
      <mesh position={[0, 0.435, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.73, 48]} />
        <meshStandardMaterial
          color="#2a0e00"
          roughness={0.06}
          metalness={0.25}
          emissive="#CC4400"
          emissiveIntensity={0.55}
        />
      </mesh>

      {/* Spout pinch */}
      <mesh position={[0.90, 0.30, 0]} rotation={[0, 0, -0.22]}>
        <cylinderGeometry args={[0.038, 0.068, 0.11, 12]} />
        <meshStandardMaterial color="#A83A0C" roughness={0.87} />
      </mesh>
    </group>
  )
}

/* ── Mouse-tracked wrapper ──────────────────────────── */
function DiyaGroup() {
  const ref = useRef<THREE.Group>(null)
  const { mouse } = useThree()

  useFrame(() => {
    if (!ref.current) return
    ref.current.rotation.y = THREE.MathUtils.lerp(ref.current.rotation.y, mouse.x * 0.75, 0.07)
    ref.current.rotation.x = THREE.MathUtils.lerp(ref.current.rotation.x, mouse.y * -0.18, 0.07)
  })

  return (
    <group ref={ref} position={[0, -0.2, 0]}>
      <Bowl />
      <Flame />
    </group>
  )
}

/* ── Scene ──────────────────────────────────────────── */
function Scene() {
  return (
    <>
      <ambientLight intensity={0.07} color="#FF7700" />
      <directionalLight position={[1, 6, 4]} intensity={0.4} color="#FFE8CC" castShadow />

      <Float speed={0.7} rotationIntensity={0} floatIntensity={0.22}>
        <DiyaGroup />
      </Float>

      {/* Very soft ground glow — just a hint */}
      <mesh position={[0, -1.0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[4, 4]} />
        <meshBasicMaterial color="#2a0e00" transparent opacity={0.45} depthWrite={false} />
      </mesh>
    </>
  )
}

/* ── Export ─────────────────────────────────────────── */
export function DiyaScene({ className }: { className?: string }) {
  return (
    <div className={className}>
      <Canvas
        shadows
        camera={{ position: [0, 1.6, 4.2], fov: 34 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
        onCreated={({ gl }) => gl.setClearColor(0x000000, 0)}
      >
        <Scene />
      </Canvas>
    </div>
  )
}
