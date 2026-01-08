<template>
  <!-- 选择框 -->
  <PopList :title="'文字标注'">
    <div class="roam_moveOnLineMode">
      <div>
        <label for="">连续创建</label
        ><span
          class="roam_moveOnLineMode_checke"
          :class="{ roam_moveOnLineMode_checke_active: continuousCreate }"
          @click="changeCheckBox"
        >
          <es-icon :name="continuousCreate ? 'duigou' : ''" :color="'white'" :size="12" />
        </span>
      </div>
    </div>
    <div class="images_img_list">
      <div v-for="(item, index) in textType" class="images_img_lilist">
        <div
          class="images_imgposition"
          @click.stop="select(item)"
          :class="{
            images_checkedactive: selected && item.name === selected.name
          }"
          @mouseenter="editingIconIsShow = index"
          @mouseleave="editingIconIsShow = -1"
        >
          <div
            class="images_imgposition_text"
            :style="{
              color: `rgba(${item.type.textColor[0] * 255},${item.type.textColor[1] * 255},${item.type.textColor[2] * 255},${item.type.textColor[3]})`,
              fontSize: `${item.type.textSize}px`
            }"
            v-if="!(textareaIsShow === index)"
          >
            {{ item.name }}
          </div>
          <textarea
            name="text"
            class="images_imgposition_textarea"
            v-model="item.name"
            @click.stop
            :style="{
              color: `rgba(${item.type.textColor[0] * 255},${item.type.textColor[1] * 255},${item.type.textColor[2] * 255},${item.type.textColor[3]})`
            }"
            @blur="textareaIsShow = -1"
            @keydown.enter="textareaIsShow = -1"
            v-else
          ></textarea>
          <div
            class="span2"
            @click.stop.prevent="changeText(item, index)"
            @mouseenter="currentIconIndex = index"
            @mouseleave="currentIconIndex = -1"
            v-show="editingIconIsShow === index"
          >
            <es-icon
              :name="'bianji'"
              :color="
                index === currentIconIndex ? 'rgba(44, 104, 247, 1)' : 'rgba(230, 230, 230, 1)'
              "
              :size="12"
            />
          </div>
        </div>
      </div>
    </div>
  </PopList>
</template>

<script setup lang="ts">
import { ESTextLabel } from 'earthsdk3'
import { ref, onBeforeUnmount, onMounted, inject } from 'vue'
import PopList from '../../../components/PopList.vue'
import { createSceneObjTreeItemFromJson, executePos } from './fun'
import { textTypeList } from '../data'
import { XbsjEarthUi } from '../../../scripts/xbsjEarthUi'
import { getsceneObjNumfromSceneTree } from '../../../scripts/general'
import { Message } from 'earthsdk-ui'
const xbsjEarthUi = inject('xbsjEarthUi') as XbsjEarthUi
// const iconIsShow: any = ref()//黑色全程的显影
const editingIconIsShow = ref(-1) //编辑的小icon显影
const currentIconIndex = ref(-1) //编辑的小icon的颜色
const textareaIsShow = ref<number>(-1) //是否出现编辑框
// const textareaText = ref('请输入文本')
const continuousCreate = ref(false) //连续创建
const textType = ref(textTypeList) //类型列表
const selected: any = ref(textTypeList[0]) //选中的类型列表
let sceneObject: ESTextLabel | undefined = undefined
let sceneObject2: ESTextLabel | undefined = undefined
let editingDispose: any = undefined
let editingDispose2: any = undefined
let ececutDispose: any = undefined
const pos = (position: [number, number, number]) => {
  if (sceneObject2) {
    sceneObject2.editing = false
  }
  setTimeout(() => {
    createSceneObject(position)
  }, 100)
}
const changeCheckBox = () => {
  //点击取消连续创建时使得人员类型为空
  continuousCreate.value = !continuousCreate.value
  Message.remove('xxx')
  destroy()
  selected.value = undefined
}
const select = (item: {
  name: string
  type: { textSize: number; textColor: [number, number, number, number] }
}) => {
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
const changeText = (
  item: {
    name: string
    type: { textSize: number; textColor: [number, number, number, number] }
  },
  index: number
) => {
  textareaIsShow.value = index
}
//创建文字标注场景对象
const createSceneObject = (position: [number, number, number]) => {
  if (!selected.value) return
  sceneObject2 = xbsjEarthUi.createSceneObject(ESTextLabel) as ESTextLabel
  sceneObject2.position = position
  sceneObject2.fontSize = selected.value.type.textSize
  sceneObject2.color = selected.value.type.textColor
  const sceneObjectIndex = getsceneObjNumfromSceneTree(xbsjEarthUi, 'ESTextLabel')
  sceneObject2.name = selected.value.name + (sceneObjectIndex + 1)
  sceneObject2.text = selected.value.name + (sceneObjectIndex + 1)
  //编辑状态结束后根据json创建在场景树上
  setTimeout(() => {
    //@ts-ignore
    sceneObject2.editing = true
    Message.loading({
      id: 'xxx',
      content: '1. 双击鼠标左键或点击ESC键退出编辑2. 点击空格键进行编辑方式的切换'
    })
  }, 10)
  sceneObject2.name = selected.value.name + (sceneObjectIndex + 1)
  //编辑状态结束后根据json创建在场景树上
  editingDispose2 = sceneObject2.editingChanged.disposableWeakOn(() => {
    if (sceneObject2 && sceneObject2.editing === false) {
      Message.remove('xxx')
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
//创建单个报警场景对象
const createOneSceneObject = () => {
  if (!selected.value) return
  sceneObject = xbsjEarthUi.createSceneObject(ESTextLabel) as ESTextLabel
  if (sceneObject) {
    sceneObject.fontSize = selected.value.type.textSize
    sceneObject.color = selected.value.type.textColor
    const sceneObjectIndex = getsceneObjNumfromSceneTree(xbsjEarthUi, 'ESTextLabel')
    sceneObject.name = selected.value.name + (sceneObjectIndex + 1)
    sceneObject.text = selected.value.name + (sceneObjectIndex + 1)

    //编辑状态结束后根据json创建在场景树上
    sceneObject.editing = true
    Message.loading({
      id: 'xxx',
      content: '1. 双击鼠标左键或点击ESC键退出编辑2. 点击空格键进行编辑方式的切换'
    })
    editingDispose = sceneObject.editingChanged.disposableWeakOn(() => {
      if (sceneObject && sceneObject.editing === false) {
        Message.remove('xxx')
        const json = sceneObject.json
        const position = sceneObject.position
        const a = position[0] === 0 && position[1] === 0
        xbsjEarthUi.destroySceneObject(sceneObject)
        sceneObject = undefined
        setTimeout(() => {
          if (!a) {
            createSceneObjTreeItemFromJson(xbsjEarthUi, json)
            selected.value = undefined
          }
        }, 300)
      }
    })
  }
}
onMounted(() => {
  createOneSceneObject()
  onBeforeUnmount(() => {
    Message.remove('xxx')
    destroy()
  })
})
</script>
