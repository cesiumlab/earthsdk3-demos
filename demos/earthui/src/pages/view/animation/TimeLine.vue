<template>
  <div class="time" ref="time">
    <!-- 控制播放 -->
    <div class="control_play">
      <div class="control_currenttime">
        {{ timestampToTime(currentTime, true) }}
      </div>
      <div class="control_rate" ref="controlRate" @click="RateDragClick($event)">
        <div class="control_rate_button" @click.stop="speed--">-</div>
        <div class="control_rate_content">×{{ speed }}</div>
        <div class="control_rate_button" @click.stop="speed++">+</div>
        <span class="control_rate_drag" ref="controlRateDrag" :style="`left:${rateDragLeft}px`"
          @mousedown="onRateDragMouseDown"></span>
      </div>
      <!-- 小按钮 -->
      <div class="control_buton">
        <!-- 时间线 -->
        <div class="control_buton_item" @mouseenter="hoverHighLight = 1" @mouseleave="hoverHighLight = -1"
          title="回到当前时间" @click="beCurrentTime">
          <es-icon :name="'shijian_2'"
            :color="hoverHighLight === 1 ? 'var(--el-color-primary)' : 'var(--el-text-color-regular)'" :size="12" />
        </div>
        <!-- ab替换 -->
        <div class="control_buton_item" @mouseenter="hoverHighLight = 2" @mouseleave="hoverHighLight = -1"
          @click="abRangeChange" title="开启循环">
          <es-icon :name="'AB_1'" :color="hoverHighLight === 2 || abRange ? 'var(--el-color-primary)' : 'var(--el-text-color-regular)'
            " :size="12" />
        </div>
        <!-- 循环 -->
        <div class="control_buton_item" @mouseenter="hoverHighLight = 3" @mouseleave="hoverHighLight = -1"
          @click="loopChange" :class="{ 'disabled-element': !abRange }">
          <es-icon :name="'xunhuan_1'" :color="hoverHighLight === 3 || loop ? 'var(--el-color-primary)' : 'var(--el-text-color-regular)'
            " :size="12" />
        </div>
        <!-- 播放 -->
        <div class="control_buton_item" @mouseenter="hoverHighLight = 4" @mouseleave="hoverHighLight = -1"
          @click="playing = !playing">
          <es-icon :name="playing ? 'zanting_1' : 'bofang_1'" :color="hoverHighLight === 4 || playing ? 'var(--el-color-primary)' : 'var(--el-text-color-regular)'
            " :size="12" />
        </div>
      </div>
      <div class="control_buton">
        <!-- 同步光照时间 -->
        <div class="control_buton_item" @mouseenter="hoverHighLight = 5" @mouseleave="hoverHighLight = -1"
          title="同步光照时间" @click="syncIllumination">
          <es-icon :name="'tongbu_weixuanzhong'" :color="hoverHighLight === 5 || xbsjEarthUi.activeViewer?.timeSync
            ? 'var(--el-color-primary)'
            : 'var(--el-text-color-regular)'
            " :size="14" />
        </div>
      </div>
    </div>
    <!-- 时间线部分 -->
    <div class="timeLine">
      <PlayerTime :abRange="abRange" @changeAbRange="abRange = true"></PlayerTime>
    </div>
    <div class="time_close" @click="animationShow = false">x</div>
  </div>
</template>
<script setup lang="ts">
import { XbsjEarthUi } from '../../../scripts/xbsjEarthUi'
import { ref, inject, onMounted, watch, onBeforeUnmount } from 'vue'
import { createVueDisposer, toVR } from 'earthsdk-ui'
import PlayerTime from './timeline/PlayerTime.vue'
import { timestampToTime } from '@/utils'
const xbsjEarthUi = inject('xbsjEarthUi') as XbsjEarthUi
const d = createVueDisposer(onBeforeUnmount)
const time = ref<HTMLElement>() //dom元素
const controlRateDrag = ref<HTMLElement>() //拖动小按钮dom元素
const controlRate = ref<HTMLElement>()
const rateDragLeft = ref(50) //按钮的left
const currentTime = toVR<number>(d, [xbsjEarthUi.pathAnimationManager.player, 'currentTime']) //播放器的当前时间
const playing = toVR<boolean>(d, [xbsjEarthUi.pathAnimationManager.player, 'playing'])
const loop = toVR<boolean>(d, [xbsjEarthUi.pathAnimationManager.player, 'loop'])
const abRange = ref(false)
const speed = toVR<number>(d, [xbsjEarthUi.pathAnimationManager.player, 'speed'])
const animationShow = toVR<boolean>(d, [xbsjEarthUi, 'animationShow'])

const hoverHighLight = ref(-1) //小滑块划过高亮
const loopChange = () => {
  if (!abRange.value) return
  loop.value = !loop.value
}
const abRangeChange = () => {
  abRange.value = !abRange.value
  if (!abRange.value) loop.value = false
}
const beCurrentTime = () => {
  const currentTimestamp = new Date().getTime()
  currentTime.value = currentTimestamp
  speed.value = 1
}
const syncIllumination = () => {
  if (xbsjEarthUi.activeViewer) {
    const timeSync = xbsjEarthUi.activeViewer.timeSync
    xbsjEarthUi.activeViewer.timeSync = !timeSync
  }
}
///////
//滑动速率滑块
function onRateDragMouseDown() {
  // 在滚动条上拖动左滑块
  //@ts-ignore
  const leftX = controlRate.value.getBoundingClientRect().left // 滑动条左端距离屏幕可视区域左边界的距离
  document.onmousemove = (e: MouseEvent) => {
    let realleft
    const left = e.clientX - leftX
    //@ts-ignore
    const controlRateWidth = controlRate.value.offsetWidth
    if (left < 0) {
      realleft = 0
    } else if (left >= 0 && left < controlRateWidth - 2) {
      realleft = left
    } else {
      realleft = controlRateWidth - 2
    }
    speed.value = Number((2 ** (((100 / 106) * realleft - 50) / 5)).toFixed(5))
  }
  document.onmouseup = () => {
    document.onmousemove = null
  }
}

watch(
  speed,
  (val) => {
    rateDragLeft.value = ((Math.log2(val) * 5 + 50) * 106) / 100
  },
  { immediate: true }
)
//点击框的时候速率滑块的位置
function RateDragClick(e: any) {
  //@ts-ignore
  const leftX = controlRate.value.getBoundingClientRect().left // 滑动条左端距离屏幕可视区域左边界的距离
  const left = e.clientX - leftX
  speed.value = Number((2 ** (((100 / 106) * left - 50) / 5)).toFixed(5))
}
//动态修改整的dom元素的宽度
xbsjEarthUi.navigatorManager.dispose(
  xbsjEarthUi.navigatorManager.timeLineWidthChanged.disposableOn((val) => {
    if (time.value) {
      time.value.style.width = val
    }
  })
)
onMounted(() => {
  //初始化整个dom的宽度
  if (time.value) {
    time.value.style.width = xbsjEarthUi.navigatorManager.timeLineWidth
  }
})
</script>
<style scoped src="../../../css/TimeLine.css"></style>
