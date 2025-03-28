<template>
    <div class="status_bar">
        <div class="status_info">
            <span style="width: 65px;">FPS:{{ Math.floor(statusInfo.fps) }}</span>
            <span style="width: 285px;">相机位置:{{ (statusInfo.position[0]).toFixed(5) }},{{
                (statusInfo.position[1]).toFixed(5) }},{{ (statusInfo.position[2]).toFixed(2) }}</span>
            <span style="width: 110px;"> 偏航角:{{ (statusInfo.rotation[0]).toFixed(2) }}°</span>
            <span style="width: 110px;"> 俯仰角:{{ (statusInfo.rotation[1]).toFixed(2) }}° </span>
            <span style="width: 270px;cursor: pointer;user-select: none;" title="双击复制当前位置"
                @dblclick="copyClipboard(realTimeInfo)">{{ realTimeInfo ?
                    `鼠标位置:${realTimeInfo[0].toFixed(5)},${realTimeInfo[1].toFixed(5)},${realTimeInfo[2].toFixed(2)}`
                    : '暂时无法获取鼠标位置...' }}
            </span>
        </div>
        <div v-show="$config.modelShow" class="version_info" @click="versionInfoListShow = !versionInfoListShow"
            :class="{ version_info_active: versionInfoListShow }">版本</div>
    </div>
    <Version v-if="versionInfoListShow"></Version>

</template>
<script setup lang="ts">
import { inject, onMounted, onBeforeUnmount, ref } from "vue";
import { XbsjEarthUi } from '../../../scripts/xbsjEarthUi';
import { createAnimateFrameWithStartValues } from 'xbsj-base';
import { Message } from "earthsdk-ui";
import { $config } from "../../../scripts/getConfig";
import Version from "./Version.vue"
const versionInfoListShow = ref(false)
const xbsjEarthUi = inject('xbsjEarthUi') as XbsjEarthUi
async function copyClipboard(text: string) {//复制
    navigator.clipboard.writeText(text)
        .then(function () {
            Message.success('复制成功')
        }, function (e) {
            Message.error(`复制失败!error{:${e}`)
        });
}
const statusInfo = ref({ fps: 0, position: [0, 0, 0], rotation: [0, 0, 0], length: 0 })
const realTimeInfo = ref()
const debugData = async () => {
    const viewer = xbsjEarthUi.activeViewer
    if (!viewer) return
    statusInfo.value.fps = await viewer.getFPS()
    const cameraInfo = await viewer.getCurrentCameraInfo()
    if (cameraInfo && cameraInfo.position && cameraInfo.rotation) {
        statusInfo.value.position = cameraInfo.position
        statusInfo.value.rotation = cameraInfo.rotation
    }
}
let dispose: any
let animateFrame: any
const viewePosRot = () => {
    const viewer = xbsjEarthUi.activeViewer
    if (!viewer) return
    dispose = viewer.hoverEvent.disposableOn((res) => {
        viewer.pickPosition(res.screenPosition).then(res1 => {
            realTimeInfo.value = res1
        })
    })
}
const destroy = () => {
    if (animateFrame) {
        animateFrame.destroy()
        animateFrame = undefined
    }
    if (dispose) {
        dispose()
        dispose = undefined
    }
}
onMounted(() => {
    debugData()
    animateFrame = createAnimateFrameWithStartValues(debugData);
    animateFrame.start();
    viewePosRot()
    xbsjEarthUi.dispose(xbsjEarthUi.activeViewerChanged.disposableOn(res => {
        destroy()
        debugData()
        animateFrame = createAnimateFrameWithStartValues(debugData);
        animateFrame.start();
        viewePosRot()
    }))
})
onBeforeUnmount(() => {
    destroy()
});
</script>
<style scoped>
.status_bar {
    width: 100%;
    position: fixed;
    height: 30px;
    left: 0;
    bottom: 0;
    color: #fff;
    padding: 0;
    box-sizing: border-box;
    line-height: 30px;
    z-index: 100;
    display: flex;
    align-content: center;
    justify-content: space-between;
    background: rgba(37, 38, 42, 0.8);
    font-size: 14px;
    border: 1px solid rgba(180, 180, 180, 1);

}

.status_info {
    display: flex;
}

.status_info>span {
    height: 100%;
    text-align: center;
    border-right: 1px solid rgba(180, 180, 180, 1);
}

.version_info {
    width: 50px;
    height: 100%;
    text-align: center;
    border-left: 1px solid rgba(180, 180, 180, 1);
    cursor: pointer;
}

.version_info:hover {
    background: rgba(171, 170, 170, 0.5);
}

.version_info_active {
    background: rgba(171, 170, 170, 0.5);
}
</style>