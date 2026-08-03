'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'

export function ASCIISelfie() {
  const [isHovered, setIsHovered] = useState(false)

  const asciiArt = `
    ╭─────────────────────────────────╮
    │                                 │
    │       /\\ _ /\\     /\\ _ /\\     │
    │      /  \\   /  \\  /  \\   /  \\  │
    │     /    \\ /    \\/    \\ /    \\ │
    │    /      X      X      X      \\│
    │    \\    / \\    / \\    / \\    / │
    │     \\  /   \\  /   \\  /   \\  /  │
    │      \\/     \\/     \\/     \\/   │
    │       :  :  :  :  :  :  :  :    │
    │       :  •  :  •  :  :  :  :    │
    │       :  :  :  :  :  :  :  :    │
    │      \\| ___ |/    \\| /  \\|     │
    │       | |V| |      | |  | |     │
    │       | |_| |      | |  | |     │
    │      /  ---  \\    /  |  |  \\   │
    │     /         \\  /   |  |   \\  │
    │    /           \\/    |  |    \\ │
    │   |                  |  |     |│
    │   |  /  | \\  /  |   |  |     |│
    │   | |   | | | | |   |  |     |│
    │   |  \\  | |  \\ \\|   |  |     |│
    │    \\   \\ | |   \\   /  /     / │
    │     \\___\\|_|    \\ /  /     /  │
    │                                 │
    │       Developer & Creator       │
    │                                 │
    ╰─────────────────────────────────╯
  `

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        staggerChildren: 0.1,
      },
    },
  }

  const glowVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: [0.3, 0.8, 0.3],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    },
  }

  const floatVariants = {
    hidden: { y: 0 },
    visible: {
      y: [-5, 5, -5],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    },
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="flex justify-center my-8 overflow-x-auto"
    >
      <motion.div
        variants={floatVariants}
        className="relative"
      >
        {/* Animated glow background */}
        <motion.div
          variants={glowVariants}
          className="absolute inset-0 bg-gradient-to-r from-terminal-accent/10 via-terminal-accent/5 to-transparent rounded-lg blur-xl"
        />
        
        {/* ASCII Art Container */}
        <motion.pre
          animate={isHovered ? { 
            textShadow: '0 0 20px rgba(27, 160, 176, 0.6)' 
          } : { 
            textShadow: '0 0 10px rgba(27, 160, 176, 0.3)' 
          }}
          transition={{ duration: 0.3 }}
          className="relative text-terminal-accent text-xs md:text-sm font-mono whitespace-pre-wrap break-words px-4 py-6 border border-terminal-accent/30 rounded bg-terminal-bg/70 backdrop-blur hover:border-terminal-accent/50 transition-colors cursor-pointer"
        >
          {asciiArt}
        </motion.pre>

        {/* Blinking camera indicator */}
        <motion.div
          animate={{ opacity: [1, 0.3, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="absolute top-4 right-4 w-3 h-3 bg-terminal-accent rounded-full"
        />
      </motion.div>
    </motion.div>
  )
}
