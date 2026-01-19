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
    <DraggableDialog
      :title="'图层管理'"
      v-model="showSceneTreeViewRef"
      :leftTop="[500, 45]"
      :minWidthHeight="[300, 450]"
      :widthHeight="[300, 450]"
    >
      <template #prefix>
        <ESIcon name="tucengguanli"></ESIcon>
      </template>
      <template #suffix>
        <div
          class="edit_icon"
          title="编辑器"
          :class="{ edit_icon_active: showEditingBarRef }"
          @click="showEditingBarRef = !showEditingBarRef"
        >
          <ESIcon name="sanweizuobiao"></ESIcon>
        </div>

        <div
          class="edit_icon"
          title="选择器"
          :class="{ edit_icon_active: showCheckbox }"
          @click="redrawFunc(true)"
        >
          <ESIcon name="weixuanzhong"></ESIcon>
        </div>
      </template>

      <div class="Layer_Management">
        <ESFold :show="showEditingBarRef">
          <div class="Layer_Management_editing">
            <Editing></Editing>
          </div>
        </ESFold>
        <div class="Layer_Management_scenetree">
          <SceneTree
            :sceneTree="xbsjEarthUi.sceneTree"
            :showCheckbox="showCheckbox"
            :config="config"
          />
        </div>
      </div>
    </DraggableDialog>

    <!-- 场景树 -->
    <DraggablePopup2 v-if="showSceneTreeViewRef" @close="showSceneTreeViewRef = false" :title="'图层管理'" :width="280"
      :height="'410px'" :left="0" :top="40" :iconName="'tucengguanli'" :checkIconIsShow="true"
      :iconIschecked="sceneTreeCheckedIcon" :checkFun="() => (sceneTreeCheckedIcon = !sceneTreeCheckedIcon)">
      <div class="Layer_Management">
        <div class="Layer_Management_editing">
          <Editing></Editing>
        </div>
        <div class="Layer_Management_scenetree">
          <SceneTreeCom v-if="!!sceneTree" :showCheckBox="sceneTreeCheckedIcon" :clickEmpty="clickEmpty"
            @closeClickEmpty="clickEmpty = false"></SceneTreeCom>
          <div style="height: 20px" @contextmenu.stop.prevent="clickEmpty = true"></div>
        </div>
      </div>
    </DraggablePopup2>

    <!-- 属性栏 -->
    <DraggablePopup2
      v-if="propSceneTree"
      :title="propSceneTree ? propSceneTree.name + '属性面板' : '属性面板'"
      :width="280"
      :height="'370px'"
      :left="0"
      :top="482"
      @close="propSceneTree = undefined"
    >
      <ESPropPanel :treeItem="propSceneTree" :key="propTreeKey"></ESPropPanel>
    </DraggablePopup2>
    <!-- 时间线 -->
    <TimeLine v-show="animationShow"></TimeLine>
    <!-- 拾取面板 -->
    <CzmPickResult
      @close="czmPickResult = false"
      :list="czmPinkList"
      v-if="czmPickResult"
    ></CzmPickResult>

    <!-- 状态栏 指北针 比例尺-->
    <ControlComponent />
  </div>
  <!-- <NewTime></NewTime> -->
</template>

<script setup lang="ts">
import { createVueDisposer, ESFold, ESIcon, toRefKey, toVR } from 'earthsdk-ui'
import { ESCesiumViewer, merge3dTilesServer } from 'earthsdk3-cesium'
import { ESOlViewer } from 'earthsdk3-ol'
import { ESUeViewer } from 'earthsdk3-ue'
import { onBeforeUnmount, onMounted, provide, ref, shallowRef, watch } from 'vue'
import DraggablePopup2 from './components/DraggablePopup2.vue'
import Editing from './components/editing/Editing.vue'
import ESPropPanel from './components/eSPropPanel/ESPropPanel.vue'
import SceneTreeCom from './components/sceneTree/SceneTree.vue'
import ViewersComp from './components/viewers/Viewers.vue'
import { originalNavList } from './pages'
import { timeToTimestamp, timestampToTime } from './pages/environment/fun'
import Menu from './pages/Menu.vue'
import CzmPickResult from './pages/roam/cousePicking/CzmPickResult.vue'
import TimeLine from './pages/view/animation/TimeLine.vue'
import ControlComponent from './pages/view/control/index.vue'
import { initSceneJson, initSceneWithType, initurl } from './scripts/initializationJson'
import { XbsjEarthUi } from './scripts/xbsjEarthUi'

