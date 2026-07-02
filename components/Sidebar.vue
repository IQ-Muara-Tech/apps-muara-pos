<template>
  <div class="hidden md:flex md:flex-col md:w-60 md:fixed md:inset-y-0 md:bg-white md:border-r md:border-gray-200 md:z-30">
    <div class="px-6 py-5 border-b border-gray-100">
      <h1 class="text-lg font-bold text-primary-600">Muara POS</h1>
    </div>

    <nav class="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
      <NuxtLink
        v-for="menu in sidebarMenus"
        :key="menu.to"
        :to="menu.to"
        class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors"
        :class="route.path === menu.to ? 'bg-primary-50 text-primary-700' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'"
      >
        <component :is="menu.icon" class="w-5 h-5 flex-shrink-0" />
        <span>{{ menu.label }}</span>
      </NuxtLink>
    </nav>

    <NuxtLink to="/profile" class="px-4 py-4 border-t border-gray-100 flex items-center gap-3 hover:bg-gray-50 transition-colors">
      <div class="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center text-primary-600 font-bold text-sm">
        {{ auth.user?.name?.charAt(0) }}
      </div>
      <div class="flex-1 min-w-0">
        <p class="text-sm font-medium text-gray-900 truncate">{{ auth.user?.name }}</p>
        <p class="text-xs text-gray-500">{{ auth.user?.role?.name }}</p>
      </div>
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
import { h, defineComponent } from 'vue'

const route = useRoute()
const auth = useAuthStore()

const HomeIcon = defineComponent({
  setup() {
    return () => h('svg', { fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
      h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '1.5', d: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' })
    ])
  }
})

const BoxIcon = defineComponent({
  setup() {
    return () => h('svg', { fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
      h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '1.5', d: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4' })
    ])
  }
})

const CartIcon = defineComponent({
  setup() {
    return () => h('svg', { fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
      h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '1.5', d: 'M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z' })
    ])
  }
})

const ChartIcon = defineComponent({
  setup() {
    return () => h('svg', { fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
      h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '1.5', d: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' })
    ])
  }
})

const UserIcon = defineComponent({
  setup() {
    return () => h('svg', { fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
      h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '1.5', d: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' })
    ])
  }
})

const BuildingIcon = defineComponent({
  setup() {
    return () => h('svg', { fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
      h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '1.5', d: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4' })
    ])
  }
})

const sidebarMenus = computed(() => {
  const items = [
    { label: 'Home', to: '/', icon: HomeIcon },
    { label: 'Produk', to: '/products', icon: BoxIcon },
    { label: 'Transaksi', to: '/sales', icon: CartIcon },
  ]
  if (!auth.isKasir) {
    items.push({ label: 'Laporan', to: '/reports', icon: ChartIcon })
  }
  return items
})
</script>
