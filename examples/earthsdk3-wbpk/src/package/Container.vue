<template>
  <div id="container" ref="container">
  </div>
</template>

<script setup lang="ts">
import { nextTick, onBeforeUnmount, ref } from 'vue';
import { getobjm } from '../scripts/getobjm';
const objm = getobjm();
const container = ref<HTMLDivElement>()

nextTick(() => {
  if (!container.value) return;

  objm.createCesiumViewer(container.value);

  const don = objm.viewerSwitchEvent.don((type) => {
    if (!container.value) return;
    if (type === 1) {

      objm.switchToCesiumViewer(container.value);

    } else if (type === 2) {

      objm.switchToUEViewer(container.value, 'http://114.242.26.126:30001/', 'earthsdk');

    } else if (type === 3) {

      const option = {
        type: "ESOlViewer",
        container: container.value
      }
      objm.switchViewer(option);
    }
  })

  onBeforeUnmount(() => { don(); })
})

</script>
<style scoped>
#container {
  width: 100%;
  height: 100%;
  background-color: #64927370;
}
</style>
