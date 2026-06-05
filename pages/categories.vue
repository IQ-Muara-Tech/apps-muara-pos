<template>
  <div @touchstart="onTouchStart" @touchmove="onTouchMove" @touchend="onTouchEnd">
    <div v-if="pulling || pullDistance > 0" class="flex justify-center py-2 transition-all" :style="{ height: pulling ? '40px' : pullDistance + 'px' }">
      <LoadingSpinner v-if="pulling" />
      <p v-else-if="pullDistance >= threshold" class="text-xs text-gray-400 self-center">Lepas untuk refresh</p>
      <p v-else class="text-xs text-gray-300 self-center">Tarik ke bawah</p>
    </div>
    <div class="flex items-center justify-between mb-4">
      <h2 class="text-lg font-bold text-gray-900">Kategori</h2>
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
      <input v-model="search" type="text" placeholder="Cari kategori..." class="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none bg-white shadow-sm" />
    </div>

    <LoadingSpinner v-if="loading" full />

    <template v-else>
      <EmptyState v-if="filtered.length === 0" />

      <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div v-for="cat in filtered" :key="cat.id"
          @click="openEdit(cat)"
          class="bg-white rounded-xl border border-gray-100 p-4 flex items-center justify-between hover:border-primary-300 hover:shadow-md cursor-pointer transition-all active:scale-[0.98]"
        >
          <div class="flex items-center gap-3">
            <div class="w-9 h-9 bg-primary-50 rounded-lg flex items-center justify-center">
              <svg class="w-4 h-4 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
              </svg>
            </div>
            <div>
              <p class="font-medium text-gray-900 text-sm">{{ cat.name }}</p>
              <span class="text-[11px] text-gray-400">{{ cat.branch?.name || '-' }}</span>
            </div>
          </div>
          <button @click.stop="confirmDelete(cat)" class="p-2 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>
    </template>

    <FormModal :show="modalShow" :title="editing ? 'Edit Kategori' : 'Tambah Kategori'" @close="closeModal">
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
          <label class="block text-sm font-medium text-gray-700 mb-1">Nama Kategori</label>
          <input v-model="form.name" type="text" required placeholder="Nama kategori" class="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none" />
        </div>
        <div class="flex gap-3">
          <button type="button" @click="closeModal" class="flex-1 py-2.5 border border-gray-200 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors">Batal</button>
          <button type="submit" :disabled="saving" class="flex-1 bg-primary-600 text-white py-2.5 rounded-xl text-sm font-medium hover:bg-primary-700 disabled:opacity-50 active:scale-95 transition-all">
            {{ saving ? 'Menyimpan...' : 'Simpan' }}
          </button>
        </div>
      </form>
    </FormModal>

    <FormModal :show="deleteShow" title="Hapus Kategori" @close="deleteShow = false">
      <div class="space-y-4">
        <p class="text-sm text-gray-600">Yakin ingin menghapus <strong>{{ deleting?.name }}</strong>?</p>
        <div class="flex gap-3">
          <button @click="deleteShow = false" class="flex-1 py-2.5 border border-gray-200 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors">Batal</button>
          <button @click="remove" class="flex-1 bg-red-500 text-white py-2.5 rounded-xl text-sm font-medium hover:bg-red-600 active:scale-95 transition-all">Hapus</button>
        </div>
      </div>
    </FormModal>
  </div>
</template>

<script setup lang="ts">
import type { Category } from '~/types'

const categoryStore = useCategoryStore()
const auth = useAuthStore()
const { categories, loading } = storeToRefs(categoryStore)

const search = ref('')
const selectedBranch = ref('')
const modalShow = ref(false)
const deleteShow = ref(false)
const editing = ref<Category | null>(null)
const deleting = ref<Category | null>(null)
const saving = ref(false)
const form = ref({ name: '', branch_id: '' })

const filtered = computed(() =>
  categories.value.filter(c => c.name.toLowerCase().includes(search.value.toLowerCase()))
)

function loadData() {
  const branchId = auth.isKasir ? auth.selectedBranch?.id : (selectedBranch.value ? Number(selectedBranch.value) : undefined)
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
  form.value = { name: '', branch_id: auth.isKasir ? String(auth.selectedBranch?.id || '') : '' }
  modalShow.value = true
}

function openEdit(cat: Category) {
  editing.value = cat
  form.value = { name: cat.name, branch_id: String(cat.branch_id) }
  modalShow.value = true
}

function closeModal() {
  modalShow.value = false
  editing.value = null
}

async function save() {
  saving.value = true
  try {
    const data = { ...form.value, branch_id: Number(form.value.branch_id) }
    if (editing.value) {
      await categoryStore.update(editing.value.id, data)
    } else {
      await categoryStore.create(data)
    }
    closeModal()
  } finally { saving.value = false }
}

function confirmDelete(cat: Category) {
  deleting.value = cat
  deleteShow.value = true
}

async function remove() {
  if (deleting.value) {
    await categoryStore.remove(deleting.value.id)
    deleteShow.value = false
    deleting.value = null
  }
}
</script>
