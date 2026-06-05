<template>
  <Teleport to="body">
    <Transition name="cart">
      <div v-if="sale.cartOpen" class="fixed inset-0 z-50 flex justify-end" @click.self="sale.closeCart()">
        <div class="fixed inset-0 bg-black/40" @click="sale.closeCart()" />
        <div class="relative bg-white w-full max-w-md mx-2 my-2 rounded-2xl flex flex-col h-[calc(100%-16px)] shadow-xl">
          <div class="flex items-center justify-between px-4 py-3 border-b border-gray-200">
            <h2 class="text-lg font-semibold text-gray-900">Keranjang ({{ sale.cartCount }})</h2>
            <button @click="sale.closeCart()" class="p-1 hover:bg-gray-100 rounded-full">
              <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div class="flex-1 overflow-y-auto p-4 space-y-3">
            <div v-for="(item, index) in sale.cart" :key="index" class="flex items-center gap-3 bg-gray-50 rounded-xl p-3">
              <div class="flex-1 min-w-0">
                <p class="text-sm font-medium text-gray-900 truncate">{{ item.product?.name }}</p>
                <p class="text-xs text-gray-500">{{ formatRupiah(item.price) }}</p>
              </div>
              <div class="flex items-center gap-2">
                <button
                  @click="sale.updateQty(index, item.qty - 1)"
                  class="w-7 h-7 flex items-center justify-center rounded-lg bg-white border border-gray-200 text-gray-600 hover:bg-gray-100 active:scale-95 transition-all"
                >
                  <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4" /></svg>
                </button>
                <span class="text-sm font-semibold text-gray-900 w-6 text-center">{{ item.qty }}</span>
                <button
                  @click="sale.updateQty(index, item.qty + 1)"
                  class="w-7 h-7 flex items-center justify-center rounded-lg bg-white border border-gray-200 text-gray-600 hover:bg-gray-100 active:scale-95 transition-all"
                >
                  <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" /></svg>
                </button>
              </div>
              <div class="text-right min-w-[70px]">
                <p class="text-sm font-semibold text-gray-900">{{ formatRupiah(item.subtotal) }}</p>
                <button @click="sale.removeFromCart(index)" class="text-[11px] text-red-500 hover:text-red-700 mt-0.5">Hapus</button>
              </div>
            </div>
            <EmptyState v-if="sale.cart.length === 0" message="Keranjang kosong" />
          </div>
          <div class="border-t border-gray-200 p-4 space-y-3">
            <div v-if="!auth.isKasir && !auth.selectedBranch">
              <label class="block text-xs font-medium text-gray-700 mb-1">Pilih Cabang</label>
              <select
                v-model="checkoutBranchId"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none bg-white"
              >
                <option value="" disabled>Pilih cabang</option>
                <option v-for="b in auth.user?.branches" :key="b.id" :value="b.id">{{ b.name }}</option>
              </select>
            </div>
          <div v-if="backdate" class="mb-3">
            <label class="block text-xs font-medium text-gray-700 mb-1">Tanggal & Waktu Transaksi <span class="text-red-500">*</span></label>
            <input v-model="backdateDateTime" type="datetime-local" required class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none bg-white" />
          </div>
          <div>
            <label class="block text-xs font-medium text-gray-700 mb-1">Metode Pembayaran</label>
              <select
                v-model="sale.selectedPaymentTypeId"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none bg-white"
              >
                <option :value="null" disabled>Pilih metode</option>
                <option v-for="pt in sale.paymentTypes" :key="pt.id" :value="pt.id">{{ pt.name }}</option>
              </select>
            </div>
            <div class="flex items-center justify-between">
              <span class="text-base font-semibold text-gray-900">Total</span>
              <span class="text-lg font-bold text-primary-600">{{ formatRupiah(sale.cartTotal) }}</span>
            </div>
            <p v-if="error" class="text-xs text-red-500">{{ error }}</p>
            <button
              @click="checkout"
              :disabled="sale.cart.length === 0 || loading || !canCheckout"
              class="w-full bg-primary-600 text-white py-3 rounded-xl font-semibold hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <LoadingSpinner v-if="loading" />
              <span v-else>Bayar</span>
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{ backdate?: boolean }>(), { backdate: false })
const sale = useSaleStore()
const auth = useAuthStore()
const loading = ref(false)
const error = ref('')
const checkoutBranchId = ref<number | null>(null)
const backdateDateTime = ref('')

function formatRupiah(value: number) {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(value)
}

const effectiveBranchId = computed(() => {
  if (auth.selectedBranch) return auth.selectedBranch.id
  if (checkoutBranchId.value) return checkoutBranchId.value
  return null
})

const canCheckout = computed(() => !!effectiveBranchId.value && !!sale.selectedPaymentTypeId && (!props.backdate || !!backdateDateTime.value))

onMounted(async () => {
  if (sale.paymentTypes.length === 0) {
    await sale.fetchPaymentTypes()
  }
})

async function checkout() {
  if (!effectiveBranchId.value) {
    error.value = 'Pilih cabang terlebih dahulu'
    return
  }
  if (!sale.selectedPaymentTypeId) {
    error.value = 'Pilih metode pembayaran'
    return
  }
  if (props.backdate && !backdateDateTime.value) {
    error.value = 'Isi tanggal & waktu transaksi'
    return
  }
  error.value = ''
  loading.value = true
  try {
    await sale.create({
      branch_id: effectiveBranchId.value,
      payment_type_id: sale.selectedPaymentTypeId,
      date_time: props.backdate && backdateDateTime.value ? backdateDateTime.value.replace('T', ' ') + ':00' : undefined,
      status: props.backdate ? 'done' : undefined,
      items: sale.cart.map(item => ({
        product_id: item.product_id,
        qty: item.qty,
        price: item.price,
        subtotal: item.subtotal
      }))
    })
    checkoutBranchId.value = null
    sale.selectedPaymentTypeId = null
    backdateDateTime.value = ''
    sale.closeCart()
  } catch (e: any) {
    error.value = e.message || 'Gagal membuat transaksi'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.cart-enter-active,
.cart-leave-active {
  transition: all 0.3s ease;
}
.cart-enter-from,
.cart-leave-to {
  opacity: 0;
}
</style>
