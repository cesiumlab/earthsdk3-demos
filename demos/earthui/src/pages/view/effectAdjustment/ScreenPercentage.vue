<template>
  <PopList :title="'画面比例'">
    <ESLabelSlider class="content_item" v-model="screenPercentage" :min="0" :max="300">
      <template #suffix>
        <span class="content_item_fix">%</span>
      </template>
    </ESLabelSlider>
  </PopList>
</template>
<script setup lang="ts">
import { createVueDisposer, toVR, ESLabelSlider } from 'earthsdk-ui'
import PopList from '../../../components/PopList.vue'
import { onBeforeUnmount, inject } from 'vue'
import { XbsjEarthUi } from '../../../scripts/xbsjEarthUi'
const d = createVueDisposer(onBeforeUnmount)
const xbsjEarthUi = inject('xbsjEarthUi') as XbsjEarthUi
const screenPercentage = toVR<number>(d, [xbsjEarthUi.activeViewer, 'screenPercentage']) //画面比例
</script>
