"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Plus, X, Brain } from "lucide-react"
import { useRouter } from "next/navigation"

const aiSuggestions = [
  "Create a DeFi prediction capsule",
  "Start a historical crypto events archive",
  "Launch an NFT time vault",
  "Begin a blockchain development roadmap",
  "Initiate a market trends forecast",
]

export function FloatingActionButton() {
  const [isExpanded, setIsExpanded] = useState(false)
  const [currentSuggestion, setCurrentSuggestion] = useState("")
  const router = useRouter()

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSuggestion(aiSuggestions[Math.floor(Math.random() * aiSuggestions.length)])
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const handleCreateCapsule = () => {
    router.push("/create-capsule")
  }

  return (
    <motion.div
      className="fixed bottom-4 right-4 z-50"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
    >
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="mb-4"
          >
            <Card className="bg-gradient-to-r from-blue-600 to-purple-600 border-white/30 shadow-lg shadow-purple-500/20">
              <CardContent className="p-4">
                <h3 className="text-lg font-semibold text-white mb-2">AI Suggestion:</h3>
                <p className="text-white mb-4">{currentSuggestion}</p>
                <Button
                  onClick={handleCreateCapsule}
                  className="w-full bg-white text-blue-600 hover:bg-blue-100 transition-colors duration-300"
                >
                  Create This Capsule
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
      <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
        <Button
          size="lg"
          className={`rounded-full w-16 h-16 ${
            isExpanded
              ? "bg-red-500 hover:bg-red-600"
              : "bg-gradient-to-r from-[#3b82f6] to-[#7c3aed] hover:from-[#2563eb] hover:to-[#6d28d9]"
          } text-white shadow-lg transition-colors duration-300`}
          onClick={() => setIsExpanded(!isExpanded)}
          style={{
            background: "linear-gradient(45deg, #3b82f6, #7c3aed)",
            color: "white",
          }}
        >
          {isExpanded ? <X size={24} /> : <Plus size={24} />}
        </Button>
      </motion.div>
    </motion.div>
  )
}

