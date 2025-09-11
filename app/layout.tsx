import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import { ChatbotWidget } from "@/components/chatbot/chatbot-widget"
import "./globals.css"

export const metadata: Metadata = {
  title: "SheenMind - Mental Health Support for Students",
  description:
    "Comprehensive mental health support platform for college students in Jammu and Kashmir. Access peer support, counseling, assessments, and resources.",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable} antialiased`}>
        <Suspense fallback={null}>{children}</Suspense>
        <ChatbotWidget />
        <Analytics />
      </body>
    </html>
  )
}
