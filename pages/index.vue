<template>
  <div @touchstart="onTouchStart" @touchmove="onTouchMove" @touchend="onTouchEnd">
    <div v-if="pulling || pullDistance > 0" class="flex justify-center py-2 transition-all" :style="{ height: pulling ? '40px' : pullDistance + 'px' }">
      <LoadingSpinner v-if="pulling" />
      <p v-else-if="pullDistance >= threshold" class="text-xs text-gray-400 self-center">Lepas untuk refresh</p>
      <p v-else class="text-xs text-gray-300 self-center">Tarik ke bawah</p>
    </div>
    <div class="mb-4">
      <h1 class="text-lg font-bold text-gray-900">Halo, {{ auth.user?.name || 'User' }}</h1>
      <p class="text-sm text-gray-500">{{ auth.user?.role?.name }}</p>
    </div>

    <div class="mb-4">
      <select
        v-if="!auth.isKasir"
        v-model="selectedBranch"
        @change="refreshData"
        class="w-full px-3 py-2.5 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none bg-white"
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

    <div class="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
      <div class="bg-primary-50 rounded-xl p-4 border border-primary-100">
        <p class="text-xs text-primary-600 font-medium">Penjualan Hari Ini</p>
        <p class="text-2xl font-bold text-primary-700 mt-1">{{ summary.today_sales }}</p>
      </div>
      <div class="bg-green-50 rounded-xl p-4 border border-green-100">
        <p class="text-xs text-green-600 font-medium">Pendapatan Hari Ini</p>
        <p class="text-lg font-bold text-green-700 mt-1">{{ formatRupiah(summary.today_revenue) }}</p>
      </div>
      <div class="bg-emerald-50 rounded-xl p-4 border border-emerald-100">
        <p class="text-xs text-emerald-600 font-medium">Pendapatan Cash</p>
        <p class="text-lg font-bold text-emerald-700 mt-1">{{ formatRupiah(summary.today_cash) }}</p>
      </div>
      <div class="bg-purple-50 rounded-xl p-4 border border-purple-100">
        <p class="text-xs text-purple-600 font-medium">Pendapatan QRIS</p>
        <p class="text-lg font-bold text-purple-700 mt-1">{{ formatRupiah(summary.today_qris) }}</p>
      </div>
    </div>

    <div v-if="auth.isKasir && summary.today_revenue >= 400000" class="bg-yellow-50 rounded-xl p-4 border border-yellow-200 mb-6">
      <p class="text-sm font-bold text-yellow-700">Selamat! Kamu mendapatkan bonus Rp10.000 hari ini</p>
    </div>

    <div v-if="monthlyData.length && !auth.isKasir" class="bg-white rounded-xl border border-gray-200 p-4 mb-6">
      <div class="flex items-center justify-between mb-4">
        <h2 class="text-sm font-semibold text-gray-900">Omset Bulanan {{ currentYear }}</h2>
      </div>
      <div v-if="monthlyData.length" class="flex items-end gap-1.5 h-32">
        <div
          v-for="(item, idx) in monthlyData"
          :key="idx"
          class="flex-1 flex flex-col items-center gap-1"
        >
          <div class="w-full relative" style="height: 100px;">
            <div
              class="absolute bottom-0 w-full rounded-t transition-all duration-500"
              :class="item.total_revenue > 0 ? 'bg-primary-400' : 'bg-gray-100'"
              :style="{ height: getBarHeight(item.total_revenue) + '%' }"
            ></div>
          </div>
          <span class="text-[10px] text-gray-500">{{ item.name }}</span>
        </div>
      </div>
      <div v-else class="h-32 flex items-center justify-center text-sm text-gray-400">
        Memuat data...
      </div>
      <div v-if="monthlyData.length" class="mt-3 pt-3 border-t border-gray-100 space-y-1">
        <div class="flex justify-between">
          <span class="text-xs text-gray-500">Total Pendapatan</span>
          <span class="text-sm font-semibold text-primary-600">{{ formatRupiah(yearlyTotal) }}</span>
        </div>
        <div class="flex justify-between">
          <span class="text-xs text-gray-500">Total Pengeluaran</span>
          <span class="text-sm font-semibold text-red-600">{{ formatRupiah(yearlyExpenditure) }}</span>
        </div>
        <div class="flex justify-between">
          <span class="text-xs text-gray-500 pl-3">Cash</span>
          <span class="text-xs font-medium text-red-500">{{ formatRupiah(yearlyExpenditureCash) }}</span>
        </div>
        <div class="flex justify-between">
          <span class="text-xs text-gray-500 pl-3">Cashless</span>
          <span class="text-xs font-medium text-red-500">{{ formatRupiah(yearlyExpenditureCashless) }}</span>
        </div>
        <div class="flex justify-between pt-1 border-t border-dashed border-gray-200">
          <span class="text-xs font-medium text-gray-700">Total Bersih</span>
          <span class="text-sm font-bold text-green-600">{{ formatRupiah(yearlyNet) }}</span>
        </div>
      </div>
    </div>

    <div v-if="monthlyData.length && !auth.isKasir" class="bg-white rounded-xl border border-gray-200 p-4 mb-6">
      <div class="mb-2">
        <h2 class="text-sm font-semibold text-gray-900">Ringkasan Bulan</h2>
      </div>
      <div class="flex gap-2 mb-3">
        <select v-model="ringkasanMonth" class="flex-1 px-3 py-1.5 border border-gray-300 rounded-lg text-xs outline-none bg-white appearance-none">
          <option v-for="(m, i) in months" :key="i" :value="i + 1">{{ m }}</option>
        </select>
      </div>
      <div class="space-y-1.5">
        <div class="flex justify-between">
          <span class="text-xs text-gray-500">Pendapatan</span>
          <span class="text-sm font-semibold text-primary-600">{{ formatRupiah(monthRevenue) }}</span>
        </div>
        <div class="flex justify-between">
          <span class="text-xs text-gray-500">Pengeluaran</span>
          <span class="text-sm font-semibold text-red-600">{{ formatRupiah(monthExpenditure) }}</span>
        </div>
        <div class="flex justify-between">
          <span class="text-xs text-gray-500 pl-3">Cash</span>
          <span class="text-xs font-medium text-red-500">{{ formatRupiah(monthExpenditureCash) }}</span>
        </div>
        <div class="flex justify-between">
          <span class="text-xs text-gray-500 pl-3">Cashless</span>
          <span class="text-xs font-medium text-red-500">{{ formatRupiah(monthExpenditureCashless) }}</span>
        </div>
        <div class="flex justify-between pt-1 border-t border-dashed border-gray-200">
          <span class="text-xs font-medium text-gray-700">Bersih</span>
          <span class="text-sm font-bold text-green-600">{{ formatRupiah(monthNet) }}</span>
        </div>
      </div>
    </div>

    <div v-if="dailyData.length && !auth.isKasir" class="bg-white rounded-xl border border-gray-200 p-4 mb-6">
      <div class="mb-2">
        <h2 class="text-sm font-semibold text-gray-900">Grafik Harian</h2>
      </div>
      <div class="flex gap-2 mb-4">
        <select v-model="dailyMonth" @change="fetchDailyRevenue" class="flex-1 px-3 py-1.5 border border-gray-300 rounded-lg text-xs outline-none bg-white appearance-none">
          <option v-for="(m, i) in months" :key="i" :value="i + 1">{{ m }}</option>
        </select>
        <select v-model="dailyYear" @change="fetchDailyRevenue" class="flex-1 px-3 py-1.5 border border-gray-300 rounded-lg text-xs outline-none bg-white appearance-none">
          <option v-for="y in yearList" :key="y" :value="y">{{ y }}</option>
        </select>
      </div>
      <div class="flex gap-1.5 overflow-x-auto pb-2" style="min-height: 120px;">
        <div v-for="item in dailyData" :key="item.date" class="flex-shrink-0 w-10 flex flex-col items-center gap-1">
          <span v-if="item.total_revenue > 0" class="text-[9px] text-gray-400">{{ formatRupiahShort(item.total_revenue) }}</span>
          <div class="w-full rounded-t" :class="item.total_revenue > 0 ? 'bg-primary-400' : 'bg-gray-100'" :style="{ height: getDailyBarHeight(item.total_revenue) + 'px' }"></div>
          <span class="text-[10px] text-gray-500">{{ item.day }}</span>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-3 md:grid-cols-6 gap-3">
      <NuxtLink
        v-for="menu in menus"
        :key="menu.to"
        :to="menu.to"
        class="bg-white rounded-xl border border-gray-200 p-4 flex flex-col items-center gap-2 hover:border-primary-300 hover:shadow-sm transition-all"
      >
        <div class="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center" :class="menu.bgClass">
          <component :is="menu.icon" class="w-5 h-5" :class="menu.iconClass" />
        </div>
        <span class="text-xs font-medium text-gray-700 text-center">{{ menu.label }}</span>
      </NuxtLink>
    </div>

    <div class="h-4"></div>

    <div v-if="lowStockMaterials.length > 0" class="mb-6">
      <h2 class="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
        <svg class="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01M12 2a10 10 0 100 20 10 10 0 000-20z" />
        </svg>
        Bahan Hampir Habis
      </h2>
      <div class="bg-red-50 rounded-xl border border-red-200 p-3 space-y-2">
        <NuxtLink
          v-for="material in lowStockMaterials"
          :key="material.id"
          to="/raw-material-stocks"
          class="flex items-center justify-between py-1.5 px-2 rounded-lg hover:bg-red-100/50 transition-colors"
        >
          <div>
            <p class="text-sm font-medium text-red-800">{{ material.name }}</p>
            <p class="text-xs text-red-600">Stok: {{ material.stock }} {{ material.unit }} (Min: {{ material.min_stock }})</p>
            <p v-if="material.branch" class="text-[11px] text-red-500 mt-0.5">{{ material.branch.name }}</p>
          </div>
          <svg class="w-4 h-4 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const auth = useAuthStore()

