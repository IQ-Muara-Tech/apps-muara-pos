import { defineStore } from "pinia";
import { a as useApi } from "../server.mjs";
const useSaleStore = defineStore("sale", {
  state: () => ({
    sales: [],
    currentSale: null,
    loading: false,
    cart: [],
    cartOpen: false,
    paymentTypes: [],
    selectedPaymentTypeId: null
  }),
  getters: {
    cartTotal: (state) => state.cart.reduce((sum, item) => sum + item.subtotal, 0),
    cartCount: (state) => state.cart.reduce((sum, item) => sum + item.qty, 0)
  },
  actions: {
    async fetchAll(params) {
      this.loading = true;
      try {
        const { get } = useApi();
        const data = await get("/sales", params);
        this.sales = data.data || data;
      } finally {
        this.loading = false;
      }
    },
    async create(saleData) {
      const { post } = useApi();
      const res = await post("/sales", saleData);
      this.sales.unshift(res.data || res);
      this.clearCart();
      return res.data || res;
    },
    async fetchOne(id) {
      this.loading = true;
      try {
        const { get } = useApi();
        const data = await get(`/sales/${id}`);
        this.currentSale = data.data || data;
      } finally {
        this.loading = false;
      }
    },
    async updateStatus(id, status) {
      const { put } = useApi();
      const res = await put(`/sales/${id}/status`, { status });
      const idx = this.sales.findIndex((s) => s.id === id);
      if (idx !== -1) this.sales[idx] = res.data || res;
      if (this.currentSale?.id === id) this.currentSale = res.data || res;
    },
    async updatePaymentType(id, payment_type_id) {
      const { put } = useApi();
      const res = await put(`/sales/${id}/payment-type`, { payment_type_id });
      const idx = this.sales.findIndex((s) => s.id === id);
      if (idx !== -1) this.sales[idx] = res.data || res;
      if (this.currentSale?.id === id) this.currentSale = res.data || res;
    },
    addToCart(product, qty = 1) {
      const existing = this.cart.find((item) => item.product_id === product.id);
      if (existing) {
        existing.qty += qty;
        existing.subtotal = existing.qty * existing.price;
      } else {
        this.cart.push({
          product_id: product.id,
          qty,
          price: product.price,
          subtotal: product.price * qty,
          product
        });
      }
    },
    updateQty(index, qty) {
      if (qty <= 0) {
        this.cart.splice(index, 1);
        return;
      }
      const item = this.cart[index];
      item.qty = qty;
      item.subtotal = item.qty * item.price;
    },
    removeFromCart(index) {
      this.cart.splice(index, 1);
    },
    clearCart() {
      this.cart = [];
      this.selectedPaymentTypeId = null;
    },
    async fetchPaymentTypes() {
      const { get } = useApi();
      const data = await get("/type-payments");
      this.paymentTypes = data.data || data;
    },
    async remove(id) {
      const { del } = useApi();
      await del(`/sales/${id}`);
      this.sales = this.sales.filter((s) => s.id !== id);
    },
    openCart() {
      this.cartOpen = true;
    },
    closeCart() {
      this.cartOpen = false;
    }
  }
});
export {
  useSaleStore as u
};
//# sourceMappingURL=sale-DCRDeWX7.js.map
