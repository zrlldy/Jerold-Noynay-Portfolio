'use client'

import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface PortfolioData {
  projects: Array<{ title: string; description: string; tech: string[] }>
  experiences: Array<{ company: string; role: string; period: string }>
  skills: Array<{ name: string; skills: string[] }>
}

interface TerminalModalProps {
  isOpen: boolean
  onClose: () => void
  portfolioData: PortfolioData
  onNavigate?: (sectionId: string) => void
}

export function TerminalModal({ isOpen, onClose, portfolioData, onNavigate }: TerminalModalProps) {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState<string[]>(['$ Type "help" for available commands'])
  const [history, setHistory] = useState<string[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const inputRef = useRef<HTMLInputElement>(null)
  const outputRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus()
    }
  }, [isOpen])

  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight
    }
  }, [output])

  const searchPortfolio = (query: string, isSudo: boolean = false) => {
    const lowerQuery = query.toLowerCase()
    const results: string[] = []
    
    // Split query into individual terms for more flexible searching
    const searchTerms = lowerQuery.split(/[\s,]+/).filter(term => term.length > 0)

    // Check if user is searching for a specific category
    const showAllProjects = searchTerms.includes('projects')
    const showAllExperience = searchTerms.includes('experience') || searchTerms.includes('exp')
    const showAllSkills = searchTerms.includes('skills') || searchTerms.includes('skill')

    // Search projects
    const matchingProjects = portfolioData.projects.filter(
      p => {
        if (showAllProjects) return true
        const projectText = `${p.title} ${p.description} ${p.tech.join(' ')}`.toLowerCase()
        return searchTerms.some(term => projectText.includes(term))
      }
    )

    if (matchingProjects.length > 0) {
      results.push('>> PROJECTS:')
      matchingProjects.forEach(p => {
        results.push(`  [${p.title}]`)
        if (isSudo) {
          results.push(`  └─ ${p.description}`)
          results.push(`  └─ Tech: ${p.tech.join(', ')}`)
        }
      })
      results.push('')
    }

    // Search experiences
    const matchingExp = portfolioData.experiences.filter(
      e => {
        if (showAllExperience) return true
        const expText = `${e.company} ${e.role}`.toLowerCase()
        return searchTerms.some(term => expText.includes(term))
      }
    )

    if (matchingExp.length > 0) {
      results.push('>> EXPERIENCE:')
      matchingExp.forEach(e => {
        results.push(`  [${e.role} @ ${e.company}]`)
        if (isSudo) {
          results.push(`  └─ Period: ${e.period}`)
        }
      })
      results.push('')
    }

    // Search skills
    const matchingSkills = portfolioData.skills.filter(
      cat => {
        if (showAllSkills) return true
        const catText = `${cat.name} ${cat.skills.join(' ')}`.toLowerCase()
        return searchTerms.some(term => catText.includes(term))
      }
    )

    if (matchingSkills.length > 0) {
      results.push('>> SKILLS:')
      matchingSkills.forEach(cat => {
        const filtered = showAllSkills 
          ? cat.skills
          : cat.skills.filter(s => 
              searchTerms.some(term => s.toLowerCase().includes(term))
            )
        if (filtered.length > 0) {
          results.push(`  [${cat.name}]`)
          results.push(`  ${filtered.join(' • ')}`)
        }
      })
      results.push('')
    }

    if (results.length === 0) {
      results.push(`No results found for "${query}"`)
    }

    return results
  }

  const handleCommand = (cmd: string) => {
    const trimmed = cmd.trim()
    if (!trimmed) return

    setHistory([...history, trimmed])
    setHistoryIndex(-1)

    const newOutput = [...output, `$ ${trimmed}`]

    if (trimmed === 'help') {
      newOutput.push('Available commands:')
      newOutput.push('  cd <section>        - Navigate to section (about, projects, experience, skills, contact)')
      newOutput.push('  search <query>      - Search projects, experience, and skills')
      newOutput.push('  search projects     - Show all projects')
      newOutput.push('  search experience   - Show all work experience')
      newOutput.push('  search skills       - Show all skills')
      newOutput.push('  sudo search <query> - Admin search with detailed info')
      newOutput.push('  clear               - Clear terminal')
      newOutput.push('  exit                - Close terminal')
      newOutput.push('  help                - Show this help message')
    } else if (trimmed === 'clear') {
      setOutput(['$ Type "help" for available commands'])
      setInput('')
      return
    } else if (trimmed === 'exit') {
      onClose()
      return
    } else if (trimmed.startsWith('cd ')) {
      const section = trimmed.substring(3).trim().toLowerCase()
      const validSections = ['about', 'projects', 'experience', 'skills', 'contact']
      
      if (validSections.includes(section)) {
        newOutput.push(`>> Navigating to ${section}...`)
        if (onNavigate) {
          onNavigate(section)
        }
        setTimeout(() => {
          onClose()
        }, 300)
      } else {
        newOutput.push(`Section not found: ${section}`)
        newOutput.push(`Available sections: ${validSections.join(', ')}`)
      }
    } else if (trimmed.startsWith('search ')) {
      const query = trimmed.substring(7)
      const results = searchPortfolio(query)
      newOutput.push(...results)
    } else if (trimmed.startsWith('sudo search ')) {
      const query = trimmed.substring(12)
      const results = searchPortfolio(query, true)
      newOutput.push('>> SUDO MODE - ELEVATED ACCESS')
      newOutput.push(...results)
    } else {
      newOutput.push('command not found. Type "help" for available commands.')
    }

    setOutput(newOutput)
    setInput('')
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleCommand(input)
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      const newIndex = Math.min(historyIndex + 1, history.length - 1)
      setHistoryIndex(newIndex)
      setInput(history[history.length - 1 - newIndex] || '')
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      const newIndex = historyIndex - 1
      setHistoryIndex(newIndex)
      setInput(newIndex >= 0 ? history[history.length - 1 - newIndex] : '')
    } else if (e.key === 'Escape') {
      e.preventDefault()
      onClose()
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            onClick={e => e.stopPropagation()}
            className="w-full max-w-2xl bg-terminal-bg border border-terminal-border rounded-lg shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-terminal-border bg-gray-900">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full border border-terminal-dim/50" />
                <div className="w-3 h-3 rounded-full border border-terminal-dim/50" />
                <div className="w-3 h-3 rounded-full border border-terminal-dim/50" />
              </div>
              <span className="text-xs text-terminal-dim flex-1 ml-3">user@portfolio:~</span>
              <button
                onClick={onClose}
                className="text-terminal-dim hover:text-terminal-text text-lg transition-colors"
              >
                ✕
              </button>
            </div>

            {/* Output */}
            <div
              ref={outputRef}
              className="flex-1 overflow-y-auto p-4 space-y-1 max-h-96 bg-terminal-bg"
            >
              {output.map((line, i) => (
                <div
                  key={i}
                  className={`font-mono text-sm ${
                    line.startsWith('$')
                      ? 'text-terminal-accent'
                      : line.startsWith('>>')
                        ? 'text-terminal-text font-semibold'
                        : line.startsWith('  └')
                          ? 'text-terminal-dim'
                          : 'text-terminal-text/80'
                  }`}
                >
                  {line}
                </div>
              ))}
            </div>

            {/* Input */}
            <div className="px-4 py-3 border-t border-terminal-border bg-terminal-bg flex items-center gap-2">
              <span className="text-terminal-accent text-sm font-mono">$</span>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type command..."
                className="flex-1 bg-transparent outline-none text-terminal-text placeholder-terminal-dim/50 font-mono text-sm"
              />
            </div>

            {/* Hint */}
            <div className="px-4 py-2 text-xs text-terminal-dim/60 text-right border-t border-terminal-border/30">
              Press Escape to close • ↑↓ for history
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
