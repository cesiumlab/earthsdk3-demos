<script setup lang='ts'>
import { onBeforeUnmount, onMounted, ref, inject } from 'vue';
import { createVueDisposer, toVR } from 'earthsdk-ui';
import { SceneTree } from 'earthsdk3';
import { XbsjEarthUi } from '../../scripts/xbsjEarthUi';
import Gugevisualization from './Gugevisualization.vue';
import ImgDataDource from './Imgdatasource.vue';
import ImgVisualization from './Imgvisualization.vue';
const xbsjEarthUi = inject('xbsjEarthUi') as XbsjEarthUi
const sceneTree = inject('sceneTree') as SceneTree
const d = createVueDisposer(onBeforeUnmount);
const ueIsShow = toVR<boolean>(d, [xbsjEarthUi, 'ueIsShow'])

const gugeIsShow = ref(false)
const chlastSelectedItem = () => {
    gugeIsShow.value = false
    const lastSelectedItem = sceneTree.lastSelectedItem
    if (!lastSelectedItem) return
    if (lastSelectedItem.type == 'ESGeHistoryImagery') {
        gugeIsShow.value = true
    } else {
        gugeIsShow.value = false
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
    <!-- 影像 -->
    <div class="roam">
        <ImgDataDource ></ImgDataDource>
        <ImgVisualization  v-if="!ueIsShow && largeScreen"></ImgVisualization>
        <Gugevisualization  v-if="gugeIsShow"></Gugevisualization>
    </div>
</template>

<style src="../../css/ImagesObj.css"></style>
