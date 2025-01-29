import type React from "react"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ChevronDown, ChevronUp, Eye, MessageSquare, ThumbsUp, Clock } from "lucide-react"

// Mock data for demonstration
const mockData = {
  liveActivity: {
    last24h: { views: 1234, comments: 567, upvotes: 890 },
    last7d: { views: 8765, comments: 4321, upvotes: 6543 },
    last30d: { views: 34567, comments: 23456, upvotes: 45678 },
  },
  mostDiscussed: [
    { id: 1, name: "Bitcoin 2030", engagement: 95 },
    { id: 2, name: "AI Singularity Prediction", engagement: 88 },
    { id: 3, name: "Climate Change Time Capsule", engagement: 82 },
  ],
  recentlyUnlocked: [
    { id: 4, name: "Web3 Adoption Rates 2023", unlockDate: "2025-01-05" },
    { id: 5, name: "NFT Market Analysis", unlockDate: "2025-01-10" },
    { id: 6, name: "DeFi Yield Strategies", unlockDate: "2025-01-15" },
  ],
  upcomingUnlocks: [
    { id: 7, name: "Quantum Computing Impact", unlockDate: "2025-07-15" },
    { id: 8, name: "Metaverse Real Estate Forecast", unlockDate: "2025-08-20" },
    { id: 9, name: "Crypto Regulation Predictions", unlockDate: "2025-09-25" },
  ],
}

const CapsuleInteractionHeatmap: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false)

  const getEngagementColor = (engagement: number) => {
    if (engagement >= 90) return "bg-red-500"
    if (engagement >= 70) return "bg-yellow-500"
    return "bg-green-500"
  }

  return (
    <Card className="w-full bg-gradient-to-br from-blue-400 to-purple-600 border-purple-600/20 overflow-hidden pb-30">
      <CardHeader className="cursor-pointer" onClick={() => setIsExpanded(!isExpanded)}>
        <CardTitle className="text-2xl font-bold text-white flex items-center justify-between">
          Capsule Interaction Heatmap
          {isExpanded ? <ChevronUp className="w-6 h-6" /> : <ChevronDown className="w-6 h-6" />}
        </CardTitle>
      </CardHeader>
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <CardContent className="p-6 space-y-6">
              {/* Live Activity Metrics */}
              <div className="bg-black/30 p-4 rounded-lg">
                <h3 className="text-xl font-semibold text-white mb-4">Live Activity Metrics</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {Object.entries(mockData.liveActivity).map(([period, data]) => (
                    <div key={period} className="bg-blue-400/20 p-3 rounded-lg">
                      <h4 className="text-lg font-medium text-white mb-2">Last {period.slice(4)}</h4>
                      <div className="flex justify-between items-center">
                        <span className="text-white flex items-center">
                          <Eye className="w-4 h-4 mr-1" /> {data.views}
                        </span>
                        <span className="text-white flex items-center">
                          <MessageSquare className="w-4 h-4 mr-1" /> {data.comments}
                        </span>
                        <span className="text-white flex items-center">
                          <ThumbsUp className="w-4 h-4 mr-1" /> {data.upvotes}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Most Discussed Capsules */}
              <div className="bg-black/30 p-4 rounded-lg">
                <h3 className="text-xl font-semibold text-white mb-4">Most Discussed Capsules</h3>
                <div className="space-y-2">
                  {mockData.mostDiscussed.map((capsule) => (
                    <div key={capsule.id} className="flex justify-between items-center bg-purple-600/20 p-3 rounded-lg">
                      <span className="text-white font-medium">{capsule.name}</span>
                      <Badge className={`${getEngagementColor(capsule.engagement)} text-white`}>
                        {capsule.engagement}% 🔥
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recently Unlocked Capsules */}
              <div className="bg-black/30 p-4 rounded-lg">
                <h3 className="text-xl font-semibold text-white mb-4">Recently Unlocked Capsules</h3>
                <div className="space-y-2">
                  {mockData.recentlyUnlocked.map((capsule) => (
                    <div key={capsule.id} className="flex justify-between items-center bg-blue-400/20 p-3 rounded-lg">
                      <span className="text-white font-medium">{capsule.name}</span>
                      <Badge variant="outline" className="bg-green-500/20 text-green-400">
                        Unlocked on {capsule.unlockDate}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>

              {/* Upcoming Unlocks to Watch */}
              <div className="bg-black/30 p-4 rounded-lg">
                <h3 className="text-xl font-semibold text-white mb-4">Upcoming Unlocks to Watch</h3>
                <div className="space-y-2">
                  {mockData.upcomingUnlocks.map((capsule) => (
                    <div key={capsule.id} className="flex justify-between items-center bg-purple-600/20 p-3 rounded-lg">
                      <span className="text-white font-medium">{capsule.name}</span>
                      <Badge variant="outline" className="bg-yellow-500/20 text-yellow-400 flex items-center">
                        <Clock className="w-4 h-4 mr-1" /> Unlocks on {capsule.unlockDate}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  )
}

export default CapsuleInteractionHeatmap

