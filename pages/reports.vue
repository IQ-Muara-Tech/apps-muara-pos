<template>
  <div @touchstart="onTouchStart" @touchmove="onTouchMove" @touchend="onTouchEnd">
    <div v-if="pulling || pullDistance > 0" class="flex justify-center py-2 transition-all" :style="{ height: pulling ? '40px' : pullDistance + 'px' }">
      <LoadingSpinner v-if="pulling" />
      <p v-else-if="pullDistance >= threshold" class="text-xs text-gray-400 self-center">Lepas untuk refresh</p>
      <p v-else class="text-xs text-gray-300 self-center">Tarik ke bawah</p>
    </div>
    <div class="flex items-center justify-between mb-4">
      <h2 class="text-lg font-bold text-gray-900">Laporan Penjualan</h2>
      <div class="flex items-center gap-2">
        <button @click="openBackdate" class="bg-primary-600 text-white px-3 py-2 rounded-xl text-sm font-medium hover:bg-primary-700 active:scale-95 transition-all flex items-center gap-1.5">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
          <span>Backdate</span>
        </button>
        <button @click="showExportModal = true" class="bg-green-600 text-white px-3 py-2 rounded-xl text-sm font-medium hover:bg-green-700 active:scale-95 transition-all flex items-center gap-1.5">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
          <span>Export</span>
        </button>
      </div>
    </div>

    <div class="bg-white rounded-xl border border-gray-200 p-4 mb-4 space-y-3">
        <div v-if="!auth.isKasir">
          <label class="block text-xs font-medium text-gray-700 mb-1">Cabang</label>
          <select v-model="selectedBranch" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none bg-white">
            <option value="">Semua Cabang</option>
            <option v-for="b in auth.user?.branches" :key="b.id" :value="b.id">{{ b.name }}</option>
          </select>
        </div>
      <div>
        <label class="block text-xs font-medium text-gray-700 mb-1">Metode Pembayaran</label>
        <select v-model="selectedPaymentType" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none bg-white">
          <option value="">Semua Metode</option>
          <option v-for="pt in paymentTypes" :key="pt.id" :value="pt.id">{{ pt.name }}</option>
        </select>
      </div>
      <div>
        <label class="block text-xs font-medium text-gray-700 mb-1">Rentang Tanggal</label>
        <div class="flex gap-2">
          <input v-model="dateFrom" type="date" class="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none" />
          <input v-model="dateTo" type="date" class="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none" />
        </div>
      </div>
      <div class="flex gap-2">
        <div class="flex-1">
          <label class="block text-xs font-medium text-gray-700 mb-1">Bulan</label>
          <select v-model="month" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none bg-white">
            <option value="">Pilih</option>
            <option v-for="(m, i) in months" :key="i" :value="i + 1">{{ m }}</option>
          </select>
        </div>
        <div class="flex-1">
          <label class="block text-xs font-medium text-gray-700 mb-1">Tahun</label>
          <select v-model="year" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none bg-white">
            <option value="">Pilih</option>
            <option v-for="y in years" :key="y" :value="y">{{ y }}</option>
          </select>
        </div>
      </div>
      <button @click="loadReport" :disabled="loading" class="w-full bg-primary-600 text-white py-2.5 rounded-xl text-sm font-medium hover:bg-primary-700 disabled:opacity-50 transition-colors">
        <LoadingSpinner v-if="loading" />
        <span v-else>Tampilkan</span>
      </button>
    </div>

    <div v-if="report" class="grid grid-cols-3 gap-2 mb-4">
      <div class="bg-primary-50 rounded-xl p-3 border border-primary-100">
        <p class="text-xs text-primary-600 font-medium">Total Transaksi</p>
        <p class="text-lg font-bold text-primary-700">{{ report.summary?.total_sales || 0 }}</p>
      </div>
      <div class="bg-green-50 rounded-xl p-3 border border-green-100">
        <p class="text-xs text-green-600 font-medium">Pendapatan</p>
        <p class="text-sm font-bold text-green-700">{{ formatRupiah(report.summary?.total_revenue || 0) }}</p>
      </div>
      <div class="bg-amber-50 rounded-xl p-3 border border-amber-100">
        <p class="text-xs text-amber-600 font-medium">Rata-rata</p>
        <p class="text-sm font-bold text-amber-700">{{ formatRupiah(report.summary?.average_per_sale || 0) }}</p>
      </div>
    </div>

    <div v-if="report?.sales?.length" class="grid grid-cols-1 md:grid-cols-2 gap-3">
      <p class="md:col-span-2 text-sm font-medium text-gray-700">Detail Transaksi</p>
      <div v-for="s in report.sales" :key="s.id" class="bg-white rounded-xl border border-gray-200 p-4">
        <div class="flex items-center justify-between mb-2">
          <div>
            <p class="text-sm font-medium text-gray-900">{{ s.kode }}</p>
            <p class="text-xs text-gray-500">{{ formatDate(s.date_time || s.created_at) }}</p>
            <p v-if="s.payment_type" class="text-[11px] font-medium mt-0.5" :class="s.payment_type.name === 'Cash' ? 'text-green-600' : 'text-purple-600'">{{ s.payment_type.name }}</p>
          </div>
          <div class="text-right">
            <p class="text-sm font-semibold text-gray-900">{{ formatRupiah(s.total) }}</p>
            <span class="text-xs font-medium" :class="s.status === 'done' ? 'text-green-600' : 'text-amber-600'">
              {{ s.status === 'done' ? 'Selesai' : 'Diproses' }}
            </span>
          </div>
        </div>
        <div v-if="s.items?.length" class="mt-2 pt-2 border-t border-gray-100 space-y-1">
          <div v-for="item in s.items" :key="item.id" class="flex items-center justify-between text-sm">
            <span class="text-gray-700 font-medium">{{ item.product?.name }}</span>
            <span class="text-gray-400 text-xs">x{{ item.qty }} · {{ formatRupiah(item.subtotal) }}</span>
          </div>
        </div>
      </div>
    </div>
    <EmptyState v-if="report && !report?.sales?.length" message="Tidak ada data laporan" />

    <ProductPicker v-model="showBackdatePicker" :branch-id="backdateBranchId" />
    <SaleCart :backdate="true" />

    <Teleport to="body">
      <Transition name="fade">
        <div v-if="showExportModal" class="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div class="fixed inset-0 bg-black/40" @click="showExportModal = false" />
          <div class="relative bg-white rounded-2xl shadow-xl w-full max-w-sm p-6">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">Export Laporan</h3>
            <p class="text-xs text-gray-500 mb-4">* Yang bisa di-export hanya transaksi yang statusnya sudah diselesaikan</p>
            <div class="space-y-3">
              <div class="flex gap-2">
                <label class="flex items-center gap-1.5 text-xs font-medium text-gray-700 cursor-pointer">
                  <input type="radio" v-model="exportMode" value="month" class="text-primary-600" />
                  Bulan & Tahun
                </label>
                <label class="flex items-center gap-1.5 text-xs font-medium text-gray-700 cursor-pointer">
                  <input type="radio" v-model="exportMode" value="range" class="text-primary-600" />
                  Range Tanggal
                </label>
              </div>

              <div v-if="exportMode === 'month'" class="flex gap-2">
                <div class="flex-1">
                  <label class="block text-xs font-medium text-gray-700 mb-1">Bulan</label>
                  <select v-model="exportMonth" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none bg-white">
                    <option v-for="(m, i) in months" :key="i" :value="i + 1">{{ m }}</option>
                  </select>
                </div>
                <div class="flex-1">
                  <label class="block text-xs font-medium text-gray-700 mb-1">Tahun</label>
                  <select v-model="exportYear" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none bg-white">
                    <option v-for="y in years" :key="y" :value="y">{{ y }}</option>
                  </select>
                </div>
              </div>

              <div v-if="exportMode === 'range'" class="flex gap-2">
                <div class="flex-1">
                  <label class="block text-xs font-medium text-gray-700 mb-1">Dari Tanggal</label>
                  <input v-model="exportDateFrom" type="date" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none" />
                </div>
                <div class="flex-1">
                  <label class="block text-xs font-medium text-gray-700 mb-1">Sampai</label>
                  <input v-model="exportDateTo" type="date" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none" />
                </div>
              </div>
            </div>
            <div class="flex gap-3 mt-6">
              <button @click="showExportModal = false" class="flex-1 py-2.5 border border-gray-200 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors">Batal</button>
              <button @click="handleExport" :disabled="exporting" class="flex-1 bg-green-600 text-white py-2.5 rounded-xl text-sm font-semibold hover:bg-green-700 disabled:opacity-50 transition-colors">
                {{ exporting ? 'Mendownload...' : 'Download Excel' }}
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

