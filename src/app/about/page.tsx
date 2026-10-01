import type { Metadata } from "next"
import { AboutContent } from "./about-content"

export const metadata: Metadata = {
  title: "About",
  description: "Pix & Co IT Solutions (Pvt) Ltd is a registered Sri Lankan business based in Battaramulla, at the heart of Greater Colombo. For more than ten years, we have helped local and international clients solve business challenges through technology, design, and digital growth solutions."
}

export default function AboutPage() {
  return <AboutContent />
}
