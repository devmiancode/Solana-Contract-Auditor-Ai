"use client"

import type React from "react"

interface GlowingCardProps {
  heading: string
  description: string
  highlight: string
  icon: React.ElementType
}

const GlowingCard: React.FC<GlowingCardProps> = ({ heading, description, highlight, icon: Icon }) => {
  return (
    <div className="group relative w-full max-w-[350px] h-[450px] bg-gray-900 flex flex-col p-6 gap-4 rounded-lg cursor-pointer overflow-hidden transition-all duration-300 hover:scale-105">
      <div className="absolute inset-0 -left-[5px] m-auto w-[calc(100%+10px)] sm:w-[360px] h-[410px] sm:h-[460px] rounded-[10px] bg-gradient-to-tr from-[#e81cff] to-[#40c9ff] -z-10 opacity-50 transition-all duration-600 ease-[cubic-bezier(0.175,0.885,0.32,1.275)] group-hover:opacity-100 group-hover:rotate-[-90deg] group-hover:scale-x-[1.34] group-hover:scale-y-[0.77]"></div>
      <div className="absolute inset-0 bg-gradient-to-tr from-[#fc00ff] to-[#00dbde] -z-[1] scale-[0.95] blur-[20px] opacity-30 transition-opacity duration-300 group-hover:opacity-60 group-hover:blur-[30px]"></div>
      <div className="flex items-center gap-4 mb-4">
        <div className="bg-[#e81cff] p-3 rounded-full">
          <Icon className="w-6 h-6 text-white" />
        </div>
        <h3 className="text-xl sm:text-2xl font-bold capitalize text-white">{heading}</h3>
      </div>
      <p className="text-sm sm:text-base text-gray-300 flex-grow overflow-auto">{description}</p>
      <p className="text-base sm:text-lg font-semibold text-[#e81cff] mt-4">{highlight}</p>
    </div>
  )
}

export default GlowingCard

