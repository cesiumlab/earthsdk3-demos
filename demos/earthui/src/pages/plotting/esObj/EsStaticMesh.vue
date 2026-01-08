<template>
  <PopList :title="'静态网格体'" :showButton="true" @close="cancel" @ok="ok">
    <LabelInput v-model="mesh" :label="'mesh路径'"></LabelInput>
    <LabelInput
      v-model="position[0]"
      :inputType="'number'"
      :label="'经度'"
      :max="180"
      :min="-180"
      :placeholder="'请输入经度或者点击地球获取'"
    >
    </LabelInput>
    <LabelInput
      v-model="position[1]"
      :inputType="'number'"
      :label="'纬度'"
      :max="90"
      :min="-90"
      :placeholder="'请输入纬度或者点击地球获取'"
    >
    </LabelInput>
    <LabelInput
      v-model="position[2]"
      :inputType="'number'"
      :label="'高度'"
      :placeholder="'请输入高度或者点击地球获取'"
    >
    </LabelInput>
  </PopList>
</template>
<script setup lang="ts">
import PopList from '../../../components/PopList.vue'
import { ref, inject, onMounted, onBeforeUnmount } from 'vue'
import { ueActorResult } from './fun'
import { XbsjEarthUi } from '../../../scripts/xbsjEarthUi'
import { getsceneObjNumfromSceneTree } from '../../../scripts/general'
import { ElMessage } from 'element-plus'
import LabelInput from '../../../components/LabelInput.vue'
import { ESStaticMesh } from 'earthsdk3'
const xbsjEarthUi = inject('xbsjEarthUi') as XbsjEarthUi
const mesh = ref()
const position = ref([undefined, undefined, undefined])
const emits = defineEmits(['close'])
const pos = (messages: { [key: string]: any }) => {
  const a = messages
  const pos = a.map((num: number) => Number(num.toFixed(7)))
  if (pos) {
    position.value = pos
  }
}
//调用点击返回拾取信息函数
const dispose = ueActorResult(xbsjEarthUi, pos)
const destroy = () => {
  //销毁
  if (dispose) dispose()
}
const ok = () => {
  if (!mesh.value) {
    ElMessage.warning('请填写路径')
    return
  }
  if (!position.value[0] || !position.value[1]) {
    ElMessage.warning('请填写经纬度')
    return
  }
  const viewer = xbsjEarthUi.activeViewer
  if (!viewer) return
  if (viewer.typeName !== 'ESUeViewer') {
    ElMessage.warning('请在ue视口下操作')
    return
  }
  const sceneTree = xbsjEarthUi.getSceneTree()
  if (!sceneTree) return
  let treeItem: any
  const lastSceneTreeItem = sceneTree.lastSelectedItem
  if (!lastSceneTreeItem) {
    treeItem = sceneTree.createSceneObjectTreeItem(ESStaticMesh)
  } else {
    if (lastSceneTreeItem.type === 'Folder') {
      treeItem = sceneTree.createSceneObjectTreeItem(
        ESStaticMesh,
        undefined,
        lastSceneTreeItem,
        'Inner'
      )
    } else {
      treeItem = sceneTree.createSceneObjectTreeItem(
        ESStaticMesh,
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
  sceneObject.mesh = mesh.value
  const sceneObjectIndex = getsceneObjNumfromSceneTree(xbsjEarthUi, 'ESStaticMesh')
  sceneObject.position = position.value
  sceneObject.name = '静态网格体' + (sceneObjectIndex + 1)
  emits('close')
  destroy()
}
const cancel = () => {
  emits('close')
  destroy()
}
onMounted(() => {
  ElMessage.warning('可以通过点击地球获取经纬度点')
})
onBeforeUnmount(() => destroy())
</script>
