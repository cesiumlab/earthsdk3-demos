<template>
  <PopList :title="'FOV'">
    <ESLabelSlider class="content_item" v-model="fov" :min="10" :max="170">
      <template #suffix>
        <span class="content_item_fix">°</span>
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
const fov = toVR<number>(d, [xbsjEarthUi.activeViewer, 'fov']) //文字避让
</script>
