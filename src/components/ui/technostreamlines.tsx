"use client"

import type React from "react"

const TechnoStreamLines: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-10">
      <svg
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1000 1000"
        preserveAspectRatio="none"
        transform="scale(1.2)"
      >
        <defs>
          <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" style={{ stopColor: "#00FFA3", stopOpacity: 0.2 }} />
            <stop offset="33%" style={{ stopColor: "#03E1FF", stopOpacity: 0.3 }} />
            <stop offset="66%" style={{ stopColor: "#DC1FFF", stopOpacity: 0.2 }} />
            <stop offset="100%" style={{ stopColor: "#00FFA3", stopOpacity: 0.1 }} />
          </linearGradient>
        </defs>
        {[...Array(6)].map((_, i) => (
          <path
            key={i}
            d={`M${-200 + i * 250},0 Q${400 + Math.random() * 200},${500 + Math.random() * 300} ${1200 + i * 250},1000`}
            fill="none"
            stroke="url(#grad1)"
            strokeWidth="2"
            className={`techno-line techno-line-${i + 1}`}
          />
        ))}
      </svg>
    </div>
  )
}

export default TechnoStreamLines