const selectedBranch = ref('')
const summary = reactive({ today_sales: 0, today_revenue: 0, today_cash: 0, today_qris: 0 })

interface LowStockMaterial {
  id: number
  name: string
  stock: number
  unit: string
  min_stock: number
  branch?: { id: number; name: string }
}

interface MonthlyItem {
  month: number
  name: string
  total_sales: number
  total_revenue: number
}

const lowStockMaterials = ref<LowStockMaterial[]>([])
const monthlyData = ref<MonthlyItem[]>([])
const currentYear = new Date().getFullYear()
const yearlyExpenditure = ref(0)
const yearlyExpenditureCash = ref(0)
const yearlyExpenditureCashless = ref(0)
const yearlyNet = ref(0)

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des']
const yearList = Array.from({ length: 10 }, (_, i) => new Date().getFullYear() - i)
const ringkasanMonth = ref(new Date().getMonth() + 1)
const dailyData = ref<any[]>([])
const dailyMonth = ref(new Date().getMonth() + 1)
const dailyYear = ref(new Date().getFullYear())
const dailyMaxRevenue = computed(() => Math.max(...dailyData.value.map((d: any) => d.total_revenue), 1))

const yearlyTotal = computed(() => monthlyData.value.reduce((sum: number, m: any) => sum + (m.total_revenue || 0), 0))

