<template>
  <div @touchstart="onTouchStart" @touchmove="onTouchMove" @touchend="onTouchEnd">
    <div v-if="pulling || pullDistance > 0" class="flex justify-center py-2 transition-all" :style="{ height: pulling ? '40px' : pullDistance + 'px' }">
      <LoadingSpinner v-if="pulling" />
      <p v-else-if="pullDistance >= threshold" class="text-xs text-gray-400 self-center">Lepas untuk refresh</p>
      <p v-else class="text-xs text-gray-300 self-center">Tarik ke bawah</p>
    </div>
    <div class="flex items-center justify-between mb-4">
      <h2 class="text-lg font-bold text-gray-900">Transaksi</h2>
      <button v-if="isToday" @click="openProductPicker" class="bg-primary-600 text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-primary-700 active:scale-95 transition-all">
        + Transaksi Baru
      </button>
    </div>

    <div class="bg-white rounded-xl border border-gray-200 p-4 mb-4 space-y-3">
      <div v-if="!auth.isKasir">
        <label class="block text-xs font-medium text-gray-700 mb-1">Cabang</label>
        <select
          v-model="selectedBranch"
          @change="loadSales"
          class="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none bg-white shadow-sm"
        >
          <option value="">Semua Cabang</option>
          <option v-for="b in auth.user?.branches" :key="b.id" :value="b.id">{{ b.name }}</option>
        </select>
      </div>
      <div v-else-if="auth.selectedBranch" class="flex items-center gap-2 px-3 py-2.5 bg-primary-50 border border-primary-200 rounded-xl">
        <svg class="w-4 h-4 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
        <span class="text-sm font-medium text-primary-700">{{ auth.selectedBranch.name }}</span>
      </div>
      <div>
        <label class="block text-xs font-medium text-gray-700 mb-1">Tanggal</label>
        <input v-model="filterDate" type="date" @change="loadSales" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none" />
      </div>
    </div>

    <div v-if="!loading && sales.length > 0" class="grid grid-cols-3 gap-3 mb-4">
      <div class="bg-green-50 rounded-xl p-3 border border-green-100">
        <p class="text-[10px] text-green-600 font-medium">Cash</p>
        <p class="text-sm font-bold text-green-700 mt-0.5">{{ formatRupiah(totalCash) }}</p>
      </div>
      <div class="bg-purple-50 rounded-xl p-3 border border-purple-100">
        <p class="text-[10px] text-purple-600 font-medium">QRIS</p>
        <p class="text-sm font-bold text-purple-700 mt-0.5">{{ formatRupiah(totalQris) }}</p>
      </div>
      <div class="bg-primary-50 rounded-xl p-3 border border-primary-100">
        <p class="text-[10px] text-primary-600 font-medium">Total</p>
        <p class="text-sm font-bold text-primary-700 mt-0.5">{{ formatRupiah(totalSales) }}</p>
      </div>
    </div>

    <LoadingSpinner v-if="loading" full />

    <template v-else>
      <div v-if="sales.length === 0" class="flex flex-col items-center justify-center py-16">
        <div class="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-4">
          <svg class="w-10 h-10 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 000 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
          </svg>
        </div>
        <p class="text-gray-500 font-medium mb-1 text-sm">Belum ada transaksi pada tanggal ini</p>
        <p class="text-xs text-gray-400">Tekan tombol "+ Transaksi Baru" untuk memulai</p>
      </div>

      <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div class="md:col-span-2 text-xs text-gray-400 mb-2 font-medium">{{ formatTanggal(filterDate) }}</div>

        <div
          v-for="s in sales"
          :key="s.id"
          class="bg-white rounded-xl border border-gray-100 p-4 hover:shadow-md transition-all"
        >
          <div class="flex items-center justify-between mb-2">
            <div>
              <p class="text-sm font-medium text-gray-900">{{ s.kode }}</p>
              <div class="flex items-center gap-2 mt-0.5">
                <span class="text-[11px] text-gray-400">{{ formatJam(s.date_time || s.created_at) }}</span>
                <span v-if="s.branch" class="text-[10px] bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded">{{ s.branch?.name }}</span>
                <span v-if="s.payment_type" class="text-[10px] px-1.5 py-0.5 rounded" :class="s.payment_type.name === 'Cash' ? 'bg-green-50 text-green-600' : 'bg-purple-50 text-purple-600'">{{ s.payment_type.name }}</span>
              </div>
            </div>
            <span
              class="text-[11px] font-medium px-2.5 py-1 rounded-full"
              :class="s.status === 'done' ? 'bg-green-50 text-green-600' : 'bg-amber-50 text-amber-600'"
            >
              {{ s.status === 'done' ? 'Selesai' : 'Diproses' }}
            </span>
          </div>

          <div v-if="s.items?.length" class="mb-3 space-y-1">
            <div v-for="item in s.items" :key="item.id" class="flex items-center justify-between text-sm">
              <span class="text-gray-700 font-medium">{{ item.product?.name }}</span>
              <span class="text-gray-400 text-xs">x{{ item.qty }} · {{ formatRupiah(item.subtotal) }}</span>
            </div>
          </div>

          <div class="flex items-center justify-between pt-2 border-t border-gray-50">
            <div class="flex items-center gap-1.5">
              <button
                v-if="s.status === 'processing'"
                @click="completingSale = s"
                class="text-[11px] font-medium px-2.5 py-1 rounded-full bg-primary-50 text-primary-600 hover:bg-primary-100 active:scale-95 transition-all"
              >
                Selesaikan
              </button>
              <button
                v-if="s.status === 'processing'"
                @click="confirmChangePayment(s)"
                class="text-[11px] font-medium px-2.5 py-1 rounded-full bg-gray-50 text-gray-600 hover:bg-gray-100 active:scale-95 transition-all"
              >
                Ubah Metode
              </button>
              <button
                v-if="s.status === 'processing'"
                @click="confirmDelete(s)"
                class="text-[11px] font-medium px-2.5 py-1 rounded-full bg-red-50 text-red-600 hover:bg-red-100 active:scale-95 transition-all"
              >
                Hapus
              </button>
            </div>
            <p class="text-sm font-bold text-gray-900">{{ formatRupiah(s.total) }}</p>
          </div>
        </div>
      </div>
    </template>

    <ProductPicker v-model="showProductPicker" :branch-id="pickerBranchId" />

    <SaleCart />

    <Teleport to="body">
      <Transition name="fade">
        <div v-if="deletingSale" class="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div class="fixed inset-0 bg-black/40" @click="deletingSale = null" />
          <div class="relative bg-white rounded-2xl shadow-xl w-full max-w-sm p-6 text-center">
            <div class="w-14 h-14 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-7 h-7 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </div>
            <h3 class="text-lg font-semibold text-gray-900 mb-1">Hapus Transaksi?</h3>
            <p class="text-sm text-gray-500 mb-6">Transaksi <strong>{{ deletingSale.kode }}</strong> akan dihapus permanen.</p>
            <div class="flex gap-3">
              <button @click="deletingSale = null" class="flex-1 py-2.5 border border-gray-200 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors">Batal</button>
              <button @click="handleDelete" :disabled="deleting" class="flex-1 bg-red-500 text-white py-2.5 rounded-xl text-sm font-semibold hover:bg-red-600 disabled:opacity-50 transition-colors">
                {{ deleting ? 'Menghapus...' : 'Hapus' }}
              </button>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>

    <Teleport to="body">
      <Transition name="fade">
        <div v-if="completingSale" class="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div class="fixed inset-0 bg-black/40" @click="completingSale = null" />
          <div class="relative bg-white rounded-2xl shadow-xl w-full max-w-sm p-6 text-center">
            <div class="w-14 h-14 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-7 h-7 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 class="text-lg font-semibold text-gray-900 mb-1">Selesaikan Transaksi?</h3>
            <p class="text-sm text-gray-500 mb-6">Transaksi <strong>{{ completingSale.kode }}</strong> akan ditandai selesai.</p>
            <div class="flex gap-3">
              <button @click="completingSale = null" class="flex-1 py-2.5 border border-gray-200 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors">Batal</button>
              <button @click="handleComplete" :disabled="completing" class="flex-1 bg-primary-600 text-white py-2.5 rounded-xl text-sm font-semibold hover:bg-primary-700 disabled:opacity-50 transition-colors">
                {{ completing ? 'Menyelesaikan...' : 'Selesaikan' }}
              </button>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>

    <Teleport to="body">
      <Transition name="fade">
        <div v-if="changingPaymentSale" class="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div class="fixed inset-0 bg-black/40" @click="changingPaymentSale = null" />
          <div class="relative bg-white rounded-2xl shadow-xl w-full max-w-sm p-6">
            <h3 class="text-lg font-semibold text-gray-900 mb-1">Ubah Metode Pembayaran</h3>
            <p class="text-sm text-gray-500 mb-4">Transaksi <strong>{{ changingPaymentSale.kode }}</strong></p>
            <select
              v-model="changePaymentTypeId"
              class="w-full px-3 py-2.5 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none bg-white mb-6"
            >
              <option :value="null" disabled>Pilih metode</option>
              <option v-for="pt in sale.paymentTypes" :key="pt.id" :value="pt.id">{{ pt.name }}</option>
            </select>
            <div class="flex gap-3">
              <button @click="changingPaymentSale = null" class="flex-1 py-2.5 border border-gray-200 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors">Batal</button>
              <button @click="handleChangePayment" :disabled="!changePaymentTypeId || changingPayment" class="flex-1 bg-primary-600 text-white py-2.5 rounded-xl text-sm font-semibold hover:bg-primary-700 disabled:opacity-50 transition-colors">
                {{ changingPayment ? 'Menyimpan...' : 'Simpan' }}
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
import type { Sale } from '~/types'

