export function usePwaInstall() {
  const deferredPrompt = ref<any>(null)
  const isInstalled = ref(false)
  const canInstall = ref(false)
  let listened = false

  function checkInstalled() {
    if (!import.meta.client) return
    isInstalled.value = window.matchMedia('(display-mode: standalone)').matches || (window.navigator as any).standalone === true
  }

  function listen() {
    if (listened || !import.meta.client) return
    listened = true

    checkInstalled()

    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault()
      deferredPrompt.value = e
      canInstall.value = true
    })

    window.addEventListener('appinstalled', () => {
      isInstalled.value = true
      canInstall.value = false
      deferredPrompt.value = null
    })
  }

  async function install() {
    if (deferredPrompt.value) {
      deferredPrompt.value.prompt()
      const result = await deferredPrompt.value.userChoice
      if (result.outcome === 'accepted') {
        isInstalled.value = true
      }
      deferredPrompt.value = null
      canInstall.value = false
    }
  }

  listen()

  return { deferredPrompt, isInstalled, canInstall, install }
}
