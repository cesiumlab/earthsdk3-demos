<script setup lang="ts">
import { XbsjEarthUi } from '@/scripts/xbsjEarthUi'
import { createVueDisposer, toVR } from 'earthsdk-ui'
import { inject, onBeforeUnmount } from 'vue'
import NavigatorCom from './Navigator/index.vue'
import ScaleCom from './Scale/index.vue'
import StatusBarCom from './StatusBar/index.vue'

const xbsjEarthUi = inject('xbsjEarthUi') as XbsjEarthUi

const disposer = createVueDisposer(onBeforeUnmount)
const navigatorShow = toVR<boolean>(disposer, [xbsjEarthUi.navigatorManager, 'navigatorShow'])
const scaleShow = toVR<boolean>(disposer, [xbsjEarthUi.navigatorManager, 'scaleShow'])
const statusBarShow = toVR<boolean>(disposer, [xbsjEarthUi.navigatorManager, 'statusBarShow'])
</script>

<template>
  <!-- 状态栏-->
  <StatusBarCom v-if="statusBarShow"></StatusBarCom>
  <!-- 状态栏-->
  <NavigatorCom v-if="navigatorShow"></NavigatorCom>
  <!-- 比例尺-->
  <ScaleCom v-if="scaleShow"></ScaleCom>
</template>

<style scoped></style>
