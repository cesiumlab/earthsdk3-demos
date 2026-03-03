<template>
  <!-- 导航以及右侧模块面板 -->
  <HeaderMenu></HeaderMenu>

  <!-- 视口 -->
  <viewersContainer></viewersContainer>

  <!-- 新场景树 -->
  <SceneTreePanel></SceneTreePanel>

  <!-- 属性面板 -->
  <SceneTreePropPanel></SceneTreePropPanel>

  <!-- 时间线 -->
  <TimeLine v-show="animationShow"></TimeLine>

  <!-- 拾取面板 -->
  <!-- <CzmPickResult @close="czmPickResult = false" :list="czmPinkList" v-if="czmPickResult"></CzmPickResult> -->

  <!-- 状态栏 指北针 比例尺-->
  <ControlComponent />

</template>

<script setup lang="ts">
import { createVueDisposer, toVR } from 'earthsdk-ui'
import { onBeforeUnmount, onMounted, provide, ref } from 'vue'
import SceneTreePanel from './components/business/SceneTreePanel.vue'
import SceneTreePropPanel from './components/business/SceneTreePropPanel.vue'
import HeaderMenu from './components/layout/Menu/index.vue'
import viewersContainer from './components/layout/Viewers.vue'
import { $g_objm } from './global'
// import CzmPickResult from './pages/roam/cousePicking/CzmPickResult.vue'
import TimeLine from './pages/view/animation/TimeLine.vue'
import ControlComponent from './components/layout/Control.vue'

const xbsjEarthUi = $g_objm();

const sceneTree = xbsjEarthUi.sceneTree;

// const czmPickResult = ref(false)
// const czmPinkList: any = ref()

//所有子组件都可以获取到，不用一层一层传值
provide('sceneTree', sceneTree)

const disposer = createVueDisposer(onBeforeUnmount);
const animationShow = toVR<boolean>(disposer, [xbsjEarthUi, 'animationShow'])

// onMounted(() => {
//   xbsjEarthUi.d(
//     xbsjEarthUi.pickResultChanged.don((val) => {
//       if (!val) {
//         czmPickResult.value = false
//       } else {
//         czmPinkList.value = val
//         czmPickResult.value = true
//       }
//     })
//   )
// })

</script>
