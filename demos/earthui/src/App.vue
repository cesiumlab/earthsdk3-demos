<template>
  <div class="earthui_box">
    <!-- 示例 -->
    <EarthUI :newList="newList"></EarthUI>
    <!-- <EarthUI></EarthUI> -->
  </div>
</template>

<script setup lang="ts">
import EarthUI from "./EarthUI.vue";
import { shallowRef } from "vue"
// // 自定义添加菜单示例
// import engine from './pages/engine/index.vue';
type list = {
  id: number,
  title: string,
  value: string,
  icon: string,
  component: any
}[]
const newList = shallowRef<list>([])
// setTimeout(() => {
//   newList.value = [{
//     id: 17,
//     title: "引擎",
//     value: 'engin',
//     icon: 'yinqing',
//     component: engine
//   }]
// }, 5000);

</script>

<style>
body,
html {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
}

#app,
.earthui_box {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #fff;
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
}

.cesium-viewer-bottom {
  display: none !important;
}

.es-mask-message {
    z-index: 99999 !important;
}
</style>
