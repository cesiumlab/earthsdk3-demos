<template>
    <div class="navigator" ref="navigator" @click="flyToNorth">
        <img class="navigator_img" src="../../../assets/view/zhinanzhen.png" alt="">
    </div>
</template>
<script setup lang="ts">
import { inject, onMounted, onBeforeUnmount, ref, watch } from "vue";
import { XbsjEarthUi } from '../../../scripts/xbsjEarthUi';
import { createAnimateFrameWithStartValues } from 'xbsj-base';
const xbsjEarthUi = inject('xbsjEarthUi') as XbsjEarthUi
const props = withDefaults(defineProps<{
    navigatorScaleRight: number
}>(), {})
watch(() => props.navigatorScaleRight, (val) => {
    if (navigator.value) {
        navigator.value.style.right = val + 'px'
    }
})
const navigator = ref<HTMLElement>()
const debugData = async () => {
    const viewer = xbsjEarthUi.activeViewer
    if (!viewer) return
    const cameraInfo = await viewer.getCurrentCameraInfo()
    if (cameraInfo) {
        const rotation = cameraInfo.rotation[0]
        // console.log(rotation);

        if (navigator.value) {
            navigator.value.style.transform = `rotate(${-rotation}deg)`;
        }
    }
}
const flyToNorth = () => {
    const viewer = xbsjEarthUi.activeViewer
    if (!viewer) return
    const res = viewer.getCurrentCameraInfo()
    const position = res?.position as [number, number, number]
    const rotation = res?.rotation as [number, number, number]
    const newRotation = [...rotation] as [number, number, number]
    newRotation[0] = 360
    viewer.flyIn(position, newRotation, 1)
}
let animateFrame: any
const destroy = () => {
    if (animateFrame) {
        animateFrame.destroy()
        animateFrame = undefined
    }
}
onMounted(() => {
    debugData()
    animateFrame = createAnimateFrameWithStartValues(debugData);
    animateFrame.start();
    xbsjEarthUi.dispose(xbsjEarthUi.activeViewerChanged.disposableOn(res => {
        destroy()
        debugData()
        animateFrame = createAnimateFrameWithStartValues(debugData);
        animateFrame.start();
    }))

})
onBeforeUnmount(() => {
    destroy()
});
</script>
<style scoped>
.navigator {
    position: fixed;
    cursor: pointer;
    width: 100px;
    height: 100px;
    top: 90px;
    right: 290px;
    transition: right 0.4s linear;
}

.navigator_img {
    width: 100%;
    height: 100%;
}
</style>