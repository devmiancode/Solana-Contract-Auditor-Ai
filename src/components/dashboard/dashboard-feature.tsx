"use client"
import { Button } from "@/components/ui/button"
import {
  ArrowRight,
  Clock,
  Gift,
  Code,
  TrendingUp,
  Quote,
  Upload,
  Calendar,
  Wallet,
  Lock,
  Package,
  BarChart3,
} from "lucide-react"
import TechnoStreamLines from "@/components/ui/technostreamlines"
import Header from "@/components/v0/v0-components/header"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import ThreeDBox from "@/components/ui/threedbox"
import AnimatedGlowingCard from "@/components/ui/animatedglowingcard"
import styles from "@/app/css/landingpage.module.css"
import Image from "next/image"
import Spline from "@splinetool/react-spline"
import "@/app/css/globals.css"

export default function Home() {
  const router = useRouter()
  const useCases = [
    {
      tag: "Hereditary",
      title: "Hereditary Capsule",
      description:
        "Secure and automate digital inheritance by locking assets, ensuring safe transfers, and executing AI-driven legacy plans with smart contracts.",
      icon: TrendingUp,
      href: "/hereditary",
    },
    {
      tag: "SMART CONTRACTS",
      title: "Smart Contract Triggers",
      description: "Set up blockchain actions that execute in the future. Automate your DeFi strategy with precision.",
      icon: Code,
      href: "/contracts",
    },
    {
      tag: "NFTs",
      title: "NFT Time Vaults",
      description:
        "Lock up digital assets for future generations. Create time-locked collections that appreciate over time.",
      icon: Gift,
      href: "/nfts",
    },
  ]

  const testimonials = [
    {
      text: "I stored my first NFT time capsule, excited to unlock it in 10 years!",
      author: "Alex R.",
      role: "NFT Artist",
    },
    {
      text: "Perfect way to preserve digital memories for my future self.",
      author: "Sarah M.",
      role: "Crypto Enthusiast",
    },
    {
      text: "The AI predictions feature is revolutionary. Can't wait to see the results!",
      author: "David K.",
      role: "Blockchain Developer",
    },
  ]

  const partners = [
    {
      name: "Solana",
    },
    {
      name: "Knight Global",
    },
    {
      name: "Top G",
    },
  ]

  const howItWorksSteps = [
    { icon: Wallet, text: "Sign Transaction via Solana Wallet" },
    { icon: Package, text: "Pick Your Capsule Type" },
    { icon: Calendar, text: "Set Unlock Date & AI Prediction" },
    { icon: Lock, text: "Capsule is Stored & Will Unlock in the Future" },
  ]

  return (
    <>
      <div className="min-h-screen w-full relative overflow-x-hidden">
        {/* Fixed background */}
        <div className="fixed inset-0 w-full h-full">
          <Spline scene="https://prod.spline.design/ubBPMvvEdECQdejJ/scene.splinecode" />
        </div>

        {/* Scrollable content */}
        <div className="relative">
          <Header walletConnected={false} setWalletConnected={() => {}} />

          {/* Hero Section */}
          <section className="min-h-screen relative flex items-center justify-center px-4">
            <div className="max-w-7xl mx-auto text-center">
              <h1
                className="text-4xl md:text-6xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600"
                style={{
                  WebkitTextStroke: "0.5px rgba(0, 0, 0, 1)",
                }}
              >
                Preserve your digital legacy
                <br />
                With AI & blockchain
              </h1>
              <p className="text-xl md:text-2xl mb-12 text-white max-w-3xl mx-auto bg-black/50 backdrop-blur-sm p-4 rounded-lg">
                Store messages, NFTs, and smart contracts that unlock in the future.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  className="bg-[#00FFA3] hover:bg-[#03E1FF] text-black text-lg px-8 py-6 rounded-full transition-all duration-300 transform hover:scale-105"
                  onClick={() => router.push("/create-capsule")}
                >
                  Create a Capsule
                  <ArrowRight className="ml-2" />
                </Button>
                <Button
                  variant="outline"
                  className="bg-transparent border-2 border-[#DC1FFF] text-[#DC1FFF] hover:bg-[#DC1FFF] hover:text-white text-lg px-8 py-6 rounded-full transition-all duration-300 transform hover:scale-105"
                  onClick={() => router.push("/capsules")}
                >
                  View Saved Capsules
                </Button>
              </div>
            </div>
          </section>

          {/* Use Cases Section */}
          <section className="py-32 relative">
            <div className="max-w-7xl mx-auto px-4">
              <div className="rounded-3xl p-8 md:p-12 mb-32">
                <h2 className="text-2xl md:text-3xl font-bold mb-12 text-center text-white">Popular Use Cases</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 justify-items-center">
                  {useCases.map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <AnimatedGlowingCard
                        tag={item.tag}
                        title={item.title}
                        description={item.description}
                        icon={item.icon}
                      />
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* How It Works Section */}
              <div className="rounded-3xl p-8 md:p-12 mb-32">
                <h2 className="text-2xl md:text-3xl font-bold mb-12 text-center text-white">How It Works</h2>
                <div className="relative">
                  {/* Connection Lines */}
                  <svg className="absolute top-12 left-0 w-full h-8 -z-10" preserveAspectRatio="none">
                    {/* Straight line */}
                    <line x1="10%" y1="50%" x2="90%" y2="50%" stroke="#3b82f6" strokeWidth="2" strokeDasharray="4 4" />
                    {/* Curved line */}
                    <path
                      d="M 10% 50% C 35% 0%, 65% 0%, 90% 50%"
                      fill="none"
                      stroke="#3b82f6"
                      strokeWidth="1"
                      opacity="0.3"
                    />
                  </svg>

                  {/* Steps */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-10 relative">
                    {howItWorksSteps.map((step, index) => (
                      <div key={index} className="flex flex-col items-center text-center group">
                        <div className="relative mb-4">
                          {/* Background glow effect */}
                          <div className="absolute inset-0 bg-[#3b82f6] rounded-full blur-md opacity-20 group-hover:opacity-40 transition-opacity" />
                          {/* Icon container */}
                          <div className="relative bg-black/80 border-2 border-[#3b82f6] rounded-full p-6 transition-transform duration-300 group-hover:scale-110 group-hover:border-[#8b5cf6]">
                            <step.icon className="w-8 h-8 text-[#3b82f6] group-hover:text-[#8b5cf6] transition-colors" />
                          </div>
                          {/* Step number */}
                          <div className="absolute -top-2 -right-2 bg-[#3b82f6] text-black text-sm font-bold rounded-full w-6 h-6 flex items-center justify-center group-hover:bg-[#8b5cf6] transition-colors">
                            {index + 1}
                          </div>
                        </div>
                        {/* Step text */}
                        <p
                          className="text-white text-sm md:text-base mt-2 px-2 bg-black/50 backdrop-blur-sm p-2 rounded-lg"
                          style={{ fontFamily: "Helvetica, sans-serif", fontWeight: 300 }}
                        >
                          {step.text}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* AI Predictions Section */}
              <div className="rounded-3xl p-8 md:p-12 mb-32">
                <h2 className="text-2xl md:text-3xl font-bold mb-12 text-center text-white">AI-Powered Predictions</h2>
                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#00FFA3] to-[#DC1FFF] bg-opacity-60">
                  <div className="absolute inset-0 bg-black bg-opacity-40" />
                  <div className="relative z-10 p-8">
                    <div className="flex items-center justify-center mb-6">
                      <TrendingUp className="w-16 h-16 text-[#00FFA3] mr-4" />
                      <h3
                        className="text-2xl md:text-3xl font-bold text-white"
                        style={{ fontFamily: "Helvetica, sans-serif", fontWeight: "bold" }}
                      >
                        Predict the Future of Solana with AI
                      </h3>
                    </div>
                    <p
                      className="text-xl text-center mb-6 text-white"
                      style={{ fontFamily: "Helvetica, sans-serif", fontWeight: 300 }}
                    >
                      Create an AI-powered prediction for Solana's price in 2035!
                    </p>
                    <div className="bg-black/60 backdrop-blur-md p-6 rounded-lg border border-[#00FFA3]/20">
                      <p
                        className="text-lg text-center text-[#03E1FF] font-bold"
                        style={{ fontFamily: "Helvetica, sans-serif", fontWeight: "bold" }}
                      >
                        "Solana will reach $2,500 by December 31, 2035"
                      </p>
                      <p
                        className="text-sm text-center mt-2 text-white/80"
                        style={{ fontFamily: "Helvetica, sans-serif", fontWeight: 300 }}
                      >
                        Prediction locked until 2035 - Unlock date: 12/31/2035
                      </p>
                    </div>
                    <div className="mt-8 text-center">
                      <Button
                        className="bg-[#DC1FFF] hover:bg-[#03E1FF] text-white text-lg px-8 py-4 rounded-full transition-all duration-300 transform hover:scale-105"
                        style={{ fontFamily: "Helvetica, sans-serif", fontWeight: "bold" }}
                      >
                        Create Your Own AI Prediction
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Stats Section */}
              <div className="rounded-3xl p-8 md:p-12 mb-32">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                  <div>
                    <h2
                      className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8 sm:mb-12 lg:mb-16 mt-6 sm:mt-8 lg:mt-10"
                      style={{ fontFamily: "Helvetica, sans-serif", fontWeight: "bold" }}
                    >
                      Join a community of millions of capsules.
                    </h2>
                    <div className="mt-10">
                      <ThreeDBox />
                    </div>
                  </div>
                  <div className="space-y-5">
                    <div className="text-right">
                      <p
                        className="text-5xl md:text-7xl lg:text-7xl bg-gradient-to-r from-purple-500 to-pink-500 text-transparent bg-clip-text"
                        style={{ fontFamily: "Helvetica, sans-serif", fontWeight: "bold" }}
                      >
                        29.7M
                      </p>
                      <p
                        className="text-sm text-gray-400 mt-2"
                        style={{ fontFamily: "Helvetica, sans-serif", fontWeight: 300 }}
                      >
                        ACTIVE CAPSULES
                      </p>
                    </div>
                    <div className="text-right">
                      <p
                        className="text-5xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-cyan-500 to-blue-500 text-transparent bg-clip-text"
                        style={{ fontFamily: "Helvetica, sans-serif", fontWeight: "bold" }}
                      >
                        340M<span className="text-4xl align-top">+</span>
                      </p>
                      <p
                        className="text-sm text-gray-400 mt-2"
                        style={{ fontFamily: "Helvetica, sans-serif", fontWeight: 300 }}
                      >
                        NFTS MINTED
                      </p>
                    </div>
                    <div className="text-right">
                      <p
                        className="text-5xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-green-500 to-emerald-500 text-transparent bg-clip-text"
                        style={{ fontFamily: "Helvetica, sans-serif", fontWeight: "bold" }}
                      >
                        $0.000064
                      </p>
                      <p
                        className="text-sm text-gray-400 mt-2"
                        style={{ fontFamily: "Helvetica, sans-serif", fontWeight: 300 }}
                      >
                        MEDIAN FEE PER TRANSACTION
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Testimonials Section */}
              <div className="rounded-3xl p-8 md:p-12 mb-32">
                <h2 className="text-2xl md:text-3xl font-bold mb-12 text-center text-white">What Our Users Say</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                  {testimonials.map((testimonial, index) => (
                    <div key={index} className="bg-black/50 p-8 rounded-lg relative">
                      <Quote className="absolute top-4 left-4 w-6 h-6 text-[#3b82f6] opacity-50" />
                      <div className="pt-6">
                        <p className="text-white mb-4" style={{ fontFamily: "Helvetica, sans-serif", fontWeight: 300 }}>
                          "{testimonial.text}"
                        </p>
                        <div className="border-t border-[#3b82f6]/20 pt-4">
                          <p
                            className="text-[#3b82f6] font-bold"
                            style={{ fontFamily: "Helvetica, sans-serif", fontWeight: "bold" }}
                          >
                            {testimonial.author}
                          </p>
                          <p
                            className="text-[#93c5fd]"
                            style={{ fontFamily: "Helvetica, sans-serif", fontWeight: 300 }}
                          >
                            {testimonial.role}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Partners Section */}
              <div className="rounded-3xl p-8 md:p-12">
                <h2 className="text-2xl md:text-3xl font-bold mb-12 text-center text-white">Backed By</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center justify-items-center">
                  <div className="relative w-full h-[120px]">
                    <Image
                      src="/topg.png"
                      alt="Top G"
                      layout="fill"
                      objectFit="contain"
                      className="filter brightness-100"
                    />
                  </div>
                  <div className="relative w-full h-[120px]">
                    <Image
                      src="/fundraiser.jpeg"
                      alt="TRW"
                      layout="fill"
                      objectFit="contain"
                      className="filter brightness-100"
                    />
                  </div>
                  <div className="relative w-full h-[120px]">
                    <Image
                      src="/tate.jpeg"
                      alt="Fundraiser.com"
                      layout="fill"
                      objectFit="contain"
                      className="filter brightness-100"
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
      <div className="gradient-sphere"></div>
    </>
  )
}

