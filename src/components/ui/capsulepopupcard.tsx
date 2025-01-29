import type React from "react"
import { motion } from "framer-motion"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"

interface CapsulePopupCardProps {
  isOpen: boolean
  onClose: () => void
  capsule: {
    id: number
    name: string
    description: string
  }
}

const CapsulePopupCard: React.FC<CapsulePopupCardProps> = ({ isOpen, onClose, capsule }) => {
  if (!isOpen) return null

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        className="relative w-[290px] h-[354px] rounded-[30px] bg-[#212121] shadow-[15px_15px_30px_rgb(25,_25,_25),_-15px_-15px_30px_rgb(60,_60,_60)] p-4 flex flex-col justify-between overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-2 right-2 text-white hover:text-gray-300 transition-colors">
          <X size={20} />
        </button>

        <h3 className="text-xl font-semibold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
          {capsule.name}
        </h3>
        <p className="text-sm text-gray-300 mb-4">{capsule.description}</p>

        <div className="text-center mt-auto">
          <p className="text-white mb-4">More details and interactions with this capsule are coming soon!</p>
          <Button
            onClick={onClose}
            className="bg-gradient-to-r from-blue-400 to-purple-600 text-white font-semibold hover:from-purple-600 hover:to-blue-400 transition-all duration-300"
          >
            Close
          </Button>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default CapsulePopupCard

