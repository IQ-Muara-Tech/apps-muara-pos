import { _ as _sfc_main$1 } from "./EmptyState-wMdsONY9.js";
import { _ as _sfc_main$2 } from "./LoadingSpinner-CNrIgl7t.js";
import { defineComponent, computed, unref, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderList, ssrInterpolate, ssrRenderComponent } from "vue/server-renderer";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { u as useSaleStore } from "./sale-DCRDeWX7.js";
import { u as useAuthStore } from "../server.mjs";
import "/Users/itmzt002/Documents/Projects/POS/frontend/node_modules/hookable/dist/index.mjs";
import "/Users/itmzt002/Documents/Projects/POS/frontend/node_modules/klona/dist/index.mjs";
import "#internal/nuxt/paths";
import "/Users/itmzt002/Documents/Projects/POS/frontend/node_modules/defu/dist/defu.mjs";
import { storeToRefs } from "pinia";
import "/Users/itmzt002/Documents/Projects/POS/frontend/node_modules/ofetch/dist/node.mjs";
import "/Users/itmzt002/Documents/Projects/POS/frontend/node_modules/unctx/dist/index.mjs";
import "/Users/itmzt002/Documents/Projects/POS/frontend/node_modules/h3/dist/index.mjs";
import "vue-router";
import "/Users/itmzt002/Documents/Projects/POS/frontend/node_modules/ufo/dist/index.mjs";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "sale-process",
  __ssrInlineRender: true,
  setup(__props) {
    const sale = useSaleStore();
    useAuthStore();
    const { sales, loading } = storeToRefs(sale);
    const processingSales = computed(() => sales.value.filter((s) => s.status === "processing"));
    function formatRupiah(value) {
      return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(value);
    }
    function formatDate(dateStr) {
      return format(new Date(dateStr), "HH:mm", { locale: id });
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_EmptyState = _sfc_main$1;
      const _component_LoadingSpinner = _sfc_main$2;
      _push(`<div${ssrRenderAttrs(_attrs)}><h2 class="text-lg font-bold text-gray-900 mb-4">Proses Transaksi</h2><div class="space-y-3"><!--[-->`);
      ssrRenderList(unref(processingSales), (s) => {
        _push(`<div class="bg-white rounded-xl border border-gray-200 p-4"><div class="flex items-center justify-between mb-2"><div><p class="text-sm font-medium text-gray-900">${ssrInterpolate(s.kode)}</p><p class="text-xs text-gray-500">${ssrInterpolate(formatDate(s.created_at))}</p></div><span class="text-xs font-medium px-2.5 py-1 rounded-full bg-amber-100 text-amber-700"> Diproses </span></div><div class="flex items-center justify-between"><button class="bg-green-600 text-white px-4 py-1.5 rounded-lg text-xs font-medium hover:bg-green-700 transition-colors"> Selesaikan </button><p class="text-sm font-bold text-gray-900">${ssrInterpolate(formatRupiah(s.total))}</p></div></div>`);
      });
      _push(`<!--]--></div>`);
      if (!unref(loading) && unref(processingSales).length === 0) {
        _push(ssrRenderComponent(_component_EmptyState, { message: "Tidak ada transaksi yang diproses" }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      if (unref(loading)) {
        _push(ssrRenderComponent(_component_LoadingSpinner, { full: "" }, null, _parent));
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/sale-process.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=sale-process-lpc2AvE2.js.map
