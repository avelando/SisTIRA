import '@/styles/globals.css'
import type { Metadata } from 'next'
import { defaultMetadata } from '@/app/metadata'
import ApiProvider from '@/providers/ApiProvider';

export const metadata: Metadata = defaultMetadata

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <ApiProvider>
          {children}
        </ApiProvider>
      </body>
    </html>
  )
}

