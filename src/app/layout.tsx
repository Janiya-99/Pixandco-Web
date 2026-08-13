import type { Metadata, Viewport } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import "./globals.css"
import { MotionProvider } from "@/components/motion/motion-provider"
import { ScrollProgress } from "@/components/motion/scroll-progress"
import { SiteHeader } from "@/components/layout/site-header"
import { SiteFooter } from "@/components/layout/site-footer"

export const metadata: Metadata = {
  metadataBase: new URL("https://northline.studio"),
  title: { default: "Northline Systems — Intelligent operations, built clearly", template: "%s — Northline Systems" },
  description: "We design AI-powered operating systems that remove repetitive work and make complex businesses run clearly.",
  openGraph: { type: "website", title: "Northline Systems", description: "Intelligent operations, built clearly.", images: ["/images/hero-portal.png"] },
  twitter: { card: "summary_large_image", title: "Northline Systems", description: "Intelligent operations, built clearly.", images: ["/images/hero-portal.png"] },
}
export const viewport: Viewport = { themeColor: "#050505", colorScheme: "dark" }

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}><body className={GeistSans.className}><ScrollProgress /><MotionProvider><SiteHeader /><main>{children}</main><SiteFooter /></MotionProvider><div className="site-noise" aria-hidden /></body></html>
}
