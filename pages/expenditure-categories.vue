<template>
  <div @touchstart="onTouchStart" @touchmove="onTouchMove" @touchend="onTouchEnd">
    <div v-if="pulling || pullDistance > 0" class="flex justify-center py-2 transition-all" :style="{ height: pulling ? '40px' : pullDistance + 'px' }">
      <LoadingSpinner v-if="pulling" />
      <p v-else-if="pullDistance >= threshold" class="text-xs text-gray-400 self-center">Lepas untuk refresh</p>
      <p v-else class="text-xs text-gray-300 self-center">Tarik ke bawah</p>
    </div>
    <div class="flex items-center justify-between mb-4">
      <h2 class="text-lg font-bold text-gray-900">Kategori Pengeluaran</h2>
      <button @click="openForm()" class="bg-primary-600 text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-primary-700 active:scale-95 transition-all">
        + Kategori
      </button>
    </div>

    <div class="mb-4">
      <select
        v-model="selectedBranch"
        @change="loadCategories"
        class="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none bg-white shadow-sm"
      >
        <option value="">Pilih Cabang</option>
        <option v-for="b in auth.user?.branches" :key="b.id" :value="b.id">{{ b.name }}</option>
      </select>
    </div>

    <LoadingSpinner v-if="loading" />

    <template v-else>
      <div v-if="store.categories.length === 0" class="flex flex-col items-center justify-center py-16">
        <p class="text-gray-500 font-medium text-sm">Belum ada kategori pengeluaran</p>
      </div>

      <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div v-for="c in store.categories" :key="c.id" class="bg-white rounded-xl border border-gray-200 p-4 flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-900">{{ c.name }}</p>
            <p v-if="c.description" class="text-xs text-gray-500 mt-0.5">{{ c.description }}</p>
            <p v-if="c.branch" class="text-[10px] text-gray-400 mt-1">{{ c.branch.name }}</p>
          </div>
          <div class="flex items-center gap-2">
            <button @click="openForm(c)" class="text-xs text-primary-600 hover:text-primary-700 px-2 py-1">Edit</button>
            <button @click="confirmDelete(c)" class="text-xs text-red-500 hover:text-red-700 px-2 py-1">Hapus</button>
          </div>
        </div>
      </div>
    </template>

    <Teleport to="body">
      <Transition name="fade">
        <div v-if="showForm" class="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div class="fixed inset-0 bg-black/40" @click="showForm = false" />
          <div class="relative bg-white rounded-2xl shadow-xl w-full max-w-sm p-6">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">{{ editing ? 'Edit' : 'Tambah' }} Kategori</h3>
            <div class="space-y-3">
              <div>
                <label class="block text-xs font-medium text-gray-700 mb-1">Nama</label>
                <input v-model="formName" type="text" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none" placeholder="Nama kategori" />
              </div>
              <div>
                <label class="block text-xs font-medium text-gray-700 mb-1">Deskripsi</label>
                <input v-model="formDesc" type="text" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none" placeholder="Deskripsi (opsional)" />
              </div>
              <div>
                <label class="block text-xs font-medium text-gray-700 mb-1">Key <span class="text-gray-400 font-normal">(opsional)</span></label>
                <select v-model="formKey" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none bg-white">
                  <option value="">Tanpa Key</option>
                  <option value="employee_bonuses">Bonus Karyawan</option>
                </select>
              </div>
            </div>
            <div class="flex gap-3 mt-6">
              <button @click="showForm = false" class="flex-1 py-2.5 border border-gray-200 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors">Batal</button>
              <button @click="handleSave" :disabled="!formName || saving" class="flex-1 bg-primary-600 text-white py-2.5 rounded-xl text-sm font-semibold hover:bg-primary-700 disabled:opacity-50 transition-colors">
                {{ saving ? 'Menyimpan...' : 'Simpan' }}
              </button>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>

    <Teleport to="body">
      <Transition name="fade">
        <div v-if="deletingCategory" class="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div class="fixed inset-0 bg-black/40" @click="deletingCategory = null" />
          <div class="relative bg-white rounded-2xl shadow-xl w-full max-w-sm p-6 text-center">
            <div class="w-14 h-14 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-7 h-7 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </div>
            <h3 class="text-lg font-semibold text-gray-900 mb-1">Hapus Kategori?</h3>
            <p class="text-sm text-gray-500 mb-6">Kategori <strong>{{ deletingCategory.name }}</strong> akan dihapus.</p>
            <div class="flex gap-3">
              <button @click="deletingCategory = null" class="flex-1 py-2.5 border border-gray-200 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors">Batal</button>
              <button @click="handleDelete" :disabled="deleting" class="flex-1 bg-red-500 text-white py-2.5 rounded-xl text-sm font-semibold hover:bg-red-600 disabled:opacity-50 transition-colors">
                {{ deleting ? 'Menghapus...' : 'Hapus' }}
              </button>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import type { ExpenditureCategory } from '~/types'

const store = useExpenditureStore()
const auth = useAuthStore()
const { loading } = storeToRefs(store)

const selectedBranch = ref('')
const showForm = ref(false)
const editing = ref<ExpenditureCategory | null>(null)
const formName = ref('')
const formDesc = ref('')
const formKey = ref('')
const saving = ref(false)
const deletingCategory = ref<ExpenditureCategory | null>(null)
const deleting = ref(false)

function openForm(c?: ExpenditureCategory) {
  if (c) {
    editing.value = c
    formName.value = c.name
    formDesc.value = c.description || ''
    formKey.value = c.key || ''
  } else {
    editing.value = null
    formName.value = ''
    formDesc.value = ''
    formKey.value = ''
  }
  showForm.value = true
}

async function handleSave() {
  if (!formName.value || !selectedBranch.value) return
  saving.value = true
  try {
    const payload: any = { name: formName.value, description: formDesc.value || undefined }
    if (formKey.value) payload.key = formKey.value
    if (editing.value) {
      await store.updateCategory(editing.value.id, payload)
    } else {
      await store.createCategory({ branch_id: Number(selectedBranch.value), ...payload })
    }
    showForm.value = false
  } catch (e: any) {
    alert(e.message || 'Gagal menyimpan')
  } finally {
    saving.value = false
  }
}

function confirmDelete(c: ExpenditureCategory) {
  deletingCategory.value = c
}

async function handleDelete() {
  if (!deletingCategory.value) return
  deleting.value = true
  try {
    await store.deleteCategory(deletingCategory.value.id)
    deletingCategory.value = null
  } catch (e: any) {
    alert(e.message || 'Gagal menghapus')
  } finally {
    deleting.value = false
  }
}

function loadCategories() {
  if (!selectedBranch.value) return
  store.fetchCategories({ branch_id: selectedBranch.value })
}

const { pulling, pullDistance, threshold, onTouchStart, onTouchMove, onTouchEnd } = usePullToRefresh(loadCategories)

onMounted(() => {
  if (auth.user?.role_id !== 1) {
    navigateTo('/')
    return
  }
  const { registerRefresh } = useAppRefresh()
  registerRefresh(loadCategories)
  if (auth.user?.branches?.[0]) {
    selectedBranch.value = String(auth.user.branches[0].id)
    loadCategories()
  }
})
</script>
