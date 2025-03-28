<script setup lang='ts'>
import Button from "../../components/Button.vue";
import RightList from "../../components/RightList.vue";
import { XbsjEarthUi } from "../../scripts/xbsjEarthUi";
import { onBeforeUnmount, inject } from "vue";
import { createVueDisposer, toVR } from 'earthsdk-ui';
const d = createVueDisposer(onBeforeUnmount);
const xbsjEarthUi = inject('xbsjEarthUi') as XbsjEarthUi
const { reprocess } = xbsjEarthUi
const shadowsShow = toVR<boolean>(d, [reprocess, 'shadowsShow']);//阴影
const depthOfFieldShow = toVR<boolean>(d, [xbsjEarthUi.activeViewer, 'depthOfField']);//景深
// const autoExposure = toVR<boolean>(d, [xbsjEarthUi.activeViewer, 'autoExposure']);//自动曝光
const ambientOcclusionShow = toVR<boolean>(d, [reprocess, 'ambientOcclusionShow']);//环境遮蔽
const floodlightShow = toVR<boolean>(d, [reprocess, 'floodlightShow']);//泛光
const ueIsShow = toVR<boolean>(d, [xbsjEarthUi, 'ueIsShow'])

</script>
<template>
    <RightList :title="'后处理'">
        <Button :name="'jingshen'" :content="'景深'" :actived="depthOfFieldShow === true"
            :click="() => { depthOfFieldShow = !depthOfFieldShow }" :left-button="true"></Button>
        <Button :name="'yinying'" :content="'阴影'" :actived="shadowsShow" :click="() => { shadowsShow = !shadowsShow }"
            v-if="!ueIsShow"></Button>
        <Button :name="'huanjingzhebi'" :content="'环境遮蔽'" :actived="ambientOcclusionShow"
            :click="() => { ambientOcclusionShow = !ambientOcclusionShow }" v-if="!ueIsShow"
            :left-button="true"></Button>
        <Button :name="'fanguang'" :content="'泛光'" :actived="floodlightShow"
            :click="() => { floodlightShow = !floodlightShow }" v-if="!ueIsShow"></Button>
        <!-- <Button :name="'zidongbaoguang'" :content="'自动曝光'" :actived="autoExposure"
            :click="() => { autoExposure = !autoExposure }" v-if="ueIsShow"></Button> -->
    </RightList>
</template>
<style scoped></style>