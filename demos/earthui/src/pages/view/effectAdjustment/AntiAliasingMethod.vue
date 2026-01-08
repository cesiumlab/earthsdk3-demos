<template>
  <PopList :title="'抗锯齿方法'">
    <LabelEnum
      v-model="antiAliasingMethod"
      :label="'抗锯齿方法'"
      :materialIdList="materialIdList"
    />
  </PopList>
</template>
<script setup lang="ts">
import { createVueDisposer, toVR } from 'earthsdk-ui'
import PopList from '../../../components/PopList.vue'
import { onBeforeUnmount, inject } from 'vue'
import { XbsjEarthUi } from '../../../scripts/xbsjEarthUi'
import LabelEnum from '../../../components/LabelEnum.vue'

const d = createVueDisposer(onBeforeUnmount)
const xbsjEarthUi = inject('xbsjEarthUi') as XbsjEarthUi
const antiAliasingMethod = toVR<string>(d, [xbsjEarthUi.activeViewer, 'antiAliasingMethod']) //抗锯齿方法
const materialIdList = [
  ['None', 'None'],
  ['FXAA', 'FXAA'],
  ['TemporaIAA', 'TemporaIAA'],
  ['MSAA', 'MSAA'],
  ['TSR', 'TSR']
]
</script>
