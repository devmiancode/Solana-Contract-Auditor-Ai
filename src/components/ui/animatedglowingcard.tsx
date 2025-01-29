import type React from "react"
import styled from "styled-components"

const CardWrapper = styled.div`
  width: 280px;
  height: 380px;
  background: #171717;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0px 0px 3px 1px #00000088;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  border-radius: 10px;

  &::before {
    opacity: 1;
    content: "";
    position: absolute;
    display: block;
    width: 120px;
    height: 300px;
    transform: rotate(0deg) translateY(50%);
    background: linear-gradient(90deg, #ff2288, transparent);
    transition: opacity 300ms;
    animation: rotation_9018 3000ms infinite linear;
    animation-play-state: paused;
  }

  &::after {
    opacity: 1;
    content: "";
    position: absolute;
    display: block;
    width: 120px;
    height: 300px;
    transform: rotate(0deg) translateY(-50%);
    background: linear-gradient(90deg, transparent, #2268ff);
    transition: opacity 300ms;
    animation: rotation_9019 3000ms infinite linear;
    animation-play-state: paused;
  }

  &:hover::before,
  &:hover::after {
    opacity: 1;
    animation-play-state: running;
  }

  &:hover .glass {
    opacity: 0;
  }

  @keyframes rotation_9018 {
    0% {
      transform: rotate(0deg) translateY(50%);
    }
    100% {
      transform: rotate(360deg) translateY(50%);
    }
  }

  @keyframes rotation_9019 {
    0% {
      transform: rotate(0deg) translateY(-50%);
    }
    100% {
      transform: rotate(360deg) translateY(-50%);
    }
  }
`

const Content = styled.div`
  border-radius: 10px;
  background: #171717;
  width: 276px;
  height: 376px;
  z-index: 1;
  padding: 24px;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;

  &::before {
    content: " ";
    display: block;
    background: #fff5;
    width: 50px;
    height: 50px;
    position: absolute;
    filter: blur(50px);
    opacity: 0;
    transition: opacity 300ms;
  }

  ${CardWrapper}:hover &::before {
    opacity: 1;
  }
`

const Tag = styled.span`
  font-size: 0.875rem;
  font-weight: bold;
  color: #3b82f6;
  margin-bottom: 0.5rem;
`

const Title = styled.h3`
  font-size: 1.25rem;
  font-weight: bold;
  text-align: center;
  margin-bottom: 0.5rem;
`

const Description = styled.p`
  font-size: 0.875rem;
  text-align: center;
`

interface AnimatedGlowingCardProps {
  tag: string
  title: string
  description: string
  icon: React.ElementType
}

const AnimatedGlowingCard: React.FC<AnimatedGlowingCardProps> = ({ tag, title, description, icon: Icon }) => {
  return (
    <CardWrapper>
      <Content>
        <Tag>{tag}</Tag>
        <Icon size={32} className="mb-3 text-blue-400" />
        <Title>{title}</Title>
        <Description>{description}</Description>
      </Content>
    </CardWrapper>
  )
}

export default AnimatedGlowingCard

