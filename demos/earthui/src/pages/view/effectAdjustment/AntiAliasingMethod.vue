<template>
  <PopList :title="'抗锯齿方法'">
    <!-- <LabelEnum v-model="antiAliasingMethod" :label="'抗锯齿方法'" :materialIdList="materialIdList" /> -->
    <ESLabelSelect v-model="antiAliasingMethod" :options="options" />
  </PopList>
</template>
<script setup lang="ts">
import { createVueDisposer, toVR, ESLabelSelect } from 'earthsdk-ui'
import PopList from '../../../components/PopList.vue'
import { onBeforeUnmount, inject } from 'vue'
import { XbsjEarthUi } from '../../../scripts/xbsjEarthUi'

const d = createVueDisposer(onBeforeUnmount)
const xbsjEarthUi = inject('xbsjEarthUi') as XbsjEarthUi
const antiAliasingMethod = toVR<string>(d, [xbsjEarthUi.activeViewer, 'antiAliasingMethod']) //抗锯齿方法

const options = [
  { label: 'None', value: 'None' },
  { label: 'FXAA', value: 'FXAA' },
  { label: 'TemporaIAA', value: 'TemporaIAA' },
  { label: 'MSAA', value: 'MSAA' },
  { label: 'TSR', value: 'TSR' }
]
</script>
