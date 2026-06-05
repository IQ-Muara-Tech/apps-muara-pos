import { defineStore } from "pinia";
import { a as useApi } from "../server.mjs";
const useCategoryStore = defineStore("category", {
  state: () => ({
    categories: [],
    loading: false
  }),
  actions: {
    async fetchAll(branchId) {
      this.loading = true;
      try {
        const { get } = useApi();
        const params = {};
        if (branchId) params.branch_id = branchId;
        const data = await get("/categories", params);
        this.categories = data.data || data;
      } finally {
        this.loading = false;
      }
    },
    async create(data) {
      const { post } = useApi();
      const res = await post("/categories", data);
      this.categories.push(res.data || res);
    },
    async update(id, data) {
      const { put } = useApi();
      const res = await put(`/categories/${id}`, data);
      const idx = this.categories.findIndex((c) => c.id === id);
      if (idx !== -1) this.categories[idx] = res.data || res;
    },
    async remove(id) {
      const { del } = useApi();
      await del(`/categories/${id}`);
      this.categories = this.categories.filter((c) => c.id !== id);
    }
  }
});
export {
  useCategoryStore as u
};
//# sourceMappingURL=category-DdOxNGvy.js.map
