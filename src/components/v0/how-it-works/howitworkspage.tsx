"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Header from "@/components/v0/v0-components/header"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import GlowingCard from "@/components/ui/GlowingCard"
import { Calendar, Shield, TrendingUp, Siren } from "lucide-react"
import GlowingBorderCard from "@/components/ui/GlowingBorderCard"
import { Notification } from "@/components/ui/Notification"
import LoadingSpinner from "@/components/ui/LoadingSpinner"
import GradientParallelograms from "@/components/ui/solanalogo"
import Spline from "@splinetool/react-spline"

const coursesData = [
  {
    id: 1,
    title: "Create Your Capsule",
    description:
      "Choose your content type: messages, NFTs, smart contracts, or hereditary assets. Set an unlock date and customize privacy settings.",
    bgColor: "#4c49ea",
  },
  {
    id: 2,
    title: "AI Enhancement",
    description:
      "Our AI analyzes your content, provides insights, and optionally generates predictions or complementary information.",
    bgColor: "#3ecd5e",
  },
  {
    id: 3,
    title: "Secure Storage",
    description:
      "Your capsule is encrypted and stored on the Solana blockchain, ensuring its integrity and immutability until the unlock date.",
    bgColor: "#952aff",
  },
]

const glowingCardsData = [
  {
    heading: "AI-Suggested Unlock Dates",
    description:
      "Our AI analyzes trends and suggests the optimal time to unlock your capsule. It considers factors like technological advancements, market conditions, and personal milestones. For example, for a tech industry time capsule, AI suggested 2030 based on projected major breakthroughs in quantum computing and AI. This feature ensures your capsule's content is revealed at the most impactful moment.",
    highlight: "Optimize Your Timing",
    icon: Calendar,
  },
  {
    heading: "AI Risk & Security Alerts",
    description:
      "The AI continuously monitors for wallet inactivity and potential security risks. It can detect unusual patterns, such as sudden changes in wallet behavior or attempts at unauthorized access. In one instance, AI detected unusual inactivity in a user's wallet and sent alerts, preventing potential loss of assets in a hereditary capsule. This proactive approach ensures the safety of your digital legacy.",
    highlight: "Protect Your Assets",
    icon: Siren,
  },
  {
    heading: "AI-Generated Predictions",
    description:
      "For capsules storing financial data or market-related content, our AI provides future market insights and predictions. It analyzes historical data, current trends, and potential future scenarios to offer valuable foresight. In a DeFi strategy capsule, AI predicted a 300% growth in decentralized exchanges by 2028, helping users make informed decisions about their long-term investment strategies.",
    highlight: "Foresight for the Future",
    icon: TrendingUp,
  },
]

export default function HowItWorksPage() {
  const [walletConnected, setWalletConnected] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

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
    <div className="min-h-screen bg-black">
      <div className="fixed inset-0 w-full h-full">
        <Spline scene="https://prod.spline.design/xsixByh1Qij5M6fG/scene.splinecode" />
      </div>
      <div className="absolute inset-0 bg-[url('/golden-texture.png')] opacity-5 mix-blend-overlay pointer-events-none"></div>

      <Header walletConnected={walletConnected} setWalletConnected={setWalletConnected} />

      <main className="relative z-10">
        <div className="container mx-auto px-4 pt-24 pb-24">
          <section className="text-center mb-20">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
              Preserve Your Digital Legacy with AI & Blockchain
            </h1>
            <p className="text-xl mb-8 text-white max-w-3xl mx-auto">
              Create time-locked capsules that store messages, NFTs, Hereditary, and smart contracts—unlocking in the
              future with AI automation and Solana security.
            </p>
            <Button
              onClick={() => router.push("/create-capsule")}
              className="bg-blue-400 text-white hover:bg-purple-600 text-lg px-8 py-4 rounded-full transition-all duration-300 transform hover:scale-105"
            >
              Create a Capsule
            </Button>
          </section>

          <motion.div
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-20"
          >
            <GradientParallelograms />
          </motion.div>

          {/* How to Create a Capsule Section */}
          <section className="my-20">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-white text-center">
              What Makes AI Time Capsule Unique?
            </h2>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
                {glowingCardsData.map((card, index) => (
                  <GlowingCard
                    key={index}
                    heading={card.heading}
                    description={card.description}
                    highlight={card.highlight}
                    icon={card.icon}
                  />
                ))}
              </div>
            </div>
          </section>

          {/* Notification Components */}
          <section className="mb-20">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-white text-center">
              Who Can Use AI Time Capsule?
            </h2>
            <div className="flex justify-center items-center">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-6xl mx-auto justify-center items-center">
                <Notification
                  title="Time-Released Messages"
                  body="Send future messages to yourself or loved ones."
                  example="A parent creates a series of birthday messages for their child, unlocking annually until their 18th birthday."
                />
                <Notification
                  title="NFT Vaults"
                  body="Lock NFT collections for legacy preservation."
                  example="An artist locks a rare NFT collection, set to unlock in 2050 as a digital time capsule of early 21st-century digital art."
                />
                <Notification
                  title="Smart Contract Automation"
                  body="Schedule future DeFi transactions, DAO votes, or fund transfers."
                  example="A DAO sets up a smart contract to automatically distribute funds to approved projects every quarter for the next 5 years."
                />
                <Notification
                  title="Crypto Inheritance"
                  body="Securely pass down assets with AI-powered risk checks."
                  example="A crypto investor sets up a hereditary wallet that transfers assets to their heirs, with AI monitoring for optimal execution timing and security risks."
                />
              </div>
            </div>
          </section>

          {/* Features Section */}
          <section className="mb-20">
            <h2 className="text-3xl font-bold mb-8 text-white text-center">Benefits of AI Time Capsules</h2>
            <div className="flex justify-center w-full max-w-2xl mx-auto">
              <GlowingBorderCard
                title="AI Time Capsules Benefits"
                description="Experience the future of digital legacy preservation"
                items={[
                  "Preserve digital legacies with blockchain security",
                  "AI-powered insights and predictions",
                  "Customizable unlock conditions",
                  "Support for various content types",
                  "Seamless integration with Solana wallets",
                  "Community-driven capsule exploration",
                ]}
                buttonText="Create Your Capsule"
                onButtonClick={() => router.push("/create-capsule")}
              />
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}

