import type React from "react"
import styled from "styled-components"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { ComingSoonModal } from "./comingsoonmodal"
import { useState } from "react"

const Card = styled(motion.div)`
  position: relative;
  width: 250px;
  height: 354px;
  background: rgb(255, 0, 179);
  background: linear-gradient(137deg, rgb(255, 0, 179) 0%, rgba(0,212,255,1) 100%);
  border-radius: 30px;
  filter: drop-shadow(0px 0px 30px rgba(209, 38, 197, 0.5));
  transition: 0.3s ease;
  cursor: pointer;

  &::after {
    content: '';
    background-color: #181818;
    position: absolute;
    z-index: 1;
    transition: 0.3s ease;
    height: 98%;
    width: 98%;
    top: 1%;
    left: 1%;
    border-radius: 28px;
  }

  &:hover {
    filter: drop-shadow(0px 0px 30px rgba(209, 38, 197, 1));
  }
`

const CardContent = styled.div`
  position: relative;
  z-index: 2;
  padding: 20px;
  color: #fff;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

const IconWrapper = styled.div`
  width: 40px;
  height: 40px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
`

const Title = styled.h3`
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 10px;
`

const Description = styled.p`
  font-size: 0.9rem;
  opacity: 0.8;
`

const SelectButton = styled.button`
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.5);
  color: #fff;
  padding: 8px 16px;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
`

interface CapsuleTypeCardProps {
  id: string
  title: string
  description: string
  icon: React.ElementType
  onClick: () => void
}

const CapsuleTypeCard: React.FC<CapsuleTypeCardProps> = ({ id, title, description, icon: Icon, onClick }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleClick = () => {
    if (id === "hereditary") {
      onClick()
    } else {
      setIsModalOpen(true)
    }
  }

  return (
    <>
      <Card whileHover={{ scale: 1.05 }} onClick={handleClick}>
        <CardContent>
          <div>
            <IconWrapper>
              <Icon size={24} />
            </IconWrapper>
            <Title>{title}</Title>
            <Description>{description}</Description>
          </div>
          <SelectButton>
            Select
            <ArrowRight size={16} style={{ marginLeft: "8px" }} />
          </SelectButton>
        </CardContent>
      </Card>
      {id !== "hereditary" && (
        <ComingSoonModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title={title}
          description={`The ${title} feature is coming soon! This capsule will allow you to ${description.toLowerCase()} Stay tuned for updates!`}
        />
      )}
    </>
  )
}

export default CapsuleTypeCard

