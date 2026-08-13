import type { Metadata } from "next"
import Image from "next/image"
import { notFound } from "next/navigation"
import { ArticleCard } from "@/components/blog/article-card"
import { Container } from "@/components/layout/container"
import { Section } from "@/components/layout/section"
import { FinalCta } from "@/components/sections/shared/final-cta"
import { posts } from "@/content/posts"

type ArticlePageProps = { params: Promise<{ slug: string }> }
export function generateStaticParams() { return posts.map(post => ({ slug: post.slug })) }
export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> { const { slug } = await params; const post = posts.find(item => item.slug === slug); return post ? { title: post.title, description: post.excerpt, openGraph: { type: "article", images: [post.image] } } : {} }

export default async function ArticlePage({ params }: ArticlePageProps) { const { slug } = await params; const post = posts.find(item => item.slug === slug); if (!post) notFound(); return <><article><header className="pb-16 pt-40 md:pb-24 md:pt-48"><Container><p className="eyebrow text-white/40">/ {post.category}</p><h1 className="mt-10 max-w-6xl text-5xl leading-[.96] tracking-[-.055em] md:text-8xl">{post.title}</h1><div className="mt-12 flex gap-5 text-xs uppercase tracking-[.1em] text-white/40"><span>{post.date}</span><span>{post.readingTime}</span></div></Container></header><Container><div className="relative aspect-[16/9] overflow-hidden"><Image src={post.image} alt="" fill priority sizes="100vw" className="cinematic-image object-cover" /></div></Container><Section><Container><div className="rich-copy mx-auto max-w-[760px]"><p className="!mt-0 text-xl !leading-9 text-white/75">{post.excerpt}</p>{post.content.map(section => <section key={section.heading}><h2>{section.heading}</h2><p>{section.body}</p></section>)}<blockquote className="my-16 border-l border-white/40 pl-7 text-2xl leading-snug tracking-[-.03em]">“Automation is valuable only when it leaves the work clearer than it found it.”</blockquote></div></Container></Section></article><Section className="bg-[#080808]"><Container><p className="eyebrow mb-12 text-white/35">/ Continue reading</p><div className="grid gap-10 md:grid-cols-2">{posts.filter(item => item.slug !== post.slug).slice(0,2).map(item => <ArticleCard key={item.slug} post={item} />)}</div></Container></Section><FinalCta /></> }
