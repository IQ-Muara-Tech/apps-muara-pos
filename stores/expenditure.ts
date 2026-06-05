import { defineStore } from 'pinia'
import type { Expenditure, ExpenditureCategory } from '~/types'

export const useExpenditureStore = defineStore('expenditure', {
  state: () => ({
    categories: [] as ExpenditureCategory[],
    expenditures: [] as Expenditure[],
    totalAmount: 0,
    loading: false
  }),
  actions: {
    async fetchCategories(params?: Record<string, any>) {
      const { get } = useApi()
      const data: any = await get('/expenditure-categories', params)
      this.categories = data.data || data
    },
    async createCategory(categoryData: { branch_id: number; name: string; description?: string; key?: string }) {
      const { post } = useApi()
      const res: any = await post('/expenditure-categories', categoryData)
      this.categories.push(res.data || res)
      return res.data || res
    },
    async updateCategory(id: number, categoryData: { name: string; description?: string; key?: string }) {
      const { put } = useApi()
      const res: any = await put(`/expenditure-categories/${id}`, categoryData)
      const idx = this.categories.findIndex(c => c.id === id)
      if (idx !== -1) this.categories[idx] = res.data || res
      return res.data || res
    },
    async deleteCategory(id: number) {
      const { del } = useApi()
      await del(`/expenditure-categories/${id}`)
      this.categories = this.categories.filter(c => c.id !== id)
    },
    async fetchExpenditures(params?: Record<string, any>) {
      this.loading = true
      try {
        const { get } = useApi()
        const data: any = await get('/expenditures', params)
        this.totalAmount = data.total_amount || 0
        this.expenditures = data.expenditures || []
      } finally {
        this.loading = false
      }
    },
    async createExpenditure(data: { expenditure_category_id: number; branch_id: number; description: string; amount: number; date: string }) {
      const { post } = useApi()
      const res: any = await post('/expenditures', data)
      this.expenditures.unshift(res.data || res)
      this.totalAmount += Number(data.amount)
      return res.data || res
    },
    async updateExpenditure(id: number, data: { expenditure_category_id: number; description: string; amount: number; date: string }) {
      const { put } = useApi()
      const res: any = await put(`/expenditures/${id}`, data)
      const idx = this.expenditures.findIndex(e => e.id === id)
      if (idx !== -1) {
        const oldAmount = this.expenditures[idx].amount
        this.totalAmount = this.totalAmount - Number(oldAmount) + Number(data.amount)
        this.expenditures[idx] = res.data || res
      }
      return res.data || res
    },
    async deleteExpenditure(id: number) {
      const { del } = useApi()
      const item = this.expenditures.find(e => e.id === id)
      if (item) this.totalAmount -= Number(item.amount)
      await del(`/expenditures/${id}`)
      this.expenditures = this.expenditures.filter(e => e.id !== id)
    }
  }
})
