import type React from "react"

interface GlowingButtonProps {
  children: React.ReactNode
  onClick?: () => void
}

const GlowingButton: React.FC<GlowingButtonProps> = ({ children, onClick }) => {
  return (
    <button className="glowing-button" onClick={onClick}>
      {children}
    </button>
  )
}

export default GlowingButton

