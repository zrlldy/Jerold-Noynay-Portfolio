'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { ASCIISelfie } from '@/components/ascii-selfie'

interface HeroProps {
  name: string
  title: string
  bio: string
}

export function HeroSection({ name, title, bio }: HeroProps) {
  return (
    <section id="hero" className="space-y-8 py-8">
      {/* Welcome message */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="space-y-2"
      >
        <div className="text-terminal-dim text-sm">$ echo "zrldy"</div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-terminal-accent text-sm"
        >
        Backend Developer at EEE Inc.
Laravel, Livewire, Nest.js & TypeScript
        </motion.div>
      </motion.div>

      {/* Intro text */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.6 }}
        className="space-y-3 max-w-2xl"
      >
        <div className="text-terminal-dim text-sm">$ whoami</div>
        <div className="text-terminal-accent/80 text-sm leading-relaxed pl-4 border-l-2 border-terminal-accent/30">
          <p className="mb-3">{name} • {title}</p>
          <p className="text-terminal-text/70">{bio}</p>
        </div>
      </motion.div>

      {/* Status indicator */}
      <motion.div
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="flex items-center gap-2 text-xs text-terminal-accent/60"
      >
        <div className="w-2 h-2 rounded-full bg-terminal-accent" />
        <span>Available for projects</span>
      </motion.div>
    </section>
  )
}
