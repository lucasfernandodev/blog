import './colors.css';
import './globals.css';
import type { Metadata } from 'next' 
import { Inter } from 'next/font/google'

export const metadata: Metadata = {
  title: {
    template: '%s | Blog - Lucas Fernando',
    default: 'Blog - Lucas Fernando'
  },
  description: 'Um diário digital com alguns tutoriais e dicas.',
  icons: "/logo.svg",
  alternates: {
    canonical: '/'
  }
}

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <html lang="pt-br" className={['dark-mode', inter.className].join(" ")}>
      <body>{children}</body>
    </html>
  )
}
