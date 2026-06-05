import { defineStore } from 'pinia';
import { a as useApi } from './server.mjs';

const useProductStore = defineStore("product", {
  state: () => ({
    products: [],
    loading: false
  }),
  actions: {
    async fetchAll(params) {
      this.loading = true;
      try {
        const { get } = useApi();
        const data = await get("/products", params);
        this.products = data.data || data;
      } finally {
        this.loading = false;
      }
    },
    async create(data) {
      const { post } = useApi();
      const res = await post("/products", data);
      this.products.push(res.data || res);
    },
    async update(id, data) {
      const { put } = useApi();
      const res = await put(`/products/${id}`, data);
      const idx = this.products.findIndex((p) => p.id === id);
      if (idx !== -1) this.products[idx] = res.data || res;
    },
    async remove(id) {
      const { del } = useApi();
      await del(`/products/${id}`);
      this.products = this.products.filter((p) => p.id !== id);
    }
  }
});

export { useProductStore as u };
//# sourceMappingURL=product-aGR6s5rU.mjs.map
