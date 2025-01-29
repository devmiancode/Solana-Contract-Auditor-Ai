"use client"

import { Vector3, type Vector3 as Vector3Type, DepthTexture } from "three"
import { useRef } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { useGLTF, SpotLight, useDepthBuffer, Environment } from "@react-three/drei"
import type { SpotLight as SpotLightImpl } from "three"

// Update the component to accept cursorPosition prop
export default function DuckScene({ cursorPosition = { x: 0, y: 0 } }) {
  return (
    <div className="w-full h-screen">
      <Canvas shadows dpr={[1, 2]} camera={{ position: [-2, 2, 6], fov: 50, near: 1, far: 20 }}>
        <color attach="background" args={["#000000"]} />
        <fog attach="fog" args={["#000000", 5, 20]} />
        <ambientLight intensity={0.015} />
        <Scene cursorPosition={cursorPosition} />
        <Environment preset="city" />
      </Canvas>
    </div>
  )
}

// Update the Scene component to accept and use cursorPosition
function Scene({ cursorPosition }: { cursorPosition: { x: number; y: number } }) {
  const depthBuffer = useDepthBuffer({ frames: 1 })
  // const { nodes, materials } = useGLTF("")
  return (
    <>
      <MovingSpot depthBuffer={depthBuffer} color="#2563eb" position={[3, 3, 2]} cursorPosition={cursorPosition} />
      <MovingSpot depthBuffer={depthBuffer} color="#7c3aed" position={[1, 3, 0]} cursorPosition={cursorPosition} />
      <mesh receiveShadow position={[0, -1, 0]} rotation-x={-Math.PI / 2}>
        <planeGeometry args={[50, 50]} />
        <meshStandardMaterial color="#000000" />
      </mesh>
    </>
  )
}

// Update the MovingSpotProps interface
interface MovingSpotProps {
  vec?: Vector3Type
  depthBuffer: DepthTexture
  color: string
  position: [number, number, number]
  cursorPosition: { x: number; y: number }
}

// Update the MovingSpot component to use cursorPosition
function MovingSpot({ vec = new Vector3(), cursorPosition, ...props }: MovingSpotProps) {
  const light = useRef<SpotLightImpl>(null)
  const viewport = useThree((state) => state.viewport)
  useFrame((state) => {
    if (light.current && light.current.target) {
      light.current.target.position.lerp(
        vec.set((cursorPosition.x * viewport.width) / 2, (cursorPosition.y * viewport.height) / 2, 0),
        0.1,
      )
      light.current.target.updateMatrixWorld()
    }
  })
  return (
    <SpotLight
      castShadow
      ref={light}
      penumbra={1}
      distance={6}
      angle={0.35}
      attenuation={5}
      anglePower={4}
      intensity={2}
      {...props}
    />
  )
}

