<script setup lang='ts'>
import { ref, onBeforeUnmount, inject } from 'vue';
import CzmAndUeViewer from "./changeView/CzmAndUeViewer.vue";
import { XbsjEarthUi } from "../../scripts/xbsjEarthUi"
import RightList from '../../components/RightList.vue';
import Button from '../../components/Button.vue';
import { createVueDisposer, toVR } from 'earthsdk-ui';
const d = createVueDisposer(onBeforeUnmount);
const xbsjEarthUi = inject('xbsjEarthUi') as XbsjEarthUi
const ueIsShow = toVR<boolean>(d, [xbsjEarthUi, 'ueIsShow'])
const openUeInstall = ref(false)
</script>

<template>
    <RightList :title="'引擎'" :isTop="true">
        <div class="engine_title">
            推荐搭配使用ESSS信令服务器软件,<a href="https://bjxbsj.cn/esss.html" target="_blank">请点击此处下载</a>
        </div>
        <Button :name="'qiehuanUE'" :content="'UE'" :click="() => { openUeInstall = !openUeInstall }"
            :actived="openUeInstall" :left-button="true"></Button>
        <Button :name="'qiehuan_cesium'" :content="'Cesium'" :click="() => {
            xbsjEarthUi.switchToCesiumViewer({
                container: 'viewersContainer',
                destroy: true,
                id: 'earthui-active-viewer-id',
            })
        }" v-if="ueIsShow"></Button>
        <CzmAndUeViewer v-if="openUeInstall" @close="openUeInstall = false">
        </CzmAndUeViewer>
    </RightList>
</template>