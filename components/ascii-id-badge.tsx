'use client'

import React from 'react'
import { motion } from 'framer-motion'

interface ASCIIIDBadgeProps {
  name: string
  role: string
  employeeId: string
  level: string
}

export function ASCIIIDBadge({ name, role, employeeId, level }: ASCIIIDBadgeProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay: 0.4 }}
      className="font-mono text-xs md:text-sm text-terminal-accent"
    >
      <pre className="whitespace-pre-wrap break-words leading-tight">{`
╔══════════════════════════════════════════════╗
║                                              ║
║              EMPLOYEE ID BADGE               ║
║                                              ║
╠══════════════════════════════════════════════╣
║                                              ║
║  NAME: ${name.padEnd(37)}║
║  ROLE: ${role.padEnd(37)}║
║  ID#:  ${employeeId.padEnd(37)}║
║  LVL:  ${level.padEnd(37)}║
║                                              ║
║  STATUS: ✓ ACTIVE                            ║
║  ACCESS: ALL SYSTEMS GRANTED                 ║
║                                              ║
╠══════════════════════════════════════════════╣
║  [████████████████████████████████████████]  ║
╠══════════════════════════════════════════════╣
║  AUTHORIZED BY: SYS_ADMIN                    ║
║  ISSUED: 2024                                ║
║                                              ║
╚══════════════════════════════════════════════╝
      `}</pre>

      {/* Blinking indicator */}
      <motion.div
        animate={{ opacity: [0.3, 1, 0.3] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="mt-4 text-terminal-accent/60 text-xs"
      >
        <span className="terminal-cursor">▌</span> BADGE VERIFIED
      </motion.div>
    </motion.div>
  )
}