const maxRevenue = computed(() => {
  const max = Math.max(...monthlyData.value.map(m => m.total_revenue), 1)
  return max
})

const monthRevenue = computed(() => {
  const m = monthlyData.value.find((d: any) => d.month === ringkasanMonth.value)
  return m?.total_revenue || 0
})
const monthExpenditure = computed(() => {
  const m = monthlyData.value.find((d: any) => d.month === ringkasanMonth.value)
  return m?.total_expenditure || 0
})
const monthExpenditureCash = computed(() => {
  const m = monthlyData.value.find((d: any) => d.month === ringkasanMonth.value)
  return m?.total_expenditure_cash || 0
})
const monthExpenditureCashless = computed(() => {
  const m = monthlyData.value.find((d: any) => d.month === ringkasanMonth.value)
  return m?.total_expenditure_cashless || 0
})
const monthNet = computed(() => monthRevenue.value - monthExpenditure.value)

function getBarHeight(revenue: number) {
  if (revenue === 0) return 5
  return Math.max(5, (revenue / maxRevenue.value) * 100)
}

function getDailyBarHeight(revenue: number) {
  if (revenue === 0) return 4
  return Math.max(4, (revenue / dailyMaxRevenue.value) * 80)
}

function formatRupiahShort(value: number) {
  if (value >= 1000000) return `${(value / 1000000).toFixed(1)}jt`
  if (value >= 1000) return `${(value / 1000).toFixed(0)}rb`
  return `${value}`
}

const CategoryIcon = defineComponent({
  setup() {
    return () => h('svg', { fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
      h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z' })
    ])
  }
})

const EmployeeIcon = defineComponent({
  setup() {
    return () => h('svg', { fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
      h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z' })
    ])
  }
})

const BoxIcon = defineComponent({
  setup() {
    return () => h('svg', { fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
      h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10' })
    ])
  }
})

const TagIcon = defineComponent({
  setup() {
    return () => h('svg', { fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
      h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z' })
    ])
  }
})

const MoneyIcon = defineComponent({
  setup() {
    return () => h('svg', { fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
      h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z' })
    ])
  }
})

