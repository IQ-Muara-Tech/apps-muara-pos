import { defineStore } from 'pinia'
import type { Product } from '~/types'

export const useProductStore = defineStore('product', {
  state: () => ({
    products: [] as Product[],
    loading: false
  }),
  actions: {
    async fetchAll(params?: Record<string, any>) {
      this.loading = true
      try {
        const { get } = useApi()
        const data: any = await get('/products', params)
        this.products = data.data || data
      } finally {
        this.loading = false
      }
    },
    async create(data: Partial<Product>) {
      const { post } = useApi()
      const res: any = await post('/products', data)
      this.products.push(res.data || res)
    },
    async update(id: number, data: Partial<Product>) {
      const { put } = useApi()
      const res: any = await put(`/products/${id}`, data)
      const idx = this.products.findIndex(p => p.id === id)
      if (idx !== -1) this.products[idx] = res.data || res
    },
    async remove(id: number) {
      const { del } = useApi()
      await del(`/products/${id}`)
      this.products = this.products.filter(p => p.id !== id)
    }
  }
})
