"use client"

import { useRef, Suspense } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Environment } from "@react-three/drei"
import * as THREE from "three"
import { ErrorBoundary } from "react-error-boundary"

const gradientShader = {
  vertexShader: `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    uniform vec3 colorA;
    uniform vec3 colorB;
    varying vec2 vUv;
    
    void main() {
      vec3 color = mix(colorA, colorB, vUv.x);
      gl_FragColor = vec4(color, 1.0);
    }
  `,
}

function Parallelogram({
  position,
  rotation,
  colors,
}: {
  position: [number, number, number]
  rotation: [number, number, number]
  colors: [string, string]
}) {
  const mesh = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (mesh.current) {
      mesh.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.5) * 0.1
    }
  })

  // Create parallelogram shape
  const shape = new THREE.Shape()
  shape.moveTo(-2.2, -0.5)
  shape.lineTo(2.2, -0.5)
  shape.lineTo(1.5, 0.5)
  shape.lineTo(-3, 0.5)
  shape.lineTo(-2, -0.5)

  const geometry = new THREE.ShapeGeometry(shape)

  // Convert hex colors to THREE.Vector3
  const colorA = new THREE.Color(colors[0])
  const colorB = new THREE.Color(colors[1])

  return (
    <mesh ref={mesh} position={position} rotation={rotation}>
      <shapeGeometry args={[shape]} />
      <shaderMaterial
        vertexShader={gradientShader.vertexShader}
        fragmentShader={gradientShader.fragmentShader}
        uniforms={{
          colorA: { value: new THREE.Vector3(colorA.r, colorA.g, colorA.b) },
          colorB: { value: new THREE.Vector3(colorB.r, colorB.g, colorB.b) },
        }}
        side={THREE.DoubleSide}
      />
    </mesh>
  )
}

function GradientParallelogramsContent() {
  return (
    <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
      <Parallelogram position={[0.6, 1.45, 0]} rotation={[10, 0, 0]} colors={["#9333ea", "#06b6d4"]} />
      <Parallelogram position={[0.55, 0, 0]} rotation={[0, 0, 0]} colors={["#a855f7", "#0ea5e9"]} />
      <Parallelogram position={[0.5, -1.4, 0]} rotation={[10, 0, 0]} colors={["#d946ef", "#3b82f6"]} />
      <Environment preset="studio" />
    </Canvas>
  )
}

export default function GradientParallelograms({ containerHeight = 200 }: { containerHeight?: number }) {
  return (
    <div className="w-full relative" style={{ height: `${containerHeight}px` }}>
      <ErrorBoundary fallback={<div>Error loading 3D content</div>}>
        <Suspense fallback={<div>Loading...</div>}>
          <GradientParallelogramsContent />
        </Suspense>
      </ErrorBoundary>
    </div>
  )
}

