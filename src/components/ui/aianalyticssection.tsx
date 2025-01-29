"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { TrendingUp, AlertTriangle, CheckCircle, BarChart2 } from "lucide-react"
import dynamic from "next/dynamic"

const DynamicLineChart = dynamic(() => import("./linechart"), { ssr: false })

const trendingCategoriesData = [
  { name: "Hereditary", value: 45, category: "hereditary" },
  { name: "Messages", value: 35, category: "messages" },
  { name: "Smart Contracts", value: 35, category: "smart-contracts" },
  { name: "NFT Vaults", value: 25, category: "nft" },
]

const marketPredictionsData = [
  { title: "Time Capsule Messages 2025", accuracy: 92, risk: "low", category: "messages" },
  { title: "Future Event Messages", accuracy: 88, risk: "medium", category: "messages" },
  { title: "Personal Growth Messages", accuracy: 85, risk: "low", category: "messages" },
]

const pastPredictionsData = [
  { title: "NFT Market Boom 2021", accuracy: 98, category: "nft" },
  { title: "Crypto Winter 2022", accuracy: 95, category: "crypto" },
  { title: "Layer 2 Solutions Growth", accuracy: 93, category: "crypto" },
]

const riskAdjustedCapsulesData = [
  { title: "Metaverse Land Value 2030", risk: "high", accuracy: 75, category: "metaverse" },
  { title: "Central Bank Digital Currencies Adoption", risk: "medium", accuracy: 82, category: "crypto" },
  { title: "Quantum Computing Impact on Blockchain", risk: "high", accuracy: 70, category: "crypto" },
]

