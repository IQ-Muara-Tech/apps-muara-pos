import { _ as _sfc_main$1 } from "./LoadingSpinner-CNrIgl7t.js";
import { _ as _sfc_main$2 } from "./EmptyState-wMdsONY9.js";
import { defineComponent, ref, reactive, computed, unref, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderStyle, ssrRenderComponent, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderList, ssrRenderAttr, ssrInterpolate, ssrRenderTeleport } from "vue/server-renderer";
import { u as useRawMaterialStore } from "./raw-material-DhXNPoKs.js";
import { u as useAuthStore } from "../server.mjs";
import { u as usePullToRefresh } from "./usePullToRefresh-Djnb12W0.js";
import "./useAppRefresh-BZYaFRjH.js";
import "pinia";
import "/Users/itmzt002/Documents/Projects/POS/frontend/node_modules/ofetch/dist/node.mjs";
import "#internal/nuxt/paths";
import "/Users/itmzt002/Documents/Projects/POS/frontend/node_modules/hookable/dist/index.mjs";
import "/Users/itmzt002/Documents/Projects/POS/frontend/node_modules/unctx/dist/index.mjs";
import "/Users/itmzt002/Documents/Projects/POS/frontend/node_modules/h3/dist/index.mjs";
import "/Users/itmzt002/Documents/Projects/POS/frontend/node_modules/defu/dist/defu.mjs";
import "vue-router";
import "/Users/itmzt002/Documents/Projects/POS/frontend/node_modules/ufo/dist/index.mjs";
import "/Users/itmzt002/Documents/Projects/POS/frontend/node_modules/klona/dist/index.mjs";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "raw-materials",
  __ssrInlineRender: true,
  setup(__props) {
    const rawMaterialStore = useRawMaterialStore();
    const auth = useAuthStore();
    const loading = ref(true);
    const saving = ref(false);
    const search = ref("");
    const selectedBranch = ref("");
    const showModal = ref(false);
    const isEditing = ref(false);
    ref(null);
    const form = reactive({ name: "", unit: "kg", min_stock: 0, branch_id: "" });
    const filteredMaterials = computed(() => {
      if (!search.value) return rawMaterialStore.materials;
      const q = search.value.toLowerCase();
      return rawMaterialStore.materials.filter((m) => m.name.toLowerCase().includes(q));
    });
    function loadData() {
      const branchId = auth.isKasir ? auth.selectedBranch?.id : selectedBranch.value ? Number(selectedBranch.value) : void 0;
      rawMaterialStore.fetchAll(branchId);
    }
    const { pulling, pullDistance, threshold } = usePullToRefresh(loadData);
    return (_ctx, _push, _parent, _attrs) => {
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
      _push(`<div class="flex items-center justify-between mb-4"><h1 class="text-lg font-bold text-gray-900">Bahan Baku</h1><button class="bg-primary-600 text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-primary-700 active:scale-95 transition-all">+ Tambah</button></div><div class="mb-4">`);
      if (!unref(auth).isKasir) {
        _push(`<select class="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none bg-white shadow-sm"><option value=""${ssrIncludeBooleanAttr(Array.isArray(unref(selectedBranch)) ? ssrLooseContain(unref(selectedBranch), "") : ssrLooseEqual(unref(selectedBranch), "")) ? " selected" : ""}>Semua Cabang</option><!--[-->`);
        ssrRenderList(unref(auth).user?.branches, (b) => {
          _push(`<option${ssrRenderAttr("value", b.id)}${ssrIncludeBooleanAttr(Array.isArray(unref(selectedBranch)) ? ssrLooseContain(unref(selectedBranch), b.id) : ssrLooseEqual(unref(selectedBranch), b.id)) ? " selected" : ""}>${ssrInterpolate(b.name)}</option>`);
        });
        _push(`<!--]--></select>`);
      } else if (unref(auth).selectedBranch) {
        _push(`<div class="flex items-center gap-2 px-3 py-2.5 bg-primary-50 border border-primary-200 rounded-xl"><svg class="w-4 h-4 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg><span class="text-sm font-medium text-primary-700">${ssrInterpolate(unref(auth).selectedBranch.name)}</span></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="relative mb-4"><svg class="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg><input${ssrRenderAttr("value", unref(search))} type="text" placeholder="Cari bahan..." class="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none bg-white shadow-sm"></div>`);
      if (unref(loading)) {
        _push(ssrRenderComponent(_component_LoadingSpinner, null, null, _parent));
      } else {
        _push(`<!--[-->`);
        if (unref(filteredMaterials).length === 0) {
          _push(ssrRenderComponent(_component_EmptyState, null, null, _parent));
        } else {
          _push(`<div class="grid grid-cols-1 md:grid-cols-2 gap-3"><!--[-->`);
          ssrRenderList(unref(filteredMaterials), (material) => {
            _push(`<div class="bg-white rounded-xl border border-gray-100 p-4 hover:border-primary-300 hover:shadow-md transition-all cursor-pointer active:scale-[0.98]"><div class="flex items-center justify-between"><div><h3 class="font-medium text-gray-900 text-sm">${ssrInterpolate(material.name)}</h3><div class="flex items-center gap-2 mt-1"><span class="text-[11px] text-gray-400">${ssrInterpolate(material.unit)}</span><span class="text-[11px] text-gray-400">Min: ${ssrInterpolate(material.min_stock)}</span>`);
            if (material.branch) {
              _push(`<span class="text-[10px] bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded">${ssrInterpolate(material.branch.name)}</span>`);
            } else {
              _push(`<!---->`);
            }
            _push(`</div></div><svg class="w-4 h-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg></div></div>`);
          });
          _push(`<!--]--></div>`);
        }
        _push(`<!--]-->`);
      }
      ssrRenderTeleport(_push, (_push2) => {
        if (unref(showModal)) {
          _push2(`<div class="fixed inset-0 z-50 flex items-center justify-center p-4"><div class="fixed inset-0 bg-black/40"></div><div class="relative bg-white rounded-2xl shadow-xl w-full max-w-sm p-6"><h3 class="text-lg font-semibold text-gray-900 mb-4">${ssrInterpolate(unref(isEditing) ? "Edit" : "Tambah")} Bahan</h3><div class="space-y-3">`);
          if (!unref(isEditing) && !unref(auth).isKasir) {
            _push2(`<div><label class="block text-xs font-medium text-gray-700 mb-1">Cabang</label><select class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none bg-white"><option value="" disabled${ssrIncludeBooleanAttr(Array.isArray(unref(form).branch_id) ? ssrLooseContain(unref(form).branch_id, "") : ssrLooseEqual(unref(form).branch_id, "")) ? " selected" : ""}>Pilih cabang</option><!--[-->`);
            ssrRenderList(unref(auth).user?.branches, (b) => {
              _push2(`<option${ssrRenderAttr("value", b.id)}${ssrIncludeBooleanAttr(Array.isArray(unref(form).branch_id) ? ssrLooseContain(unref(form).branch_id, b.id) : ssrLooseEqual(unref(form).branch_id, b.id)) ? " selected" : ""}>${ssrInterpolate(b.name)}</option>`);
            });
            _push2(`<!--]--></select></div>`);
          } else {
            _push2(`<div><label class="block text-xs font-medium text-gray-700 mb-1">Cabang</label><p class="text-sm text-gray-600 px-3 py-2 bg-gray-50 rounded-lg">${ssrInterpolate(unref(auth).isKasir ? unref(auth).selectedBranch?.name : unref(auth).user?.branches?.find((b) => b.id == unref(form).branch_id)?.name)}</p></div>`);
          }
          _push2(`<div><label class="block text-xs font-medium text-gray-700 mb-1">Nama</label><input${ssrRenderAttr("value", unref(form).name)} type="text" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none" placeholder="Nama bahan"></div><div class="grid grid-cols-2 gap-3"><div><label class="block text-xs font-medium text-gray-700 mb-1">Satuan</label><select class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none bg-white"><option value="kg"${ssrIncludeBooleanAttr(Array.isArray(unref(form).unit) ? ssrLooseContain(unref(form).unit, "kg") : ssrLooseEqual(unref(form).unit, "kg")) ? " selected" : ""}>Kg</option><option value="ltr"${ssrIncludeBooleanAttr(Array.isArray(unref(form).unit) ? ssrLooseContain(unref(form).unit, "ltr") : ssrLooseEqual(unref(form).unit, "ltr")) ? " selected" : ""}>Liter</option><option value="pcs"${ssrIncludeBooleanAttr(Array.isArray(unref(form).unit) ? ssrLooseContain(unref(form).unit, "pcs") : ssrLooseEqual(unref(form).unit, "pcs")) ? " selected" : ""}>Pcs</option><option value="gram"${ssrIncludeBooleanAttr(Array.isArray(unref(form).unit) ? ssrLooseContain(unref(form).unit, "gram") : ssrLooseEqual(unref(form).unit, "gram")) ? " selected" : ""}>Gram</option><option value="galon"${ssrIncludeBooleanAttr(Array.isArray(unref(form).unit) ? ssrLooseContain(unref(form).unit, "galon") : ssrLooseEqual(unref(form).unit, "galon")) ? " selected" : ""}>Galon</option><option value="ikat"${ssrIncludeBooleanAttr(Array.isArray(unref(form).unit) ? ssrLooseContain(unref(form).unit, "ikat") : ssrLooseEqual(unref(form).unit, "ikat")) ? " selected" : ""}>Ikat</option><option value="pack"${ssrIncludeBooleanAttr(Array.isArray(unref(form).unit) ? ssrLooseContain(unref(form).unit, "pack") : ssrLooseEqual(unref(form).unit, "pack")) ? " selected" : ""}>Pack</option></select></div><div><label class="block text-xs font-medium text-gray-700 mb-1">Min. Stok</label><input${ssrRenderAttr("value", unref(form).min_stock)} type="number" min="0" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"></div></div></div><div class="flex gap-3 mt-6"><button class="flex-1 py-2.5 border border-gray-200 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors">Batal</button><button${ssrIncludeBooleanAttr(!unref(form).name || unref(saving)) ? " disabled" : ""} class="flex-1 bg-primary-600 text-white py-2.5 rounded-xl text-sm font-semibold hover:bg-primary-700 disabled:opacity-50 transition-colors">${ssrInterpolate(unref(saving) ? "Menyimpan..." : unref(isEditing) ? "Simpan" : "Tambah")}</button></div></div></div>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/raw-materials.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=raw-materials-DS-zO_LM.js.map
