<template>
    <PopList :title="'在线影像'" :showButton="true" @close="emits('close')" @ok="addSceneObjects">
        <div class="images_bottom_content">
            <div class="images_servelocation">
                <label>服务地址</label>
                <textarea v-model="serveUrl" rows="4"></textarea>
            </div>
            <LabelInput v-model="imageName" :label="'名称'" ></LabelInput>
            <div class="images_servelocation" v-show="isShowTk.length > 1">
                <label>{{ isShowTk }}</label><input type="text" v-model="tokenValue">
            </div>
            <div class="images_img_list">
                <div v-for="(item, index) in imagelist" class="images_img_lilist">
                    <div class="images_imgposition" :class="{ 'images_checkedactive': checkedactive == index }"
                        @click="changeServeUrl(item, index)">
                        <img :src="image[item.cnname]" alt="">
                        <span v-show="iconIsShow == index ? true : false">{{ zh[item.cnname] ?? item.cnname }}</span>
                    </div>
                    <div class="images_onlineimageName" @mouseenter="iconIsShow = index"
                        @mouseleave="iconIsShow = undefined">{{ zh[item.cnname] ?? item.cnname }}</div>
                </div>
            </div>
        </div>
    </PopList>
</template>
<script setup lang="ts">
import PopList from '../../../components/PopList.vue';
import { inject, onMounted, ref } from 'vue';
import { getImageListurl } from '../../../api/api';
import { ESImageryLayer } from "earthsdk3";
import { SceneTree } from 'earthsdk3';
import { Message } from "earthsdk-ui"
import { searchMaxZindex } from '../../../scripts/general';
import transform from './imageryLocale';
import { XbsjEarthUi } from '../../../scripts/xbsjEarthUi';
import { getsceneObjNumfromSceneTree } from "../../../scripts/general";
import LabelInput from "../../../components/LabelInput.vue"
const sceneTree = inject('sceneTree') as SceneTree
const xbsjEarthUi = inject('xbsjEarthUi') as XbsjEarthUi
const iconIsShow = ref()
const { zh, image }: any = transform
const serveUrl = ref()
const checkedactive = ref()
const isShowTk = ref('')
const tokenValue = ref('')
const imagelist = ref()
const CoordinateType = ref('')
const loadingType = ref('')
const imageName=ref('未命名影像')
const emits = defineEmits(['close']);
const changeServeUrl = (item: any, index: number) => {
    serveUrl.value = item.url
    imageName.value=zh[item.cnname] ? zh[item.cnname] : item.cnname
    checkedactive.value = index
    CoordinateType.value = item.coordType
    loadingType.value = 'WGS84'
    isShowTk.value = item.requireField

}
//增加影像
const addSceneObjects = () => {
    let maxZindex = searchMaxZindex(sceneTree, 'ESImageryLayer');
    if (!serveUrl.value) Message.error('请选择或者输入地址');
    if (isShowTk.value.length > 1 && !tokenValue.value) Message.error('请输入token值');
    else if (serveUrl.value) {
        const currentTreeItem = sceneTree.lastSelectedItem
        let newTreeItem
        if (!currentTreeItem) {
            newTreeItem = sceneTree.createSceneObjectTreeItem('ESImageryLayer')
        } else if (currentTreeItem?.type === 'Folder') {
            newTreeItem = sceneTree.createSceneObjectTreeItem('ESImageryLayer', undefined, currentTreeItem, 'Inner')
        } else {
            newTreeItem = sceneTree.createSceneObjectTreeItem('ESImageryLayer', undefined, currentTreeItem, 'After')
        }
        if (!newTreeItem) return
        sceneTree.uiTree.clearAllSelectedItems()
        newTreeItem.uiTreeObject.selected = true
        if (!newTreeItem.sceneObject) return
        if (newTreeItem.sceneObject.typeName !== 'ESImageryLayer') return
        const sceneObject = newTreeItem.sceneObject as unknown as ESImageryLayer
        xbsjEarthUi.propSceneTree = newTreeItem
        const objNum = getsceneObjNumfromSceneTree(xbsjEarthUi, 'ESImageryLayer')

        newTreeItem.name = (imageName.value==='' ? '未命名影像':imageName.value) + (objNum);
        if (isShowTk.value.length > 1) {
            sceneObject.url = `${serveUrl.value}&${isShowTk.value}=${tokenValue.value}`
        }
        else {
            sceneObject.url = serveUrl.value
        }
        sceneObject.zIndex = maxZindex + 1
        sceneObject.rectangle = [-180, -90, 180, 90]
        tokenValue.value = ''
        emits("close")
    }
}
onMounted(async () => {
    imagelist.value = await getImageListurl()
})
</script>
