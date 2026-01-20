<template>
  <div class="xbsj_box">

    <!-- 导航以及模块面板 -->
    <div class="xbsj_header">
      <Menu :navList="navList" :navType="navType" :key="navList.length"></Menu>
    </div>

    <!-- 视口 -->
    <div class="xbsj_earth">
      <ViewersComp></ViewersComp>
    </div>

    <!-- 新场景树 -->
    <SceneTreePanel></SceneTreePanel>

    <!-- 属性面板 -->
    <SceneTreePropPanel></SceneTreePropPanel>

    <!-- 时间线 -->
    <TimeLine v-show="animationShow"></TimeLine>
    <!-- 拾取面板 -->
    <CzmPickResult @close="czmPickResult = false" :list="czmPinkList" v-if="czmPickResult"></CzmPickResult>

    <!-- 状态栏 指北针 比例尺-->
    <ControlComponent />
  </div>
</template>

<script setup lang="ts">
import { createVueDisposer, toRefKey, toVR } from 'earthsdk-ui'
import { ESCesiumViewer, merge3dTilesServer } from 'earthsdk3-cesium'
import { ESOlViewer } from 'earthsdk3-ol'
import { ESUeViewer } from 'earthsdk3-ue'
import { onBeforeUnmount, onMounted, provide, ref, shallowRef, watch } from 'vue'
import SceneTreePanel from './components/SceneTreePanel.vue'
import SceneTreePropPanel from './components/SceneTreePropPanel.vue'
import ViewersComp from './components/viewers/Viewers.vue'
import { originalNavList } from './pages'
import { timeToTimestamp, timestampToTime } from './pages/environment/fun'
import Menu from './pages/Menu.vue'
import CzmPickResult from './pages/roam/cousePicking/CzmPickResult.vue'
import TimeLine from './pages/view/animation/TimeLine.vue'
import ControlComponent from './pages/view/control/index.vue'
import { initSceneJson, initSceneWithType, initurl } from './scripts/initializationJson'
import { XbsjEarthUi } from './scripts/xbsjEarthUi'

const props = withDefaults(
  defineProps<{
    newList?: any
    navType?: string
  }>(),
  {}
)

const xbsjEarthUi = new XbsjEarthUi(ESUeViewer, ESCesiumViewer, ESOlViewer);
const sceneTree = xbsjEarthUi.sceneTree;

xbsjEarthUi.czmlabPath = location.origin;
// @ts-ignore
window.g_xbsjEarthUi = xbsjEarthUi;
// @ts-ignore
window.g_objm = xbsjEarthUi;
//@ts-ignore
window.g_xbsjEarthUi.merge3dTilesServer = merge3dTilesServer;

xbsjEarthUi.jsonLoadingEvent.don(() => {
  initSceneWithType(xbsjEarthUi)
  //设置初始化时间的时间戳
  const date = timeToTimestamp(timestampToTime('12', '00'))
  if (xbsjEarthUi.activeViewer) {
    xbsjEarthUi.activeViewer.currentTime = date
  }
})
initurl(xbsjEarthUi)
initSceneJson(xbsjEarthUi)
const czmPickResult = ref(false)
const czmPinkList: any = ref()
provide('xbsjEarthUi', xbsjEarthUi) //所有子组件都可以获取到，不用一层一层传值
provide('sceneTree', sceneTree) //所有子组件都可以获取到，不用一层一层传值
defineExpose({ objectsManager: xbsjEarthUi, sceneTree })


const disposer = createVueDisposer(onBeforeUnmount)
const animationShow = toVR<boolean>(disposer, [xbsjEarthUi, 'animationShow'])
const navList = shallowRef([...originalNavList])
watch(
  () => props.newList,
  () => {
    if (props.newList) {
      navList.value = originalNavList.concat(props.newList)
    }
  },
  { immediate: true, deep: true }
)

onMounted(() => {
  xbsjEarthUi.d(
    xbsjEarthUi.pickResultChanged.don((val) => {
      if (!val) {
        czmPickResult.value = false
      } else {
        czmPinkList.value = val
        czmPickResult.value = true
      }
    })
  )
})
</script>

<style scoped>
.xbsj_box {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
}

.xbsj_header {
  width: 100%;
  height: 40px;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 1000;
  background-color: var(--el-bg-color);
  border-bottom: 1px solid var(--el-border-color);
  box-sizing: border-box;
}

.xbsj_earth {
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
}
</style>
