import { _ as _sfc_main$1 } from "./LoadingSpinner-CNrIgl7t.js";
import { defineComponent, ref, unref, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderStyle, ssrRenderComponent, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderList, ssrRenderAttr, ssrInterpolate, ssrRenderTeleport } from "vue/server-renderer";
import { u as useExpenditureStore } from "./expenditure-C4eReWlK.js";
import { u as useAuthStore } from "../server.mjs";
import "/Users/itmzt002/Documents/Projects/POS/frontend/node_modules/hookable/dist/index.mjs";
import "/Users/itmzt002/Documents/Projects/POS/frontend/node_modules/klona/dist/index.mjs";
import "#internal/nuxt/paths";
import "/Users/itmzt002/Documents/Projects/POS/frontend/node_modules/defu/dist/defu.mjs";
import { storeToRefs } from "pinia";
import { u as usePullToRefresh } from "./usePullToRefresh-Djnb12W0.js";
import "./useAppRefresh-BZYaFRjH.js";
import "/Users/itmzt002/Documents/Projects/POS/frontend/node_modules/ofetch/dist/node.mjs";
import "/Users/itmzt002/Documents/Projects/POS/frontend/node_modules/unctx/dist/index.mjs";
import "/Users/itmzt002/Documents/Projects/POS/frontend/node_modules/h3/dist/index.mjs";
import "vue-router";
import "/Users/itmzt002/Documents/Projects/POS/frontend/node_modules/ufo/dist/index.mjs";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "expenditure-categories",
  __ssrInlineRender: true,
  setup(__props) {
    const store = useExpenditureStore();
    const auth = useAuthStore();
    const { loading } = storeToRefs(store);
    const selectedBranch = ref("");
    const showForm = ref(false);
    const editing = ref(null);
    const formName = ref("");
    const formDesc = ref("");
    const formKey = ref("");
    const saving = ref(false);
    const deletingCategory = ref(null);
    const deleting = ref(false);
    function loadCategories() {
      if (!selectedBranch.value) return;
      store.fetchCategories({ branch_id: selectedBranch.value });
    }
    const { pulling, pullDistance, threshold } = usePullToRefresh(loadCategories);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_LoadingSpinner = _sfc_main$1;
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
      _push(`<div class="flex items-center justify-between mb-4"><h2 class="text-lg font-bold text-gray-900">Kategori Pengeluaran</h2><button class="bg-primary-600 text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-primary-700 active:scale-95 transition-all"> + Kategori </button></div><div class="mb-4"><select class="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none bg-white shadow-sm"><option value=""${ssrIncludeBooleanAttr(Array.isArray(unref(selectedBranch)) ? ssrLooseContain(unref(selectedBranch), "") : ssrLooseEqual(unref(selectedBranch), "")) ? " selected" : ""}>Pilih Cabang</option><!--[-->`);
      ssrRenderList(unref(auth).user?.branches, (b) => {
        _push(`<option${ssrRenderAttr("value", b.id)}${ssrIncludeBooleanAttr(Array.isArray(unref(selectedBranch)) ? ssrLooseContain(unref(selectedBranch), b.id) : ssrLooseEqual(unref(selectedBranch), b.id)) ? " selected" : ""}>${ssrInterpolate(b.name)}</option>`);
      });
      _push(`<!--]--></select></div>`);
      if (unref(loading)) {
        _push(ssrRenderComponent(_component_LoadingSpinner, null, null, _parent));
      } else {
        _push(`<!--[-->`);
        if (unref(store).categories.length === 0) {
          _push(`<div class="flex flex-col items-center justify-center py-16"><p class="text-gray-500 font-medium text-sm">Belum ada kategori pengeluaran</p></div>`);
        } else {
          _push(`<div class="grid grid-cols-1 md:grid-cols-2 gap-3"><!--[-->`);
          ssrRenderList(unref(store).categories, (c) => {
            _push(`<div class="bg-white rounded-xl border border-gray-200 p-4 flex items-center justify-between"><div><p class="text-sm font-medium text-gray-900">${ssrInterpolate(c.name)}</p>`);
            if (c.description) {
              _push(`<p class="text-xs text-gray-500 mt-0.5">${ssrInterpolate(c.description)}</p>`);
            } else {
              _push(`<!---->`);
            }
            if (c.branch) {
              _push(`<p class="text-[10px] text-gray-400 mt-1">${ssrInterpolate(c.branch.name)}</p>`);
            } else {
              _push(`<!---->`);
            }
            _push(`</div><div class="flex items-center gap-2"><button class="text-xs text-primary-600 hover:text-primary-700 px-2 py-1">Edit</button><button class="text-xs text-red-500 hover:text-red-700 px-2 py-1">Hapus</button></div></div>`);
          });
          _push(`<!--]--></div>`);
        }
        _push(`<!--]-->`);
      }
      ssrRenderTeleport(_push, (_push2) => {
        if (unref(showForm)) {
          _push2(`<div class="fixed inset-0 z-50 flex items-center justify-center p-4"><div class="fixed inset-0 bg-black/40"></div><div class="relative bg-white rounded-2xl shadow-xl w-full max-w-sm p-6"><h3 class="text-lg font-semibold text-gray-900 mb-4">${ssrInterpolate(unref(editing) ? "Edit" : "Tambah")} Kategori</h3><div class="space-y-3"><div><label class="block text-xs font-medium text-gray-700 mb-1">Nama</label><input${ssrRenderAttr("value", unref(formName))} type="text" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none" placeholder="Nama kategori"></div><div><label class="block text-xs font-medium text-gray-700 mb-1">Deskripsi</label><input${ssrRenderAttr("value", unref(formDesc))} type="text" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none" placeholder="Deskripsi (opsional)"></div><div><label class="block text-xs font-medium text-gray-700 mb-1">Key <span class="text-gray-400 font-normal">(opsional)</span></label><select class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none bg-white"><option value=""${ssrIncludeBooleanAttr(Array.isArray(unref(formKey)) ? ssrLooseContain(unref(formKey), "") : ssrLooseEqual(unref(formKey), "")) ? " selected" : ""}>Tanpa Key</option><option value="employee_bonuses"${ssrIncludeBooleanAttr(Array.isArray(unref(formKey)) ? ssrLooseContain(unref(formKey), "employee_bonuses") : ssrLooseEqual(unref(formKey), "employee_bonuses")) ? " selected" : ""}>Bonus Karyawan</option></select></div></div><div class="flex gap-3 mt-6"><button class="flex-1 py-2.5 border border-gray-200 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors">Batal</button><button${ssrIncludeBooleanAttr(!unref(formName) || unref(saving)) ? " disabled" : ""} class="flex-1 bg-primary-600 text-white py-2.5 rounded-xl text-sm font-semibold hover:bg-primary-700 disabled:opacity-50 transition-colors">${ssrInterpolate(unref(saving) ? "Menyimpan..." : "Simpan")}</button></div></div></div>`);
        } else {
          _push2(`<!---->`);
        }
      }, "body", false, _parent);
      ssrRenderTeleport(_push, (_push2) => {
        if (unref(deletingCategory)) {
          _push2(`<div class="fixed inset-0 z-50 flex items-center justify-center p-4"><div class="fixed inset-0 bg-black/40"></div><div class="relative bg-white rounded-2xl shadow-xl w-full max-w-sm p-6 text-center"><div class="w-14 h-14 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4"><svg class="w-7 h-7 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg></div><h3 class="text-lg font-semibold text-gray-900 mb-1">Hapus Kategori?</h3><p class="text-sm text-gray-500 mb-6">Kategori <strong>${ssrInterpolate(unref(deletingCategory).name)}</strong> akan dihapus.</p><div class="flex gap-3"><button class="flex-1 py-2.5 border border-gray-200 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors">Batal</button><button${ssrIncludeBooleanAttr(unref(deleting)) ? " disabled" : ""} class="flex-1 bg-red-500 text-white py-2.5 rounded-xl text-sm font-semibold hover:bg-red-600 disabled:opacity-50 transition-colors">${ssrInterpolate(unref(deleting) ? "Menghapus..." : "Hapus")}</button></div></div></div>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/expenditure-categories.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=expenditure-categories-BLCXVi2T.js.map
