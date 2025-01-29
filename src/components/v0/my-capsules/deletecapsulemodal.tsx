import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { AlertTriangle, Clock, Info } from "lucide-react"

interface DeleteCapsuleModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  capsuleName: string
  capsuleType: string
  unlockCountdown: string
}

export function DeleteCapsuleModal({
  isOpen,
  onClose,
  onConfirm,
  capsuleName,
  capsuleType,
  unlockCountdown,
}: DeleteCapsuleModalProps) {
  const [isConfirmed, setIsConfirmed] = useState(false)

  const handleConfirm = () => {
    if (isConfirmed) {
      onConfirm()
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-[calc(100vw-2rem)] max-w-[550px] sm:max-w-[90vw] md:max-w-[550px] bg-gradient-to-br from-blue-900 to-purple-900 border-blue-400/30 text-white overflow-y-auto max-h-[90vh] rounded-lg shadow-xl">
        <DialogHeader className="border-b border-blue-400/20 pb-4">
          <DialogTitle className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
            <AlertTriangle className="w-8 h-8 text-red-500" />
            Confirm Capsule Deletion
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-6 py-6 px-2 sm:px-4">
          <div className="bg-blue-900/20 border border-blue-500/50 rounded-lg p-4 shadow-inner">
            <p className="text-sm sm:text-base text-blue-300 font-semibold">
              Warning: This action is irreversible and requires a blockchain transaction.
            </p>
          </div>

          <div className="bg-blue-400/10 p-4 rounded-lg border border-blue-400/30 shadow-md">
            <h3 className="font-semibold text-base sm:text-lg text-white mb-2 flex items-center gap-2">
              <Info className="w-5 h-5 text-blue-400" />
              Capsule Details
            </h3>
            <p className="text-sm sm:text-base text-blue-200 mb-2">
              <span className="font-semibold">Name:</span> {capsuleName}
            </p>
            <p className="text-sm sm:text-base text-blue-200 mb-2">
              <span className="font-semibold">Type:</span> {capsuleType}
            </p>
            <p className="text-sm sm:text-base text-blue-200 flex items-center gap-2">
              <Clock className="w-4 h-4 text-blue-400" />
              <span className="font-semibold">Unlocks in:</span> {unlockCountdown}
            </p>
          </div>

          <div className="space-y-2">
            <p className="text-sm sm:text-base text-blue-200">
              A network processing fee of <span className="font-bold text-blue-400">0.01 SOL</span> will be deducted to
              execute the deletion.
            </p>
            <p className="text-sm sm:text-base text-blue-200">
              If this capsule contains NFTs, funds, or smart contract executions, they will be permanently lost.
            </p>
          </div>

          <div className="flex items-center space-x-2 bg-blue-400/5 p-3 rounded-lg border border-blue-400/20">
            <Checkbox
              id="confirm"
              checked={isConfirmed}
              onCheckedChange={(checked) => setIsConfirmed(checked as boolean)}
              className="border-blue-400 text-blue-400 focus:ring-blue-400"
            />
            <label
              htmlFor="confirm"
              className="text-xs sm:text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-blue-200"
            >
              I understand that deleting this capsule is permanent and requires a Solana transaction.
            </label>
          </div>
        </div>
        <DialogFooter className="flex flex-col sm:flex-row sm:justify-between gap-4 mt-4 border-t border-blue-400/20 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            className="w-full sm:w-auto bg-transparent border-blue-400 text-blue-400 hover:bg-blue-400/20 text-sm sm:text-base transition-all duration-300"
          >
            Cancel
          </Button>
          <Button
            type="button"
            onClick={handleConfirm}
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
  )
}

