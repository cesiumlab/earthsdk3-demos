<script setup lang='ts'>
import { inject, onBeforeUnmount, ref } from "vue";
import { createVueDisposer, toVR } from 'earthsdk-ui';
import Button from "../../components/Button.vue";
import RightList from "../../components/RightList.vue";
import { XbsjEarthUi } from "../../scripts/xbsjEarthUi";
import Fov from "./effectAdjustment/Fov.vue";
import FlyToBoundingSize from "./effectAdjustment/FlyToBoundingSize.vue";
const d = createVueDisposer(onBeforeUnmount);
const xbsjEarthUi = inject('xbsjEarthUi') as XbsjEarthUi
const textAvoidance = toVR<boolean>(d, [xbsjEarthUi.activeViewer, 'textAvoidance']);//文字避让
const objType = ref('')
</script>
<template>
     <RightList :title="'全局效果调整'">
        <Button :name="'wenzibirang'" :content="'文字避让'" :actived="textAvoidance === true"
            :click="() => { textAvoidance = !textAvoidance }" :left-button="true"></Button>
        <Button :name="'FOV1'" :content="'FOV'" :actived="objType === 'fov'"
            :click="() => { objType === 'fov' ? objType = '' : objType = 'fov' }" :left-button="false"></Button>
        <Button :name="'dingweipeizhi'" :content="'定位配置'" :actived="objType === 'flyToBoundingSize'"
            :click="() => { objType === 'flyToBoundingSize' ? objType = '' : objType = 'flyToBoundingSize' }"
            :left-button="true"></Button>
        <!-- <Button :name="'pianyi'" :content="'编辑高度偏移'" :actived="objType === 'editingHeightOffset'"
            :click="() => { objType === 'editingHeightOffset' ? objType = '' : objType = 'editingHeightOffset' }"
            :left-button="false"></Button> -->
        <Fov v-if="objType === 'fov'"></Fov>
        <FlyToBoundingSize v-if="objType === 'flyToBoundingSize'"></FlyToBoundingSize>
        <EditingHeightOffset v-if="objType === 'editingHeightOffset'"></EditingHeightOffset>
    </RightList>
</template>
<style scoped></style>