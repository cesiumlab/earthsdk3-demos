<script setup lang="ts">
import { createVueDisposer, Message, toVR } from 'earthsdk-ui'
import {
  ESBoxClipping,
  ESClassification,
  ESClippingPlane,
  ESExcavate,
  ESHeightLimitAnalysis,
  ESPolygonFlattenedPlane,
  ESViewShed,
  ESVisibilityAnalysis
} from 'earthsdk3'
import { inject, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import Button from '../../components/Button.vue'
import RightList from '../../components/RightList.vue'
import { getsceneObjNumfromSceneTree } from '../../scripts/general'
import { XbsjEarthUi } from '../../scripts/xbsjEarthUi'
import { createSceneObjTreeItemFromJson } from '../plotting/esObj/fun'
const props = withDefaults(defineProps<{ closeSceneobject: number }>(), {})
const xbsjEarthUi = inject('xbsjEarthUi') as XbsjEarthUi
const objType = ref<string>('')
const disposer = createVueDisposer(onBeforeUnmount)
const activeViewerType = toVR<string>(disposer, [xbsjEarthUi, 'activeViewerType'])
const createlList: {
  zh: string
  type: string
  icon: string
  leftButton: boolean
  hiddenFromUE?: boolean
}[] = [
    {
      zh: '视阈',
      type: 'ESViewShed',
      icon: 'keshiyu',
      leftButton: true
    },
    {
      zh: '挖坑',
      type: 'ESExcavate',
      icon: 'wakeng',
      leftButton: false
    },
    {
      zh: '压平',
      type: 'ESPolygonFlattenedPlane',
      icon: 'yaping',
      leftButton: true
    },
    {
      zh: '裁剪',
      type: 'ESClippingPlane',
      icon: 'jiancai',
      leftButton: false
    },
    {
      zh: '通视分析',
      type: 'ESVisibilityAnalysis',
      icon: 'tongshifenxi',
      leftButton: true
    },
    {
      zh: '控高分析',
      type: 'ESHeightLimitAnalysis',
      icon: 'konggaofenxi',
      leftButton: false
    },
    {
      zh: '倾斜单体化',
      type: 'ESClassification',
      icon: 'jianzhudantihua',
      leftButton: true
    },
    {
      zh: '体剖切',
      type: 'ESBoxClipping',
      icon: 'tipaoqie',
      leftButton: false,
      hiddenFromUE: true
    }
  ]

let sceneObject:
  | ESViewShed
  | ESExcavate
  | ESPolygonFlattenedPlane
  | ESClippingPlane
  | ESBoxClipping
  | ESVisibilityAnalysis
  | ESHeightLimitAnalysis
  | ESClassification
  | undefined = undefined
let editingDispose: any = undefined

const createClippingPlane = (item: { zh: string; type: string; icon: string }) => {
  objType.value = item.type
  destroy()
  sceneObject = xbsjEarthUi.createSceneObject(item.type) as
    | ESViewShed
    | ESExcavate
    | ESPolygonFlattenedPlane
    | ESClippingPlane
    | ESBoxClipping
    | ESVisibilityAnalysis
  if (sceneObject) {
    const sceneObjectNum = getsceneObjNumfromSceneTree(xbsjEarthUi, item.type)
    sceneObject.name = item.zh + (sceneObjectNum + 1)
    sceneObject.editing = true
    switch (item.type) {
      // 有特殊性质的对象可单独处理
      default:
        editingDispose = sceneObject.editingChanged.disposableOn(() => {
          if (sceneObject && sceneObject.editing === false) {

            objType.value = ''
            const json = sceneObject.json
            const flag =
              sceneObject instanceof ESViewShed &&
              sceneObject.position[0] === 0 &&
              sceneObject.position[1] === 0 &&
              sceneObject.position[2] === 0
            xbsjEarthUi.destroySceneObject(sceneObject)
            sceneObject = undefined
            setTimeout(() => {
              if (!flag) {
                createSceneObjTreeItemFromJson(xbsjEarthUi, json)
              }
            }, 300)
          }
        })
        break
    }
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
  onBeforeUnmount(() => {

    destroy()
    objType.value = ''
  })
})
watch(
  () => props.closeSceneobject,
  () => {
    destroy()
    objType.value = ''
  },
  { immediate: true }
)
</script>
<template>
  <RightList :title="'空间分析1'">
    <Button v-show="activeViewerType !== 'ESUeViewer' || !item.hiddenFromUE" v-for="item in createlList"
      :name="item.icon" :content="item.zh" :click="() => {
        createClippingPlane(item)
      }
        " :actived="objType === item.type" :left-button="item.leftButton"></Button>
  </RightList>
</template>
