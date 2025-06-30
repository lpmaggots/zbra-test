import type { Metadata } from 'next'
import '<@>/styles/base/globals.scss'

export const metadata: Metadata = {
  title: 'ZBRA',
  description: 'Selection Process Test'
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-br">
      <body>
        {children}
      </body>
    </html>
  )
}
