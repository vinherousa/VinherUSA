import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "VIN Scanner Pro - Advanced Vehicle Inventory Management",
  description: "Professional VIN scanning and inventory management system for automotive dealerships and businesses.",
  keywords: "VIN scanner, vehicle inventory, automotive, dealership management, car inventory",
  authors: [{ name: "VIN Scanner Pro" }],
  openGraph: {
    title: "VIN Scanner Pro - Advanced Vehicle Inventory Management",
    description: "Professional VIN scanning and inventory management system for automotive dealerships and businesses.",
    type: "website",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
        <Analytics />
      </body>
    </html>
  )
}
