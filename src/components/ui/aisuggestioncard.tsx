import type React from "react"
import { motion } from "framer-motion"

interface AISuggestionCardProps {
  title: string
  description: string
  category: string
}

const AISuggestionCard: React.FC<AISuggestionCardProps> = ({ title, description, category }) => {
  return (
    <motion.div
      className="card w-[190px] h-[254px] rounded-[30px] bg-gradient-to-br from-[#1a1a1a] to-[#2a2a2a] shadow-[0_10px_20px_rgba(0,0,0,0.3)] p-4 flex flex-col justify-between overflow-hidden relative"
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 300, damping: 10 }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[#d8b04a]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      <div className="relative z-10">
        <h3 className="text-lg font-semibold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
          {title}
        </h3>
        <p className="text-sm text-gray-300 mb-2">{description}</p>
      </div>
      <div className="text-xs font-medium text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600 relative z-10">
        {category}
      </div>
    </motion.div>
  )
}

export default AISuggestionCard

