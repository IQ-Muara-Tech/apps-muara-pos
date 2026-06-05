import { defineComponent, useSSRContext } from "vue";
import { ssrRenderTeleport, ssrRenderClass, ssrInterpolate, ssrRenderSlot } from "vue/server-renderer";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "FormModal",
  __ssrInlineRender: true,
  props: {
    show: { type: Boolean },
    title: {}
  },
  emits: ["close"],
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      ssrRenderTeleport(_push, (_push2) => {
        if (__props.show) {
          _push2(`<div class="fixed inset-0 z-50 flex items-end justify-center" data-v-75592b0b><div class="fixed inset-0 bg-black/40 transition-opacity" data-v-75592b0b></div><div class="${ssrRenderClass([__props.show ? "translate-y-0" : "translate-y-full", "relative bg-white w-full max-w-md rounded-t-2xl shadow-xl p-6 pb-8 transition-transform duration-300"])}" data-v-75592b0b><div class="flex items-center justify-between mb-4" data-v-75592b0b><h2 class="text-lg font-semibold text-gray-900" data-v-75592b0b>${ssrInterpolate(__props.title)}</h2><button class="p-1 hover:bg-gray-100 rounded-full" data-v-75592b0b><svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-75592b0b><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" data-v-75592b0b></path></svg></button></div>`);
          ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent);
          _push2(`</div></div>`);
        } else {
          _push2(`<!---->`);
        }
      }, "body", false, _parent);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/FormModal.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __nuxt_component_2 = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-75592b0b"]]);
export {
  __nuxt_component_2 as _
};
//# sourceMappingURL=FormModal-D8pcZ_wp.js.map
