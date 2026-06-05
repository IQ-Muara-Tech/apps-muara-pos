<template>
  <div class="min-h-screen bg-gray-50 flex items-center justify-center p-4">
    <div class="w-full max-w-sm">
      <div class="text-center mb-8">
        <img src="/logo/logo-muara-pos.png" alt="Muara POS" class="w-20 h-20 mx-auto mb-4 object-contain rounded-full" />
        <h1 class="text-2xl font-bold text-gray-900">Muara POS</h1>
        <p class="text-sm text-gray-500 mt-1">Point of Sale System</p>
      </div>
      <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <form @submit.prevent="handleLogin" class="space-y-4">
          <div v-if="error" class="bg-red-50 text-red-600 text-sm p-3 rounded-xl border border-red-200">
            {{ error }}
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Username</label>
            <input
              v-model="username"
              type="text"
              required
              placeholder="username"
              class="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              v-model="password"
              type="password"
              required
              placeholder="password"
              class="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
            />
          </div>
          <button
            type="submit"
            :disabled="loading"
            class="w-full bg-primary-600 text-white py-2.5 rounded-xl font-semibold hover:bg-primary-700 disabled:opacity-50 transition-colors"
          >
            <LoadingSpinner v-if="loading" />
            <span v-else>Masuk</span>
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'auth' })

const auth = useAuthStore()

onMounted(() => {
  auth.hydrate()
  if (auth.isAuthenticated) {
    navigateTo('/')
  }
})

const username = ref('')
const password = ref('')
const loading = ref(false)
const error = ref('')

async function handleLogin() {
  loading.value = true
  error.value = ''
  try {
    const data = await auth.login(username.value, password.value)
    const user = data.user
    if (user.role_id === 2) {
      navigateTo('/select-branch')
    } else {
      navigateTo('/')
    }
  } catch (e: any) {
    error.value = e.message || 'Login gagal. Periksa username dan password.'
    if (e.data?.errors?.username) {
      error.value = e.data.errors.username[0]
    }
  } finally {
    loading.value = false
  }
}
</script>
