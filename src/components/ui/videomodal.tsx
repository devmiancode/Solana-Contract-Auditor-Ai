import { Dialog, DialogContent } from "@/components/ui/dialog"

interface VideoModalProps {
  isOpen: boolean
  onClose: () => void
}

export function VideoModal({ isOpen, onClose }: VideoModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] p-0 bg-black">
        <video
          src="/lol.mp4"
          controls
          autoPlay
          className="w-full h-auto"
        >
          Your browser does not support the video tag.
        </video>
      </DialogContent>
    </Dialog>
  )
}