const sale = useSaleStore()
const auth = useAuthStore()
const { sales, loading } = storeToRefs(sale)

function getToday() {
  const d = new Date()
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

const showProductPicker = ref(false)
const selectedBranch = ref('')
const filterDate = ref(getToday())
const isToday = computed(() => filterDate.value === getToday())
const totalCash = computed(() => sales.value.filter(s => s.payment_type?.name === 'Cash').reduce((sum, s) => sum + Number(s.total), 0))
const totalQris = computed(() => sales.value.filter(s => s.payment_type?.name === 'QRIS').reduce((sum, s) => sum + Number(s.total), 0))
const totalSales = computed(() => sales.value.reduce((sum, s) => sum + Number(s.total), 0))
const pickerBranchId = computed(() => auth.isKasir ? auth.selectedBranch?.id : (selectedBranch.value ? Number(selectedBranch.value) : undefined))
const deletingSale = ref<Sale | null>(null)
const deleting = ref(false)
const completingSale = ref<Sale | null>(null)
const completing = ref(false)
const changingPaymentSale = ref<Sale | null>(null)
const changingPayment = ref(false)
const changePaymentTypeId = ref<number | null>(null)

function formatRupiah(value: number) {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(value)
}

function formatTanggal(date: Date | string) {
  return format(new Date(date), 'EEEE, dd MMMM yyyy', { locale: id })
}

function formatJam(dateStr: string) {
  return format(new Date(dateStr), 'HH:mm', { locale: id })
}

function openProductPicker() {
  showProductPicker.value = true
}

function confirmDelete(s: Sale) {
  deletingSale.value = s
}

function confirmChangePayment(s: Sale) {
  changePaymentTypeId.value = s.payment_type_id || null
  changingPaymentSale.value = s
}

async function handleComplete() {
  if (!completingSale.value) return
  completing.value = true
  try {
    await sale.updateStatus(completingSale.value.id, 'done')
    completingSale.value = null
  } catch (e: any) {
    alert(e.message || 'Gagal menyelesaikan transaksi')
  } finally {
    completing.value = false
  }
}

async function handleDelete() {
  if (!deletingSale.value) return
  deleting.value = true
  try {
    await sale.remove(deletingSale.value.id)
    deletingSale.value = null
  } catch (e: any) {
    alert(e.message || 'Gagal menghapus transaksi')
  } finally {
    deleting.value = false
  }
}

async function handleChangePayment() {
  if (!changingPaymentSale.value || !changePaymentTypeId.value) return
  changingPayment.value = true
  try {
    await sale.updatePaymentType(changingPaymentSale.value.id, changePaymentTypeId.value)
    changingPaymentSale.value = null
    changePaymentTypeId.value = null
  } catch (e: any) {
    alert(e.message || 'Gagal mengubah metode pembayaran')
  } finally {
    changingPayment.value = false
  }
}

async function fetchPaymentTypes() {
  if (sale.paymentTypes.length === 0) {
    await sale.fetchPaymentTypes()
  }
}

function loadSales() {
  const params: Record<string, any> = { date_from: filterDate.value, date_to: filterDate.value }
  const branchId = auth.isKasir ? auth.selectedBranch?.id : (selectedBranch.value ? Number(selectedBranch.value) : undefined)
  if (branchId) params.branch_id = branchId
  sale.fetchAll(params)
}

onMounted(() => {
  const { registerRefresh } = useAppRefresh()
  registerRefresh(loadSales)
  loadSales()
  fetchPaymentTypes()
})

const { pulling, pullDistance, threshold, onTouchStart, onTouchMove, onTouchEnd } = usePullToRefresh(loadSales)
</script>

<style scoped>
.slide-up-enter-active, .slide-up-leave-active {
  transition: transform 0.25s ease;
}
.slide-up-enter-from, .slide-up-leave-to {
  transform: translateY(100%);
}
</style>
