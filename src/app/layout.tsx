import './globals.css';
import type { Metadata } from 'next' 
import { PT_Sans } from 'next/font/google'

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

const inter = PT_Sans({ 
  weight: ['400', '700'],
  subsets: ['latin'],
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
