<template>
  <PopList :title="'矢量瓦片图层'" :showButton="true" @ok="addSceneObjects">
    <div class="ei_content">
      <div class="ei_item">
        <label class="ei_label">服务地址</label>
        <el-input v-model="serveUrl" type="textarea" size="small" :rows="3" style="flex: 1;"
          placeholder="请输入服务地址或JSON字符串"></el-input>
      </div>
      <div class="ei_item">
        <label>名称</label>
        <el-input v-model="layerName" placeholder="请输入名称" style="flex: 1;"></el-input>
      </div>
      <div class="ei_item">
        <label>accessToken</label>
        <el-input v-model="accessToken" placeholder="sk.xxx (optional)" style="flex: 1;"></el-input>
      </div>

      <div class="ei_list">
        <div class="ei_list_item" v-for="item in serviceList" :key="item.title"
          :class="{ 'active': serveUrl === item.url }" :title="item.title" @click="changeServeUrl(item)">
          <img :src="item.thumbnail" alt="">
          <span>{{ item.title }}</span>
        </div>
      </div>
    </div>
  </PopList>
</template>
<script setup lang="ts">
import { isJsonObjectString } from '@/utils/isJsonObjectString'
import { ESMVTLayer, SceneTree } from 'earthsdk3'
import { ElMessage } from 'element-plus'
import { inject, ref } from 'vue'
import PopList from '../../../components/PopList.vue'
import { getsceneObjNumfromSceneTree } from '../../../scripts/general'
import { XbsjEarthUi } from '../../../scripts/xbsjEarthUi'
import { MVTLayerList } from './consts'
const xbsjEarthUi = inject('xbsjEarthUi') as XbsjEarthUi
const sceneTree = inject('sceneTree') as SceneTree
const serveUrl = ref('')
const layerName = ref('未命名矢量瓦片图层')
const accessToken = ref('');

const emits = defineEmits(['close'])

const typeName = 'ESMVTLayer';

const changeServeUrl = (item: { title: string, url: string }) => {
  serveUrl.value = item.url;
  layerName.value = item.title;
}

const serviceList = [...MVTLayerList];

//增加ESGeoJson
const addSceneObjects = () => {
  if (!serveUrl.value) {
    ElMessage.warning('请者输入地址路径')
    return
  }
  const currentTreeItem = sceneTree.lastSelectedItem
  let newTreeItem
  if (!currentTreeItem) {
    newTreeItem = sceneTree.createSceneObjectTreeItem(typeName)
  } else if (currentTreeItem?.type === 'Folder') {
    newTreeItem = sceneTree.createSceneObjectTreeItem(
      typeName,
      undefined,
      currentTreeItem,
      'Inner'
    )
  } else {
    newTreeItem = sceneTree.createSceneObjectTreeItem(
      typeName,
      undefined,
      currentTreeItem,
      'After'
    )
  }
  if (!newTreeItem) return;
  sceneTree.uiTree.clearAllSelectedItems();
  newTreeItem.uiTreeObject.selected = true;
  if (!newTreeItem.sceneObject) return;
  if (newTreeItem.sceneObject.typeName !== typeName) return;
  const sceneObject = newTreeItem.sceneObject as ESMVTLayer;
  xbsjEarthUi.propSceneTree = newTreeItem;
  accessToken.value && (sceneObject.accessToken = accessToken.value);
  const flag = isJsonObjectString(serveUrl.value.trim());
  if (!flag) {
    sceneObject.url = serveUrl.value
  } else {
    sceneObject.url = JSON.parse(serveUrl.value)
  }
  const objNum = getsceneObjNumfromSceneTree(xbsjEarthUi, typeName);
  newTreeItem.name = (layerName.value === '' ? '未命名矢量瓦片图层' : layerName.value) + objNum
  emits('close')
}
</script>
