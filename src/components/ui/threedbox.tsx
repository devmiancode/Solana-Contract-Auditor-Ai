"use client"

import type React from "react"
import { useState } from "react"
import { motion } from "framer-motion"

const ThreeDBox: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div className="container ml-0 perspective-1000">
      <motion.div
        className="box-card w-[200px] h-[200px] relative cursor-pointer"
        style={{ transformStyle: "preserve-3d" }}
        animate={isHovered ? { rotateX: 360, rotateY: 360 } : {}}
        transition={isHovered ? { duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "linear" } : {}}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
      >
        <div className="face front">Hereditary</div>
        <div className="face back">NFTS</div>
        <div className="face right">Contracts</div>
        <div className="face left">Texts</div>
        <div className="face top">Hereditary</div>
        <div className="face bottom">Contracts</div>
      </motion.div>
      <style jsx>{`
      .container {
        display: flex;
        justify-content: flex-start; /* Updated to align to the left */
        align-items: center;
        transform-style: preserve-3d;
      }
      .box-card {
        transform-style: preserve-3d;
        transition: transform 1s ease;
      }
      .face {
        position: absolute;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 1.5rem;
        font-weight: bold;
        backface-visibility: visible;
        border-radius: 12px;
        background: linear-gradient(145deg, #5f2c8f, #3c7ecd);
        border: 2px solid #646cff;
        transition: all 0.3s ease;
        overflow: hidden;
        color: white; /* Add this line to set the text color to white */
      }
      .face::before {
        content: '';
        position: absolute;
        width: 100%;
        height: 100%;
        background: linear-gradient(45deg, transparent, rgba(255,255,255,0.1), transparent);
        top: -100%;
        left: -100%;
        transition: all 0.5s ease;
        transform: translateZ(20px);
      }
      .face::after {
        content: '';
        position: absolute;
        inset: 0;
        background: linear-gradient(
          135deg,
          transparent 0%,
          rgba(255, 255, 255, 0.05) 50%,
          transparent 100%
        );
        opacity: 0;
        transition: opacity 0.3s ease;
      }
      .face:hover::before {
        top: 100%;
        left: 100%;
      }
      .face:hover::after {
        opacity: 1;
      }
      .front { transform: translateZ(100px); border-color: #646cff; }
      .back { transform: translateZ(-100px) rotateY(180deg); border-color: #00bcd4; }
      .right { transform: translateX(100px) rotateY(90deg); border-color: #4caf50; }
      .left { transform: translateX(-100px) rotateY(-90deg); border-color: #ff4081; }
      .top { transform: translateY(-100px) rotateX(90deg); border-color: #ffc107; }
      .bottom { transform: translateY(100px) rotateX(-90deg); border-color: #9c27b0; }

      @media (max-width: 768px) {
        .box-card {
          width: 150px;
          height: 150px;
        }
        .front { transform: translateZ(75px); }
        .back { transform: translateZ(-75px) rotateY(180deg); }
        .right { transform: translateX(75px) rotateY(90deg); }
        .left { transform: translateX(-75px) rotateY(-90deg); }
        .top { transform: translateY(-75px) rotateX(90deg); }
        .bottom { transform: translateY(75px) rotateX(-90deg); }
      }
    `}</style>
    </div>
  )
}

export default ThreeDBox

