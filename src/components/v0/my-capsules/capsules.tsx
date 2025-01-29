"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Header from "@/components/v0/v0-components/header"
import CapsuleOverviewDashboard from "./capsuleoverviewdashboard"
import CapsuleSearchAndFilter from "./capsulesearchandfilter"
import AdvancedCapsuleInfo from "./advancedcapsuleInfo"
import LoadingSpinner from "@/components/ui/LoadingSpinner"

interface Capsule {
  id: number;
  name: string;
  unlockDate: string;
  status: string;
  type: string;
  content: string;
  description: string;
  visibility: "Public" | "Private" | "DAO-Only";
  isPublic: boolean;
  isLocked: boolean;
  canExtend: boolean;
  timeLeft?: string;
  formattedDate?: string;
}

export default function CapsulePage() {
  const [walletConnected, setWalletConnected] = useState(false)
  const [selectedCapsule, setSelectedCapsule] = useState<Capsule | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [capsuleUpdateTrigger, setCapsuleUpdateTrigger] = useState(0)
  const [filterType, setFilterType] = useState("all")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const checkForNewCapsule = () => {
      const newCapsuleData = localStorage.getItem("newCapsule")
      if (newCapsuleData) {
        setCapsuleUpdateTrigger((prev) => prev + 1)
      }
    }

    checkForNewCapsule()
    const interval = setInterval(checkForNewCapsule, 1000)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  const handleSearch = (query: string) => {
    setSearchQuery(query)
  }

  const handleFilterDate = (filter: string) => {
    console.log("Filtering by date:", filter)
  }

  const handleFilterType = (filter: string) => {
    setFilterType(filter)
  }

  if (isLoading) {
    return <LoadingSpinner />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-black to-blue-600/20">
      {/* Add the semi-sphere */}
      <div className="fixed left-0 top-1/2 -translate-y-1/2 w-[600px] h-[800px] overflow-hidden pointer-events-none">
        <div className="absolute w-full h-full rounded-r-full bg-gradient-to-br from-purple-700 via-purple-900 to-transparent opacity-40 blur-3xl" />
      </div>
      {/* Add scattered stars */}
      <div className="fixed inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full animate-twinkle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          />
        ))}
      </div>
      <div className="absolute inset-0 bg-[url('/golden-texture.png')] opacity-5 mix-blend-overlay pointer-events-none"></div>
      <Header />
      <main className="container mx-auto px-4 pt-24 pb-12">
        <div className="relative flex items-start justify-between mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl"
          >
            <h1 className="text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
              My Time Capsules
            </h1>
            <p className="text-xl text-white">
              Explore and manage your time-locked digital legacies with real-time blockchain status and secure Solana
              integration.
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <CapsuleSearchAndFilter
            onSearch={handleSearch}
            onFilterDate={handleFilterDate}
            onFilterType={handleFilterType}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <CapsuleOverviewDashboard
            onSelectCapsule={setSelectedCapsule}
            searchQuery={searchQuery}
            updateTrigger={capsuleUpdateTrigger}
            filterType={filterType}
          />
        </motion.div>
        {selectedCapsule && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          </motion.div>
        )}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <AdvancedCapsuleInfo />
        </motion.div>
      </main>
    </div>
  )
}
;<style jsx global>{`
  @keyframes twinkle {
    0%, 100% { opacity: 0.2; }
    50% { opacity: 1; }
  }
  
  .animate-twinkle {
    animation: twinkle 3s ease-in-out infinite;
  }
`}</style>

