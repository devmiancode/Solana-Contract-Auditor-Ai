import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, Calendar, TrendingUp, ChevronRight, Shield, Clock } from "lucide-react"
import { motion } from "framer-motion"
import { format } from "date-fns"
import AI_hereditary_cards from "@/components/v0/v0-components/aihereditarycards"
import { AISuggestedTransferWindowModal } from "@/components/v0/create-hereditarycapsule/AISuggestedTransferWindowModal"

function useIntersectionObserver(options = {}) {
  const [isIntersecting, setIsIntersecting] = useState(false)
  const targetRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting)
    }, options)

    if (targetRef.current) {
      observer.observe(targetRef.current)
    }

    return () => {
      if (targetRef.current) {
        observer.unobserve(targetRef.current)
      }
    }
  }, [options])

  return [targetRef, isIntersecting]
}

// Mock data for demonstration
const mockWalletInactivity = {
  lastTransaction: "3 days ago",
  securityRiskLevel: "Low",
  activityTrend: "Decreasing",
}

const mockTransferWindow = {
  optimalDate: (() => {
    const futureDate = new Date()
    futureDate.setFullYear(futureDate.getFullYear() + 1)
    return futureDate.toISOString().split("T")[0]
  })(),
  beneficiaryStatus: "Active",
  riskDetected: false,
}

const mockEstatePlanningInsights = {
  transferMethod: "Gradual",
  recommendedCrypto: "SOL",
  distributionMechanism: "Multi-Signature",
}

interface AIInsightsPanelProps {
  selectedDate: Date | null;
  onDateSuggestion: (date: Date, formattedDate: string) => void;
}

interface FormData {
  // Define los campos que esperas en formData
  date?: string;
  preferences?: string;
}

export function AIInsightsPanel({ selectedDate, onDateSuggestion }: AIInsightsPanelProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [walletInactivity, setWalletInactivity] = useState(mockWalletInactivity)
  const [transferWindow, setTransferWindow] = useState(mockTransferWindow)
  const [estatePlanningInsights, setEstatePlanningInsights] = useState(mockEstatePlanningInsights)

  const [ref1, isVisible1] = useIntersectionObserver({ threshold: 0.1 })
  const [ref2, isVisible2] = useIntersectionObserver({ threshold: 0.1 })
  const [ref3, isVisible3] = useIntersectionObserver({ threshold: 0.1 })

  useEffect(() => {
    // In a real application, this would fetch data based on the selected date
    console.log("Selected date changed:", selectedDate)
    // For now, we'll just use the mock data
  }, [selectedDate])

  const handleDateSuggestion = () => {
    const suggestedDate = new Date(transferWindow.optimalDate)
    const formattedDate = format(suggestedDate, "dd/MM/yyyy")
    onDateSuggestion(suggestedDate, formattedDate)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const handleFormSubmit = (formData: FormData) => {
    // Here you would typically send the formData to an API to get the AI suggestion
    // For now, we'll just use a mock function to simulate this
    const suggestedDate = mockAISuggestion(formData)
    setTransferWindow({ ...transferWindow, optimalDate: suggestedDate })
    setIsModalOpen(false)
  }

  const MotionCard = motion(Card)

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <AI_hereditary_cards
        title="AI Wallet Inactivity Monitoring"
        className="w-full h-full"
        content={
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-400">Last Transaction:</span>
              <Badge variant="outline" className="bg-blue-500/20 text-blue-400">
                {walletInactivity.lastTransaction}
              </Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-400">Security Risk Level:</span>
              <Badge variant="outline" className="bg-green-500/20 text-green-400">
                {walletInactivity.securityRiskLevel}
              </Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-400">Activity Trend:</span>
              <Badge variant="outline" className="bg-yellow-500/20 text-yellow-400">
                {walletInactivity.activityTrend}
              </Badge>
            </div>
          </div>
        }
      />

      <AI_hereditary_cards
        title="AI-Suggested Transfer Window"
        className="w-full h-full"
        content={
          <div className="space-y-4">
            <p className="text-sm text-gray-400 mb-2">Generate optimal inheritance execution date:</p>
            <div className="flex flex-col items-center gap-4">
              <Button
                onClick={() => setIsModalOpen(true)}
                className="bg-purple-500 text-white hover:bg-purple-600 text-lg py-2 px-4"
              >
                Generate Date
              </Button>
              {transferWindow.optimalDate && (
                <p className="text-lg text-purple-400">
                  Optimal Date: {format(new Date(transferWindow.optimalDate), "dd/MM/yyyy")}
                </p>
              )}
              <div className="flex justify-between items-center w-full">
                <span className="text-sm text-gray-400">Beneficiary Wallet:</span>
                <Badge variant="outline" className="bg-green-500/20 text-green-400">
                  {transferWindow.beneficiaryStatus}
                </Badge>
              </div>
              <div className="flex justify-between items-center w-full">
                <span className="text-sm text-gray-400">Risk Detected:</span>
                <Badge
                  variant="outline"
                  className={
                    transferWindow.riskDetected ? "bg-red-500/20 text-red-400" : "bg-green-500/20 text-green-400"
                  }
                >
                  {transferWindow.riskDetected ? "Yes" : "No"}
                </Badge>
              </div>
              {/* <Button
                onClick={handleDateSuggestion}
                className="bg-purple-500 text-white hover:bg-purple-600 text-sm w-full transition-all duration-300 flex items-center justify-center"
              >
                Use This Date ({format(new Date(transferWindow.optimalDate), "dd/MM/yyyy")})
                <ChevronRight className="ml-2 w-4 h-4" />
              </Button> */}
            </div>
          </div>
        }
      />

      <AI_hereditary_cards
        title="AI Estate Planning Insights"
        className="w-full h-full"
        content={
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-400">Transfer Method:</span>
              <Badge variant="outline" className="bg-purple-500/20 text-purple-400">
                {estatePlanningInsights.transferMethod}
              </Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-400">Recommended Crypto:</span>
              <Badge variant="outline" className="bg-blue-500/20 text-blue-400">
                {estatePlanningInsights.recommendedCrypto}
              </Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-400">Distribution Mechanism:</span>
              <Badge variant="outline" className="bg-green-500/20 text-green-400">
                {estatePlanningInsights.distributionMechanism}
              </Badge>
            </div>
          </div>
        }
      />
      <AISuggestedTransferWindowModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleFormSubmit}
      />
    </div>
  )
}

// Mock function to simulate AI suggestion
function mockAISuggestion(formData: FormData): string {
  // This is a placeholder. In a real application, this would be replaced with an actual API call
  const currentDate = new Date()
  currentDate.setFullYear(currentDate.getFullYear() + 1) // Add 1 year
  return currentDate.toISOString()
}

