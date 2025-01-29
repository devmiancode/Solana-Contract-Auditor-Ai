import type React from "react"
import styled, { keyframes } from "styled-components"

interface AIButtonProps {
  children: React.ReactNode
  onClick: () => void
  className?: string
}

const flip = keyframes`
  to {
    rotate: 360deg;
  }
`

const rotate = keyframes`
  to {
    transform: rotate(90deg);
  }
`

const bounce = keyframes`
  35%, 65% {
    scale: var(--scale);
  }
`

const floatOut = keyframes`
  to {
    rotate: 360deg;
  }
`

const SparkleButton = styled.button`
  --active: 0;
  --bg: radial-gradient(
      40% 50% at center 100%,
      hsl(270 calc(var(--active) * 97%) 72% / var(--active)),
      transparent
    ),
    radial-gradient(
      80% 100% at center 120%,
      hsl(260 calc(var(--active) * 97%) 70% / var(--active)),
      transparent
    ),
    hsl(260 calc(var(--active) * 97%) calc((var(--active) * 44%) + 12%));
  background: var(--bg);
  font-size: 1.2rem;
  font-weight: 500;
  border: 0;
  cursor: pointer;
  padding: 1em 1em;
  display: flex;
  align-items: center;
  gap: 0.25em;
  white-space: nowrap;
  border-radius: 100px;
  position: relative;
  box-shadow: 0 0 calc(var(--active) * 3em) calc(var(--active) * 1em) hsl(260 97% 61% / 0.75),
    0 0em 0 0 hsl(260 calc(var(--active) * 97%) calc((var(--active) * 50%) + 30%)) inset,
    0 -0.05em 0 0 hsl(260 calc(var(--active) * 97%) calc(var(--active) * 60%)) inset;
  transition: box-shadow var(--transition), scale var(--transition), background var(--transition);
  scale: calc(1 + (var(--active) * 0.1));
  transition: .3s;
  justify-content: center;

  &:active {
    scale: 1;
    transition: .3s;
  }

  &:before {
    content: "";
    position: absolute;
    inset: -0.2em;
    z-index: -1;
    border: 0.25em solid hsl(260 97% 50% / 0.5);
    border-radius: 100px;
    opacity: var(--active, 0);
    transition: opacity var(--transition);
  }

  &:is(:hover, :focus-visible) {
    --active: 1;
    --play-state: running;
  }

  & svg {
    inline-size: 1.25em;
    translate: -25% -5%;
  }
`

const Sparkle = styled.div`
  position: absolute;
  inset: 0;
  border-radius: 100px;
  rotate: 0deg;
  overflow: hidden;
  mask: linear-gradient(white, transparent 50%);
  animation: ${flip} calc(var(--spark) * 2) infinite steps(2, end);

  &:before {
    content: "";
    position: absolute;
    width: 200%;
    aspect-ratio: 1;
    top: 0%;
    left: 50%;
    z-index: -1;
    translate: -50% -15%;
    rotate: 0;
    transform: rotate(-90deg);
    opacity: calc((var(--active)) + 0.4);
    background: conic-gradient(
      from 0deg,
      transparent 0 340deg,
      white 360deg
    );
    transition: opacity var(--transition);
    animation: ${rotate} var(--spark) linear infinite both;
  }

  &:after {
    content: "";
    position: absolute;
    inset: var(--cut);
    border-radius: 100px;
  }
`

const Backdrop = styled.div`
  position: absolute;
  inset: var(--cut);
  background: var(--bg);
  border-radius: 100px;
  transition: background var(--transition);
`

const Text = styled.span`
  translate: 2% -6%;
  letter-spacing: 0.01ch;
  background: linear-gradient(90deg, hsl(0 0% calc((var(--active) * 100%) + 65%)), hsl(0 0% calc((var(--active) * 100%) + 26%)));
  -webkit-background-clip: text;
  color: transparent;
  transition: background var(--transition);
`

const StyledPath = styled.path`
  color: hsl(0 0% calc((var(--active, 0) * 70%) + var(--base)));
  transform-box: fill-box;
  transform-origin: center;
  fill: currentColor;
  stroke: currentColor;
  animation-delay: calc((var(--transition) * 1.5) + (var(--delay) * 1s));
  animation-duration: 0.6s;
  transition: color var(--transition);

  ${SparkleButton}:is(:hover, :focus-visible) & {
    animation-name: ${bounce};
  }

  &:nth-of-type(1) {
    --scale: 0.5;
    --delay: 0.1;
    --base: 40%;
  }

  &:nth-of-type(2) {
    --scale: 1.5;
    --delay: 0.2;
    --base: 20%;
  }

  &:nth-of-type(3) {
    --scale: 2.5;
    --delay: 0.35;
    --base: 30%;
  }
`

export const AI_button: React.FC<AIButtonProps> = ({ children, onClick, className = "" }) => {
  return (
    <SparkleButton onClick={onClick} className={className}>
      <Sparkle className="spark" />
      <Backdrop className="backdrop" />
      <Text className="text">{children}</Text>
    </SparkleButton>
  )
}

export default AI_button

