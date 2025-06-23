import '@/styles/globals.css'
import type { Metadata } from 'next'
import { defaultMetadata } from '@/app/metadata'

export const metadata: Metadata = defaultMetadata

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  )
}

