"use client"

import { useState, useEffect } from "react"
import Header from "@/components/v0/v0-components/header"
import { FloatingActionButton } from "@/components/ui/floatingactionbutton"
import LoadingSpinner from "@/components/ui/LoadingSpinner"
import "@/app/css/capsule-card.css"
import GlowingButton from "@/components/ui/glowingbutton"
import CapsulePopupCard from "@/components/ui/capsulepopupcard"
import AISuggestionCard from "@/components/ui/aisuggestioncard"
import AIAnalyticsSection from "@/components/ui/aianalyticssection" // Import the new component
import CapsuleInteractionHeatmap from "@/components/ui/capsuleinteractionheatmap" // Import the new component
import Spline from "@splinetool/react-spline"  // Cambia la importación

// Mock data for demonstration
const featuredCapsules = [
  {
    id: 1,
    name: "Bitcoin Price Prediction 2030",
    description: "AI-generated forecast for Bitcoin's value in 2030, based on historical data and market trends.",
  },
  {
    id: 2,
    name: "Time Capsule: World Events 2025",
    description: "A collection of predictions for major global events expected to occur by 2025.",
  },
  {
    id: 3,
    name: "Ethereum 2.0 Impact Analysis",
    description: "Comprehensive study on how Ethereum 2.0 will reshape the blockchain landscape.",
  },
  {
    id: 4,
    name: "AI Singularity Predictions",
    description: "Expert opinions and AI-generated forecasts on when and how AI singularity might occur.",
  },
  {
    id: 5,
    name: "Climate Change Time Capsule",
    description: "Environmental data and predictions locked until 2050 to assess climate change progress.",
  },
]

const aiSuggestions = [
  {
    id: 1,
    title: "2025 Tech Trends",
    description: "AI-generated forecast on upcoming technology trends.",
    category: "Recommended for You",
  },
  {
    id: 2,
    title: "DAO Governance 2030",
    description: "Popular Messages on the future of DAO structures.",
    category: "Popular in Your Network",
  },
  {
    id: 3,
    title: "Crypto Market Cycles",
    description: "AI analysis of historical crypto market patterns.",
    category: "AI-Powered Predictions",
  },
  {
    id: 4,
    title: "Web3 Adoption Rates",
    description: "Forecast on global Web3 technology adoption.",
    category: "Recommended for You",
  },
  {
    id: 5,
    title: "DeFi Yield Strategies",
    description: "AI-optimized yield farming strategies for 2024.",
    category: "AI-Powered Predictions",
  },
]

interface Capsule {
  id: number;
  name: string;
  description: string;
}

interface CapsuleCardProps {
  capsule: Capsule;
  index: number;
  onExplore: (capsule: Capsule) => void;
}

const CapsuleCard = ({ capsule, index, onExplore }: CapsuleCardProps) => {
  return (
    <div className="card bg-[#17141d] w-full sm:w-[280px] h-[450px] rounded-[20px] shadow-[-1rem_0_3rem_#000] transition-all duration-400 ease-out relative left-0 hover:-translate-y-5 group first:ml-0 sm:-ml-[50px] mb-6 sm:mb-0">
      <h3 className="title text-white font-light text-xl absolute left-[20px] top-[15px] right-[20px] truncate">
        {capsule.name}
      </h3>
      <div className="bar absolute top-[60px] left-[20px] right-[20px] h-[5px]">
        <div className="emptybar bg-[#2e3033] w-full h-full rounded-full"></div>
        <div className="filledbar absolute top-0 z-[3] w-0 h-full bg-gradient-to-r from-[#009ad9] via-[#d99300] to-[#ffba00] transition-all duration-600 ease-out group-hover:w-3/4 rounded-full"></div>
      </div>
      <div className="circle absolute top-[100px] left-[calc(50%-60px)]">
        <svg width="120px" height="120px" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
          <circle
            cx="60"
            cy="60"
            r="50"
            className="stroke"
            fill="#17141d"
            strokeWidth="2"
            stroke="white"
            strokeDasharray="360"
            strokeDashoffset="360"
          />
        </svg>
      </div>
      <p className="description text-white text-sm absolute left-[20px] right-[20px] top-[240px] text-center">
        {capsule.description}
      </p>
      <div className="absolute bottom-[20px] left-0 right-0 flex justify-center">
        <GlowingButton onClick={() => onExplore(capsule)}>Explore</GlowingButton>
      </div>
    </div>
  )
}

