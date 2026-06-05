import { defineStore } from 'pinia';
import { a as useApi } from './server.mjs';

const useRawMaterialStore = defineStore("rawMaterial", {
  state: () => ({
    materials: [],
    stocks: [],
    loading: false
  }),
  actions: {
    async fetchAll(branchId) {
      this.loading = true;
      try {
        const { get } = useApi();
        const params = {};
        if (branchId) params.branch_id = branchId;
        const data = await get("/raw-materials", params);
        this.materials = data.data || data;
      } finally {
        this.loading = false;
      }
    },
    async create(payload) {
      const { post } = useApi();
      const data = await post("/raw-materials", payload);
      this.materials.unshift(data.data || data);
    },
    async update(id, payload) {
      const { put } = useApi();
      const data = await put(`/raw-materials/${id}`, payload);
      const idx = this.materials.findIndex((m) => m.id === id);
      if (idx !== -1) this.materials[idx] = data.data || data;
    },
    async remove(id) {
      const { del } = useApi();
      await del(`/raw-materials/${id}`);
      this.materials = this.materials.filter((m) => m.id !== id);
    },
    async bulkUpdate(items) {
      const { put } = useApi();
      await put("/raw-materials/bulk-update", { items });
      await this.fetchAll();
    },
    async fetchStocks(params) {
      this.loading = true;
      try {
        const { get } = useApi();
        const data = await get("/raw-material-stocks", params);
        this.stocks = data.data || data;
      } finally {
        this.loading = false;
      }
    },
    async saveBulkStock(data) {
      const { post } = useApi();
      await post("/raw-material-stocks/bulk", data);
    }
  }
});

export { useRawMaterialStore as u };
//# sourceMappingURL=raw-material-DhXNPoKs.mjs.map
