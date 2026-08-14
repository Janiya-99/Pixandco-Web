import type { Metadata } from "next"
import { AboutContent } from "./about-content"

export const metadata: Metadata = { 
  title: "About", 
  description: "Northline is an independent systems studio making AI useful inside real operations." 
}

export default function AboutPage() { 
  return <AboutContent /> 
}
