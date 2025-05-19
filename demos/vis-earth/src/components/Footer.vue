<template>
    <div class="vis_status_bar">
        <div class="vis_scale" ref="scale">
            <div class="vis_scale_border">{{ lengthInPixel }}</div>
            <div class="vis_scale_length"></div>
        </div>
        <span style="width: 65px;">FPS:{{ Math.floor(statusInfo.fps) }}</span>
        <span style="width: 285px;">相机位置:{{ (statusInfo.position[0]).toFixed(5) }},{{
                (statusInfo.position[1]).toFixed(5) }},{{ (statusInfo.position[2]).toFixed(2) }}</span>
        <span style="width: 110px;"> 偏航角:{{ (statusInfo.rotation[0]).toFixed(2) }}°</span>
        <span style="width: 110px;"> 俯仰角:{{ (statusInfo.rotation[1]).toFixed(2) }}° </span>
        <span style="width: 270px;cursor: pointer;user-select: none;" title="双击复制当前位置">{{ realTimeInfo ?
                `鼠标位置:${realTimeInfo[0].toFixed(5)},${realTimeInfo[1].toFixed(5)},${realTimeInfo[2].toFixed(2)}`
                : '暂时无法获取鼠标位置...' }}
        </span>
        <div class="vis_layer" @click="layerShow = !layerShow">
            <img style="width: 20px;height: 20px;" src="../assets/layer.png" alt=""> {{ '图层' }}
        </div>
    </div>
    <ViaWindow v-model="layerShow" :widthHeight="[250, 400]" :leftBottom="[20, 100]" :title="'图层'">
        <Layer></Layer>
    </ViaWindow>

</template>
<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from "vue";
import Layer from "./coms/Layer.vue"
import { getobjm } from '../scripts/getobjm';
import ViaWindow from './ViaWindow.vue';
const objm = getobjm()

const lengthInPixel = ref()
const statusInfo = ref({ fps: 0, position: [0, 0, 0], rotation: [0, 0, 0], length: 0 })
const realTimeInfo = ref()
const debugData = async () => {
    const viewer = objm.activeViewer
    if (!viewer) return
    statusInfo.value.fps = await viewer.getFPS()
    const cameraInfo = await viewer.getCurrentCameraInfo()
    if (cameraInfo && cameraInfo.position && cameraInfo.rotation) {
        statusInfo.value.position = cameraInfo.position
        statusInfo.value.rotation = cameraInfo.rotation
    }
    const inPixel = await viewer.getLengthInPixel()
    let a
    if (inPixel) {
        if (inPixel < 0) {
            a = ``
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
let dispose: any
let timer: any
const viewePosRot = () => {
    const viewer = objm.activeViewer
    if (!viewer) return
    dispose = viewer.hoverEvent.disposableOn((res) => {
        viewer.pickPosition(res.screenPosition).then(res1 => {
            realTimeInfo.value = res1
        })
    })
}
const destroy = () => {
    if (timer) {
        clearInterval(timer)
    }
    if (dispose) {
        dispose()
        dispose = undefined
    }
}
onMounted(() => {
    debugData()
    viewePosRot()
    timer = setInterval(() => {
        debugData()
    }, 100)
    objm.dispose(objm.activeViewerChanged.disposableOn(() => {
        viewePosRot()
    }))
    onBeforeUnmount(() => destroy());
})
const layerShow = ref(false)//图层显影
</script>
<style scoped>
.vis_status_bar {
    width: 100%;
    position: fixed;
    height: 20px;
    left: 0;
    bottom: 0;
    color: var(--vis-primary-color);
    padding: 0;
    box-sizing: border-box;
    line-height: 20px;
    z-index: 100;
    display: flex;
    align-content: center;
    justify-content: flex-end;
    background: var(--vis-bgc);
    font-size: 12px;
    border: 1px solid var(--vis-border-color);
}

.vis_layer {
    width: 90px;
    position: fixed;
    height: 40px;
    left: 20px;
    bottom: 50px;
    box-sizing: border-box;
    z-index: 100;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--vis-bgc-layer-transparent);
    border-radius: 20px;
    font-size: 12px;
    cursor: pointer;
}

.vis_layer:hover {
    background: var(--vis-bgc-layer);
}

.vis_status_bar>span {
    height: 100%;
    text-align: center;
}

.vis_scale {
    width: 125px;
    height: 100%;
    pointer-events: none;
    border-radius: 15px;
    padding: 0 5px;
    position: relative;
}

.vis_scale_border {
    width: 125px;
    display: inline-block;
    text-align: center;
    font-size: 12px;
    font-weight: lighter;
    line-height: 20px;
    color: var(--vis-primary-color);
}

.vis_scale_length {
    border-right: 1px solid var(--vis-primary-color);
    border-left: 1px solid var(--vis-primary-color);
    border-bottom: 1px solid var(--vis-primary-color);
    position: absolute;
    height: 10px;
    top: 8px;
    left: 17.5px;
    width: 100px;
}
</style>
