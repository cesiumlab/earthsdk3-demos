<script setup lang='ts'>
import { ElMessage } from 'element-plus'
import { ESPoi2D } from 'earthsdk3';
import { inject, onBeforeUnmount, onMounted, ref } from "vue";
import { getNoToken } from '../../api/service';
import { XbsjEarthUi } from '../../scripts/xbsjEarthUi';
import { createSceneObjTreeItemFromJson } from "../plotting/esObj/fun";

const xbsjEarthUi = inject('xbsjEarthUi') as XbsjEarthUi
const developContent = ref(false)
const name = ref('')
const searchList = ref<any[]>([])
function isAllSpaces(input: any) {
    return /^ *$/.test(input);
}
const liActive = ref(-1)
const liShow = ref(false)
const saerct = (e?: any) => {
    if (!name.value || isAllSpaces(name.value)) {
        ElMessage.warning('请输入搜索内容')
        liShow.value = false
        return
    }
    if (e) {
        //@ts-ignore
        e.target.blur()
    }
    liActive.value = -1
    developContent.value = true
    getNoToken(`https://restapi.amap.com/v3/place/text?key=2d3c6326ef327eecba326ac5780fcab1&keywords=${name.value}`).then((res: any) => {
        if (res.pois && res.pois.length > 0) {
            liShow.value = false
            searchList.value = res.pois
        } else {
            searchList.value =[]
            liShow.value = true
        }
    }).catch(error => {
        console.log(error);
        ElMessage.error(`${error}`)
    })
}
let sceneObject: ESPoi2D | undefined
const flyToNmae = (item: any, index: number) => {
    liActive.value = index
    const _location = item.location.indexOf(',');//获取第一个"_"的位置
    const a = item.location.substring(0, _location);
    const b = item.location.substring(_location + 1)
    const p = [Number(a), Number(b), 0]
    if (sceneObject) {
        sceneObject.name = item.name
        sceneObject.show = true
        sceneObject.position = [Number(removeSpaces(a)), Number(removeSpaces(b)), 0]
    }
    setTimeout(() => {
        sceneObject?.flyTo()
    }, 100)

}
function removeSpaces(str: string) {
    return str.trim().replace(/\s+/g, '');
}
const addSceneObjToTree = () => {
    if (!sceneObject || !sceneObject.show) {
        ElMessage.warning('请选择搜索结果')
        return
    }
    const json = sceneObject.json
    createSceneObjTreeItemFromJson(xbsjEarthUi, json)
}
const cleanName = () => {
    name.value = ''
    searchList.value = []
    if (sceneObject) {
        sceneObject.show = false
    }
    liActive.value = -1
    liShow.value = false
}
onMounted(() => {
    sceneObject = xbsjEarthUi.createSceneObject('ESPoi2D') as ESPoi2D
    sceneObject.show = false
    sceneObject.mode = "CircularH02"
    onBeforeUnmount(() => {
        if (sceneObject) {
            xbsjEarthUi.destroySceneObject(sceneObject)
            sceneObject = undefined
        }
    })
})
</script>

<template>
    <div class="search_search">
        <div class="add_scene" @click="addSceneObjToTree">添加当前定位到场景树</div>
        <div class="search_search_input">
            <input type="text" v-model="name" @blur="saerct" @keydown.enter="saerct($event)">
            <span @click="cleanName"><es-icon :name="'guanbi'" :color="'rgba(230, 230, 230, 1)'" :size="12" /></span>
        </div>
        <div class="title_name">地点</div>
        <ul>
            <li v-for="(item, index) in searchList" @click="flyToNmae(item, index)"
                :class="{ active: liActive === index }" :title="`${item.name}-${item.adname}-${item.address}`">
                <div class="location_img">
                    <img src="../../assets/search/location.png" alt="">
                </div>
                <div class="location_info">
                    <div>{{ item.name }}</div>
                    <div style="color: darkgrey;">{{ item.adname }}-{{ item.address }}</div>
                </div>

            </li>
            <li style="font-size: 14px;" v-show="liShow">未检索到相关定位信息</li>
        </ul>
    </div>
</template>
