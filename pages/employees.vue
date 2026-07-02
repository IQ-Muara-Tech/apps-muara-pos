<template>
  <div @touchstart="onTouchStart" @touchmove="onTouchMove" @touchend="onTouchEnd">
    <div v-if="pulling || pullDistance > 0" class="flex justify-center py-2 transition-all" :style="{ height: pulling ? '40px' : pullDistance + 'px' }">
      <LoadingSpinner v-if="pulling" />
      <p v-else-if="pullDistance >= threshold" class="text-xs text-gray-400 self-center">Lepas untuk refresh</p>
      <p v-else class="text-xs text-gray-300 self-center">Tarik ke bawah</p>
    </div>
    <div class="flex items-center justify-between mb-4">
      <h2 class="text-lg font-bold text-gray-900">Karyawan</h2>
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
        <option v-for="b in branches" :key="b.id" :value="b.id">{{ b.name }}</option>
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
      <input v-model="search" type="text" placeholder="Cari karyawan..." class="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none bg-white shadow-sm" />
    </div>

    <LoadingSpinner v-if="loading" full />

    <template v-else>
      <EmptyState v-if="filtered.length === 0" />

      <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div
          v-for="emp in filtered"
          :key="emp.id"
          @click="openEdit(emp)"
          class="bg-white rounded-xl border border-gray-100 p-4 hover:border-primary-300 hover:shadow-md cursor-pointer transition-all active:scale-[0.98]"
        >
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 bg-amber-50 rounded-full flex items-center justify-center flex-shrink-0">
              <svg class="w-5 h-5 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <div class="flex-1 min-w-0">
              <p class="font-medium text-gray-900 text-sm">{{ emp.name }}</p>
              <p class="text-[11px] text-gray-400">{{ emp.user?.role?.name || emp.position }} · @{{ emp.user?.username }}</p>
              <div v-if="emp.branches?.length" class="flex flex-wrap gap-1 mt-1.5">
                <span v-for="b in emp.branches" :key="b.id" class="text-[10px] bg-primary-50 text-primary-600 px-2 py-0.5 rounded-full">{{ b.name }}</span>
              </div>
            </div>
            <p class="text-xs text-gray-400">{{ emp.phone }}</p>
          </div>
        </div>
      </div>
    </template>

    <FormModal :show="modalShow" :title="editing ? 'Edit Karyawan' : 'Tambah Karyawan'" @close="closeModal">
      <form @submit.prevent="save" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Nama</label>
          <input v-model="form.name" type="text" required placeholder="Nama karyawan" class="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none" />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">No. Telepon</label>
          <input v-model="form.phone" type="text" placeholder="081234567890" class="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none" />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Jabatan</label>
          <input v-model="form.position" type="text" placeholder="Contoh: Manager, Supervisor" class="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none" />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Role</label>
          <select v-model="form.role_id" required class="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none bg-white">
            <option value="" disabled>Pilih role</option>
            <option v-for="role in roles" :key="role.id" :value="role.id">{{ role.name }}</option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Username</label>
          <input v-model="form.username" type="text" required placeholder="username" class="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none" />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Password {{ editing ? '(kosongkan jika tidak diubah)' : '' }}</label>
          <input v-model="form.password" type="password" :required="!editing" placeholder="password" class="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none" />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Cabang</label>
          <div class="space-y-2 max-h-32 overflow-y-auto bg-gray-50 rounded-xl p-3">
            <label v-for="branch in branches" :key="branch.id" class="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" :value="branch.id" v-model="form.branch_ids" class="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500" />
              <span class="text-sm text-gray-700">{{ branch.name }}</span>
            </label>
          </div>
        </div>
        <div class="flex gap-3">
          <button type="button" @click="closeModal" class="flex-1 py-2.5 border border-gray-200 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors">Batal</button>
          <button type="submit" :disabled="saving" class="flex-1 bg-primary-600 text-white py-2.5 rounded-xl text-sm font-medium hover:bg-primary-700 disabled:opacity-50 active:scale-95 transition-all">
            {{ saving ? 'Menyimpan...' : 'Simpan' }}
          </button>
        </div>
      </form>
    </FormModal>
  </div>
</template>

<script setup lang="ts">
import type { Employee, Branch } from '~/types'

const employeeStore = useEmployeeStore()
const auth = useAuthStore()
const { employees, loading } = storeToRefs(employeeStore)

const search = ref('')
const selectedBranch = ref('')
const modalShow = ref(false)
const editing = ref<Employee | null>(null)
const saving = ref(false)
const branches = ref<Branch[]>([])
const roles = ref<{ id: number; name: string }[]>([])
const form = ref({
  name: '', phone: '', position: '', role_id: '', username: '', password: '', branch_ids: [] as number[]
})

const filtered = computed(() =>
  employees.value.filter(e => e.name.toLowerCase().includes(search.value.toLowerCase()))
)

async function loadBranches() {
  const { get } = useApi()
  const data: any = await get('/branches')
  branches.value = data.data || data
}

async function loadRoles() {
  const { get } = useApi()
  const data: any = await get('/roles')
  roles.value = data.data || data
}

function loadData() {
  const branchId = auth.isKasir ? auth.selectedBranch?.id : (selectedBranch.value ? Number(selectedBranch.value) : undefined)
  employeeStore.fetchAll(branchId)
}

onMounted(async () => {
  if (!auth.isSuperAdmin) {
    navigateTo('/')
    return
  }
  const { registerRefresh } = useAppRefresh()
  registerRefresh(loadData)
  const promises = [employeeStore.fetchAll(), loadRoles(), loadBranches()]
  await Promise.all(promises)
})

const { pulling, pullDistance, threshold, onTouchStart, onTouchMove, onTouchEnd } = usePullToRefresh(loadData)

function openCreate() {
  editing.value = null
  form.value = { name: '', phone: '', position: '', role_id: '', username: '', password: '', branch_ids: [] }
  modalShow.value = true
}

function openEdit(emp: Employee) {
  editing.value = emp
  form.value = {
    name: emp.name, phone: emp.phone || '', position: emp.position || '',
    role_id: String(emp.user?.role_id || ''), username: emp.user?.username || '',
    password: '', branch_ids: emp.branches?.map(b => b.id) || []
  }
  modalShow.value = true
}

function closeModal() {
  modalShow.value = false
  editing.value = null
}

async function save() {
  saving.value = true
  try {
    const payload: any = { ...form.value, role_id: Number(form.value.role_id) }
    if (editing.value) {
      if (!payload.password) delete payload.password
      await employeeStore.update(editing.value.id, payload)
    } else {
      await employeeStore.create(payload)
    }
    closeModal()
  } catch (e: any) {
    alert(e.message || 'Gagal menyimpan data')
  } finally { saving.value = false }
}
</script>
