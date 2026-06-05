<template>
  <div>
    <h2 class="text-lg font-bold text-gray-900 mb-4">Proses Transaksi</h2>

    <div class="space-y-3">
      <div v-for="s in processingSales" :key="s.id" class="bg-white rounded-xl border border-gray-200 p-4">
        <div class="flex items-center justify-between mb-2">
          <div>
            <p class="text-sm font-medium text-gray-900">{{ s.kode }}</p>
            <p class="text-xs text-gray-500">{{ formatDate(s.created_at) }}</p>
          </div>
          <span class="text-xs font-medium px-2.5 py-1 rounded-full bg-amber-100 text-amber-700">
            Diproses
          </span>
        </div>
        <div class="flex items-center justify-between">
          <button
            @click="sale.updateStatus(s.id, 'done')"
            class="bg-green-600 text-white px-4 py-1.5 rounded-lg text-xs font-medium hover:bg-green-700 transition-colors"
          >
            Selesaikan
          </button>
          <p class="text-sm font-bold text-gray-900">{{ formatRupiah(s.total) }}</p>
        </div>
      </div>
    </div>
    <EmptyState v-if="!loading && processingSales.length === 0" message="Tidak ada transaksi yang diproses" />
    <LoadingSpinner v-if="loading" full />
  </div>
</template>

<script setup lang="ts">
import { format } from 'date-fns'
import { id } from 'date-fns/locale'

const sale = useSaleStore()
const auth = useAuthStore()
const { sales, loading } = storeToRefs(sale)

const processingSales = computed(() => sales.value.filter(s => s.status === 'processing'))

function formatRupiah(value: number) {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(value)
}

function formatDate(dateStr: string) {
  return format(new Date(dateStr), 'HH:mm', { locale: id })
}

onMounted(() => {
  const branchId = auth.isKasir ? auth.selectedBranch?.id : auth.user?.branches?.[0]?.id
  sale.fetchAll({ branch_id: branchId, status: 'processing' })
})
</script>
