<template>
  <div class="container" ref="container">
  </div>
</template>

<script setup>
import { nextTick, ref } from 'vue';
import { getobjm } from '../scripts/getobjm';
const objm = getobjm();
const container = ref();
nextTick(() => {
  const viewer = objm.createCesiumViewer(container.value);
  //调试
  window.g_viewer = viewer;
})


</script>
<style scoped>
.container {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  position: relative;
}
</style>
