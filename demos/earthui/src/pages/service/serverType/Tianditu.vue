<template>
    <PopList :title="'天地图'" :showButton="true" @ok="ok">
        <div class="images_bottom_content">
            <div class="images_servelocation">
                <label>token</label>
                <div class="server_token" v-if="!tokenInputShow" @click="tokenInputShow = true">{{ tiandituToken }}
                </div>
                <input v-else type="text" v-model="tiandituToken" @blur="changeToken" @keydown.enter="changeToken">
            </div>
        </div>
        <div class="server_lab">
            <div class="server_lab_title">
                <div class="server_lab_title_index">{{ '序号' }}</div>
                <div class="server_lab_title_name">{{ '名称' }}</div>
                <!-- <div class=".">{{ '服务地址' }}</div> -->
                <div class="server_lab_title_type">{{ '类型' }}</div>
            </div>
            <div class="server_content">
                <div class="server_lab_content" v-for="(item, index) in serverList"
                    @click="changeServerLab(item, index)" :key="index"
                    :class="{ 'server_lab_content_active': serverActive === index }">
                    <div class="server_lab_content_index">{{ index + 1 }}</div>
                    <div class="server_lab_content_name">{{ item.name }}</div>
                    <div class="server_lab_content_type">{{ item.type }}</div>
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
import { onMounted, ref, inject } from 'vue';
import PopList from "../../../components/PopList.vue";
import { XbsjEarthUi } from '../../../scripts/xbsjEarthUi';
import { ElMessage } from 'element-plus'
import { createTiandiImage } from "./tools"
const tiandituToken = ref('')
const tokenInputShow = ref(false)
const serverUrl = ref('')
const emits = defineEmits(['close']);
const xbsjEarthUi = inject('xbsjEarthUi') as XbsjEarthUi
const serverList = [
    {
        name: '矢量底图',
        url: 'http://t0.tianditu.gov.cn/vec_w/wmts',
        type: '球面墨卡托投影'
    },
    {
        name: '矢量注记',
        url: 'http://t0.tianditu.gov.cn/cva_w/wmts',
        type: '球面墨卡托投影'
    },
    {
        name: '影像底图',
        url: 'http://t0.tianditu.gov.cn/img_w/wmts',
        type: '球面墨卡托投影'
    },
    {
        name: '影像注记',
        url: 'http://t0.tianditu.gov.cn/cia_w/wmts',
        type: '球面墨卡托投影'
    },
    {
        name: '地形晕渲',
        url: 'http://t0.tianditu.gov.cn/ter_w/wmts',
        type: '球面墨卡托投影'
    },
    {
        name: '地形注记',
        url: 'http://t0.tianditu.gov.cn/cta_w/wmts',
        type: '球面墨卡托投影'
    },
    {
        name: '全球境界',
        url: 'http://t0.tianditu.gov.cn/ibo_w/wmts',
        type: '球面墨卡托投影'
    },

]
const serverActive = ref(-1)
const currentItem = ref<any>()

const changeServerLab = (item: any, index: number) => {
    currentItem.value = item
    serverActive.value = index
    serverUrl.value = item.url
}
const ok = () => {
    if (!tiandituToken.value) {
        ElMessage.warning('请填入天地图token')
        return
    }
    if (!serverUrl.value) {
        ElMessage.warning('未选择服务，请先选择')
        return
    }
    let result = (serverUrl.value.split('/'))[3].substring(0, 3)
    // const url = serverUrl.value + '?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=img&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=' + tiandituToken.value
    const url = serverUrl.value + '?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER='+result+'&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=' + tiandituToken.value
    createTiandiImage({ name: currentItem.value.name, serverUrl: url }, xbsjEarthUi)
}
const changeToken = () => {
    tokenInputShow.value = false
    window.localStorage.setItem('tianditu_token', tiandituToken.value)
}
onMounted(() => {
    const token = localStorage.getItem('tianditu_token') as string | undefined
    if (token) {
        tiandituToken.value = token
    }
})
</script>