<template>
    <div class="scale" ref="scale">
        <div class="scale_border">{{ lengthInPixel }}</div>
        <div class="scale_length"></div>
    </div>
</template>
<script setup lang="ts">
import { inject, onMounted, onBeforeUnmount, ref, watch } from "vue";
import { XbsjEarthUi } from '../../../scripts/xbsjEarthUi';
import { createAnimateFrameWithStartValues } from "earthsdk3";
const props = withDefaults(defineProps<{
    navigatorScaleRight: number
}>(), {})
watch(() => props.navigatorScaleRight, (val) => {
    if (scale.value) {
        scale.value.style.right = val + 'px'
    }
})
const xbsjEarthUi = inject('xbsjEarthUi') as XbsjEarthUi
const scale = ref<HTMLElement>()
const lengthInPixel = ref()
const debugData = async () => {
    const viewer = xbsjEarthUi.activeViewer
    if (!viewer) return
    const inPixel = await viewer.getLengthInPixel()
    let a
    if (inPixel) {
        if (inPixel < 0) {
            a = lengthInPixel.value
        } else {
            if (inPixel * 100 > 1000) {
                a = `${(inPixel * 100 / 1000).toFixed(0)}km`
            } else {
                a = `${(inPixel * 100).toFixed(0)}m`
            }
        }
        lengthInPixel.value = a
    }
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
.scale {
    position: fixed;
    cursor: pointer;
    width: 125px;
    height: 30px;
    bottom: 50px;
    right: 290px;
    transition: right 0.4s linear;
    border: 1px solid rgba(49, 50, 56, .8);
    background: rgba(37, 38, 42, .8);
    pointer-events: none;
    border-radius: 15px;
    padding: 0 5px;
}

.scale_border {
    width: 125px;
    display: inline-block;
    text-align: center;
    font-size: 14px;
    font-weight: lighter;
    line-height: 30px;
    color: #fff;
}

.scale_length {
    border-right: 1px solid #fff;
    border-left: 1px solid #fff;
    border-bottom: 1px solid #fff;
    position: absolute;
    height: 10px;
    top: 15px;
    left: 17.5px;
    width: 100px;
}
</style>
