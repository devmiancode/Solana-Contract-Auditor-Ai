import type React from "react"
import styled from "styled-components"

const NotificationWrapper = styled.div`
  display: flex;
  flex-direction: column;
  isolation: isolate;
  position: relative;
  width: 24rem;
  height: 12rem;
  background: #29292c;
  border-radius: 1rem;
  overflow: hidden;
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  font-size: 16px;
  --gradient: linear-gradient(to bottom, #2eadff, #3d83ff, #7e61ff);
  --color: #32a6ff;

  &:before {
    position: absolute;
    content: "";
    inset: 0.0625rem;
    border-radius: 0.9375rem;
    background: #18181b;
    z-index: 2;
  }

  &:after {
    position: absolute;
    content: "";
    width: 0.25rem;
    inset: 0.65rem auto 0.65rem 0.5rem;
    border-radius: 0.125rem;
    background: var(--gradient);
    transition: transform 300ms ease;
    z-index: 4;
  }

  &:hover:after {
    transform: translateX(0.15rem);
  }
`

const NotiTitle = styled.div`
  color: var(--color);
  padding: 0.65rem 0.25rem 0.4rem 1.25rem;
  font-weight: 500;
  font-size: 1.5rem; /* Increased font size */
  transition: transform 300ms ease;
  z-index: 5;

  ${NotificationWrapper}:hover & {
    transform: translateX(0.15rem);
  }
`

const NotiBody = styled.div`
  color: #99999d;
  padding: 0 1.25rem;
  font-size: 1.25rem; /* Increased font size */
  z-index: 5;

  ${NotificationWrapper}:hover & {
    transform: translateX(0.25rem);
  }
`

const NotiGlow = styled.div`
  position: absolute;
  width: 20rem;
  height: 20rem;
  transform: translate(-50%, -50%);
  background: radial-gradient(circle closest-side at center, white, transparent);
  opacity: 0;
  transition: opacity 300ms ease;
  z-index: 3;

  ${NotificationWrapper}:hover & {
    opacity: 0.1;
  }
`

const NotiBorderGlow = styled(NotiGlow)`
  z-index: 1;
`

const NotiExample = styled.div`
  color: #7a7a7d;
  padding: 0 1.25rem;
  font-size: 0.875rem;
  font-style: italic;
  transition: transform 300ms ease;
  z-index: 5;

  ${NotificationWrapper}:hover & {
    transform: translateX(0.25rem);
  }
`

interface NotificationProps {
  title: string
  body: string
  example: string
}

export const Notification: React.FC<NotificationProps> = ({ title, body, example }) => {
  return (
    <NotificationWrapper>
      <NotiTitle>{title}</NotiTitle>
      <NotiBody>{body}</NotiBody>
      <NotiExample>Example: {example}</NotiExample>
      <NotiGlow />
      <NotiBorderGlow />
    </NotificationWrapper>
  )
}

