'use client'

import React from 'react'
import { motion } from 'framer-motion'

interface Project {
  title: string
  description: string
  tech: string[]
  url?: string
}

interface ProjectsProps {
  projects: Project[]
}

export function ProjectsSection({ projects }: ProjectsProps) {
  return (
    <section id="projects" className="space-y-6 py-8">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: false }}
        className="space-y-4"
      >
        <div className="text-terminal-dim text-sm">$ ls -la projects/</div>
        <div className="space-y-4">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              viewport={{ once: false }}
              whileHover={{ x: 5 }}
              className="border border-terminal-accent/30 rounded-sm p-4 hover:bg-terminal-accent/5 transition-all duration-300 cursor-pointer group"
            >
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="text-terminal-accent font-semibold text-sm group-hover:terminal-glow transition-all">
                    {project.title}
                  </h3>
                  <p className="text-terminal-accent/60 text-xs mt-1">{project.description}</p>
                </div>
                {project.url && (
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-terminal-dim hover:text-terminal-accent text-xs transition-colors"
                  >
                    →
                  </a>
                )}
              </div>
              <div className="flex flex-wrap gap-2 mt-3">
                {project.tech.map((tech, i) => (
                  <span
                    key={i}
                    className="text-xs px-2 py-1 border border-terminal-accent/40 text-terminal-dim rounded-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
