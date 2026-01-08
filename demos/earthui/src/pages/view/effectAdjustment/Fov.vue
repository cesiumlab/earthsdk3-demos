<template>
  <PopList :title="'FOV'">
    <LabelInputSliderReset
      v-model="fov"
      :label="'FOV'"
      :step="1"
      :min="10"
      :max="170"
      :defaultValue="60"
    >
    </LabelInputSliderReset>
  </PopList>
</template>
<script setup lang="ts">
import { createVueDisposer, toVR } from 'earthsdk-ui'
import LabelInputSliderReset from '../../../components/LabelInputSliderReset.vue'
import PopList from '../../../components/PopList.vue'
import { onBeforeUnmount, inject } from 'vue'
import { XbsjEarthUi } from '../../../scripts/xbsjEarthUi'

const d = createVueDisposer(onBeforeUnmount)
const xbsjEarthUi = inject('xbsjEarthUi') as XbsjEarthUi
const fov = toVR<number>(d, [xbsjEarthUi.activeViewer, 'fov']) //文字避让
</script>
