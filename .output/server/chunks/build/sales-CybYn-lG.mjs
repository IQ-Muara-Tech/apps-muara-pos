import { _ as _sfc_main$1 } from './LoadingSpinner-CNrIgl7t.mjs';
import { _ as __nuxt_component_2, a as __nuxt_component_3 } from './SaleCart-yQBX4glL.mjs';
import { defineComponent, ref, computed, unref, isRef, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderStyle, ssrRenderComponent, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderList, ssrRenderAttr, ssrInterpolate, ssrRenderClass, ssrRenderTeleport } from 'vue/server-renderer';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';
import { u as useSaleStore } from './sale-DCRDeWX7.mjs';
import { u as useAuthStore } from './server.mjs';
import { storeToRefs } from 'pinia';
import { u as usePullToRefresh } from './usePullToRefresh-Djnb12W0.mjs';
import { _ as _export_sfc } from './_plugin-vue_export-helper-1tPrXgE0.mjs';
import './product-aGR6s5rU.mjs';
import './EmptyState-wMdsONY9.mjs';
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

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "sales",
  __ssrInlineRender: true,
  setup(__props) {
    const sale = useSaleStore();
    const auth = useAuthStore();
    const { sales: sales2, loading } = storeToRefs(sale);
    const showProductPicker = ref(false);
    const selectedBranch = ref("");
    const pickerBranchId = computed(() => {
      var _a;
      return auth.isKasir ? (_a = auth.selectedBranch) == null ? void 0 : _a.id : selectedBranch.value ? Number(selectedBranch.value) : void 0;
    });
    const deletingSale = ref(null);
    const deleting = ref(false);
    const completingSale = ref(null);
    const completing = ref(false);
    const changingPaymentSale = ref(null);
    const changingPayment = ref(false);
    const changePaymentTypeId = ref(null);
    function formatRupiah(value) {
      return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(value);
    }
    function formatTanggal(date) {
      return format(date, "EEEE, dd MMMM yyyy", { locale: id });
    }
    function formatJam(dateStr) {
      return format(new Date(dateStr), "HH:mm", { locale: id });
    }
    function loadSales() {
      var _a;
      const params = { today: true };
      const branchId = auth.isKasir ? (_a = auth.selectedBranch) == null ? void 0 : _a.id : selectedBranch.value ? Number(selectedBranch.value) : void 0;
      if (branchId) params.branch_id = branchId;
      sale.fetchAll(params);
    }
    const { pulling, pullDistance, threshold } = usePullToRefresh(loadSales);
    return (_ctx, _push, _parent, _attrs) => {
      var _a;
      const _component_LoadingSpinner = _sfc_main$1;
      const _component_ProductPicker = __nuxt_component_2;
      const _component_SaleCart = __nuxt_component_3;
      _push(`<div${ssrRenderAttrs(_attrs)} data-v-bd2cb519>`);
      if (unref(pulling) || unref(pullDistance) > 0) {
        _push(`<div class="flex justify-center py-2 transition-all" style="${ssrRenderStyle({ height: unref(pulling) ? "40px" : unref(pullDistance) + "px" })}" data-v-bd2cb519>`);
        if (unref(pulling)) {
          _push(ssrRenderComponent(_component_LoadingSpinner, null, null, _parent));
        } else if (unref(pullDistance) >= unref(threshold)) {
          _push(`<p class="text-xs text-gray-400 self-center" data-v-bd2cb519>Lepas untuk refresh</p>`);
        } else {
          _push(`<p class="text-xs text-gray-300 self-center" data-v-bd2cb519>Tarik ke bawah</p>`);
        }
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="flex items-center justify-between mb-4" data-v-bd2cb519><h2 class="text-lg font-bold text-gray-900" data-v-bd2cb519>Transaksi Hari Ini</h2><button class="bg-primary-600 text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-primary-700 active:scale-95 transition-all" data-v-bd2cb519> + Transaksi Baru </button></div><div class="mb-4" data-v-bd2cb519>`);
      if (!unref(auth).isKasir) {
        _push(`<select class="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none bg-white shadow-sm" data-v-bd2cb519><option value="" data-v-bd2cb519${ssrIncludeBooleanAttr(Array.isArray(unref(selectedBranch)) ? ssrLooseContain(unref(selectedBranch), "") : ssrLooseEqual(unref(selectedBranch), "")) ? " selected" : ""}>Semua Cabang</option><!--[-->`);
        ssrRenderList((_a = unref(auth).user) == null ? void 0 : _a.branches, (b) => {
          _push(`<option${ssrRenderAttr("value", b.id)} data-v-bd2cb519${ssrIncludeBooleanAttr(Array.isArray(unref(selectedBranch)) ? ssrLooseContain(unref(selectedBranch), b.id) : ssrLooseEqual(unref(selectedBranch), b.id)) ? " selected" : ""}>${ssrInterpolate(b.name)}</option>`);
        });
        _push(`<!--]--></select>`);
      } else if (unref(auth).selectedBranch) {
        _push(`<div class="flex items-center gap-2 px-3 py-2.5 bg-primary-50 border border-primary-200 rounded-xl" data-v-bd2cb519><svg class="w-4 h-4 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-bd2cb519><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" data-v-bd2cb519></path></svg><span class="text-sm font-medium text-primary-700" data-v-bd2cb519>${ssrInterpolate(unref(auth).selectedBranch.name)}</span></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
      if (unref(loading)) {
        _push(ssrRenderComponent(_component_LoadingSpinner, { full: "" }, null, _parent));
      } else {
        _push(`<!--[-->`);
        if (unref(sales2).length === 0) {
          _push(`<div class="flex flex-col items-center justify-center py-16" data-v-bd2cb519><div class="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-4" data-v-bd2cb519><svg class="w-10 h-10 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-bd2cb519><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 000 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" data-v-bd2cb519></path></svg></div><p class="text-gray-500 font-medium mb-1 text-sm" data-v-bd2cb519>Belum ada transaksi hari ini</p><p class="text-xs text-gray-400" data-v-bd2cb519>Tekan tombol &quot;+ Transaksi Baru&quot; untuk memulai</p></div>`);
        } else {
          _push(`<div class="grid grid-cols-1 md:grid-cols-2 gap-3" data-v-bd2cb519><div class="md:col-span-2 text-xs text-gray-400 mb-2 font-medium" data-v-bd2cb519>${ssrInterpolate(formatTanggal(/* @__PURE__ */ new Date()))}</div><!--[-->`);
          ssrRenderList(unref(sales2), (s) => {
            var _a2, _b;
            _push(`<div class="bg-white rounded-xl border border-gray-100 p-4 hover:shadow-md transition-all" data-v-bd2cb519><div class="flex items-center justify-between mb-2" data-v-bd2cb519><div data-v-bd2cb519><p class="text-sm font-medium text-gray-900" data-v-bd2cb519>${ssrInterpolate(s.kode)}</p><div class="flex items-center gap-2 mt-0.5" data-v-bd2cb519><span class="text-[11px] text-gray-400" data-v-bd2cb519>${ssrInterpolate(formatJam(s.date_time || s.created_at))}</span>`);
            if (s.branch) {
              _push(`<span class="text-[10px] bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded" data-v-bd2cb519>${ssrInterpolate((_a2 = s.branch) == null ? void 0 : _a2.name)}</span>`);
            } else {
              _push(`<!---->`);
            }
            if (s.payment_type) {
              _push(`<span class="${ssrRenderClass([s.payment_type.name === "Cash" ? "bg-green-50 text-green-600" : "bg-purple-50 text-purple-600", "text-[10px] px-1.5 py-0.5 rounded"])}" data-v-bd2cb519>${ssrInterpolate(s.payment_type.name)}</span>`);
            } else {
              _push(`<!---->`);
            }
            _push(`</div></div><span class="${ssrRenderClass([s.status === "done" ? "bg-green-50 text-green-600" : "bg-amber-50 text-amber-600", "text-[11px] font-medium px-2.5 py-1 rounded-full"])}" data-v-bd2cb519>${ssrInterpolate(s.status === "done" ? "Selesai" : "Diproses")}</span></div>`);
            if ((_b = s.items) == null ? void 0 : _b.length) {
              _push(`<div class="mb-3 space-y-1" data-v-bd2cb519><!--[-->`);
              ssrRenderList(s.items, (item) => {
                var _a3;
                _push(`<div class="flex items-center justify-between text-sm" data-v-bd2cb519><span class="text-gray-700 font-medium" data-v-bd2cb519>${ssrInterpolate((_a3 = item.product) == null ? void 0 : _a3.name)}</span><span class="text-gray-400 text-xs" data-v-bd2cb519>x${ssrInterpolate(item.qty)} \xB7 ${ssrInterpolate(formatRupiah(item.subtotal))}</span></div>`);
              });
              _push(`<!--]--></div>`);
            } else {
              _push(`<!---->`);
            }
            _push(`<div class="flex items-center justify-between pt-2 border-t border-gray-50" data-v-bd2cb519><div class="flex items-center gap-1.5" data-v-bd2cb519>`);
            if (s.status === "processing") {
              _push(`<button class="text-[11px] font-medium px-2.5 py-1 rounded-full bg-primary-50 text-primary-600 hover:bg-primary-100 active:scale-95 transition-all" data-v-bd2cb519> Selesaikan </button>`);
            } else {
              _push(`<!---->`);
            }
            if (s.status === "processing") {
              _push(`<button class="text-[11px] font-medium px-2.5 py-1 rounded-full bg-gray-50 text-gray-600 hover:bg-gray-100 active:scale-95 transition-all" data-v-bd2cb519> Ubah Metode </button>`);
            } else {
              _push(`<!---->`);
            }
            if (s.status === "processing") {
              _push(`<button class="text-[11px] font-medium px-2.5 py-1 rounded-full bg-red-50 text-red-600 hover:bg-red-100 active:scale-95 transition-all" data-v-bd2cb519> Hapus </button>`);
            } else {
              _push(`<!---->`);
            }
            _push(`</div><p class="text-sm font-bold text-gray-900" data-v-bd2cb519>${ssrInterpolate(formatRupiah(s.total))}</p></div></div>`);
          });
          _push(`<!--]--></div>`);
        }
        _push(`<!--]-->`);
      }
      _push(ssrRenderComponent(_component_ProductPicker, {
        modelValue: unref(showProductPicker),
        "onUpdate:modelValue": ($event) => isRef(showProductPicker) ? showProductPicker.value = $event : null,
        "branch-id": unref(pickerBranchId)
      }, null, _parent));
      _push(ssrRenderComponent(_component_SaleCart, null, null, _parent));
      ssrRenderTeleport(_push, (_push2) => {
        if (unref(deletingSale)) {
          _push2(`<div class="fixed inset-0 z-50 flex items-center justify-center p-4" data-v-bd2cb519><div class="fixed inset-0 bg-black/40" data-v-bd2cb519></div><div class="relative bg-white rounded-2xl shadow-xl w-full max-w-sm p-6 text-center" data-v-bd2cb519><div class="w-14 h-14 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4" data-v-bd2cb519><svg class="w-7 h-7 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-bd2cb519><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" data-v-bd2cb519></path></svg></div><h3 class="text-lg font-semibold text-gray-900 mb-1" data-v-bd2cb519>Hapus Transaksi?</h3><p class="text-sm text-gray-500 mb-6" data-v-bd2cb519>Transaksi <strong data-v-bd2cb519>${ssrInterpolate(unref(deletingSale).kode)}</strong> akan dihapus permanen.</p><div class="flex gap-3" data-v-bd2cb519><button class="flex-1 py-2.5 border border-gray-200 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors" data-v-bd2cb519>Batal</button><button${ssrIncludeBooleanAttr(unref(deleting)) ? " disabled" : ""} class="flex-1 bg-red-500 text-white py-2.5 rounded-xl text-sm font-semibold hover:bg-red-600 disabled:opacity-50 transition-colors" data-v-bd2cb519>${ssrInterpolate(unref(deleting) ? "Menghapus..." : "Hapus")}</button></div></div></div>`);
        } else {
          _push2(`<!---->`);
        }
      }, "body", false, _parent);
      ssrRenderTeleport(_push, (_push2) => {
        if (unref(completingSale)) {
          _push2(`<div class="fixed inset-0 z-50 flex items-center justify-center p-4" data-v-bd2cb519><div class="fixed inset-0 bg-black/40" data-v-bd2cb519></div><div class="relative bg-white rounded-2xl shadow-xl w-full max-w-sm p-6 text-center" data-v-bd2cb519><div class="w-14 h-14 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4" data-v-bd2cb519><svg class="w-7 h-7 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-bd2cb519><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" data-v-bd2cb519></path></svg></div><h3 class="text-lg font-semibold text-gray-900 mb-1" data-v-bd2cb519>Selesaikan Transaksi?</h3><p class="text-sm text-gray-500 mb-6" data-v-bd2cb519>Transaksi <strong data-v-bd2cb519>${ssrInterpolate(unref(completingSale).kode)}</strong> akan ditandai selesai.</p><div class="flex gap-3" data-v-bd2cb519><button class="flex-1 py-2.5 border border-gray-200 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors" data-v-bd2cb519>Batal</button><button${ssrIncludeBooleanAttr(unref(completing)) ? " disabled" : ""} class="flex-1 bg-primary-600 text-white py-2.5 rounded-xl text-sm font-semibold hover:bg-primary-700 disabled:opacity-50 transition-colors" data-v-bd2cb519>${ssrInterpolate(unref(completing) ? "Menyelesaikan..." : "Selesaikan")}</button></div></div></div>`);
        } else {
          _push2(`<!---->`);
        }
      }, "body", false, _parent);
      ssrRenderTeleport(_push, (_push2) => {
        if (unref(changingPaymentSale)) {
          _push2(`<div class="fixed inset-0 z-50 flex items-center justify-center p-4" data-v-bd2cb519><div class="fixed inset-0 bg-black/40" data-v-bd2cb519></div><div class="relative bg-white rounded-2xl shadow-xl w-full max-w-sm p-6" data-v-bd2cb519><h3 class="text-lg font-semibold text-gray-900 mb-1" data-v-bd2cb519>Ubah Metode Pembayaran</h3><p class="text-sm text-gray-500 mb-4" data-v-bd2cb519>Transaksi <strong data-v-bd2cb519>${ssrInterpolate(unref(changingPaymentSale).kode)}</strong></p><select class="w-full px-3 py-2.5 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none bg-white mb-6" data-v-bd2cb519><option${ssrRenderAttr("value", null)} disabled data-v-bd2cb519${ssrIncludeBooleanAttr(Array.isArray(unref(changePaymentTypeId)) ? ssrLooseContain(unref(changePaymentTypeId), null) : ssrLooseEqual(unref(changePaymentTypeId), null)) ? " selected" : ""}>Pilih metode</option><!--[-->`);
          ssrRenderList(unref(sale).paymentTypes, (pt) => {
            _push2(`<option${ssrRenderAttr("value", pt.id)} data-v-bd2cb519${ssrIncludeBooleanAttr(Array.isArray(unref(changePaymentTypeId)) ? ssrLooseContain(unref(changePaymentTypeId), pt.id) : ssrLooseEqual(unref(changePaymentTypeId), pt.id)) ? " selected" : ""}>${ssrInterpolate(pt.name)}</option>`);
          });
          _push2(`<!--]--></select><div class="flex gap-3" data-v-bd2cb519><button class="flex-1 py-2.5 border border-gray-200 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors" data-v-bd2cb519>Batal</button><button${ssrIncludeBooleanAttr(!unref(changePaymentTypeId) || unref(changingPayment)) ? " disabled" : ""} class="flex-1 bg-primary-600 text-white py-2.5 rounded-xl text-sm font-semibold hover:bg-primary-700 disabled:opacity-50 transition-colors" data-v-bd2cb519>${ssrInterpolate(unref(changingPayment) ? "Menyimpan..." : "Simpan")}</button></div></div></div>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/sales.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const sales = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-bd2cb519"]]);

export { sales as default };
//# sourceMappingURL=sales-CybYn-lG.mjs.map
