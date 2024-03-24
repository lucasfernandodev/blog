import type { Metadata } from 'next'
import './globals.css';
import { cookies } from 'next/headers';

export const metadata: Metadata = {
  title: {
    template: '%s | Blog - Lucas Fernando',
    default: 'Blog - Lucas Fernando'
  },
  description: 'Um diário digital com alguns tutoriais e dicas.',
  icons: "/logo.svg"
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {


  const theme = cookies().get("theme")

  return (
    <html lang="pt-br" className={theme?.value}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  )
}
