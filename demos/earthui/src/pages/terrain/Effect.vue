<script setup lang='ts'>
import { inject, onBeforeUnmount } from 'vue';
import { createVueDisposer, toVR } from 'earthsdk-ui';
import RightList from '../../components/RightList.vue';
import Button from '../../components/Button.vue';
import { XbsjEarthUi } from '../../scripts/xbsjEarthUi';
const xbsjEarthUi = inject('xbsjEarthUi') as XbsjEarthUi

const d = createVueDisposer(onBeforeUnmount);
const ueIsShow = toVR<boolean>(d, [xbsjEarthUi, 'ueIsShow'])
const globeShow = toVR<boolean>(d, [xbsjEarthUi.activeViewer, 'globeShow'])//显示地球
const depthTestAgainstTerrain = toVR<boolean>(d, [xbsjEarthUi.activeViewer, 'depthTestAgainstTerrain'])//深度检测
</script>
<template>
    <RightList :title="'效果'">
        <Button :name="'xianshidiqiu'" :content="'显示地球'" :click="() => { globeShow = !globeShow }" :actived="globeShow"
            :left-button="true"></Button>
        <Button :name="'shendujiance'" :content="'深度检测'"
            :click="() => { depthTestAgainstTerrain = !depthTestAgainstTerrain }" :actived="depthTestAgainstTerrain"
            v-if="!ueIsShow"></Button>
    </RightList>
</template>
