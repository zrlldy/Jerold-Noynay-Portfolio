'use client'

import React from 'react'
import { motion } from 'framer-motion'

interface Experience {
  company: string
  role: string
  period: string
  description: string
  highlights: string[]
}

interface ExperienceProps {
  experiences: Experience[]
}

export function ExperienceSection({ experiences }: ExperienceProps) {
  return (
    <section id="experience" className="space-y-6 py-8">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: false }}
        className="space-y-4"
      >
        <div className="text-terminal-dim text-sm">$ cat experience.log</div>
        <div className="space-y-6">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              viewport={{ once: false }}
              className="border-l-2 border-terminal-accent/30 pl-4 hover:border-terminal-accent/60 transition-colors"
            >
              <div className="flex items-baseline gap-4 flex-wrap">
                <h3 className="text-terminal-accent font-semibold text-sm">{exp.role}</h3>
                <span className="text-terminal-dim text-xs">@</span>
                <span className="text-terminal-accent/70 text-sm font-mono">{exp.company}</span>
                <span className="text-terminal-dim text-xs">{exp.period}</span>
              </div>
              <p className="text-terminal-accent/60 text-sm mt-2 mb-3">{exp.description}</p>
              <ul className="space-y-1">
                {exp.highlights.map((highlight, i) => (
                  <li key={i} className="text-terminal-accent/50 text-xs flex items-start">
                    <span className="mr-2 text-terminal-dim">→</span>
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
