<template>
    <PopList :title="'谷歌历史影像'" :showButton="true" @ok="addSceneObjects">
        <LabelInput v-model="url" :label="'名称'"></LabelInput>
        <div class="images_bottom_content">
            <div class="images_img_list">
                <div v-for="(item, index) in imagelist" class="images_img_lilist">
                    <div class="images_imgposition" :class="{ 'images_checkedactive': checkedactive == index }"
                        @click="changeServeUrl(item, index)">
                        <img :src="item.thumbnail ?? emptyImg" alt="">
                        <span v-show="iconIsShow == index ? true : false">{{ item.cnname }}</span>
                    </div>
                    <div class="images_onlineimageName" @mouseenter="iconIsShow = index"
                        @mouseleave="iconIsShow = undefined">{{ item.cnname }}</div>
                </div>
            </div>
        </div>
    </PopList>
</template>

<script setup lang="ts">
import PopList from '../../../components/PopList.vue';
import { searchMaxZindex } from '../../../scripts/general';
import { Message } from "earthsdk-ui";
import { ESGeHistoryImagery } from "earthsdk3-cesium";
import LabelInput from "../../../components/LabelInput.vue"
import { getsceneObjNumfromSceneTree } from "../../../scripts/general"
import { ref, inject } from 'vue';
import { SceneTree } from 'earthsdk3';
import { XbsjEarthUi } from '../../../scripts/xbsjEarthUi';
const sceneTree = inject('sceneTree') as SceneTree
const xbsjEarthUi = inject('xbsjEarthUi') as XbsjEarthUi
const url = ref()
const imagelist = ref([{
    cnname: '谷歌历史影像',
    thumbnail: undefined,
    url: '谷歌历史影像'
}])
const checkedactive = ref()
const iconIsShow = ref()
const emptyImg = new URL('../../../assets/common/images.png',import.meta.url).href
const emits = defineEmits(['close']);
const addSceneObjects = () => {
    let maxZindex = searchMaxZindex(sceneTree, 'ESImageryLayer');
    if (!url.value) {
        Message.error('请输入或者选择url');
        return
    }
    const currentTreeItem = sceneTree.lastSelectedItem
    let newTreeItem
    if (!currentTreeItem) {
        newTreeItem = sceneTree.createSceneObjectTreeItem('ESGeHistoryImagery')
    } else if (currentTreeItem?.type === 'Folder') {
        newTreeItem = sceneTree.createSceneObjectTreeItem('ESGeHistoryImagery', undefined, currentTreeItem, 'Inner')
    } else {
        newTreeItem = sceneTree.createSceneObjectTreeItem('ESGeHistoryImagery', undefined, currentTreeItem, 'After')
    }
    if (!newTreeItem) return
    sceneTree.uiTree.clearAllSelectedItems()
    newTreeItem.uiTreeObject.selected = true
    if (!newTreeItem.sceneObject) return
    const sceneObject = newTreeItem.sceneObject as unknown as ESGeHistoryImagery
    xbsjEarthUi.propSceneTree = newTreeItem
    const objNum = getsceneObjNumfromSceneTree(xbsjEarthUi, 'ESGeHistoryImagery')
    sceneObject.name = url.value + (objNum)

    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // 月份从0开始计数，因此要加1
    const day = date.getDate();
    //2022-12-06
    sceneObject.currentDate = `${year}-${month}-${day}`
    sceneObject.zIndex = maxZindex + 1
    const time = setTimeout(() => {
        sceneObject.flyTo();
        clearTimeout(time);
    }, 500);
    emits("close")
}
const changeServeUrl = (item: any, index: number) => {
    checkedactive.value = index
    url.value = item.url
}
</script>
