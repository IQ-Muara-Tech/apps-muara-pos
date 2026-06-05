<template>
  <div>
    <div class="bg-gradient-to-b from-primary-600 to-primary-700 -mx-4 -mt-4 px-4 pt-6 pb-8 mb-6 rounded-b-3xl">
      <div class="flex flex-col items-center">
        <div class="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mb-3 ring-4 ring-white/30">
          <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </div>
        <h2 class="text-lg font-bold text-white">{{ auth.user?.name || '-' }}</h2>
        <p class="text-sm text-primary-200">@{{ auth.user?.username || '-' }}</p>
        <span class="mt-2 px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-medium text-white">
          {{ auth.user?.role?.name || '-' }}
        </span>
      </div>
    </div>

    <div class="bg-white rounded-xl border border-gray-200 divide-y divide-gray-100 mb-6">
      <div class="flex items-center gap-3 p-4">
        <div class="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center flex-shrink-0">
          <svg class="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </div>
        <div class="flex-1">
          <p class="text-xs text-gray-500">Username</p>
          <p class="text-sm font-medium text-gray-900">{{ auth.user?.username || '-' }}</p>
        </div>
      </div>
      <div class="flex items-center gap-3 p-4">
        <div class="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center flex-shrink-0">
          <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
        </div>
        <div class="flex-1">
          <p class="text-xs text-gray-500">Role</p>
          <p class="text-sm font-medium text-gray-900">{{ auth.user?.role?.name || '-' }}</p>
        </div>
      </div>
      <div class="p-4">
        <div class="flex items-center gap-3 mb-2">
          <div class="w-10 h-10 bg-primary-50 rounded-xl flex items-center justify-center flex-shrink-0">
            <svg class="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
          <div class="flex-1">
            <p class="text-xs text-gray-500">Cabang</p>
          </div>
        </div>
        <div v-if="auth.isKasir && auth.selectedBranch" class="flex flex-wrap gap-1.5 ml-13">
          <span class="text-xs bg-primary-50 text-primary-700 px-2.5 py-1 rounded-full">
            {{ auth.selectedBranch.name }}
          </span>
        </div>
        <div v-else-if="!auth.isKasir && auth.user?.branches?.length" class="flex flex-wrap gap-1.5 ml-13">
          <span v-for="b in auth.user.branches" :key="b.id" class="text-xs bg-primary-50 text-primary-700 px-2.5 py-1 rounded-full">
            {{ b.name }}
          </span>
        </div>
        <p v-else class="text-sm text-gray-400 ml-13">-</p>
      </div>
    </div>

    <button
      @click="showLogoutModal = true"
      class="w-full flex items-center justify-center gap-2 bg-red-50 text-red-600 py-3 rounded-xl text-sm font-semibold hover:bg-red-100 border border-red-200 transition-colors"
    >
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
      </svg>
      Keluar
    </button>

    <button
      @click="handleExitApp"
      class="w-full flex items-center justify-center gap-2 bg-gray-50 text-gray-600 py-3 rounded-xl text-sm font-semibold hover:bg-gray-100 border border-gray-200 transition-colors mt-3"
    >
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
      Keluar Aplikasi
    </button>

    <Transition name="fade">
      <div v-if="showExitToast" class="fixed bottom-24 left-4 right-4 z-50 max-w-md mx-auto">
        <div class="bg-gray-900 text-white text-sm text-center py-3 px-4 rounded-xl shadow-lg">
          Tekan Back sekali lagi untuk keluar aplikasi
        </div>
      </div>
    </Transition>

    <Teleport to="body">
      <Transition name="fade">
        <div v-if="showLogoutModal" class="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div class="fixed inset-0 bg-black/40" @click="showLogoutModal = false" />
          <div class="relative bg-white rounded-2xl shadow-xl w-full max-w-sm p-6 text-center">
            <div class="w-14 h-14 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-7 h-7 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
            </div>
            <h3 class="text-lg font-semibold text-gray-900 mb-1">Keluar dari akun?</h3>
            <p class="text-sm text-gray-500 mb-6">Kamu akan dikembalikan ke halaman login.</p>
            <div class="flex gap-3">
              <button
                @click="showLogoutModal = false"
                class="flex-1 py-2.5 border border-gray-200 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors"
              >
                Batal
              </button>
              <button
                @click="handleLogout"
                class="flex-1 bg-red-500 text-white py-2.5 rounded-xl text-sm font-semibold hover:bg-red-600 transition-colors"
              >
                Keluar
              </button>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
const auth = useAuthStore()
const showLogoutModal = ref(false)
const showExitToast = ref(false)
let exitTimeout: ReturnType<typeof setTimeout> | null = null

function handleLogout() {
  showLogoutModal.value = false
  auth.logout()
}

function handleExitApp() {
  auth.logout()
  showExitToast.value = true

  history.pushState({ exit: true }, '', window.location.href)

  const onBack = () => {
    if (exitTimeout) clearTimeout(exitTimeout)
    showExitToast.value = false
    window.removeEventListener('popstate', onBack)
    window.location.href = 'about:blank'
  }

  window.addEventListener('popstate', onBack)

  exitTimeout = setTimeout(() => {
    showExitToast.value = false
    window.removeEventListener('popstate', onBack)
    exitTimeout = null
  }, 3000)
}
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>
