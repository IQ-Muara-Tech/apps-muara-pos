import { ref } from "vue";
const currentHandler = ref(null);
const isLoading = ref(false);
function useAppRefresh() {
  function registerRefresh(fn) {
    currentHandler.value = fn;
  }
  function unregisterRefresh() {
    currentHandler.value = null;
  }
  async function triggerRefresh() {
    if (!currentHandler.value || isLoading.value) return;
    isLoading.value = true;
    await currentHandler.value();
    setTimeout(() => {
      isLoading.value = false;
    }, 600);
  }
  return {
    registerRefresh,
    unregisterRefresh,
    triggerRefresh,
    isLoading
  };
}
export {
  useAppRefresh as u
};
//# sourceMappingURL=useAppRefresh-BZYaFRjH.js.map
