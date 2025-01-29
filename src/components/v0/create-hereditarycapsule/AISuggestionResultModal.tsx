import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { format } from "date-fns"

interface AISuggestionResultModalProps {
  isOpen: boolean
  onClose: () => void
  suggestedDate: Date
  explanation: string
  onUseDate: (date: Date) => void
  onGenerateAnother: () => void
}

export function AISuggestionResultModal({
  isOpen,
  onClose,
  suggestedDate,
  explanation,
  onUseDate,
  onGenerateAnother,
}: AISuggestionResultModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md bg-[#3f3f3f46] p-6">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
            AI Suggestion Result
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="p-4 rounded-lg bg-white/10">
            <h3 className="text-lg font-semibold text-white mb-2">Suggested Transfer Date:</h3>
            <p className="text-2xl text-purple-400">{format(suggestedDate, "dd/MM/yyyy")}</p>
          </div>
          <div className="p-4 rounded-lg bg-white/10">
            <h3 className="text-lg font-semibold text-white mb-2">Explanation:</h3>
            <p className="text-gray-300">{explanation}</p>
          </div>
          <div className="flex gap-4 mt-6">
            <Button
              onClick={() => onUseDate(suggestedDate)}
              className="flex-1 bg-purple-500 text-white hover:bg-purple-600"
            >
              Use this Date
            </Button>
            <Button
              onClick={onGenerateAnother}
              className="flex-1 bg-white/10 text-white hover:bg-white/20"
            >
              Generate Another
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
} 