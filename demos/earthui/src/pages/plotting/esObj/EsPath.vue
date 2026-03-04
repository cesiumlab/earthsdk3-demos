<template>
  <!-- 选择框 -->
  <PopList :title="'路径'">
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
import { ESPath } from 'earthsdk3'
import { inject, onMounted, ref, onBeforeUnmount } from 'vue'
import PopList from '../../../components/PopList.vue'
import { XbsjEarthUi } from '../../../scripts/xbsjEarthUi'
import { getsceneObjNumfromSceneTree } from '../../../scripts/general'
import { createSceneObjTreeItemFromJson, executePos } from './fun'

const xbsjEarthUi = inject('xbsjEarthUi') as XbsjEarthUi
const modes = [
  {
    mode: 'singleArrow',
    img: new URL('../../../assets/plotting/singleArrow.png', import.meta.url).href,
    name: '单箭头路径'
  },
  {
    mode: 'multipleArrows',
    img: new URL('../../../assets/plotting/multipleArrows.png', import.meta.url).href,
    name: '多箭头路径'
  },
  {
    mode: 'pureColor',
    img: new URL('../../../assets/plotting/pureColor.png', import.meta.url).href,
    name: '纯色路径'
  }
]
const iconIsShow: any = ref()
const selected: any = ref(modes[0])
let editingDispose: any = undefined
let sceneObject: ESPath | undefined = undefined
const select = (item: { mode: string; img: any; name: string }) => {
  //点击选择框中的路径按钮
  destroy()
  selected.value = item
  createSceneObject()
}
//创建路径场景对象
const createSceneObject = () => {
  if (!selected.value) return
  sceneObject = xbsjEarthUi.createSceneObject(ESPath) as ESPath
  if (sceneObject) {
    sceneObject.materialMode = selected.value.mode
    const sceneObjectIndex = getsceneObjNumfromSceneTree(xbsjEarthUi, 'ESPath')
    sceneObject.name = selected.value.name + (sceneObjectIndex + 1)
    //编辑状态结束后根据json创建在场景树上
    sceneObject.editing = true

    editingDispose = sceneObject.editingChanged.disposableWeakOn(() => {
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
