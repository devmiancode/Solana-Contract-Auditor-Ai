"use client"

import { useState, useEffect, useRef } from "react"
import Header from "@/components/v0/v0-components/header"
import DuckScene from "@/components/ui/3D_lights"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { useRouter } from "next/navigation" // Import useRouter
import LoadingSpinner from "@/components/ui/LoadingSpinner"  // Añade esta importación

export default function TopGPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 })
  const [isHeroVisible, setIsHeroVisible] = useState(true)
  const heroRef = useRef(null)
  const router = useRouter() // Initialize useRouter

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const handleMouseMove = (event) => {
      if (isHeroVisible) {
        const { clientX, clientY } = event
        const { innerWidth, innerHeight } = window
        setCursorPosition({
          x: (clientX / innerWidth) * 2 - 1,
          y: -(clientY / innerHeight) * 2 + 1,
        })
      }
    }

    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [isHeroVisible])

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsHeroVisible(entry.isIntersecting)
      },
      { threshold: 0.5 },
    )

    if (heroRef.current) {
      observer.observe(heroRef.current)
    }

    return () => {
      if (heroRef.current) {
        observer.unobserve(heroRef.current)
      }
    }
  }, [])

  if (isLoading) {
    return <LoadingSpinner />  // Usa el componente aquí
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />

      {/* Hero Section with 3D Background */}
      <section ref={heroRef} className="relative h-screen overflow-hidden">
        <div className="absolute inset-0 z-0">
          <DuckScene cursorPosition={cursorPosition} />
        </div>
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
          <div className="absolute inset-0 flex items-center justify-center opacity-10">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-FNLjxnfQCfvyyDJh6tu5TqqHotaOSj.png"
              alt="Knight Chess Piece"
              width={400}
              height={400}
              className="object-contain"
            />
          </div>
          <motion.h1
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-600 text-transparent bg-clip-text"
          >
            Welcome to Top G
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl mb-8 max-w-3xl"
          >
            Huge thanks to Top G, The Real World, Fundraiser and Solana Foundation for sponsoring the AI Hackathon and
            empowering innovation in blockchain and AI. Your support fuels groundbreaking projects like AI Time
            Capsules, shaping the future of decentralized technology!
          </motion.p>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.4 }}>
            <Button
              className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-full text-lg"
              onClick={() => router.push("/create-capsule")}
            >
              Get Started
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Sponsors Section */}
      <section className="py-20 bg-black relative">
        {" "}
        {/* Added relative */}
        <div className="absolute inset-0">
          {" "}
          {/* Added particle background */}
          <div className="bg-gradient-to-br from-blue-400/10 to-purple-600/10 w-full h-full mix-blend-overlay animate-pulse" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          {" "}
          {/* Added z-10 */}
          <h2 className="text-5xl font-bold mb-12 text-center bg-gradient-to-r from-blue-400 to-purple-600 text-transparent bg-clip-text">
            Our Sponsors
          </h2>
          <p className="text-xl text-center mb-12 text-gray-300">
            We extend our heartfelt gratitude to our sponsors who made this AI Hackathon possible. Your support drives
            innovation and pushes the boundaries of what's possible in blockchain and AI.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-gradient-to-br from-blue-400/10 to-purple-600/10 p-6 rounded-lg shadow-lg border border-purple-500/30 backdrop-blur-sm"
            >
              <h3 className="text-2xl font-semibold mb-4 text-center text-white">Top G</h3>
              <p className="text-gray-300 text-center">
                Empowering the future of AI, because even machines need a bit of that Top G unmatched perspicacity
                coupled with sheer indefatigability.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-gradient-to-br from-blue-400/10 to-purple-600/10 p-6 rounded-lg shadow-lg border border-purple-500/30 backdrop-blur-sm"
            >
              <h3 className="text-2xl font-semibold mb-4 text-center text-white">The Real World University</h3>
              <p className="text-gray-300 text-center">
                Where traditional education gets a reality check—learn the ropes from those who pull them.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-gradient-to-br from-blue-400/10 to-purple-600/10 p-6 rounded-lg shadow-lg border border-purple-500/30 backdrop-blur-sm"
            >
              <h3 className="text-2xl font-semibold mb-4 text-center text-white">The War Room Fundraiser</h3>
              <p className="text-gray-300 text-center">
                Backing ventures with the precision of a well-aimed strike, ensuring only the strongest ideas emerge
                victorious.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-black">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-12 text-center">Our Sponsors</h2>
          <div className="flex flex-col md:flex-row justify-center items-center space-y-8 md:space-y-0 md:space-x-12">
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="w-48 h-48 relative"
            >
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Top_G-fotor-bg-remover-202501191837-gqxn2658zVtyhLfZzoqYyP3FmFipSS.png"
                alt="Top G"
                layout="fill"
                objectFit="contain"
                className="filter brightness-100"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="w-48 h-48 relative"
            >
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-q77MMt2uboo6vB6tR6QH687bGztfod.png"
                alt="TRW"
                layout="fill"
                objectFit="contain"
                className="filter brightness-100"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="w-48 h-48 relative"
            >
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Fundraiser-ShLKKtgY7lV3y2PqHs7iVxhciT92h2.png"
                alt="Fundraiser.com"
                layout="fill"
                objectFit="contain"
                className="filter brightness-100"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-t from-purple-900 to-black">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-8">Ready to Secure Your Digital Legacy?</h2>
          <p className="text-xl mb-12 max-w-2xl mx-auto">
            Join AI Time Capsule today and experience the future of digital asset preservation. {/* Updated text */}
          </p>
          <Button
            className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-full text-lg"
            onClick={() => router.push("/create-capsule")}
          >
            {" "}
            {/* Added onClick */}
            Create Your First Capsule
          </Button>
        </div>
      </section>
    </div>
  )
}

