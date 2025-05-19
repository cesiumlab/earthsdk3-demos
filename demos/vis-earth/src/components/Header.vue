<script setup lang='ts'>
import { onMounted, ref, watch } from 'vue';
import { getobjm } from '../scripts/getobjm';
import ViaWindow from './ViaWindow.vue';
const objm = getobjm();
// const open = () => {
//     window.open("https://earthsdk.com/earthui/index.html", "_blank")
// }
const showSearch = ref(false);
const showMesure = ref(false);
const showToken = ref(false);
const keywords = ref("");
const cesiumToken = ref('')
const tiandituToken = ref('')
const gaodeToken = ref('')
// const searchList = ref<{ name: string, location: string, address: string, adname: string }[]>([]);
const searchList = ref<{ name: string, location: string, address: string, adname: string, photos: any }[]>([]);
// `https://restapi.amap.com/v3/place/text?key=2d3c6326ef327eecba326ac5780fcab1&keywords=

// const gd_token = `2d3c6326ef327eecba326ac5780fcab1`
// const fetchUrl = `https://restapi.amap.com/v3/place/text?key=${objm.Layer.gaodeToken}&keywords=`
const getSearchInfo = async () => {
    if (!keywords.value) {
        keywords.value = '北京'
    }
    const fetchUrl = `https://restapi.amap.com/v3/place/text?key=${gaodeToken.value}&keywords=`
    const res = await fetch(fetchUrl + keywords.value);
    const data = await res.json();
    if (data && data.pois && data.pois.length > 0) {
        showSearch.value = true
        searchList.value = [...data.pois]
    } else {
        searchList.value = []
        showSearch.value = true
    }
}

const flyTo = (item: any) => {
    const [lng, lat] = item.location.split(',');
    objm.measure.poi.position = [Number(lng), Number(lat), 0];
    objm.measure.poi.show = true;
    objm.measure.poi.name = item.name;
    setTimeout(() => {
        objm.measure.poi.flyTo();
    }, 100)
}
watch(showSearch, (newVal) => {
    if (!newVal) {
        objm.measure.poi.show = false;
        objm.measure.poi.name = '';
    }
})
watch(showMesure, (newVal) => {
    if (!newVal) {
        objm.measure.clearAll()
    }
})
watch(cesiumToken, (newVal) => {
    objm.Layer.cesiumToken = newVal
})
watch(tiandituToken, (newVal) => {
    objm.Layer.tiandituToken = newVal

})
watch(gaodeToken, (newVal) => {
    objm.Layer.gaodeToken = newVal
})
onMounted(() => {
    cesiumToken.value = objm.Layer.cesiumToken
    tiandituToken.value = objm.Layer.tiandituToken
    gaodeToken.value = objm.Layer.gaodeToken
})
</script>

<template>
    <div class="vis-top-bar">
        <!-- <img draggable="false" src="../assets/icon.png" @click="open" class="vis-top-logo"> -->
        <div class="vis-top-search">
            <span class="vis-top-search-icon">
                <vis-icon iconName="vis-search" color="#333333"></vis-icon>
            </span>
            <input type="text" v-model="keywords" placeholder="搜索 北京" class="vis-top-search-input"
                @keydown.enter="getSearchInfo">
            <div class="vis-top-icon" title="测量" @click="showMesure = !showMesure">
                <vis-icon iconName="vis-measurement" :color="showMesure ? '#3050d1' : '#333333'"></vis-icon>
            </div>
            <div class="vis-top-icon" title="token配置" @click="showToken = !showToken">
                <span class="vis-top-icon-png" :class="{ 'vis-top-icon-png_h': showToken }"></span>
            </div>
        </div>
    </div>

    <ViaWindow v-model="showSearch" :widthHeight="[400, 550]" :rightTop="[60, 60]" :title="'搜索'">
        <div class="location_item" v-for="item in searchList" :key="item.address" @click="flyTo(item)">
            <img :src="item?.photos[0]?.url" alt="" class="location_img">
            <div class="location_info">
                <div class="location_name" :title="item.name">{{ item.name }}</div>
                <div class="location_address" :title="item.address">{{ item.adname }}-{{ item.address }}</div>
            </div>
        </div>
    </ViaWindow>
    <ViaWindow v-model="showMesure" :widthHeight="[250, 100]" :rightTop="[60, 60]" :title="'测量'">
        <div class="measure_items">
            <button class="measure_items_button" @click="objm.measure.create('ESDistanceMeasurement')">{{ '距离'
                }}</button>
            <button class="measure_items_button" @click="objm.measure.create('ESAreaMeasurement')">{{ '面积' }}</button>
        </div>
    </ViaWindow>
    <ViaWindow v-model="showToken" :widthHeight="[400, 160]" :rightTop="[60, 60]" :title="'Token设置'">
        <div class="token_items">
            <div><label for="">cesiumToken</label><input type="text" v-model="cesiumToken"></div>
            <div><label for="">天地图token</label><input type="text" v-model="tiandituToken"></div>
            <div><label for="">高德apiToken</label><input type="text" v-model="gaodeToken"></div>
        </div>
    </ViaWindow>
