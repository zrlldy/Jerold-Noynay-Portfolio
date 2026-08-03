'use client'

import React from 'react'

interface TerminalWindowProps {
  children: React.ReactNode
  title?: string
  className?: string
}

export function TerminalWindow({
  children,
  title = 'user@portfolio:~',
  className = '',
}: TerminalWindowProps) {
  return (
    <div className={`terminal-window ${className}`}>
      {/* Linux X11-style titlebar */}
      <div className="flex items-center gap-3 px-4 py-2 border-b border-terminal-border bg-gray-900">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full border border-terminal-dim/50 hover:bg-terminal-dim/20 cursor-pointer transition-colors" />
          <div className="w-3 h-3 rounded-full border border-terminal-dim/50 hover:bg-terminal-dim/20 cursor-pointer transition-colors" />
          <div className="w-3 h-3 rounded-full border border-terminal-dim/50 hover:bg-terminal-dim/20 cursor-pointer transition-colors" />
        </div>
        <span className="text-xs text-terminal-dim flex-1">{title}</span>
      </div>

      {/* Content */}
      <div className="relative p-6 min-h-96">
        <div className="relative z-10">{children}</div>
      </div>
    </div>
  )
}