const StockIcon = defineComponent({
  setup() {
    return () => h('svg', { fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
      h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' })
    ])
  }
})

const BuildingIcon = defineComponent({
  setup() {
    return () => h('svg', { fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
      h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4' })
    ])
  }
})

const menus = computed(() => {
  const items = [
    {
      label: 'Kategori',
      to: '/categories',
      bgClass: 'bg-purple-50',
      iconClass: 'text-purple-600',
      icon: CategoryIcon
    },
    {
      label: 'Bahan Baku',
      to: '/raw-materials',
      bgClass: 'bg-orange-50',
      iconClass: 'text-orange-600',
      icon: BoxIcon
    },
    {
      label: 'Input Stok',
      to: '/raw-material-stocks',
      bgClass: 'bg-teal-50',
      iconClass: 'text-teal-600',
      icon: StockIcon
    }
  ]
  if (auth.isSuperAdmin) {
    items.push(
      {
        label: 'Cabang',
        to: '/branches',
        bgClass: 'bg-blue-50',
        iconClass: 'text-blue-600',
        icon: BuildingIcon
      },
      {
        label: 'Karyawan',
        to: '/employees',
        bgClass: 'bg-amber-50',
        iconClass: 'text-amber-600',
        icon: EmployeeIcon
      },
      {
        label: 'Kat. Pengeluaran',
        to: '/expenditure-categories',
        bgClass: 'bg-rose-50',
        iconClass: 'text-rose-600',
        icon: TagIcon
      },
      {
        label: 'Pengeluaran',
        to: '/expenditures',
        bgClass: 'bg-red-50',
        iconClass: 'text-red-600',
        icon: MoneyIcon
      }
    )
  } else if (auth.isOwner) {
    items.push(
      {
        label: 'Kat. Pengeluaran',
        to: '/expenditure-categories',
        bgClass: 'bg-rose-50',
        iconClass: 'text-rose-600',
        icon: TagIcon
      },
      {
        label: 'Pengeluaran',
        to: '/expenditures',
        bgClass: 'bg-red-50',
        iconClass: 'text-red-600',
        icon: MoneyIcon
      }
    )
  }
  return items
})

const effectiveBranch = computed(() => {
  if (auth.isKasir) return auth.selectedBranch?.id || null
  return selectedBranch.value ? Number(selectedBranch.value) : null
})

async function fetchSummary() {
  try {
    const { get } = useApi()
    const params: Record<string, any> = {}
    if (effectiveBranch.value) params.branch_id = effectiveBranch.value
    const data: any = await get('/dashboard/summary', params)
    Object.assign(summary, data)
  } catch {}
}

async function fetchLowStock() {
  try {
    const { get } = useApi()
    const params: Record<string, any> = {}
    if (effectiveBranch.value) params.branch_id = effectiveBranch.value
    const data: any = await get('/dashboard/low-stock', params)
    lowStockMaterials.value = data.data || data
  } catch {}
}

async function fetchMonthlyRevenue() {
  try {
    const { get } = useApi()
    const params: Record<string, any> = { year: currentYear }
    if (effectiveBranch.value) params.branch_id = effectiveBranch.value
    const data: any = await get('/dashboard/monthly-revenue', params)
    monthlyData.value = data.data || []
    yearlyExpenditure.value = data.total_expenditure || 0
    yearlyExpenditureCash.value = data.total_expenditure_cash || 0
    yearlyExpenditureCashless.value = data.total_expenditure_cashless || 0
    yearlyNet.value = data.total_net || 0
  } catch {}
}

async function fetchDailyRevenue() {
  try {
    const { get } = useApi()
    const params: Record<string, any> = { month: dailyMonth.value, year: dailyYear.value }
    if (effectiveBranch.value) params.branch_id = effectiveBranch.value
    const data: any = await get('/dashboard/daily-revenue', params)
    dailyData.value = data.data || data
  } catch {}
}

async function refreshData() {
  const tasks = [fetchSummary(), fetchLowStock(), fetchDailyRevenue()]
  if (!auth.isKasir) tasks.push(fetchMonthlyRevenue())
  await Promise.all(tasks)
}

const { pulling, pullDistance, threshold, onTouchStart, onTouchMove, onTouchEnd } = usePullToRefresh(refreshData)
const { registerRefresh } = useAppRefresh()

onMounted(async () => {
  registerRefresh(refreshData)
  await refreshData()
})

function formatRupiah(value: number) {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(value)
}
</script>