const reportStore = useReportStore()
const sale = useSaleStore()
const auth = useAuthStore()
const { reportData: report } = storeToRefs(reportStore)
const { loading } = storeToRefs(reportStore)

const selectedBranch = ref('')
const selectedPaymentType = ref('')
const dateFrom = ref('')
const dateTo = ref('')
const month = ref('')
const year = ref('')
const paymentTypes = ref<{ id: number; name: string }[]>([])
const months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember']
const years = Array.from({ length: 10 }, (_, i) => new Date().getFullYear() - i)

const showExportModal = ref(false)
const showBackdatePicker = ref(false)
const exportMode = ref('month')
const exportMonth = ref(new Date().getMonth() + 1)
const exportYear = ref(new Date().getFullYear())
const exportDateFrom = ref('')
const exportDateTo = ref('')
const exporting = ref(false)

async function handleExport() {
  exporting.value = true
  try {
    const params = new URLSearchParams()
    if (exportMode.value === 'month') {
      params.append('month', String(exportMonth.value))
      params.append('year', String(exportYear.value))
    } else {
      if (!exportDateFrom.value || !exportDateTo.value) {
        alert('Isi tanggal dari dan sampai')
        return
      }
      params.append('date_from', exportDateFrom.value)
      params.append('date_to', exportDateTo.value)
    }
    if (selectedBranch.value) params.append('branch_id', selectedBranch.value)

    const token = auth.token || ''
    const config = useRuntimeConfig()

    const response = await fetch(`${config.public.apiBase}/reports/sales/export?${params.toString()}`, {
      headers: { Authorization: `Bearer ${token}`, Accept: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' }
    })
    const blob = await response.blob()
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = exportMode.value === 'month'
      ? `Laporan_Penjualan_${months[exportMonth.value - 1]}_${exportYear.value}.xlsx`
      : `Laporan_Penjualan_${exportDateFrom.value}_sd_${exportDateTo.value}.xlsx`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)

    showExportModal.value = false
  } catch (e: any) {
    alert(e.message || 'Gagal export')
  } finally {
    exporting.value = false
  }
}
const backdateBranchId = computed(() => auth.isKasir ? auth.selectedBranch?.id : (selectedBranch.value ? Number(selectedBranch.value) : undefined))

