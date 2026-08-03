'use client'

import React, { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { TerminalWindow } from '@/components/terminal-window'
import { CommandNav } from '@/components/command-nav'
import { HeroSection } from '@/components/sections/hero'
import { AboutSection } from '@/components/sections/about'
import { ProjectsSection } from '@/components/sections/projects'
import { ExperienceSection } from '@/components/sections/experience'
import { SkillsSection } from '@/components/sections/skills'
import { ContactSection } from '@/components/sections/contact'
import { TerminalModal } from '@/components/terminal-modal'
import { useCommandPalette } from '@/hooks/use-command-palette'

const NAV_ITEMS = [
  { label: 'about', id: 'about' },
  { label: 'projects', id: 'projects' },
  { label: 'experience', id: 'experience' },
  { label: 'skills', id: 'skills' },
  { label: 'contact', id: 'contact' },
]

const PORTFOLIO_DATA = {
  name: 'Jerold M. Noynay',
  title: 'Backend Developer',
  bio: 'I am a Backend Developer at EEE Inc., where I build and maintain scalable web applications, develop RESTful APIs, and design efficient database solutions. I enjoy creating reliable backend systems, writing clean and maintainable code, and solving real-world business challenges through technology.',
  about: [
    "My primary experience is with Laravel and Livewire, and I am continuously expanding my expertise in Nest.js and TypeScript to build modern, high-performance backend services. I am committed to continuous learning, improving software architecture, and delivering efficient, maintainable solutions.",
  ],
  projects: [
    {
      title: 'Schedwise',
      description: 'A web-based system designed to manage faculty loading, timetable creation, and room assignments for CTU Tabogon Extension. Strong focus on backend logic, relational database design, and Livewire-driven interactivity.'
,
      tech: ['Laravel', 'Livewire', 'Mysql'],
      url: 'https://schedwise.joycodes.org',
    },
    {
      title: 'Tidis',
      description: 'A comprehensive disaster risk reduction and management information system designed for the Municipality of Tabogon. It centralizes incident reporting, emergency response coordination, resource management, and disaster-related records to improve operational efficiency, data accuracy, and decision-making during emergencies.',
      tech: ['Nest.js', 'PostgreSQL', 'TypeScript', 'Postman'],
      url: 'https://tidis.app/',
    },
    {
      title: 'HRIS',
      description: 'Human Resource Information System for managing employee data and HR processes',
      tech: ['Laravel', 'MariaDB', 'FilamentPHP'],
      url: 'https://www.eastequatorexpress.com/',
    },
  ],
  experiences: [
   {
  company: 'EEE Inc.',
  role: 'Backend Developer & React Native Developer',
  period: '2026 - Present',
  description: 'Building and maintaining enterprise web and mobile applications by developing robust backend services with Laravel and Filament and creating cross-platform mobile applications with React Native.',
  highlights: [
    'Develop secure and maintainable REST APIs using Laravel.',
    'Create and maintain administrative dashboards with Filament.',
    'Design efficient database schemas and optimize application queries.',
    'Integrate backend services with React Native mobile applications.',
    'Implement new features, troubleshoot issues, and improve application performance.',
    'Work closely with the development team to deliver scalable and reliable software solutions.',
  ],
},
    {
  company: 'MDRRMO Tabogon',
  role: 'Backend Developer Intern',
  period: '2020 - 2022',
  description: 'Contributed to the development of Tidis, a disaster risk reduction and management information system for the Municipality of Tabogon, focusing on backend development and database design.',
  highlights: [
    'Developed and maintained backend APIs using Nest.js and TypeScript.',
    'Designed and optimized PostgreSQL database schemas for disaster management data.',
    'Implemented RESTful endpoints for incident reporting, emergency response coordination, and resource management.',
    'Tested and documented APIs using Postman to ensure reliability and maintainability.',
    'Collaborated with the development team to build scalable and efficient backend services.',
  ],
},
  
  ],
  skills: [
    {
      name: 'Frontend',
      skills: [
        'Livewire',
        'Blade',
        'TypeScript',
        'Tailwind CSS',
        'Vue.js',
      ],
    },
    {
      name: 'Backend',
      skills: [
        'Laravel',
        'Nest.js',
        'TypeScript',
        'PostgreSQL',
        'MariaDB',
      ],
    },
    {
      name: 'DevOps & Tools',
      skills: [
        'Docker',
        'Vercel',
        'Git',
        'CI/CD',
      ],
    },
    {
      name: 'Other',
      skills: [

        'REST APIs',
        'Testing',
        'Performance',
        'Agile',
      ],
    },
  ],
}

export default function Home() {
  const mainRef = useRef<HTMLDivElement>(null)
  const [activeSection, setActiveSection] = useState<string | null>(null)
  const [isTerminalOpen, setIsTerminalOpen] = useState(false)

  useCommandPalette(() => setIsTerminalOpen(true))

  const handleNavigation = (id: string) => {
    setActiveSection(id)
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <main className="min-h-screen bg-terminal-bg py-8 px-4 md:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Main terminal window */}
        <TerminalWindow title="user@portfolio:~">
          <div className="space-y-6">
            {/* Hero section always visible */}
            <HeroSection
              name={PORTFOLIO_DATA.name}
              title={PORTFOLIO_DATA.title}
              bio={PORTFOLIO_DATA.bio}
            />

            {/* Navigation */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="border-t border-terminal-border pt-6"
            >
              <div className="text-terminal-dim text-xs mb-4">Navigate using commands:</div>
              <CommandNav items={NAV_ITEMS} onNavigate={handleNavigation} />
            </motion.div>

            {/* Content sections */}
            <div ref={mainRef} className="space-y-8 border-t border-terminal-accent/30 pt-6">
              <AboutSection content={PORTFOLIO_DATA.about} />
              <ProjectsSection projects={PORTFOLIO_DATA.projects} />
              <ExperienceSection experiences={PORTFOLIO_DATA.experiences} />
              <SkillsSection categories={PORTFOLIO_DATA.skills} />
              <ContactSection />

              {/* Footer */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: false }}
                className="text-center pt-6 border-t border-terminal-accent/30 text-terminal-dim text-xs space-y-2"
              >
                <div>$ echo "Thanks for visiting"</div>
                <div className="text-terminal-accent/60">
                  © {new Date().getFullYear()} {PORTFOLIO_DATA.name} • Built with React & Terminal Vibes
                </div>
              </motion.div>
            </div>
          </div>
        </TerminalWindow>

        {/* Keyboard hint */}
        <div className="text-center text-xs text-terminal-dim/50">
          Press <kbd className="px-2 py-1 border border-terminal-border rounded text-terminal-accent/70">Cmd+K</kbd> to open terminal search
        </div>
      </div>

      {/* Terminal Modal */}
      <TerminalModal
        isOpen={isTerminalOpen}
        onClose={() => setIsTerminalOpen(false)}
        portfolioData={{
          projects: PORTFOLIO_DATA.projects,
          experiences: PORTFOLIO_DATA.experiences,
          skills: PORTFOLIO_DATA.skills,
        }}
        onNavigate={(sectionId) => {
          handleNavigation(sectionId)
        }}
      />
    </main>
  )
}
