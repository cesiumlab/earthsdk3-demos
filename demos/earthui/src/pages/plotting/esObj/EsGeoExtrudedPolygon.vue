<template>
  <!-- 选择框 -->
  <PopList :title="'挤压多边形'">
    <div class="images_img_list">
      <div v-for="(item, index) in modes" class="images_img_lilist">
        <div class="images_imgposition" @click="select(item)" :class="{
          images_checkedactive: selected && item.name === selected.name
        }">
          <img :src="item.img" alt="" />
          <span v-show="iconIsShow == index ? true : false">{{ item.name ?? '模式' }}</span>
        </div>
        <div class="images_onlineimageName" @mouseenter="iconIsShow = index" @mouseleave="iconIsShow = null">
          {{ item.name ?? '模式' }}
        </div>
      </div>
    </div>
  </PopList>
</template>
<script setup lang="ts">
import PopList from '../../../components/PopList.vue'
import { ESGeoExtrudedPolygon } from 'earthsdk3'
import { inject, onMounted, ref, onBeforeUnmount } from 'vue'
import { createSceneObjTreeItemFromJson, executePos } from './fun'
import { XbsjEarthUi } from '../../../scripts/xbsjEarthUi'
import { getsceneObjNumfromSceneTree } from '../../../scripts/general'

const xbsjEarthUi = inject('xbsjEarthUi') as XbsjEarthUi
const modes = [
  {
    img: new URL('../../../assets/plotting/esGeoExtrudedPolygon.png', import.meta.url).href,
    name: '挤压多边形',
    height: 0
  }
]
const iconIsShow: any = ref()
const selected: any = ref(modes[0])
let editingDispose: any = undefined
let sceneObject: ESGeoExtrudedPolygon | undefined = undefined
const select = (item: { img: any; name: string; height: number }) => {
  //点击选择框中的多边形按钮
  destroy()
  selected.value = item
  createSceneObject()
}
//创建矩多边形景对象
const createSceneObject = () => {
  if (!selected.value) return
  sceneObject = xbsjEarthUi.createSceneObject(ESGeoExtrudedPolygon) as ESGeoExtrudedPolygon
  if (sceneObject) {
    const sceneObjectIndex = getsceneObjNumfromSceneTree(xbsjEarthUi, 'ESGeoExtrudedPolygon')
    sceneObject.name = selected.value.name + (sceneObjectIndex + 1)
    sceneObject.height = selected.value.height
    //编辑状态结束后根据json创建在场景树上
    sceneObject.editing = true

    editingDispose = sceneObject.editingChanged.disposableWeakOn(() => {
      if (sceneObject && sceneObject.editing === false) {

        const json = sceneObject.json
        const pos = sceneObject.points?.length
        xbsjEarthUi.destroySceneObject(sceneObject)
        sceneObject = undefined
        setTimeout(() => {
          if (pos && pos >= 3) {
            createSceneObjTreeItemFromJson(xbsjEarthUi, json)
            selected.value = undefined
          }
        }, 300)
      }
    })
  }
}
const destroy = () => {
  if (sceneObject && sceneObject.editing) {
    if (editingDispose) {
      editingDispose()
      editingDispose = undefined
    }
    sceneObject.editing = false
    xbsjEarthUi.destroySceneObject(sceneObject)
    sceneObject = undefined
  }
}
onMounted(() => {
  createSceneObject()
  onBeforeUnmount(() => {

    destroy()
  })
})
</script>
