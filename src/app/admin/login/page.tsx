"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Eye, EyeOff, Lock, Mail, ArrowRight, Shield } from "lucide-react"
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
    <div className="relative min-h-screen w-full flex items-center justify-center p-4 bg-black text-white font-[var(--font-poppins)]">
      {/* Container */}
      <div className="w-full max-w-sm rounded-2xl border border-white/10 bg-[#0c0c0f] p-6 shadow-2xl space-y-5">
        {/* Brand */}
        <div className="text-center space-y-1.5">
          <div className="inline-flex h-9 w-9 rounded-xl border border-white/15 bg-black items-center justify-center font-bold text-white text-xs">
            P
          </div>
          <h1 className="text-sm font-semibold text-white tracking-wide uppercase">
            Pix & Co CMS
          </h1>
          <p className="text-[11px] text-white/40">
            Sign in with administrative credentials
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-3.5">
          <div className="space-y-1">
            <label className="text-[10px] uppercase tracking-wider text-white/40 font-medium">
              Email Address
            </label>
            <div className="relative">
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@pixandco.lk"
                required
                className="h-8 pl-8 border-white/10 bg-black/60 text-white placeholder:text-white/20 text-xs rounded-lg"
              />
              <Mail className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-white/40" />
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <label className="text-[10px] uppercase tracking-wider text-white/40 font-medium">
                Password
              </label>
              <span className="text-[9px] text-white/40">
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
                className="h-8 pl-8 pr-8 border-white/10 bg-black/60 text-white placeholder:text-white/20 text-xs rounded-lg"
              />
              <Lock className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-white/40" />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2.5 top-2.5 text-white/40 hover:text-white"
              >
                {showPassword ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between pt-0.5">
            <label className="flex items-center gap-1.5 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="rounded border-white/20 bg-black text-white"
              />
              <span className="text-[10px] text-white/50">
                Remember session
              </span>
            </label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full h-8 inline-flex items-center justify-center gap-1.5 text-xs rounded-lg bg-white text-black font-semibold hover:bg-white/90 transition-colors"
          >
            {loading ? "Authenticating..." : "Sign In to Portal"}
            <ArrowRight className="h-3 w-3" />
          </button>
        </form>

        <p className="text-[10px] text-center text-white/30 pt-1">
          Self-contained auth store. Any password &ge;6 characters logs in.
        </p>
      </div>
    </div>
  )
}
