<template>
  <PopList :title="'地形平球高程'" :showButton="true" :link="config.specialModuleEnable ? 'http://bjxbsj.cn' : ''" @ok="ok">
    <LabelInput v-model="horizontalElevation" :inputType="'number'" :label="'水平高程'"></LabelInput>
    <LabelInput v-model="terrainName" :label="'名称'"></LabelInput>
  </PopList>
</template>
<script setup lang="ts">
import { $g_config } from '@/global'
import { ESTerrainLayer, SceneTree } from 'earthsdk3'
import { inject, ref } from 'vue'
import LabelInput from '../../../components/LabelInput.vue'
import PopList from '../../../components/PopList.vue'
import { getsceneObjNumfromSceneTree, searchMaxZindex } from '../../../scripts/general'
import { XbsjEarthUi } from '../../../scripts/xbsjEarthUi'

const config = $g_config();

const sceneTree = inject('sceneTree') as SceneTree
const xbsjEarthUi = inject('xbsjEarthUi') as XbsjEarthUi

const emits = defineEmits(['close'])
const horizontalElevation = ref(0)
const terrainName = ref('平球地形')
const ok = () => {
  let maxZindex = searchMaxZindex(sceneTree, 'ESTerrainLayer')

  let sceneTreeItem
  const lastSceneTreeItem = sceneTree.lastSelectedItem
  if (!lastSceneTreeItem) {
    sceneTreeItem = sceneTree.createSceneObjectTreeItem('ESTerrainLayer')
  } else {
    if (lastSceneTreeItem.type === 'Folder') {
      sceneTreeItem = sceneTree.createSceneObjectTreeItem(
        'ESTerrainLayer',
        undefined,
        lastSceneTreeItem,
        'Inner'
      )
    } else {
      sceneTreeItem = sceneTree.createSceneObjectTreeItem(
        'ESTerrainLayer',
        undefined,
        lastSceneTreeItem,
        'After'
      )
    }
  }
  if (!sceneTreeItem || !sceneTreeItem.sceneObject) return
  sceneTree.uiTree.clearAllSelectedItems()
  sceneTreeItem.uiTreeObject.selected = true
  const sceneObject = sceneTreeItem.sceneObject as ESTerrainLayer
  xbsjEarthUi.propSceneTree = sceneTreeItem
  sceneObject.url = `http://inner.earthsdk.com/layer.json?h=${horizontalElevation.value}`
  const objNum = getsceneObjNumfromSceneTree(xbsjEarthUi, 'ESTerrainLayer')

  sceneObject.name = (terrainName.value === '' ? '平球地形' : terrainName.value) + objNum
  sceneObject.zIndex = maxZindex + 1
  setTimeout(() => {
    sceneObject.flyTo()
  }, 500)
  emits('close')
}
</script>
