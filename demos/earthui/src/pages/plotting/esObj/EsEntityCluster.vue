<template>
  <PopList :title="'poi聚合'" :showButton="true" @close="cancel" @ok="ok">
    <LabelInput v-model="url" :label="'数据url'"></LabelInput>
  </PopList>
</template>
<script setup lang="ts">
import PopList from '../../../components/PopList.vue'
import { ref, inject } from 'vue'
import { XbsjEarthUi } from '../../../scripts/xbsjEarthUi'
import { getsceneObjNumfromSceneTree } from '../../../scripts/general'
import { ElMessage } from 'element-plus'
import { ESEntityCluster } from 'earthsdk3'
import LabelInput from '../../../components/LabelInput.vue'
const xbsjEarthUi = inject('xbsjEarthUi') as XbsjEarthUi
const url = ref()
const emits = defineEmits(['close'])
const ok = () => {
  if (!url.value) {
    ElMessage.warning('请填写路径')
    return
  }
  const sceneTree = xbsjEarthUi.getSceneTree()
  if (!sceneTree) return
  let treeItem: any
  const lastSceneTreeItem = sceneTree.lastSelectedItem
  if (!lastSceneTreeItem) {
    treeItem = sceneTree.createSceneObjectTreeItem(ESEntityCluster)
  } else {
    if (lastSceneTreeItem.type === 'Folder') {
      treeItem = sceneTree.createSceneObjectTreeItem(
        ESEntityCluster,
        undefined,
        lastSceneTreeItem,
        'Inner'
      )
    } else {
      treeItem = sceneTree.createSceneObjectTreeItem(
        ESEntityCluster,
        undefined,
        lastSceneTreeItem,
        'After'
      )
    }
  }
  sceneTree.uiTree.clearAllSelectedItems()
  treeItem.uiTreeObject.selected = true
  const sceneObject = treeItem.sceneObject
  xbsjEarthUi.propSceneTree = treeItem
  if (!sceneObject) return
  sceneObject.url = url.value
  const sceneObjectIndex = getsceneObjNumfromSceneTree(xbsjEarthUi, 'ESEntityCluster')
  sceneObject.name = 'poi聚合' + sceneObjectIndex
  emits('close')
}
const cancel = () => {
  emits('close')
}
</script>
