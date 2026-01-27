<template>
  <!-- 导航以及右侧模块面板 -->
  <HeaderMenu :navList="navList" :navType="navType" :key="navList.length"></HeaderMenu>

  <!-- 视口 -->
  <viewersContainer></viewersContainer>

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

</template>

<script setup lang="ts">
import { createVueDisposer, toVR } from 'earthsdk-ui'
import { ESCesiumViewer, merge3dTilesServer } from 'earthsdk3-cesium'
import { ESOlViewer } from 'earthsdk3-ol'
import { ESUeViewer } from 'earthsdk3-ue'
import { onBeforeUnmount, onMounted, provide, ref, shallowRef, watch } from 'vue'
import SceneTreePanel from './components/business/SceneTreePanel.vue'
import SceneTreePropPanel from './components/business/SceneTreePropPanel.vue'
import viewersContainer from './components/viewers/Viewers.vue'
import { originalNavList } from './pages'
import { timeToTimestamp, timestampToTime } from './pages/environment/fun'
import HeaderMenu from './components/layout/Menu/index.vue'
import CzmPickResult from './pages/roam/cousePicking/CzmPickResult.vue'
import TimeLine from './pages/view/animation/TimeLine.vue'
import ControlComponent from './pages/view/control/index.vue'
import { initSceneJson, initSceneWithType, initurl } from './scripts/initializationJson'
import { XbsjEarthUi } from './scripts/xbsjEarthUi'
import { NavType } from './types'

const props = withDefaults(
  defineProps<{
    newList?: NavType[]
    navType?: string
  }>(),
  {
    newList: () => [],
    navType: 'roam'
  }
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
