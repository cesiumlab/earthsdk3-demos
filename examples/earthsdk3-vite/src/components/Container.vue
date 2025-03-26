<template>
  <div class="box">
    <div class="btn-box">
      <botton @click="syncOther(1)">同步1</botton>
      <botton @click="syncOther(2)">同步2</botton>
      <botton @click="exitSync(1)">1解除同步</botton>
      <botton @click="exitSync(2)">2解除同步</botton>
    </div>

    <div class="container" ref="container1">
    </div>
    <div class="container" ref="container2">
    </div>
  </div>

</template>

<script setup lang="ts">
import { nextTick, ref } from 'vue';
import { getobjm } from '../scripts/getobjm';
import { ESViewer } from 'earthsdk3';
const objm = getobjm();
const container1 = ref<HTMLDivElement>();
const container2 = ref<HTMLDivElement>();

let viewer1: ESViewer, viewer2: ESViewer;

const syncOther = (index: number) => {
  if (index === 1) {
    objm.activeViewer = viewer1;
  } else if (index === 2) {
    objm.activeViewer = viewer2;
  }
  objm.syncOtherViewersToActived = true;
}

//退出同步
const exitSync = (index: number) => {
  if (index === 1) {
    viewer1.syncOtherViewer(undefined);
  } else if (index === 2) {
    viewer2.syncOtherViewer(undefined);
  }
}


nextTick(() => {
  if (!container1.value || !container2.value) return;
  viewer1 = objm.createCesiumViewer(container1.value);
  //@ts-ignore
  window.g_viewer1 = viewer1;
  viewer2 = objm.createUeViewer(container2.value, 'http://114.242.26.126:30001/', 'earthsdk');
  //@ts-ignore
  window.g_viewer2 = viewer2;
})


</script>
<style scoped>
.box {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  position: relative;
}

.btn-box {
  width: 100%;
  height: 50px;
  position: absolute;
  left: 0px;
  top: 0px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  z-index: 1;
}

.container {
  width: 50%;
  height: 100%;
  box-sizing: border-box;
  border: 1px solid #01fa7d;
  position: relative;
}

botton {
  width: 100px;
  height: 30px;
  margin-right: 10px;
  background-color: #01fa7d;
  border: 1px solid #01fa7d;
  border-radius: 5px;
  cursor: pointer;
  color: #fff;
  font-size: 14px;
  text-align: center;
  line-height: 30px;
  transition: all 0.3s ease-in-out;
}
</style>
