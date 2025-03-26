<template>
    <PopList :title="'GeoServer'" :showButton="true" @ok="ok">
        <LabelInput v-model="geoServerUrl" :label="'服务地址'" @blur="initNewList" @keydownenter="initNewList">
        </LabelInput>
        <div class="server_lab">
            <div class="server_lab_title">
                <div class="server_lab_title_index">{{ '序号' }}</div>
                <div class="server_lab_title_name">{{ '名称' }}</div>
                <!-- <div class="server_lab_title_server">{{ '服务地址' }}</div> -->
                <div class="server_lab_title_type">{{ '类型' }}</div>
            </div>
            <div class="server_content">
                <div class="server_lab_content" v-for="(item, index) in serverList"
                    @click="changeServerLab(item, index)" :key="index"
                    :class="{ 'server_lab_content_active': serverActive === index }">
                    <div class="server_lab_content_index">{{ index + 1 }}</div>
                    <div class="server_lab_content_name">{{ item.title }}</div>
                    <!-- <div class="server_lab_content_server">{{ item.serverUrl }}</div> -->
                    <div class="server_lab_content_type">{{ '影像' }}</div>
                </div>
            </div>
        </div>
        <div class="images_servelocation" v-if="serverUrl">
            <label>图层地址</label>
            <div class="images_servelocation_readonly">{{ serverUrl }}</div>
        </div>
    </PopList>
</template>
<script setup lang="ts">
import { Message } from "earthsdk-ui";
import { inject, onBeforeUnmount, onMounted, ref } from 'vue';
import { createVueDisposer } from 'earthsdk-ui';
import LabelInput from "../../../components/LabelInput.vue";
import PopList from "../../../components/PopList.vue";
import XbsjWMTSParser from "../../../scripts/XbsjWMTSParser";
import { createGeoServerImage } from "./tools";

import { XbsjEarthUi } from '../../../scripts/xbsjEarthUi';
const d = createVueDisposer(onBeforeUnmount);
const serverUrl = ref('')
const emits = defineEmits(['close']);
const serverList = ref<any>([])
const serverActive = ref(-1)
const currentItem = ref<any>()
const xbsjEarthUi = inject('xbsjEarthUi') as XbsjEarthUi

const geoServerUrl = ref('')
const changeServerLab = (item: any, index: number) => {
    currentItem.value = item
    serverActive.value = index
    serverUrl.value = item.urls[0].template
}
const ok = () => {
    if (!serverUrl.value) {
        Message.warning('未选择服务，请先选择')
        return
    }
    const url = serverUrl.value;
    const layer = currentItem.value.title;
    const format = currentItem.value.urls[0].format === 'application/openlayers' ? 'image/png' : currentItem.value.urls[0].format
    const style = currentItem.value.styles[0].id;
    const rectangle = currentItem.value.rectangle;
    const options = {
        type: 'wmts',
        layer,
        format,
        style,
        tileMatrixSetID: currentItem.value.tileMatrixSets[0].tileMatrixSetID,
        tileMatrixLabels: currentItem.value.tileMatrixSets[0].params.tileMatrixLabels,
        tilingScheme: {
            type: currentItem.value.tileMatrixSets[0].params.tilingScheme === 'Geographic' ? 'GeographicTilingScheme' : currentItem.value.tileMatrixSets[0].params.tilingScheme === 'WebMercator' ? 'WebMercatorTilingScheme' : ''
        }
    }
    createGeoServerImage({url,options,name:layer,rectangle},xbsjEarthUi)
}
const initNewList = async () => {
    if (!geoServerUrl.value) return
    window.localStorage.setItem('geoserver_url', geoServerUrl.value)
    const url = geoServerUrl.value + '/geoserver/gwc/service/wmts?service=WMTS&version=1.1.1&request=GetCapabilities'
    if (!geoServerUrl.value) return
    if (!url.startsWith("http")) {
        Message.warning('请输入正确的地址')
        return;
    }
    var wmts = new XbsjWMTSParser();
    wmts.parser(url)
        .then(layer => {
            console.log(layer);
            serverList.value = layer
        })
        .catch((err: any) => {
            console.log(err);
            Message.error("GetCapabilities failed:" + err.message)
        });
}

onMounted(() => {
    const url = localStorage.getItem('geoserver_url') as string | undefined
    if (url) {
        geoServerUrl.value = url
    }
    initNewList()
})
</script>