import { defineStore } from 'pinia'
import type { RawMaterial, RawMaterialStock } from '~/types'

export const useRawMaterialStore = defineStore('rawMaterial', {
  state: () => ({
    materials: [] as RawMaterial[],
    stocks: [] as RawMaterialStock[],
    loading: false
  }),
  actions: {
    async fetchAll(branchId?: number) {
      this.loading = true
      try {
        const { get } = useApi()
        const params: Record<string, any> = {}
        if (branchId) params.branch_id = branchId
        const data: any = await get('/raw-materials', params)
        this.materials = data.data || data
      } finally {
        this.loading = false
      }
    },
    async create(payload: Partial<RawMaterial>) {
      const { post } = useApi()
      const data: any = await post('/raw-materials', payload)
      this.materials.unshift(data.data || data)
    },
    async update(id: number, payload: Partial<RawMaterial>) {
      const { put } = useApi()
      const data: any = await put(`/raw-materials/${id}`, payload)
      const idx = this.materials.findIndex(m => m.id === id)
      if (idx !== -1) this.materials[idx] = data.data || data
    },
    async remove(id: number) {
      const { del } = useApi()
      await del(`/raw-materials/${id}`)
      this.materials = this.materials.filter(m => m.id !== id)
    },
    async bulkUpdate(items: { id: number; min_stock: number }[]) {
      const { put } = useApi()
      await put('/raw-materials/bulk-update', { items })
      await this.fetchAll()
    },
    async fetchStocks(params?: Record<string, any>) {
      this.loading = true
      try {
        const { get } = useApi()
        const data: any = await get('/raw-material-stocks', params)
        this.stocks = data.data || data
      } finally {
        this.loading = false
      }
    },
    async saveBulkStock(data: { branch_id: number; date: string; items: { raw_material_id: number; stock: number; remaining?: number }[] }) {
      const { post } = useApi()
      await post('/raw-material-stocks/bulk', data)
    }
  }
})
