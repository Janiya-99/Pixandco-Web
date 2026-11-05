import type { Metadata } from "next"
import { getStoredPageBySlug } from "@/lib/server-cms"
import { AboutContent } from "./about-content"
import { companyOverview } from "@/content/site"

export const dynamic = "force-dynamic"
export const revalidate = 0

export const metadata: Metadata = {
  title: "About",
  description: "Pix & Co IT Solutions (Pvt) Ltd is a registered Sri Lankan business based in Battaramulla, at the heart of Greater Colombo.",
}

export default async function AboutPage() {
  const aboutData = await getStoredPageBySlug("about")
  return <AboutContent cmsData={aboutData} />
}
