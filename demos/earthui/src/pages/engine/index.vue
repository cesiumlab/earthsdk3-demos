<script setup lang="ts">
import Button from '@/components/Button.vue'
import RightList from '@/components/RightList.vue'
import { LocalStorageKey } from '@/constants'
import { $g_objm } from '@/global'
import { createVueDisposer, getESSSOption, toVR } from 'earthsdk-ui'
import { onBeforeUnmount } from 'vue'

const xbsjEarthUi = $g_objm();
const d = createVueDisposer(onBeforeUnmount);
const activeViewerType = toVR<string>(d, [xbsjEarthUi, 'activeViewerType']);

const switchToViewer = async (type: 'ESCesiumViewer' | 'ESUeViewer' | 'ESOlViewer') => {

  const option = {
    container: 'viewersContainer',
    type: type,
    options: undefined as any,
    id: 'earthui-active-viewer-id'
  }

  if (type === 'ESUeViewer') {
    const esssUrl = window.localStorage.getItem(LocalStorageKey.Earth_UI_ESSS_SERVER_URL) ?? 'http://localhost:9007/';
    const options = await getESSSOption(esssUrl);
    if (!options) return;
    window.localStorage.setItem(LocalStorageKey.Earth_UI_ESSS_SERVER_URL, options.uri);
    option.options = {
      uri: options.uri,
      app: options.app,
      destroy: true
    }
  }

  xbsjEarthUi.switchViewer(option);
}



</script>

<template>
  <RightList :title="'引擎'" :isTop="true">
    <div class="engine_title">
      推荐搭配使用ESSS信令服务器软件,<a href="https://bjxbsj.cn/esss.html" target="_blank">请点击此处下载</a>
    </div>
    <Button :name="'qiehuanUE'" :content="'UE'" :click="() => switchToViewer('ESUeViewer')"
      :actived="activeViewerType === 'ESUeViewer'" :left-button="true"></Button>

    <Button :name="'qiehuan_cesium'" :content="'Cesium'" :actived="activeViewerType === 'ESCesiumViewer'"
      :click="() => switchToViewer('ESCesiumViewer')"></Button>

    <Button :left-button="true" :name="'Openlayers'" :actived="activeViewerType === 'ESOlViewer'"
      :content="'Openlayers'" :click="() => switchToViewer('ESOlViewer')"></Button>

  </RightList>
</template>
<style scoped>
.engine_title {
  width: 100%;
  margin: 10px;
  margin-top: 0;
  color: var(--el-text-color);
  font-size: 14px;
}

.engine_title>a {
  color: var(--el-color-primary);
}
</style>
