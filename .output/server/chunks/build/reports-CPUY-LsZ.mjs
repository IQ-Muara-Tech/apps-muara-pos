import { _ as _sfc_main$1 } from './LoadingSpinner-CNrIgl7t.mjs';
import { _ as _sfc_main$2 } from './EmptyState-wMdsONY9.mjs';
import { _ as __nuxt_component_2, a as __nuxt_component_3 } from './SaleCart-yQBX4glL.mjs';
import { defineComponent, ref, computed, watch, unref, isRef, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderStyle, ssrRenderComponent, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderList, ssrRenderAttr, ssrInterpolate, ssrRenderClass, ssrRenderTeleport } from 'vue/server-renderer';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';
import { storeToRefs, defineStore } from 'pinia';
import { u as useAuthStore, a as useApi } from './server.mjs';
import { u as useSaleStore } from './sale-DCRDeWX7.mjs';
import { u as usePullToRefresh } from './usePullToRefresh-Djnb12W0.mjs';
import './product-aGR6s5rU.mjs';
import './_plugin-vue_export-helper-1tPrXgE0.mjs';
import '../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'unhead/plugins';
import 'vue-router';

const useReportStore = defineStore("report", {
  state: () => ({
    reportData: null,
    loading: false
  }),
  actions: {
    async fetchSales(params) {
      this.loading = true;
      try {
        const { get } = useApi();
        const data = await get("/reports/sales", params);
        this.reportData = data.data || data;
      } finally {
        this.loading = false;
      }
    }
  }
});
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "reports",
  __ssrInlineRender: true,
  setup(__props) {
    const reportStore = useReportStore();
    const sale = useSaleStore();
    const auth = useAuthStore();
    const { reportData: report } = storeToRefs(reportStore);
    const { loading } = storeToRefs(reportStore);
    const selectedBranch = ref("");
    const selectedPaymentType = ref("");
    const dateFrom = ref("");
    const dateTo = ref("");
    const month = ref("");
    const year = ref("");
    const paymentTypes = ref([]);
    const months = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
    const years = Array.from({ length: 10 }, (_, i) => (/* @__PURE__ */ new Date()).getFullYear() - i);
    const showExportModal = ref(false);
    const showBackdatePicker = ref(false);
    const exportMonth = ref((/* @__PURE__ */ new Date()).getMonth() + 1);
    const exportYear = ref((/* @__PURE__ */ new Date()).getFullYear());
    const exporting = ref(false);
    const backdateBranchId = computed(() => {
      var _a;
      return auth.isKasir ? (_a = auth.selectedBranch) == null ? void 0 : _a.id : selectedBranch.value ? Number(selectedBranch.value) : void 0;
    });
    function formatRupiah(value) {
      return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(value);
    }
    function formatDate(dateStr) {
      return format(new Date(dateStr), "dd/MM/yy HH:mm", { locale: id });
    }
    async function loadReport() {
      const params = {};
      if (selectedBranch.value) params.branch_id = selectedBranch.value;
      if (selectedPaymentType.value) params.payment_type_id = selectedPaymentType.value;
      if (dateFrom.value) params.date_from = dateFrom.value;
      if (dateTo.value) params.date_to = dateTo.value;
      if (month.value) params.month = Number(month.value);
      if (year.value) params.year = Number(year.value);
      await reportStore.fetchSales(params);
    }
    const { pulling, pullDistance, threshold } = usePullToRefresh(loadReport);
    watch(showBackdatePicker, (val) => {
      if (!val && sale.cart.length === 0) {
        loadReport();
      }
    });
    watch(() => sale.cartOpen, (open) => {
      if (!open && sale.cart.length === 0 && showBackdatePicker.value) {
        showBackdatePicker.value = false;
        loadReport();
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b, _c, _d, _e, _f, _g, _h;
      const _component_LoadingSpinner = _sfc_main$1;
      const _component_EmptyState = _sfc_main$2;
      const _component_ProductPicker = __nuxt_component_2;
      const _component_SaleCart = __nuxt_component_3;
      _push(`<div${ssrRenderAttrs(_attrs)}>`);
      if (unref(pulling) || unref(pullDistance) > 0) {
        _push(`<div class="flex justify-center py-2 transition-all" style="${ssrRenderStyle({ height: unref(pulling) ? "40px" : unref(pullDistance) + "px" })}">`);
        if (unref(pulling)) {
          _push(ssrRenderComponent(_component_LoadingSpinner, null, null, _parent));
        } else if (unref(pullDistance) >= unref(threshold)) {
          _push(`<p class="text-xs text-gray-400 self-center">Lepas untuk refresh</p>`);
        } else {
          _push(`<p class="text-xs text-gray-300 self-center">Tarik ke bawah</p>`);
        }
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="flex items-center justify-between mb-4"><h2 class="text-lg font-bold text-gray-900">Laporan Penjualan</h2><div class="flex items-center gap-2"><button class="bg-primary-600 text-white px-3 py-2 rounded-xl text-sm font-medium hover:bg-primary-700 active:scale-95 transition-all flex items-center gap-1.5"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg><span>Backdate</span></button><button class="bg-green-600 text-white px-3 py-2 rounded-xl text-sm font-medium hover:bg-green-700 active:scale-95 transition-all flex items-center gap-1.5"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg><span>Export</span></button></div></div><div class="bg-white rounded-xl border border-gray-200 p-4 mb-4 space-y-3">`);
      if (!unref(auth).isKasir) {
        _push(`<div><label class="block text-xs font-medium text-gray-700 mb-1">Cabang</label><select class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none bg-white"><option value=""${ssrIncludeBooleanAttr(Array.isArray(unref(selectedBranch)) ? ssrLooseContain(unref(selectedBranch), "") : ssrLooseEqual(unref(selectedBranch), "")) ? " selected" : ""}>Semua Cabang</option><!--[-->`);
        ssrRenderList((_a = unref(auth).user) == null ? void 0 : _a.branches, (b) => {
          _push(`<option${ssrRenderAttr("value", b.id)}${ssrIncludeBooleanAttr(Array.isArray(unref(selectedBranch)) ? ssrLooseContain(unref(selectedBranch), b.id) : ssrLooseEqual(unref(selectedBranch), b.id)) ? " selected" : ""}>${ssrInterpolate(b.name)}</option>`);
        });
        _push(`<!--]--></select></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div><label class="block text-xs font-medium text-gray-700 mb-1">Metode Pembayaran</label><select class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none bg-white"><option value=""${ssrIncludeBooleanAttr(Array.isArray(unref(selectedPaymentType)) ? ssrLooseContain(unref(selectedPaymentType), "") : ssrLooseEqual(unref(selectedPaymentType), "")) ? " selected" : ""}>Semua Metode</option><!--[-->`);
      ssrRenderList(unref(paymentTypes), (pt) => {
        _push(`<option${ssrRenderAttr("value", pt.id)}${ssrIncludeBooleanAttr(Array.isArray(unref(selectedPaymentType)) ? ssrLooseContain(unref(selectedPaymentType), pt.id) : ssrLooseEqual(unref(selectedPaymentType), pt.id)) ? " selected" : ""}>${ssrInterpolate(pt.name)}</option>`);
      });
      _push(`<!--]--></select></div><div><label class="block text-xs font-medium text-gray-700 mb-1">Rentang Tanggal</label><div class="flex gap-2"><input${ssrRenderAttr("value", unref(dateFrom))} type="date" class="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"><input${ssrRenderAttr("value", unref(dateTo))} type="date" class="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"></div></div><div class="flex gap-2"><div class="flex-1"><label class="block text-xs font-medium text-gray-700 mb-1">Bulan</label><select class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none bg-white"><option value=""${ssrIncludeBooleanAttr(Array.isArray(unref(month)) ? ssrLooseContain(unref(month), "") : ssrLooseEqual(unref(month), "")) ? " selected" : ""}>Pilih</option><!--[-->`);
      ssrRenderList(months, (m, i) => {
        _push(`<option${ssrRenderAttr("value", i + 1)}${ssrIncludeBooleanAttr(Array.isArray(unref(month)) ? ssrLooseContain(unref(month), i + 1) : ssrLooseEqual(unref(month), i + 1)) ? " selected" : ""}>${ssrInterpolate(m)}</option>`);
      });
      _push(`<!--]--></select></div><div class="flex-1"><label class="block text-xs font-medium text-gray-700 mb-1">Tahun</label><select class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none bg-white"><option value=""${ssrIncludeBooleanAttr(Array.isArray(unref(year)) ? ssrLooseContain(unref(year), "") : ssrLooseEqual(unref(year), "")) ? " selected" : ""}>Pilih</option><!--[-->`);
      ssrRenderList(unref(years), (y) => {
        _push(`<option${ssrRenderAttr("value", y)}${ssrIncludeBooleanAttr(Array.isArray(unref(year)) ? ssrLooseContain(unref(year), y) : ssrLooseEqual(unref(year), y)) ? " selected" : ""}>${ssrInterpolate(y)}</option>`);
      });
      _push(`<!--]--></select></div></div><button${ssrIncludeBooleanAttr(unref(loading)) ? " disabled" : ""} class="w-full bg-primary-600 text-white py-2.5 rounded-xl text-sm font-medium hover:bg-primary-700 disabled:opacity-50 transition-colors">`);
      if (unref(loading)) {
        _push(ssrRenderComponent(_component_LoadingSpinner, null, null, _parent));
      } else {
        _push(`<span>Tampilkan</span>`);
      }
      _push(`</button></div>`);
      if (unref(report)) {
        _push(`<div class="grid grid-cols-3 gap-2 mb-4"><div class="bg-primary-50 rounded-xl p-3 border border-primary-100"><p class="text-xs text-primary-600 font-medium">Total Transaksi</p><p class="text-lg font-bold text-primary-700">${ssrInterpolate(((_b = unref(report).summary) == null ? void 0 : _b.total_sales) || 0)}</p></div><div class="bg-green-50 rounded-xl p-3 border border-green-100"><p class="text-xs text-green-600 font-medium">Pendapatan</p><p class="text-sm font-bold text-green-700">${ssrInterpolate(formatRupiah(((_c = unref(report).summary) == null ? void 0 : _c.total_revenue) || 0))}</p></div><div class="bg-amber-50 rounded-xl p-3 border border-amber-100"><p class="text-xs text-amber-600 font-medium">Rata-rata</p><p class="text-sm font-bold text-amber-700">${ssrInterpolate(formatRupiah(((_d = unref(report).summary) == null ? void 0 : _d.average_per_sale) || 0))}</p></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if ((_f = (_e = unref(report)) == null ? void 0 : _e.sales) == null ? void 0 : _f.length) {
        _push(`<div class="grid grid-cols-1 md:grid-cols-2 gap-3"><p class="md:col-span-2 text-sm font-medium text-gray-700">Detail Transaksi</p><!--[-->`);
        ssrRenderList(unref(report).sales, (s) => {
          var _a2;
          _push(`<div class="bg-white rounded-xl border border-gray-200 p-4"><div class="flex items-center justify-between mb-2"><div><p class="text-sm font-medium text-gray-900">${ssrInterpolate(s.kode)}</p><p class="text-xs text-gray-500">${ssrInterpolate(formatDate(s.date_time || s.created_at))}</p>`);
          if (s.payment_type) {
            _push(`<p class="${ssrRenderClass([s.payment_type.name === "Cash" ? "text-green-600" : "text-purple-600", "text-[11px] font-medium mt-0.5"])}">${ssrInterpolate(s.payment_type.name)}</p>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div><div class="text-right"><p class="text-sm font-semibold text-gray-900">${ssrInterpolate(formatRupiah(s.total))}</p><span class="${ssrRenderClass([s.status === "done" ? "text-green-600" : "text-amber-600", "text-xs font-medium"])}">${ssrInterpolate(s.status === "done" ? "Selesai" : "Diproses")}</span></div></div>`);
          if ((_a2 = s.items) == null ? void 0 : _a2.length) {
            _push(`<div class="mt-2 pt-2 border-t border-gray-100 space-y-1"><!--[-->`);
            ssrRenderList(s.items, (item) => {
              var _a3;
              _push(`<div class="flex items-center justify-between text-sm"><span class="text-gray-700 font-medium">${ssrInterpolate((_a3 = item.product) == null ? void 0 : _a3.name)}</span><span class="text-gray-400 text-xs">x${ssrInterpolate(item.qty)} \xB7 ${ssrInterpolate(formatRupiah(item.subtotal))}</span></div>`);
            });
            _push(`<!--]--></div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div>`);
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(report) && !((_h = (_g = unref(report)) == null ? void 0 : _g.sales) == null ? void 0 : _h.length)) {
        _push(ssrRenderComponent(_component_EmptyState, { message: "Tidak ada data laporan" }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(ssrRenderComponent(_component_ProductPicker, {
        modelValue: unref(showBackdatePicker),
        "onUpdate:modelValue": ($event) => isRef(showBackdatePicker) ? showBackdatePicker.value = $event : null,
        "branch-id": unref(backdateBranchId)
      }, null, _parent));
      _push(ssrRenderComponent(_component_SaleCart, { backdate: true }, null, _parent));
      ssrRenderTeleport(_push, (_push2) => {
        if (unref(showExportModal)) {
          _push2(`<div class="fixed inset-0 z-50 flex items-center justify-center p-4"><div class="fixed inset-0 bg-black/40"></div><div class="relative bg-white rounded-2xl shadow-xl w-full max-w-sm p-6"><h3 class="text-lg font-semibold text-gray-900 mb-4">Export Laporan</h3><p class="text-xs text-gray-500 mb-4">* Yang bisa di-export hanya transaksi yang statusnya sudah diselesaikan</p><div class="space-y-3"><div class="flex gap-2"><div class="flex-1"><label class="block text-xs font-medium text-gray-700 mb-1">Bulan</label><select class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none bg-white"><!--[-->`);
          ssrRenderList(months, (m, i) => {
            _push2(`<option${ssrRenderAttr("value", i + 1)}${ssrIncludeBooleanAttr(Array.isArray(unref(exportMonth)) ? ssrLooseContain(unref(exportMonth), i + 1) : ssrLooseEqual(unref(exportMonth), i + 1)) ? " selected" : ""}>${ssrInterpolate(m)}</option>`);
          });
          _push2(`<!--]--></select></div><div class="flex-1"><label class="block text-xs font-medium text-gray-700 mb-1">Tahun</label><select class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none bg-white"><!--[-->`);
          ssrRenderList(unref(years), (y) => {
            _push2(`<option${ssrRenderAttr("value", y)}${ssrIncludeBooleanAttr(Array.isArray(unref(exportYear)) ? ssrLooseContain(unref(exportYear), y) : ssrLooseEqual(unref(exportYear), y)) ? " selected" : ""}>${ssrInterpolate(y)}</option>`);
          });
          _push2(`<!--]--></select></div></div></div><div class="flex gap-3 mt-6"><button class="flex-1 py-2.5 border border-gray-200 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors">Batal</button><button${ssrIncludeBooleanAttr(unref(exporting)) ? " disabled" : ""} class="flex-1 bg-green-600 text-white py-2.5 rounded-xl text-sm font-semibold hover:bg-green-700 disabled:opacity-50 transition-colors">${ssrInterpolate(unref(exporting) ? "Mendownload..." : "Download Excel")}</button></div></div></div>`);
        } else {
          _push2(`<!---->`);
        }
      }, "body", false, _parent);
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/reports.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=reports-CPUY-LsZ.mjs.map
