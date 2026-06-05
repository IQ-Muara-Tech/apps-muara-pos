<template>
  <div class="min-h-screen bg-gray-50">
    <Sidebar />

    <div class="md:ml-60">
      <template v-if="!auth.ready">
        <div class="min-h-screen bg-gray-50 flex items-center justify-center">
          <LoadingSpinner />
        </div>
      </template>
      <template v-else>
        <div class="mx-auto max-w-md md:max-w-none bg-white min-h-screen shadow-sm md:shadow-none relative pb-20 md:pb-6">
          <AppHeader />
          <main class="p-4 md:p-6">
            <slot />
          </main>
          <BottomNav />
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
const auth = useAuthStore()

watchEffect(() => {
  if (!auth.ready) return
  if (!auth.isAuthenticated) {
    navigateTo('/login')
    return
  }
  if (auth.isKasir && !auth.selectedBranch) {
    navigateTo('/select-branch')
  }
})
</script>
