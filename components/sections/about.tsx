'use client'

import React from 'react'
import { motion } from 'framer-motion'

interface AboutProps {
  content: string[]
}

export function AboutSection({ content }: AboutProps) {
  return (
    <section id="about" className="space-y-6 py-8">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: false }}
        className="space-y-3"
      >
        <div className="text-terminal-dim text-sm">$ cat about.txt</div>
        <div className="space-y-4 pl-4 border-l-2 border-terminal-accent/30">
          {content.map((paragraph, index) => (
            <motion.p
              key={index}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              viewport={{ once: false }}
              className="text-terminal-accent/80 text-sm leading-relaxed"
            >
              {paragraph}
            </motion.p>
          ))}
        </div>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
        {[
          { label: 'Projects', value: '3' },
          { label: 'Years Exp.', value: '2' },
          { label: 'Clients', value: '3' },
          { label: 'Happy', value: '100%' },
        ].map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            viewport={{ once: false }}
            className="border border-terminal-accent/30 rounded-sm p-3 text-center hover:border-terminal-accent/60 transition-colors"
          >
            <div className="text-xl font-bold text-terminal-accent">{stat.value}</div>
            <div className="text-xs text-terminal-dim mt-1">{stat.label}</div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
