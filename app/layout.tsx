import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "College Edge AI",
  description:
    "AI-powered college football and college basketball analytics, predictions, and matchup insights.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}