<script setup lang='ts'>
import { inject, onBeforeUnmount, onMounted, ref } from 'vue';
import { createVueDisposer, toVR } from 'earthsdk-ui';
import { SceneTree } from 'earthsdk3';
import { XbsjEarthUi } from "../../scripts/xbsjEarthUi";
import DebugInformation from './DebugInformation.vue';
import Editing from './Editing.vue';
import ModelDataDource from './Modeldatasource.vue';
import ModelVisualization from './Modelvisualization.vue';
const xbsjEarthUi = inject('xbsjEarthUi') as XbsjEarthUi
const sceneTree = inject('sceneTree') as SceneTree
const d = createVueDisposer(onBeforeUnmount);
const activeViewerType = toVR<string>(d, [xbsjEarthUi, 'activeViewerType'])
const debugIsShow = ref(false)
const chlastSelectedItem = () => {
    debugIsShow.value = false
    const lastSelectedItem = sceneTree.lastSelectedItem
    if (!lastSelectedItem) return
    if (lastSelectedItem.type == 'ES3DTileset') {
        debugIsShow.value = true
    } else {
        debugIsShow.value = false
    }
}
const largeScreen = ref(true)
onMounted(() => {
    chlastSelectedItem()
    const dispose = sceneTree.selectedItems.changedEvent.don(chlastSelectedItem);
    onBeforeUnmount(dispose)
    //@ts-ignore
    if (window.ue && window.ue.es) {
        largeScreen.value = false
    }
})

</script>

<template>
    <!-- 瓦片 -->
    <div class="roam">
        <ModelDataDource></ModelDataDource>
        <Editing v-if="activeViewerType !== 'ESUeViewer' && largeScreen"></Editing>
        <ModelVisualization></ModelVisualization>
        <DebugInformation v-if="activeViewerType !== 'ESUeViewer' && debugIsShow && largeScreen"></DebugInformation>
    </div>
</template>
<style src="../../css/ModelObj.css"></style>
