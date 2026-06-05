import { _ as _sfc_main$1 } from './LoadingSpinner-CNrIgl7t.mjs';
import { _ as _sfc_main$2 } from './EmptyState-wMdsONY9.mjs';
import { defineComponent, ref, computed, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderStyle, ssrRenderComponent, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderList, ssrRenderAttr, ssrInterpolate } from 'vue/server-renderer';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';
import { u as useRawMaterialStore } from './raw-material-DhXNPoKs.mjs';
import { u as useAuthStore } from './server.mjs';
import { storeToRefs } from 'pinia';
import { u as usePullToRefresh } from './usePullToRefresh-Djnb12W0.mjs';
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
  __name: "raw-material-stocks",
  __ssrInlineRender: true,
  setup(__props) {
    const store = useRawMaterialStore();
    const auth = useAuthStore();
    const { loading } = storeToRefs(store);
    const selectedBranch = ref("");
    const filterDate = ref((/* @__PURE__ */ new Date()).toISOString().slice(0, 10));
    const saving = ref(false);
    const stockItems = ref([]);
    const selectedDate = computed(() => filterDate.value);
    const effectiveBranch = computed(() => {
      var _a;
      if (auth.isKasir) return String(((_a = auth.selectedBranch) == null ? void 0 : _a.id) || "");
      return selectedBranch.value;
    });
    const materials = computed(() => store.materials || []);
    const canSave = computed(() => {
      if (!effectiveBranch.value) return false;
      if (stockItems.value.length === 0) return false;
      return stockItems.value.every((i) => i.raw_material_id !== null && i.stock !== null && i.stock >= 0);
    });
    function formatDate(dateStr) {
      return format(new Date(dateStr), "EEEE, dd MMMM yyyy", { locale: id });
    }
    function isMaterialUsed(materialId, currentIdx) {
      return stockItems.value.some((item, idx) => idx !== currentIdx && item.raw_material_id === materialId);
    }
    async function loadStocks() {
      if (!effectiveBranch.value) return;
      await store.fetchAll(Number(effectiveBranch.value));
      await store.fetchStocks({
        branch_id: effectiveBranch.value,
        date: selectedDate.value
      });
      prefillStockData();
    }
    function prefillStockData() {
      stockItems.value = store.stocks.map((s) => ({
        id: s.id,
        raw_material_id: s.raw_material_id,
        stock: Number(s.stock),
        sold: Number(s.sold)
      }));
    }
    const { pulling, pullDistance, threshold } = usePullToRefresh(loadStocks);
    return (_ctx, _push, _parent, _attrs) => {
      var _a;
      const _component_LoadingSpinner = _sfc_main$1;
      const _component_EmptyState = _sfc_main$2;
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
      _push(`<h2 class="text-lg font-bold text-gray-900 mb-4">Input Stok</h2><div class="bg-white rounded-xl border border-gray-200 p-4 mb-4 space-y-3">`);
      if (!unref(auth).isKasir) {
        _push(`<div><label class="block text-xs font-medium text-gray-700 mb-1">Cabang</label><select class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none bg-white"><option value=""${ssrIncludeBooleanAttr(Array.isArray(unref(selectedBranch)) ? ssrLooseContain(unref(selectedBranch), "") : ssrLooseEqual(unref(selectedBranch), "")) ? " selected" : ""}>Pilih Cabang</option><!--[-->`);
        ssrRenderList((_a = unref(auth).user) == null ? void 0 : _a.branches, (b) => {
          _push(`<option${ssrRenderAttr("value", b.id)}${ssrIncludeBooleanAttr(Array.isArray(unref(selectedBranch)) ? ssrLooseContain(unref(selectedBranch), b.id) : ssrLooseEqual(unref(selectedBranch), b.id)) ? " selected" : ""}>${ssrInterpolate(b.name)}</option>`);
        });
        _push(`<!--]--></select></div>`);
      } else {
        _push(`<!---->`);
      }
      if (!unref(auth).isKasir) {
        _push(`<div><label class="block text-xs font-medium text-gray-700 mb-1">Tanggal</label><input${ssrRenderAttr("value", unref(filterDate))} type="date" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"></div>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(auth).isKasir) {
        _push(`<div><p class="text-sm text-gray-600">${ssrInterpolate(formatDate(unref(selectedDate)))}</p></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
      if (unref(loading)) {
        _push(ssrRenderComponent(_component_LoadingSpinner, null, null, _parent));
      } else if (unref(materials).length === 0) {
        _push(ssrRenderComponent(_component_EmptyState, { message: "Belum ada bahan baku untuk cabang ini" }, null, _parent));
      } else {
        _push(`<!--[-->`);
        if (unref(stockItems).length === 0 && !unref(auth).isKasir) {
          _push(`<div class="text-center py-6 text-gray-400 text-sm"> Belum ada data stok untuk tanggal ini </div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="space-y-3 mb-4"><div class="hidden md:grid md:grid-cols-[1fr_100px_100px_40px] gap-3 px-3 py-2 text-xs font-medium text-gray-500"><span>Bahan Baku</span><span class="text-center">Qty</span><span class="text-center">Terjual</span><span></span></div><!--[-->`);
        ssrRenderList(unref(stockItems), (item, idx) => {
          _push(`<div class="bg-white rounded-xl border border-gray-200 p-3"><div><label class="text-[10px] text-gray-400 font-medium mb-1 block">Bahan Baku</label><select class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none bg-white"><option${ssrRenderAttr("value", null)} disabled${ssrIncludeBooleanAttr(Array.isArray(item.raw_material_id) ? ssrLooseContain(item.raw_material_id, null) : ssrLooseEqual(item.raw_material_id, null)) ? " selected" : ""}>Pilih bahan</option><!--[-->`);
          ssrRenderList(unref(materials), (m) => {
            _push(`<option${ssrRenderAttr("value", m.id)}${ssrIncludeBooleanAttr(isMaterialUsed(m.id, idx)) ? " disabled" : ""}${ssrIncludeBooleanAttr(Array.isArray(item.raw_material_id) ? ssrLooseContain(item.raw_material_id, m.id) : ssrLooseEqual(item.raw_material_id, m.id)) ? " selected" : ""}>${ssrInterpolate(m.name)} (${ssrInterpolate(m.unit)})</option>`);
          });
          _push(`<!--]--></select></div><div class="flex items-center gap-3 mt-2"><div class="flex-1"><label class="text-[10px] text-gray-400 font-medium mb-1 block">Qty</label><input${ssrRenderAttr("value", item.stock)} type="number" step="0.01" min="0" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none" placeholder="Qty"></div><div class="flex-1"><label class="text-[10px] text-gray-400 font-medium mb-1 block">Terjual</label><input${ssrRenderAttr("value", item.sold)} type="number" step="0.01" min="0" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none" placeholder="Terjual"></div><button class="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors flex-shrink-0 mt-5"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg></button></div></div>`);
        });
        _push(`<!--]--></div><button class="w-full py-3 border-2 border-dashed border-gray-200 rounded-xl text-sm text-gray-400 hover:border-primary-300 hover:text-primary-500 transition-colors mb-4"> + Tambah Bahan </button><button${ssrIncludeBooleanAttr(!unref(canSave) || unref(saving)) ? " disabled" : ""} class="w-full bg-primary-600 text-white py-3 rounded-xl font-semibold hover:bg-primary-700 disabled:opacity-50 transition-colors">`);
        if (unref(saving)) {
          _push(ssrRenderComponent(_component_LoadingSpinner, null, null, _parent));
        } else {
          _push(`<span>Simpan</span>`);
        }
        _push(`</button><!--]-->`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/raw-material-stocks.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=raw-material-stocks-CvEcIPtR.mjs.map
