import type React from "react"
import styled from "styled-components"

const StyledButton = styled.button`
  width: 100%;
  max-width: 300px;
  height: 62px;
  cursor: pointer;
  color: #fff;
  font-size: 14px;
  border-radius: 1rem;
  border: none;
  position: relative;
  background: #100720;
  transition: 0.1s;
  padding: 1rem 0.5rem; /* Add padding to top/bottom and left/right */

  &::after {
    content: '';
    width: 100%;
    height: 100%;
    background-image: radial-gradient( circle farthest-corner at 10% 20%,  rgba(255,94,247,1) 17.8%, rgba(2,245,255,1) 100.2% );
    filter: blur(15px);
    z-index: -1;
    position: absolute;
    left: 0;
    top: 0;
  }

  &:active {
    transform: scale(0.9) rotate(3deg);
    background: radial-gradient( circle farthest-corner at 10% 20%,  rgba(255,94,247,1) 17.8%, rgba(2,245,255,1) 100.2% );
    transition: 0.5s;
  }
`

interface BackGlowingButtonProps {
  onClick: () => void
  className?: string
}

const BackGlowingButton: React.FC<BackGlowingButtonProps> = ({ onClick, className }) => {
  return (
    <StyledButton onClick={onClick} className={className}>
      Back to Capsule Selection
    </StyledButton>
  )
}

export default BackGlowingButton