export default function AIAnalyticsSection() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedRiskLevel, setSelectedRiskLevel] = useState("all")

  const filterData = (data: any[], categoryFilter: string, riskFilter: string) => {
    return data.filter((item) => {
      const categoryMatch = categoryFilter === "all" || item.category === categoryFilter
      const riskMatch = riskFilter === "all" || item.risk === riskFilter
      return categoryMatch && riskMatch
    })
  }

  const trendingCategories = filterData(trendingCategoriesData, selectedCategory, selectedRiskLevel)
  const marketPredictions = filterData(marketPredictionsData, selectedCategory, selectedRiskLevel)
  const pastPredictions = filterData(pastPredictionsData, selectedCategory, selectedRiskLevel)
  const riskAdjustedCapsules = filterData(riskAdjustedCapsulesData, selectedCategory, selectedRiskLevel)

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-40 mt-40"
    >
      <h2 className="text-3xl font-bold mb-12 text-white text-center">AI Analytics Dashboard</h2>
      <Card className="bg-gradient-to-br from-blue-400/50 to-purple-600/50 border-purple-600/20">
        <CardContent className="p-6">
          <Tabs defaultValue="trending" className="w-full">
            <TabsList className="grid w-full grid-cols-4 bg-black/50 rounded-lg p-1">
              <TabsTrigger
                value="trending"
                className="text-white data-[state=active]:bg-blue-400 data-[state=active]:text-black"
              >
                Trending Categories
              </TabsTrigger>
              <TabsTrigger
                value="predictions"
                className="text-white data-[state=active]:bg-blue-400 data-[state=active]:text-black"
              >
                Messages
              </TabsTrigger>
              <TabsTrigger
                value="past"
                className="text-white data-[state=active]:bg-blue-400 data-[state=active]:text-black"
              >
                Past Predictions
              </TabsTrigger>
              <TabsTrigger
                value="risk"
                className="text-white data-[state=active]:bg-blue-400 data-[state=active]:text-black"
              >
                Risk-Adjusted
              </TabsTrigger>
            </TabsList>
            <div className="mt-6">
              <TabsContent value="trending">
                <Card className="bg-blue-950/30 border-blue-500/20">
                  <CardHeader>
                    <CardTitle className="text-2xl text-white flex items-center">
                      <BarChart2 className="w-6 h-6 mr-2 text-blue-400" />
                      Top Trending Capsule Categories
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80 w-full">
                      <DynamicLineChart data={trendingCategories} />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="predictions">
                <Card className="bg-blue-950/30 border-blue-500/20">
                  <CardHeader>
                    <CardTitle className="text-2xl text-white flex items-center">
                      <TrendingUp className="w-6 h-6 mr-2 text-blue-400" />
                      AI-Generated Message Insights
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {marketPredictions.map((message, index) => (
                        <div key={index} className="flex justify-between items-center bg-blue-900/20 p-4 rounded-lg">
                          <span className="text-white font-semibold">{message.title}</span>
                          <div className="flex items-center space-x-2">
                            <Badge variant="outline" className="bg-green-500/20 text-green-400">
                              {message.accuracy}% Accurate
                            </Badge>
                            <Badge
                              variant="outline"
                              className={
                                message.risk === "low"
                                  ? "bg-green-500/20 text-green-400"
                                  : message.risk === "medium"
                                    ? "bg-yellow-500/20 text-yellow-400"
                                    : "bg-red-500/20 text-red-400"
                              }
                            >
                              {message.risk} risk
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="past">
                <Card className="bg-blue-950/30 border-blue-500/20">
                  <CardHeader>
                    <CardTitle className="text-2xl text-white flex items-center">
                      <CheckCircle className="w-6 h-6 mr-2 text-green-400" />
                      Most Accurate Past Predictions
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {pastPredictions.map((prediction, index) => (
                        <div key={index} className="flex justify-between items-center bg-blue-900/20 p-4 rounded-lg">
                          <span className="text-white font-semibold">{prediction.title}</span>
                          <Badge variant="outline" className="bg-green-500/20 text-green-400">
                            {prediction.accuracy}% Accurate
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="risk">
                <Card className="bg-blue-950/30 border-blue-500/20">
                  <CardHeader>
                    <CardTitle className="text-2xl text-white flex items-center">
                      <AlertTriangle className="w-6 h-6 mr-2 text-yellow-400" />
                      Risk-Adjusted Capsules
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {riskAdjustedCapsules.map((capsule, index) => (
                        <div key={index} className="flex justify-between items-center bg-blue-900/20 p-4 rounded-lg">
                          <span className="text-white font-semibold">{capsule.title}</span>
                          <div className="flex items-center space-x-2">
                            <Badge
                              variant="outline"
                              className={
                                capsule.risk === "low"
                                  ? "bg-green-500/20 text-green-400"
                                  : capsule.risk === "medium"
                                    ? "bg-yellow-500/20 text-yellow-400"
                                    : "bg-red-500/20 text-red-400"
                              }
                            >
                              {capsule.risk} risk
                            </Badge>
                            <Badge variant="outline" className="bg-blue-500/20 text-blue-400">
                              {capsule.accuracy}% Accuracy
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </div>
          </Tabs>
          <div className="mt-6 flex justify-between">
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-[200px] bg-black/50 text-white border-purple-600/20">
                <SelectValue placeholder="Filter by Category" />
              </SelectTrigger>
              <SelectContent className="bg-black/90 border-purple-600/20">
                <SelectItem value="all" className="text-white">
                  All Categories
                </SelectItem>
                <SelectItem value="crypto" className="text-white">
                  Crypto Predictions
                </SelectItem>
                <SelectItem value="nft" className="text-white">
                  NFT Vaults
                </SelectItem>
                <SelectItem value="smart-contracts" className="text-white">
                  Smart Contracts
                </SelectItem>
                <SelectItem value="hereditary" className="text-white">
                  Hereditary
                </SelectItem>
                <SelectItem value="messages" className="text-white">
                  Messages
                </SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedRiskLevel} onValueChange={setSelectedRiskLevel}>
              <SelectTrigger className="w-[200px] bg-black/50 text-white border-purple-600/20">
                <SelectValue placeholder="Filter by Risk Level" />
              </SelectTrigger>
              <SelectContent className="bg-black/90 border-purple-600/20">
                <SelectItem value="all" className="text-white">
                  All Risk Levels
                </SelectItem>
                <SelectItem value="low" className="text-white">
                  Low Risk
                </SelectItem>
                <SelectItem value="medium" className="text-white">
                  Medium Risk
                </SelectItem>
                <SelectItem value="high" className="text-white">
                  High Risk
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>
    </motion.section>
  )
}

