<template>
  <Teleport to="body">
    <Transition name="slide-up">
      <div v-if="modelValue" class="fixed inset-0 z-40 flex flex-col md:items-center md:justify-center">
        <div class="fixed inset-0 bg-black/40" @click="emit('update:modelValue', false)" />
        <div class="relative bg-white w-full h-full md:max-w-2xl md:max-h-[90vh] md:rounded-2xl md:shadow-xl flex flex-col">
          <div class="flex items-center justify-between px-4 py-3 border-b border-gray-200">
            <button @click="emit('update:modelValue', false)" class="p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-all">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <h3 class="font-semibold text-gray-900 text-sm">Pilih Produk</h3>
            <button @click="sale.openCart()" class="relative bg-primary-600 text-white px-3 py-1.5 rounded-lg text-xs font-medium active:scale-95 transition-all">
              Keranjang
              <span v-if="sale.cartCount" class="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-[10px] rounded-full w-5 h-5 flex items-center justify-center font-bold">{{ sale.cartCount }}</span>
            </button>
          </div>
          <div class="px-4 py-3">
            <div class="relative">
              <svg class="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input v-model="search" type="text" placeholder="Cari produk..." class="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none bg-white shadow-sm" />
            </div>
          </div>
          <div class="flex-1 overflow-y-auto px-4 pb-4">
            <div v-if="filteredProducts.length === 0" class="flex flex-col items-center justify-center py-12">
              <p class="text-sm text-gray-400">Produk tidak ditemukan</p>
            </div>
            <div v-else class="grid grid-cols-2 gap-2">
              <button
                v-for="prod in filteredProducts"
                :key="prod.id"
                @click="addToCart(prod)"
                class="bg-white border border-gray-200 rounded-xl p-3 text-left hover:border-primary-400 hover:shadow-md active:scale-95 transition-all"
              >
                <p class="text-sm font-medium text-gray-900 truncate">{{ prod.name }}</p>
                <p class="text-xs text-primary-600 font-semibold mt-1">{{ formatRupiah(prod.price) }}</p>
              </button>
            </div>
          </div>
          <div v-if="sale.cartCount" class="border-t border-gray-200 px-4 py-3">
            <button
              @click="sale.openCart()"
              class="w-full bg-primary-600 text-white py-3 rounded-xl font-semibold hover:bg-primary-700 active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              <span>Lihat Keranjang</span>
              <span class="bg-white/20 px-2 py-0.5 rounded-full text-xs">{{ sale.cartCount }} item</span>
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import type { Product } from '~/types'

const props = defineProps<{ modelValue: boolean; branchId?: number }>()
const emit = defineEmits<{ 'update:modelValue': [value: boolean] }>()

const sale = useSaleStore()
const productStore = useProductStore()
const { products } = storeToRefs(productStore)

const search = ref('')

const filteredProducts = computed(() =>
  products.value.filter((p: Product) => p.name.toLowerCase().includes(search.value.toLowerCase()))
)

function formatRupiah(value: number) {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(value)
}

function addToCart(prod: Product) {
  sale.addToCart(prod, 1)
}

watch(() => props.modelValue, (val) => {
  if (val) {
    search.value = ''
    productStore.fetchAll(props.branchId ? { branch_id: props.branchId } : undefined)
  }
})
</script>

<style scoped>
.slide-up-enter-active, .slide-up-leave-active {
  transition: transform 0.25s ease;
}
.slide-up-enter-from, .slide-up-leave-to {
  transform: translateY(100%);
}
</style>
