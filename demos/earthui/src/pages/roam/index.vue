<script setup lang="ts">
import CameraViews from './CameraViews.vue'
import Interaction from './Interaction.vue'
import CousePicking from './CousePicking.vue'
</script>
<template>
  <!-- 漫游 -->
  <div class="roam">
    <!-- 视角 -->
    <CameraViews></CameraViews>
    <!-- 交互模式 -->
    <Interaction></Interaction>
    <!-- 鼠标拾取 -->
    <CousePicking></CousePicking>
  </div>
</template>
<style src="../../css/RoamObj.css"></style>
