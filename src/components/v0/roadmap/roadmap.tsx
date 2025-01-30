"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import Header from "@/components/v0/v0-components/header"
import { CheckCircle2, Settings } from "lucide-react"
import Spline from "@splinetool/react-spline"
import LoadingSpinner from "@/components/ui/LoadingSpinner"
import { useState, useEffect } from "react"
// import ThreeDWorld from "@/components/3DWorld";

// Updated Timeline Items
const timelineItems = [
  {
    date: "Phase 1",
    title: "Deploy Core Capsule Types",
    description: "Launch Hereditary, NFT Vaults, Smart Contracts, and Time-Released Messages as on-chain capsules.",
    completed: false,
  },
  {
    date: "Phase 2",
    title: "AI-Powered Unlock Prediction",
    description:
      "Implement AI-based life expectancy evaluation to calculate the best unlock date for Hereditary Capsules.",
    completed: false,
  },
  {
    date: "Phase 3",
    title: "Smart Fund Distribution Mechanism",
    description:
      "Users can set fixed or percentage-based inheritance across multiple heirs, ensuring optimized fund allocation.",
    completed: false,
  },
  {
    date: "Phase 4",
    title: "Solana Smart Contract Execution",
    description: "Enable secure fund transfers using low-latency Solana transactions with automated execution.",
    completed: false,
  },
  {
    date: "Phase 5",
    title: "AI Wallet Security Scanner",
    description:
      "Before executing any capsule unlock, AI will scan beneficiary wallets for inactivity, fraud, or suspicious activity.",
    completed: false,
  },
  {
    date: "Phase 6",
    title: "AI Market Timing for Unlock Execution",
    description:
      "If Solana's price drops 30% or more, AI pauses execution to prevent value loss and notifies the owner.",
    completed: false,
  },
  {
    date: "Phase 7",
    title: "Event-Triggered Smart Contracts",
    description: "Capsules now support price-based execution, token transfers, and automated contract unlocking.",
    completed: false,
  },
  {
    date: "Phase 8",
    title: "AI-Optimized Legacy Planning",
    description: "AI generates custom inheritance strategies based on health, financial data, and user-defined rules.",
    completed: false,
  },
  {
    date: "Phase 9",
    title: "Legal & Conditional Unlocking",
    description: "Users can set vesting schedules, milestones, and DAO-based approvals for unlocking assets.",
    completed: false,
  },
  {
    date: "Phase 10",
    title: "NFT Vault Smart Unlocks",
    description:
      "Implement time-sensitive NFT reveals, allowing users to mint evolving NFT assets that change over time.",
    completed: false,
  },
  {
    date: "Phase 11",
    title: "Hereditary Capsule DAO Voting",
    description: "Allow the community to vote on inheritance policies and approval of disputed unlocks.",
    completed: false,
  },
  {
    date: "Phase 12",
    title: "AI-Powered Capsule Marketplace",
    description:
      "Enable users to sell, trade, or transfer locked capsules, with AI predicting future value for marketplace trading.",
    completed: false,
  },
  {
    date: "Phase 13",
    title: "Multi-Chain Expansion",
    description: "Explore cross-chain compatibility for Ethereum, Polygon, and Solana to allow wider asset support.",
    completed: false,
  },
  {
    date: "Phase 14",
    title: "Development of Content Release Smart Contracts",
    description: "Design and implement smart contracts that enable creators to upload and securely store exclusive content, with the capability to set specific future release dates.",
    completed: false,
  },
  {
    date: "Phase 15",
    title: "Integration of Access Control Mechanisms",
    description: "Establish access control protocols to ensure that only authorized users can access the content upon release, utilizing token-gated mechanisms or NFT-based access passes.",
    completed: false,
  },
  {
    date: "Phase 16",
    title: "User Interface Enhancement for Content Scheduling",
    description: "Enhance the platform's user interface to allow creators to easily schedule content releases, manage access permissions, and monitor engagement metrics.",
    completed: false,
  },
  {
    date: "Phase 17",
    title: "Design and Development of Auction Smart Contracts",
    description: "Develop smart contracts to facilitate decentralized auctions, ensuring that active bidders' funds are securely locked until the auction concludes.",
    completed: false,
  },
  {
    date: "Phase 18",
    title: "Integration of Capsule Transfer Mechanism",
    description: "Implement functionality to automatically transfer capsule ownership and release funds to the winning bidder upon auction completion.",
    completed: false,
  },
  {
    date: "Phase 19",
    title: "User Interface Enhancement for Auctions",
    description: "Enhance the user interface to support auction creation, bidding processes, and real-time updates for active auctions.",
    completed: false,
  },
  {
    date: "Phase 20",
    title: "Draw Smart Contract Development",
    description: "Develop secure and transparent draw smart contracts on Solana. Implement provably fair random selection algorithms for winner determination.",
    completed: false,
  },
  {
    date: "Phase 21",
    title: "Dynamic Capsule Pool System",
    description: "Enable users to create and contribute custom capsules as rewards for draw winners. Allow sponsors or DAOs to fund special capsule draws for promotions.",
    completed: false,
  },
  {
    date: "Phase 22",
    title: "Entry Fee Models",
    description: "Implement dynamic fee adjustments based on demand, market conditions, and prize value.",
    completed: false,
  },
  {
    date: "Phase 23",
    title: "User Interface",
    description: "Create a real-time dashboard displaying live capsule draw countdowns.",
    completed: false,
  },
]

