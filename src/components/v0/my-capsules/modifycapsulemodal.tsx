import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DatePicker } from "@/components/v0/create-hereditarycapsule/inputs/date-picker"
import { format, differenceInDays, differenceInHours, differenceInMinutes } from "date-fns"
import { Info, Lock, Eye, Globe, Users, Clock, Calendar } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { motion, AnimatePresence } from "framer-motion"

interface ModifyCapsuleModalProps {
  isOpen: boolean
  onClose: () => void
  capsule: {
    id: number
    name: string
    unlockDate: string
    description: string
    visibility: "Public" | "Private" | "DAO-Only"
  }
  onSave: (updatedCapsule: any) => void
}

export function ModifyCapsuleModal({ isOpen, onClose, capsule, onSave }: ModifyCapsuleModalProps) {
  const [unlockDate, setUnlockDate] = useState<Date>(new Date(capsule.unlockDate))
  const [description, setDescription] = useState(capsule.description)
  const [visibility, setVisibility] = useState(capsule.visibility)
  const [isConfirmed, setIsConfirmed] = useState(false)
  const [timeLeft, setTimeLeft] = useState("")
  const [formattedDate, setFormattedDate] = useState(format(new Date(capsule.unlockDate), "dd/MM/yyyy"))

  useEffect(() => {
    const updateTimeLeft = () => {
      const now = new Date()
      const diff = differenceInMinutes(unlockDate, now)

      if (diff <= 0) {
        setTimeLeft("Unlocked")
      } else {
        const days = Math.floor(diff / (24 * 60))
        const hours = Math.floor((diff % (24 * 60)) / 60)
        const minutes = diff % 60
        setTimeLeft(`${days}d ${hours}h ${minutes}m`)
      }

      setFormattedDate(format(unlockDate, "dd/MM/yyyy"))
    }

    updateTimeLeft()
    const timer = setInterval(updateTimeLeft, 60000) // Update every minute

    return () => clearInterval(timer)
  }, [unlockDate])

  const handleSave = () => {
    if (isConfirmed) {
      onSave({
        ...capsule,
        unlockDate: unlockDate.toISOString(),
        description,
        visibility,
        timeLeft,
        formattedDate,
      })
      onClose()
    }
  }

  const getVisibilityIcon = (visibility: string) => {
    switch (visibility) {
      case "Public":
        return <Globe className="h-4 w-4" />
      case "Private":
        return <Lock className="h-4 w-4" />
      case "DAO-Only":
        return <Users className="h-4 w-4" />
      default:
        return <Eye className="h-4 w-4" />
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <Dialog open={isOpen} onOpenChange={onClose}>
          <DialogContent className="sm:max-w-[550px] bg-gradient-to-br from-blue-900 to-purple-900 border-blue-400/30 text-white overflow-y-auto max-h-[90vh]">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-[#d8b04a] to-[#f7e2ad]">
                Modify Capsule Settings
              </DialogTitle>
            </DialogHeader>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="grid gap-6 py-4"
            >
              <div className="bg-blue-400/10 p-4 rounded-lg border border-blue-400/30">
                <p className="text-sm text-blue-200 mb-2">
                  You can adjust your capsule settings before it is locked permanently. Changes will require a
                  blockchain transaction to confirm the update.
                </p>
                <p className="text-sm font-semibold text-blue-400">Modification Fee: 0.005 SOL</p>
              </div>
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-4">
                  <Label htmlFor="unlock-date" className="sm:text-right">
                    Unlock Date
                  </Label>
                  <div className="sm:col-span-3">
                    <DatePicker
                      id="unlock-date"
                      selected={unlockDate}
                      onSelect={(date: Date | undefined) => date && setUnlockDate(date)}
                      minDate={new Date()}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-4">
                  <Label className="sm:text-right">Unlock in</Label>
                  <div className="sm:col-span-3 flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-blue-400" />
                    <span className="text-white">{timeLeft}</span>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-4">
                  <Label className="sm:text-right">Date</Label>
                  <div className="sm:col-span-3 flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-blue-400" />
                    <span className="text-white">{formattedDate}</span>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-4 items-start gap-4">
                  <Label htmlFor="description" className="sm:text-right mt-2">
                    Description
                  </Label>
                  <Textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="sm:col-span-3 bg-black/50 border-blue-400/30 text-white min-h-[100px]"
                    placeholder="Update your capsule description..."
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-4">
                  <Label htmlFor="visibility" className="sm:text-right">
                    Visibility
                  </Label>
                  <Select
                    value={visibility}
                    onValueChange={(value: "Public" | "Private" | "DAO-Only") => setVisibility(value)}
                  >
                    <SelectTrigger className="sm:col-span-3 bg-black/50 border-blue-400/30 text-white">
                      <SelectValue placeholder="Select visibility" />
                    </SelectTrigger>
                    <SelectContent className="bg-black/90 border-blue-400/30">
                      <SelectItem value="Public" className="text-white">
                        <div className="flex items-center">
                          <Globe className="mr-2 h-4 w-4" />
                          Public
                        </div>
                      </SelectItem>
                      <SelectItem value="Private" className="text-white">
                        <div className="flex items-center">
                          <Lock className="mr-2 h-4 w-4" />
                          Private
                        </div>
                      </SelectItem>
                      <SelectItem value="DAO-Only" className="text-white">
                        <div className="flex items-center">
                          <Users className="mr-2 h-4 w-4" />
                          DAO-Only
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex items-center space-x-2 bg-blue-400/5 p-4 rounded-lg border border-blue-400/20">
                <Checkbox
                  id="confirm"
                  checked={isConfirmed}
                  onCheckedChange={(checked) => setIsConfirmed(checked as boolean)}
                  className="border-blue-400 text-blue-400"
                />
                <label
                  htmlFor="confirm"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-blue-200"
                >
                  I understand that modifying this capsule will execute an on-chain transaction.
                </label>
              </div>
            </motion.div>
            <DialogFooter className="flex flex-col sm:flex-row sm:justify-between gap-4 mt-6 pt-6 border-t border-blue-400/20">
              <Button
                onClick={onClose}
                variant="outline"
                className="w-full sm:w-auto bg-transparent border-blue-400 text-blue-400 hover:bg-blue-400/20"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                onClick={handleSave}
                disabled={!isConfirmed}
                className={`w-full sm:w-auto bg-gradient-to-r from-blue-400 to-purple-600 text-white hover:from-blue-500 hover:to-purple-700 transition-all duration-300 ${
                  !isConfirmed ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                Confirm & Pay (0.005 SOL)
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </AnimatePresence>
  )
}

