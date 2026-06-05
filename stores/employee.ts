import { defineStore } from 'pinia'
import type { Employee } from '~/types'

export const useEmployeeStore = defineStore('employee', {
  state: () => ({
    employees: [] as Employee[],
    loading: false
  }),
  actions: {
    async fetchAll(branchId?: number) {
      this.loading = true
      try {
        const { get } = useApi()
        const params: Record<string, any> = {}
        if (branchId) params.branch_id = branchId
        const data: any = await get('/employees', params)
        this.employees = data.data || data
      } finally {
        this.loading = false
      }
    },
    async create(payload: any) {
      const { post } = useApi()
      const data: any = await post('/employees', payload)
      this.employees.unshift(data.data || data)
    },
    async update(id: number, payload: any) {
      const { put } = useApi()
      const data: any = await put(`/employees/${id}`, payload)
      const idx = this.employees.findIndex(e => e.id === id)
      if (idx !== -1) this.employees[idx] = data.data || data
    },
    async remove(id: number) {
      const { del } = useApi()
      await del(`/employees/${id}`)
      this.employees = this.employees.filter(e => e.id !== id)
    }
  }
})
