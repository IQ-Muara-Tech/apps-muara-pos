import { defineStore } from 'pinia'

export const useReportStore = defineStore('report', {
  state: () => ({
    reportData: null as any,
    loading: false
  }),
  actions: {
    async fetchSales(params: { date_from?: string; date_to?: string; month?: number; year?: number; branch_id?: number }) {
      this.loading = true
      try {
        const { get } = useApi()
        const data: any = await get('/reports/sales', params)
        this.reportData = data.data || data
      } finally {
        this.loading = false
      }
    }
  }
})
