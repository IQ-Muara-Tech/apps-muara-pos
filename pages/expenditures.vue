<template>
  <div @touchstart="onTouchStart" @touchmove="onTouchMove" @touchend="onTouchEnd">
    <div v-if="pulling || pullDistance > 0" class="flex justify-center py-2 transition-all" :style="{ height: pulling ? '40px' : pullDistance + 'px' }">
      <LoadingSpinner v-if="pulling" />
      <p v-else-if="pullDistance >= threshold" class="text-xs text-gray-400 self-center">Lepas untuk refresh</p>
      <p v-else class="text-xs text-gray-300 self-center">Tarik ke bawah</p>
    </div>
    <div class="flex items-center justify-between mb-4">
      <h2 class="text-lg font-bold text-gray-900">Pengeluaran</h2>
      <button @click="openForm()" class="bg-primary-600 text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-primary-700 active:scale-95 transition-all">
        + Pengeluaran
      </button>
    </div>

    <div class="bg-white rounded-xl border border-gray-200 p-4 mb-4 space-y-3">
      <div>
        <label class="block text-xs font-medium text-gray-700 mb-1">Cabang</label>
        <select
          v-model="selectedBranch"
          @change="loadExpenditures"
          class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none bg-white"
        >
          <option value="">Pilih Cabang</option>
          <option v-for="b in auth.user?.branches" :key="b.id" :value="b.id">{{ b.name }}</option>
        </select>
      </div>
      <div class="flex gap-2">
        <div class="flex-1">
          <label class="block text-xs font-medium text-gray-700 mb-1">Bulan</label>
          <select v-model="filterMonth" @change="loadExpenditures" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none bg-white">
            <option v-for="(m, i) in months" :key="i" :value="i + 1">{{ m }}</option>
          </select>
        </div>
        <div class="flex-1">
          <label class="block text-xs font-medium text-gray-700 mb-1">Tahun</label>
          <select v-model="filterYear" @change="loadExpenditures" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none bg-white">
            <option v-for="y in years" :key="y" :value="y">{{ y }}</option>
          </select>
        </div>
      </div>
      <div class="flex items-center justify-between pt-2 border-t border-gray-100">
        <span class="text-sm text-gray-600">Total Pengeluaran</span>
        <span class="text-lg font-bold text-red-600">{{ formatRupiah(store.totalAmount) }}</span>
      </div>
    </div>

    <LoadingSpinner v-if="loading" />

    <template v-else>
      <div v-if="store.expenditures.length === 0" class="flex flex-col items-center justify-center py-16">
        <p class="text-gray-500 font-medium text-sm">Belum ada pengeluaran bulan ini</p>
      </div>

      <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div v-for="e in store.expenditures" :key="e.id" class="bg-white rounded-xl border border-gray-200 p-4">
          <div class="flex items-center justify-between mb-1">
            <div>
              <p class="text-sm font-medium text-gray-900">{{ e.description }}</p>
              <p class="text-xs text-gray-500">{{ formatDate(e.date) }}</p>
            </div>
            <p class="text-sm font-bold text-red-600">{{ formatRupiah(e.amount) }}</p>
          </div>
          <div class="flex items-center justify-between">
            <span v-if="e.expenditure_category" class="text-[11px] bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">{{ e.expenditure_category.name }}</span>
            <div class="flex items-center gap-2">
              <button @click="openForm(e)" class="text-[11px] text-primary-600 hover:text-primary-700 px-2 py-0.5">Edit</button>
              <button @click="confirmDelete(e)" class="text-[11px] text-red-500 hover:text-red-700 px-2 py-0.5">Hapus</button>
            </div>
          </div>
        </div>
      </div>
    </template>

    <Teleport to="body">
      <Transition name="fade">
        <div v-if="showForm" class="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div class="fixed inset-0 bg-black/40" @click="showForm = false" />
          <div class="relative bg-white rounded-2xl shadow-xl w-full max-w-sm p-6">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">{{ editing ? 'Edit' : 'Tambah' }} Pengeluaran</h3>
            <div class="space-y-3">
              <div>
                <label class="block text-xs font-medium text-gray-700 mb-1">Kategori</label>
                <select v-model="formCategoryId" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none bg-white">
                  <option :value="null" disabled>Pilih kategori</option>
                  <option v-for="c in store.categories" :key="c.id" :value="c.id">{{ c.name }}</option>
                </select>
              </div>
              <div>
                <label class="block text-xs font-medium text-gray-700 mb-1">Deskripsi</label>
                <input v-model="formDesc" type="text" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none" placeholder="Deskripsi pengeluaran" />
              </div>
              <div>
                <label class="block text-xs font-medium text-gray-700 mb-1">Jumlah</label>
                <input v-model="formAmount" type="number" min="0" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none" placeholder="0" />
              </div>
              <div>
                <label class="block text-xs font-medium text-gray-700 mb-1">Tanggal</label>
                <input v-model="formDate" type="date" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none" />
              </div>
            </div>
            <div class="flex gap-3 mt-6">
              <button @click="showForm = false" class="flex-1 py-2.5 border border-gray-200 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors">Batal</button>
              <button @click="handleSave" :disabled="!formCategoryId || !formDesc || !formAmount || !formDate || saving" class="flex-1 bg-primary-600 text-white py-2.5 rounded-xl text-sm font-semibold hover:bg-primary-700 disabled:opacity-50 transition-colors">
                {{ saving ? 'Menyimpan...' : 'Simpan' }}
              </button>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>

    <Teleport to="body">
      <Transition name="fade">
        <div v-if="deletingExpenditure" class="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div class="fixed inset-0 bg-black/40" @click="deletingExpenditure = null" />
          <div class="relative bg-white rounded-2xl shadow-xl w-full max-w-sm p-6 text-center">
            <div class="w-14 h-14 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-7 h-7 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </div>
            <h3 class="text-lg font-semibold text-gray-900 mb-1">Hapus Pengeluaran?</h3>
            <p class="text-sm text-gray-500 mb-6">Pengeluaran <strong>{{ deletingExpenditure.description }}</strong> akan dihapus.</p>
            <div class="flex gap-3">
              <button @click="deletingExpenditure = null" class="flex-1 py-2.5 border border-gray-200 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors">Batal</button>
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
import { format } from 'date-fns'
import { id } from 'date-fns/locale'
import type { Expenditure } from '~/types'

