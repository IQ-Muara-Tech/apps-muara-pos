import { defineStore } from 'pinia'
import type { Branch } from '~/types'

export const useBranchStore = defineStore('branch', {
  state: () => ({
    branches: [] as Branch[],
    loading: false
  }),
  actions: {
    async fetchAll() {
      this.loading = true
      try {
        const { get } = useApi()
        const data: any = await get('/branches')
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
    }
  }
})
