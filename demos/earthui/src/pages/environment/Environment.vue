<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, inject, watch } from 'vue'
import SliderTime from '../../components/SliderTime.vue'
import { timestampToTime, timeToTimestamp, formatDate } from './fun'
import { createVueDisposer, toVR } from 'earthsdk-ui'
import RightList from '../../components/RightList.vue'
import Control from './environ/Control.vue'
import Button from '../../components/Button.vue'
import { XbsjEarthUi } from '../../scripts/xbsjEarthUi'
import LabelInputSliderReset from '../../components/LabelInputSliderReset.vue'
const xbsjEarthUi = inject('xbsjEarthUi') as XbsjEarthUi
const d = createVueDisposer(onBeforeUnmount)

const { activeViewer } = xbsjEarthUi
const sunShow = toVR<boolean>(d, [activeViewer, 'sun']) //太阳
const moonShow = toVR<boolean>(d, [activeViewer, 'moon']) //月亮
const atmosphereShow = toVR<boolean>(d, [activeViewer, 'atmosphere']) //大气
const currentTime = toVR<number>(d, [activeViewer, 'currentTime']) //时间
const sceneControlled = toVR<boolean>(d, [activeViewer, 'sceneControlled'])
const newSceneControlled = ref(true)
const activeViewerType = toVR<string>(d, [xbsjEarthUi, 'activeViewerType'])
const time = ref(210) //时间
const timeStr = ref('12:00')
const cloudShow = toVR<number>(d, [activeViewer, 'cloud'])
const rainShow = toVR<number>(d, [activeViewer, 'rain'])
const snowShow = toVR<number>(d, [activeViewer, 'snow'])
const fogShow = toVR<number>(d, [activeViewer, 'fog']) //雾

//时间函数
const timeChange = (val: number) => {
  const integer = Math.floor(val / 30)
  const remainder = (val % 30) * 2
  timeStr.value = `${integer}:${remainder >= 0 && remainder <= 9 ? '0' + remainder : remainder}`
  const date = timeToTimestamp(
    timestampToTime(integer === 0 ? '00' : integer, remainder === 0 ? '00' : remainder)
  )
  // @ts-ignore
  currentTime.value = date
}
watch(
  sceneControlled,
  (val) => {
    if (val === true || val === undefined) {
      newSceneControlled.value = true
    } else {
      newSceneControlled.value = false
    }
  },
  { immediate: true }
)
const changeSceneControlled = () => {
  if (sceneControlled.value === undefined || sceneControlled.value === true) {
    sceneControlled.value = false
  } else {
    sceneControlled.value = true
  }
}
onMounted(() => {
  const hour = formatDate(currentTime.value)[0]
  const minute = formatDate(currentTime.value)[1]
  time.value = hour * 30 + (minute * 1) / 2
  timeChange(time.value)
})
</script>

<template>
  <RightList :title="'环境'" :isTop="true">
    <div class="environment_slider_time">
      <div style="font-size: 14px">时间线</div>
      <div style="display: flex; align-items: center; justify-content: space-between">
        <SliderTime
          :width="324"
          v-model:value="time"
          :max="720"
          :min="0"
          @change="timeChange"
          :realVal="timeStr"
        />
        <span>
          {{ timeStr }}
        </span>
      </div>
    </div>
    <div class="environment_slider_time">
      <!--云 -->
      <LabelInputSliderReset v-model="cloudShow" :label="'云浓度'" :step="0.01">
      </LabelInputSliderReset>
      <!--雨 -->
      <LabelInputSliderReset v-model="rainShow" :label="'雨浓度'" :step="0.01">
      </LabelInputSliderReset>
      <!--雪 -->
      <LabelInputSliderReset v-model="snowShow" :label="'雪浓度'" :step="0.01">
      </LabelInputSliderReset>
      <!--雾 -->
      <LabelInputSliderReset v-model="fogShow" :label="'雾浓度'" :step="0.01">
      </LabelInputSliderReset>
    </div>

    <Button
      :name="'taiyang'"
      :content="'太阳'"
      :click="
        () => {
          sunShow = !sunShow
        }
      "
      :actived="sunShow != false"
      :left-button="true"
    ></Button>
    <Button
      :name="'yueliang'"
      :content="'月亮'"
      :click="
        () => {
          moonShow = !moonShow
        }
      "
      :actived="moonShow != false"
    ></Button>
    <Button
      :name="'quanqiu'"
      :content="'大气'"
      :click="
        () => {
          atmosphereShow = !atmosphereShow
        }
      "
      :actived="atmosphereShow"
      :left-button="true"
    ></Button>
    <Button
      :name="'guangzhao'"
      :content="'光照控制'"
      v-if="activeViewerType === 'ESUeViewer'"
      :click="changeSceneControlled"
      :actived="newSceneControlled"
      :left-button="false"
    ></Button>
    <Control v-if="activeViewerType === 'ESUeViewer' && newSceneControlled"></Control>
  </RightList>
</template>
