<script setup lang="ts">
import { ref, onBeforeUnmount, inject, onMounted, watch } from 'vue'
import BasicProprties from './propertiesMenu/basicProprties/index.vue'
import CoordinateProprties from './propertiesMenu/coordinateProprties/index.vue'
import GeneralProprties from './propertiesMenu/generalProprties/index.vue'
import LocationProprties from './propertiesMenu/locationProprties/index.vue'
import { createVueDisposer, Message, toReadonlyVueRef, toVR } from 'earthsdk-ui'
import { XbsjEarthUi } from '../../scripts/xbsjEarthUi'
import { ES3DTileset } from 'earthsdk3'

const props = withDefaults(
  defineProps<{
    treeItem: any
  }>(),
  {}
)
const xbsjEarthUi = inject('xbsjEarthUi') as XbsjEarthUi

let propertiesMenu: { name: string; component: string }[] = []
const currentMenu = ref('general')
const properties = props.treeItem.sceneObject.getESProperties()
const disposer = createVueDisposer(onBeforeUnmount)
const lonLatFormat = toReadonlyVueRef<any>(disposer, [xbsjEarthUi.activeViewer, 'lonLatFormat'])
const propTreeCallback = xbsjEarthUi.propTreeCallback.bind(xbsjEarthUi)
const treeItem = xbsjEarthUi.propSceneTree

const { basic, general, coordinate, dataSource, location, style, defaultMenu } = properties
currentMenu.value = defaultMenu ?? 'general'
if (basic.length > 0) {
  propertiesMenu.push({
    name: '基本',
    component: 'basic'
  })
}
if (general.length > 0) {
  propertiesMenu.push({
    name: '通用',
    component: 'general'
  })
}
if (coordinate.length > 0) {
  propertiesMenu.push({
    name: '坐标',
    component: 'coordinate'
  })
}
if (dataSource.length > 0) {
  propertiesMenu.push({
    name: '数据源',
    component: 'dataSource'
  })
}
if (location.length > 0) {
  propertiesMenu.push({
    name: '位置',
    component: 'location'
  })
}
if (style.length > 0) {
  propertiesMenu.push({
    name: '样式',
    component: 'style'
  })
}
const disabled3DTileset = ref(false)
let urlChang: any
const tilesetReady = (sceneObject: ES3DTileset) => {
  sceneObject.tilesetReady.disposableOnce(() => {
    if (sceneObject.supportEdit) {
      disabled3DTileset.value = false
    } else {
      disabled3DTileset.value = true
    }
  })
}
const updateProp = () => {
  if (urlChang) urlChang()
  const sceneObject = xbsjEarthUi.propSceneTree.sceneObject
  if (sceneObject instanceof ES3DTileset) {
    if (sceneObject.supportEdit) {
      disabled3DTileset.value = false
    } else {
      disabled3DTileset.value = true
    }
    tilesetReady(sceneObject)
    urlChang = sceneObject.urlChanged.disposableOn(() => {
      tilesetReady(sceneObject)
    })
  } else {
    disabled3DTileset.value = false
  }
}
onMounted(() => {
  updateProp()
  var dispose = xbsjEarthUi.propSceneTreeChanged.disposableOn((val) => {
    updateProp()
  })
  const sceneObject = xbsjEarthUi.propSceneTree.sceneObject
  var disposeEditing =
    Reflect.has(sceneObject, 'editing') &&
    sceneObject.editingChanged.disposableOn((res: boolean) => {
      if (res) {
        Message.loading({
          id: 'xxx',
          content: '1. 双击鼠标左键或点击ESC键退出编辑2. 点击空格键进行编辑方式的切换'
        })
      } else {
        Message.remove('xxx')
      }
    })
  onBeforeUnmount(() => {
    if (dispose) dispose()
    if (urlChang) urlChang()
    if (disposeEditing) disposeEditing()
    Message.remove('xxx')
  })
})
</script>

<template>
  <div class="Property_Panel">
    <div class="Property_header">
      <div
        class="property_header_item"
        v-for="item in propertiesMenu"
        :key="item.component"
        @click="currentMenu = item.component"
      >
        <span
          class="header_item_span1"
          :class="currentMenu === item.component ? 'header_active1' : ''"
          >{{ item.name }}</span
        >
      </div>
    </div>
    <div class="Property_content">
      <div v-if="currentMenu === 'basic'">
        <BasicProprties
          :properties="basic"
          :type="treeItem.sceneObject.typeName"
          :currentMenu="currentMenu"
          :treeItem="treeItem"
          @callback="propTreeCallback"
        ></BasicProprties>
      </div>
      <div v-if="currentMenu === 'general'">
        <GeneralProprties
          :properties="general"
          @callback="propTreeCallback"
          :type="treeItem.sceneObject.typeName"
          :treeItem="treeItem"
        >
        </GeneralProprties>
      </div>
      <div :class="{ eS3DTileset_supportEdit1: disabled3DTileset }">
        <div
          v-if="currentMenu === 'coordinate'"
          :class="{ eS3DTileset_supportEdit: disabled3DTileset }"
        >
          <CoordinateProprties
            :properties="coordinate"
            @callback="propTreeCallback"
            :type="treeItem.sceneObject.typeName"
            :lonLatFormat="lonLatFormat"
          >
          </CoordinateProprties>
        </div>
      </div>

      <div v-if="currentMenu === 'dataSource'">
        <CoordinateProprties
          :properties="dataSource"
          @callback="propTreeCallback"
          :lonLatFormat="lonLatFormat"
        >
        </CoordinateProprties>
      </div>
      <div v-if="currentMenu === 'location'">
        <LocationProprties
          :properties="location"
          @callback="propTreeCallback"
          :lonLatFormat="lonLatFormat"
        >
        </LocationProprties>
      </div>
      <div v-if="currentMenu === 'style'">
        <CoordinateProprties
          :properties="style"
          @callback="propTreeCallback"
          :lonLatFormat="lonLatFormat"
          :type="treeItem.sceneObject.typeName"
          :panel-style="'style'"
        >
        </CoordinateProprties>
      </div>
    </div>
  </div>
</template>

<style scoped>
.Property_Panel {
  width: 100%;
  height: 100%;
  /* background: rgba(71, 71, 71, 0.8); */
  display: flex;
  flex-direction: column;
}

.Property_header {
  display: flex;
  align-items: center;
  width: 100%;
  height: 32px;
}

.property_header_item {
  flex: 1;
  height: 100%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.property_header_item > span {
  display: inline-block;
  height: 100%;
  text-align: center;
  line-height: 32px;
  font-size: 14px;
  color: rgba(230, 230, 230, 1);
  width: 50px;
}

.header_active1 {
  color: #fff !important;
  border-bottom: 1px solid #fff;
  box-sizing: border-box;
}

.property_header_item:hover .header_item_span1 {
  color: #fff;
  border-bottom: 1px solid #fff;
  box-sizing: border-box;
}

.Property_content {
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  margin: 5px;
  box-sizing: border-box;
}

.Property_content::-webkit-scrollbar {
  width: 3px;
  background-color: rgba(41, 42, 46, 1);
  border-radius: 2px;
}

.Property_content::-webkit-scrollbar-thumb {
  background-color: rgba(183, 183, 183, 1);
  border-radius: 2px;
}

.eS3DTileset_supportEdit {
  pointer-events: none;
}

.eS3DTileset_supportEdit1 {
  cursor: no-drop;
  background: rgba(77, 77, 77, 0.2);
}
</style>
