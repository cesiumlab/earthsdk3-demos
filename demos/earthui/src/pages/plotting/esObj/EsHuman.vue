<template>
  <!-- 选择框 -->
  <PopList :title="'人员'">
    <div class="roam_moveOnLineMode">
      <div>
        <label for="">连续创建</label><span class="roam_moveOnLineMode_checke"
          :class="{ roam_moveOnLineMode_checke_active: continuousCreate }" @click="changeCheckBox">
          <es-icon :name="continuousCreate ? 'duigou' : ''" :color="'white'" :size="12" />
        </span>
      </div>
    </div>
    <div class="images_img_list">
      <div v-for="(item, index) in modes" class="images_img_lilist">
        <div class="images_imgposition" @click="select(item)" :class="{
          images_checkedactive: selected && item.mode === selected.mode
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

import { ESHuman } from 'earthsdk3'
import { inject, onBeforeUnmount, onMounted, ref } from 'vue'
import PopList from '../../../components/PopList.vue'
import { getsceneObjNumfromSceneTree } from '../../../scripts/general'
import { XbsjEarthUi } from '../../../scripts/xbsjEarthUi'
import { createSceneObjTreeItemFromJson, executePos } from './fun'
const xbsjEarthUi = inject('xbsjEarthUi') as XbsjEarthUi
const modes = [
  //多选模式类型
  {
    mode: 'worker',
    img: new URL('../../../assets/plotting/worker.png', import.meta.url).href,
    name: '工人'
  },
  {
    mode: 'police',
    img: new URL('../../../assets/plotting/police.png', import.meta.url).href,
    name: '警察'
  },
  {
    mode: 'pedestrian',
    img: new URL('../../../assets/plotting/pedestrian.png', import.meta.url).href,
    name: '路人'
  },
  {
    mode: 'stranger',
    img: new URL('../../../assets/plotting/stranger.png', import.meta.url).href,
    name: '陌生人'
  },
  {
    mode: 'suitMan',
    img: new URL('../../../assets/plotting/suitMan.png', import.meta.url).href,
    name: '男士'
  },
  {
    mode: 'suitWoman',
    img: new URL('../../../assets/plotting/suitWoman.png', import.meta.url).href,
    name: '女士'
  }
]
const iconIsShow: any = ref() //划过样式
const continuousCreate = ref(false) //连续创建
const selected: any = ref(modes[0]) //当前选中
let sceneObject: ESHuman | undefined = undefined
let sceneObject2: ESHuman | undefined = undefined
let editingDispose: any = undefined
let editingDispose2: any = undefined
let ececutDispose: any = undefined
const changeCheckBox = () => {
  //点击取消连续创建时使得人员类型为空
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
const select = (item: { mode: string; img: any; name: string }) => {
  //点击选择框中的人员按钮
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
//连续创建人员场景对象
const createSceneObject = (position: [number, number, number]) => {
  if (!selected.value) return
  sceneObject2 = xbsjEarthUi.createSceneObject(ESHuman) as ESHuman
  sceneObject2.position = position
  sceneObject2.mode = selected.value.mode
  const sceneObjectIndex = getsceneObjNumfromSceneTree(xbsjEarthUi, 'ESHuman')
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
//创建单个人员场景对象
const createOneSceneObject = () => {
  if (!selected.value) return
  sceneObject = xbsjEarthUi.createSceneObject(ESHuman) as ESHuman
  if (sceneObject) {
    sceneObject.mode = selected.value.mode
    const sceneObjectIndex = getsceneObjNumfromSceneTree(xbsjEarthUi, 'ESHuman')
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
