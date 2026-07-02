<template>
  <div @touchstart="onTouchStart" @touchmove="onTouchMove" @touchend="onTouchEnd">
    <div v-if="pulling || pullDistance > 0" class="flex justify-center py-2 transition-all" :style="{ height: pulling ? '40px' : pullDistance + 'px' }">
      <LoadingSpinner v-if="pulling" />
      <p v-else-if="pullDistance >= threshold" class="text-xs text-gray-400 self-center">Lepas untuk refresh</p>
      <p v-else class="text-xs text-gray-300 self-center">Tarik ke bawah</p>
    </div>
    <div class="flex items-center justify-between mb-4">
      <h2 class="text-lg font-bold text-gray-900">Cabang</h2>
      <button @click="openCreate" class="bg-primary-600 text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-primary-700 active:scale-95 transition-all">+ Tambah</button>
    </div>

    <div class="flex gap-2 mb-4">
      <div class="relative flex-1">
        <svg class="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input v-model="search" type="text" placeholder="Cari cabang..." class="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none bg-white shadow-sm" />
      </div>
      <select v-model="statusFilter" class="px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none bg-white shadow-sm appearance-none">
        <option value="">Semua</option>
        <option value="active">Aktif</option>
        <option value="inactive">Nonaktif</option>
      </select>
    </div>

    <LoadingSpinner v-if="loading" full />

    <template v-else>
      <EmptyState v-if="filtered.length === 0" />

      <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div
          v-for="branch in filtered"
          :key="branch.id"
          class="bg-white rounded-xl border border-gray-100 p-4 hover:border-primary-300 hover:shadow-md transition-all active:scale-[0.98]"
        >
          <div class="flex items-center justify-between">
            <div class="flex-1 min-w-0">
              <p class="font-medium text-gray-900 text-sm">{{ branch.name }}</p>
              <p v-if="branch.address" class="text-xs text-gray-500 mt-0.5 truncate">{{ branch.address }}</p>
              <p v-if="branch.phone" class="text-[11px] text-gray-400 mt-0.5">{{ branch.phone }}</p>
            </div>
            <div class="flex items-center gap-2">
              <span class="text-[10px] px-2 py-0.5 rounded-full" :class="branch.is_active ? 'bg-green-50 text-green-600' : 'bg-gray-100 text-gray-500'">
                {{ branch.is_active ? 'Aktif' : 'Nonaktif' }}
              </span>
              <button @click="openEdit(branch)" class="p-1.5 text-gray-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
              </button>
              <button
                @click="confirmToggle(branch)"
                :class="branch.is_active ? 'text-red-400 hover:text-red-600 hover:bg-red-50' : 'text-green-400 hover:text-green-600 hover:bg-green-50'"
                class="p-1.5 rounded-lg transition-colors"
                :title="branch.is_active ? 'Nonaktifkan' : 'Aktifkan'"
              >
                <svg v-if="branch.is_active" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" /></svg>
                <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </template>

    <FormModal :show="modalShow" :title="editing ? 'Edit Cabang' : 'Tambah Cabang'" @close="closeModal">
      <form @submit.prevent="save" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Nama Cabang</label>
          <input v-model="form.name" type="text" required placeholder="Nama cabang" class="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none" />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Alamat</label>
          <input v-model="form.address" type="text" placeholder="Alamat cabang" class="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none" />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">No. Telepon</label>
          <input v-model="form.phone" type="text" placeholder="081234567890" class="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none" />
        </div>
        <div class="flex gap-3">
          <button type="button" @click="closeModal" class="flex-1 py-2.5 border border-gray-200 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors">Batal</button>
          <button type="submit" :disabled="saving" class="flex-1 bg-primary-600 text-white py-2.5 rounded-xl text-sm font-medium hover:bg-primary-700 disabled:opacity-50 active:scale-95 transition-all">
            {{ saving ? 'Menyimpan...' : 'Simpan' }}
          </button>
        </div>
      </form>
    </FormModal>

    <Teleport to="body">
      <Transition name="fade">
        <div v-if="toggleBranch" class="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div class="fixed inset-0 bg-black/40" @click="toggleBranch = null" />
          <div class="relative bg-white rounded-2xl shadow-xl w-full max-w-sm p-6 text-center">
            <div class="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4" :class="toggleBranch.is_active ? 'bg-red-100' : 'bg-green-100'">
              <svg v-if="toggleBranch.is_active" class="w-7 h-7 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
              </svg>
              <svg v-else class="w-7 h-7 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 class="text-lg font-semibold text-gray-900 mb-1">
              {{ toggleBranch.is_active ? 'Nonaktifkan Cabang?' : 'Aktifkan Cabang?' }}
            </h3>
            <p class="text-sm text-gray-500 mb-6">
              {{ toggleBranch.is_active
                ? `Cabang "${toggleBranch.name}" akan dinonaktifkan dan tidak akan muncul di filter cabang.`
                : `Cabang "${toggleBranch.name}" akan diaktifkan kembali.`
              }}
            </p>
            <div class="flex gap-3">
              <button @click="toggleBranch = null" class="flex-1 py-2.5 border border-gray-200 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors">Batal</button>
              <button
                @click="handleToggle"
                :disabled="toggling"
                class="flex-1 py-2.5 rounded-xl text-sm font-semibold text-white transition-colors disabled:opacity-50"
                :class="toggleBranch.is_active ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'"
              >
                {{ toggling ? 'Menyimpan...' : (toggleBranch.is_active ? 'Nonaktifkan' : 'Aktifkan') }}
              </button>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import type { Branch } from '~/types'

