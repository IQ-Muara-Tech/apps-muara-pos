import { defineStore } from 'pinia'
import type { Branch } from '~/types'

export const useBranchStore = defineStore('branch', {
  state: () => ({
    branches: [] as Branch[],
    loading: false
  }),
  actions: {
    async fetchAll(all = false) {
      this.loading = true
      try {
        const { get } = useApi()
        const params: Record<string, any> = {}
        if (all) params.all = true
        const data: any = await get('/branches', params)
        this.branches = data.data || data
      } finally {
        this.loading = false
      }
    },
    async create(data: Partial<Branch>) {
      const { post } = useApi()
      const res: any = await post('/branches', data)
      this.branches.push(res.data || res)
    },
    async update(id: number, data: Partial<Branch>) {
      const { put } = useApi()
      const res: any = await put(`/branches/${id}`, data)
      const idx = this.branches.findIndex(b => b.id === id)
      if (idx !== -1) this.branches[idx] = res.data || res
    },
    async remove(id: number) {
      const { del } = useApi()
      await del(`/branches/${id}`)
      this.branches = this.branches.filter(b => b.id !== id)
    },
    async toggleStatus(id: number) {
      const { put } = useApi()
      const res: any = await put(`/branches/${id}/toggle-status`)
      const idx = this.branches.findIndex(b => b.id === id)
      if (idx !== -1) this.branches[idx] = res.data || res
    }
  }
})
