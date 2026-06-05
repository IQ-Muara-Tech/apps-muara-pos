<template>
  <div @touchstart="onTouchStart" @touchmove="onTouchMove" @touchend="onTouchEnd">
    <div v-if="pulling || pullDistance > 0" class="flex justify-center py-2 transition-all" :style="{ height: pulling ? '40px' : pullDistance + 'px' }">
      <LoadingSpinner v-if="pulling" />
      <p v-else-if="pullDistance >= threshold" class="text-xs text-gray-400 self-center">Lepas untuk refresh</p>
      <p v-else class="text-xs text-gray-300 self-center">Tarik ke bawah</p>
    </div>
    <div class="flex items-center justify-between mb-4">
      <h2 class="text-lg font-bold text-gray-900">Produk</h2>
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

    <div class="flex gap-2 mb-4">
      <div class="relative flex-1">
        <svg class="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input v-model="search" type="text" placeholder="Cari produk..." class="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none bg-white shadow-sm" />
      </div>
      <select v-model="filterCategory" class="px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none bg-white shadow-sm">
        <option value="">Semua</option>
        <option v-for="cat in categories" :key="cat.id" :value="cat.id">{{ cat.name }}</option>
      </select>
    </div>

    <LoadingSpinner v-if="loading" full />

    <template v-else>
      <EmptyState v-if="filtered.length === 0" />

      <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div
          v-for="prod in filtered"
          :key="prod.id"
          @click="openEdit(prod)"
          class="bg-white rounded-xl border border-gray-100 p-4 hover:border-primary-300 hover:shadow-md cursor-pointer transition-all active:scale-[0.98]"
        >
          <div class="flex items-center justify-between">
            <div class="flex-1 min-w-0">
              <p class="font-medium text-gray-900 text-sm truncate">{{ prod.name }}</p>
              <div class="flex items-center gap-2 mt-1">
                <span class="text-[11px] text-gray-400">{{ prod.category?.name || 'Tanpa kategori' }}</span>
                <span class="text-[10px] bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded">{{ prod.branch?.name }}</span>
              </div>
            </div>
            <p class="text-sm font-semibold text-primary-600 ml-3">{{ formatRupiah(prod.price) }}</p>
          </div>
        </div>
      </div>
    </template>

    <FormModal :show="modalShow" :title="editing ? 'Edit Produk' : 'Tambah Produk'" @close="closeModal">
      <form @submit.prevent="save" class="space-y-4">
        <div v-if="!editing && !auth.isKasir">
          <label class="block text-sm font-medium text-gray-700 mb-1">Cabang</label>
          <select v-model="form.branch_id" required class="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none bg-white">
            <option value="" disabled>Pilih cabang</option>
            <option v-for="b in auth.user?.branches" :key="b.id" :value="b.id">{{ b.name }}</option>
          </select>
        </div>
        <div v-if="editing || auth.isKasir">
          <label class="block text-sm font-medium text-gray-700 mb-1">Cabang</label>
          <p class="text-sm text-gray-600 px-4 py-2.5 bg-gray-50 rounded-xl">{{ auth.isKasir ? auth.selectedBranch?.name : auth.user?.branches?.find(b => b.id == form.branch_id)?.name }}</p>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Nama Produk</label>
          <input v-model="form.name" type="text" required placeholder="Nama produk" class="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none" />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Kategori</label>
          <select v-model="form.category_id" required class="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none bg-white">
            <option value="" disabled>Pilih kategori</option>
            <option v-for="cat in categories" :key="cat.id" :value="cat.id">{{ cat.name }}</option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Harga</label>
          <input v-model="form.price" type="number" required min="0" placeholder="0" class="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none" />
        </div>
        <div class="flex gap-3">
          <button type="button" @click="closeModal" class="flex-1 py-2.5 border border-gray-200 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors">Batal</button>
          <button type="submit" :disabled="saving" class="flex-1 bg-primary-600 text-white py-2.5 rounded-xl text-sm font-medium hover:bg-primary-700 disabled:opacity-50 active:scale-95 transition-all">
            {{ saving ? 'Menyimpan...' : 'Simpan' }}
          </button>
        </div>
      </form>
    </FormModal>

    <FormModal :show="deleteShow" title="Hapus Produk" @close="deleteShow = false">
      <div class="space-y-4">
        <p class="text-sm text-gray-600">Yakin ingin menghapus <strong>{{ deleting?.name }}</strong>?</p>
        <div class="flex gap-3">
          <button @click="deleteShow = false" class="flex-1 py-2.5 border border-gray-200 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50">Batal</button>
          <button @click="remove" class="flex-1 bg-red-500 text-white py-2.5 rounded-xl text-sm font-medium hover:bg-red-600 active:scale-95 transition-all">Hapus</button>
        </div>
      </div>
    </FormModal>
  </div>
</template>

<script setup lang="ts">
import type { Product } from '~/types'

const productStore = useProductStore()
const categoryStore = useCategoryStore()
const auth = useAuthStore()
const { products, loading } = storeToRefs(productStore)
const { categories } = storeToRefs(categoryStore)

const search = ref('')
const selectedBranch = ref('')
const filterCategory = ref('')
const modalShow = ref(false)
const deleteShow = ref(false)
const editing = ref<Product | null>(null)
const deleting = ref<Product | null>(null)
const saving = ref(false)
const form = ref({ name: '', category_id: '', price: 0, branch_id: '' })

const filtered = computed(() => {
  return products.value.filter(p => {
    const matchSearch = p.name.toLowerCase().includes(search.value.toLowerCase())
    const matchCat = !filterCategory.value || p.category_id === Number(filterCategory.value)
    return matchSearch && matchCat
  })
})

function formatRupiah(value: number) {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(value)
}

function loadData() {
  const params: Record<string, any> = {}
  const branchId = auth.isKasir ? auth.selectedBranch?.id : (selectedBranch.value ? Number(selectedBranch.value) : undefined)
  if (branchId) params.branch_id = branchId
  productStore.fetchAll(params)
  categoryStore.fetchAll(branchId)
}

onMounted(() => {
  const { registerRefresh } = useAppRefresh()
  registerRefresh(loadData)
  loadData()
})

const { pulling, pullDistance, threshold, onTouchStart, onTouchMove, onTouchEnd } = usePullToRefresh(loadData)

function openCreate() {
  editing.value = null
  form.value = { name: '', category_id: '', price: 0, branch_id: auth.isKasir ? String(auth.selectedBranch?.id || '') : '' }
  modalShow.value = true
}

function openEdit(prod: Product) {
  editing.value = prod
  form.value = { name: prod.name, category_id: String(prod.category_id), price: prod.price, branch_id: String(prod.branch_id) }
  modalShow.value = true
}

function closeModal() {
  modalShow.value = false
  editing.value = null
}

async function save() {
  saving.value = true
  try {
    const data = { ...form.value, category_id: Number(form.value.category_id), branch_id: Number(form.value.branch_id) }
    if (editing.value) {
      await productStore.update(editing.value.id, data)
    } else {
      await productStore.create(data)
    }
    closeModal()
  } finally { saving.value = false }
}

function confirmDelete(prod: Product) {
  deleting.value = prod
  deleteShow.value = true
}

async function remove() {
  if (deleting.value) {
    await productStore.remove(deleting.value.id)
    deleteShow.value = false
    deleting.value = null
  }
}
</script>
