import type React from "react"
import styled, { keyframes } from "styled-components"

const rotate = keyframes`
  to {
    transform: translate(-50%, -50%) rotate(360deg);
  }
`

const Card = styled.div`
  --white: hsl(0, 0%, 100%);
  --black: hsl(240, 15%, 9%);
  --paragraph: hsl(0, 0%, 83%);
  --line: hsl(240, 9%, 17%);
  --primary: #4c49ea; 

  position: relative;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
  width: 30rem;
  background-color: hsla(240, 15%, 9%, 1);
  background-image: radial-gradient(
      at 88% 40%,
      hsla(240, 15%, 9%, 1) 0px,
      transparent 85%
    ),
    radial-gradient(at 49% 30%, hsla(240, 15%, 9%, 1) 0px, transparent 85%),
    radial-gradient(at 14% 26%, hsla(240, 15%, 9%, 1) 0px, transparent 85%),
    radial-gradient(at 0% 64%, hsl(189, 99%, 26%) 0px, transparent 85%),
    radial-gradient(at 41% 94%, hsl(189, 97%, 36%) 0px, transparent 85%),
    radial-gradient(at 100% 99%, hsl(188, 94%, 13%) 0px, transparent 85%);
  border-radius: 1rem;
  box-shadow: 0px -16px 24px 0px rgba(255, 255, 255, 0.25) inset;
`

const CardBorder = styled.div`
  overflow: hidden;
  pointer-events: none;
  position: absolute;
  z-index: -10;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: calc(100% + 2px);
  height: calc(100% + 2px);
  background-image: linear-gradient(
    0deg,
    hsl(0, 0%, 100%) -50%,
    hsl(0, 0%, 40%) 100%
  );
  border-radius: 1rem;

  &::before {
    content: "";
    pointer-events: none;
    position: fixed;
    z-index: 200;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 200%;
    height: 10rem;
    background-image: linear-gradient(
      0deg,
      hsla(0, 0%, 100%, 0) 0%,
      hsl(189, 100%, 50%) 40%,
      hsl(189, 100%, 50%) 60%,
      hsla(0, 0%, 40%, 0) 100%
    );
    animation: ${rotate} 8s linear infinite;
  }
`

const TitleContainer = styled.div`
  .card_title {
    font-size: 1.5rem;
    color: var(--white);
  }

  .card_paragraph {
    margin-top: 0.5rem;
    width: 100%;
    font-size: 1rem;
    color: var(--white);
    font-weight: 500;
    line-height: 1.4;
  }
`

const Line = styled.hr`
  width: 100%;
  height: 0.1rem;
  background-color: var(--line);
  border: none;
`

const List = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`

const ListItem = styled.li`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  .check {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 1rem;
    height: 1rem;
    background-color: var(--primary);
    border-radius: 50%;

    .check_svg {
      width: 0.75rem;
      height: 0.75rem;
      fill: var(--black);
    }
  }

  .list_text {
    font-size: 1rem; 
    color: var(--white);
  }
`

const Button = styled.button`
  cursor: pointer;
  padding: 0.5rem;
  width: 100%;
  background-image: linear-gradient(
    0deg,
    #4c49ea,
    #3634a8 100%
  );
  font-size: 1rem;
  color: var(--white);
  border: 0;
  border-radius: 9999px;
  box-shadow: inset 0 -2px 25px -4px var(--white);
`

interface GlowingBorderCardProps {
  title: string
  description: string
  items: string[]
  buttonText: string
  onButtonClick: () => void
}

const GlowingBorderCard: React.FC<GlowingBorderCardProps> = ({
  title,
  description,
  items,
  buttonText,
  onButtonClick,
}) => {
  return (
    <Card>
      <CardBorder />
      <TitleContainer>
        <h3 className="card_title">{title}</h3>
        <p className="card_paragraph">{description}</p>
      </TitleContainer>
      <Line />
      <List>
        {items.map((item, index) => (
          <ListItem key={index}>
            <div className="check">
              <svg className="check_svg" viewBox="0 0 24 24">
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
              </svg>
            </div>
            <span className="list_text">{item}</span>
          </ListItem>
        ))}
      </List>
      <Button onClick={onButtonClick}>{buttonText}</Button>
    </Card>
  )
}

export default GlowingBorderCard

