import { _ as _sfc_main$1 } from "./LoadingSpinner-CNrIgl7t.js";
import { _ as _sfc_main$2 } from "./EmptyState-wMdsONY9.js";
import { _ as __nuxt_component_2 } from "./FormModal-D8pcZ_wp.js";
import { defineComponent, ref, computed, unref, withCtx, createVNode, withModifiers, withDirectives, vModelText, openBlock, createBlock, Fragment, renderList, toDisplayString, vModelSelect, vModelCheckbox, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderStyle, ssrRenderComponent, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderList, ssrRenderAttr, ssrInterpolate } from "vue/server-renderer";
import { defineStore, storeToRefs } from "pinia";
import { a as useApi, u as useAuthStore } from "../server.mjs";
import "/Users/itmzt002/Documents/Projects/POS/frontend/node_modules/hookable/dist/index.mjs";
import "/Users/itmzt002/Documents/Projects/POS/frontend/node_modules/klona/dist/index.mjs";
import "#internal/nuxt/paths";
import "/Users/itmzt002/Documents/Projects/POS/frontend/node_modules/defu/dist/defu.mjs";
import "./useAppRefresh-BZYaFRjH.js";
import { u as usePullToRefresh } from "./usePullToRefresh-Djnb12W0.js";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
import "/Users/itmzt002/Documents/Projects/POS/frontend/node_modules/ofetch/dist/node.mjs";
import "/Users/itmzt002/Documents/Projects/POS/frontend/node_modules/unctx/dist/index.mjs";
import "/Users/itmzt002/Documents/Projects/POS/frontend/node_modules/h3/dist/index.mjs";
import "vue-router";
import "/Users/itmzt002/Documents/Projects/POS/frontend/node_modules/ufo/dist/index.mjs";
const useEmployeeStore = defineStore("employee", {
  state: () => ({
    employees: [],
    loading: false
  }),
  actions: {
    async fetchAll(branchId) {
      this.loading = true;
      try {
        const { get } = useApi();
        const params = {};
        if (branchId) params.branch_id = branchId;
        const data = await get("/employees", params);
        this.employees = data.data || data;
      } finally {
        this.loading = false;
      }
    },
    async create(payload) {
      const { post } = useApi();
      const data = await post("/employees", payload);
      this.employees.unshift(data.data || data);
    },
    async update(id, payload) {
      const { put } = useApi();
      const data = await put(`/employees/${id}`, payload);
      const idx = this.employees.findIndex((e) => e.id === id);
      if (idx !== -1) this.employees[idx] = data.data || data;
    },
    async remove(id) {
      const { del } = useApi();
      await del(`/employees/${id}`);
      this.employees = this.employees.filter((e) => e.id !== id);
    }
  }
});
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "employees",
  __ssrInlineRender: true,
  setup(__props) {
    const employeeStore = useEmployeeStore();
    const auth = useAuthStore();
    const { employees, loading } = storeToRefs(employeeStore);
    const search = ref("");
    const selectedBranch = ref("");
    const modalShow = ref(false);
    const editing = ref(null);
    const saving = ref(false);
    const branches = ref([]);
    const roles = ref([]);
    const form = ref({
      name: "",
      phone: "",
      position: "",
      role_id: "",
      username: "",
      password: "",
      branch_ids: []
    });
    const filtered = computed(
      () => employees.value.filter((e) => e.name.toLowerCase().includes(search.value.toLowerCase()))
    );
    function loadData() {
      const branchId = auth.isKasir ? auth.selectedBranch?.id : selectedBranch.value ? Number(selectedBranch.value) : void 0;
      employeeStore.fetchAll(branchId);
    }
    const { pulling, pullDistance, threshold } = usePullToRefresh(loadData);
    function closeModal() {
      modalShow.value = false;
      editing.value = null;
    }
    async function save() {
      saving.value = true;
      try {
        const payload = { ...form.value, role_id: Number(form.value.role_id) };
        if (editing.value) {
          if (!payload.password) delete payload.password;
          await employeeStore.update(editing.value.id, payload);
        } else {
          await employeeStore.create(payload);
        }
        closeModal();
      } catch (e) {
        alert(e.message || "Gagal menyimpan data");
      } finally {
        saving.value = false;
      }
    }
    return (_ctx, _push, _parent, _attrs) => {
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
      _push(`<div class="flex items-center justify-between mb-4"><h2 class="text-lg font-bold text-gray-900">Karyawan</h2><button class="bg-primary-600 text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-primary-700 active:scale-95 transition-all">+ Tambah</button></div><div class="mb-4">`);
      if (!unref(auth).isKasir) {
        _push(`<select class="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none bg-white shadow-sm"><option value=""${ssrIncludeBooleanAttr(Array.isArray(unref(selectedBranch)) ? ssrLooseContain(unref(selectedBranch), "") : ssrLooseEqual(unref(selectedBranch), "")) ? " selected" : ""}>Semua Cabang</option><!--[-->`);
        ssrRenderList(unref(branches), (b) => {
          _push(`<option${ssrRenderAttr("value", b.id)}${ssrIncludeBooleanAttr(Array.isArray(unref(selectedBranch)) ? ssrLooseContain(unref(selectedBranch), b.id) : ssrLooseEqual(unref(selectedBranch), b.id)) ? " selected" : ""}>${ssrInterpolate(b.name)}</option>`);
        });
        _push(`<!--]--></select>`);
      } else if (unref(auth).selectedBranch) {
        _push(`<div class="flex items-center gap-2 px-3 py-2.5 bg-primary-50 border border-primary-200 rounded-xl"><svg class="w-4 h-4 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg><span class="text-sm font-medium text-primary-700">${ssrInterpolate(unref(auth).selectedBranch.name)}</span></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="relative mb-4"><svg class="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg><input${ssrRenderAttr("value", unref(search))} type="text" placeholder="Cari karyawan..." class="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none bg-white shadow-sm"></div>`);
      if (unref(loading)) {
        _push(ssrRenderComponent(_component_LoadingSpinner, { full: "" }, null, _parent));
      } else {
        _push(`<!--[-->`);
        if (unref(filtered).length === 0) {
          _push(ssrRenderComponent(_component_EmptyState, null, null, _parent));
        } else {
          _push(`<div class="grid grid-cols-1 md:grid-cols-2 gap-3"><!--[-->`);
          ssrRenderList(unref(filtered), (emp) => {
            _push(`<div class="bg-white rounded-xl border border-gray-100 p-4 hover:border-primary-300 hover:shadow-md cursor-pointer transition-all active:scale-[0.98]"><div class="flex items-center gap-3"><div class="w-10 h-10 bg-amber-50 rounded-full flex items-center justify-center flex-shrink-0"><svg class="w-5 h-5 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg></div><div class="flex-1 min-w-0"><p class="font-medium text-gray-900 text-sm">${ssrInterpolate(emp.name)}</p><p class="text-[11px] text-gray-400">${ssrInterpolate(emp.user?.role?.name || emp.position)} · @${ssrInterpolate(emp.user?.username)}</p>`);
            if (emp.branches?.length) {
              _push(`<div class="flex flex-wrap gap-1 mt-1.5"><!--[-->`);
              ssrRenderList(emp.branches, (b) => {
                _push(`<span class="text-[10px] bg-primary-50 text-primary-600 px-2 py-0.5 rounded-full">${ssrInterpolate(b.name)}</span>`);
              });
              _push(`<!--]--></div>`);
            } else {
              _push(`<!---->`);
            }
            _push(`</div><p class="text-xs text-gray-400">${ssrInterpolate(emp.phone)}</p></div></div>`);
          });
          _push(`<!--]--></div>`);
        }
        _push(`<!--]-->`);
      }
      _push(ssrRenderComponent(_component_FormModal, {
        show: unref(modalShow),
        title: unref(editing) ? "Edit Karyawan" : "Tambah Karyawan",
        onClose: closeModal
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<form class="space-y-4"${_scopeId}><div${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1"${_scopeId}>Nama</label><input${ssrRenderAttr("value", unref(form).name)} type="text" required placeholder="Nama karyawan" class="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"${_scopeId}></div><div${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1"${_scopeId}>No. Telepon</label><input${ssrRenderAttr("value", unref(form).phone)} type="text" placeholder="081234567890" class="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"${_scopeId}></div><div${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1"${_scopeId}>Jabatan</label><input${ssrRenderAttr("value", unref(form).position)} type="text" placeholder="Contoh: Manager, Supervisor" class="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"${_scopeId}></div><div${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1"${_scopeId}>Role</label><select required class="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none bg-white"${_scopeId}><option value="" disabled${ssrIncludeBooleanAttr(Array.isArray(unref(form).role_id) ? ssrLooseContain(unref(form).role_id, "") : ssrLooseEqual(unref(form).role_id, "")) ? " selected" : ""}${_scopeId}>Pilih role</option><!--[-->`);
            ssrRenderList(unref(roles), (role) => {
              _push2(`<option${ssrRenderAttr("value", role.id)}${ssrIncludeBooleanAttr(Array.isArray(unref(form).role_id) ? ssrLooseContain(unref(form).role_id, role.id) : ssrLooseEqual(unref(form).role_id, role.id)) ? " selected" : ""}${_scopeId}>${ssrInterpolate(role.name)}</option>`);
            });
            _push2(`<!--]--></select></div><div${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1"${_scopeId}>Username</label><input${ssrRenderAttr("value", unref(form).username)} type="text" required placeholder="username" class="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"${_scopeId}></div><div${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1"${_scopeId}>Password ${ssrInterpolate(unref(editing) ? "(kosongkan jika tidak diubah)" : "")}</label><input${ssrRenderAttr("value", unref(form).password)} type="password"${ssrIncludeBooleanAttr(!unref(editing)) ? " required" : ""} placeholder="password" class="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"${_scopeId}></div><div${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-2"${_scopeId}>Cabang</label><div class="space-y-2 max-h-32 overflow-y-auto bg-gray-50 rounded-xl p-3"${_scopeId}><!--[-->`);
            ssrRenderList(unref(branches), (branch) => {
              _push2(`<label class="flex items-center gap-2 cursor-pointer"${_scopeId}><input type="checkbox"${ssrRenderAttr("value", branch.id)}${ssrIncludeBooleanAttr(Array.isArray(unref(form).branch_ids) ? ssrLooseContain(unref(form).branch_ids, branch.id) : unref(form).branch_ids) ? " checked" : ""} class="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"${_scopeId}><span class="text-sm text-gray-700"${_scopeId}>${ssrInterpolate(branch.name)}</span></label>`);
            });
            _push2(`<!--]--></div></div><div class="flex gap-3"${_scopeId}><button type="button" class="flex-1 py-2.5 border border-gray-200 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors"${_scopeId}>Batal</button><button type="submit"${ssrIncludeBooleanAttr(unref(saving)) ? " disabled" : ""} class="flex-1 bg-primary-600 text-white py-2.5 rounded-xl text-sm font-medium hover:bg-primary-700 disabled:opacity-50 active:scale-95 transition-all"${_scopeId}>${ssrInterpolate(unref(saving) ? "Menyimpan..." : "Simpan")}</button></div></form>`);
          } else {
            return [
              createVNode("form", {
                onSubmit: withModifiers(save, ["prevent"]),
                class: "space-y-4"
              }, [
                createVNode("div", null, [
                  createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, "Nama"),
                  withDirectives(createVNode("input", {
                    "onUpdate:modelValue": ($event) => unref(form).name = $event,
                    type: "text",
                    required: "",
                    placeholder: "Nama karyawan",
                    class: "w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                  }, null, 8, ["onUpdate:modelValue"]), [
                    [vModelText, unref(form).name]
                  ])
                ]),
                createVNode("div", null, [
                  createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, "No. Telepon"),
                  withDirectives(createVNode("input", {
                    "onUpdate:modelValue": ($event) => unref(form).phone = $event,
                    type: "text",
                    placeholder: "081234567890",
                    class: "w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                  }, null, 8, ["onUpdate:modelValue"]), [
                    [vModelText, unref(form).phone]
                  ])
                ]),
                createVNode("div", null, [
                  createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, "Jabatan"),
                  withDirectives(createVNode("input", {
                    "onUpdate:modelValue": ($event) => unref(form).position = $event,
                    type: "text",
                    placeholder: "Contoh: Manager, Supervisor",
                    class: "w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                  }, null, 8, ["onUpdate:modelValue"]), [
                    [vModelText, unref(form).position]
                  ])
                ]),
                createVNode("div", null, [
                  createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, "Role"),
                  withDirectives(createVNode("select", {
                    "onUpdate:modelValue": ($event) => unref(form).role_id = $event,
                    required: "",
                    class: "w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none bg-white"
                  }, [
                    createVNode("option", {
                      value: "",
                      disabled: ""
                    }, "Pilih role"),
                    (openBlock(true), createBlock(Fragment, null, renderList(unref(roles), (role) => {
                      return openBlock(), createBlock("option", {
                        key: role.id,
                        value: role.id
                      }, toDisplayString(role.name), 9, ["value"]);
                    }), 128))
                  ], 8, ["onUpdate:modelValue"]), [
                    [vModelSelect, unref(form).role_id]
                  ])
                ]),
                createVNode("div", null, [
                  createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, "Username"),
                  withDirectives(createVNode("input", {
                    "onUpdate:modelValue": ($event) => unref(form).username = $event,
                    type: "text",
                    required: "",
                    placeholder: "username",
                    class: "w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                  }, null, 8, ["onUpdate:modelValue"]), [
                    [vModelText, unref(form).username]
                  ])
                ]),
                createVNode("div", null, [
                  createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, "Password " + toDisplayString(unref(editing) ? "(kosongkan jika tidak diubah)" : ""), 1),
                  withDirectives(createVNode("input", {
                    "onUpdate:modelValue": ($event) => unref(form).password = $event,
                    type: "password",
                    required: !unref(editing),
                    placeholder: "password",
                    class: "w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                  }, null, 8, ["onUpdate:modelValue", "required"]), [
                    [vModelText, unref(form).password]
                  ])
                ]),
                createVNode("div", null, [
                  createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-2" }, "Cabang"),
                  createVNode("div", { class: "space-y-2 max-h-32 overflow-y-auto bg-gray-50 rounded-xl p-3" }, [
                    (openBlock(true), createBlock(Fragment, null, renderList(unref(branches), (branch) => {
                      return openBlock(), createBlock("label", {
                        key: branch.id,
                        class: "flex items-center gap-2 cursor-pointer"
                      }, [
                        withDirectives(createVNode("input", {
                          type: "checkbox",
                          value: branch.id,
                          "onUpdate:modelValue": ($event) => unref(form).branch_ids = $event,
                          class: "w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                        }, null, 8, ["value", "onUpdate:modelValue"]), [
                          [vModelCheckbox, unref(form).branch_ids]
                        ]),
                        createVNode("span", { class: "text-sm text-gray-700" }, toDisplayString(branch.name), 1)
                      ]);
                    }), 128))
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
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/employees.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=employees-DVKIA9k0.js.map
