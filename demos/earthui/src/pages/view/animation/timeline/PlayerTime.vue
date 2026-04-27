<template>
  <div class="player_barbox">
    <!-- 上面的按钮和时间线 -->
    <div class="player_barbox_top">
      <!-- 添加删除按钮 -->
      <div class="control_list_button">
        <div class="control_list_button_title">动画列表</div>
        <div class="control_buton_item" @mouseenter="hoverHighLight = 1" @mouseleave="hoverHighLight = -1"
          @click="addChannel" title="添加">
          <es-icon :name="'tianjia_2'"
            :color="hoverHighLight === 1 ? 'var(--el-color-primary)' : 'var(--el-text-color-regular)'" :size="12" />
        </div>
        <div class="control_buton_item" :class="{ 'disabled-element': channelFlagLength < 1 }"
          @mouseenter="hoverHighLight = 2" @mouseleave="hoverHighLight = -1" @click="chanelDelete" title="删除">
          <es-icon :name="'shanchu_1'" :color="channelFlagLength < 1
            ? 'var(--el-text-color-disabled)'
            : hoverHighLight === 2
              ? 'var(--el-color-primary)'
              : 'var(--el-text-color-regular)'
            " :size="12" />
        </div>
        <div class="control_buton_item" :class="{ 'disabled-element': channelFlagLength !== 1 }"
          @mouseenter="hoverHighLight = 3" @mouseleave="hoverHighLight = -1" @click="chanelItem" title="修改">
          <es-icon :name="'bianji_weixuanzhong'" :color="channelFlagLength !== 1
            ? 'var(--el-text-color-disabled)'
            : hoverHighLight === 3
              ? 'var(--el-color-primary)'
              : 'var(--el-text-color-regular)'
            " :size="11" />
        </div>
      </div>
      <!-- 上方时间线 -->
      <div class="time_player_scale">
        <div class="player_scale" :style="{ width: `${totaltimeAxis * xScale}px` }">
          <div v-for="(item, index) in playerScaleList" :key="item.id" class="scale_bigItem">
            <div v-for="ite in playerScaleListItem" :key="ite.id" class="scale_item"></div>
            <span v-if="(index + 1) % 2 === 0" class="scale_number">{{
              timestampToTime(item.value, true)
            }}</span>
          </div>
        </div>
        <!-- icon  B -->
        <div v-if="abRange" :style="{
          position: 'absolute',
          left: `${((stopTimeRef - playerStarttimeAxis) / 1000) * xScale - 8}px`,
          top: '22px'
        }">
          <es-icon :name="'B-copy'" :color="'var(--el-text-color-regular)'" :size="12" />
        </div>
        <!-- icon  A -->
        <div v-if="abRange" :style="{
          position: 'absolute',
          left: `${((startTimeRef - playerStarttimeAxis) / 1000) * xScale - 8}px`,
          top: '22px'
        }">
          <es-icon :name="'A-copy'" :color="'var(--el-text-color-regular)'" :size="12" />
        </div>
        <!-- icon  current -->
        <div :style="{
          position: 'absolute',
          left: `${((currentTime - playerStarttimeAxis) / 1000) * xScale - 8}px`,
          top: '20px'
        }">
          <es-icon :name="'liang'" :color="'var(--el-color-primary)'" :size="12" />
        </div>
      </div>
    </div>
    <!-- 下面的列表和时间线 -->
    <div class="player_barbox_bottom">
      <!-- 下面的左侧列表 -->
      <div class="player_barbox_bottom_list">
        <div v-for="(item, index) in channelsRef" :key="item.pathId" @dblclick="changeChannelTime(item)">
          <span class="player_barbox_bottom_list_icon"><es-icon :name="'donghua'"
              :color="'var(--el-text-color-regular)'" :size="14" /></span>
          <span class="player_barbox_bottom_list_name" :title="getName(item.pathId)">{{
            getName(item.pathId)
          }}</span>
          <span class="player_barbox_bottom_list_icon" style="cursor: pointer"
            @click.stop="changeDeleteCheck(index)"><es-icon :name="item.flag ? 'checked' : 'unchecked'"
              :color="item.flag ? 'var(--el-text-color-regular)' : 'var(--el-text-color-disabled)'" :size="16" /></span>
        </div>
      </div>
      <!-- 总时间段背景 -->
      <div v-if="abRange" :style="{
        position: 'absolute',
        left: `${((startTimeRef - playerStarttimeAxis) / 1000) * xScale + 200}px`,
        top: '0',
        width: `${((stopTimeRef - startTimeRef) / 1000) * xScale}px`,
        height: `${totalItemHeight}px`,
        background: 'rgba(121, 161, 255, 0.3)'
      }"></div>
      <!-- 下面的线段 -->
      <div class="player_barbox_bottom_border">
        <div v-for="(item, index) in channels && channels.length > 5 ? channels.length : 5" :key="index"></div>
      </div>
      <div class="player_barbox_bottom_left">
        <div v-for="(item, index) in channels && channels.length > 5 ? channels.length : 5" :key="index"></div>
      </div>
      <!-- 时间线 -->
      <div class="time_player_list">
        <svg :width="totaltimeAxis * xScale" :height="totalItemHeight" preserveAspectRatio="none"
          :viewBox="`0 0 ${totaltimeAxis * xScale} ${totalItemHeight}`" @pointerdown="pointerdown"
          @pointerup="pointerup" @pointermove="pointermove" @pointerover="pointerover" @pointerout="pointerout"
          @wheel="wheel">

          <!-- 所有时间段的数组 -->
          <PathItem v-for="(item, index) in channelsRef" :scene-id="item.pathId" :index="index" :xScale="xScale"
            :playerStarttimeAxis="playerStarttimeAxis"></PathItem>
          <!-- 循环开始时间的线 -->
          <line v-if="abRange" class="current-time-line" :x1="((startTimeRef - playerStarttimeAxis) / 1000) * xScale"
            :x2="((startTimeRef - playerStarttimeAxis) / 1000) * xScale" y1="0" :y2="totalItemHeight"
            stroke="var(--el-text-color-regular)" :stroke-width="2" name="startTimeLine" />
          <!-- 循环结束时间的线 -->
          <line v-if="abRange" class="last-time-line" :x1="((stopTimeRef - playerStarttimeAxis) / 1000) * xScale"
            :x2="((stopTimeRef - playerStarttimeAxis) / 1000) * xScale" y1="0" :y2="totalItemHeight"
            stroke="var(--el-text-color-regular)" :stroke-width="2" name="lastTimeLine" />

          <!-- 倒三角形图标，在 current-time-line 的正上方，位置是当前时间的时间线位置 -->
          <!-- <path fill="var(--el-color-primary)" name="triangleIcon" d="M5 0 L0 4 L10 4 Z M0 4 L10 4 L10 12 L0 12 Z"
            transform="`translate(${((currentTime - playerStarttimeAxis) / 1000) * xScale - 5}, 0)`" /> -->
          <!-- 当前时间的时间线 -->
          <line class="current-time-line" :x1="((currentTime - playerStarttimeAxis) / 1000) * xScale"
            :x2="((currentTime - playerStarttimeAxis) / 1000) * xScale" y1="0" :y2="totalItemHeight"
            stroke="var(--el-color-primary)" :stroke-width="3" name="currentTimeLine" />
        </svg>
      </div>
      <div v-show="textInfo.show" style="
          pointer-events: none;
          font-size: 12px;
          background: rgba(0, 0, 0, 0.8);
          color: rgba(255, 255, 255, 0.8);
          padding: 3px 5px 3px 5px;
          border-radius: 3px;
          white-space: nowrap;
        " :style="{
          position: 'absolute',
          left: `${textInfo.x}px`,
          top: `${textInfo.y}px`
        }">
        {{ textInfo.text }}
      </div>
    </div>
  </div>
  <AddChanel v-if="addChanelIsShow" @close="addChanelIsShow = false" @ok="ok" :path="path" :location="location">
  </AddChanel>