function formatRupiah(value: number) {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(value)
}

function formatDate(dateStr: string) {
  return format(new Date(dateStr), 'dd/MM/yy HH:mm', { locale: id })
}

function openBackdate() {
  showBackdatePicker.value = true
}

async function loadReport() {
  const params: any = {}
  if (selectedBranch.value) params.branch_id = selectedBranch.value
  if (selectedPaymentType.value) params.payment_type_id = selectedPaymentType.value
  if (dateFrom.value) params.date_from = dateFrom.value
  if (dateTo.value) params.date_to = dateTo.value
  if (month.value) params.month = Number(month.value)
  if (year.value) params.year = Number(year.value)
  await reportStore.fetchSales(params)
}

async function fetchPaymentTypes() {
  const { get } = useApi()
  const data: any = await get('/type-payments')
  paymentTypes.value = data.data || data
}

const { pulling, pullDistance, threshold, onTouchStart, onTouchMove, onTouchEnd } = usePullToRefresh(loadReport)

onMounted(() => {
  if (auth.isKasir) {
    navigateTo('/')
    return
  }
  const { registerRefresh } = useAppRefresh()
  registerRefresh(loadReport)
  fetchPaymentTypes()
})

watch(showBackdatePicker, (val) => {
  if (!val && sale.cart.length === 0) {
    loadReport()
  }
})

watch(() => sale.cartOpen, (open) => {
  if (!open && sale.cart.length === 0 && showBackdatePicker.value) {
    showBackdatePicker.value = false
    loadReport()
  }
})
</script>
