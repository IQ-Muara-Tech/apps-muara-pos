import { defineStore } from 'pinia'
import type { SwitchMoney } from '~/types'

export const useSwitchMoneyStore = defineStore('switchMoney', {
  state: () => ({
    switches: [] as SwitchMoney[],
    loading: false
  }),
  actions: {
    async fetchSwitchMoneys(params?: Record<string, any>) {
      this.loading = true
      try {
        const { get } = useApi()
        const data: any = await get('/switch-moneys', params)
        this.switches = data.data || data
      } finally {
        this.loading = false
      }
    },
    async createSwitchMoney(data: { name: string; from: string; to: string; amount: number; branch_id: number }) {
      const { post } = useApi()
      const res: any = await post('/switch-moneys', data)
      this.switches.unshift(res.data || res)
      return res.data || res
    },
    async deleteSwitchMoney(id: number) {
      const { del } = useApi()
      await del(`/switch-moneys/${id}`)
      this.switches = this.switches.filter(s => s.id !== id)
    }
  }
})
