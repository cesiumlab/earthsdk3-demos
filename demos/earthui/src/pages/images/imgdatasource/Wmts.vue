<template>
    <PopList :title="'WMTS'" :showButton="true" @ok="addSceneObjects">
        <LabelInput v-model="server" :label="'服务地址'" @keydownenter="updateServer" @change="updateServer"></LabelInput>
        <!-- 图层 -->
        <LabelInput v-model="selected.currentLayer.title" :label="'图层'" :disabled="true" :placeholder="'请选择'" 
            :checkbox="true" :list="layersNameList" :listContent="'title'" :liClickFun="changeLayerListShow"
            :checkboxFun="checkboxFun">
        </LabelInput>
        <!-- 范围飞入 -->
        <div class="roam_moveOnLineMode" style="margin-top: 10px;" v-if="rectangle">
            <div>
                <label for="">范围:</label><input type="text" placeholder="请输入" v-model="rectangle" :readonly="true" class="input_disabled">
                <span class="span" @click="flyTo(selected.currentLayer)" title="飞入"> <es-icon :name="'tubiaodian1'"
                        :color="'#fff'" :size="15" /></span>
            </div>
        </div>
        <!-- 样式 -->
        <LabelInput v-if="selected.style.title" v-model="selected.style.title" :disabled="true" :label="'样式'" :placeholder="'请选择'"
             :checkbox="true" :list="selected.currentLayer.styles" :listContent="'title'"
            :liClickFun="changeCurrentStyle">
        </LabelInput>
        <div v-if="selected.style.legend">
            <img :src="selected.style.legend.href ?? ''" alt="">
        </div>
        <!-- 格式 -->
        <LabelInput v-if="selected.format.format" v-model="selected.format.format" :disabled="true" :label="'格式'" :placeholder="'请选择'"
             :checkbox="true" :list="selected.currentLayer.urls" :listContent="'format'"
            :liClickFun="changeCurrentFormat">
        </LabelInput>
        <!-- 切片规则-->
        <LabelInput v-if="selected.tileMatrixSet.tileMatrixSetID" :disabled="true" v-model="selected.tileMatrixSet.tileMatrixSetID"
            :label="'切片规则'" :placeholder="'请选择'"  :checkbox="true"
            :list="selected.currentLayer.tileMatrixSets" :listContent="'tileMatrixSetID'"
            :liClickFun="changeTileMatrixSetID">
        </LabelInput>
        <!-- 最大最小级别 -->
        <LabelInput v-if="selected.tileMatrixSet.params.maximumLevel" :disabled="true"
            v-model="selected.tileMatrixSet.params.minimumLevel" :inputType="'number'" :label="'最小级别'" :readonly="true">
        </LabelInput>
        <LabelInput v-if="selected.tileMatrixSet.params.maximumLevel" :disabled="true"
            v-model="selected.tileMatrixSet.params.maximumLevel" :inputType="'number'" :label="'最大级别'" :readonly="true">
        </LabelInput>
    </PopList>
</template>

