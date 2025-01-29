import { motion, AnimatePresence } from "framer-motion"
import { CheckCircle, Eye, Plus } from "lucide-react"
import { useEffect } from "react"
import { useRouter } from "next/navigation"

interface PopUpProps {
  isVisible: boolean
  onClose: () => void
}

export const PopUp: React.FC<PopUpProps> = ({ isVisible, onClose }) => {
  const router = useRouter();

  useEffect(() => {
    if (isVisible) {
      // Disable scrolling on the body when the popup is visible
      document.body.style.overflow = "hidden"
    } else {
      // Re-enable scrolling when the popup is hidden
      document.body.style.overflow = "unset"
    }

    // Cleanup function to re-enable scrolling when component unmounts
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isVisible])

  const handleViewCapsules = () => {
    router.push('/paginas/capsules');
    // Pequeño retraso para asegurar que la navegación ocurra primero
    setTimeout(() => {
      onClose();
    }, 100);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Full-page blur overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-md z-40"
          />

          {/* Popup Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{
              duration: 0.2,
              ease: "easeOut",
            }}
            className="fixed inset-0 flex items-center justify-center z-50 p-8"
          >
            <div className="bg-black/40 rounded-lg p-8 flex flex-col items-center justify-center max-w-md w-full">
              <CheckCircle className="w-12 h-12 mb-4 text-green-500" />
              <h2
                className="text-3xl font-bold text-center bg-gradient-to-r from-[#4169E1] to-[#9370DB] bg-clip-text text-transparent mb-6"
                style={{
                  textShadow: "0 0 20px rgba(65, 105, 225, 0.3)",
                }}
              >
                Hereditary Capsule Created Successfully!
              </h2>
              <div className="flex flex-col space-y-4 w-full">
                <button
                  onClick={handleViewCapsules}
                  className="w-full px-4 py-2 bg-gradient-to-r from-[#4169E1] to-[#9370DB] text-white rounded-lg hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-[#4169E1] focus:ring-opacity-50 text-sm font-medium flex items-center justify-center"
                >
                  <Eye className="w-4 h-4 mr-2" />
                  View in My Capsules
                </button>
                <button
                  onClick={onClose}
                  className="w-full px-4 py-2 bg-gradient-to-r from-[#4169E1] to-[#9370DB] text-white rounded-lg hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-[#4169E1] focus:ring-opacity-50 text-sm font-medium flex items-center justify-center"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Create Another Capsule
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

