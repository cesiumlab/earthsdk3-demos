<template>
    <PopList :title="'CesiumIon'" :showButton="true" @ok="ok">
        <LabelInput v-model="cesiumIonUrl" :label="'服务地址'" @blur="initNewList" @keydownenter="initNewList">
        </LabelInput>
        <div class="images_bottom_content">
            <div class="images_servelocation">
                <label>token</label>
                <div class="server_token" v-if="!tokenInputShow" @click="tokenInputShow = true">{{ ionAccessToken }}
                </div>
                <input v-else type="text" v-model="ionAccessToken" @blur="changeToken" @keydown.enter="changeToken">
            </div>
        </div>
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
                    <div class="server_lab_content_name">{{ item.name }}</div>
                    <!-- <div class="server_lab_content_server">{{ item.serverUrl }}</div> -->
                    <div class="server_lab_content_type">{{ item.type === 'TERRAIN' ? '地形' : item.type === 'IMAGERY' ?
        '影像' : '瓦片'
                        }}</div>
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
import { onMounted, ref, inject, onBeforeUnmount } from 'vue';
import PopList from "../../../components/PopList.vue";
import { ElMessage } from 'element-plus'
import { getWithCookie } from '../../../api/service';
import LabelInput from "../../../components/LabelInput.vue"
import { createCesiumIonImage, createCesiumIonTerrain, createCesiumIonModel } from "./tools";
import { createVueDisposer, toVR } from 'earthsdk-ui';

import { XbsjEarthUi } from '../../../scripts/xbsjEarthUi';
const d = createVueDisposer(onBeforeUnmount);
const tokenInputShow = ref(false)
const serverUrl = ref('')
const emits = defineEmits(['close']);
const serverList = ref<any>([])
const serverActive = ref(-1)
const currentItem = ref<any>()
const accessToken = ref<string>()
const type = ref<string>()
const xbsjEarthUi = inject('xbsjEarthUi') as XbsjEarthUi
const ionAccessToken = toVR<string>(d, [xbsjEarthUi.activeViewer, 'ionAccessToken']);//token

const cesiumIonUrl = ref('https://api.cesium.com/v1/assets')
const changeServerLab = async (item: any, index: number) => {
    currentItem.value = item
    serverActive.value = index
    type.value = item.type
    serverUrl.value = `ion://${item.id}`
}
const ok = () => {
    if (!serverUrl.value) {
        ElMessage.warning('未选择服务，请先选择')
        return
    }
    if (type.value === 'TERRAIN') {
        createCesiumIonTerrain(xbsjEarthUi, { name: currentItem.value.name, url: serverUrl.value })
    } else if (type.value === 'IMAGERY') {
        createCesiumIonImage(xbsjEarthUi, { name: currentItem.value.name, url: serverUrl.value })
    } else if (type.value === '3DTILES') {
        createCesiumIonModel(xbsjEarthUi, { name: currentItem.value.name, url: serverUrl.value })
    }
}
const initNewList = async () => {
    if (!ionAccessToken.value) {
        ElMessage.warning('token不存在，请先设置token')
        return
    }
    getWithCookie('https://api.cesium.com/v1/assets', ionAccessToken.value).then((res: any) => {
        serverList.value = res.items
    }).catch(error => {
        console.log(error);
        ElMessage.error(`${error}`)
        
    })
}
const changeToken = () => {
    window.localStorage.setItem('ionAccessToken', ionAccessToken.value)
    tokenInputShow.value = false
    initNewList()
}
onMounted(() => {
    const a = window.localStorage.getItem('ionAccessToken')
    if (a)  ionAccessToken.value = a 
    const b = window.localStorage.getItem('cesiumIonUrl')
    if (b) cesiumIonUrl.value = b
    initNewList()
})
</script>