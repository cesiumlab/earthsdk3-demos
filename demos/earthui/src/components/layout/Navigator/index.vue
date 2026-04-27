<template>
  <div class="navigator" ref="navigatorRef">
    <CompassCom :rotation="rotation" @reset="flyToNorth"></CompassCom>
  </div>
</template>

<script setup lang="ts">
import CompassCom from "./compass.vue"
import { XbsjEarthUi } from '@/scripts/xbsjEarthUi'
import { inject, onBeforeUnmount, onMounted, useTemplateRef } from 'vue'
import { useNavigator } from './useNavigator'
// 注入 EarthUI 实例
const xbsjEarthUi = inject('xbsjEarthUi') as XbsjEarthUi
// DOM 引用
const navigatorRef = useTemplateRef('navigatorRef')

// 使用自定义 Hook
const {
  rotation,
  flyToNorth,
  initNavigator,
  destroy
} = useNavigator(xbsjEarthUi, navigatorRef)

// 组件挂载时初始化
onMounted(() => {
  initNavigator()
})

// 组件销毁前清理资源
onBeforeUnmount(() => {
  destroy()
})
</script>

<style scoped>
.navigator {
  position: fixed;
  cursor: pointer;
  z-index: 2;
  width: 90px;
  height: 90px;
  bottom: 100px;
  right: 430px;
  /* transition: right 0.4s linear; */
  user-select: none;
}
</style>
