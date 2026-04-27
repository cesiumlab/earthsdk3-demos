<template>
  <PopList :title="'在线模型切片服务'" :showButton="true" @close="close" @ok="addSceneObjects">
    <div class="ei_content">
      <div class="ei_item">
        <label class="ei_label">服务地址</label>
        <el-input type="textarea" v-model="serveUrl" rows="3" style="flex: 1;"></el-input>
      </div>

      <div class="ei_item">
        <label>名称</label>
        <el-input v-model="modelName" placeholder="请输入名称" style="flex: 1;"></el-input>
      </div>
      <!-- <LabelInput v-model="modelName" :label="'名称'"></LabelInput> -->
    </div>
  </PopList>
</template>
<script setup lang="ts">
import { ElMessage } from 'element-plus'
import { ES3DTileset } from 'earthsdk3'
import { inject, ref } from 'vue'
import { SceneTree } from 'earthsdk3'
import PopList from '../../../components/PopList.vue'
import { XbsjEarthUi } from '../../../scripts/xbsjEarthUi'
import { getsceneObjNumfromSceneTree } from '../../../scripts/general'
import LabelInput from '../../../components/LabelInput.vue'
const sceneTree = inject('sceneTree') as SceneTree
const xbsjEarthUi = inject('xbsjEarthUi') as XbsjEarthUi
const modelName = ref('未命名瓦片')
const serveUrl = ref()
const emits = defineEmits(['close'])
const close = () => {
  emits('close')
}

//增加瓦片
const addSceneObjects = () => {
  if (!serveUrl.value) ElMessage.warning('请选择或者输入地址')
  else if (serveUrl.value) {
    const currentTreeItem = sceneTree.lastSelectedItem
    let newTreeItem
    if (!currentTreeItem) {
      newTreeItem = sceneTree.createSceneObjectTreeItem('ES3DTileset')
    } else if (currentTreeItem?.type === 'Folder') {
      newTreeItem = sceneTree.createSceneObjectTreeItem(
        'ES3DTileset',
        undefined,
        currentTreeItem,
        'Inner'
      )
    } else {
      newTreeItem = sceneTree.createSceneObjectTreeItem(
        'ES3DTileset',
        undefined,
        currentTreeItem,
        'After'
      )
    }
    if (!newTreeItem) return
    sceneTree.uiTree.clearAllSelectedItems()
    newTreeItem.uiTreeObject.selected = true
    if (!newTreeItem.sceneObject) return
    if (newTreeItem.sceneObject.typeName !== 'ES3DTileset') return
    const sceneObject = newTreeItem.sceneObject as ES3DTileset
    xbsjEarthUi.propSceneTree = newTreeItem
    sceneObject.url = serveUrl.value
    sceneObject.tilesetReady.donce((tileset) => {
      sceneObject.flyTo(1)
    })
    const objNum = getsceneObjNumfromSceneTree(xbsjEarthUi, 'ES3DTileset')

    newTreeItem.name = (modelName.value === '' ? '未命名瓦片' : modelName.value) + objNum
    emits('close')
  }
}
</script>
