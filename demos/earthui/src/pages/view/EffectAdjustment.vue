<script setup lang='ts'>
import { inject, onBeforeUnmount, ref } from "vue";
import { createVueDisposer, toVR } from 'earthsdk-ui';
import Button from "../../components/Button.vue";
import RightList from "../../components/RightList.vue";
import { XbsjEarthUi } from "../../scripts/xbsjEarthUi";
import Fov from "./effectAdjustment/Fov.vue";
import ScreenPercentage from "./effectAdjustment/ScreenPercentage.vue";
import AntiAliasingMethod from "./effectAdjustment/AntiAliasingMethod.vue";
import FlyToBoundingSize from "./effectAdjustment/FlyToBoundingSize.vue";
import SceneBackgroundColor from "./effectAdjustment/SceneBackgroundColor.vue";
import SceneGlobeBaseColor from "./effectAdjustment/SceneGlobeBaseColor.vue";
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
        <Button :name="'huamianbili'" :content="'画面比例'" :actived="objType === 'screenPercentage'"
            :click="() => { objType === 'screenPercentage' ? objType = '' : objType = 'screenPercentage' }"
            :left-button="false"></Button>
        <Button :name="'kangjuchi'" :content="'抗锯齿方法'" :actived="objType === 'antiAliasingMethod'"
            :click="() => { objType === 'antiAliasingMethod' ? objType = '' : objType = 'antiAliasingMethod' }"
            :left-button="true"></Button>
        <Button :name="'diqiuyouhuisebeijingyanse'" :content="'地球基础色'" :actived="objType === 'sceneGlobeBaseColor'"
            :click="() => { objType === 'sceneGlobeBaseColor' ? objType = '' : objType = 'sceneGlobeBaseColor' }"
            :left-button="true"></Button>
        <Button :name="'beijingse'" :content="'场景背景色'" :actived="objType === 'sceneBackgroundColor'"
            :click="() => { objType === 'sceneBackgroundColor' ? objType = '' : objType = 'sceneBackgroundColor' }"
            :left-button="true"></Button>
        <Fov v-if="objType === 'fov'"></Fov>
        <FlyToBoundingSize v-if="objType === 'flyToBoundingSize'"></FlyToBoundingSize>
        <ScreenPercentage v-if="objType === 'screenPercentage'"></ScreenPercentage>
        <AntiAliasingMethod v-if="objType === 'antiAliasingMethod'"></AntiAliasingMethod>
        <SceneGlobeBaseColor v-if="objType === 'sceneGlobeBaseColor'"></SceneGlobeBaseColor>
        <SceneBackgroundColor v-if="objType === 'sceneBackgroundColor'"></SceneBackgroundColor>

    </RightList>
</template>
<style scoped></style>