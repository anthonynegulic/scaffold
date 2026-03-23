import './globals.css'

export const metadata = {
  title: 'Scaffold',
  description: 'A learning base for UX, AI & the web',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}