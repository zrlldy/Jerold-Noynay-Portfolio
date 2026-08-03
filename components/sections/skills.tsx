'use client'

import React from 'react'
import { motion } from 'framer-motion'

interface SkillCategory {
  name: string
  skills: string[]
}

interface SkillsProps {
  categories: SkillCategory[]
}

export function SkillsSection({ categories }: SkillsProps) {
  return (
    <section id="skills" className="space-y-6 py-8">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: false }}
        className="space-y-6"
      >
        <div className="text-terminal-dim text-sm">$ grep -r "skills" .</div>
        
        {categories.map((category, catIndex) => (
          <motion.div
            key={catIndex}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: catIndex * 0.1, duration: 0.5 }}
            viewport={{ once: false }}
          >
            <div className="text-terminal-accent/80 text-sm font-semibold mb-3">
              {category.name}
            </div>
            <div className="flex flex-wrap gap-2 pl-4">
              {category.skills.map((skill, skillIndex) => (
                <motion.div
                  key={skillIndex}
                  whileHover={{ scale: 1.05, textShadow: '0 0 10px rgba(0, 255, 65, 0.5)' }}
                  className="px-3 py-2 border border-terminal-accent/40 rounded-sm text-xs text-terminal-accent/70 hover:text-terminal-accent hover:border-terminal-accent/60 transition-all cursor-pointer"
                >
                  {skill}
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}
