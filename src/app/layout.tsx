import type { Metadata } from "next"
import { Inter } from "next/font/google"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "AutoFlow — AI Business Process Automation",
  description: "Automate bookkeeping, HR, inventory, scheduling, invoicing and more with AI. Plans from $49/mo.",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.className}>
      <body style={{ margin: 0, padding: 0, background: "#08080c", color: "#e0e0ef", fontFamily: "'Inter', -apple-system, sans-serif" }}>
        {children}
      </body>
    </html>
  )
}