</template>
<script setup lang="ts">
import { timestampToTime } from '@/utils'
import { createVueDisposer, messageBox, toVR } from 'earthsdk-ui'
import { ESPath } from 'earthsdk3'
import { ElMessage } from 'element-plus'
import { computed, inject, onBeforeUnmount, reactive, ref, watch } from 'vue'
import { XbsjEarthUi } from '../../../../scripts/xbsjEarthUi'
import AddChanel from './AddChanel.vue'
import PathItem from './PathItem.vue'
import {
  CurrentTimeLineDragger,
  Dragger,
  LastTimeLineDragger,
  PlayingChannelLeftLineDragger,
  PlayingChannelRightLineDragger,
  PlayingRectLineDragger,
  StartTimeLineDragger
} from './playerEditorTools'
const props = withDefaults(
  defineProps<{
    abRange: boolean
  }>(),
  {}
)
const xbsjEarthUi = inject('xbsjEarthUi') as XbsjEarthUi
const d = createVueDisposer(onBeforeUnmount)
const emits = defineEmits(['changeAbRange'])
//播放器的属性
const startTime = toVR<number>(d, [xbsjEarthUi.pathAnimationManager.player, 'startTime']) //播放器的开始时间
const stopTime = toVR<number>(d, [xbsjEarthUi.pathAnimationManager.player, 'stopTime']) //播放器的结束时间
const channels = toVR<{ pathId: string; sceneObjectIds: string[] }[]>(d, [
  xbsjEarthUi.pathAnimationManager,
  'channels'
]) //动画的列表
const currentTime = toVR<number>(d, [xbsjEarthUi.pathAnimationManager.player, 'currentTime']) //播放器的当前时间
const hoverHighLight = ref(-1) //小滑块划过高亮
const path = ref()
const location = ref()
const animationIndex = ref(-1)
const playerStoptimeAxis = ref(86400000) //时间轴的结束时间
const playerStarttimeAxis = ref(0) //时间轴的开始时间
const totaltimeAxis = computed(() => {
  //时间轴的长度
  const a = (playerStoptimeAxis.value - playerStarttimeAxis.value) / 1000
  return a
})
/////////////// 获取今天的开始时间戳，初始化时间轴
const startOfToday = new Date()
startOfToday.setHours(0, 0, 0, 0)
const startTimestamp = startOfToday.getTime() //今天的起始时间
playerStarttimeAxis.value = startTimestamp //初始化时间轴的开始时间
setTimeout(() => {
  currentTime.value = startTimestamp //初始化播放器的当前
}, 100)
playerStoptimeAxis.value = playerStarttimeAxis.value + 86400000 //初始化时间轴的结束时间
const startTimeRef = ref(0) //循环开始时间
startTimeRef.value = playerStarttimeAxis.value + 28800000 //初始化循环时间的开始时间
const stopTimeRef = ref(0) //循环结束时间//初始化时间轴的结束时间
stopTimeRef.value = playerStarttimeAxis.value + 43200000 //初始化循环时间的结束时间
const xScale = ref(0.016) //线段的间隔比例
const totalItemHeight = computed(
  () => 21.2 * (channels.value && channels.value.length > 5 ? channels.value.length : 5)
) //根据列表计算的总高
const textInfo = reactive({ x: 0, y: 0, show: false, text: '' }) //划过时间的信息
const playerScaleList = computed(() => {
  //时间线的间隔
  const length = totaltimeAxis.value * xScale.value
  const list = []
  for (let i = 0; i <= length; i += 80) {
    const value = Math.round(i / xScale.value)
    const item = {
      id: getUuid(),
      value: value * 1000 + playerStarttimeAxis.value
    }
    list.push(item)
  }
  return list
})
const playerScaleListItem = computed(() => {
  //小时间线的间隔
  const length = 80
  const list = []
  for (let i = 0; i < length; i += 8) {
    const item = {
      id: getUuid(),
      value: i
    }
    list.push(item)
  }
  return list
})
const addChanelIsShow = ref(false) //添加面板的显示
const channelsRef = ref<
  {
    //ui上的动画列表
    pathId: string
    flag: boolean
    sceneObjectIds: string[]
  }[]
