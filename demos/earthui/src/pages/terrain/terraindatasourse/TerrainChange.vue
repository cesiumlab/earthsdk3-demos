<template>
  <PopList :title="'在线地形切片服务'" :showButton="true" @ok="addSceneObjects">
    <div class="images_bottom_content">
      <div class="images_servelocation">
        <label>服务地址</label>
        <textarea v-model="serveUrl" rows="4"></textarea>
      </div>
      <LabelInput v-model="terrainName" :label="'名称'"></LabelInput>
      <div class="images_servelocation" v-if="cesiumTerrain">
        <label>官方token</label><input type="text" v-model="ionAccessToken" />
      </div>
      <ul class="images_img_list">
        <li v-for="(item, index) in modellist" @click="changeServeUrl(item, index)">
          <div class="images_imgposition" :class="{ images_checkedactive: checkedactive == index }">
            <img :src="imageUrl" alt="" />
          </div>
          <div
            class="images_onlineimageName"
            @mouseenter="iconIsShow = index"
            @mouseleave="iconIsShow = null"
          >
            {{ item.cnname }}
          </div>
        </li>
      </ul>
    </div>
  </PopList>
</template>
<script setup lang="ts">
import PopList from '../../../components/PopList.vue'
import { ref, onMounted, onBeforeUnmount, watch, inject } from 'vue'
import { getNoToken } from '../../../api/service'
import { ElMessage } from 'element-plus'
import { ESTerrainLayer } from 'earthsdk3'
import { SceneTree } from 'earthsdk3'
import { searchMaxZindex } from '../../../scripts/general'
import { XbsjEarthUi } from '../../../scripts/xbsjEarthUi'
import { createVueDisposer, toVR } from 'earthsdk-ui'
import { getsceneObjNumfromSceneTree } from '../../../scripts/general'
import LabelInput from '../../../components/LabelInput.vue'
const xbsjEarthUi = inject('xbsjEarthUi') as XbsjEarthUi
const sceneTree = inject('sceneTree') as SceneTree

const d = createVueDisposer(onBeforeUnmount)
const imageUrl = new URL('../../../assets/images/labimages/cesiumterrain.jpg', import.meta.url).href
const ionAccessToken = toVR<string>(d, [xbsjEarthUi.activeViewer, 'ionAccessToken']) //token
const serveUrl = ref()
const checkedactive = ref()
const NormalVector = ref(false)
const WaterSurface = ref(false)
const iconIsShow = ref()
const modellist = ref()
const terrainName = ref('未命名地形')
const emits = defineEmits(['close'])
const cesiumTerrain = ref(false)
const changeServeUrl = (item: any, index: any) => {
  if (item.url === 'Ion(1)') {
    serveUrl.value = 'ion://1'
  } else {
    serveUrl.value = item.url
  }
  checkedactive.value = index
  NormalVector.value = !item.notSupportNormal
  WaterSurface.value = !item.notSupportWater
  terrainName.value = item.cnname
}
watch(serveUrl, (val) => {
  if (val === 'ion://1') {
    cesiumTerrain.value = true
  } else {
    cesiumTerrain.value = false
  }
})
//增加地形
const addSceneObjects = () => {
  let maxZindex = searchMaxZindex(sceneTree, 'ESTerrainLayer')
  if (!serveUrl.value) {
    ElMessage.warning('请选择或者输入地址')
    return
  }
  if (serveUrl.value === 'ion://1' && !ionAccessToken.value) {
    ElMessage.warning('请设置Cesium官方token')
    return
  }
  const currentTreeItem = sceneTree.lastSelectedItem
  let newTreeItem
  if (!currentTreeItem) {
    newTreeItem = sceneTree.createSceneObjectTreeItem('ESTerrainLayer')
  } else if (currentTreeItem?.type === 'Folder') {
    newTreeItem = sceneTree.createSceneObjectTreeItem(
      'ESTerrainLayer',
      undefined,
      currentTreeItem,
      'Inner'
    )
  } else {
    newTreeItem = sceneTree.createSceneObjectTreeItem(
      'ESTerrainLayer',
      undefined,
      currentTreeItem,
      'After'
    )
  }
  if (!newTreeItem) return
  sceneTree.uiTree.clearAllSelectedItems()
  newTreeItem.uiTreeObject.selected = true
  if (!newTreeItem.sceneObject) return
  if (newTreeItem.sceneObject.typeName !== 'ESTerrainLayer') return
  const sceneObject = newTreeItem.sceneObject as ESTerrainLayer
  xbsjEarthUi.propSceneTree = newTreeItem
  const objNum = getsceneObjNumfromSceneTree(xbsjEarthUi, 'ESTerrainLayer')

  newTreeItem.name = (terrainName.value === '' ? '未命名地形' : terrainName.value) + objNum
  sceneObject.url = serveUrl.value
  sceneObject.zIndex = maxZindex + 1
}
onMounted(() => {
  getNoToken('https://account.bjxbsj.cn/api/onlineResouces/terrain?desc=false')
    .then((res: any) => {
      if (res && res.result)
        // console.log(res);
        modellist.value = res.result
    })
    .catch((error) => {
      console.log(error)
      ElMessage.error(`${error}`)
    })
})
</script>
