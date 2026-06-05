import { _ as _sfc_main$1 } from "./LoadingSpinner-CNrIgl7t.js";
import { defineComponent, ref, mergeProps, unref, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderAttr, ssrInterpolate, ssrIncludeBooleanAttr, ssrRenderComponent } from "vue/server-renderer";
import { publicAssetsURL } from "#internal/nuxt/paths";
import "/Users/itmzt002/Documents/Projects/POS/frontend/node_modules/hookable/dist/index.mjs";
import { u as useAuthStore } from "../server.mjs";
import "/Users/itmzt002/Documents/Projects/POS/frontend/node_modules/ofetch/dist/node.mjs";
import "/Users/itmzt002/Documents/Projects/POS/frontend/node_modules/unctx/dist/index.mjs";
import "/Users/itmzt002/Documents/Projects/POS/frontend/node_modules/h3/dist/index.mjs";
import "pinia";
import "/Users/itmzt002/Documents/Projects/POS/frontend/node_modules/defu/dist/defu.mjs";
import "vue-router";
import "/Users/itmzt002/Documents/Projects/POS/frontend/node_modules/ufo/dist/index.mjs";
import "/Users/itmzt002/Documents/Projects/POS/frontend/node_modules/klona/dist/index.mjs";
const _imports_0 = publicAssetsURL("/logo/logo-muara-pos.png");
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "login",
  __ssrInlineRender: true,
  setup(__props) {
    useAuthStore();
    const username = ref("");
    const password = ref("");
    const loading = ref(false);
    const error = ref("");
    return (_ctx, _push, _parent, _attrs) => {
      const _component_LoadingSpinner = _sfc_main$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-gray-50 flex items-center justify-center p-4" }, _attrs))}><div class="w-full max-w-sm"><div class="text-center mb-8"><img${ssrRenderAttr("src", _imports_0)} alt="Muara POS" class="w-20 h-20 mx-auto mb-4 object-contain rounded-full"><h1 class="text-2xl font-bold text-gray-900">Muara POS</h1><p class="text-sm text-gray-500 mt-1">Point of Sale System</p></div><div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6"><form class="space-y-4">`);
      if (unref(error)) {
        _push(`<div class="bg-red-50 text-red-600 text-sm p-3 rounded-xl border border-red-200">${ssrInterpolate(unref(error))}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div><label class="block text-sm font-medium text-gray-700 mb-1">Username</label><input${ssrRenderAttr("value", unref(username))} type="text" required placeholder="username" class="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"></div><div><label class="block text-sm font-medium text-gray-700 mb-1">Password</label><input${ssrRenderAttr("value", unref(password))} type="password" required placeholder="password" class="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"></div><button type="submit"${ssrIncludeBooleanAttr(unref(loading)) ? " disabled" : ""} class="w-full bg-primary-600 text-white py-2.5 rounded-xl font-semibold hover:bg-primary-700 disabled:opacity-50 transition-colors">`);
      if (unref(loading)) {
        _push(ssrRenderComponent(_component_LoadingSpinner, null, null, _parent));
      } else {
        _push(`<span>Masuk</span>`);
      }
      _push(`</button></form></div></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/login.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=login-Dfhn3_oT.js.map