const store = useExpenditureStore()
const auth = useAuthStore()
const { loading } = storeToRefs(store)

const selectedBranch = ref('')
const months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember']
const years = Array.from({ length: 10 }, (_, i) => new Date().getFullYear() - i)
const filterMonth = ref(new Date().getMonth() + 1)
const filterYear = ref(new Date().getFullYear())

const showForm = ref(false)
const editing = ref<Expenditure | null>(null)
const formCategoryId = ref<number | null>(null)
const formDesc = ref('')
const formAmount = ref('')
const formDate = ref(new Date().toISOString().slice(0, 10))
const saving = ref(false)
const deletingExpenditure = ref<Expenditure | null>(null)
const deleting = ref(false)

function formatRupiah(value: number) {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(value)
}

function formatDate(dateStr: string) {
  return format(new Date(dateStr), 'dd/MM/yy', { locale: id })
}

function openForm(e?: Expenditure) {
  if (e) {
    editing.value = e
    formCategoryId.value = e.expenditure_category_id
    formDesc.value = e.description
    formAmount.value = String(e.amount)
    formDate.value = e.date
  } else {
    editing.value = null
    formCategoryId.value = null
    formDesc.value = ''
    formAmount.value = ''
    formDate.value = new Date().toISOString().slice(0, 10)
  }
  showForm.value = true
}

async function handleSave() {
  if (!formCategoryId.value || !formDesc.value || !formAmount.value || !formDate.value || !selectedBranch.value) return
  saving.value = true
  try {
    const payload: any = {
      expenditure_category_id: formCategoryId.value,
      branch_id: Number(selectedBranch.value),
      description: formDesc.value,
      amount: Number(formAmount.value),
      date: formDate.value,
    }
    if (editing.value) {
      await store.updateExpenditure(editing.value.id, payload)
    } else {
      await store.createExpenditure(payload)
    }
    showForm.value = false
  } catch (e: any) {
    alert(e.message || 'Gagal menyimpan')
  } finally {
    saving.value = false
  }
}

function confirmDelete(e: Expenditure) {
  deletingExpenditure.value = e
}

async function handleDelete() {
  if (!deletingExpenditure.value) return
  deleting.value = true
  try {
    await store.deleteExpenditure(deletingExpenditure.value.id)
    deletingExpenditure.value = null
  } catch (e: any) {
    alert(e.message || 'Gagal menghapus')
  } finally {
    deleting.value = false
  }
}

async function loadExpenditures() {
  if (!selectedBranch.value) return
  store.fetchCategories({ branch_id: selectedBranch.value })
  store.fetchExpenditures({ branch_id: selectedBranch.value, month: filterMonth.value, year: filterYear.value })
}

const { pulling, pullDistance, threshold, onTouchStart, onTouchMove, onTouchEnd } = usePullToRefresh(loadExpenditures)

onMounted(() => {
  if (auth.user?.role_id !== 1) {
    navigateTo('/')
    return
  }
  const { registerRefresh } = useAppRefresh()
  registerRefresh(loadExpenditures)
  if (auth.user?.branches?.[0]) {
    selectedBranch.value = String(auth.user.branches[0].id)
    loadExpenditures()
  }
})
</script>
