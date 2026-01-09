<template>
  <!-- 选择框 -->
  <PopList :title="'天空盒'" :show-button="true" @ok="ok">
    <div class="images_img_list">
      <div v-for="(item, index) in modes" class="images_img_lilist">
        <div
          class="images_imgposition"
          @click="select(item)"
          :class="{
            images_checkedactive: selected && item.mode === selected.mode
          }"
        >
          <img :src="item.img" alt="" />
          <span v-show="iconIsShow == index ? true : false">{{ item.name ?? '模式' }}</span>
        </div>
        <div
          class="images_onlineimageName"
          @mouseenter="iconIsShow = index"
          @mouseleave="iconIsShow = null"
        >
          {{ item.name ?? '模式' }}
        </div>
      </div>
    </div>
  </PopList>
</template>
<script setup lang="ts">
import PopList from '../../../components/PopList.vue'
import { ESLocalSkyBox } from 'earthsdk3'
import { inject, onMounted, ref } from 'vue'
import { createSceneObjTreeItemFromJson } from './fun'
import { XbsjEarthUi } from '../../../scripts/xbsjEarthUi'
import { getsceneObjNumfromSceneTree } from '../../../scripts/general'
import { ElMessage } from 'element-plus'
const xbsjEarthUi = inject('xbsjEarthUi') as XbsjEarthUi
const modes = [
  //多选模式类型
  {
    mode: 'baiyun',
    img: new URL('../../../assets/plotting/baiyun.png', import.meta.url).href,
    name: '白云朵朵'
  },
  {
    mode: 'blueSky',
    img: new URL('../../../assets/plotting/blueSky.png', import.meta.url).href,
    name: '碧海蓝天'
  },
  {
    mode: 'clearSky',
    img: new URL('../../../assets/plotting/clearSky.png', import.meta.url).href,
    name: '晴空万里'
  },
  {
    mode: 'dream',
    img: new URL('../../../assets/plotting/dream.png', import.meta.url).href,
    name: '梦幻'
  },
  {
    mode: 'starrySky',
    img: new URL('../../../assets/plotting/starrySky.png', import.meta.url).href,
    name: '浪漫星空'
  },
  {
    mode: 'sunnySky',
    img: new URL('../../../assets/plotting/sunnySky.png', import.meta.url).href,
    name: '风和日丽'
  },
  {
    mode: 'sunSets',
    img: new URL('../../../assets/plotting/sunSets.png', import.meta.url).href,
    name: '落霞'
  }
]
const iconIsShow: any = ref()
const selected: any = ref(modes[0])
const select = (item: { mode: string; img: any; name: string }) => {
  //点击选择框中的天空盒按钮
  selected.value = item
  // createSceneObject()
}
const ok = () => {
  // console.log(selected.value);
  if (!selected.value) {
    ElMessage.warning('请选择一个天空盒类型')
    return
  }
  createSceneObject()
}
//创建天空盒场景对象
const createSceneObject = () => {
  if (!selected.value) return
  const sceneTree = xbsjEarthUi.getSceneTree()
  if (!sceneTree) return
  let treeItem: any
  const lastSceneTreeItem = sceneTree.lastSelectedItem
  if (!lastSceneTreeItem) {
    treeItem = sceneTree.createSceneObjectTreeItemFromClass(ESLocalSkyBox)
  } else {
    if (lastSceneTreeItem.type === 'Folder') {
      treeItem = sceneTree.createSceneObjectTreeItemFromClass(
        ESLocalSkyBox,
        undefined,
        lastSceneTreeItem,
        'Inner'
      )
    } else {
      treeItem = sceneTree.createSceneObjectTreeItemFromClass(
        ESLocalSkyBox,
        undefined,
        lastSceneTreeItem,
        'After'
      )
    }
  }
  sceneTree.uiTree.clearAllSelectedItems()
  treeItem.uiTreeObject.selected = true
  const { sceneObject } = treeItem
  xbsjEarthUi.propSceneTree = treeItem
  const sceneObjectIndex = getsceneObjNumfromSceneTree(xbsjEarthUi, 'ESLocalSkyBox')
  sceneObject.name = selected.value.name + sceneObjectIndex
  sceneObject.mode = selected.value.mode
}
onMounted(() => {
  // createSceneObject()
})
</script>
