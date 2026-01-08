<template>
  <g>
    <rect
      :x="((startTime - playerStarttimeAxis) / 1000) * xScale"
      :y="21.2 * index"
      :width="((stopTime - startTime) / 1000) * xScale"
      :height="21.2"
      fill="rgba(121, 161, 255, 0.7)"
      :index="index"
      name="channel_rect"
      class="channel_rect"
    />
    <line
      :x1="((startTime - playerStarttimeAxis) / 1000) * xScale"
      :x2="((startTime - playerStarttimeAxis) / 1000) * xScale"
      :y1="21.2 * index"
      :y2="21.2 * (index + 1)"
      stroke="#009"
      :stroke-width="4"
      :index="index"
      name="channel_left_line"
      class="channel_line"
    />
    <line
      :x1="((stopTime - playerStarttimeAxis) / 1000) * xScale"
      :x2="((stopTime - playerStarttimeAxis) / 1000) * xScale"
      :y1="21.2 * index"
      :y2="21.2 * (index + 1)"
      stroke="#009"
      :stroke-width="4"
      :index="index"
      name="channel_right_line"
      class="channel_line"
    />
  </g>
</template>
<script setup lang="ts">
import { ref, inject } from 'vue'
import { XbsjEarthUi } from '../../../../scripts/xbsjEarthUi'
import { ESPath, ESSceneObject } from 'earthsdk3'

const props = withDefaults(
  defineProps<{
    sceneId: any
    index: number
    xScale: number
    playerStarttimeAxis: number
  }>(),
  {}
)
const xbsjEarthUi = inject('xbsjEarthUi') as XbsjEarthUi
const sceneObj = xbsjEarthUi.getSceneObjectById(props.sceneId) as ESPath
const startTime = ref(0)
const stopTime = ref(0)
if (sceneObj && sceneObj.timeStamps) {
  startTime.value = sceneObj.timeStamps[0]
  stopTime.value = sceneObj.timeStamps[sceneObj.timeStamps.length - 1]
}
sceneObj.dispose(
  sceneObj.timeStampsChanged.disposableOn((val) => {
    if (val) {
      startTime.value = val[0]
      stopTime.value = val[val.length - 1]
    }
  })
)
</script>
<style scoped>
.channel_line:hover {
  stroke: red;
  cursor: e-resize;
}

.channel_rect:hover {
  fill: rgba(121, 161, 255, 1);
  cursor: e-resize;
}
</style>
