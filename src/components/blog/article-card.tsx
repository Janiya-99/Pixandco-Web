import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import type { Post } from "@/types/post"

export function ArticleCard({ post }: { post: Post }) { return <article className="image-hover group border-t border-white/10 pt-5"><Link className="focus-ring block" href={`/blog/${post.slug}`}><div className="relative aspect-[4/3] overflow-hidden bg-white/5"><Image src={post.image} alt="" fill sizes="(max-width: 768px) 100vw, 33vw" className="cinematic-image object-cover transition duration-700" /></div><div className="flex justify-between pt-5 text-[10px] uppercase tracking-[.12em] text-white/40"><span>{post.category}</span><span>{post.date}</span></div><h3 className="mt-5 text-2xl leading-tight tracking-[-.035em]">{post.title}</h3><p className="mt-4 text-sm leading-6 text-white/50">{post.excerpt}</p><span className="mt-5 inline-flex items-center gap-2 text-xs uppercase tracking-[.12em]">Read article <ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" /></span></Link></article> }
