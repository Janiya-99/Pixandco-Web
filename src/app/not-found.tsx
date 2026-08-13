import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Container } from "@/components/layout/container"

export default function NotFound() { return <section className="grid min-h-screen place-items-center py-32"><Container><div className="border-y border-white/10 py-14"><p className="display text-white/15">404</p><div className="mt-10 grid gap-8 md:grid-cols-2"><h1 className="text-4xl tracking-[-.045em] md:text-6xl">Signal lost.</h1><div><p className="max-w-md text-base leading-7 text-white/50">The page you’re looking for doesn’t exist or has moved beyond this route.</p><Link href="/" className="focus-ring mt-8 inline-flex min-h-11 items-center gap-3 text-xs uppercase tracking-[.12em]"><ArrowLeft className="size-4" /> Back home</Link></div></div></div></Container></section> }
