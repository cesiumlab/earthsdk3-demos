<script setup lang='ts'>
import { ref } from 'vue';
import Button from '../../components/Button.vue';
import RightList from '../../components/RightList.vue';
import LabServer from "./serverType/LabServer.vue"
import CesiumIon from "./serverType/CesiumIon.vue"
import Tianditu from "./serverType/Tianditu.vue"
import GeoServer from "./serverType/GeoServer.vue"
const type = ref('CesiumIon')
const cesiumcontrolList: { type: string, zh: string, icon: string, leftButton: boolean }[] = [
    {
        type: 'labServer',
        zh: '本地服务',
        icon: 'Labfuwu3',
        leftButton: true,
    },
    {
        type: 'cesiumIon',
        zh: 'Cesium ion',
        icon: 'cesiumion',
        leftButton: false,
    },
    {
        type: 'tianditu',
        zh: '天地图',
        icon: 'tianditu',
        leftButton: true,
    },
    {
        type: 'geoserver',
        zh: 'GeoServer',
        icon: 'GeoServer',
        leftButton: false,
    }
];
</script>
<template>
    <RightList :title="'服务'" :isTop="true">
        <Button v-for="item in cesiumcontrolList" :name="item.icon" :content="item.zh"
            :click="() => { type === item.type ? type = '' : type = item.type }" :left-button="item.leftButton"
            :actived="type === item.type"></Button>
        <LabServer v-if="type === 'labServer'"></LabServer>
        <CesiumIon v-if="type === 'cesiumIon'"></CesiumIon>
        <Tianditu v-if="type === 'tianditu'"></Tianditu>
        <GeoServer v-if="type === 'geoserver'"></GeoServer>
    </RightList>
</template>