export default function RoadmapPage() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return <LoadingSpinner />
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <Header />
      <main className="container mx-auto px-4 pt-24 pb-32">
        {/* Hero Section */}
        <section className="text-center mb-16">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl font-bold mb-4"
          >
            Roadmap
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-gray-400 max-w-2xl mx-auto mb-8"
          >
            Explore our ambitious journey to revolutionize digital legacy preservation. This roadmap outlines key
            milestones in developing AI-powered time capsules, from smart contract integration to advanced prediction
            algorithms.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Button variant="outline" className="bg-white/5 hover:bg-white/10 text-white border-purple-500/50">
              SUGGEST FEATURES
            </Button>
          </motion.div>
        </section>

        {/* 3D World Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="relative w-full max-w-4xl mx-auto mb-16 rounded-lg overflow-hidden bg-black/20 h-[600px]"
        >
          <div className="w-full h-full" onWheel={(e) => e.preventDefault()}>
            <Spline
              scene="https://prod.spline.design/nmmHXk0apUKR7pL7/scene.splinecode"
              onWheel={(e) => e.preventDefault()}
              onMouseDown={(e) => e.preventDefault()}
              style={{ touchAction: "none", pointerEvents: "none" }}
            />
          </div>
          <div className="absolute bottom-4 left-4 bg-black/80 backdrop-blur-sm rounded-full px-4 py-2 flex items-center">
            <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse mr-2"></div>
            <span className="text-sm text-white/90">AI is generating!</span>
          </div>
        </motion.div>

        {/* Timeline */}
        <div className="max-w-3xl mx-auto">
          {timelineItems.map((item, index) => (
            <motion.div
              key={item.date}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative pl-8 pb-12 border-l border-purple-500/20 last:pb-0"
            >
              <div className="absolute left-[-8px] top-0">
                {item.completed ? (
                  <div className="w-4 h-4 rounded-full bg-purple-500 flex items-center justify-center">
                    <CheckCircle2 className="w-3 h-3 text-white" />
                  </div>
                ) : (
                  <div className="w-4 h-4 rounded-full border-2 border-purple-500/50 bg-black"></div>
                )}
              </div>
              <div className="mb-2">
                <span className="text-sm text-purple-400 font-mono">[{item.date}]</span>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white">{item.title}</h3>
              <p className="text-gray-400">{item.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-center mt-24"
        >
        </motion.section>
      </main>
    </div>
  )
}