export default function ExplorerPage() {
  const [walletConnected, setWalletConnected] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [selectedCapsule, setSelectedCapsule] = useState<Capsule | null>(null)
  const [isPopupOpen, setIsPopupOpen] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  const handleExplore = (capsule: Capsule) => {
    setSelectedCapsule(capsule)
    setIsPopupOpen(true)
  }

  if (isLoading) {
    return <LoadingSpinner />
  }

  return (
    <div className="min-h-screen bg-[#100e17] relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('/golden-texture.png')] opacity-5 mix-blend-overlay pointer-events-none"></div>
      <Header walletConnected={walletConnected} setWalletConnected={setWalletConnected} />
      <main className="container mx-auto px-4 pt-24 pb-32 relative z-10">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
          Explore Time Capsules
        </h1>
        <p className="text-xl text-center mb-24 text-white">
          Discover trending, AI-powered, and community-favorite time capsules
        </p>
        <div className="flex justify-center">
          <div className="w-full">
            <section className="mb-32 mt-12">
              <h2 className="text-3xl font-bold mb-8 text-white text-center">Featured Capsules</h2>
              <div className="container relative w-full mx-auto">
                <div className="flex flex-wrap sm:flex-nowrap justify-center sm:justify-start items-center gap-6">
                  {featuredCapsules.map((capsule, index) => (
                    <CapsuleCard key={capsule.id} capsule={capsule} index={index} onExplore={handleExplore} />
                  ))}
                </div>
              </div>
            </section>
            <section className="mb-40">
              <h2 className="text-3xl font-bold mb-12 text-white text-center">Smart AI Suggestions</h2>
              <div className="relative max-w-8xl mx-auto px-4">
                <div className="overflow-x-auto pb-4 hide-scrollbar">
                  <div className="flex space-x-8 justify-center min-w-max">
                    {aiSuggestions.map((suggestion) => (
                      <AISuggestionCard
                        key={suggestion.id}
                        title={suggestion.title}
                        description={suggestion.description}
                        category={suggestion.category}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </section>
            <CapsuleInteractionHeatmap />
            <AIAnalyticsSection />
          </div>
        </div>
        {selectedCapsule && (
          <CapsulePopupCard isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)} capsule={selectedCapsule} />
        )}
        <div className="fixed inset-0 z-[-1]">
          {" "}
          {/* Ensure z-index is negative */}
          <Spline scene="https://prod.spline.design/19B-kj-Imlw7hsqG/scene.splinecode" />
        </div>
        <style jsx global>{`
        .glowing-button {
          position: relative;
          width: 120px;
          height: 40px;
          background-color: #000;
          display: flex;
          align-items: center;
          color: white;
          flex-direction: column;
          justify-content: center;
          border: none;
          padding: 12px;
          gap: 12px;
          border-radius: 8px;
          cursor: pointer;
        }

        .glowing-button::before {
          content: '';
          position: absolute;
          inset: 0;
          left: -4px;
          top: -1px;
          margin: auto;
          width: 128px;
          height: 48px;
          border-radius: 10px;
          background: linear-gradient(-45deg, #e81cff 0%, #40c9ff 100% );
          z-index: -10;
          pointer-events: none;
          transition: all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }

        .glowing-button::after {
          content: "";
          z-index: -1;
          position: absolute;
          inset: 0;
          background: linear-gradient(-45deg, #fc00ff 0%, #00dbde 100% );
          transform: translate3d(0, 0, 0) scale(0.95);
          filter: blur(20px);
        }

        .glowing-button:hover::after {
          filter: blur(30px);
        }

        .glowing-button:hover::before {
          transform: rotate(-180deg);
        }

        .glowing-button:active::before {
          scale: 0.7;
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
      </main>
      <FloatingActionButton />
    </div>
  )
}

