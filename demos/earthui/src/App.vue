<template>
  <div class="earthui_box">
    <EarthUI :newList="newList"></EarthUI>
  </div>
</template>

<script setup lang="ts">
import { shallowRef } from "vue";
import EarthUI from "./EarthUI.vue";
import { NavType } from "./types";
const newList = shallowRef<NavType[]>([])
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