>([])
watch(
  () => props.abRange,
  (val) => {
    if (val) {
      startTime.value = startTimeRef.value
      stopTime.value = stopTimeRef.value
    } else {
      startTime.value = playerStarttimeAxis.value
      stopTime.value = playerStoptimeAxis.value
    }
  }
)
watch(
  playerStarttimeAxis,
  (val) => {
    if (props.abRange) return
    startTime.value = val
  },
  { immediate: true }
)
watch(
  playerStoptimeAxis,
  (val) => {
    if (props.abRange) return
    stopTime.value = val
  },
  { immediate: true }
)

watch(
  startTimeRef,
  (val) => {
    if (!props.abRange) return
    startTime.value = val
    if (playerStarttimeAxis.value >= val) {
      playerStarttimeAxis.value = val
    }
  },
  { immediate: true }
)
watch(
  stopTimeRef,
  (val) => {
    if (!props.abRange) return
    stopTime.value = val
    if (playerStoptimeAxis.value <= val + 3600000) {
      playerStoptimeAxis.value = val + 3600000
    }
  },
  { immediate: true }
)
watch(currentTime, (val) => {
  if (playerStoptimeAxis.value <= val + 3600000) {
    playerStoptimeAxis.value = val + 3600000
  }
  if (playerStarttimeAxis.value >= val) {
    playerStarttimeAxis.value = val
  }
})
const ok = (list: { pathId: string; sceneObjectIds: string[] }, flag: boolean) => {
  //点击确认添加
  const ch = [...channels.value]
  let isDefault = 0
  if (!flag) {
    ch[animationIndex.value] = list
    ElMessage.success('修改动画成功')
  } else {
    ch.forEach((item) => {
      if (item.pathId === list.pathId) {
        isDefault++
        return
      }
    })
    if (isDefault > 0) {
      ElMessage.warning('已经存在相同id的路径动画，请检查')
      return
    }
    ch.push(list)
    ElMessage.success('添加动画成功')
  }
  channels.value = ch
}
xbsjEarthUi.dispose(
  xbsjEarthUi.pathAnimationManager.channelsChanged.disposableOn((val) => {
    const v = [...val]
    let ch: {
      pathId: string
      flag: boolean
      sceneObjectIds: string[]
    }[] = []
    if (v.length > 0) {
      v.forEach((item) => {
        ch.push({
          pathId: item.pathId,
          sceneObjectIds: item.sceneObjectIds,
          flag: false
        })
      })
    }
    channelsRef.value = ch
  })
)
const channelFlagLength = computed(() => {
  let l = 0
  channelsRef.value.forEach((item) => {
    if (item.flag) l++
  })
  return l
})
const changeDeleteCheck = (index: number) => {
  channelsRef.value[index].flag = !channelsRef.value[index].flag
}
const addChannel = () => {
  path.value = ''
  location.value = []
  animationIndex.value = -1
  addChanelIsShow.value = true
}
const chanelDelete = () => {
  let l = 0
  channelsRef.value.forEach((item) => {
    if (item.flag) {
      l++
    }
  })
  if (l < 1) {
    ElMessage.warning('未选中任何动画，请选择之后再操作')
    return
  }
  messageBox({ text: '确认删除动画吗?' })
    .then(() => {
      let ch: {
        pathId: string
        sceneObjectIds: string[]
      }[] = []
      channelsRef.value.forEach((item) => {
        if (!item.flag) {
          ch.push({
            pathId: item.pathId,
            sceneObjectIds: item.sceneObjectIds
          })
        }
      })
      channels.value = ch
      ElMessage.success('删除成功')
    })
    .catch((err) => { })
}
const chanelItem = () => {
  let l = 0
  let el: {
    pathId: string
    flag: boolean
    sceneObjectIds: string[]
    index: number
  }[] = []
  channelsRef.value.forEach((item, index) => {
    if (item.flag) {
      l++
      el.push({
        pathId: item.pathId,
        flag: item.flag,
        sceneObjectIds: item.sceneObjectIds,
        index: index
      })
    }
  })
  if (l !== 1) {
    ElMessage.warning('请仅选择一个动画进行修改')
    return
  }
  path.value = el[0].pathId
  location.value = el[0].sceneObjectIds
  animationIndex.value = el[0].index
  addChanelIsShow.value = true
}
const getName = (id: string) => {
  const scene = xbsjEarthUi.getSceneObjectById(id) as ESPath
  let name = ''
  if (scene) {
    name = scene.name
  }
  return name
}
const changeChannelTime = (item: { pathId: string; flag: boolean; sceneObjectIds: string[] }) => {
  const sceneObject = xbsjEarthUi.getSceneObjectById(item.pathId) as ESPath
  if (sceneObject && sceneObject.timeStamps) {
    emits('changeAbRange')
    const timeStamps = [...sceneObject.timeStamps]
    startTimeRef.value = timeStamps[0]
    stopTimeRef.value = timeStamps[timeStamps.length - 1]
  }
}
function getUuid() {
  //创建随机id
  var d = new Date().getTime()
  if (window.performance && typeof window.performance.now === 'function') {
    d += performance.now()
  }
  var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = ((d + Math.random() * 16) % 16) | 0
    d = Math.floor(d / 16)
    return (c == 'x' ? r : (r & 0x3) | 0x8).toString(16)
  })
  return uuid
}
const pointerdown = (event: PointerEvent) => {
  if (!event.target) {
    return
  }
  resetCurrentDragger()
  const dom = event.target as HTMLElement
  const name = dom.getAttribute('name')
  if (!name) {
    return
  }
  if (name === 'startTimeLine') {
    currentDragger = new StartTimeLineDragger(event, xScale, startTimeRef)
  } else if (name === 'currentTimeLine') {
    currentDragger = new CurrentTimeLineDragger(event, xScale, currentTime)
  } else if (name === 'lastTimeLine') {
    currentDragger = new LastTimeLineDragger(event, xScale, stopTimeRef)
  } else if (name === 'channel_rect') {
    const index = +(dom.getAttribute('index') ?? 0)
    currentDragger = new PlayingRectLineDragger(event, xScale, index, xbsjEarthUi, channelsRef)
  } else if (name === 'channel_left_line') {
    const index = +(dom.getAttribute('index') ?? 0)
    currentDragger = new PlayingChannelLeftLineDragger(
      event,
      xScale,
      index,
      xbsjEarthUi,
      channelsRef
    )
  } else if (name === 'channel_right_line') {
    const index = +(dom.getAttribute('index') ?? 0)
    currentDragger = new PlayingChannelRightLineDragger(
      event,
      xScale,
      index,
      xbsjEarthUi,
      channelsRef
    )
  }
}
let currentDragger: Dragger | undefined = undefined

