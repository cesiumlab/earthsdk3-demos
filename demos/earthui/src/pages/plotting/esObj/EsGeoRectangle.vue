<template>
  <!-- 选择框 -->
  <PopList :title="'矩形'">
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
import { ESGeoRectangle } from 'earthsdk3'
import { ref, onMounted, inject, onBeforeUnmount } from 'vue'
import PopList from '../../../components/PopList.vue'
import { createSceneObjTreeItemFromJson, executePos } from './fun'
import { XbsjEarthUi } from '../../../scripts/xbsjEarthUi'
import { getsceneObjNumfromSceneTree } from '../../../scripts/general'


const xbsjEarthUi = inject('xbsjEarthUi') as XbsjEarthUi
const modes = [
  {
    img: new URL('../../../assets/plotting/w_rectangle.png', import.meta.url).href,
    name: '白色矩形',
    type: {
      strokeColor: [1, 1, 1, 1],
      fillColor: [1, 1, 1, 1]
    }
  },
  {
    img: new URL('../../../assets/plotting/r_rectangle.png', import.meta.url).href,
    name: '红色矩形',
    type: {
      strokeColor: [1, 0, 0, 1],
      fillColor: [1, 0, 0, 1]
    }
  }
]
const iconIsShow: any = ref()
const selected: any = ref(modes[0])
let editingDispose: any = undefined
let sceneObject: ESGeoRectangle | undefined = undefined
const select = (item: {
  type: { fillColor: number[]; strokeColor: number[] }
  img: any
  name: string
}) => {
  //点击选择框中的矩形按钮
  destroy()
  selected.value = item
  createSceneObject()
}

//创建矩形场景对象
const createSceneObject = () => {
  if (!selected.value) return
  sceneObject = xbsjEarthUi.createSceneObject(ESGeoRectangle) as ESGeoRectangle
  if (sceneObject) {
    const sceneObjectIndex = getsceneObjNumfromSceneTree(xbsjEarthUi, 'ESGeoRectangle')
    sceneObject.name = selected.value.name + (sceneObjectIndex + 1)
    sceneObject.fillColor = selected.value.type.fillColor
    sceneObject.strokeColor = selected.value.type.strokeColor
    //编辑状态结束后根据json创建在场景树上
    sceneObject.editing = true

    editingDispose = sceneObject.editingChanged.disposableOnce(() => {
      if (sceneObject && sceneObject.editing === false) {

        const json = sceneObject.json
        const pos = sceneObject.points?.length
        xbsjEarthUi.destroySceneObject(sceneObject)
        sceneObject = undefined
        setTimeout(() => {
          if (pos && pos >= 2) {
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
