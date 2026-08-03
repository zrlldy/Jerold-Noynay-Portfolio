'use client'

import React, { useRef } from 'react'
import { motion } from 'framer-motion'

interface IDBadgeProps {
  name: string
  role: string
  access: string
  imageUrl: string
}

export function IDBadge({ name, role, access, imageUrl }: IDBadgeProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  return (
    <motion.div
      ref={containerRef}
      drag
      dragElastic={0.2}
      dragMomentum={false}
      whileHover={{ scale: 1.05 }}
      whileDrag={{ scale: 1.1 }}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="cursor-grab active:cursor-grabbing w-64 mx-auto"
    >
      <div className="border-2 border-terminal-accent/60 bg-terminal-bg/80 rounded-sm p-4 space-y-3 terminal-glow hover:terminal-glow transition-all duration-300 hover:border-terminal-accent"
        style={{
          boxShadow: 'inset 0 0 15px rgba(0, 255, 65, 0.08), 0 0 20px rgba(0, 255, 65, 0.15)',
        }}
      >
        {/* Badge Header */}
        <div className="text-center border-b border-terminal-accent/30 pb-3">
          <div className="text-xs text-terminal-dim mb-2 font-semibold">[ ACCESS BADGE ]</div>
          <div className="text-lg font-bold text-terminal-accent">{name}</div>
        </div>

        {/* Photo */}
        <div className="flex justify-center">
          <div className="w-20 h-20 rounded-sm border border-terminal-accent/50 overflow-hidden bg-terminal-dim/50">
            <img
              src={imageUrl}
              alt={name}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Role */}
        <div className="text-center space-y-1 border-y border-terminal-accent/30 py-3">
          <div className="text-xs text-terminal-dim uppercase tracking-wider">Role</div>
          <div className="text-sm text-terminal-accent font-semibold">{role}</div>
        </div>

        {/* Access Level */}
        <div className="text-center space-y-1">
          <div className="text-xs text-terminal-dim uppercase tracking-wider">Access</div>
          <div className="inline-block px-3 py-1 border border-terminal-accent/50 text-xs font-mono text-terminal-accent rounded-sm">
            {access}
          </div>
        </div>

        {/* Strap effect with animation */}
        <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 h-6 w-24 border-2 border-terminal-accent/40 rounded-t-sm opacity-50" />
      </div>

      {/* Idle sway animation */}
      <motion.div
        animate={{ y: [0, -8, 0], rotate: [-1, 1, -1] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute inset-0 pointer-events-none"
      />
    </motion.div>
  )
}
