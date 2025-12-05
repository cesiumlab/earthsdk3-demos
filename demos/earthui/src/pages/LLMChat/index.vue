<script setup lang="ts">
import { XbsjEarthUi } from "@/scripts/xbsjEarthUi";
import { inject, nextTick, useTemplateRef } from "vue";
import { NewChat } from "earthsdk-ui";
import { getCameraTools, getSceneObjectTools } from "earthsdk3";

const objm = inject("xbsjEarthUi") as XbsjEarthUi;

const newChatRef = useTemplateRef("newChatRef");

const cameraTools = getCameraTools(objm);
const sceneObjectTools = getSceneObjectTools(objm);

nextTick(() => {

    //TODO:后面会修复
    const index = cameraTools.findIndex((tool) => tool.name === '保存或记录当前相机视角信息');
    if (index !== -1) {
        // cameraTools.splice(index, 1);
        cameraTools[index].name = 'saveCameraView';
    }

    newChatRef.value?.registerTools(cameraTools, 'earthsdk3_camera');
    newChatRef.value?.registerTools(sceneObjectTools, 'earthsdk3_sceneObject');
});


</script>

<template>
    <div class="xbsj-chat-container">
        <NewChat :objm="objm" ref="newChatRef" />
    </div>
</template>

<style scoped>
.xbsj-chat-container {
    width: 100%;
    height: 100%;
    border-left: 1px solid #313135;
}
</style>
