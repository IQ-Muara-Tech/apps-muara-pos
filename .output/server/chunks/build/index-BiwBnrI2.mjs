import { _ as _sfc_main$1 } from './LoadingSpinner-CNrIgl7t.mjs';
import { _ as __nuxt_component_0 } from './nuxt-link-CCHdkusK.mjs';
import { defineComponent, ref, reactive, computed, h, unref, withCtx, createVNode, resolveDynamicComponent, openBlock, createBlock, toDisplayString, createCommentVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderStyle, ssrRenderComponent, ssrInterpolate, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderList, ssrRenderAttr, ssrRenderClass, ssrRenderVNode } from 'vue/server-renderer';
import { u as useAuthStore, a as useApi } from './server.mjs';
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
import 'pinia';
import 'vue-router';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const auth = useAuthStore();
    const selectedBranch = ref("");
    const summary = reactive({ today_sales: 0, today_revenue: 0 });
    const lowStockMaterials = ref([]);
    const monthlyData = ref([]);
    const currentYear = (/* @__PURE__ */ new Date()).getFullYear();
    const yearlyTotal = computed(() => monthlyData.value.reduce((sum, m) => sum + m.total_revenue, 0));
    const maxRevenue = computed(() => {
      const max = Math.max(...monthlyData.value.map((m) => m.total_revenue), 1);
      return max;
    });
    function getBarHeight(revenue) {
      if (revenue === 0) return 5;
      return Math.max(5, revenue / maxRevenue.value * 100);
    }
    const CategoryIcon = defineComponent({
      setup() {
        return () => h("svg", { fill: "none", stroke: "currentColor", viewBox: "0 0 24 24" }, [
          h("path", { "stroke-linecap": "round", "stroke-linejoin": "round", "stroke-width": "2", d: "M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" })
        ]);
      }
    });
    const EmployeeIcon = defineComponent({
      setup() {
        return () => h("svg", { fill: "none", stroke: "currentColor", viewBox: "0 0 24 24" }, [
          h("path", { "stroke-linecap": "round", "stroke-linejoin": "round", "stroke-width": "2", d: "M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" })
        ]);
      }
    });
    const BoxIcon = defineComponent({
      setup() {
        return () => h("svg", { fill: "none", stroke: "currentColor", viewBox: "0 0 24 24" }, [
          h("path", { "stroke-linecap": "round", "stroke-linejoin": "round", "stroke-width": "2", d: "M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" })
        ]);
      }
    });
    const TagIcon = defineComponent({
      setup() {
        return () => h("svg", { fill: "none", stroke: "currentColor", viewBox: "0 0 24 24" }, [
          h("path", { "stroke-linecap": "round", "stroke-linejoin": "round", "stroke-width": "2", d: "M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" })
        ]);
      }
    });
    const MoneyIcon = defineComponent({
      setup() {
        return () => h("svg", { fill: "none", stroke: "currentColor", viewBox: "0 0 24 24" }, [
          h("path", { "stroke-linecap": "round", "stroke-linejoin": "round", "stroke-width": "2", d: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" })
        ]);
      }
    });
    const StockIcon = defineComponent({
      setup() {
        return () => h("svg", { fill: "none", stroke: "currentColor", viewBox: "0 0 24 24" }, [
          h("path", { "stroke-linecap": "round", "stroke-linejoin": "round", "stroke-width": "2", d: "M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" })
        ]);
      }
    });
    const menus = computed(() => {
      var _a;
      const items = [
        {
          label: "Kategori",
          to: "/categories",
          bgClass: "bg-purple-50",
          iconClass: "text-purple-600",
          icon: CategoryIcon
        },
        {
          label: "Bahan Baku",
          to: "/raw-materials",
          bgClass: "bg-orange-50",
          iconClass: "text-orange-600",
          icon: BoxIcon
        },
        {
          label: "Input Stok",
          to: "/raw-material-stocks",
          bgClass: "bg-teal-50",
          iconClass: "text-teal-600",
          icon: StockIcon
        }
      ];
      if (((_a = auth.user) == null ? void 0 : _a.role_id) === 1) {
        items.push(
          {
            label: "Karyawan",
            to: "/employees",
            bgClass: "bg-amber-50",
            iconClass: "text-amber-600",
            icon: EmployeeIcon
          },
          {
            label: "Kat. Pengeluaran",
            to: "/expenditure-categories",
            bgClass: "bg-rose-50",
            iconClass: "text-rose-600",
            icon: TagIcon
          },
          {
            label: "Pengeluaran",
            to: "/expenditures",
            bgClass: "bg-red-50",
            iconClass: "text-red-600",
            icon: MoneyIcon
          }
        );
      }
      return items;
    });
    const effectiveBranch = computed(() => {
      var _a;
      if (auth.isKasir) return ((_a = auth.selectedBranch) == null ? void 0 : _a.id) || null;
      return selectedBranch.value ? Number(selectedBranch.value) : null;
    });
    async function fetchSummary() {
      try {
        const { get } = useApi();
        const params = {};
        if (effectiveBranch.value) params.branch_id = effectiveBranch.value;
        const data = await get("/dashboard/summary", params);
        Object.assign(summary, data);
      } catch {
      }
    }
    async function fetchLowStock() {
      try {
        const { get } = useApi();
        const params = {};
        if (effectiveBranch.value) params.branch_id = effectiveBranch.value;
        const data = await get("/dashboard/low-stock", params);
        lowStockMaterials.value = data.data || data;
      } catch {
      }
    }
    async function fetchMonthlyRevenue() {
      try {
        const { get } = useApi();
        const params = { year: currentYear };
        if (effectiveBranch.value) params.branch_id = effectiveBranch.value;
        const data = await get("/dashboard/monthly-revenue", params);
        monthlyData.value = data.data || data;
      } catch {
      }
    }
    async function refreshData() {
      const tasks = [fetchSummary(), fetchLowStock()];
      if (!auth.isKasir) tasks.push(fetchMonthlyRevenue());
      await Promise.all(tasks);
    }
    const { pulling, pullDistance, threshold } = usePullToRefresh(refreshData);
    function formatRupiah(value) {
      return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(value);
    }
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b, _c, _d;
      const _component_LoadingSpinner = _sfc_main$1;
      const _component_NuxtLink = __nuxt_component_0;
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
      _push(`<div class="mb-4"><h1 class="text-lg font-bold text-gray-900">Halo, ${ssrInterpolate(((_a = unref(auth).user) == null ? void 0 : _a.name) || "User")}</h1><p class="text-sm text-gray-500">${ssrInterpolate((_c = (_b = unref(auth).user) == null ? void 0 : _b.role) == null ? void 0 : _c.name)}</p></div><div class="mb-4">`);
      if (!unref(auth).isKasir) {
        _push(`<select class="w-full px-3 py-2.5 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none bg-white"><option value=""${ssrIncludeBooleanAttr(Array.isArray(unref(selectedBranch)) ? ssrLooseContain(unref(selectedBranch), "") : ssrLooseEqual(unref(selectedBranch), "")) ? " selected" : ""}>Semua Cabang</option><!--[-->`);
        ssrRenderList((_d = unref(auth).user) == null ? void 0 : _d.branches, (b) => {
          _push(`<option${ssrRenderAttr("value", b.id)}${ssrIncludeBooleanAttr(Array.isArray(unref(selectedBranch)) ? ssrLooseContain(unref(selectedBranch), b.id) : ssrLooseEqual(unref(selectedBranch), b.id)) ? " selected" : ""}>${ssrInterpolate(b.name)}</option>`);
        });
        _push(`<!--]--></select>`);
      } else if (unref(auth).selectedBranch) {
        _push(`<div class="flex items-center gap-2 px-3 py-2.5 bg-primary-50 border border-primary-200 rounded-xl"><svg class="w-4 h-4 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg><span class="text-sm font-medium text-primary-700">${ssrInterpolate(unref(auth).selectedBranch.name)}</span></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6"><div class="bg-primary-50 rounded-xl p-4 border border-primary-100"><p class="text-xs text-primary-600 font-medium">Penjualan Hari Ini</p><p class="text-2xl font-bold text-primary-700 mt-1">${ssrInterpolate(unref(summary).today_sales)}</p></div><div class="bg-green-50 rounded-xl p-4 border border-green-100"><p class="text-xs text-green-600 font-medium">Pendapatan Hari Ini</p><p class="text-lg font-bold text-green-700 mt-1">${ssrInterpolate(formatRupiah(unref(summary).today_revenue))}</p></div></div>`);
      if (unref(monthlyData).length && !unref(auth).isKasir) {
        _push(`<div class="bg-white rounded-xl border border-gray-200 p-4 mb-6"><div class="flex items-center justify-between mb-4"><h2 class="text-sm font-semibold text-gray-900">Omset Bulanan ${ssrInterpolate(unref(currentYear))}</h2></div>`);
        if (unref(monthlyData).length) {
          _push(`<div class="flex items-end gap-1.5 h-32"><!--[-->`);
          ssrRenderList(unref(monthlyData), (item, idx) => {
            _push(`<div class="flex-1 flex flex-col items-center gap-1"><div class="w-full relative" style="${ssrRenderStyle({ "height": "100px" })}"><div class="${ssrRenderClass([item.total_revenue > 0 ? "bg-primary-400" : "bg-gray-100", "absolute bottom-0 w-full rounded-t transition-all duration-500"])}" style="${ssrRenderStyle({ height: getBarHeight(item.total_revenue) + "%" })}"></div></div><span class="text-[10px] text-gray-500">${ssrInterpolate(item.name)}</span></div>`);
          });
          _push(`<!--]--></div>`);
        } else {
          _push(`<div class="h-32 flex items-center justify-center text-sm text-gray-400"> Memuat data... </div>`);
        }
        if (unref(monthlyData).length) {
          _push(`<div class="mt-3 pt-3 border-t border-gray-100 flex justify-between"><span class="text-xs text-gray-500">Total Tahun Ini</span><span class="text-sm font-semibold text-primary-600">${ssrInterpolate(formatRupiah(unref(yearlyTotal)))}</span></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="grid grid-cols-3 md:grid-cols-6 gap-3"><!--[-->`);
      ssrRenderList(unref(menus), (menu) => {
        _push(ssrRenderComponent(_component_NuxtLink, {
          key: menu.to,
          to: menu.to,
          class: "bg-white rounded-xl border border-gray-200 p-4 flex flex-col items-center gap-2 hover:border-primary-300 hover:shadow-sm transition-all"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="${ssrRenderClass([menu.bgClass, "w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center"])}"${_scopeId}>`);
              ssrRenderVNode(_push2, createVNode(resolveDynamicComponent(menu.icon), {
                class: ["w-5 h-5", menu.iconClass]
              }, null), _parent2, _scopeId);
              _push2(`</div><span class="text-xs font-medium text-gray-700 text-center"${_scopeId}>${ssrInterpolate(menu.label)}</span>`);
            } else {
              return [
                createVNode("div", {
                  class: ["w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center", menu.bgClass]
                }, [
                  (openBlock(), createBlock(resolveDynamicComponent(menu.icon), {
                    class: ["w-5 h-5", menu.iconClass]
                  }, null, 8, ["class"]))
                ], 2),
                createVNode("span", { class: "text-xs font-medium text-gray-700 text-center" }, toDisplayString(menu.label), 1)
              ];
            }
          }),
          _: 2
        }, _parent));
      });
      _push(`<!--]--></div><div class="h-4"></div>`);
      if (unref(lowStockMaterials).length > 0) {
        _push(`<div class="mb-6"><h2 class="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2"><svg class="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01M12 2a10 10 0 100 20 10 10 0 000-20z"></path></svg> Bahan Hampir Habis </h2><div class="bg-red-50 rounded-xl border border-red-200 p-3 space-y-2"><!--[-->`);
        ssrRenderList(unref(lowStockMaterials), (material) => {
          _push(ssrRenderComponent(_component_NuxtLink, {
            key: material.id,
            to: "/raw-material-stocks",
            class: "flex items-center justify-between py-1.5 px-2 rounded-lg hover:bg-red-100/50 transition-colors"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<div${_scopeId}><p class="text-sm font-medium text-red-800"${_scopeId}>${ssrInterpolate(material.name)}</p><p class="text-xs text-red-600"${_scopeId}>Stok: ${ssrInterpolate(material.stock)} ${ssrInterpolate(material.unit)} (Min: ${ssrInterpolate(material.min_stock)})</p>`);
                if (material.branch) {
                  _push2(`<p class="text-[11px] text-red-500 mt-0.5"${_scopeId}>${ssrInterpolate(material.branch.name)}</p>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`</div><svg class="w-4 h-4 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"${_scopeId}></path></svg>`);
              } else {
                return [
                  createVNode("div", null, [
                    createVNode("p", { class: "text-sm font-medium text-red-800" }, toDisplayString(material.name), 1),
                    createVNode("p", { class: "text-xs text-red-600" }, "Stok: " + toDisplayString(material.stock) + " " + toDisplayString(material.unit) + " (Min: " + toDisplayString(material.min_stock) + ")", 1),
                    material.branch ? (openBlock(), createBlock("p", {
                      key: 0,
                      class: "text-[11px] text-red-500 mt-0.5"
                    }, toDisplayString(material.branch.name), 1)) : createCommentVNode("", true)
                  ]),
                  (openBlock(), createBlock("svg", {
                    class: "w-4 h-4 text-red-400",
                    fill: "none",
                    stroke: "currentColor",
                    viewBox: "0 0 24 24"
                  }, [
                    createVNode("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      "stroke-width": "2",
                      d: "M9 5l7 7-7 7"
                    })
                  ]))
                ];
              }
            }),
            _: 2
          }, _parent));
        });
        _push(`<!--]--></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-BiwBnrI2.mjs.map
