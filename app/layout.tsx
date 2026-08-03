import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { JetBrains_Mono } from 'next/font/google'
import './globals.css'

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
})

export const metadata: Metadata = {
  title: 'Zrldy - Portfolio',
  description: 'Interactive terminal-style portfolio',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/terminal.webp',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/terminal.webp',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/terminal.webp',
        type: 'image/svg+xml',
      },
    ],
    apple: '/terminal.webp',
  },
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#0a0a0a',
  userScalable: true,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={jetbrainsMono.variable}>
      <body className="antialiased bg-terminal-bg text-terminal-text">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
