<script setup lang='ts'>
import { createVueDisposer, toVR } from "earthsdk-ui";
import { inject, onBeforeUnmount, onMounted, ref } from 'vue';
import Button from '../../components/Button.vue';
import RightList from '../../components/RightList.vue';
import { XbsjEarthUi } from '../../scripts/xbsjEarthUi';
import Follow from "./interaction/Follow.vue";
import Line from "./interaction/Line.vue";
import Map from "./interaction/Map.vue";
import RotateGlobe from "./interaction/RotateGlobe.vue";
import RotatePoint from "./interaction/RotatePoint.vue";
import Walk from "./interaction/Walk.vue";

const xbsjEarthUi = inject('xbsjEarthUi') as XbsjEarthUi
const d = createVueDisposer(onBeforeUnmount);
const roamMode = toVR<string>(d, [xbsjEarthUi, 'roamMode'])
const mode = ref('Map')
onMounted(() => {
    const roamDispose = xbsjEarthUi.roamModeChanged.don((val: string) => {
        if (val === 'Map') {
            mode.value = 'Map'
        }
    })
    onBeforeUnmount(() => {
        changeMapMode()
        roamDispose()
    })
})
//修改模式为第一人称
const changeWalkMode = () => {
    if (mode.value === 'Walk') return
    const viewer = xbsjEarthUi.activeViewer
    if (!viewer) return
    viewer.changeToMap()
    mode.value = 'Walk'
}
//修改模式为默认
const changeMapMode = () => {
    mode.value = 'Map'
    const viewer = xbsjEarthUi.activeViewer
    if (!viewer) return
    viewer.changeToMap()
    roamMode.value = 'Map'
}
//修改模式为沿线运动
const changeLineMode = () => {
    if (mode.value === 'Line') return
    const viewer = xbsjEarthUi.activeViewer
    if (!viewer) return
    viewer.changeToMap()
    mode.value = 'Line'
}
//修改模式为环绕地球
const changeRotateGlobeMode = () => {
    mode.value = 'RotateGlobe'
}
//修改模式为环绕跟随
const changeFollowMode = () => {
    if (mode.value === 'Follow') return
    const viewer = xbsjEarthUi.activeViewer
    if (!viewer) return
    viewer.changeToMap()
    mode.value = 'Follow'
}
//修改模式为中心旋转
const changeRotatePointMode = () => {
    mode.value = 'RotatePoint'
}
</script>

<template>
    <RightList :title="'交互模式'">
        <Button :name="'moren'" :content="'默认'" :click="changeMapMode" :size="18" :actived="mode === 'Map'"
            :left-button="true"></Button>
        <Button :name="'diyirencheng'" :content="'第一人称'" :click="changeWalkMode" :actived="mode === 'Walk'"></Button>
        <Button :name="'yanxianyundong'" :content="'沿线运动'" :click="changeLineMode" :actived="mode === 'Line'"
            :left-button="true"></Button>
        <Button :name="'diqiuxuanzhun'" :content="'环绕地球'" :click="changeRotateGlobeMode"
            :actived="mode === 'RotateGlobe'"></Button>
        <Button :name="'genzong'" :content="'跟踪'" :click="changeFollowMode" :actived="mode === 'Follow'"
            :left-button="true"></Button>
        <Button :name="'zhongxinxuanzhong'" :content="'中心旋转'" :click="changeRotatePointMode"
            :actived="mode === 'RotatePoint'" :left-button="false"></Button>
        <Line :xbsjEarthUi="xbsjEarthUi" v-if="mode === 'Line'"> </Line>
        <Walk :xbsjEarthUi="xbsjEarthUi" v-if="mode === 'Walk'"> </Walk>
        <Map :xbsjEarthUi="xbsjEarthUi" v-if="mode === 'Map'"> </Map>
        <Follow :xbsjEarthUi="xbsjEarthUi" v-if="mode === 'Follow'"> </Follow>
        <RotatePoint :xbsjEarthUi="xbsjEarthUi" v-if="mode === 'RotatePoint'"> </RotatePoint>
        <RotateGlobe :xbsjEarthUi="xbsjEarthUi" v-if="mode === 'RotateGlobe'">
        </RotateGlobe>
    </RightList>
</template>