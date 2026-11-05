"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Eye, EyeOff, Lock, Mail, ArrowRight, Sparkles, Shield, Cpu, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useAuthStore } from "@/hooks/use-auth-store"
import { toast } from "sonner"

export default function AdminLoginPage() {
  const router = useRouter()
  const { login, isAuthenticated } = useAuthStore()
  const [email, setEmail] = React.useState("admin@pixandco.lk")
  const [password, setPassword] = React.useState("password123")
  const [showPassword, setShowPassword] = React.useState(false)
  const [rememberMe, setRememberMe] = React.useState(true)
  const [loading, setLoading] = React.useState(false)

  React.useEffect(() => {
    if (isAuthenticated) {
      router.push("/admin/dashboard")
    }
  }, [isAuthenticated, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const ok = await login(email, password, rememberMe)
      if (ok) {
        toast.success("Welcome back, Administrator")
        router.push("/admin/dashboard")
      } else {
        toast.error("Invalid credentials. Password must have at least 6 characters.")
      }
    } catch {
      toast.error("Failed to authenticate session.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-[#020617] text-slate-100 overflow-hidden font-sans">
      {/* 3D Luminous Ambient Spheres */}
      <div className="pointer-events-none absolute top-1/4 -left-48 h-96 w-96 rounded-full bg-sky-500/15 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-1/4 -right-48 h-96 w-96 rounded-full bg-blue-600/20 blur-[130px]" />
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-cyan-400/10 blur-[150px]" />

      {/* Grid overlay */}
      <div 
        className="pointer-events-none absolute inset-0 opacity-[0.15]" 
        style={{
          backgroundImage: `linear-gradient(to right, rgba(56, 189, 248, 0.15) 1px, transparent 1px), linear-gradient(to bottom, rgba(56, 189, 248, 0.15) 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}
      />

      {/* Main Glass 3D Container */}
      <div className="relative z-10 w-full max-w-4xl grid lg:grid-cols-12 rounded-2xl border border-sky-500/20 bg-slate-950/70 backdrop-blur-2xl shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9),0_0_30px_-5px_rgba(14,165,233,0.25)] overflow-hidden">
        {/* Left Branding Showcase */}
        <div className="relative lg:col-span-5 hidden lg:flex flex-col justify-between p-10 bg-gradient-to-br from-slate-900/90 via-slate-950/80 to-[#020617]/90 border-r border-sky-500/20">
          {/* Subtle glowing accent line */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-sky-400 to-transparent" />

          {/* Top Brand Logo */}
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-sky-400 via-sky-500 to-blue-600 flex items-center justify-center font-mono font-bold text-slate-950 text-sm shadow-[0_0_20px_rgba(56,189,248,0.5)]">
              P
            </div>
            <div>
              <h1 className="font-mono text-sm font-bold tracking-wider uppercase text-white">
                PIX & CO CMS
              </h1>
              <p className="text-[11px] text-sky-400/80 font-mono flex items-center gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-sky-400 animate-pulse" />
                Luminous Core v2.4
              </p>
            </div>
          </div>

          {/* Middle 3D Card Graphic */}
          <div className="space-y-4 my-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-sky-500/30 bg-sky-500/10 px-3 py-1 text-xs text-sky-300 font-mono shadow-[0_0_15px_rgba(56,189,248,0.2)]">
              <Sparkles className="h-3.5 w-3.5 text-sky-400" />
              <span>Next-Gen Enterprise Control</span>
            </div>
            <h2 className="text-2xl font-bold tracking-tight text-white leading-snug">
              Architecture & Content Orchestration Engine.
            </h2>
            <p className="text-xs text-slate-400 leading-relaxed">
              Real-time block manipulation, global SEO parameters, and high-performance digital asset delivery.
            </p>

            {/* Feature Pills */}
            <div className="pt-2 grid grid-cols-2 gap-2 text-[10px] font-mono">
              <div className="rounded-lg border border-sky-500/20 bg-slate-900/50 p-2 text-slate-300 flex items-center gap-1.5 shadow-sm">
                <Zap className="h-3 w-3 text-sky-400" />
                <span>Zero-Downtime</span>
              </div>
              <div className="rounded-lg border border-sky-500/20 bg-slate-900/50 p-2 text-slate-300 flex items-center gap-1.5 shadow-sm">
                <Cpu className="h-3 w-3 text-sky-400" />
                <span>Block Matrix</span>
              </div>
            </div>
          </div>

          {/* Bottom security assurance */}
          <div className="text-[11px] text-slate-500 font-mono flex items-center gap-2">
            <Shield className="h-3.5 w-3.5 text-sky-400/60" />
            <span>End-to-End Encrypted Session</span>
          </div>
        </div>

        {/* Right Form Card */}
        <div className="lg:col-span-7 flex flex-col justify-center p-8 sm:p-12 bg-slate-950/50">
          <div className="mx-auto w-full max-w-sm space-y-7">
            {/* Mobile Header */}
            <div className="flex items-center gap-3 lg:hidden mb-2">
              <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-sky-400 to-blue-600 flex items-center justify-center font-mono font-bold text-slate-950 text-xs shadow-[0_0_15px_rgba(56,189,248,0.5)]">
                P
              </div>
              <div>
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-white">
                  Pix & Co CMS
                </span>
                <p className="text-[10px] text-sky-400/80 font-mono">Luminous Portal</p>
              </div>
            </div>

            {/* Form Title */}
            <div className="space-y-1.5">
              <h2 className="text-xl font-bold tracking-tight text-white font-mono flex items-center gap-2">
                AUTHENTICATE
                <span className="h-2 w-2 rounded-full bg-sky-400 shadow-[0_0_10px_#38bdf8]" />
              </h2>
              <p className="text-xs text-slate-400 font-mono">
                Provide administrative credentials to access the portal.
              </p>
            </div>

            {/* Form Fields */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-[11px] font-mono uppercase tracking-wider text-slate-300">
                  Email Address
                </label>
                <div className="relative">
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@pixandco.lk"
                    required
                    className="h-10 pl-9 border-sky-500/20 bg-slate-900/60 text-white placeholder:text-slate-500 font-mono text-xs focus-visible:border-sky-400 focus-visible:ring-sky-400/30 transition-all rounded-lg"
                  />
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-sky-400/60" />
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-[11px] font-mono uppercase tracking-wider text-slate-300">
                    Password
                  </label>
                  <span className="text-[10px] text-sky-400/80 font-mono">
                    Default: password123
                  </span>
                </div>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    className="h-10 pl-9 pr-9 border-sky-500/20 bg-slate-900/60 text-white placeholder:text-slate-500 font-mono text-xs focus-visible:border-sky-400 focus-visible:ring-sky-400/30 transition-all rounded-lg"
                  />
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-sky-400/60" />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-slate-400 hover:text-sky-300 transition-colors"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between pt-1">
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="rounded border-sky-500/30 bg-slate-900 text-sky-500 focus:ring-sky-500/40"
                  />
                  <span className="text-xs text-slate-400 font-mono">
                    Remember session
                  </span>
                </label>
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full h-11 gap-2 font-mono text-xs tracking-wider rounded-lg bg-gradient-to-r from-sky-400 via-sky-500 to-blue-600 text-slate-950 font-bold hover:brightness-110 shadow-[0_0_25px_rgba(56,189,248,0.35)] transition-all active:scale-[0.99] border-0"
              >
                {loading ? "Authenticating..." : "ENTER PORTAL"}
                <ArrowRight className="h-4 w-4" />
              </Button>
            </form>

            {/* Hint Box */}
            <div className="rounded-xl border border-sky-500/20 bg-sky-500/5 p-3.5 text-center">
              <p className="text-[11px] text-slate-400 font-mono leading-relaxed">
                Self-contained state store. Any valid email with &ge;6 characters logs in.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
