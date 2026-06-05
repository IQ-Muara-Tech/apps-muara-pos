import { _ as _sfc_main$1 } from './LoadingSpinner-CNrIgl7t.mjs';
import { _ as _sfc_main$2 } from './EmptyState-wMdsONY9.mjs';
import { _ as __nuxt_component_2 } from './FormModal-D8pcZ_wp.mjs';
import { defineComponent, ref, computed, unref, withCtx, createVNode, withModifiers, openBlock, createBlock, withDirectives, Fragment, renderList, toDisplayString, vModelSelect, createCommentVNode, vModelText, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderStyle, ssrRenderComponent, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderList, ssrRenderAttr, ssrInterpolate } from 'vue/server-renderer';
import { u as useProductStore } from './product-aGR6s5rU.mjs';
import { u as useCategoryStore } from './category-DdOxNGvy.mjs';
import { u as useAuthStore } from './server.mjs';
import { storeToRefs } from 'pinia';
import { u as usePullToRefresh } from './usePullToRefresh-Djnb12W0.mjs';
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

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "products",
  __ssrInlineRender: true,
  setup(__props) {
    const productStore = useProductStore();
    const categoryStore = useCategoryStore();
    const auth = useAuthStore();
    const { products, loading } = storeToRefs(productStore);
    const { categories } = storeToRefs(categoryStore);
    const search = ref("");
    const selectedBranch = ref("");
    const filterCategory = ref("");
    const modalShow = ref(false);
    const deleteShow = ref(false);
    const editing = ref(null);
    const deleting = ref(null);
    const saving = ref(false);
    const form = ref({ name: "", category_id: "", price: 0, branch_id: "" });
    const filtered = computed(() => {
      return products.value.filter((p) => {
        const matchSearch = p.name.toLowerCase().includes(search.value.toLowerCase());
        const matchCat = !filterCategory.value || p.category_id === Number(filterCategory.value);
        return matchSearch && matchCat;
      });
    });
    function formatRupiah(value) {
      return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(value);
    }
    function loadData() {
      var _a;
      const params = {};
      const branchId = auth.isKasir ? (_a = auth.selectedBranch) == null ? void 0 : _a.id : selectedBranch.value ? Number(selectedBranch.value) : void 0;
      if (branchId) params.branch_id = branchId;
      productStore.fetchAll(params);
      categoryStore.fetchAll(branchId);
    }
    const { pulling, pullDistance, threshold } = usePullToRefresh(loadData);
    function closeModal() {
      modalShow.value = false;
      editing.value = null;
    }
    async function save() {
      saving.value = true;
      try {
        const data = { ...form.value, category_id: Number(form.value.category_id), branch_id: Number(form.value.branch_id) };
        if (editing.value) {
          await productStore.update(editing.value.id, data);
        } else {
          await productStore.create(data);
        }
        closeModal();
      } finally {
        saving.value = false;
      }
    }
    async function remove() {
      if (deleting.value) {
        await productStore.remove(deleting.value.id);
        deleteShow.value = false;
        deleting.value = null;
      }
    }
    return (_ctx, _push, _parent, _attrs) => {
      var _a;
      const _component_LoadingSpinner = _sfc_main$1;
      const _component_EmptyState = _sfc_main$2;
      const _component_FormModal = __nuxt_component_2;
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
      _push(`<div class="flex items-center justify-between mb-4"><h2 class="text-lg font-bold text-gray-900">Produk</h2><button class="bg-primary-600 text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-primary-700 active:scale-95 transition-all">+ Tambah</button></div><div class="mb-4">`);
      if (!unref(auth).isKasir) {
        _push(`<select class="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none bg-white shadow-sm"><option value=""${ssrIncludeBooleanAttr(Array.isArray(unref(selectedBranch)) ? ssrLooseContain(unref(selectedBranch), "") : ssrLooseEqual(unref(selectedBranch), "")) ? " selected" : ""}>Semua Cabang</option><!--[-->`);
        ssrRenderList((_a = unref(auth).user) == null ? void 0 : _a.branches, (b) => {
          _push(`<option${ssrRenderAttr("value", b.id)}${ssrIncludeBooleanAttr(Array.isArray(unref(selectedBranch)) ? ssrLooseContain(unref(selectedBranch), b.id) : ssrLooseEqual(unref(selectedBranch), b.id)) ? " selected" : ""}>${ssrInterpolate(b.name)}</option>`);
        });
        _push(`<!--]--></select>`);
      } else if (unref(auth).selectedBranch) {
        _push(`<div class="flex items-center gap-2 px-3 py-2.5 bg-primary-50 border border-primary-200 rounded-xl"><svg class="w-4 h-4 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg><span class="text-sm font-medium text-primary-700">${ssrInterpolate(unref(auth).selectedBranch.name)}</span></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="flex gap-2 mb-4"><div class="relative flex-1"><svg class="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg><input${ssrRenderAttr("value", unref(search))} type="text" placeholder="Cari produk..." class="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none bg-white shadow-sm"></div><select class="px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none bg-white shadow-sm"><option value=""${ssrIncludeBooleanAttr(Array.isArray(unref(filterCategory)) ? ssrLooseContain(unref(filterCategory), "") : ssrLooseEqual(unref(filterCategory), "")) ? " selected" : ""}>Semua</option><!--[-->`);
      ssrRenderList(unref(categories), (cat) => {
        _push(`<option${ssrRenderAttr("value", cat.id)}${ssrIncludeBooleanAttr(Array.isArray(unref(filterCategory)) ? ssrLooseContain(unref(filterCategory), cat.id) : ssrLooseEqual(unref(filterCategory), cat.id)) ? " selected" : ""}>${ssrInterpolate(cat.name)}</option>`);
      });
      _push(`<!--]--></select></div>`);
      if (unref(loading)) {
        _push(ssrRenderComponent(_component_LoadingSpinner, { full: "" }, null, _parent));
      } else {
        _push(`<!--[-->`);
        if (unref(filtered).length === 0) {
          _push(ssrRenderComponent(_component_EmptyState, null, null, _parent));
        } else {
          _push(`<div class="grid grid-cols-1 md:grid-cols-2 gap-3"><!--[-->`);
          ssrRenderList(unref(filtered), (prod) => {
            var _a2, _b;
            _push(`<div class="bg-white rounded-xl border border-gray-100 p-4 hover:border-primary-300 hover:shadow-md cursor-pointer transition-all active:scale-[0.98]"><div class="flex items-center justify-between"><div class="flex-1 min-w-0"><p class="font-medium text-gray-900 text-sm truncate">${ssrInterpolate(prod.name)}</p><div class="flex items-center gap-2 mt-1"><span class="text-[11px] text-gray-400">${ssrInterpolate(((_a2 = prod.category) == null ? void 0 : _a2.name) || "Tanpa kategori")}</span><span class="text-[10px] bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded">${ssrInterpolate((_b = prod.branch) == null ? void 0 : _b.name)}</span></div></div><p class="text-sm font-semibold text-primary-600 ml-3">${ssrInterpolate(formatRupiah(prod.price))}</p></div></div>`);
          });
          _push(`<!--]--></div>`);
        }
        _push(`<!--]-->`);
      }
      _push(ssrRenderComponent(_component_FormModal, {
        show: unref(modalShow),
        title: unref(editing) ? "Edit Produk" : "Tambah Produk",
        onClose: closeModal
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          var _a2, _b, _c, _d, _e, _f, _g, _h, _i, _j;
          if (_push2) {
            _push2(`<form class="space-y-4"${_scopeId}>`);
            if (!unref(editing) && !unref(auth).isKasir) {
              _push2(`<div${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1"${_scopeId}>Cabang</label><select required class="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none bg-white"${_scopeId}><option value="" disabled${ssrIncludeBooleanAttr(Array.isArray(unref(form).branch_id) ? ssrLooseContain(unref(form).branch_id, "") : ssrLooseEqual(unref(form).branch_id, "")) ? " selected" : ""}${_scopeId}>Pilih cabang</option><!--[-->`);
              ssrRenderList((_a2 = unref(auth).user) == null ? void 0 : _a2.branches, (b) => {
                _push2(`<option${ssrRenderAttr("value", b.id)}${ssrIncludeBooleanAttr(Array.isArray(unref(form).branch_id) ? ssrLooseContain(unref(form).branch_id, b.id) : ssrLooseEqual(unref(form).branch_id, b.id)) ? " selected" : ""}${_scopeId}>${ssrInterpolate(b.name)}</option>`);
              });
              _push2(`<!--]--></select></div>`);
            } else {
              _push2(`<!---->`);
            }
            if (unref(editing) || unref(auth).isKasir) {
              _push2(`<div${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1"${_scopeId}>Cabang</label><p class="text-sm text-gray-600 px-4 py-2.5 bg-gray-50 rounded-xl"${_scopeId}>${ssrInterpolate(unref(auth).isKasir ? (_b = unref(auth).selectedBranch) == null ? void 0 : _b.name : (_e = (_d = (_c = unref(auth).user) == null ? void 0 : _c.branches) == null ? void 0 : _d.find((b) => b.id == unref(form).branch_id)) == null ? void 0 : _e.name)}</p></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<div${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1"${_scopeId}>Nama Produk</label><input${ssrRenderAttr("value", unref(form).name)} type="text" required placeholder="Nama produk" class="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"${_scopeId}></div><div${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1"${_scopeId}>Kategori</label><select required class="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none bg-white"${_scopeId}><option value="" disabled${ssrIncludeBooleanAttr(Array.isArray(unref(form).category_id) ? ssrLooseContain(unref(form).category_id, "") : ssrLooseEqual(unref(form).category_id, "")) ? " selected" : ""}${_scopeId}>Pilih kategori</option><!--[-->`);
            ssrRenderList(unref(categories), (cat) => {
              _push2(`<option${ssrRenderAttr("value", cat.id)}${ssrIncludeBooleanAttr(Array.isArray(unref(form).category_id) ? ssrLooseContain(unref(form).category_id, cat.id) : ssrLooseEqual(unref(form).category_id, cat.id)) ? " selected" : ""}${_scopeId}>${ssrInterpolate(cat.name)}</option>`);
            });
            _push2(`<!--]--></select></div><div${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1"${_scopeId}>Harga</label><input${ssrRenderAttr("value", unref(form).price)} type="number" required min="0" placeholder="0" class="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"${_scopeId}></div><div class="flex gap-3"${_scopeId}><button type="button" class="flex-1 py-2.5 border border-gray-200 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors"${_scopeId}>Batal</button><button type="submit"${ssrIncludeBooleanAttr(unref(saving)) ? " disabled" : ""} class="flex-1 bg-primary-600 text-white py-2.5 rounded-xl text-sm font-medium hover:bg-primary-700 disabled:opacity-50 active:scale-95 transition-all"${_scopeId}>${ssrInterpolate(unref(saving) ? "Menyimpan..." : "Simpan")}</button></div></form>`);
          } else {
            return [
              createVNode("form", {
                onSubmit: withModifiers(save, ["prevent"]),
                class: "space-y-4"
              }, [
                !unref(editing) && !unref(auth).isKasir ? (openBlock(), createBlock("div", { key: 0 }, [
                  createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, "Cabang"),
                  withDirectives(createVNode("select", {
                    "onUpdate:modelValue": ($event) => unref(form).branch_id = $event,
                    required: "",
                    class: "w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none bg-white"
                  }, [
                    createVNode("option", {
                      value: "",
                      disabled: ""
                    }, "Pilih cabang"),
                    (openBlock(true), createBlock(Fragment, null, renderList((_f = unref(auth).user) == null ? void 0 : _f.branches, (b) => {
                      return openBlock(), createBlock("option", {
                        key: b.id,
                        value: b.id
                      }, toDisplayString(b.name), 9, ["value"]);
                    }), 128))
                  ], 8, ["onUpdate:modelValue"]), [
                    [vModelSelect, unref(form).branch_id]
                  ])
                ])) : createCommentVNode("", true),
                unref(editing) || unref(auth).isKasir ? (openBlock(), createBlock("div", { key: 1 }, [
                  createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, "Cabang"),
                  createVNode("p", { class: "text-sm text-gray-600 px-4 py-2.5 bg-gray-50 rounded-xl" }, toDisplayString(unref(auth).isKasir ? (_g = unref(auth).selectedBranch) == null ? void 0 : _g.name : (_j = (_i = (_h = unref(auth).user) == null ? void 0 : _h.branches) == null ? void 0 : _i.find((b) => b.id == unref(form).branch_id)) == null ? void 0 : _j.name), 1)
                ])) : createCommentVNode("", true),
                createVNode("div", null, [
                  createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, "Nama Produk"),
                  withDirectives(createVNode("input", {
                    "onUpdate:modelValue": ($event) => unref(form).name = $event,
                    type: "text",
                    required: "",
                    placeholder: "Nama produk",
                    class: "w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                  }, null, 8, ["onUpdate:modelValue"]), [
                    [vModelText, unref(form).name]
                  ])
                ]),
                createVNode("div", null, [
                  createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, "Kategori"),
                  withDirectives(createVNode("select", {
                    "onUpdate:modelValue": ($event) => unref(form).category_id = $event,
                    required: "",
                    class: "w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none bg-white"
                  }, [
                    createVNode("option", {
                      value: "",
                      disabled: ""
                    }, "Pilih kategori"),
                    (openBlock(true), createBlock(Fragment, null, renderList(unref(categories), (cat) => {
                      return openBlock(), createBlock("option", {
                        key: cat.id,
                        value: cat.id
                      }, toDisplayString(cat.name), 9, ["value"]);
                    }), 128))
                  ], 8, ["onUpdate:modelValue"]), [
                    [vModelSelect, unref(form).category_id]
                  ])
                ]),
                createVNode("div", null, [
                  createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, "Harga"),
                  withDirectives(createVNode("input", {
                    "onUpdate:modelValue": ($event) => unref(form).price = $event,
                    type: "number",
                    required: "",
                    min: "0",
                    placeholder: "0",
                    class: "w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                  }, null, 8, ["onUpdate:modelValue"]), [
                    [vModelText, unref(form).price]
                  ])
                ]),
                createVNode("div", { class: "flex gap-3" }, [
                  createVNode("button", {
                    type: "button",
                    onClick: closeModal,
                    class: "flex-1 py-2.5 border border-gray-200 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors"
                  }, "Batal"),
                  createVNode("button", {
                    type: "submit",
                    disabled: unref(saving),
                    class: "flex-1 bg-primary-600 text-white py-2.5 rounded-xl text-sm font-medium hover:bg-primary-700 disabled:opacity-50 active:scale-95 transition-all"
                  }, toDisplayString(unref(saving) ? "Menyimpan..." : "Simpan"), 9, ["disabled"])
                ])
              ], 32)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_FormModal, {
        show: unref(deleteShow),
        title: "Hapus Produk",
        onClose: ($event) => deleteShow.value = false
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          var _a2, _b;
          if (_push2) {
            _push2(`<div class="space-y-4"${_scopeId}><p class="text-sm text-gray-600"${_scopeId}>Yakin ingin menghapus <strong${_scopeId}>${ssrInterpolate((_a2 = unref(deleting)) == null ? void 0 : _a2.name)}</strong>?</p><div class="flex gap-3"${_scopeId}><button class="flex-1 py-2.5 border border-gray-200 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50"${_scopeId}>Batal</button><button class="flex-1 bg-red-500 text-white py-2.5 rounded-xl text-sm font-medium hover:bg-red-600 active:scale-95 transition-all"${_scopeId}>Hapus</button></div></div>`);
          } else {
            return [
              createVNode("div", { class: "space-y-4" }, [
                createVNode("p", { class: "text-sm text-gray-600" }, [
                  createTextVNode("Yakin ingin menghapus "),
                  createVNode("strong", null, toDisplayString((_b = unref(deleting)) == null ? void 0 : _b.name), 1),
                  createTextVNode("?")
                ]),
                createVNode("div", { class: "flex gap-3" }, [
                  createVNode("button", {
                    onClick: ($event) => deleteShow.value = false,
                    class: "flex-1 py-2.5 border border-gray-200 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50"
                  }, "Batal", 8, ["onClick"]),
                  createVNode("button", {
                    onClick: remove,
                    class: "flex-1 bg-red-500 text-white py-2.5 rounded-xl text-sm font-medium hover:bg-red-600 active:scale-95 transition-all"
                  }, "Hapus")
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/products.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=products-C72C5F2X.mjs.map
