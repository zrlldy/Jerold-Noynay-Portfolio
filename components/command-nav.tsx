'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useTypingEffect } from '@/hooks/use-typing-effect'

interface NavItem {
  label: string
  id: string
}

interface CommandNavProps {
  items: NavItem[]
  onNavigate: (id: string) => void
}

export function CommandNav({ items, onNavigate }: CommandNavProps) {
  const [activeCommand, setActiveCommand] = useState<string | null>(null)

  const handleNavClick = (id: string, label: string) => {
    setActiveCommand(id)
    onNavigate(id)
  }

  return (
    <div className="space-y-3 mb-8">
      {items.map((item, index) => (
        <CommandNavItem
          key={item.id}
          item={item}
          isActive={activeCommand === item.id}
          onClick={() => handleNavClick(item.id, item.label)}
          delay={index * 100}
        />
      ))}
    </div>
  )
}

function CommandNavItem({
  item,
  isActive,
  onClick,
  delay,
}: {
  item: NavItem
  isActive: boolean
  onClick: () => void
  delay: number
}) {
  const { displayedText } = useTypingEffect(`$ cd ${item.label}`, 30, delay)

  return (
    <motion.button
      onClick={onClick}
      whileHover={{ x: 5 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: delay / 1000, duration: 0.3 }}
      className={`w-full text-left px-4 py-2 font-mono text-sm transition-all duration-300 ${
        isActive
          ? 'bg-terminal-accent/10 border-l-2 border-terminal-accent text-terminal-accent'
          : 'border-l-2 border-terminal-dim hover:border-terminal-accent/50 text-terminal-accent/70 hover:text-terminal-accent'
      }`}
    >
      <span className="text-terminal-dim">{'>'}</span>
      <span className="ml-2">{displayedText}</span>
      {isActive && <span className="ml-2 terminal-cursor">_</span>}
    </motion.button>
  )
}
