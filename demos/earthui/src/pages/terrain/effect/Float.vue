<template>
  <PopList :title="'地形透明度'">
    <LabelInputSliderReset
      v-model="float"
      :label="'透明度'"
      :step="0.01"
      :min="0"
      :max="100"
      :defaultValue="1"
    >
    </LabelInputSliderReset>
  </PopList>
</template>
<script setup lang="ts">
import { createVueDisposer, toVR } from 'earthsdk-ui'
import LabelInputSliderReset from '../../../components/LabelInputSliderReset.vue'
import PopList from '../../../components/PopList.vue'
import { onBeforeUnmount, inject, ref, watch } from 'vue'
import { XbsjEarthUi } from '../../../scripts/xbsjEarthUi'

const d = createVueDisposer(onBeforeUnmount)
const xbsjEarthUi = inject('xbsjEarthUi') as XbsjEarthUi
const float = toVR<number>(d, [xbsjEarthUi.activeViewer, 'terrainOpacity']) //地形透明度
</script>
