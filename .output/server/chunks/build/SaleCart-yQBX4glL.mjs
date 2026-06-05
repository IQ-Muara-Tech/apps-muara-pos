import { defineComponent, ref, computed, watch, unref, useSSRContext } from 'vue';
import { ssrRenderTeleport, ssrInterpolate, ssrRenderAttr, ssrRenderList, ssrRenderComponent, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual } from 'vue/server-renderer';
import { u as useSaleStore } from './sale-DCRDeWX7.mjs';
import { u as useProductStore } from './product-aGR6s5rU.mjs';
import { u as useAuthStore } from './server.mjs';
import { storeToRefs } from 'pinia';
import { _ as _export_sfc } from './_plugin-vue_export-helper-1tPrXgE0.mjs';
import { _ as _sfc_main$2 } from './EmptyState-wMdsONY9.mjs';
import { _ as _sfc_main$3 } from './LoadingSpinner-CNrIgl7t.mjs';

const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "ProductPicker",
  __ssrInlineRender: true,
  props: {
    modelValue: { type: Boolean },
    branchId: {}
  },
  emits: ["update:modelValue"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const sale = useSaleStore();
    const productStore = useProductStore();
    const { products } = storeToRefs(productStore);
    const search = ref("");
    const filteredProducts = computed(
      () => products.value.filter((p) => p.name.toLowerCase().includes(search.value.toLowerCase()))
    );
    function formatRupiah(value) {
      return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(value);
    }
    watch(() => props.modelValue, (val) => {
      if (val) {
        search.value = "";
        productStore.fetchAll(props.branchId ? { branch_id: props.branchId } : void 0);
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      ssrRenderTeleport(_push, (_push2) => {
        if (__props.modelValue) {
          _push2(`<div class="fixed inset-0 z-40 flex flex-col md:items-center md:justify-center" data-v-3a919010><div class="fixed inset-0 bg-black/40" data-v-3a919010></div><div class="relative bg-white w-full h-full md:max-w-2xl md:max-h-[90vh] md:rounded-2xl md:shadow-xl flex flex-col" data-v-3a919010><div class="flex items-center justify-between px-4 py-3 border-b border-gray-200" data-v-3a919010><button class="p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-all" data-v-3a919010><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-3a919010><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" data-v-3a919010></path></svg></button><h3 class="font-semibold text-gray-900 text-sm" data-v-3a919010>Pilih Produk</h3><button class="relative bg-primary-600 text-white px-3 py-1.5 rounded-lg text-xs font-medium active:scale-95 transition-all" data-v-3a919010> Keranjang `);
          if (unref(sale).cartCount) {
            _push2(`<span class="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-[10px] rounded-full w-5 h-5 flex items-center justify-center font-bold" data-v-3a919010>${ssrInterpolate(unref(sale).cartCount)}</span>`);
          } else {
            _push2(`<!---->`);
          }
          _push2(`</button></div><div class="px-4 py-3" data-v-3a919010><div class="relative" data-v-3a919010><svg class="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-3a919010><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" data-v-3a919010></path></svg><input${ssrRenderAttr("value", unref(search))} type="text" placeholder="Cari produk..." class="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none bg-white shadow-sm" data-v-3a919010></div></div><div class="flex-1 overflow-y-auto px-4 pb-4" data-v-3a919010>`);
          if (unref(filteredProducts).length === 0) {
            _push2(`<div class="flex flex-col items-center justify-center py-12" data-v-3a919010><p class="text-sm text-gray-400" data-v-3a919010>Produk tidak ditemukan</p></div>`);
          } else {
            _push2(`<div class="grid grid-cols-2 gap-2" data-v-3a919010><!--[-->`);
            ssrRenderList(unref(filteredProducts), (prod) => {
              _push2(`<button class="bg-white border border-gray-200 rounded-xl p-3 text-left hover:border-primary-400 hover:shadow-md active:scale-95 transition-all" data-v-3a919010><p class="text-sm font-medium text-gray-900 truncate" data-v-3a919010>${ssrInterpolate(prod.name)}</p><p class="text-xs text-primary-600 font-semibold mt-1" data-v-3a919010>${ssrInterpolate(formatRupiah(prod.price))}</p></button>`);
            });
            _push2(`<!--]--></div>`);
          }
          _push2(`</div>`);
          if (unref(sale).cartCount) {
            _push2(`<div class="border-t border-gray-200 px-4 py-3" data-v-3a919010><button class="w-full bg-primary-600 text-white py-3 rounded-xl font-semibold hover:bg-primary-700 active:scale-95 transition-all flex items-center justify-center gap-2" data-v-3a919010><span data-v-3a919010>Lihat Keranjang</span><span class="bg-white/20 px-2 py-0.5 rounded-full text-xs" data-v-3a919010>${ssrInterpolate(unref(sale).cartCount)} item</span></button></div>`);
          } else {
            _push2(`<!---->`);
          }
          _push2(`</div></div>`);
        } else {
          _push2(`<!---->`);
        }
      }, "body", false, _parent);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ProductPicker.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_2 = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-3a919010"]]);
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "SaleCart",
  __ssrInlineRender: true,
  props: {
    backdate: { type: Boolean, default: false }
  },
  setup(__props) {
    const props = __props;
    const sale = useSaleStore();
    const auth = useAuthStore();
    const loading = ref(false);
    const error = ref("");
    const checkoutBranchId = ref(null);
    const backdateDateTime = ref("");
    function formatRupiah(value) {
      return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(value);
    }
    const effectiveBranchId = computed(() => {
      if (auth.selectedBranch) return auth.selectedBranch.id;
      if (checkoutBranchId.value) return checkoutBranchId.value;
      return null;
    });
    const canCheckout = computed(() => !!effectiveBranchId.value && !!sale.selectedPaymentTypeId && (!props.backdate || !!backdateDateTime.value));
    return (_ctx, _push, _parent, _attrs) => {
      const _component_EmptyState = _sfc_main$2;
      const _component_LoadingSpinner = _sfc_main$3;
      ssrRenderTeleport(_push, (_push2) => {
        var _a;
        if (unref(sale).cartOpen) {
          _push2(`<div class="fixed inset-0 z-50 flex justify-end" data-v-3e92dcc4><div class="fixed inset-0 bg-black/40" data-v-3e92dcc4></div><div class="relative bg-white w-full max-w-md mx-2 my-2 rounded-2xl flex flex-col h-[calc(100%-16px)] shadow-xl" data-v-3e92dcc4><div class="flex items-center justify-between px-4 py-3 border-b border-gray-200" data-v-3e92dcc4><h2 class="text-lg font-semibold text-gray-900" data-v-3e92dcc4>Keranjang (${ssrInterpolate(unref(sale).cartCount)})</h2><button class="p-1 hover:bg-gray-100 rounded-full" data-v-3e92dcc4><svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-3e92dcc4><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" data-v-3e92dcc4></path></svg></button></div><div class="flex-1 overflow-y-auto p-4 space-y-3" data-v-3e92dcc4><!--[-->`);
          ssrRenderList(unref(sale).cart, (item, index) => {
            var _a2;
            _push2(`<div class="flex items-center gap-3 bg-gray-50 rounded-xl p-3" data-v-3e92dcc4><div class="flex-1 min-w-0" data-v-3e92dcc4><p class="text-sm font-medium text-gray-900 truncate" data-v-3e92dcc4>${ssrInterpolate((_a2 = item.product) == null ? void 0 : _a2.name)}</p><p class="text-xs text-gray-500" data-v-3e92dcc4>${ssrInterpolate(formatRupiah(item.price))}</p></div><div class="flex items-center gap-2" data-v-3e92dcc4><button class="w-7 h-7 flex items-center justify-center rounded-lg bg-white border border-gray-200 text-gray-600 hover:bg-gray-100 active:scale-95 transition-all" data-v-3e92dcc4><svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-3e92dcc4><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4" data-v-3e92dcc4></path></svg></button><span class="text-sm font-semibold text-gray-900 w-6 text-center" data-v-3e92dcc4>${ssrInterpolate(item.qty)}</span><button class="w-7 h-7 flex items-center justify-center rounded-lg bg-white border border-gray-200 text-gray-600 hover:bg-gray-100 active:scale-95 transition-all" data-v-3e92dcc4><svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-3e92dcc4><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" data-v-3e92dcc4></path></svg></button></div><div class="text-right min-w-[70px]" data-v-3e92dcc4><p class="text-sm font-semibold text-gray-900" data-v-3e92dcc4>${ssrInterpolate(formatRupiah(item.subtotal))}</p><button class="text-[11px] text-red-500 hover:text-red-700 mt-0.5" data-v-3e92dcc4>Hapus</button></div></div>`);
          });
          _push2(`<!--]-->`);
          if (unref(sale).cart.length === 0) {
            _push2(ssrRenderComponent(_component_EmptyState, { message: "Keranjang kosong" }, null, _parent));
          } else {
            _push2(`<!---->`);
          }
          _push2(`</div><div class="border-t border-gray-200 p-4 space-y-3" data-v-3e92dcc4>`);
          if (!unref(auth).isKasir && !unref(auth).selectedBranch) {
            _push2(`<div data-v-3e92dcc4><label class="block text-xs font-medium text-gray-700 mb-1" data-v-3e92dcc4>Pilih Cabang</label><select class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none bg-white" data-v-3e92dcc4><option value="" disabled data-v-3e92dcc4${ssrIncludeBooleanAttr(Array.isArray(unref(checkoutBranchId)) ? ssrLooseContain(unref(checkoutBranchId), "") : ssrLooseEqual(unref(checkoutBranchId), "")) ? " selected" : ""}>Pilih cabang</option><!--[-->`);
            ssrRenderList((_a = unref(auth).user) == null ? void 0 : _a.branches, (b) => {
              _push2(`<option${ssrRenderAttr("value", b.id)} data-v-3e92dcc4${ssrIncludeBooleanAttr(Array.isArray(unref(checkoutBranchId)) ? ssrLooseContain(unref(checkoutBranchId), b.id) : ssrLooseEqual(unref(checkoutBranchId), b.id)) ? " selected" : ""}>${ssrInterpolate(b.name)}</option>`);
            });
            _push2(`<!--]--></select></div>`);
          } else {
            _push2(`<!---->`);
          }
          if (__props.backdate) {
            _push2(`<div class="mb-3" data-v-3e92dcc4><label class="block text-xs font-medium text-gray-700 mb-1" data-v-3e92dcc4>Tanggal &amp; Waktu Transaksi <span class="text-red-500" data-v-3e92dcc4>*</span></label><input${ssrRenderAttr("value", unref(backdateDateTime))} type="datetime-local" required class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none bg-white" data-v-3e92dcc4></div>`);
          } else {
            _push2(`<!---->`);
          }
          _push2(`<div data-v-3e92dcc4><label class="block text-xs font-medium text-gray-700 mb-1" data-v-3e92dcc4>Metode Pembayaran</label><select class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none bg-white" data-v-3e92dcc4><option${ssrRenderAttr("value", null)} disabled data-v-3e92dcc4${ssrIncludeBooleanAttr(Array.isArray(unref(sale).selectedPaymentTypeId) ? ssrLooseContain(unref(sale).selectedPaymentTypeId, null) : ssrLooseEqual(unref(sale).selectedPaymentTypeId, null)) ? " selected" : ""}>Pilih metode</option><!--[-->`);
          ssrRenderList(unref(sale).paymentTypes, (pt) => {
            _push2(`<option${ssrRenderAttr("value", pt.id)} data-v-3e92dcc4${ssrIncludeBooleanAttr(Array.isArray(unref(sale).selectedPaymentTypeId) ? ssrLooseContain(unref(sale).selectedPaymentTypeId, pt.id) : ssrLooseEqual(unref(sale).selectedPaymentTypeId, pt.id)) ? " selected" : ""}>${ssrInterpolate(pt.name)}</option>`);
          });
          _push2(`<!--]--></select></div><div class="flex items-center justify-between" data-v-3e92dcc4><span class="text-base font-semibold text-gray-900" data-v-3e92dcc4>Total</span><span class="text-lg font-bold text-primary-600" data-v-3e92dcc4>${ssrInterpolate(formatRupiah(unref(sale).cartTotal))}</span></div>`);
          if (unref(error)) {
            _push2(`<p class="text-xs text-red-500" data-v-3e92dcc4>${ssrInterpolate(unref(error))}</p>`);
          } else {
            _push2(`<!---->`);
          }
          _push2(`<button${ssrIncludeBooleanAttr(unref(sale).cart.length === 0 || unref(loading) || !unref(canCheckout)) ? " disabled" : ""} class="w-full bg-primary-600 text-white py-3 rounded-xl font-semibold hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors" data-v-3e92dcc4>`);
          if (unref(loading)) {
            _push2(ssrRenderComponent(_component_LoadingSpinner, null, null, _parent));
          } else {
            _push2(`<span data-v-3e92dcc4>Bayar</span>`);
          }
          _push2(`</button></div></div></div>`);
        } else {
          _push2(`<!---->`);
        }
      }, "body", false, _parent);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/SaleCart.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __nuxt_component_3 = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-3e92dcc4"]]);

export { __nuxt_component_2 as _, __nuxt_component_3 as a };
//# sourceMappingURL=SaleCart-yQBX4glL.mjs.map
