<script setup lang='ts'>
import { inject, onBeforeUnmount, ref } from 'vue';
import { createVueDisposer, toVR } from 'earthsdk-ui';
import RightList from '../../components/RightList.vue';
import Button from '../../components/Button.vue';
import Float from './effect/Float.vue';
import { XbsjEarthUi } from '../../scripts/xbsjEarthUi';
const xbsjEarthUi = inject('xbsjEarthUi') as XbsjEarthUi
const d = createVueDisposer(onBeforeUnmount);
const globeShow = toVR<boolean>(d, [xbsjEarthUi.activeViewer, 'globeShow'])//显示地球
const depthTestAgainstTerrain = toVR<boolean>(d, [xbsjEarthUi.activeViewer, 'depthTestAgainstTerrain'])//深度检测
const floatShow = ref(false)
</script>
<template>
    <RightList :title="'效果'">
        <Button :name="'xianshidiqiu'" :content="'显示地球'" :click="() => { globeShow = !globeShow }" :actived="globeShow"
            :left-button="true"></Button>
        <Button :name="'shendujiance'" :content="'深度检测'"
            :click="() => { depthTestAgainstTerrain = !depthTestAgainstTerrain }"
            :actived="depthTestAgainstTerrain"></Button>
        <Button :size="17" :name="'a-juxing2221'" :content="'地形透明度'" :click="() => { floatShow = !floatShow }" :left-button="true"
            :actived="floatShow"></Button>
        <Float v-if="floatShow"></Float>
    </RightList>
</template>
