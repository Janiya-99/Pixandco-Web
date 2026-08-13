import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { ArticleCard } from "@/components/blog/article-card"
import { Container } from "@/components/layout/container"
import { Section } from "@/components/layout/section"
import { FinalCta } from "@/components/sections/shared/final-cta"
import { PageHero } from "@/components/sections/shared/page-hero"
import { posts } from "@/content/posts"

export const metadata: Metadata = { title: "Journal", description: "Field notes on AI, automation, operations, and useful systems." }

export default function BlogPage() { const featured = posts[0]; if (!featured) return null; return <><PageHero eyebrow="The journal" title="IDEAS FOR USEFUL INTELLIGENCE." intro="Field notes on designing calmer operations, earning trust in automated systems, and putting AI to work without the theatre." /><Section><Container><Link href={`/blog/${featured.slug}`} className="image-hover focus-ring group grid gap-8 border-y border-white/10 py-8 lg:grid-cols-[1.2fr_.8fr]"><div className="relative aspect-[16/10] overflow-hidden"><Image src={featured.image} alt="" fill priority sizes="65vw" className="cinematic-image object-cover transition duration-700" /></div><div className="flex flex-col justify-between py-2"><div><p className="eyebrow text-white/35">/ Featured · {featured.category}</p><h2 className="mt-8 text-4xl leading-[1.02] tracking-[-.045em] md:text-6xl">{featured.title}</h2><p className="mt-7 max-w-md text-sm leading-7 text-white/50">{featured.excerpt}</p></div><div className="mt-10 flex items-center justify-between border-t border-white/10 pt-5 text-xs uppercase tracking-[.1em]"><span>{featured.date} · {featured.readingTime}</span><ArrowUpRight className="size-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" /></div></div></Link><div className="mt-24 flex flex-wrap gap-3 border-b border-white/10 pb-5">{["All notes","Perspective","Systems","Field notes"].map((item,index)=><span key={item} className={`border px-4 py-2 text-[10px] uppercase tracking-[.12em] ${index === 0 ? "border-white bg-white text-black" : "border-white/15 text-white/45"}`}>{item}</span>)}</div><div className="mt-12 grid gap-10 md:grid-cols-3">{posts.map(post => <ArticleCard key={post.slug} post={post} />)}</div></Container></Section><FinalCta /></> }
