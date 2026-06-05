import { ref } from 'vue'

type RefreshFn = () => Promise<void> | void

const currentHandler = ref<RefreshFn | null>(null)
const isLoading = ref(false)

export function useAppRefresh() {
  function registerRefresh(fn: RefreshFn) {
    currentHandler.value = fn
  }

  function unregisterRefresh() {
    currentHandler.value = null
  }

  async function triggerRefresh() {
    if (!currentHandler.value || isLoading.value) return
    isLoading.value = true
    await currentHandler.value()
    setTimeout(() => {
      isLoading.value = false
    }, 600)
  }

  return {
    registerRefresh,
    unregisterRefresh,
    triggerRefresh,
    isLoading
  }
}
