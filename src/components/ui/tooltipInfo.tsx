import type React from "react"
import styles from "@/app/css/tooltipInfo.module.css"

interface TooltipInfoProps {
  text: string
}

const TooltipInfo: React.FC<TooltipInfoProps> = ({ text }) => {
  return (
    <span className={styles.tooltip}>
      <span className={styles.icon}>i</span>
      <span className={styles.tooltiptext}>{text}</span>
    </span>
  )
}

export default TooltipInfo

