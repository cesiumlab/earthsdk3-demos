<script setup lang='ts'>
import { inject, onBeforeUnmount, onMounted, ref } from 'vue';
import { createVueDisposer, toVR } from 'earthsdk-ui';
import Button from '../../components/Button.vue';
import RightList from '../../components/RightList.vue';
import { XbsjEarthUi } from '../../scripts/xbsjEarthUi';
const xbsjEarthUi = inject('xbsjEarthUi') as XbsjEarthUi
const d = createVueDisposer(onBeforeUnmount);
const showCesiumInspector = toVR<boolean>(d, [xbsjEarthUi.activeViewer, 'showCesiumInspector'])
const showCesium3DTilesInspector = toVR<boolean>(d, [xbsjEarthUi.activeViewer, 'showCesium3DTilesInspector'])
const rightModuleShow = toVR<boolean>(d, [xbsjEarthUi, 'rightModuleShow'])

const largeScreen = ref(true)
onMounted(() => {
    //@ts-ignore
    if (window.ue && window.ue.es) {
        largeScreen.value = false
    }
})
const changeShowCesiumInspector = () => {
    showCesiumInspector.value = !showCesiumInspector.value
    if (showCesiumInspector.value) rightModuleShow.value = false
}
const changeShowCesium3DTilesInspector = () => {
    showCesium3DTilesInspector.value = !showCesium3DTilesInspector.value
    if (showCesium3DTilesInspector.value) rightModuleShow.value = false
}
</script>
<template>
    <RightList :title="'调试'">
        <Button :name="'dixingtiaoshi'" :content="'地形调试'" :click="() => changeShowCesiumInspector()"
            :actived="showCesiumInspector" :left-button="true"></Button>
        <Button :name="'wapiantiaoshi'" :content="'瓦片调试'" :click="() => changeShowCesium3DTilesInspector()"
            :actived="showCesium3DTilesInspector"></Button>
    </RightList>
</template>
