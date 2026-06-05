import { defineComponent, ref, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderList, ssrRenderTeleport } from 'vue/server-renderer';
import { u as useAuthStore } from './server.mjs';
import { _ as _export_sfc } from './_plugin-vue_export-helper-1tPrXgE0.mjs';
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
  __name: "profile",
  __ssrInlineRender: true,
  setup(__props) {
    const auth = useAuthStore();
    const showLogoutModal = ref(false);
    const showExitToast = ref(false);
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b, _c, _d, _e, _f, _g, _h, _i;
      _push(`<div${ssrRenderAttrs(_attrs)} data-v-ae7725eb><div class="bg-gradient-to-b from-primary-600 to-primary-700 -mx-4 -mt-4 px-4 pt-6 pb-8 mb-6 rounded-b-3xl" data-v-ae7725eb><div class="flex flex-col items-center" data-v-ae7725eb><div class="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mb-3 ring-4 ring-white/30" data-v-ae7725eb><svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-ae7725eb><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" data-v-ae7725eb></path></svg></div><h2 class="text-lg font-bold text-white" data-v-ae7725eb>${ssrInterpolate(((_a = unref(auth).user) == null ? void 0 : _a.name) || "-")}</h2><p class="text-sm text-primary-200" data-v-ae7725eb>@${ssrInterpolate(((_b = unref(auth).user) == null ? void 0 : _b.username) || "-")}</p><span class="mt-2 px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-medium text-white" data-v-ae7725eb>${ssrInterpolate(((_d = (_c = unref(auth).user) == null ? void 0 : _c.role) == null ? void 0 : _d.name) || "-")}</span></div></div><div class="bg-white rounded-xl border border-gray-200 divide-y divide-gray-100 mb-6" data-v-ae7725eb><div class="flex items-center gap-3 p-4" data-v-ae7725eb><div class="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center flex-shrink-0" data-v-ae7725eb><svg class="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-ae7725eb><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" data-v-ae7725eb></path></svg></div><div class="flex-1" data-v-ae7725eb><p class="text-xs text-gray-500" data-v-ae7725eb>Username</p><p class="text-sm font-medium text-gray-900" data-v-ae7725eb>${ssrInterpolate(((_e = unref(auth).user) == null ? void 0 : _e.username) || "-")}</p></div></div><div class="flex items-center gap-3 p-4" data-v-ae7725eb><div class="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center flex-shrink-0" data-v-ae7725eb><svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-ae7725eb><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" data-v-ae7725eb></path></svg></div><div class="flex-1" data-v-ae7725eb><p class="text-xs text-gray-500" data-v-ae7725eb>Role</p><p class="text-sm font-medium text-gray-900" data-v-ae7725eb>${ssrInterpolate(((_g = (_f = unref(auth).user) == null ? void 0 : _f.role) == null ? void 0 : _g.name) || "-")}</p></div></div><div class="p-4" data-v-ae7725eb><div class="flex items-center gap-3 mb-2" data-v-ae7725eb><div class="w-10 h-10 bg-primary-50 rounded-xl flex items-center justify-center flex-shrink-0" data-v-ae7725eb><svg class="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-ae7725eb><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" data-v-ae7725eb></path></svg></div><div class="flex-1" data-v-ae7725eb><p class="text-xs text-gray-500" data-v-ae7725eb>Cabang</p></div></div>`);
      if (unref(auth).isKasir && unref(auth).selectedBranch) {
        _push(`<div class="flex flex-wrap gap-1.5 ml-13" data-v-ae7725eb><span class="text-xs bg-primary-50 text-primary-700 px-2.5 py-1 rounded-full" data-v-ae7725eb>${ssrInterpolate(unref(auth).selectedBranch.name)}</span></div>`);
      } else if (!unref(auth).isKasir && ((_i = (_h = unref(auth).user) == null ? void 0 : _h.branches) == null ? void 0 : _i.length)) {
        _push(`<div class="flex flex-wrap gap-1.5 ml-13" data-v-ae7725eb><!--[-->`);
        ssrRenderList(unref(auth).user.branches, (b) => {
          _push(`<span class="text-xs bg-primary-50 text-primary-700 px-2.5 py-1 rounded-full" data-v-ae7725eb>${ssrInterpolate(b.name)}</span>`);
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<p class="text-sm text-gray-400 ml-13" data-v-ae7725eb>-</p>`);
      }
      _push(`</div></div><button class="w-full flex items-center justify-center gap-2 bg-red-50 text-red-600 py-3 rounded-xl text-sm font-semibold hover:bg-red-100 border border-red-200 transition-colors" data-v-ae7725eb><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-ae7725eb><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" data-v-ae7725eb></path></svg> Keluar </button><button class="w-full flex items-center justify-center gap-2 bg-gray-50 text-gray-600 py-3 rounded-xl text-sm font-semibold hover:bg-gray-100 border border-gray-200 transition-colors mt-3" data-v-ae7725eb><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-ae7725eb><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" data-v-ae7725eb></path></svg> Keluar Aplikasi </button>`);
      if (unref(showExitToast)) {
        _push(`<div class="fixed bottom-24 left-4 right-4 z-50 max-w-md mx-auto" data-v-ae7725eb><div class="bg-gray-900 text-white text-sm text-center py-3 px-4 rounded-xl shadow-lg" data-v-ae7725eb> Tekan Back sekali lagi untuk keluar aplikasi </div></div>`);
      } else {
        _push(`<!---->`);
      }
      ssrRenderTeleport(_push, (_push2) => {
        if (unref(showLogoutModal)) {
          _push2(`<div class="fixed inset-0 z-50 flex items-center justify-center p-4" data-v-ae7725eb><div class="fixed inset-0 bg-black/40" data-v-ae7725eb></div><div class="relative bg-white rounded-2xl shadow-xl w-full max-w-sm p-6 text-center" data-v-ae7725eb><div class="w-14 h-14 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4" data-v-ae7725eb><svg class="w-7 h-7 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-ae7725eb><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" data-v-ae7725eb></path></svg></div><h3 class="text-lg font-semibold text-gray-900 mb-1" data-v-ae7725eb>Keluar dari akun?</h3><p class="text-sm text-gray-500 mb-6" data-v-ae7725eb>Kamu akan dikembalikan ke halaman login.</p><div class="flex gap-3" data-v-ae7725eb><button class="flex-1 py-2.5 border border-gray-200 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors" data-v-ae7725eb> Batal </button><button class="flex-1 bg-red-500 text-white py-2.5 rounded-xl text-sm font-semibold hover:bg-red-600 transition-colors" data-v-ae7725eb> Keluar </button></div></div></div>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/profile.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const profile = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-ae7725eb"]]);

export { profile as default };
//# sourceMappingURL=profile-BtXlXmPS.mjs.map
