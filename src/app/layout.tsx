import './globals.css';
import type { Metadata } from 'next'
import { cookies } from 'next/headers';
import { Inter } from 'next/font/google'

export const metadata: Metadata = {
  title: {
    template: '%s | Blog - Lucas Fernando',
    default: 'Blog - Lucas Fernando'
  },
  description: 'Um diário digital com alguns tutoriais e dicas.',
  icons: "/logo.svg"
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


  const theme = cookies().get("theme") || {value: 'dark-mode'}

  return (
    <html lang="pt-br" className={[theme?.value, inter.className].join(" ")}>
      <body>{children}</body>
    </html>
  )
}
