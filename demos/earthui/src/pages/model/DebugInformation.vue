<template>
  <RightList :title="'调试信息'">
    <div class="model_debug_list">
      <div>
        <span>遍历个数： {{ visited }}</span>
      </div>
      <div>
        <span>总显存： {{ totalMemory }}MB</span>
      </div>
      <div>
        <span>三角面个数： {{ numberOfTrianglesSelected }}</span>
      </div>
      <div>
        <span>纹理显存： {{ texturesByteLength }}MB</span>
      </div>
      <div>
        <span>显示个数： {{ selected }}</span>
      </div>
      <div>
        <span>几何体显存： {{ geometryByteLength }}MB</span>
      </div>
      <div>
        <span>渲染批次： {{ numberOfCommands }}</span>
      </div>
      <div>
        <span>属性数据长度： {{ batchTableByteLength }}KB</span>
      </div>
    </div>
  </RightList>
</template>
<script setup lang="ts">
import { ES3DTileset } from 'earthsdk3'
import { inject, onBeforeUnmount, onMounted, ref } from 'vue'
import RightList from '../../components/RightList.vue'
import { XbsjEarthUi } from '../../scripts/xbsjEarthUi'
const xbsjEarthUi = inject('xbsjEarthUi') as XbsjEarthUi
//遍历个数
const visited = ref()
//总显存
const totalMemory = ref()
//三角面个数
const numberOfTrianglesSelected = ref()
//纹理显存
const texturesByteLength = ref()
//显示个数
const selected = ref()
//几何体显存
const geometryByteLength = ref()
//渲染批次
const numberOfCommands = ref()
//属性数据长度
const batchTableByteLength = ref()
const viewer = xbsjEarthUi?.activeViewer
const sceneTree = xbsjEarthUi.sceneTree
const debugData = () => {
  if (!viewer) return
  const lastSelectedItem = sceneTree.lastSelectedItem
  if (
    !lastSelectedItem ||
    !lastSelectedItem.sceneObject ||
    !(lastSelectedItem.sceneObject instanceof ES3DTileset)
  )
    return
  const { sceneObject } = lastSelectedItem
  // @ts-ignore
  const czm3DTiles = viewer.getCzmObject(sceneObject).czm3DTiles
  if (!czm3DTiles) return
  try {
    // @ts-ignore
    const debugInformation = czm3DTiles.tileset.statistics
    if (!debugInformation) return
    visited.value = debugInformation.visited
    totalMemory.value = (
      (debugInformation.geometryByteLength + debugInformation.texturesByteLength) /
      1024 /
      1024
    ).toFixed(0)
    numberOfTrianglesSelected.value = debugInformation.numberOfTrianglesSelected
    texturesByteLength.value = (debugInformation.texturesByteLength / 1024 / 1024).toFixed(0)
    selected.value = debugInformation.selected
    geometryByteLength.value = (debugInformation.geometryByteLength / 1024 / 1024).toFixed(0)
    numberOfCommands.value = debugInformation.numberOfCommands
    batchTableByteLength.value = (debugInformation.batchTableByteLength / 1024).toFixed(0)
  } catch (error) {
    console.error(error)
  }
}
onMounted(() => {
  debugData()
  const timer = window.setInterval(() => {
    debugData()
  }, 1500)
  onBeforeUnmount(() => clearInterval(timer))
})
</script>
