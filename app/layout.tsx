import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Bungee_Shade } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import "./globals.css"

const bungeeShade = Bungee_Shade({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-bungee-shade",
})

export const metadata: Metadata = {
  title: "Code-a-Pookalam | Digital Onam Celebration",
  description: "Experience the traditional art of Kerala's flower carpet through digital animation",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable} ${bungeeShade.variable}`}>
        <Suspense fallback={null}>{children}</Suspense>
        <Analytics />
      </body>
    </html>
  )
}
