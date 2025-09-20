<script setup lang='ts'>
import { inject, onBeforeUnmount, ref } from 'vue';
import { createVueDisposer, toVR } from 'earthsdk-ui';
import { ESUeViewer } from 'earthsdk3-ue';

import Button from '../../components/Button.vue';
import RightList from '../../components/RightList.vue';
import { XbsjEarthUi } from '../../scripts/xbsjEarthUi';
import ViewManager from "./cameraViews/ViewManager.vue";
import { ESJVector3D } from 'earthsdk3';
const xbsjEarthUi = inject('xbsjEarthUi') as XbsjEarthUi
const d = createVueDisposer(onBeforeUnmount)
const activeViewerType = toVR<string>(d, [xbsjEarthUi, 'activeViewerType'])

const changeToMap = () => {
    const viewer = xbsjEarthUi.activeViewer
    if (!viewer) return
    viewer.changeToMap()
    xbsjEarthUi.roamMode = 'Map'
}
const sceneList = [
    {
        zh: '全球',
        class: 'global',
        func: () => {
            changeToMap()
            const position = [120.36355117699637, 28.909792305870496, 22191655.672192514] as ESJVector3D
            const rotation = [0.1, -90, 0] as [number, number, number]
            xbsjEarthUi.activeViewer?.flyIn(position, rotation, 1)
        },
        icon: 'quanqiu',
        leftButton: true,
    },
    {
        zh: '中国',
        class: 'china',
        func: () => {
            changeToMap()
            const position = [106.24551319129831, 37.20974503372304, 9812382.238207458] as ESJVector3D
            const rotation = [0.1, -90, 0] as [number, number, number]
            xbsjEarthUi.activeViewer?.flyIn(position, rotation, 1)
        },
        icon: 'zhongguohangzheng',
        leftButton: false,
    }
]
const startView = () => {
    const viewer = xbsjEarthUi.activeViewer
    if (!viewer) return
    if (viewer instanceof ESUeViewer) {
        viewer.defaultCameraFlyIn(1)
    }
}
</script>

<template>
    <RightList :title="'视角'" :isTop="true">
        <Button v-for="item in sceneList" :name="item.icon" :content="item.zh" :click="item.func"
            :left-button="item.leftButton"></Button>
        <Button :name="'chushi'" :content="'初始'" :click="startView" v-if="activeViewerType == 'ESUeViewer'"></Button>
        <ViewManager></ViewManager>
    </RightList>
</template>