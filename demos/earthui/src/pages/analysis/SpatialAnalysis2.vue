<script lang="ts">
import { defineComponent, onBeforeUnmount, ref, inject, onMounted } from 'vue'
import SkylineAnalysis from './spatial/SkylineAnalysis.vue' //天际线组件
import ScreenQuery from './spatial/ScreenQuery.vue' //屏幕查询组件
import { XbsjEarthUi } from '../../scripts/xbsjEarthUi'
export default defineComponent({
  components: {
    SkylineAnalysis,
    ScreenQuery
  }
})
</script>
<script setup lang="ts">
import { createVueDisposer, toVR } from 'earthsdk-ui'
import RightList from '../../components/RightList.vue'
import Button from '../../components/Button.vue'
const disposer = createVueDisposer(onBeforeUnmount)
const xbsjEarthUi = inject('xbsjEarthUi') as XbsjEarthUi
const activeViewerType = toVR<string>(disposer, [xbsjEarthUi, 'activeViewerType'])
const rollerShutter = toVR<boolean>(disposer, [xbsjEarthUi.activeViewer, 'rollerShutter'])
const controlList: {
  zh: string
  type: string
  icon: string
  leftButton: boolean
  hiddenFromUE?: boolean
}[] = [
  {
    type: 'SkylineAnalysis',
    zh: '天际线',
    icon: 'tiji',
    leftButton: false,
    hiddenFromUE: true
  },
  {
    type: 'ScreenQuery',
    zh: '屏幕查询',
    icon: 'tuxingjisuan',
    leftButton: true,
    hiddenFromUE: false
  }
]
const type = ref('')
const changeType = (value: string) => {
  type.value = type.value === value ? '' : value
  cancelEditing()
  if (value == 'ScreenQuery') {
    if (xbsjEarthUi.activeViewer) {
      xbsjEarthUi.activeViewer.stopEditing()
    }

    openEditing()
  }
}

let dispose: (() => void) | null = null

onBeforeUnmount(() => {
  cancelEditing()
})

const openEditing = () => {
  if (!xbsjEarthUi.activeViewer) return
  dispose = xbsjEarthUi.activeViewer.editingEvent.don(() => {
    type.value = ''
  })
}

const cancelEditing = () => {
  if (dispose) {
    dispose()
    dispose = null
  }
}
</script>

<template>
  <RightList :title="'空间分析2'">
    <Button
      v-show="activeViewerType !== 'ESUeViewer'"
      :name="'jiancai'"
      :content="'卷帘分割'"
      :click="
        () => {
          rollerShutter = !rollerShutter
        }
      "
      :actived="rollerShutter"
      :left-button="true"
    ></Button>
    <Button
      v-show="activeViewerType !== 'ESUeViewer' || !item.hiddenFromUE"
      v-for="item in controlList"
      :name="item.icon"
      :content="item.zh"
      :click="
        () => {
          changeType(item.type)
        }
      "
      :actived="type === item.type"
      :left-button="item.leftButton"
    ></Button>

    <component :is="type" />
  </RightList>
</template>

<style scoped>
.control-list {
  display: flex;
  flex-direction: column;
}
</style>
