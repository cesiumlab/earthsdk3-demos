<template>
  <PopList :title="'相机包围盒尺寸'">
    <ESLabelInput class="content_item" v-model="flyToBoundingSize">
      <template #suffix>
        <span class="content_item_fix">px</span>
      </template>
    </ESLabelInput>
  </PopList>
</template>
<script setup lang="ts">
import { createVueDisposer, toVR, ESLabelInput } from 'earthsdk-ui'
import PopList from '../../../components/PopList.vue'
import { onBeforeUnmount, inject } from 'vue'
import { XbsjEarthUi } from '../../../scripts/xbsjEarthUi'

const d = createVueDisposer(onBeforeUnmount)
const xbsjEarthUi = inject('xbsjEarthUi') as XbsjEarthUi
const flyToBoundingSize = toVR<number>(d, [xbsjEarthUi.activeViewer, 'flyToBoundingSize']) //定位配置
</script>
