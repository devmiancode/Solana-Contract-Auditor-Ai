import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { VideoModal } from "@/components/ui/videomodal"
import { generateDateSuggestion } from "@/utils/openai"
import { AISuggestionResultModal } from "./AISuggestionResultModal"

interface AISuggestedTransferWindowModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (date: Date) => void
}

export function AISuggestedTransferWindowModal({ isOpen, onClose, onSubmit }: AISuggestedTransferWindowModalProps) {
  const [formData, setFormData] = useState({
    age: "",
    gender: "",
    maritalStatus: "",
    occupation: "",
    residence: "",
    chronicDiseases: "",
    familyHistory: "",
    recentSurgeries: "",
    medications: "",
    smoking: "",
    alcohol: "",
    drugs: "",
    physicalActivity: "",
    diet: "",
    height: "",
    weight: "",
    bloodPressure: "",
    cholesterol: "",
    bloodTestResults: "",
    travelHistory: "",
    extremeSports: "",
    stress: "",
  })

  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [showResultModal, setShowResultModal] = useState(false)
  const [aiResult, setAiResult] = useState<{ suggestedDate: Date; explanation: string } | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      const result = await generateDateSuggestion(formData)
      setAiResult(result)
      setShowResultModal(true)
    } catch (error) {
      setError("Error generating suggestion. Please try again.")
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleUseDate = (date: Date) => {
    onSubmit(date)
    setShowResultModal(false)
    onClose()
  }

  const handleGenerateAnother = () => {
    setShowResultModal(false)
  }

  useEffect(() => {
    if (!isOpen) {
      setIsLoading(false)
    }
  }, [isOpen])

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-[#3f3f3f46] p-0">
        <DialogHeader className="p-6 pb-0">
          <DialogTitle className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
            AI-Suggested Transfer Window
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6 p-6">
          <Card className="w-full bg-gradient-to-br from-blue-400 to-purple-600 border-none shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-white">Personal Information</CardTitle>
              <CardDescription className="text-white/80">
                Please provide your personal and demographic information.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="age" className="text-white font-semibold">
                    Age
                  </Label>
                  <Input
                    id="age"
                    name="age"
                    value={formData.age}
                    onChange={handleChange}
                    className="bg-white/10 text-white border-white/20 placeholder-white/50 focus:border-white/50"
                  />
                </div>
                <div>
                  <Label htmlFor="gender" className="text-white font-semibold">
                    Gender
                  </Label>
                  <Select
                    name="gender"
                    value={formData.gender}
                    onValueChange={(value) => {
                      handleChange({ target: { name: "gender", value } } as any)
                      if (value === "other") {
                        setIsVideoModalOpen(true)
                      }
                    }}
                  >
                    <SelectTrigger className="bg-white/10 text-white border-white/20 placeholder-white/50 focus:border-white/50">
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="other">Other 🤡</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              {/* ... rest of the form fields ... */}
              <div>
                <Label htmlFor="maritalStatus" className="text-white font-semibold">
                  Marital Status
                </Label>
                <Input
                  id="maritalStatus"
                  name="maritalStatus"
                  value={formData.maritalStatus}
                  onChange={handleChange}
                  className="bg-white/10 text-white border-white/20 placeholder-white/50 focus:border-white/50"
                />
              </div>
              <div>
                <Label htmlFor="occupation" className="text-white font-semibold">
                  Occupation
                </Label>
                <Input
                  id="occupation"
                  name="occupation"
                  value={formData.occupation}
                  onChange={handleChange}
                  className="bg-white/10 text-white border-white/20 placeholder-white/50 focus:border-white/50"
                />
              </div>
              <div>
                <Label htmlFor="residence" className="text-white font-semibold">
                  Place of Residence
                </Label>
                <Input
                  id="residence"
                  name="residence"
                  value={formData.residence}
                  onChange={handleChange}
                  className="bg-white/10 text-white border-white/20 placeholder-white/50 focus:border-white/50"
                />
              </div>
            </CardContent>
          </Card>

          <Card className="w-full bg-gradient-to-br from-blue-400 to-purple-600 border-none shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-white">Medical History</CardTitle>
              <CardDescription className="text-white/80">
                Please provide information about your medical history.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="chronicDiseases" className="text-white font-semibold">
                  Chronic Diseases
                </Label>
                <Textarea
                  id="chronicDiseases"
                  name="chronicDiseases"
                  value={formData.chronicDiseases}
                  onChange={handleChange}
                  className="bg-white/10 text-white border-white/20 placeholder-white/50 focus:border-white/50"
                />
              </div>
              <div>
                <Label htmlFor="familyHistory" className="text-white font-semibold">
                  Family History
                </Label>
                <Textarea
                  id="familyHistory"
                  name="familyHistory"
                  value={formData.familyHistory}
                  onChange={handleChange}
                  className="bg-white/10 text-white border-white/20 placeholder-white/50 focus:border-white/50"
                />
              </div>
              <div>
                <Label htmlFor="recentSurgeries" className="text-white font-semibold">
                  Recent Surgeries
                </Label>
                <Textarea
                  id="recentSurgeries"
                  name="recentSurgeries"
                  value={formData.recentSurgeries}
                  onChange={handleChange}
                  className="bg-white/10 text-white border-white/20 placeholder-white/50 focus:border-white/50"
                />
              </div>
              <div>
                <Label htmlFor="medications" className="text-white font-semibold">
                  Medications
                </Label>
                <Textarea
                  id="medications"
                  name="medications"
                  value={formData.medications}
                  onChange={handleChange}
                  className="bg-white/10 text-white border-white/20 placeholder-white/50 focus:border-white/50"
                />
              </div>
            </CardContent>
          </Card>

          <Card className="w-full bg-gradient-to-br from-blue-400 to-purple-600 border-none shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-white">Habits and Lifestyle</CardTitle>
              <CardDescription className="text-white/80">
                Please provide information about your habits and lifestyle.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="smoking" className="text-white font-semibold">
                  Smoking Habits
                </Label>
                <Input
                  id="smoking"
                  name="smoking"
                  value={formData.smoking}
                  onChange={handleChange}
                  className="bg-white/10 text-white border-white/20 placeholder-white/50 focus:border-white/50"
                />
              </div>
              <div>
                <Label htmlFor="alcohol" className="text-white font-semibold">
                  Alcohol Consumption
                </Label>
                <Input
                  id="alcohol"
                  name="alcohol"
                  value={formData.alcohol}
                  onChange={handleChange}
                  className="bg-white/10 text-white border-white/20 placeholder-white/50 focus:border-white/50"
                />
              </div>
              <div>
                <Label htmlFor="drugs" className="text-white font-semibold">
                  Recreational Drug Use
                </Label>
                <Input
                  id="drugs"
                  name="drugs"
                  value={formData.drugs}
                  onChange={handleChange}
                  className="bg-white/10 text-white border-white/20 placeholder-white/50 focus:border-white/50"
                />
              </div>
              <div>
                <Label htmlFor="physicalActivity" className="text-white font-semibold">
                  Physical Activity
                </Label>
                <Input
                  id="physicalActivity"
                  name="physicalActivity"
                  value={formData.physicalActivity}
                  onChange={handleChange}
                  className="bg-white/10 text-white border-white/20 placeholder-white/50 focus:border-white/50"
                />
              </div>
              <div>
                <Label htmlFor="diet" className="text-white font-semibold">
                  Diet
                </Label>
                <Input
                  id="diet"
                  name="diet"
                  value={formData.diet}
                  onChange={handleChange}
                  className="bg-white/10 text-white border-white/20 placeholder-white/50 focus:border-white/50"
                />
              </div>
            </CardContent>
          </Card>

          <Card className="w-full bg-gradient-to-br from-blue-400 to-purple-600 border-none shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-white">Health Indices</CardTitle>
              <CardDescription className="text-white/80">Please provide your health indices.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="height" className="text-white font-semibold">
                    Height (cm)
                  </Label>
                  <Input
                    id="height"
                    name="height"
                    value={formData.height}
                    onChange={handleChange}
                    className="bg-white/10 text-white border-white/20 placeholder-white/50 focus:border-white/50"
                  />
                </div>
                <div>
                  <Label htmlFor="weight" className="text-white font-semibold">
                    Weight (kg)
                  </Label>
                  <Input
                    id="weight"
                    name="weight"
                    value={formData.weight}
                    onChange={handleChange}
                    className="bg-white/10 text-white border-white/20 placeholder-white/50 focus:border-white/50"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="bloodPressure" className="text-white font-semibold">
                  Blood Pressure
                </Label>
                <Input
                  id="bloodPressure"
                  name="bloodPressure"
                  value={formData.bloodPressure}
                  onChange={handleChange}
                  className="bg-white/10 text-white border-white/20 placeholder-white/50 focus:border-white/50"
                />
              </div>
              <div>
                <Label htmlFor="cholesterol" className="text-white font-semibold">
                  Cholesterol Level
                </Label>
                <Input
                  id="cholesterol"
                  name="cholesterol"
                  value={formData.cholesterol}
                  onChange={handleChange}
                  className="bg-white/10 text-white border-white/20 placeholder-white/50 focus:border-white/50"
                />
              </div>
              <div>
                <Label htmlFor="bloodTestResults" className="text-white font-semibold">
                  Recent Blood Test Results
                </Label>
                <Textarea
                  id="bloodTestResults"
                  name="bloodTestResults"
                  value={formData.bloodTestResults}
                  onChange={handleChange}
                  className="bg-white/10 text-white border-white/20 placeholder-white/50 focus:border-white/50"
                />
              </div>
            </CardContent>
          </Card>

          <Card className="w-full bg-gradient-to-br from-blue-400 to-purple-600 border-none shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-white">Life History and Risk Habits</CardTitle>
              <CardDescription className="text-white/80">
                Please provide information about your life history and risk habits.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="travelHistory" className="text-white font-semibold">
                  Travel History
                </Label>
                <Textarea
                  id="travelHistory"
                  name="travelHistory"
                  value={formData.travelHistory}
                  onChange={handleChange}
                  className="bg-white/10 text-white border-white/20 placeholder-white/50 focus:border-white/50"
                />
              </div>
              <div>
                <Label htmlFor="extremeSports" className="text-white font-semibold">
                  Extreme Sports or Dangerous Activities
                </Label>
                <Textarea
                  id="extremeSports"
                  name="extremeSports"
                  value={formData.extremeSports}
                  onChange={handleChange}
                  className="bg-white/10 text-white border-white/20 placeholder-white/50 focus:border-white/50"
                />
              </div>
              <div>
                <Label htmlFor="stress" className="text-white font-semibold">
                  Stress or Psychological Problems
                </Label>
                <Textarea
                  id="stress"
                  name="stress"
                  value={formData.stress}
                  onChange={handleChange}
                  className="bg-white/10 text-white border-white/20 placeholder-white/50 focus:border-white/50"
                />
              </div>
            </CardContent>
          </Card>

          {error && <p className="text-red-500">{error}</p>}
          
          <Button 
            type="submit" 
            disabled={isLoading}
            className="w-full bg-white text-purple-600 hover:bg-white/90"
          >
            {isLoading ? "Generating..." : "Generate Suggested Date"}
          </Button>
        </form>
        <VideoModal isOpen={isVideoModalOpen} onClose={() => setIsVideoModalOpen(false)} />
        {aiResult && (
          <AISuggestionResultModal
            isOpen={showResultModal}
            onClose={() => setShowResultModal(false)}
            suggestedDate={aiResult.suggestedDate}
            explanation={aiResult.explanation}
            onUseDate={handleUseDate}
            onGenerateAnother={handleGenerateAnother}
          />
        )}
      </DialogContent>
    </Dialog>
  )
}

