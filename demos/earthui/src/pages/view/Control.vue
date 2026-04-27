<script setup lang="ts">
import { inject, onBeforeUnmount } from 'vue'
import { createVueDisposer, toVR } from 'earthsdk-ui'
import Button from '../../components/Button.vue'
import RightList from '../../components/RightList.vue'
import { XbsjEarthUi } from '../../scripts/xbsjEarthUi'
const xbsjEarthUi = inject('xbsjEarthUi') as XbsjEarthUi

const disposer = createVueDisposer(onBeforeUnmount)
const showSceneTreeViewRef = toVR<boolean>(disposer, [xbsjEarthUi, 'showSceneTreeView'])
const showCompassRef = toVR<boolean>(disposer, [xbsjEarthUi.navigatorManager, 'navigatorShow'])
const showDistanceLegendRef = toVR<boolean>(disposer, [xbsjEarthUi.navigatorManager, 'scaleShow'])
const showstatusBarRef = toVR<boolean>(disposer, [xbsjEarthUi.navigatorManager, 'statusBarShow'])
</script>
<template>
  <RightList :title="'控件'" :is-top="true">
    <Button :name="'tucengguanli'" :content="'图层面板'" :click="() => {
      showSceneTreeViewRef = !showSceneTreeViewRef
    }
      " :actived="showSceneTreeViewRef" :left-button="true"></Button>
    <Button :name="'daohangkongjian'" :content="'指北针'" :click="() => {
      showCompassRef = !showCompassRef
    }
      " :actived="showCompassRef"></Button>
    <Button :name="'bilichi'" :content="'比例尺'" :click="() => {
      showDistanceLegendRef = !showDistanceLegendRef
    }
      " :actived="showDistanceLegendRef" :left-button="true"></Button>
    <Button :name="'zhuangtailan'" :content="'状态栏'" :click="() => {
      showstatusBarRef = !showstatusBarRef
    }
      " :actived="showstatusBarRef"></Button>
  </RightList>
</template>
