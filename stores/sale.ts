import { defineStore } from 'pinia'
import type { Sale, SaleItem, Product, TypePayment } from '~/types'

export const useSaleStore = defineStore('sale', {
  state: () => ({
    sales: [] as Sale[],
    currentSale: null as Sale | null,
    loading: false,
    cart: [] as SaleItem[],
    cartOpen: false,
    paymentTypes: [] as TypePayment[],
    selectedPaymentTypeId: null as number | null
  }),
  getters: {
    cartTotal: (state) => state.cart.reduce((sum, item) => sum + item.subtotal, 0),
    cartCount: (state) => state.cart.reduce((sum, item) => sum + item.qty, 0)
  },
  actions: {
    async fetchAll(params?: Record<string, any>) {
      this.loading = true
      try {
        const { get } = useApi()
        const data: any = await get('/sales', params)
        this.sales = data.data || data
      } finally {
        this.loading = false
      }
    },
    async create(saleData: { branch_id: number; payment_type_id: number; date_time?: string; status?: string; items: { product_id: number; qty: number; price: number; subtotal: number }[] }) {
      const { post } = useApi()
      const res: any = await post('/sales', saleData)
      this.sales.unshift(res.data || res)
      this.clearCart()
      return res.data || res
    },
    async fetchOne(id: string) {
      this.loading = true
      try {
        const { get } = useApi()
        const data: any = await get(`/sales/${id}`)
        this.currentSale = data.data || data
      } finally {
        this.loading = false
      }
    },
    async updateStatus(id: string, status: 'processing' | 'done') {
      const { put } = useApi()
      const res: any = await put(`/sales/${id}/status`, { status })
      const idx = this.sales.findIndex(s => s.id === id)
      if (idx !== -1) this.sales[idx] = res.data || res
      if (this.currentSale?.id === id) this.currentSale = res.data || res
    },
    async updatePaymentType(id: string, payment_type_id: number) {
      const { put } = useApi()
      const res: any = await put(`/sales/${id}/payment-type`, { payment_type_id })
      const idx = this.sales.findIndex(s => s.id === id)
      if (idx !== -1) this.sales[idx] = res.data || res
      if (this.currentSale?.id === id) this.currentSale = res.data || res
    },
    addToCart(product: Product, qty: number = 1) {
      const existing = this.cart.find(item => item.product_id === product.id)
      if (existing) {
        existing.qty += qty
        existing.subtotal = existing.qty * existing.price
      } else {
        this.cart.push({
          product_id: product.id,
          qty,
          price: product.price,
          subtotal: product.price * qty,
          product
        })
      }
    },
    updateQty(index: number, qty: number) {
      if (qty <= 0) {
        this.cart.splice(index, 1)
        return
      }
      const item = this.cart[index]
      item.qty = qty
      item.subtotal = item.qty * item.price
    },
    removeFromCart(index: number) {
      this.cart.splice(index, 1)
    },
    clearCart() {
      this.cart = []
      this.selectedPaymentTypeId = null
    },
    async fetchPaymentTypes() {
      const { get } = useApi()
      const data: any = await get('/type-payments')
      this.paymentTypes = data.data || data
    },
    async remove(id: string) {
      const { del } = useApi()
      await del(`/sales/${id}`)
      this.sales = this.sales.filter(s => s.id !== id)
    },
    openCart() {
      this.cartOpen = true
    },
    closeCart() {
      this.cartOpen = false
    }
  }
})
