<template>
    <div class="pop_viewer">
        <div class="pop_viewer_span">
            <span @click="copyClipboard(str)">复制</span>
            <span @click="close">关闭</span>
        </div>
        <textarea class="pop_viewer_left" v-model="str">
        </textarea>
        <div class="pop_viewer_right" ref="popCesium">
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref, onMounted, watch, onBeforeUnmount } from "vue"
import { copyClipboard } from '../eSPropPanel/propertiesMenu/commons/base/copyClipboard';
import { ES3DTileset, ESImageryLayer, ESTerrainLayer } from 'earthsdk3';
import * as Cesium from 'cesium';
// import { getCzmCodeFromCzmTerrain, getCzmCodeFromES3DTileset, getCzmCodeFromESImageryLayer } from "./fun";
const props = withDefaults(defineProps<{
    sceneObject: ES3DTileset | ESImageryLayer | ESTerrainLayer
}>(), {
});
const emits = defineEmits(['close'])
const close = () => {
    emits('close')
}
//TODO ME 后续修改
const str = ref()
const change = () => {
    const sceneObject = props.sceneObject
    let west, south, east, north
    if (sceneObject instanceof ESImageryLayer || sceneObject instanceof ESTerrainLayer) {
        if (sceneObject.rectangle) {
            west = sceneObject.rectangle[0] //西
            south = sceneObject.rectangle[1]//南
            east = sceneObject.rectangle[2]//东
            north = sceneObject.rectangle[3]//北
        }
    }
    if (viewer.imageryLayers) {
        viewer.imageryLayers.removeAll()
    }
    if (sceneObject instanceof ES3DTileset) {
        // str.value = getCzmCodeFromES3DTileset(sceneObject)
    } else if (sceneObject instanceof ESImageryLayer) {
        // str.value = getCzmCodeFromESImageryLayer(sceneObject)
    } else if (sceneObject instanceof ESTerrainLayer) {
        // str.value = getCzmCodeFromCzmTerrain(sceneObject)
    } else {
        console.log('请选择正确的影像地形或瓦片');
    }
    eval(str.value)
}
watch(() => props.sceneObject, () => {
    change()
})
const popCesium = ref<HTMLElement>()
let viewer: any
onMounted(() => {
    if (popCesium.value) {
        //@ts-ignore
        viewer = new Cesium.Viewer(popCesium.value,);
        // {
        //     //@ts-ignore
        //     baseLayer: Cesium.ImageryLayer.fromProviderAsync(
        //         //@ts-ignore
        //         Cesium.TileMapServiceImageryProvider.fromUrl(
        //             //@ts-ignore
        //             Cesium.buildModuleUrl("Assets/Textures/NaturalEarthII")
        //         )
        //     ),
        //     baseLayerPicker: false,
        //     geocoder: false,
        // }

        //@ts-ignore
        window.lv = viewer;
        // viewer.imageryLayers.removeAll()
        change()
    }
})
onBeforeUnmount(() => {
    if (viewer) {
        viewer.destroy()
    }
})
</script>
<style scoped>
.pop_viewer {
    width: 900px;
    height: 500px;
    position: fixed;
    right: 0;
    top: 0;
    background-color: black;
    display: flex;
}

.pop_viewer_span {
    width: 100px;
    height: 20px;
    position: absolute;
    left: 0;
    top: 0;
    z-index: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.pop_viewer_span>span {
    display: inline-block;
    width: 40px;
    background-color: rgba(71, 71, 71, 1);
    text-align: center;
    font-size: 14px;
    cursor: pointer;
    color: #fff;
}

.pop_viewer_span>span:hover {
    color: aqua;
}

.pop_viewer_left {
    width: 400px;
    height: 100%;
    background-color: #1e1e1e;
    color: #fff;
    padding: 50px;
    box-sizing: border-box;
    font-size: 20px;
    resize: none;
}

.pop_viewer_right {
    flex: 1;
    height: 100%;
}
</style>