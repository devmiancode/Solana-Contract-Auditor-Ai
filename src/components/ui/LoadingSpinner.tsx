import type React from "react"
import styled, { keyframes } from "styled-components"

const spinning = keyframes`
  to {
    transform: rotate(360deg);
  }
`

const SpinnerWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: black;
`

const SpinnerOuter = styled.div`
  background-image: linear-gradient(rgb(186, 66, 255) 35%, rgb(0, 225, 255));
  width: 100px;
  height: 100px;
  animation: ${spinning} 1.7s linear infinite;
  text-align: center;
  border-radius: 50px;
  filter: blur(1px);
  box-shadow: 0px -5px 20px 0px rgb(186, 66, 255), 0px 5px 20px 0px rgb(0, 225, 255);
  display: flex;
  justify-content: center;
  align-items: center;
`

const SpinnerInner = styled.div`
  background-color: rgb(36, 36, 36);
  width: 80px;
  height: 80px;
  border-radius: 50px;
  filter: blur(10px);
`

const LoadingSpinner: React.FC = () => {
  return (
    <SpinnerWrapper>
      <SpinnerOuter>
        <SpinnerInner />
      </SpinnerOuter>
    </SpinnerWrapper>
  )
}

export default LoadingSpinner

