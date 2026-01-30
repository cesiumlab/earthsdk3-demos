<script setup lang="ts">
import { ref, inject, onBeforeUnmount } from 'vue'
import CzmAndUeViewer from './changeView/CzmAndUeViewer.vue'
import { XbsjEarthUi } from '../../scripts/xbsjEarthUi'
import RightList from '../../components/RightList.vue'
import Button from '../../components/Button.vue'
import { createVueDisposer, toVR } from 'earthsdk-ui'

const xbsjEarthUi = inject('xbsjEarthUi') as XbsjEarthUi
const openUeInstall = ref(false)
const d = createVueDisposer(onBeforeUnmount)
const activeViewerType = toVR<string>(d, [xbsjEarthUi, 'activeViewerType'])
</script>

<template>
  <RightList :title="'引擎'" :isTop="true">
    <div class="engine_title">
      推荐搭配使用ESSS信令服务器软件,<a href="https://bjxbsj.cn/esss.html" target="_blank">请点击此处下载</a>
    </div>
    <Button :name="'qiehuanUE'" :content="'UE'" :click="() => {
        openUeInstall = !openUeInstall
      }
      " :actived="openUeInstall || activeViewerType === 'ESUeViewer'" :left-button="true"></Button>
    <Button :name="'qiehuan_cesium'" :content="'Cesium'" :actived="activeViewerType === 'ESCesiumViewer'" :click="() => {
        ; (xbsjEarthUi.switchToCesiumViewer({
          container: 'viewersContainer',
          destroy: true,
          id: 'earthui-active-viewer-id'
        }),
          (openUeInstall = false))
      }
      "></Button>
    <Button :left-button="true" :name="'Openlayers'" :actived="activeViewerType === 'ESOlViewer'"
      :content="'Openlayers'" :click="() => {
          ; (xbsjEarthUi.switchViewer({
            container: 'viewersContainer',
            type: 'ESOlViewer',
            options: { destroy: true },
            id: 'earthui-active-viewer-id'
          }),
            (openUeInstall = false))
        }
        "></Button>
    <CzmAndUeViewer v-if="openUeInstall" @close="openUeInstall = false"> </CzmAndUeViewer>
  </RightList>
</template>
