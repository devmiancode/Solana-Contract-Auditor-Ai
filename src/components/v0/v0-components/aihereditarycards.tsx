import type React from "react"
import styles from "@/app/css/ai_hereditary_cards.module.css"

interface AI_hereditary_cardsProps {
  title: string
  content: React.ReactNode
  className?: string
}

const AI_hereditary_cards: React.FC<AI_hereditary_cardsProps> = ({ title, content, className }) => {
  return (
    <div className={`${styles.card} ${className || ""}`}>
      <div className={styles.card__content}>
        <h3 className="text-lg font-semibold mb-4 text-white">{title}</h3>
        {content}
      </div>
    </div>
  )
}

export default AI_hereditary_cards