const branchStore = useBranchStore()
const auth = useAuthStore()
const { branches, loading } = storeToRefs(branchStore)

const search = ref('')
const statusFilter = ref('')
const modalShow = ref(false)
const editing = ref<Branch | null>(null)
const saving = ref(false)
const form = ref({ name: '', address: '', phone: '' })
const toggleBranch = ref<Branch | null>(null)
const toggling = ref(false)

const filtered = computed(() => {
  let list = branches.value
  if (statusFilter.value === 'active') list = list.filter(b => b.is_active)
  else if (statusFilter.value === 'inactive') list = list.filter(b => !b.is_active)
  return list.filter(b => b.name.toLowerCase().includes(search.value.toLowerCase()))
})

function loadData() {
  branchStore.fetchAll(true)
}

onMounted(() => {
  if (!auth.isSuperAdmin) {
    navigateTo('/')
    return
  }
  const { registerRefresh } = useAppRefresh()
  registerRefresh(loadData)
  loadData()
})

const { pulling, pullDistance, threshold, onTouchStart, onTouchMove, onTouchEnd } = usePullToRefresh(loadData)

function openCreate() {
  editing.value = null
  form.value = { name: '', address: '', phone: '' }
  modalShow.value = true
}

function openEdit(branch: Branch) {
  editing.value = branch
  form.value = { name: branch.name, address: branch.address || '', phone: branch.phone || '' }
  modalShow.value = true
}

function closeModal() {
  modalShow.value = false
  editing.value = null
}

async function save() {
  saving.value = true
  try {
    const payload = { ...form.value }
    if (editing.value) {
      await branchStore.update(editing.value.id, payload)
    } else {
      await branchStore.create(payload)
    }
    closeModal()
  } catch (e: any) {
    alert(e.message || 'Gagal menyimpan data')
  } finally {
    saving.value = false
  }
}

function confirmToggle(branch: Branch) {
  toggleBranch.value = branch
}

async function handleToggle() {
  if (!toggleBranch.value) return
  toggling.value = true
  try {
    await branchStore.toggleStatus(toggleBranch.value.id)
    toggleBranch.value = null
  } catch (e: any) {
    alert(e.message || 'Gagal mengubah status')
  } finally {
    toggling.value = false
  }
}
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>
