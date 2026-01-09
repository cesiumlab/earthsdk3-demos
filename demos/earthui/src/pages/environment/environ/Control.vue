<template>
  <!-- 选择框 -->
  <PopList :title="'UE光照控制'">
    <LabelInputSliderReset
      v-model="emissiveIntensity"
      :label="'自发光亮度'"
      :default-value="1"
    ></LabelInputSliderReset>
    <LabelInputSliderReset
      v-model="brightness"
      :label="'场景亮度'"
      :step="0.02"
      :default-value="0"
    ></LabelInputSliderReset>
  </PopList>
</template>
<script setup lang="ts">
import { createVueDisposer, toVR } from 'earthsdk-ui'
import { inject, onBeforeUnmount } from 'vue'
import LabelInputSliderReset from '../../../components/LabelInputSliderReset.vue'
import PopList from '../../../components/PopList.vue'
import { XbsjEarthUi } from '../../../scripts/xbsjEarthUi'
const xbsjEarthUi = inject('xbsjEarthUi') as XbsjEarthUi
const d = createVueDisposer(onBeforeUnmount)
const emissiveIntensity = toVR<number>(d, [xbsjEarthUi.activeViewer, 'emissiveIntensity']) //自发光
const brightness = toVR<number>(d, [xbsjEarthUi.activeViewer, 'brightness']) //场景亮度
</script>