const resetCurrentDragger = () => {
  if (currentDragger) {
    currentDragger.destroy()
    currentDragger = undefined
  }
}
const pointerup = (event: PointerEvent) => {
  event.target && (event.target as HTMLElement).releasePointerCapture(event.pointerId)
  resetCurrentDragger()
}
const pointermove = (event: PointerEvent) => {
  if (currentDragger) {
    currentDragger.update(event)
  }
  const dom = event.target as HTMLElement
  const name = dom.getAttribute('name')
  if (!name) {
    return
  }
  textInfo.x = event.offsetX
  textInfo.y = event.offsetY
  if (['channel_rect', 'channel_left_line', 'channel_right_line'].includes(name)) {
    const index = +(dom.getAttribute('index') ?? 0)
    if (channels.value) {
      const { pathId, sceneObjectIds } = channels.value[index]
      const sceneObj = xbsjEarthUi.getSceneObjectById(pathId) as ESPath
      if (sceneObj) {
        textInfo.show = true
        textInfo.text = `名称: ${sceneObj.name}, 起始时刻：${timestampToTime(sceneObj.timeStamps ? sceneObj.timeStamps[0] : 0, true)}, 结束时刻${timestampToTime(sceneObj.timeStamps ? sceneObj.timeStamps[sceneObj.timeStamps.length - 1] : 0, true)}`
      }
    }
  } else if (name === 'startTimeLine') {
    textInfo.show = true
    textInfo.text = `开始时刻: ${timestampToTime(startTimeRef.value, true)}`
  } else if (name === 'lastTimeLine') {
    textInfo.show = true
    textInfo.text = `结束时刻: ${timestampToTime(stopTimeRef.value, true)}`
  } else if (name === 'currentTimeLine') {
    textInfo.show = true
    textInfo.text = `当前时刻: ${timestampToTime(currentTime.value, true)}`
  }
}
const pointerover = (event: PointerEvent) => { }
const pointerout = () => {
  textInfo.show = false
  resetCurrentDragger()
}
const wheel = (event: WheelEvent) => {
  const w = event.deltaY / -100
  xScale.value *= 1 + w * 0.1
  const min = 100 / totaltimeAxis.value
  if (xScale.value < min) {
    xScale.value = min
  }
  if (xScale.value > 0.1) {
    xScale.value = 0.1
  }
}
</script>
<style scoped src="../../../../css/TimeLine.css"></style>
