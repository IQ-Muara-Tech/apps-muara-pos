<template>
  <div class="min-h-screen bg-gray-50 flex items-center justify-center p-4">
    <div class="w-full max-w-sm">
      <div class="text-center mb-8">
        <div class="w-16 h-16 bg-primary-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
          <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
        </div>
        <h1 class="text-xl font-bold text-gray-900">Pilih Cabang</h1>
        <p class="text-sm text-gray-500 mt-1">Halo, {{ auth.user?.name }}</p>
      </div>
      <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 space-y-2">
        <button
          v-for="branch in auth.user?.branches"
          :key="branch.id"
          @click="selectBranch(branch)"
          class="w-full flex items-center gap-3 p-4 rounded-xl border border-gray-200 hover:border-primary-400 hover:bg-primary-50 transition-all active:scale-[0.98]"
        >
          <div class="w-10 h-10 bg-primary-100 rounded-xl flex items-center justify-center flex-shrink-0">
            <svg class="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
          <div class="text-left">
            <p class="font-medium text-gray-900 text-sm">{{ branch.name }}</p>
            <p class="text-xs text-gray-400">{{ branch.address }}</p>
          </div>
        </button>
        <p v-if="!auth.user?.branches?.length" class="text-sm text-gray-400 text-center py-4">Tidak ada cabang tersedia</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Branch } from '~/types'

definePageMeta({ layout: 'auth' })

const auth = useAuthStore()

onMounted(() => {
  auth.hydrate()
  if (!auth.isAuthenticated || !auth.user) {
    navigateTo('/login')
    return
  }
  if (!auth.isKasir) {
    navigateTo('/')
    return
  }
  if (auth.user.branches?.length === 1) {
    auth.selectBranch(auth.user.branches[0])
    navigateTo('/')
  }
})

function selectBranch(branch: Branch) {
  auth.selectBranch(branch)
  navigateTo('/')
}
</script>
