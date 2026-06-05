import { ref } from 'vue';

function usePullToRefresh(onRefresh) {
  const pulling = ref(false);
  const pullDistance = ref(0);
  const startY = ref(0);
  const isPulling = ref(false);
  const threshold = 80;
  function onTouchStart(e) {
    if ((void 0).scrollY > 0) return;
    startY.value = e.touches[0].clientY;
    isPulling.value = true;
  }
  function onTouchMove(e) {
    if (!isPulling.value) return;
    const diff = e.touches[0].clientY - startY.value;
    if (diff > 0) {
      pullDistance.value = Math.min(diff * 0.5, 120);
    }
  }
  async function onTouchEnd() {
    if (!isPulling.value) return;
    isPulling.value = false;
    if (pullDistance.value >= threshold) {
      pulling.value = true;
      try {
        await onRefresh();
      } catch {
      }
      pulling.value = false;
    }
    pullDistance.value = 0;
  }
  return { pulling, pullDistance, threshold, onTouchStart, onTouchMove, onTouchEnd };
}

export { usePullToRefresh as u };
//# sourceMappingURL=usePullToRefresh-Djnb12W0.mjs.map
