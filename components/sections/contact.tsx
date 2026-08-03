'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'

export function ContactSection() {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500))

    setSubmitted(true)
    setEmail('')
    setMessage('')
    setIsLoading(false)

    setTimeout(() => setSubmitted(false), 3000)
  }

  return (
    <section id="contact" className="space-y-6 py-8">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: false }}
        className="space-y-4"
      >
        <div className="text-terminal-dim text-sm">$ telnet contact</div>

        {submitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="border border-terminal-accent/50 bg-terminal-accent/5 rounded-sm p-4 text-center"
          >
            <div className="text-terminal-accent font-semibold text-sm">
              ✓ Message received
            </div>
            <div className="text-terminal-accent/60 text-xs mt-2">
              Thanks for reaching out! I&apos;ll get back to you soon.
            </div>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
            <div className="space-y-2">
              <label className="block text-terminal-dim text-xs uppercase tracking-wider">
                Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="user@example.com"
                className="w-full bg-terminal-bg border border-terminal-accent/30 text-terminal-accent placeholder-terminal-dim/50 px-3 py-2 rounded-sm text-sm focus:outline-none focus:border-terminal-accent focus:ring-1 focus:ring-terminal-accent/30 transition-all"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-terminal-dim text-xs uppercase tracking-wider">
                Message
              </label>
              <textarea
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Your message here..."
                rows={5}
                className="w-full bg-terminal-bg border border-terminal-accent/30 text-terminal-accent placeholder-terminal-dim/50 px-3 py-2 rounded-sm text-sm focus:outline-none focus:border-terminal-accent focus:ring-1 focus:ring-terminal-accent/30 transition-all resize-none"
              />
            </div>

            <motion.button
              whileHover={{ scale: 1.02, boxShadow: '0 0 15px rgba(0, 255, 65, 0.3)' }}
              whileTap={{ scale: 0.98 }}
              disabled={isLoading}
              type="submit"
              className="w-full border border-terminal-accent/50 bg-terminal-bg hover:bg-terminal-accent/10 text-terminal-accent py-2 rounded-sm text-sm font-mono transition-all disabled:opacity-50"
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="terminal-cursor">_</span>
                  <span>sending...</span>
                </span>
              ) : (
                '$ send message'
              )}
            </motion.button>
          </form>
        )}

        {/* Contact info */}
        <div className="space-y-2 pt-4 border-t border-terminal-accent/30">
          <div className="text-terminal-dim text-xs">$ cat links</div>
          <div className="flex flex-wrap gap-4 pt-2">
            {[
              { name: 'GitHub', url: 'https://github.com/zrlldy' },
              { name: 'LinkedIn', url: 'https://ph.linkedin.com/in/jerold-noynay-660729369' },
              { name: 'Facebook', url: 'https://www.facebook.com/jeroldnoynay21' },
              { name: 'Email', url: 'mailto:jeroldnoynay03@gmail.com' },
            ].map((link, index) => (
              <motion.a
                key={index}
                href={link.url}
                whileHover={{ x: 2, textShadow: '0 0 10px rgba(0, 255, 65, 0.5)' }}
                className="text-terminal-accent/70 hover:text-terminal-accent text-xs font-mono transition-all"
              >
                {link.name}
              </motion.a>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  )
}
