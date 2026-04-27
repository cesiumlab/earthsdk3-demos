<template>
  <PopList :title="'谷歌历史影像'" :showButton="true" @ok="addSceneObjects">
    <div class="images_content">
      <div class="images_item">
        <label>名称</label>
        <el-input v-model="url" style="flex: 1;" placeholder="请输入名称"></el-input>
      </div>
    </div>
  </PopList>
</template>

<script setup lang="ts">
import { SceneTree } from 'earthsdk3'
import { ESGeHistoryImagery } from 'earthsdk3-cesium'
import { ElMessage } from 'element-plus'
import { inject, ref } from 'vue'
import PopList from '../../../components/PopList.vue'
import { getsceneObjNumfromSceneTree, searchMaxZindex } from '../../../scripts/general'
import { XbsjEarthUi } from '../../../scripts/xbsjEarthUi'
const sceneTree = inject('sceneTree') as SceneTree
const xbsjEarthUi = inject('xbsjEarthUi') as XbsjEarthUi
const url = ref('谷歌历史影像')
const emits = defineEmits(['close'])
const addSceneObjects = () => {
  let maxZindex = searchMaxZindex(sceneTree, 'ESImageryLayer')
  if (!url.value) {
    ElMessage.error('请输入或者选择url')
    return
  }
  const currentTreeItem = sceneTree.lastSelectedItem
  let newTreeItem
  if (!currentTreeItem) {
    newTreeItem = sceneTree.createSceneObjectTreeItem('ESGeHistoryImagery')
  } else if (currentTreeItem?.type === 'Folder') {
    newTreeItem = sceneTree.createSceneObjectTreeItem(
      'ESGeHistoryImagery',
      undefined,
      currentTreeItem,
      'Inner'
    )
  } else {
    newTreeItem = sceneTree.createSceneObjectTreeItem(
      'ESGeHistoryImagery',
      undefined,
      currentTreeItem,
      'After'
    )
  }
  if (!newTreeItem) return
  sceneTree.uiTree.clearAllSelectedItems()
  newTreeItem.uiTreeObject.selected = true
  if (!newTreeItem.sceneObject) return
  const sceneObject = newTreeItem.sceneObject as unknown as ESGeHistoryImagery
  xbsjEarthUi.propSceneTree = newTreeItem
  const objNum = getsceneObjNumfromSceneTree(xbsjEarthUi, 'ESGeHistoryImagery')
  sceneObject.name = url.value + objNum

  const date = new Date()
  const year = date.getFullYear()
  const month = date.getMonth() + 1 // 月份从0开始计数，因此要加1
  const day = date.getDate()
  //2022-12-06
  sceneObject.currentDate = `${year}-${month}-${day}`
  sceneObject.zIndex = maxZindex + 1
  const time = setTimeout(() => {
    sceneObject.flyTo()
    clearTimeout(time)
  }, 500)
  emits('close')
}

</script>
<style scoped>
.images_content {
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  box-sizing: border-box;
}

.images_item label {
  width: 50px;
  font-size: 12px;
}

.images_item {
  display: flex;
  flex-direction: row;
  gap: 10px;
  justify-content: space-between;
  align-items: center;
}
</style>