import { DraggableDialog, SceneTree } from 'earthsdk-ui'
import { getIcon } from './constants'
import { SceneTreeItem } from 'earthsdk3'
import { getDefauleMenuContent } from './composables'
import { getTreeItemMenuContent } from './composables/useSceneTreeItemMenu'
const showEditingBarRef = ref(true)

const props = withDefaults(
  defineProps<{
    newList?: any
    navType?: string
  }>(),
  {}
)
const clickEmpty = ref(false)
const xbsjEarthUi = new XbsjEarthUi(ESUeViewer, ESCesiumViewer, ESOlViewer)
const sceneTree = xbsjEarthUi.getSceneTree()
xbsjEarthUi.czmlabPath = location.origin
// @ts-ignore
window.g_xbsjEarthUi = xbsjEarthUi
//@ts-ignore
window.g_xbsjEarthUi.merge3dTilesServer = merge3dTilesServer

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
const showSceneTreeViewRef = toVR<boolean>(disposer, [xbsjEarthUi, 'showSceneTreeView'])
const propSceneTree = toVR<any>(disposer, [xbsjEarthUi, 'propSceneTree'])
const propTreeKey = toRefKey(propSceneTree)
const animationShow = toVR<boolean>(disposer, [xbsjEarthUi, 'animationShow'])
const sceneTreeCheckedIcon = toVR<boolean>(disposer, [xbsjEarthUi, 'sceneTreeCheckedIcon'])

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

const showCheckbox = ref(false)

const config = {
  setSceneTreeItemIcon: getIcon,
  setDefaultMenu: () => {
    return sceneTree ? getDefauleMenuContent(xbsjEarthUi, sceneTree) : []
  },
  setSceneTreeItemMenu: (item: SceneTreeItem) => {
    return sceneTree ? getTreeItemMenuContent(xbsjEarthUi, sceneTree, item) : []
  }
  // onSceneTreeItemClick: (e: MouseEvent, item: SceneTreeItem) => {},
  // onSceneTreeItemDblClick: (e: MouseEvent, item: SceneTreeItem) => {},
  // onOtherClick: (e: MouseEvent) => {},
}

const redrawFunc = (flag: boolean = false) => {
  flag && (showCheckbox.value = !showCheckbox.value)
  const redrawInfo = sceneTree?.uiTree.redrawInfo
  redrawInfo && sceneTree?.uiTree.redrawEvent.emit(redrawInfo)
}
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

.es_PropPanel {
  position: absolute;
  left: -30px;
  top: 0;
  width: 30px;
  height: 30px;
  background: rgba(37, 38, 42, 1);
  border-bottom: 1px solid rgba(17, 17, 17, 1);
  border-left: 1px solid rgba(17, 17, 17, 1);
  box-sizing: border-box;
  cursor: pointer;
  border-bottom-left-radius: 5px;
  border-top-left-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.new_time_line {
  width: 100%;
  height: 200px;
  position: fixed;
  left: 0;
  top: 200px;
}

.Layer_Management {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.Layer_Management_editing {
  width: 100%;
  height: 60px;
  padding: 10px 10px 0 10px;
  box-sizing: border-box;
}

.Layer_Management_scenetree {
  width: 100%;
  flex: 1;
  overflow: auto;
}

.edit_icon {
  width: 24px;
  height: 24px;
  border-radius: var(--el-border-radius-small, 2px);
  color: var(--el-text-color-secondary);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  /* transition: all .2s ease; */
  font-size: 12px;
  margin-left: 4px;

  &:hover {
    background-color: var(--el-fill-color-light);
  }
}

.edit_icon_active {
  color: var(--el-color-primary);
}
</style>
