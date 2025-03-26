<template>
    <PopList :title="'Czml'" :showButton="true" @ok="addSceneObjects">
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
import { ESCzml } from "earthsdk3";
import { inject, ref } from 'vue';
import { SceneTree } from 'earthsdk3';
import PopList from "../../../components/PopList.vue";
import { XbsjEarthUi } from "../../../scripts/xbsjEarthUi";
import { getsceneObjNumfromSceneTree } from "../../../scripts/general"
const sceneTree = inject('sceneTree') as SceneTree
const xbsjEarthUi = inject('xbsjEarthUi') as XbsjEarthUi
const serveUrl = ref()

const emits = defineEmits(['close']);
//增加ESGeoJson
const addSceneObjects = () => {
    if (!serveUrl.value) {
        Message.warning('请者输入地址路径')
        return
    }
    const currentTreeItem = sceneTree.lastSelectedItem
    let newTreeItem
    if (!currentTreeItem) {
        newTreeItem = sceneTree.createSceneObjectTreeItem('ESCzml')
    } else if (currentTreeItem?.type === 'Folder') {
        newTreeItem = sceneTree.createSceneObjectTreeItem('ESCzml', undefined, currentTreeItem, 'Inner')
    } else {
        newTreeItem = sceneTree.createSceneObjectTreeItem('ESCzml', undefined, currentTreeItem, 'After')
    }
    if (!newTreeItem) return
    sceneTree.uiTree.clearAllSelectedItems()
    newTreeItem.uiTreeObject.selected = true
    if (!newTreeItem.sceneObject) return
    if (newTreeItem.sceneObject.typeName !== 'ESCzml') return
    const sceneObject = newTreeItem.sceneObject as ESCzml
    xbsjEarthUi.propSceneTree = newTreeItem
    if (serveUrl.value.trim().startsWith("http")) {
        sceneObject.uri = serveUrl.value
    } else {
        sceneObject.data = serveUrl.value
    }
    const objNum = getsceneObjNumfromSceneTree(xbsjEarthUi, 'ESCzml')
    newTreeItem.name = 'Czml' + objNum;
    emits("close")
}
</script>