</template>

<style scoped>
.vis-top-bar {
    position: absolute;
    top: 0;
    left: 0;
    width: auto;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    z-index: 9999;
}

.vis-top-logo {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    padding: 3px;
    box-sizing: border-box;
    cursor: pointer;
    background-color: var(--vis-white);
    margin: 10px;
}

.vis-top-search {
    width: 400px;
    background-color: var(--vis-bgc);
    position: relative;
    border-radius: 30px;
    padding: 5px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
}

.vis-top-search-icon {
    position: absolute;
    top: 50%;
    left: 10px;
    transform: translateY(-50%);
}

.vis-top-search-input {
    width: 250px;
    height: 30px;
    line-height: 30px;
    letter-spacing: 1px;
    border-radius: 15px;
    background-color: var(--vis-white);
    border: none;
    outline: none;
    padding: 0 30px;
    box-sizing: border-box;
    font-size: var(--vis-font-size-1);
}

.vis-top-icon {
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    margin-left: 10px;
}

.vis-top-icon:hover {
    border-radius: 50%;
    background: rgba(89, 89, 89, 0.1);
}

.vis-top-icon-png {
    width: 1em;
    height: 1em;
    background-image: url(../assets/token.png);
    background-repeat: no-repeat;
    background-size: 100% 100%;
}

.vis-top-icon-png_h {
    background-image: url(../assets/token_h.png);
}

.location_item {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    margin: 10px;
    margin-bottom: 0px;
    background-color: var(--vis-bgc);
    padding: 10px;
    border-radius: 10px;
    cursor: pointer;
}

.location_img {
    width: 120px;
    height: 80px;
    border-radius: 5px;
    margin-right: 10px;
    object-fit: cover;
}

.location_info {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    height: 80px;
}

.location_name {
    width: 200px;
    height: 30px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    padding-right: 10px;
    box-sizing: border-box;
    font-weight: bold;
    font-size: var(--vis-font-size-2);
}

.location_address {
    width: 200px;
    white-space: wrap;
    overflow: hidden;
    text-overflow: ellipsis;
    padding-right: 10px;
    box-sizing: border-box;
    color: var(--vis-gray);
    font-size: var(--vis-font-size-1);
}

.measure_items {
    display: flex;
    align-items: center;
    justify-content: space-around;
    margin-bottom: 0px;
    padding: 10px;
    box-sizing: border-box;
    border-radius: 10px;
}

.measure_items_button {
    width: 80px;
    height: 30px;
    line-height: 30px;
    align-items: center;
    border: 1px solid #ccc;
    border-radius: 2px;
    font-size: 14px;
}

.measure_items_button:hover {
    border: 1px solid #3050d1;
}

.token_items {
    width: 100%;
    padding: 10px;
    box-sizing: border-box;

}

.token_items>div {
    width: 100%;
    height: 30px;
    display: flex;
    font-size: 14px;

}

.token_items>div>label {
    width: 100px;
    font-size: 12px;
}

.token_items>div>input {
    flex: 1;
    height: 25px;
    padding: 0 10px;
    border: 1px solid var(--vis-gray);
    outline: none;
    font-size: 12px;
}
</style>
