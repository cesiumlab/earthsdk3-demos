<template>
  <RightList :title="'编辑'">
    <!-- <Button :name="'yangshi'" :content="'样式'" :color="!isDisabled ? 'rgba(88, 88, 93, 1)' : 'rgba(58, 118, 229, 1)'"
            :click="showStyleEdit" :actived="StyleEdityingIsShow" :disabled="!isDisabled" :left-button="true"></Button> -->
    <Button
      :name="'yidong'"
      :content="'移动'"
      :color="!editingIsDisabled ? 'rgba(88, 88, 93, 1)' : 'rgba(58, 118, 229, 1)'"
      :click="
        () => {
          positionEditing = !positionEditing
        }
      "
      :disabled="!editingIsDisabled"
      :actived="positionEditing"
      :left-button="true"
    ></Button>
    <Button
      :name="'shuangmianxianshi'"
      :color="!isDisabled ? 'rgba(88, 88, 93, 1)' : 'rgba(58, 118, 229, 1)'"
      :content="'双面显示'"
      :click="
        () => {
          czmBackFaceCulling = !czmBackFaceCulling
        }
      "
      :disabled="!isDisabled"
      :actived="!czmBackFaceCulling"
    ></Button>
    <Button
      :name="'SkipLOD'"
      :content="'SkipLOD'"
      :color="!isDisabled ? 'rgba(88, 88, 93, 1)' : 'rgba(58, 118, 229, 1)'"
      :click="
        () => {
          czmskipLevelOfDetail = !czmskipLevelOfDetail
        }
      "
      :disabled="!isDisabled"
      :actived="czmskipLevelOfDetail"
      :left-button="true"
    ></Button>
    <Button
      :name="'baoweihe'"
      :content="'包围盒'"
      :color="!isDisabled ? 'rgba(88, 88, 93, 1)' : 'rgba(58, 118, 229, 1)'"
      :click="
        () => {
          czmDebugShowBoundingVolume = !czmDebugShowBoundingVolume
        }
      "
      :disabled="!isDisabled"
      :actived="czmDebugShowBoundingVolume"
    ></Button>
    <Button
      :name="'neirongbaoweihe'"
      :content="'内容包围盒'"
      :color="!isDisabled ? 'rgba(88, 88, 93, 1)' : 'rgba(58, 118, 229, 1)'"
      :click="
        () => {
          czmDebugShowContentBoundingVolume = !czmDebugShowContentBoundingVolume
        }
      "
      :disabled="!isDisabled"
      :actived="czmDebugShowContentBoundingVolume"
      :left-button="true"
    ></Button>
    <!-- <StyleEditying @close="close" v-if="StyleEdityingIsShow" :defaultStyle="defaultStyle">
        </StyleEditying> -->
  </RightList>
</template>
<script setup lang="ts">
import { vue3Xe2Bind } from 'earthsdk-ui'
import { ES3DTileset, SceneTree, SceneTreeItem } from 'earthsdk3'
import { inject, onBeforeUnmount, onMounted, ref } from 'vue'
import { Destroyable, ObjResettingWithEvent } from 'earthsdk3'
import Button from '../../components/Button.vue'
import RightList from '../../components/RightList.vue'
const sceneTree = inject('sceneTree') as SceneTree
const defaultStyle = ref('')
//移动
const positionEditing = ref(false)
//双面显示
const czmBackFaceCulling = ref(true)
//SkipLOD
const czmskipLevelOfDetail = ref(false)
//包围盒
const czmDebugShowBoundingVolume = ref(false)
//内容包围盒
const czmDebugShowContentBoundingVolume = ref(false)
class ES3DTilesetController extends Destroyable {
  constructor(private _es3DTileset: ES3DTileset) {
    super()
    this.d(vue3Xe2Bind(positionEditing, [this._es3DTileset, 'editing'], false))
    this.d(vue3Xe2Bind(czmBackFaceCulling, [this._es3DTileset, 'czmBackFaceCulling'], true))
    this.d(vue3Xe2Bind(czmskipLevelOfDetail, [this._es3DTileset, 'czmskipLevelOfDetail'], false))
    this.d(
      vue3Xe2Bind(
        czmDebugShowBoundingVolume,
        [this._es3DTileset, 'czmDebugShowBoundingVolume'],
        false
      )
    )
    this.d(
      vue3Xe2Bind(
        czmDebugShowContentBoundingVolume,
        [this._es3DTileset, 'czmDebugShowContentBoundingVolume'],
        false
      )
    )
  }
}
onMounted(() => {
  const objResetting = new ObjResettingWithEvent(sceneTree.selectedItems.changedEvent, () => {
    const { lastSelectedItem } = sceneTree
    if (!lastSelectedItem) return undefined
    const { sceneObject } = lastSelectedItem
    if (!sceneObject) return undefined
    if (sceneObject.typeName !== 'ES3DTileset') return undefined
    if (!(sceneObject instanceof ES3DTileset)) return undefined
    return new ES3DTilesetController(sceneObject)
  })
  onBeforeUnmount(() => objResetting.destroy())

  chlastSelectedItem()
  const dispose = sceneTree.selectedItems.changedEvent.don(chlastSelectedItem)
  onBeforeUnmount(dispose)
})

const StyleEdityingIsShow = ref(false)
const isDisabled = ref(false)
const editingIsDisabled = ref(false)

// const showStyleEdit = () => {
//     if (!isDisabled.value) return
//     StyleEdityingIsShow.value = !StyleEdityingIsShow.value
// }
// const close = (styleContent?: string) => {
//     StyleEdityingIsShow.value = false
//     if (styleContent) {
//         defaultStyle.value = styleContent
//     }
// }
let lastSelectedItem: SceneTreeItem | undefined
const chlastSelectedItem = () => {
  lastSelectedItem = sceneTree.lastSelectedItem
  isDisabled.value = false
  editingIsDisabled.value = false
  StyleEdityingIsShow.value = false
  if (!lastSelectedItem) return
  if (lastSelectedItem.type == 'ES3DTileset') {
    isDisabled.value = true
    const sceneObject = lastSelectedItem.sceneObject as ES3DTileset
    if (sceneObject.supportEdit) {
      editingIsDisabled.value = true
    } else {
      editingIsDisabled.value = false
    }
    isDisabled.value = true
  } else {
    isDisabled.value = false
    editingIsDisabled.value = false
  }
}
</script>
