export interface AdminUser {
  id: string
  name: string
  email: string
  role: "superadmin" | "editor"
  avatar: string
}

export interface AuthState {
  user: AdminUser | null
  token: string | null
  isAuthenticated: boolean
  isLoading: boolean
}
