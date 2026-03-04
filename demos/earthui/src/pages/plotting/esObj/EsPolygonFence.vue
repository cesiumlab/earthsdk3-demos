<template>
  <!-- 选择框 -->
  <PopList :title="'电子围栏'">
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
import { ESPolygonFence } from 'earthsdk3'
import { inject, onMounted, ref, onBeforeUnmount } from 'vue'
import PopList from '../../../components/PopList.vue'
import { XbsjEarthUi } from '../../../scripts/xbsjEarthUi'
import { getsceneObjNumfromSceneTree } from '../../../scripts/general'
import { createSceneObjTreeItemFromJson, executePos } from './fun'

const xbsjEarthUi = inject('xbsjEarthUi') as XbsjEarthUi
const modes = [
  {
    mode: 'danger',
    img: new URL('../../../assets/plotting/danger.png', import.meta.url).href,
    name: '电子围栏1'
  },
  {
    mode: 'checkerboard',
    img: new URL('../../../assets/plotting/checkerboard.png', import.meta.url).href,
    name: '电子围栏2'
  },
  {
    mode: 'warning',
    img: new URL('../../../assets/plotting/warning.png', import.meta.url).href,
    name: '电子围栏3'
  },
  {
    mode: 'cord',
    img: new URL('../../../assets/plotting/cord.png', import.meta.url).href,
    name: '电子围栏4'
  },
  {
    mode: 'scanline',
    img: new URL('../../../assets/plotting/scanline.png', import.meta.url).href,
    name: '电子围栏5'
  },
  {
    mode: 'honeycomb',
    img: new URL('../../../assets/plotting/honeycomb.png', import.meta.url).href,
    name: '电子围栏6'
  },
  {
    mode: 'gradientColor',
    img: new URL('../../../assets/plotting/dianziweilan.png', import.meta.url).href,
    name: '电子围栏7'
  }
]
const iconIsShow: any = ref()
const selected: any = ref(modes[0])
let editingDispose: any = undefined
let sceneObject: ESPolygonFence | undefined = undefined
const select = (item: { mode: string; img: any; name: string }) => {
  //点击选择框中的电子围栏按钮
  destroy()
  selected.value = item
  createSceneObject()
}
//创建电子围栏场景对象
const createSceneObject = () => {
  if (!selected.value) return
  sceneObject = xbsjEarthUi.createSceneObject(ESPolygonFence) as ESPolygonFence
  if (sceneObject) {
    sceneObject.filled = true
    sceneObject.materialMode = selected.value.mode
    const sceneObjectIndex = getsceneObjNumfromSceneTree(xbsjEarthUi, 'ESPolygonFence')
    sceneObject.name = selected.value.name + '-' + (sceneObjectIndex + 1)
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
