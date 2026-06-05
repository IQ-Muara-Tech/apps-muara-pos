import { defineStore } from 'pinia'
import type { User, Branch } from '~/types'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as User | null,
    token: null as string | null,
    selectedBranch: null as Branch | null,
    ready: false
  }),
  getters: {
    isAuthenticated: (state) => !!state.token,
    isKasir: (state) => state.user?.role_id === 2
  },
  actions: {
    hydrate() {
      if (import.meta.client) {
        this.token = localStorage.getItem('auth_token')
        const saved = localStorage.getItem('selected_branch')
        if (saved) {
          try { this.selectedBranch = JSON.parse(saved) } catch {}
        }
      }
    },
    setToken(token: string) {
      this.token = token
      if (import.meta.client) {
        localStorage.setItem('auth_token', token)
      }
    },
    async login(username: string, password: string) {
      const { post } = useApi()
      const data: any = await post('/login', { username, password })
      this.setToken(data.token)
      this.user = data.user
      return data
    },
    async fetchUser() {
      if (!this.token) return
      try {
        const { get } = useApi()
        const data: any = await get('/user')
        this.user = data as User
      } catch {
        this.logout()
      }
    },
    selectBranch(branch: Branch) {
      this.selectedBranch = branch
      if (import.meta.client) {
        localStorage.setItem('selected_branch', JSON.stringify(branch))
      }
    },
    clearBranch() {
      this.selectedBranch = null
      if (import.meta.client) {
        localStorage.removeItem('selected_branch')
      }
    },
    logout() {
      this.user = null
      this.token = null
      this.selectedBranch = null
      if (import.meta.client) {
        localStorage.removeItem('auth_token')
        localStorage.removeItem('selected_branch')
        navigateTo('/login')
      }
    }
  }
})
