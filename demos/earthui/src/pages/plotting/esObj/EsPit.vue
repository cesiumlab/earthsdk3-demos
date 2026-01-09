<template>
  <!-- 选择框 -->
  <PopList :title="'坑'">
    <div class="images_img_list">
      <div v-for="(item, index) in modes" class="images_img_lilist">
        <div
          class="images_imgposition"
          @click="select(item)"
          :class="{
            images_checkedactive: selected && item.name === selected.name
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
import { ESPit } from 'earthsdk3'
import { inject, onMounted, ref, onBeforeUnmount } from 'vue'
import PopList from '../../../components/PopList.vue'
import { XbsjEarthUi } from '../../../scripts/xbsjEarthUi'
import { getsceneObjNumfromSceneTree } from '../../../scripts/general'
import { createSceneObjTreeItemFromJson, executePos } from './fun'
import { Message } from 'earthsdk-ui'
const xbsjEarthUi = inject('xbsjEarthUi') as XbsjEarthUi
const modes = [
  {
    img: new URL('../../../assets/plotting/pit.png', import.meta.url).href,
    name: '坑',
    fillStyle: {
      color: [0.6588235294117647, 0.23921568627450981, 0.23921568627450981, 0.5]
    }
  }
]
const iconIsShow: any = ref()
const selected: any = ref(modes[0])
let editingDispose: any = undefined
let sceneObject: ESPit | undefined = undefined
const select = (item: { fillStyle: { color: number[] }; img: any; name: string }) => {
  //点击选择框中的坑按钮
  destroy()
  selected.value = item
  createSceneObject()
}
//创建坑场景对象
const createSceneObject = () => {
  if (!selected.value) return
  sceneObject = xbsjEarthUi.createSceneObject(ESPit) as ESPit
  if (sceneObject) {
    const sceneObjectIndex = getsceneObjNumfromSceneTree(xbsjEarthUi, 'ESPit')
    sceneObject.name = selected.value.name + (sceneObjectIndex + 1)
    sceneObject.fillStyle = selected.value.fillStyle
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
