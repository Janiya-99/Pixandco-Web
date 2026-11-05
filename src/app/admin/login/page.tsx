"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { Eye, EyeOff, Lock, Mail, ArrowRight, Sparkles } from "lucide-react"
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
    } catch (err) {
      toast.error("Failed to authenticate session.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="grid min-h-screen w-full lg:grid-cols-2">
      {/* Left Visual/Brand Panel */}
      <div className="relative hidden lg:flex flex-col justify-between bg-card p-12 border-r border-border/80 overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-foreground/5 blur-3xl" />
        <div className="absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-foreground/5 blur-3xl" />

        {/* Brand Top */}
        <div className="flex items-center gap-3 z-10">
          <div className="h-9 w-9 rounded bg-foreground text-background flex items-center justify-center font-mono font-bold text-sm">
            P
          </div>
          <div>
            <h1 className="font-mono text-sm font-semibold tracking-wider uppercase text-foreground">
              Pix & Co IT Solutions
            </h1>
            <p className="text-xs text-muted-foreground font-mono">
              Enterprise CMS Portal & Page Builder
            </p>
          </div>
        </div>

        {/* Testimonial / Product statement */}
        <div className="z-10 max-w-md space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-muted/40 px-3 py-1 text-xs text-muted-foreground font-mono">
            <Sparkles className="h-3 w-3 text-foreground" />
            <span>Deterministic System Control</span>
          </div>
          <h2 className="text-2xl font-medium tracking-tight text-foreground font-mono">
            &ldquo;Precision engineering that brings effortless agility to web content and brand architecture.&rdquo;
          </h2>
          <div className="pt-2">
            <p className="text-xs font-semibold text-foreground font-mono uppercase">
              Operational Studio v2.4
            </p>
            <p className="text-xs text-muted-foreground">
              High-density content management layer
            </p>
          </div>
        </div>

        {/* Footer Meta */}
        <div className="z-10 text-[11px] text-muted-foreground font-mono">
          © {new Date().getFullYear()} Pix & Co (Pvt) Ltd. All rights reserved.
        </div>
      </div>

      {/* Right Minimalist Auth Form */}
      <div className="flex flex-col justify-center px-8 sm:px-12 lg:px-20 py-12">
        <div className="mx-auto w-full max-w-sm space-y-8">
          {/* Header */}
          <div className="space-y-2">
            <h2 className="text-xl font-bold tracking-tight text-foreground font-mono">
              SIGN IN TO PORTAL
            </h2>
            <p className="text-xs text-muted-foreground font-mono">
              Enter your administrative credentials to manage public pages.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-1.5">
              <label className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
                Email Address
              </label>
              <div className="relative">
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@pixandco.lk"
                  required
                  className="pl-9 font-mono text-xs"
                />
                <Mail className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
                  Password
                </label>
                <span className="text-[10px] text-muted-foreground/80 font-mono">
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
                  className="pl-9 pr-9 font-mono text-xs"
                />
                <Lock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded border-border/80 bg-background text-foreground focus:ring-1 focus:ring-ring"
                />
                <span className="text-xs text-muted-foreground font-mono">
                  Remember session
                </span>
              </label>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full gap-2 h-10 font-mono text-xs tracking-wider"
            >
              {loading ? "Authenticating..." : "Authenticate Session"}
              <ArrowRight className="h-3.5 w-3.5" />
            </Button>
          </form>

          {/* Quick Notice */}
          <div className="rounded-md border border-border/60 bg-muted/20 p-3 text-center">
            <p className="text-[11px] text-muted-foreground font-mono">
              Self-contained admin state. Any valid email with &ge;6 character password logs in.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
