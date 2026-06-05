<template>
  <div @touchstart="onTouchStart" @touchmove="onTouchMove" @touchend="onTouchEnd">
    <div v-if="pulling || pullDistance > 0" class="flex justify-center py-2 transition-all" :style="{ height: pulling ? '40px' : pullDistance + 'px' }">
      <LoadingSpinner v-if="pulling" />
      <p v-else-if="pullDistance >= threshold" class="text-xs text-gray-400 self-center">Lepas untuk refresh</p>
      <p v-else class="text-xs text-gray-300 self-center">Tarik ke bawah</p>
    </div>
    <div class="flex items-center justify-between mb-4">
      <h1 class="text-lg font-bold text-gray-900">Bahan Baku</h1>
      <button @click="openCreate" class="bg-primary-600 text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-primary-700 active:scale-95 transition-all">+ Tambah</button>
    </div>

    <div class="mb-4">
      <select
        v-if="!auth.isKasir"
        v-model="selectedBranch"
        @change="loadData"
        class="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none bg-white shadow-sm"
      >
        <option value="">Semua Cabang</option>
        <option v-for="b in auth.user?.branches" :key="b.id" :value="b.id">{{ b.name }}</option>
      </select>
      <div v-else-if="auth.selectedBranch" class="flex items-center gap-2 px-3 py-2.5 bg-primary-50 border border-primary-200 rounded-xl">
        <svg class="w-4 h-4 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
        <span class="text-sm font-medium text-primary-700">{{ auth.selectedBranch.name }}</span>
      </div>
    </div>

    <div class="relative mb-4">
      <svg class="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
      <input v-model="search" type="text" placeholder="Cari bahan..." class="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none bg-white shadow-sm" />
    </div>

    <LoadingSpinner v-if="loading" />

    <template v-else>
      <EmptyState v-if="filteredMaterials.length === 0" />

      <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div
          v-for="material in filteredMaterials"
          :key="material.id"
          @click="openEdit(material)"
          class="bg-white rounded-xl border border-gray-100 p-4 hover:border-primary-300 hover:shadow-md transition-all cursor-pointer active:scale-[0.98]"
        >
          <div class="flex items-center justify-between">
            <div>
              <h3 class="font-medium text-gray-900 text-sm">{{ material.name }}</h3>
              <div class="flex items-center gap-2 mt-1">
                <span class="text-[11px] text-gray-400">{{ material.unit }}</span>
                <span class="text-[11px] text-gray-400">Min: {{ material.min_stock }}</span>
                <span v-if="material.branch" class="text-[10px] bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded">{{ material.branch.name }}</span>
              </div>
            </div>
            <svg class="w-4 h-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>
    </template>

    <Teleport to="body">
      <Transition name="fade">
        <div v-if="showModal" class="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div class="fixed inset-0 bg-black/40" @click="closeModal" />
          <div class="relative bg-white rounded-2xl shadow-xl w-full max-w-sm p-6">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">{{ isEditing ? 'Edit' : 'Tambah' }} Bahan</h3>
            <div class="space-y-3">
              <div v-if="!isEditing && !auth.isKasir">
                <label class="block text-xs font-medium text-gray-700 mb-1">Cabang</label>
                <select v-model="form.branch_id" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none bg-white">
                  <option value="" disabled>Pilih cabang</option>
                  <option v-for="b in auth.user?.branches" :key="b.id" :value="b.id">{{ b.name }}</option>
                </select>
              </div>
              <div v-else>
                <label class="block text-xs font-medium text-gray-700 mb-1">Cabang</label>
                <p class="text-sm text-gray-600 px-3 py-2 bg-gray-50 rounded-lg">{{ auth.isKasir ? auth.selectedBranch?.name : auth.user?.branches?.find(b => b.id == form.branch_id)?.name }}</p>
              </div>
              <div>
                <label class="block text-xs font-medium text-gray-700 mb-1">Nama</label>
                <input v-model="form.name" type="text" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none" placeholder="Nama bahan" />
              </div>
              <div class="grid grid-cols-2 gap-3">
                <div>
                  <label class="block text-xs font-medium text-gray-700 mb-1">Satuan</label>
                  <select v-model="form.unit" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none bg-white">
                    <option value="kg">Kg</option>
                    <option value="ltr">Liter</option>
                    <option value="pcs">Pcs</option>
                    <option value="gram">Gram</option>
                    <option value="galon">Galon</option>
                    <option value="ikat">Ikat</option>
                    <option value="pack">Pack</option>
                  </select>
                </div>
                <div>
                  <label class="block text-xs font-medium text-gray-700 mb-1">Min. Stok</label>
                  <input v-model.number="form.min_stock" type="number" min="0" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none" />
                </div>
              </div>
            </div>
            <div class="flex gap-3 mt-6">
              <button @click="closeModal" class="flex-1 py-2.5 border border-gray-200 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors">Batal</button>
              <button @click="handleSubmit" :disabled="!form.name || saving" class="flex-1 bg-primary-600 text-white py-2.5 rounded-xl text-sm font-semibold hover:bg-primary-700 disabled:opacity-50 transition-colors">
                {{ saving ? 'Menyimpan...' : (isEditing ? 'Simpan' : 'Tambah') }}
              </button>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import type { RawMaterial } from '~/types'

const rawMaterialStore = useRawMaterialStore()
const auth = useAuthStore()

const loading = ref(true)
const saving = ref(false)
const search = ref('')
const selectedBranch = ref('')
const showModal = ref(false)
const isEditing = ref(false)
const editingId = ref<number | null>(null)

const form = reactive({ name: '', unit: 'kg', min_stock: 0, branch_id: '' })

const filteredMaterials = computed(() => {
  if (!search.value) return rawMaterialStore.materials
  const q = search.value.toLowerCase()
  return rawMaterialStore.materials.filter(m => m.name.toLowerCase().includes(q))
})

function loadData() {
  const branchId = auth.isKasir ? auth.selectedBranch?.id : (selectedBranch.value ? Number(selectedBranch.value) : undefined)
  rawMaterialStore.fetchAll(branchId)
}

const { pulling, pullDistance, threshold, onTouchStart, onTouchMove, onTouchEnd } = usePullToRefresh(loadData)

function openCreate() {
  isEditing.value = false
  editingId.value = null
  form.name = ''
  form.unit = 'kg'
  form.min_stock = 0
  form.branch_id = auth.isKasir ? String(auth.selectedBranch?.id || '') : ''
  showModal.value = true
}

function openEdit(material: RawMaterial) {
  isEditing.value = true
  editingId.value = material.id
  form.name = material.name
  form.unit = material.unit
  form.min_stock = material.min_stock
  form.branch_id = String(material.branch_id)
  showModal.value = true
}

function closeModal() { showModal.value = false }

async function handleSubmit() {
  if (!form.name) return
  saving.value = true
  try {
    if (isEditing.value && editingId.value) {
      await rawMaterialStore.update(editingId.value, { ...form, branch_id: Number(form.branch_id) })
    } else {
      await rawMaterialStore.create({ ...form, branch_id: Number(form.branch_id) })
    }
    closeModal()
  } catch (e: any) {
    alert(e.message || 'Gagal menyimpan')
  } finally { saving.value = false }
}

onMounted(async () => {
  const { registerRefresh } = useAppRefresh()
  registerRefresh(loadData)
  const branchId = auth.isKasir ? auth.selectedBranch?.id : undefined
  await rawMaterialStore.fetchAll(branchId)
  loading.value = false
})
</script>
