"use client"

import { useRef, useEffect } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import * as THREE from "three"

function PolyShape() {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.2
      meshRef.current.rotation.y += 0.005
    }
  })

  return (
    <mesh ref={meshRef}>
      <icosahedronGeometry args={[2, 2]} />
      <meshBasicMaterial color="#00FF7F" wireframe />
    </mesh>
  )
}

function EdgeGlow() {
  const edgesRef = useRef<THREE.LineSegments>(null)

  useFrame((state) => {
    if (edgesRef.current) {
      edgesRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.2
      edgesRef.current.rotation.y += 0.005
    }
  })

  return (
    <lineSegments ref={edgesRef}>
      <edgesGeometry args={[new THREE.IcosahedronGeometry(2.01, 2)]} />
      <lineBasicMaterial color="#9D00FF" linewidth={2} />
    </lineSegments>
  )
}

function GreenLinesShape() {
  const linesRef = useRef<THREE.LineSegments>(null)

  useFrame((state) => {
    if (linesRef.current) {
      linesRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.2
      linesRef.current.rotation.y += 0.005
    }
  })

  return (
    <lineSegments ref={linesRef}>
      <icosahedronGeometry args={[1.99, 2]} />
      <lineBasicMaterial color="#560589" linewidth={1} />
    </lineSegments>
  )
}

function ColorShift() {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.2
      meshRef.current.rotation.y += 0.005

      // Update material color based on time
      const material = meshRef.current.material as THREE.MeshPhysicalMaterial
      const hue = (state.clock.elapsedTime * 0.1) % 1
      material.color.setHSL(hue, 0.8, 0.5)
    }
  })

  return (
    <mesh ref={meshRef}>
      <icosahedronGeometry args={[1.98, 2]} />
      <meshPhysicalMaterial
        transparent
        opacity={0.3}
        metalness={1}
        roughness={0.1}
        clearcoat={1}
        clearcoatRoughness={0.2}
      />
    </mesh>
  )
}

export default function GeometricShape() {
  return (
    <div className="w-full h-full overflow-hidden flex items-center justify-center">
      <Canvas
        camera={{ position: [0, 0, 5] }}
        style={{
          width: "150%",
          height: "150%",
          marginLeft: "-%",
          marginTop: "-8%",
        }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#00FF7F" />
        <PolyShape />
        <EdgeGlow />
        <GreenLinesShape />
        <ColorShift />
      </Canvas>
    </div>
  )
}

