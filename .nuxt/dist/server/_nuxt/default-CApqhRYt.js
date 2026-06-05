import { _ as __nuxt_component_0 } from "./nuxt-link-CCHdkusK.js";
import { defineComponent, h, computed, mergeProps, unref, withCtx, createVNode, resolveDynamicComponent, openBlock, createBlock, toDisplayString, useSSRContext, watchEffect } from "vue";
import { ssrRenderAttrs, ssrRenderList, ssrRenderComponent, ssrRenderVNode, ssrInterpolate, ssrIncludeBooleanAttr, ssrRenderClass, ssrRenderSlot } from "vue/server-renderer";
import { b as useRoute, u as useAuthStore, n as navigateTo } from "../server.mjs";
import { _ as _sfc_main$4 } from "./LoadingSpinner-CNrIgl7t.js";
import { u as useAppRefresh } from "./useAppRefresh-BZYaFRjH.js";
import "/Users/itmzt002/Documents/Projects/POS/frontend/node_modules/ufo/dist/index.mjs";
import "/Users/itmzt002/Documents/Projects/POS/frontend/node_modules/defu/dist/defu.mjs";
import "/Users/itmzt002/Documents/Projects/POS/frontend/node_modules/ofetch/dist/node.mjs";
import "#internal/nuxt/paths";
import "/Users/itmzt002/Documents/Projects/POS/frontend/node_modules/hookable/dist/index.mjs";
import "/Users/itmzt002/Documents/Projects/POS/frontend/node_modules/unctx/dist/index.mjs";
import "/Users/itmzt002/Documents/Projects/POS/frontend/node_modules/h3/dist/index.mjs";
import "pinia";
import "vue-router";
import "/Users/itmzt002/Documents/Projects/POS/frontend/node_modules/klona/dist/index.mjs";
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "Sidebar",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute();
    const auth = useAuthStore();
    const HomeIcon = defineComponent({
      setup() {
        return () => h("svg", { fill: "none", stroke: "currentColor", viewBox: "0 0 24 24" }, [
          h("path", { "stroke-linecap": "round", "stroke-linejoin": "round", "stroke-width": "1.5", d: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" })
        ]);
      }
    });
    const BoxIcon = defineComponent({
      setup() {
        return () => h("svg", { fill: "none", stroke: "currentColor", viewBox: "0 0 24 24" }, [
          h("path", { "stroke-linecap": "round", "stroke-linejoin": "round", "stroke-width": "1.5", d: "M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" })
        ]);
      }
    });
    const CartIcon = defineComponent({
      setup() {
        return () => h("svg", { fill: "none", stroke: "currentColor", viewBox: "0 0 24 24" }, [
          h("path", { "stroke-linecap": "round", "stroke-linejoin": "round", "stroke-width": "1.5", d: "M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" })
        ]);
      }
    });
    const ChartIcon = defineComponent({
      setup() {
        return () => h("svg", { fill: "none", stroke: "currentColor", viewBox: "0 0 24 24" }, [
          h("path", { "stroke-linecap": "round", "stroke-linejoin": "round", "stroke-width": "1.5", d: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" })
        ]);
      }
    });
    defineComponent({
      setup() {
        return () => h("svg", { fill: "none", stroke: "currentColor", viewBox: "0 0 24 24" }, [
          h("path", { "stroke-linecap": "round", "stroke-linejoin": "round", "stroke-width": "1.5", d: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" })
        ]);
      }
    });
    const sidebarMenus = computed(() => {
      const items = [
        { label: "Home", to: "/", icon: HomeIcon },
        { label: "Produk", to: "/products", icon: BoxIcon },
        { label: "Transaksi", to: "/sales", icon: CartIcon }
      ];
      if (auth.user?.role_id === 1) {
        items.push({ label: "Laporan", to: "/reports", icon: ChartIcon });
      }
      return items;
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "hidden md:flex md:flex-col md:w-60 md:fixed md:inset-y-0 md:bg-white md:border-r md:border-gray-200 md:z-30" }, _attrs))}><div class="px-6 py-5 border-b border-gray-100"><h1 class="text-lg font-bold text-primary-600">Muara POS</h1></div><nav class="flex-1 px-3 py-4 space-y-1 overflow-y-auto"><!--[-->`);
      ssrRenderList(unref(sidebarMenus), (menu) => {
        _push(ssrRenderComponent(_component_NuxtLink, {
          key: menu.to,
          to: menu.to,
          class: ["flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors", unref(route).path === menu.to ? "bg-primary-50 text-primary-700" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"]
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              ssrRenderVNode(_push2, createVNode(resolveDynamicComponent(menu.icon), { class: "w-5 h-5 flex-shrink-0" }, null), _parent2, _scopeId);
              _push2(`<span${_scopeId}>${ssrInterpolate(menu.label)}</span>`);
            } else {
              return [
                (openBlock(), createBlock(resolveDynamicComponent(menu.icon), { class: "w-5 h-5 flex-shrink-0" })),
                createVNode("span", null, toDisplayString(menu.label), 1)
              ];
            }
          }),
          _: 2
        }, _parent));
      });
      _push(`<!--]--></nav>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/profile",
        class: "px-4 py-4 border-t border-gray-100 flex items-center gap-3 hover:bg-gray-50 transition-colors"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center text-primary-600 font-bold text-sm"${_scopeId}>${ssrInterpolate(unref(auth).user?.name?.charAt(0))}</div><div class="flex-1 min-w-0"${_scopeId}><p class="text-sm font-medium text-gray-900 truncate"${_scopeId}>${ssrInterpolate(unref(auth).user?.name)}</p><p class="text-xs text-gray-500"${_scopeId}>${ssrInterpolate(unref(auth).user?.role?.name)}</p></div>`);
          } else {
            return [
              createVNode("div", { class: "w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center text-primary-600 font-bold text-sm" }, toDisplayString(unref(auth).user?.name?.charAt(0)), 1),
              createVNode("div", { class: "flex-1 min-w-0" }, [
                createVNode("p", { class: "text-sm font-medium text-gray-900 truncate" }, toDisplayString(unref(auth).user?.name), 1),
                createVNode("p", { class: "text-xs text-gray-500" }, toDisplayString(unref(auth).user?.role?.name), 1)
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
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Sidebar.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "AppHeader",
  __ssrInlineRender: true,
  setup(__props) {
    const auth = useAuthStore();
    const route = useRoute();
    const { isLoading } = useAppRefresh();
    const titles = {
      "index": "Dashboard",
      "categories": "Kategori",
      "products": "Produk",
      "employees": "Karyawan",
      "sales": "Transaksi",
      "sale-process": "Proses Transaksi",
      "reports": "Laporan",
      "raw-materials": "Bahan Baku",
      "profile": "Profil"
    };
    const title = computed(() => titles[route.name] || "POS App");
    const branchLabel = computed(() => {
      if (auth.selectedBranch) return auth.selectedBranch.name;
      if (auth.isKasir) return null;
      return null;
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<header${ssrRenderAttrs(mergeProps({ class: "bg-white border-b border-gray-100 px-4 py-2.5 flex items-center justify-between sticky top-0 z-30" }, _attrs))}><div class="min-w-0 flex-1"><h1 class="text-sm font-semibold text-gray-900 truncate">${ssrInterpolate(unref(title))}</h1>`);
      if (unref(branchLabel)) {
        _push(`<p class="text-xs text-gray-400 mt-0.5">${ssrInterpolate(unref(branchLabel))}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><button${ssrIncludeBooleanAttr(unref(isLoading)) ? " disabled" : ""} class="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-all active:scale-95 shrink-0"><svg class="${ssrRenderClass(["w-5 h-5 transition-transform", unref(isLoading) ? "animate-spin" : ""])}" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg></button></header>`);
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/AppHeader.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "BottomNav",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute();
    const auth = useAuthStore();
    const HomeIcon = defineComponent({
      setup() {
        return () => h("svg", { fill: "none", stroke: "currentColor", viewBox: "0 0 24 24" }, [
          h("path", { "stroke-linecap": "round", "stroke-linejoin": "round", "stroke-width": "2", d: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" })
        ]);
      }
    });
    const BoxIcon = defineComponent({
      setup() {
        return () => h("svg", { fill: "none", stroke: "currentColor", viewBox: "0 0 24 24" }, [
          h("path", { "stroke-linecap": "round", "stroke-linejoin": "round", "stroke-width": "2", d: "M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" })
        ]);
      }
    });
    const CartIcon = defineComponent({
      setup() {
        return () => h("svg", { fill: "none", stroke: "currentColor", viewBox: "0 0 24 24" }, [
          h("path", { "stroke-linecap": "round", "stroke-linejoin": "round", "stroke-width": "2", d: "M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" })
        ]);
      }
    });
    const ChartIcon = defineComponent({
      setup() {
        return () => h("svg", { fill: "none", stroke: "currentColor", viewBox: "0 0 24 24" }, [
          h("path", { "stroke-linecap": "round", "stroke-linejoin": "round", "stroke-width": "2", d: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" })
        ]);
      }
    });
    const UserIcon = defineComponent({
      setup() {
        return () => h("svg", { fill: "none", stroke: "currentColor", viewBox: "0 0 24 24" }, [
          h("path", { "stroke-linecap": "round", "stroke-linejoin": "round", "stroke-width": "2", d: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" })
        ]);
      }
    });
    const allNavItems = [
      { label: "Home", to: "/", icon: HomeIcon },
      { label: "Produk", to: "/products", icon: BoxIcon },
      { label: "Transaksi", to: "/sales", icon: CartIcon },
      { label: "Laporan", to: "/reports", icon: ChartIcon, ownerOnly: true },
      { label: "Profil", to: "/profile", icon: UserIcon }
    ];
    const navItems = computed(() => {
      if (auth.isKasir) return allNavItems.filter((i) => !i.ownerOnly);
      return allNavItems;
    });
    function isActive(to) {
      return route.path === to;
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<nav${ssrRenderAttrs(mergeProps({ class: "fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-white border-t border-gray-200 z-40 md:hidden" }, _attrs))}><div class="flex items-center justify-around py-2"><!--[-->`);
      ssrRenderList(unref(navItems), (item) => {
        _push(ssrRenderComponent(_component_NuxtLink, {
          key: item.to,
          to: item.to,
          class: ["flex flex-col items-center gap-0.5 px-3 py-1 rounded-lg transition-colors", isActive(item.to) ? "text-primary-600" : "text-gray-400 hover:text-gray-600"]
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              ssrRenderVNode(_push2, createVNode(resolveDynamicComponent(item.icon), { class: "w-6 h-6" }, null), _parent2, _scopeId);
              _push2(`<span class="text-xs font-medium"${_scopeId}>${ssrInterpolate(item.label)}</span>`);
            } else {
              return [
                (openBlock(), createBlock(resolveDynamicComponent(item.icon), { class: "w-6 h-6" })),
                createVNode("span", { class: "text-xs font-medium" }, toDisplayString(item.label), 1)
              ];
            }
          }),
          _: 2
        }, _parent));
      });
      _push(`<!--]--></div></nav>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/BottomNav.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "default",
  __ssrInlineRender: true,
  setup(__props) {
    const auth = useAuthStore();
    watchEffect(() => {
      if (!auth.ready) return;
      if (!auth.isAuthenticated) {
        navigateTo("/login");
        return;
      }
      if (auth.isKasir && !auth.selectedBranch) {
        navigateTo("/select-branch");
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Sidebar = _sfc_main$3;
      const _component_LoadingSpinner = _sfc_main$4;
      const _component_AppHeader = _sfc_main$2;
      const _component_BottomNav = _sfc_main$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-gray-50" }, _attrs))}>`);
      _push(ssrRenderComponent(_component_Sidebar, null, null, _parent));
      _push(`<div class="md:ml-60">`);
      if (!unref(auth).ready) {
        _push(`<div class="min-h-screen bg-gray-50 flex items-center justify-center">`);
        _push(ssrRenderComponent(_component_LoadingSpinner, null, null, _parent));
        _push(`</div>`);
      } else {
        _push(`<div class="mx-auto max-w-md md:max-w-none bg-white min-h-screen shadow-sm md:shadow-none relative pb-20 md:pb-6">`);
        _push(ssrRenderComponent(_component_AppHeader, null, null, _parent));
        _push(`<main class="p-4 md:p-6">`);
        ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
        _push(`</main>`);
        _push(ssrRenderComponent(_component_BottomNav, null, null, _parent));
        _push(`</div>`);
      }
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/default.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=default-CApqhRYt.js.map
