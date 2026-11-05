export type BlockType =
  | "hero"
  | "features"
  | "richtext"
  | "media"
  | "testimonials"
  | "faq"
  | "stats"
  | "cta"
  | "showcase"
  | "process"

export interface BaseBlock {
  id: string
  type: BlockType
  name: string
  visible: boolean
}

export interface HeroBlock extends BaseBlock {
  type: "hero"
  title: string
  subtitle: string
  badge?: string
  primaryCtaText?: string
  primaryCtaLink?: string
  secondaryCtaText?: string
  secondaryCtaLink?: string
  mediaUrl?: string
  mediaType?: "video" | "image"
  // Mini video card controls
  videoCardTitle?: string
  videoCardSubtitle?: string
  videoCardMediaUrl?: string
  // Eyebrows on top
  eyebrow1?: string
  eyebrow2?: string
  eyebrow3?: string
}

export interface FeatureItem {
  id: string
  icon: string
  title: string
  description: string
  image?: string
}

export interface FeaturesBlock extends BaseBlock {
  type: "features"
  eyebrow?: string
  heading: string
  subheading?: string
  features: FeatureItem[]
}

export interface RichTextBlock extends BaseBlock {
  type: "richtext"
  headline?: string
  content: string
}

export interface MediaBlock extends BaseBlock {
  type: "media"
  caption?: string
  mediaUrl: string
  mediaType: "image" | "video"
  aspectRatio?: "16:9" | "4:3" | "1:1" | "auto"
}

export interface TestimonialItem {
  id: string
  quote: string
  author: string
  role: string
  company: string
  avatarUrl?: string
}

export interface TestimonialsBlock extends BaseBlock {
  type: "testimonials"
  heading?: string
  items: TestimonialItem[]
}

export interface FaqItem {
  id: string
  question: string
  answer: string
}

export interface FaqBlock extends BaseBlock {
  type: "faq"
  heading: string
  subheading?: string
  items: FaqItem[]
}

export interface StatItem {
  id: string
  value: string
  label: string
}

export interface StatsBlock extends BaseBlock {
  type: "stats"
  stats: StatItem[]
}

export interface CtaBlock extends BaseBlock {
  type: "cta"
  title: string
  description?: string
  buttonText: string
  buttonLink: string
}

export interface ShowcaseItem {
  id: string
  number?: string
  category?: string
  title: string
  description: string
  image: string
  tags?: string[]
  link?: string
}

export interface ShowcaseBlock extends BaseBlock {
  type: "showcase"
  eyebrow?: string
  heading?: string
  subheading?: string
  items: ShowcaseItem[]
}

export interface ProcessItem {
  id: string
  number: string
  title: string
  description: string
  image: string
}

export interface ProcessBlock extends BaseBlock {
  type: "process"
  eyebrow?: string
  heading?: string
  subheading?: string
  steps: ProcessItem[]
}

export type PageBlock =
  | HeroBlock
  | FeaturesBlock
  | RichTextBlock
  | MediaBlock
  | TestimonialsBlock
  | FaqBlock
  | StatsBlock
  | CtaBlock
  | ShowcaseBlock
  | ProcessBlock

export type PageStatus = "published" | "draft" | "archived"

export interface PageMeta {
  metaTitle: string
  metaDescription: string
  ogImage?: string
  canonicalUrl?: string
  noIndex?: boolean
}

export interface CMSPage {
  id: string
  slug: string
  title: string
  description?: string
  status: PageStatus
  blocks: PageBlock[]
  meta: PageMeta
  updatedAt: string
  createdAt: string
  author: string
}

export interface MediaAsset {
  id: string
  name: string
  url: string
  size: number
  type: "image" | "video" | "document"
  format: string
  altText: string
  dimensions?: string
  uploadedAt: string
}

export interface NavItem {
  id: string
  label: string
  href: string
  isExternal?: boolean
  children?: NavItem[]
}

export interface GlobalSiteSettings {
  siteName: string
  logoUrl: string
  faviconUrl: string
  defaultOgImage: string
  contactEmail: string
  contactPhone: string
  address: string
  headerCtaText: string
  headerCtaLink: string
  navItems: NavItem[]
  footerColumns: {
    id: string
    title: string
    links: { id: string; label: string; href: string }[]
  }[]
  analyticsId?: string
}

