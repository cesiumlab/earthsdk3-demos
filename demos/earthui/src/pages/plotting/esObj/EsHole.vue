<template>
  <!-- 选择框 -->
  <PopList :title="'组合挖坑'">
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
import { Message } from 'earthsdk-ui'
import { ESHole } from 'earthsdk3'
import { inject, onBeforeUnmount, onMounted, ref } from 'vue'
import PopList from '../../../components/PopList.vue'
import { getsceneObjNumfromSceneTree } from '../../../scripts/general'
import { XbsjEarthUi } from '../../../scripts/xbsjEarthUi'
import { createSceneObjTreeItemFromJson } from './fun'
const xbsjEarthUi = inject('xbsjEarthUi') as XbsjEarthUi
const modes = [
  {
    mode: 'DynamicWater',
    img: new URL('../../../assets/plotting/dynamicWater.png', import.meta.url).href,
    name: '组合挖坑'
  }
]
const iconIsShow: any = ref()
const selected: any = ref(modes[0])
let editingDispose: any = undefined
let sceneObject: ESHole | undefined = undefined
const select = (item: { mode: string; img: any; name: string }) => {
  //点击选择框中的地理水面按钮
  destroy()
  selected.value = item
  createSceneObject()
}
//创建组合挖坑场景对象
const createSceneObject = () => {
  if (!selected.value) return
  sceneObject = xbsjEarthUi.createSceneObject(ESHole) as ESHole
  if (sceneObject) {
    const sceneObjectIndex = getsceneObjNumfromSceneTree(xbsjEarthUi, 'ESHole')
    sceneObject.name = selected.value.name + (sceneObjectIndex + 1)
    sceneObject.interpolation = 5000
    //编辑状态结束后根据json创建在场景树上
    sceneObject.editing = true
    Message.loading({
      id: 'xxx',
      content: '1. 双击鼠标左键或点击ESC键退出编辑2. 点击空格键进行编辑方式的切换'
    })
    editingDispose = sceneObject.editingChanged.disposableOnce(() => {
      if (sceneObject && sceneObject.editing === false) {
        Message.remove('xxx')
        const json = sceneObject.json
        const pos = sceneObject.points?.length
        xbsjEarthUi.destroySceneObject(sceneObject)
        sceneObject = undefined
        setTimeout(() => {
          if (pos && pos >= 2) {
            const newJson = JSON.parse(JSON.stringify(json))
            newJson.interpolation = 50
            createSceneObjTreeItemFromJson(xbsjEarthUi, newJson)
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
    Message.remove('xxx')
    destroy()
  })
})
</script>
