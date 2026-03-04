<template>
  <!-- 选择框 -->
  <PopList :title="'图标点'">
    <div class="roam_moveOnLineMode">
      <div>
        <label for="">连续创建</label><span class="roam_moveOnLineMode_checke"
          :class="{ roam_moveOnLineMode_checke_active: continuousCreate }" @click="changeCheckBox">
          <es-icon :name="continuousCreate ? 'duigou' : ''" :color="'white'" :size="12" />
        </span>
      </div>
    </div>
    <div class="images_img_list">
      <div v-for="(item, index) in imageTypeList" class="images_img_lilist">
        <div class="images_imgposition" @click="select(item)" :class="{
          images_checkedactive: selected && item.type === selected.type
        }">
          <img :src="item.img" alt="" class="img_imageLable" />
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
import { ESImageLabel } from 'earthsdk3'
import { ref, onBeforeUnmount, onMounted, inject } from 'vue'
import PopList from '../../../components/PopList.vue'
import { createSceneObjTreeItemFromJson, executePos } from './fun'
import { imageTypeList } from '../data'
import { XbsjEarthUi } from '../../../scripts/xbsjEarthUi'
import { getsceneObjNumfromSceneTree } from '../../../scripts/general'

const xbsjEarthUi = inject('xbsjEarthUi') as XbsjEarthUi
const selected: any = ref(imageTypeList[0])
const iconIsShow: any = ref() //划过样式
const continuousCreate = ref(false) //连续创建
let sceneObject: ESImageLabel | undefined = undefined
let sceneObject2: ESImageLabel | undefined = undefined
let editingDispose: any = undefined
let editingDispose2: any = undefined
let ececutDispose: any = undefined
const changeCheckBox = () => {
  //点击取消连续创建时使得图标点类型为空
  continuousCreate.value = !continuousCreate.value

  destroy()
  selected.value = undefined
}
const pos = (position: [number, number, number]) => {
  if (sceneObject2) {
    sceneObject2.editing = false
  }
  setTimeout(() => {
    createSceneObject(position)
  }, 100)
}
const select = (item: { type: string; img: any; name: string }) => {
  //点击选择框中的图标点按钮
  selected.value = item
  destroy()
  if (continuousCreate.value) {
    ececutDispose = executePos(xbsjEarthUi, pos, () => {
      selected.value = undefined
    })
  } else {
    createOneSceneObject()
  }
}
//连续创建图标点场景对象
const createSceneObject = (position: [number, number, number]) => {
  if (!selected.value) return
  sceneObject2 = xbsjEarthUi.createSceneObject(ESImageLabel) as ESImageLabel
  sceneObject2.position = position
  sceneObject2.url = selected.value.type
  const sceneObjectIndex = getsceneObjNumfromSceneTree(xbsjEarthUi, 'ESImageLabel')
  setTimeout(() => {
    //@ts-ignore
    sceneObject2.editing = true

  }, 10)
  sceneObject2.name = selected.value.name + (sceneObjectIndex + 1)
  //编辑状态结束后根据json创建在场景树上
  editingDispose2 = sceneObject2.editingChanged.disposableWeakOn(() => {
    if (sceneObject2 && sceneObject2.editing === false) {

      const json = sceneObject2.json
      xbsjEarthUi.destroySceneObject(sceneObject2)
      sceneObject2 = undefined
      createSceneObjTreeItemFromJson(xbsjEarthUi, json)
    }
  })
}
const destroy = () => {
  //销毁未编辑完成的对象
  if (sceneObject && sceneObject.editing) {
    if (editingDispose) {
      editingDispose()
      editingDispose = undefined
    }
    sceneObject.editing = false
    xbsjEarthUi.destroySceneObject(sceneObject)
    sceneObject = undefined
  }
  if (sceneObject2 && sceneObject2.editing) {
    if (editingDispose2) {
      editingDispose2()
      editingDispose2 = undefined
    }
    sceneObject2.editing = false
    xbsjEarthUi.destroySceneObject(sceneObject2)
    sceneObject2 = undefined
  }
  if (ececutDispose) {
    ececutDispose.forEach((item: () => any) => {
      item && item()
    })
  }
}
//创建单个图标点场景对象
const createOneSceneObject = () => {
  if (!selected.value) return
  sceneObject = xbsjEarthUi.createSceneObject(ESImageLabel) as ESImageLabel
  if (sceneObject) {
    sceneObject.url = selected.value.type
    const sceneObjectIndex = getsceneObjNumfromSceneTree(xbsjEarthUi, 'ESImageLabel')
    sceneObject.name = selected.value.name + (sceneObjectIndex + 1)
    //编辑状态结束后根据json创建在场景树上
    sceneObject.editing = true

    editingDispose = sceneObject.editingChanged.disposableWeakOn(() => {
      if (sceneObject && sceneObject.editing === false) {

        const json = sceneObject.json
        const position = sceneObject.position
        const a = position[0] === 0 && position[1] === 0
        xbsjEarthUi.destroySceneObject(sceneObject)
        sceneObject = undefined
        setTimeout(() => {
          if (!a) {
            createSceneObjTreeItemFromJson(xbsjEarthUi, json)
            if (continuousCreate.value) {
              createOneSceneObject()
            } else {
              selected.value = undefined
            }
          }
        }, 300)
      }
    })
  }
}
onMounted(() => {
  createOneSceneObject()
  onBeforeUnmount(() => {

    destroy()
  })
})
</script>
