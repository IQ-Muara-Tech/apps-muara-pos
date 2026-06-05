<template>
  <header class="bg-white border-b border-gray-100 px-4 py-2.5 flex items-center justify-between sticky top-0 z-30">
    <div class="min-w-0 flex-1">
      <h1 class="text-sm font-semibold text-gray-900 truncate">{{ title }}</h1>
      <p v-if="branchLabel" class="text-xs text-gray-400 mt-0.5">{{ branchLabel }}</p>
    </div>
    <button @click="triggerRefresh" :disabled="isLoading" class="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-all active:scale-95 shrink-0">
      <svg :class="['w-5 h-5 transition-transform', isLoading ? 'animate-spin' : '']" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
      </svg>
    </button>
  </header>
</template>

<script setup lang="ts">
const auth = useAuthStore()
const route = useRoute()
const { triggerRefresh, isLoading } = useAppRefresh()

const titles: Record<string, string> = {
  'index': 'Dashboard',
  'categories': 'Kategori',
  'products': 'Produk',
  'employees': 'Karyawan',
  'sales': 'Transaksi',
  'sale-process': 'Proses Transaksi',
  'reports': 'Laporan',
  'raw-materials': 'Bahan Baku',
  'profile': 'Profil'
}

const title = computed(() => titles[route.name as string] || 'POS App')

const branchLabel = computed(() => {
  if (auth.selectedBranch) return auth.selectedBranch.name
  if (auth.isKasir) return null
  return null
})
</script>
