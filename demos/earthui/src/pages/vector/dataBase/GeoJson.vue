<template>
  <PopList :title="'GeoJson'" :showButton="true" @ok="addSceneObjects">
    <div class="ei_content">
      <div class="ei_item">
        <label class="ei_label">路径</label>
        <el-input v-model="serveUrl" type="textarea" size="small" :rows="3" style="flex: 1;"
          placeholder="请输入服务地址"></el-input>
      </div>
    </div>
  </PopList>
</template>
<script setup lang="ts">
import { ElMessage } from 'element-plus'
import { ESGeoJson, SceneTree } from 'earthsdk3'
import { inject, ref } from 'vue'
import PopList from '../../../components/PopList.vue'
import { getsceneObjNumfromSceneTree } from '../../../scripts/general'
import { XbsjEarthUi } from '../../../scripts/xbsjEarthUi'
import { isJsonObjectString } from '@/utils/isJsonObjectString'
const xbsjEarthUi = inject('xbsjEarthUi') as XbsjEarthUi
const sceneTree = inject('sceneTree') as SceneTree
const serveUrl = ref()
const emits = defineEmits(['close'])

//增加ESGeoJson
const addSceneObjects = () => {
  if (!serveUrl.value) {
    ElMessage.warning('请者输入地址路径')
    return
  }
  const currentTreeItem = sceneTree.lastSelectedItem
  let newTreeItem
  if (!currentTreeItem) {
    newTreeItem = sceneTree.createSceneObjectTreeItem('ESGeoJson')
  } else if (currentTreeItem?.type === 'Folder') {
    newTreeItem = sceneTree.createSceneObjectTreeItem(
      'ESGeoJson',
      undefined,
      currentTreeItem,
      'Inner'
    )
  } else {
    newTreeItem = sceneTree.createSceneObjectTreeItem(
      'ESGeoJson',
      undefined,
      currentTreeItem,
      'After'
    )
  }
  if (!newTreeItem) return
  sceneTree.uiTree.clearAllSelectedItems()
  newTreeItem.uiTreeObject.selected = true
  if (!newTreeItem.sceneObject) return
  if (newTreeItem.sceneObject.typeName !== 'ESGeoJson') return
  const sceneObject = newTreeItem.sceneObject as ESGeoJson
  xbsjEarthUi.propSceneTree = newTreeItem
  const flag = isJsonObjectString(serveUrl.value.trim());
  if (!flag) {
    sceneObject.url = serveUrl.value
  } else {
    sceneObject.url = JSON.parse(serveUrl.value)
  }
  const objNum = getsceneObjNumfromSceneTree(xbsjEarthUi, 'ESGeoJson')
  newTreeItem.name = 'GeoJson' + objNum
  emits('close')
}
</script>
