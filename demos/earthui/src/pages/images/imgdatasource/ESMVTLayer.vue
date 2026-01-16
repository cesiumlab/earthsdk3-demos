<template>
  <PopList :title="'矢量瓦片图层'" :showButton="true" @ok="addSceneObjects">
    <!-- 地址 -->
    <div style="width: 100%; font-size: 12px; color: rgba(230, 230, 230, 1); margin-top: 10px">
      <label for="" style="width: 60px; display: inline-block">地址</label
      ><span style="cursor: pointer" @click="urlWindowShow = true">⚙</span>
    </div>
    <LabelInput v-model="accessToken" :label="'accessToken'"></LabelInput>
    <!-- 瓦片尺寸 -->
    <LabelInput v-model="tileSize" :label="'瓦片尺寸'"></LabelInput>
    <!-- 最大级别 -->
    <LabelInput v-model="maximumLevel" :inputType="'number'" :label="'最大级别'"></LabelInput>
    <!-- 最小级别 -->
    <LabelInput v-model="minimumLevel" :inputType="'number'" :label="'最小级别'"> </LabelInput>
    <!-- 最小级别 -->
    <LabelInput v-model="west" :label="'西'" :inputType="'number'" :max="180" :min="-180">
    </LabelInput>
    <LabelInput v-model="south" :label="'南'" :inputType="'number'" :max="90" :min="-90">
    </LabelInput>
    <LabelInput v-model="east" :label="'东'" :inputType="'number'" :max="180" :min="-180">
    </LabelInput>
    <LabelInput v-model="north" :label="'北'" :inputType="'number'" :max="90" :min="-90">
    </LabelInput>
    <div style="width: 100%; font-size: 12px; color: rgba(230, 230, 230, 1); margin-top: 10px">
      <label for="" style="width: 60px; display: inline-block">样式</label
      ><span style="cursor: pointer" @click="windowShow = true">⚙</span>
    </div>
    <Window
      :title="'样式--编辑器'"
      :show="windowShow"
      @ok="changeOk"
      :width="800"
      :height="500"
      @cancel="windowShow = false"
    >
      <ESEditor :language="'json'" :readonly="false" @load="load" ref="editorContainer"> </ESEditor>
    </Window>
    <Window
      :title="'地址--编辑器'"
      :show="urlWindowShow"
      @ok="urlChangeOk"
      :width="800"
      :height="500"
      @cancel="urlWindowShow = false"
    >
      <ESEditor :language="'json'" :readonly="false" @load="load2" ref="editorContainer2">
      </ESEditor>
    </Window>
  </PopList>
</template>

<script setup lang="ts">
import { ESEditor } from 'earthsdk-ui'
import { ESMVTLayer } from 'earthsdk3'
import { inject, ref, useTemplateRef } from 'vue'
import { SceneTree } from 'earthsdk3'
import LabelInput from '../../../components/LabelInput.vue'
import PopList from '../../../components/PopList.vue'
import Window from '../../../components/commom/Window.vue'
import { XbsjEarthUi } from '../../../scripts/xbsjEarthUi'
import { getsceneObjNumfromSceneTree, searchMaxZindex } from '../../../scripts/general'
import { ElMessage } from 'element-plus'
const editorContainer = useTemplateRef('editorContainer')
const editorContainer2 = useTemplateRef('editorContainer2')
const xbsjEarthUi = inject('xbsjEarthUi') as XbsjEarthUi
const sceneTree = inject('sceneTree') as SceneTree
const url = ref()
const accessToken = ref()
const tileSize = ref()
const maximumLevel = ref()
const minimumLevel = ref()
const north = ref()
const east = ref()
const west = ref()
const south = ref()
const jsonStr = ref()
const windowShow = ref(false)
const urlWindowShow = ref(false)
const emits = defineEmits(['close'])
const addSceneObjects = () => {
  let maxZindex = searchMaxZindex(sceneTree, 'ESMVTLayer')
  if (!url.value) {
    ElMessage.warning('请输入地址')
    return
  }
  let treeItem: any
  const lastSceneTreeItem = sceneTree.lastSelectedItem
  if (!lastSceneTreeItem) {
    treeItem = sceneTree.createSceneObjectTreeItemFromClass(ESMVTLayer)
  } else {
    if (lastSceneTreeItem.type === 'Folder') {
      treeItem = sceneTree.createSceneObjectTreeItemFromClass(
        ESMVTLayer,
        undefined,
        lastSceneTreeItem,
        'Inner'
      )
    } else {
      treeItem = sceneTree.createSceneObjectTreeItemFromClass(
        ESMVTLayer,
        undefined,
        lastSceneTreeItem,
        'After'
      )
    }
  }
  sceneTree.uiTree.clearAllSelectedItems()
  treeItem.uiTreeObject.selected = true
  const { sceneObject } = treeItem
  xbsjEarthUi.propSceneTree = treeItem
  sceneObject.url = url.value
  const objNum = getsceneObjNumfromSceneTree(xbsjEarthUi, 'ESMVTLayer')
  sceneObject.name = '矢量图层' + objNum
  sceneObject.zIndex = maxZindex + 1
  accessToken.value && (sceneObject.accessToken = accessToken.value)
  tileSize.value && (sceneObject.tileSize = tileSize.value)
  maximumLevel.value && (sceneObject.maximumLevel = maximumLevel.value)
  minimumLevel.value && (sceneObject.minimumLevel = minimumLevel.value)
  north.value &&
    east.value &&
    west.value &&
    south.value &&
    (sceneObject.rectangle = [west.value, south.value, east.value, north.value])
  jsonStr.value && (sceneObject.style = jsonStr.value)
  emits('close')
}
const load = () => {
  editorContainer.value?.setVal(JSON.stringify(jsonStr.value, undefined, '    '))
}
const load2 = () => {
  editorContainer2.value?.setVal(JSON.stringify(url.value, undefined, '    '))
}
const changeOk = () => {
  const str = editorContainer.value?.getVal() as string
  try {
    const json = JSON.parse(str)
    jsonStr.value = json
    windowShow.value = false
  } catch (error) {
    console.log('JSON格式错误!!!', error)
    ElMessage.error(`JSON格式错误！error:${error}`)
    return
  }
}
const urlChangeOk = () => {
  const str = editorContainer2.value?.getVal() as string
  try {
    const json = JSON.parse(str)
    url.value = json
    urlWindowShow.value = false
  } catch (error) {
    console.log('JSON格式错误!!!', error)
    ElMessage.error(`JSON格式错误！error:${error}`)
    return
  }
}
</script>
