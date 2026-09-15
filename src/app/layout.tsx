import type { Metadata, Viewport } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import "./globals.css"
import { MotionProvider } from "@/components/motion/motion-provider"
import { PageTransition } from "@/components/motion/page-transition"
import { ScrollProgress } from "@/components/motion/scroll-progress"
import { SiteHeader } from "@/components/layout/site-header"
import { SiteFooter } from "@/components/layout/site-footer"

export const metadata: Metadata = {
  metadataBase: new URL("https://pixandco.lk"),
  title: { default: "Pix & Co — Business Software, Websites & Digital Growth", template: "%s — Pix & Co IT Solutions (Pvt) Ltd" },
  description: "Business software and digital growth solutions built around real business needs. Based in Battaramulla, serving clients worldwide.",
  openGraph: { type: "website", title: "Pix & Co IT Solutions (Pvt) Ltd", description: "Build Better. Operate Smarter. Grow Faster.", images: ["/images/site/2l8Wl4e6GvRUtl6qrfXsaZKZassb2ef.jpg"] },
  twitter: { card: "summary_large_image", title: "Pix & Co IT Solutions (Pvt) Ltd", description: "Build Better. Operate Smarter. Grow Faster.", images: ["/images/site/2l8Wl4e6GvRUtl6qrfXsaZKZassb2ef.jpg"] },
}
export const viewport: Viewport = { themeColor: "#050505", colorScheme: "dark" }

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}><body suppressHydrationWarning className={GeistSans.className}><ScrollProgress /><MotionProvider><SiteHeader /><PageTransition>{children}</PageTransition><SiteFooter /></MotionProvider><div className="site-noise" aria-hidden /></body></html>
}
