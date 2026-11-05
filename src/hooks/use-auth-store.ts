import { create } from "zustand"
import { AdminUser, AuthState } from "@/types/auth.types"

interface AuthStore extends AuthState {
  login: (email: string, password: string, rememberMe?: boolean) => Promise<boolean>
  logout: () => void
  checkAuth: () => void
}

const STORAGE_KEY = "pixandco_cms_auth_session"

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: true,

  checkAuth: () => {
    if (typeof window === "undefined") return
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        const parsed = JSON.parse(stored)
        set({ user: parsed.user, token: parsed.token, isAuthenticated: true, isLoading: false })
        return
      }
    } catch (e) {
      console.error("Auth hydration error", e)
    }
    set({ user: null, token: null, isAuthenticated: false, isLoading: false })
  },

  login: async (email, password, rememberMe = true) => {
    // Principal architectural mock layer supporting instant sign-in with any valid email
    if (email && password.length >= 6) {
      const mockUser: AdminUser = {
        id: "usr_admin_01",
        name: (email.split("@")[0] || "admin").toUpperCase(),
        email: email,
        role: "superadmin",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
      }
      const token = `jwt_mock_${Date.now()}`

      if (typeof window !== "undefined" && rememberMe) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify({ user: mockUser, token }))
      }

      set({ user: mockUser, token, isAuthenticated: true, isLoading: false })
      return true
    }
    return false
  },

  logout: () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem(STORAGE_KEY)
    }
    set({ user: null, token: null, isAuthenticated: false, isLoading: false })
  },
}))
