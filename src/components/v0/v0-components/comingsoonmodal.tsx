import React from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

interface ComingSoonModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  description: string
}

export function ComingSoonModal({ isOpen, onClose, title, description }: ComingSoonModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-gradient-to-br from-black to-gray-900 border-blue-400/50 text-white">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
            {title} - Coming Soon!
          </DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <p className="text-center text-white">{description}</p>
        </div>
        <DialogFooter>
          <Button
            onClick={onClose}
            className="w-full bg-gradient-to-r from-blue-400 to-purple-600 text-white font-semibold hover:from-purple-600 hover:to-blue-400 transition-all duration-300"
          >
            Got it!
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