<script setup lang="ts">
import { ElMessage } from 'element-plus'
import { ref, inject, watch, onBeforeUnmount } from 'vue';
import PopList from '../../../components/PopList.vue';
import XbsjWMTSParser from "../../../scripts/XbsjWMTSParser";
import { XbsjEarthUi } from '../../../scripts/xbsjEarthUi';
import { ESImageryLayer } from 'earthsdk3';
import { createSceneObjTreeItemFromJson } from "../../plotting/esObj/fun"
import LabelInput from "../../../components/LabelInput.vue"
import { searchMaxZindex } from '../../../scripts/general';
import { SceneTree } from 'earthsdk3';
const xbsjEarthUi = inject('xbsjEarthUi') as XbsjEarthUi
const sceneTree = inject('sceneTree') as SceneTree
const server = ref()
const layersNameList = ref<any>([])//所有的图层列表
const selected = ref<{ currentLayer: any, format: any, style: any, tileMatrixSet: any }>({
    currentLayer: { title: '', styles: [], urls: [], tileMatrixSets: [] },
    format: { format: '', template: '' },
    style: { title: '', legend: { href: '' } },
    tileMatrixSet: { tileMatrixSetID: '', params: { minimumLevel: '', maximumLevel: '' } }
})//选中的图层的属性
let imagelayer = xbsjEarthUi.createSceneObject(ESImageryLayer)
const formatUrl = ref('')//影像的最终地址
const rectangle = ref('')//范围
const addSceneObjects = () => {//点击确定
    if (!server.value) {
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
const emits = defineEmits(['close'])
//修改图层
const changeLayerListShow = (item: any) => {
    selected.value.currentLayer = item
}
const checkboxFun = () => {
    if (!server.value) {
        ElMessage.warning('请输入服务地址')
        return
    }
}
//修改样式
const changeCurrentStyle = (item: any) => {
    selected.value.style = item
}
//修改格式
const changeCurrentFormat = (item: any) => {
    selected.value.format = item
}
//修改切片规则
const changeTileMatrixSetID = (item: any) => {
    selected.value.tileMatrixSet = item;
}
//请求wmts并解析
const updateServer = () => {//请求地址点击回车键
    if (!server.value) return
    let url = server.value
    if (!url.startsWith("http")) {
        ElMessage.warning('请输入正确的wmts地址')
        return;
    }
    var wmts = new XbsjWMTSParser();
    url = wmts.addUrlParam(url);
    wmts.parser(url)
        .then(layer => {
            // console.log(layer);
            layersNameList.value = layer
            if (layer.length == 0) {
                ElMessage.warning('服务没有支持的图层')
            } else {
                //默认选择第一个Layer
                selected.value.currentLayer = layer[0];
            }
        })
        .catch((err: any) => {
            console.log(err);
            ElMessage.error('Error:请求失败，请检查服务')
        });
}
//点击定位
const flyTo = (l: any) => {
    if (!l || !l.rectangle) {
        rectangle.value = "";
        return;
    }
    rectangle.value = l.rectangle.map((r: any) => r.toFixed(5) + "°").join(",");
    const a = (l.rectangle[0] + l.rectangle[2]) / 2
    const b = (l.rectangle[1] + l.rectangle[3]) / 2
    xbsjEarthUi.activeViewer?.flyTo({
        distance: 50000,
        heading: 90,
        pitch: -90,
        flyDuration: 2,
        hDelta: -90,
        pDelta: 1
    }, [Number(a), Number(b), 0])
}
const preview = () => {
    !selected.value.currentLayer
    if (!selected.value.currentLayer) return;
    const layer = selected.value.currentLayer.title;
    if (!selected.value.format) return;
    const url = formatUrl.value;
    const format = selected.value.format.format === 'application/openlayers' ? 'image/png' : selected.value.format.format
    if (!selected.value.style) return;
    const style = selected.value.style.id;

    if (!selected.value.tileMatrixSet) return;
    const rectangle = selected.value.currentLayer.rectangle
        ? selected.value.currentLayer.rectangle.map((d: any) => d)
        : undefined;
    if (rectangle && imagelayer) {
        imagelayer.rectangle = rectangle;
    }
    const options = {
        type: 'wmts',
        layer,
        format,
        style,
        tileMatrixSetID: selected.value.tileMatrixSet.tileMatrixSetID,
        tileMatrixLabels: selected.value.tileMatrixSet.params.tileMatrixLabels,
        tilingScheme: {
            type: selected.value.tileMatrixSet.params.tilingScheme === 'Geographic' ? 'GeographicTilingScheme' : selected.value.tileMatrixSet.params.tilingScheme === 'WebMercator' ? 'WebMercatorTilingScheme' : ''
        }
    }
    if (imagelayer) {
        imagelayer.url = url
        imagelayer.name = layer
        imagelayer.maximumLevel = selected.value.tileMatrixSet.params.maximumLevel
        imagelayer.minimumLevel = selected.value.tileMatrixSet.params.minimumLevel
        //@ts-ignore
        imagelayer.options = options
        let maxZindex = searchMaxZindex(sceneTree, 'ESImageryLayer');
        imagelayer.zIndex = maxZindex + 1
    }
}
function keysToLowerCase(obj: any) {
    return Object.keys(obj).reduce((result: any, key: any) => {
        const newKey = key.toLowerCase();
        result[newKey] = obj[key]; // 如果值也是对象，可以递归调用keysToLowerCase
        return result;
    }, {});
}
watch(() => selected.value.currentLayer, (val) => {
    flyTo(val)
    //设置默认的 format
    if (val.urls && val.urls.length > 0) {
        selected.value.format = val.urls[0];
    } else {
        selected.value.format = { format: '', template: '' };
    }
    // //设置默认的tilematrixset
    if (val.tileMatrixSets && val.tileMatrixSets.length > 0) {
        selected.value.tileMatrixSet = val.tileMatrixSets[0];
    } else {
        selected.value.tileMatrixSet = { tileMatrixSetID: '', params: { minimumLevel: '', maximumLevel: '' } };
    }
    // //设置默认的 style
    var defaultStyle;
    if (val.styles) defaultStyle = val.styles.find((s: { default: any; }) => s.default);
    if (defaultStyle) {
        selected.value.style = defaultStyle;
    } else if (val.styles && val.styles.length > 0) {
        selected.value.style = val.styles[0];
    } else {
        selected.value.style = { title: '', legend: { href: '' } };
    }
    // const sUrl = new URL(server.value);
    // const queryString = sUrl.search.substring(1);
    // let parseSearch = keysToLowerCase(parse(queryString))
    // parseSearch.style && (selected.value.style.title = parseSearch.style)

    formatUrl.value = selected.value.format.template;
})
watch(() => selected.value.format, (val) => {
    preview()
})
watch(() => selected.value.style, (val) => {
    preview()
})
watch(() => selected.value.tileMatrixSet, (val) => {
    preview()
})
watch(formatUrl, (val) => {
    preview()
})
onBeforeUnmount(() => {
    if (imagelayer) {
        xbsjEarthUi.destroySceneObject(imagelayer)
        imagelayer = undefined
    }
})
</script>
