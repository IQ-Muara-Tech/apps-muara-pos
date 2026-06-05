<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
const auth = useAuthStore()

onMounted(async () => {
  auth.hydrate()
  if (auth.token) {
    await auth.fetchUser()
  }
  auth.ready = true
})
</script>
