<template>
    <PopList :title="'GeoJson'" :showButton="true" @ok="addSceneObjects">
        <div class="images_bottom_content">
            <div class="images_servelocation">
                <label>路径</label>
                <textarea v-model="serveUrl" rows="4"></textarea>
            </div>
        </div>
    </PopList>
</template>
<script setup lang="ts">
import { Message } from "earthsdk-ui";
import { ESGeoJson, SceneTree } from "earthsdk3";
import { inject, ref } from 'vue';
import PopList from "../../../components/PopList.vue";
import { getsceneObjNumfromSceneTree } from "../../../scripts/general";
import { XbsjEarthUi } from "../../../scripts/xbsjEarthUi";
const xbsjEarthUi = inject('xbsjEarthUi') as XbsjEarthUi
const sceneTree = inject('sceneTree') as SceneTree
const serveUrl = ref()
const emits = defineEmits(['close']);

//增加ESGeoJson
const addSceneObjects = () => {
    if (!serveUrl.value) {
        Message.warning('请者输入地址路径')
        return
    };
    const currentTreeItem = sceneTree.lastSelectedItem
    let newTreeItem
    if (!currentTreeItem) {
        newTreeItem = sceneTree.createSceneObjectTreeItem('ESGeoJson')
    } else if (currentTreeItem?.type === 'Folder') {
        newTreeItem = sceneTree.createSceneObjectTreeItem('ESGeoJson', undefined, currentTreeItem, 'Inner')
    } else {
        newTreeItem = sceneTree.createSceneObjectTreeItem('ESGeoJson', undefined, currentTreeItem, 'After')
    }
    if (!newTreeItem) return
    sceneTree.uiTree.clearAllSelectedItems()
    newTreeItem.uiTreeObject.selected = true
    if (!newTreeItem.sceneObject) return
    if (newTreeItem.sceneObject.typeName !== 'ESGeoJson') return
    const sceneObject = newTreeItem.sceneObject as ESGeoJson
    xbsjEarthUi.propSceneTree = newTreeItem
    if (serveUrl.value.trim().startsWith("http")) {
        sceneObject.url = serveUrl.value
    } else {
        sceneObject.url = JSON.parse(serveUrl.value)
    }
    const objNum = getsceneObjNumfromSceneTree(xbsjEarthUi, 'ESGeoJson')
    newTreeItem.name = 'GeoJson' + objNum;
    emits("close")
}
</script>