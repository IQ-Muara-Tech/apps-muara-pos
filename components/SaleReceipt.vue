<template>
  <div class="bg-white rounded-xl p-4 border border-gray-200">
    <div class="text-center mb-4">
      <p class="text-xs text-gray-500">Invoice</p>
      <p class="text-sm font-bold text-gray-900">{{ sale?.kode }}</p>
    </div>
    <div class="border-t border-dashed border-gray-300 pt-3 space-y-2">
      <div v-for="item in sale?.items" :key="item.id" class="flex justify-between text-sm">
        <span class="text-gray-600">{{ item.product?.name }} x{{ item.qty }}</span>
        <span class="text-gray-900 font-medium">{{ formatRupiah(item.subtotal) }}</span>
      </div>
    </div>
    <div class="border-t border-dashed border-gray-300 mt-3 pt-3 flex justify-between">
      <span class="font-bold text-gray-900">Total</span>
      <span class="font-bold text-primary-600">{{ formatRupiah(sale?.total || 0) }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Sale } from '~/types'

defineProps<{
  sale: Sale | null
}>()

function formatRupiah(value: number) {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(value)
}
</script>
