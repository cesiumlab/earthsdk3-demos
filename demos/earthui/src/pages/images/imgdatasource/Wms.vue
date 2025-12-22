<template>
    <PopList :title="'WMS'" :showButton="true" @ok="addSceneObjects">
        <!-- 服务地址 -->
        <LabelInput v-model="serverUrl" :label="'服务地址'" @keyupenter="updateServer" @change="updateServer"></LabelInput>
        <!-- 地址 -->
        <LabelInput v-model="url" :label="'地址'"></LabelInput>
        <!-- 格式 -->
        <LabelInput v-model="format" :label="'格式'"></LabelInput>
        <!-- 图层 -->
        <LabelInput v-model="layers" :label="'图层'"></LabelInput>
        <!-- credit -->
        <LabelInput v-model="credit" :label="'credit'"></LabelInput>
        <!-- 样式 -->
        <LabelInput v-model="styles" :label="'样式'"></LabelInput>
        <!-- srs -->
        <LabelInput v-model="srs" :label="'srs'"> </LabelInput>
        <!-- 最小级别 -->
        <LabelInput v-model="minimumLevel" :inputType="'number'" :label="'最小级别'"> </LabelInput>
        <!-- 最大级别 -->
        <LabelInput v-model="maximumLevel" :inputType="'number'" :label="'最大级别'"></LabelInput>
        <!-- width -->
        <LabelInput v-model="width" :inputType="'number'" :label="'width'"></LabelInput>
        <!-- height -->
        <LabelInput v-model="height" :inputType="'number'" :label="'height'"></LabelInput>
        <!-- version -->
        <LabelInput v-model="version" :label="'版本'"></LabelInput>
        <!-- 范围飞入 -->
        <div class="roam_moveOnLineMode" style="margin-top: 10px;">
            <div>
                <label for="">范围:</label><input class="rectangle_input" type="text" v-model="rectangle" readonly>
                <span class="span" @click="flyTo">定位</span>
            </div>
        </div>
    </PopList>
</template>

<script setup lang="ts">
import { ElMessage } from 'element-plus'
import { ref, inject, watch, onBeforeUnmount } from 'vue';
import PopList from '../../../components/PopList.vue';
import { XbsjEarthUi } from '../../../scripts/xbsjEarthUi';
import { ESImageryLayer } from 'earthsdk3';
import { createSceneObjTreeItemFromJson } from "../../plotting/esObj/fun"
import LabelInput from "../../../components/LabelInput.vue";
import { parse } from 'search-params';
import { searchMaxZindex } from '../../../scripts/general';
import { SceneTree } from 'earthsdk3';

const xbsjEarthUi = inject('xbsjEarthUi') as XbsjEarthUi
const sceneTree = inject('sceneTree') as SceneTree

const serverUrl = ref()
const url = ref()
const format = ref()
const layers = ref()
const credit = ref()
const styles = ref()
const srs = ref()
const minimumLevel = ref()
const maximumLevel = ref()
const width = ref()
const height = ref()
const version = ref()
const rectangle = ref()
let imagelayer = xbsjEarthUi.createSceneObject(ESImageryLayer)

function keysToLowerCase(obj: any) {
    return Object.keys(obj).reduce((result: any, key: any) => {
        const newKey = key.toLowerCase();
        result[newKey] = obj[key]; // 如果值也是对象，可以递归调用keysToLowerCase
        return result;
    }, {});
}
//请求wms并解析
const updateServer = () => {//请求地址点击回车键
    if (!serverUrl.value) return
    const server = new URL(serverUrl.value);
    server.origin && server.pathname && (url.value = server.origin + server.pathname)
    const queryString = server.search.substring(1);
    let parseSearch = keysToLowerCase(parse(queryString))
    parseSearch.format && (parseSearch.format === 'application/openlayers' ? format.value = 'image/png' : format.value = parseSearch.format)
    parseSearch.layers && (layers.value = parseSearch.layers)
    parseSearch.credit && (credit.value = parseSearch.credit)
    parseSearch.styles && (styles.value = parseSearch.styles)
    parseSearch.srs && (srs.value = parseSearch.srs)
    parseSearch.minimumLevel && (minimumLevel.value = parseSearch.minimumLevel)
    parseSearch.maximumLevel && (maximumLevel.value = parseSearch.maximumLevel)
    parseSearch.width && (width.value = parseSearch.width)
    parseSearch.height && (height.value = parseSearch.height)
    parseSearch.version && (version.value = parseSearch.version)
    parseSearch.bbox && (rectangle.value = parseSearch.bbox)
}
const changeImage = () => {
    const options = {
        type: 'wms',
        layers: layers.value,
        style: styles.value,
        tileHeight: height.value,
        tileWidth: width.value,
        srs: srs.value,
        credit: credit.value,
        parameters: {
            service: 'WMS',
            version: version.value,
            styles: styles.value,
            format: format.value,
        }
    }
    let a: any = []
    if (rectangle.value) {
        const r = rectangle.value.split(",");
        r.forEach((element: string) => {
            a.push(Number(element))
        });
    }
    if (imagelayer) {
        imagelayer.url = url.value
        imagelayer.name = layers.value
        //@ts-ignore
        imagelayer.options = options
        let maxZindex = searchMaxZindex(sceneTree, 'ESImageryLayer');
        imagelayer.zIndex = maxZindex + 1
        if (rectangle.value && imagelayer) {
            imagelayer.rectangle = a;
            setTimeout(() => {
                imagelayer?.flyTo()
            }, 100)
        }
    }
}
watch([url, format, layers, credit, styles, srs, minimumLevel, maximumLevel, maximumLevel, width, height, version], () => {
    changeImage()
})
const emits = defineEmits(['close'])
const addSceneObjects = () => {//点击确定
    if (!url.value) {
        ElMessage.warning('请输入地址')
        return
    }
    let maxZindex = searchMaxZindex(sceneTree, 'ESImageryLayer');

    if (imagelayer) {
        const json = imagelayer.json
        if (imagelayer) {
            xbsjEarthUi.destroySceneObject(imagelayer)
            imagelayer = undefined
        }
        createSceneObjTreeItemFromJson(xbsjEarthUi, json, maxZindex + 1)
        emits('close')
    }
}
//点击定位
const flyTo = () => {
    if (!rectangle.value) {
        ElMessage.warning('属性为空，无法飞入');
        return
    }
    const r = rectangle.value.split(",");
    let c: any = []
    r.forEach((element: string) => {
        c.push(Number(element))
    });
    const a = (c[0] + c[2]) / 2
    const b = (c[1] + c[3]) / 2
    xbsjEarthUi.activeViewer?.flyTo({
        distance: 50000,
        heading: 90,
        pitch: -90,
        flyDuration: 2,
        hDelta: -90,
        pDelta: 1
    }, [Number(a), Number(b), 0])
}
onBeforeUnmount(() => {
    if (imagelayer) {
        xbsjEarthUi.destroySceneObject(imagelayer)
        imagelayer = undefined
    }
})

</script>
