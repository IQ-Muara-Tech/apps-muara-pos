import { defineComponent, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderList } from 'vue/server-renderer';
import { u as useAuthStore } from './server.mjs';
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
  __name: "select-branch",
  __ssrInlineRender: true,
  setup(__props) {
    const auth = useAuthStore();
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b, _c, _d;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-gray-50 flex items-center justify-center p-4" }, _attrs))}><div class="w-full max-w-sm"><div class="text-center mb-8"><div class="w-16 h-16 bg-primary-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg"><svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg></div><h1 class="text-xl font-bold text-gray-900">Pilih Cabang</h1><p class="text-sm text-gray-500 mt-1">Halo, ${ssrInterpolate((_a = unref(auth).user) == null ? void 0 : _a.name)}</p></div><div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 space-y-2"><!--[-->`);
      ssrRenderList((_b = unref(auth).user) == null ? void 0 : _b.branches, (branch) => {
        _push(`<button class="w-full flex items-center gap-3 p-4 rounded-xl border border-gray-200 hover:border-primary-400 hover:bg-primary-50 transition-all active:scale-[0.98]"><div class="w-10 h-10 bg-primary-100 rounded-xl flex items-center justify-center flex-shrink-0"><svg class="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg></div><div class="text-left"><p class="font-medium text-gray-900 text-sm">${ssrInterpolate(branch.name)}</p><p class="text-xs text-gray-400">${ssrInterpolate(branch.address)}</p></div></button>`);
      });
      _push(`<!--]-->`);
      if (!((_d = (_c = unref(auth).user) == null ? void 0 : _c.branches) == null ? void 0 : _d.length)) {
        _push(`<p class="text-sm text-gray-400 text-center py-4">Tidak ada cabang tersedia</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/select-branch.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=select-branch-D1-YSLQN.mjs.map
