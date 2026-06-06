<template>
  <div @touchstart="onTouchStart" @touchmove="onTouchMove" @touchend="onTouchEnd">
    <div v-if="pulling || pullDistance > 0" class="flex justify-center py-2 transition-all" :style="{ height: pulling ? '40px' : pullDistance + 'px' }">
      <LoadingSpinner v-if="pulling" />
      <p v-else-if="pullDistance >= threshold" class="text-xs text-gray-400 self-center">Lepas untuk refresh</p>
      <p v-else class="text-xs text-gray-300 self-center">Tarik ke bawah</p>
    </div>
    <h2 class="text-lg font-bold text-gray-900 mb-4">Input Stok</h2>

    <div class="bg-white rounded-xl border border-gray-200 p-4 mb-4 space-y-3">
      <div v-if="!auth.isKasir">
        <label class="block text-xs font-medium text-gray-700 mb-1">Cabang</label>
        <select v-model="selectedBranch" @change="loadStocks" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none bg-white">
          <option value="">Pilih Cabang</option>
          <option v-for="b in auth.user?.branches" :key="b.id" :value="b.id">{{ b.name }}</option>
        </select>
      </div>
      <div v-if="!auth.isKasir">
        <label class="block text-xs font-medium text-gray-700 mb-1">Tanggal</label>
        <input v-model="filterDate" type="date" @change="loadStocks" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none" />
      </div>
      <div v-if="auth.isKasir">
        <label class="block text-xs font-medium text-gray-700 mb-1">Tanggal</label>
        <input
          v-model="filterDate"
          type="date"
          @change="loadStocks"
          :readonly="!isToday"
          :class="[
            'w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none',
            isToday ? 'focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white' : 'bg-gray-50 text-gray-500 cursor-not-allowed'
          ]"
        />
      </div>
    </div>

    <LoadingSpinner v-if="loading" />

    <template v-else-if="materials.length === 0">
      <EmptyState message="Belum ada bahan baku untuk cabang ini" />
    </template>

    <template v-else>
      <div v-if="stockItems.length === 0 && !auth.isKasir" class="text-center py-6 text-gray-400 text-sm">
        Belum ada data stok untuk tanggal ini
      </div>

      <div class="space-y-3 mb-4">
        <div class="hidden md:grid md:grid-cols-[1fr_100px_100px_40px] gap-3 px-3 py-2 text-xs font-medium text-gray-500">
          <span>Bahan Baku</span>
          <span class="text-center">Qty</span>
          <span class="text-center">Sisa</span>
          <span></span>
        </div>
        <div v-for="(item, idx) in stockItems" :key="item.id || idx" class="bg-white rounded-xl border border-gray-200 p-3">
          <div>
            <label class="text-[10px] text-gray-400 font-medium mb-1 block">Bahan Baku</label>
            <select v-model="item.raw_material_id" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none bg-white">
              <option :value="null" disabled>Pilih bahan</option>
              <option v-for="m in materials" :key="m.id" :value="m.id" :disabled="isMaterialUsed(m.id, idx)">{{ m.name }} ({{ m.unit }})</option>
            </select>
          </div>
          <div class="flex items-center gap-3 mt-2">
            <div class="flex-1">
              <label class="text-[10px] text-gray-400 font-medium mb-1 block">Qty</label>
              <input v-model.number="item.stock" type="number" step="0.01" min="0" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none" placeholder="Qty" />
            </div>
            <div class="flex-1">
              <label class="text-[10px] text-gray-400 font-medium mb-1 block">Sisa</label>
              <input v-model.number="item.remaining" type="number" step="0.01" min="0" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none" placeholder="Sisa" />
            </div>
            <button @click="removeItem(item, idx)" class="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors flex-shrink-0 mt-5">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>
        </div>
      </div>

      <button v-if="isToday" @click="addItem" class="w-full py-3 border-2 border-dashed border-gray-200 rounded-xl text-sm text-gray-400 hover:border-primary-300 hover:text-primary-500 transition-colors mb-4">
        + Tambah Bahan
      </button>

      <button v-if="isToday" @click="handleSave" :disabled="!canSave || saving" class="w-full bg-primary-600 text-white py-3 rounded-xl font-semibold hover:bg-primary-700 disabled:opacity-50 transition-colors">
        <LoadingSpinner v-if="saving" />
        <span v-else>Simpan</span>
      </button>
    </template>
  </div>
</template>

<script setup lang="ts">
import { format } from 'date-fns'
import { id } from 'date-fns/locale'

interface StockFormItem {
  id: number | null
  raw_material_id: number | null
  stock: number
  remaining: number
}

const store = useRawMaterialStore()
const auth = useAuthStore()
const { loading } = storeToRefs(store)

const selectedBranch = ref('')
const filterDate = ref(new Date().toISOString().slice(0, 10))
const saving = ref(false)
const stockItems = ref<StockFormItem[]>([])

const selectedDate = computed(() => filterDate.value)
const isToday = computed(() => filterDate.value === new Date().toISOString().slice(0, 10))
const effectiveBranch = computed(() => {
  if (auth.isKasir) return String(auth.selectedBranch?.id || '')
  return selectedBranch.value
})

const materials = computed(() => store.materials || [])

const canSave = computed(() => {
  if (!effectiveBranch.value) return false
  if (stockItems.value.length === 0) return false
  return stockItems.value.every(i => i.raw_material_id !== null && i.stock !== null && i.stock >= 0)
})

function formatDate(dateStr: string) {
  return format(new Date(dateStr), 'EEEE, dd MMMM yyyy', { locale: id })
}

function isMaterialUsed(materialId: number, currentIdx: number): boolean {
  return stockItems.value.some((item, idx) => idx !== currentIdx && item.raw_material_id === materialId)
}

function addItem() {
  stockItems.value.push({ id: null, raw_material_id: null, stock: 0, remaining: 0 })
}

async function removeItem(item: StockFormItem, idx: number) {
  if (item.id) {
    if (!confirm('Hapus data stok ini?')) return
    try {
      const { del } = useApi()
      await del(`/raw-material-stocks/${item.id}`)
    } catch (e: any) {
      alert(e.message || 'Gagal menghapus')
      return
    }
  }
  stockItems.value.splice(idx, 1)
}

async function loadStocks() {
  if (!effectiveBranch.value) return
  await store.fetchAll(Number(effectiveBranch.value))
  await store.fetchStocks({
    branch_id: effectiveBranch.value,
    date: selectedDate.value
  })
  prefillStockData()
}

function prefillStockData() {
  stockItems.value = store.stocks.map(s => ({
    id: s.id,
    raw_material_id: s.raw_material_id,
    stock: Number(s.stock),
    remaining: Number(s.remaining)
  }))
}

async function handleSave() {
  if (!canSave.value) return
  saving.value = true
  try {
    await store.saveBulkStock({
      branch_id: Number(effectiveBranch.value),
      date: selectedDate.value,
      items: stockItems.value.map(i => ({
        raw_material_id: i.raw_material_id!,
        stock: i.stock,
        remaining: i.remaining
      }))
    })
    await loadStocks()
  } catch (e: any) {
    alert(e.message || 'Gagal menyimpan')
  } finally {
    saving.value = false
  }
}

const { pulling, pullDistance, threshold, onTouchStart, onTouchMove, onTouchEnd } = usePullToRefresh(loadStocks)

onMounted(() => {
  const { registerRefresh } = useAppRefresh()
  registerRefresh(loadStocks)
  if (auth.isKasir && auth.selectedBranch) {
    selectedBranch.value = String(auth.selectedBranch.id)
    loadStocks()
  }
})
</script>
