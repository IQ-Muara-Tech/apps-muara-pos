import { defineStore } from 'pinia'
import type { Category } from '~/types'

export const useCategoryStore = defineStore('category', {
  state: () => ({
    categories: [] as Category[],
    loading: false
  }),
  actions: {
    async fetchAll(branchId?: number) {
      this.loading = true
      try {
        const { get } = useApi()
        const params: any = {}
        if (branchId) params.branch_id = branchId
        const data: any = await get('/categories', params)
        this.categories = data.data || data
      } finally {
        this.loading = false
      }
    },
    async create(data: Partial<Category>) {
      const { post } = useApi()
      const res: any = await post('/categories', data)
      this.categories.push(res.data || res)
    },
    async update(id: number, data: Partial<Category>) {
      const { put } = useApi()
      const res: any = await put(`/categories/${id}`, data)
      const idx = this.categories.findIndex(c => c.id === id)
      if (idx !== -1) this.categories[idx] = res.data || res
    },
    async remove(id: number) {
      const { del } = useApi()
      await del(`/categories/${id}`)
      this.categories = this.categories.filter(c => c.id !== id)
    }
  }
})
