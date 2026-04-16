<template>
  <PopList :title="'在线影像'" :showButton="true" @close="emits('close')" @ok="addSceneObjects">
    <div class="images_content">
      <div class="images_item ei_item">
        <label class="ei_label">服务地址</label>
        <el-input v-model="serveUrl" type="textarea" size="small" :rows="3" style="flex: 1;"
          placeholder="请输入服务地址"></el-input>
      </div>

      <div class="images_item">
        <label>名称</label>
        <el-input v-model="imageName" placeholder="请输入名称" style="flex: 1;"></el-input>
      </div>

      <div class="images_item" v-show="isShowTk.length > 1">
        <label>{{ isShowTk }}</label>
        <el-input v-model="tokenValue" placeholder="请输入token" style="flex: 1;"></el-input>
      </div>
      <div class="images_list">
        <div v-for="(item, index) in imagelist" class="images_list_item" :title="zh[item.cnname] ?? item.cnname">
          <div class="images_list_item_img" :class="{ 'active': checkedactive == index }"
            @click="changeServeUrl(item, index)">
            <img :src="image[item.cnname]" alt="" />
            <span>{{ zh[item.cnname] ?? item.cnname }}</span>
          </div>
        </div>
      </div>
    </div>
  </PopList>
</template>
<script setup lang="ts">
import PopList from '../../../components/PopList.vue'
import { inject, onMounted, ref } from 'vue'
import { getImageListurl } from '../../../api/api'
import { ESImageryLayer } from 'earthsdk3'
import { SceneTree } from 'earthsdk3'
import { ElMessage } from 'element-plus'
import { searchMaxZindex } from '../../../scripts/general'
import transform from './imageryLocale'
import { XbsjEarthUi } from '../../../scripts/xbsjEarthUi'
import { getsceneObjNumfromSceneTree } from '../../../scripts/general'
const sceneTree = inject('sceneTree') as SceneTree
const xbsjEarthUi = inject('xbsjEarthUi') as XbsjEarthUi
const { zh, image }: any = transform
const serveUrl = ref()
const checkedactive = ref()
const isShowTk = ref('')
const tokenValue = ref('')
const imagelist = ref<any[]>([])
const CoordinateType = ref('')
const loadingType = ref('')
const imageName = ref('未命名影像')
const emits = defineEmits(['close'])
const changeServeUrl = (item: any, index: number) => {
  serveUrl.value = item.url
  imageName.value = zh[item.cnname] ? zh[item.cnname] : item.cnname
  checkedactive.value = index
  CoordinateType.value = item.coordType
  loadingType.value = 'WGS84'
  isShowTk.value = item.requireField
}
//增加影像
const addSceneObjects = () => {
  let maxZindex = searchMaxZindex(sceneTree, 'ESImageryLayer')
  if (!serveUrl.value) ElMessage.error('请选择或者输入地址')
  if (isShowTk.value.length > 1 && !tokenValue.value) ElMessage.error('请输入token值')
  else if (serveUrl.value) {
    const currentTreeItem = sceneTree.lastSelectedItem
    let newTreeItem
    if (!currentTreeItem) {
      newTreeItem = sceneTree.createSceneObjectTreeItem('ESImageryLayer')
    } else if (currentTreeItem?.type === 'Folder') {
      newTreeItem = sceneTree.createSceneObjectTreeItem(
        'ESImageryLayer',
        undefined,
        currentTreeItem,
        'Inner'
      )
    } else {
      newTreeItem = sceneTree.createSceneObjectTreeItem(
        'ESImageryLayer',
        undefined,
        currentTreeItem,
        'After'
      )
    }
    if (!newTreeItem) return
    sceneTree.uiTree.clearAllSelectedItems()
    newTreeItem.uiTreeObject.selected = true
    if (!newTreeItem.sceneObject) return
    if (newTreeItem.sceneObject.typeName !== 'ESImageryLayer') return
    const sceneObject = newTreeItem.sceneObject as unknown as ESImageryLayer
    xbsjEarthUi.propSceneTree = newTreeItem
    const objNum = getsceneObjNumfromSceneTree(xbsjEarthUi, 'ESImageryLayer')

    newTreeItem.name = (imageName.value === '' ? '未命名影像' : imageName.value) + objNum
    if (isShowTk.value.length > 1) {
      sceneObject.url = `${serveUrl.value}&${isShowTk.value}=${tokenValue.value}`
    } else {
      sceneObject.url = serveUrl.value
    }
    sceneObject.zIndex = maxZindex + 1
    sceneObject.rectangle = [-180, -90, 180, 90]
    tokenValue.value = ''
    emits('close')
  }
}
onMounted(async () => {
  imagelist.value = await getImageListurl()
})
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
  width: 80px;
  font-size: 12px;
}

.images_item {
  display: flex;
  flex-direction: row;
  gap: 10px;
  justify-content: space-between;
  align-items: center;
}

.images_list {
  width: 100%;
  height: 250px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 15px;
  overflow-y: auto;
  box-sizing: border-box;
}

.images_list_item {
  width: 100px;
  height: 100px;
  background-color: var(--el-bg-color);
}

.images_list_item_img {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  border-radius: 5px;
  border: var(--el-border);
  box-sizing: border-box;
  cursor: pointer;
  transition: all 0.3s;
  padding: 5px;
  border-radius: 8px;

  &:hover {
    border-color: var(--el-color-primary);
  }

  &.active {
    border-color: var(--el-color-primary);
  }
}


.images_list_item_img img {
  width: 80px;
  height: 60px;
  border-radius: 8px;
}

.images_list_item_img span {
  font-size: 12px;
  text-align: center;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-top: 5px;
}
</style>
