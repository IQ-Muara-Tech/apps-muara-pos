<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="show" class="fixed inset-0 z-50 flex items-end justify-center" @click.self="$emit('close')">
        <div class="fixed inset-0 bg-black/40 transition-opacity" @click="$emit('close')" />
        <div class="relative bg-white w-full max-w-md rounded-t-2xl shadow-xl p-6 pb-8 transition-transform duration-300" :class="show ? 'translate-y-0' : 'translate-y-full'">
          <div class="flex items-center justify-between mb-4">
            <h2 class="text-lg font-semibold text-gray-900">{{ title }}</h2>
            <button @click="$emit('close')" class="p-1 hover:bg-gray-100 rounded-full">
              <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <slot />
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
defineProps<{
  show: boolean
  title: string
}>()

defineEmits<{
  close: []
}>()
</script>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.2s ease;
}
.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
</style>
