import { defineStore } from "pinia";
import { a as useApi } from "../server.mjs";
const useExpenditureStore = defineStore("expenditure", {
  state: () => ({
    categories: [],
    expenditures: [],
    totalAmount: 0,
    loading: false
  }),
  actions: {
    async fetchCategories(params) {
      const { get } = useApi();
      const data = await get("/expenditure-categories", params);
      this.categories = data.data || data;
    },
    async createCategory(categoryData) {
      const { post } = useApi();
      const res = await post("/expenditure-categories", categoryData);
      this.categories.push(res.data || res);
      return res.data || res;
    },
    async updateCategory(id, categoryData) {
      const { put } = useApi();
      const res = await put(`/expenditure-categories/${id}`, categoryData);
      const idx = this.categories.findIndex((c) => c.id === id);
      if (idx !== -1) this.categories[idx] = res.data || res;
      return res.data || res;
    },
    async deleteCategory(id) {
      const { del } = useApi();
      await del(`/expenditure-categories/${id}`);
      this.categories = this.categories.filter((c) => c.id !== id);
    },
    async fetchExpenditures(params) {
      this.loading = true;
      try {
        const { get } = useApi();
        const data = await get("/expenditures", params);
        this.totalAmount = data.total_amount || 0;
        this.expenditures = data.expenditures || [];
      } finally {
        this.loading = false;
      }
    },
    async createExpenditure(data) {
      const { post } = useApi();
      const res = await post("/expenditures", data);
      this.expenditures.unshift(res.data || res);
      this.totalAmount += Number(data.amount);
      return res.data || res;
    },
    async updateExpenditure(id, data) {
      const { put } = useApi();
      const res = await put(`/expenditures/${id}`, data);
      const idx = this.expenditures.findIndex((e) => e.id === id);
      if (idx !== -1) {
        const oldAmount = this.expenditures[idx].amount;
        this.totalAmount = this.totalAmount - Number(oldAmount) + Number(data.amount);
        this.expenditures[idx] = res.data || res;
      }
      return res.data || res;
    },
    async deleteExpenditure(id) {
      const { del } = useApi();
      const item = this.expenditures.find((e) => e.id === id);
      if (item) this.totalAmount -= Number(item.amount);
      await del(`/expenditures/${id}`);
      this.expenditures = this.expenditures.filter((e) => e.id !== id);
    }
  }
});
export {
  useExpenditureStore as u
};
//# sourceMappingURL=expenditure-C4eReWlK.js.map
