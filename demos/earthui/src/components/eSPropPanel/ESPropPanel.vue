<script setup lang="ts">
import { createVueDisposer, messageLoading, toReadonlyVueRef } from 'earthsdk-ui'
import { ESJLonLatFormatType, ESVisualObject, ReactVarProperty, SceneTreeItem } from 'earthsdk3'
import { inject, onBeforeUnmount, onMounted, ref } from 'vue'
import { XbsjEarthUi } from '../../scripts/xbsjEarthUi'
import AllProprties from './propertiesMenu/allProprties/index.vue'
import BasicProprties from './propertiesMenu/basicProprties/index.vue'
import CoordinateProprties from './propertiesMenu/coordinateProprties/index.vue'
import GeneralProprties from './propertiesMenu/generalProprties/index.vue'
import LocationProprties from './propertiesMenu/locationProprties/index.vue'

const props = withDefaults(defineProps<{ treeItem: SceneTreeItem }>(), {});
const xbsjEarthUi = inject('xbsjEarthUi') as XbsjEarthUi;

let propertiesMenu: { name: string; component: string }[] = [];
const currentMenu = ref('general');
const { treeItem } = props;

if (!treeItem.sceneObject) {
  throw new Error('PropPanel treeItem.sceneObject is undefined')
}
const sceneObject = treeItem.sceneObject;
const typeName = sceneObject.typeName;
const properties = sceneObject.getESProperties();
const allProperties = sceneObject.getProperties() as ReactVarProperty<any>[];

const disposer = createVueDisposer(onBeforeUnmount);
const lonLatFormat = toReadonlyVueRef<ESJLonLatFormatType>(disposer, [xbsjEarthUi.activeViewer, 'lonLatFormat'])
const propTreeCallback = xbsjEarthUi.propTreeCallback.bind(xbsjEarthUi);

const { defaultMenu } = properties;
const basic = properties.basic as ReactVarProperty<any>[];
const general = properties.general as ReactVarProperty<any>[];
const coordinate = properties.coordinate as ReactVarProperty<any>[];
const dataSource = properties.dataSource as ReactVarProperty<any>[];
const location = properties.location as ReactVarProperty<any>[];
const style = properties.style as ReactVarProperty<any>[];

const init = () => {
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
  if (allProperties.length > 0) {
    propertiesMenu.push({
      name: '全部',
      component: 'all'
    })
  }

}
init();



onMounted(() => {

  //编辑时提示
  let disposeEditing: (() => void) | undefined;
  let close: (() => void) | undefined;
  if (Reflect.has(sceneObject, 'editing')) {
    disposeEditing = (sceneObject as ESVisualObject).editingChanged.don((res: boolean) => {
      if (res) {
        close = messageLoading('1.双击鼠标左键或点击ESC键退出编辑; 2.点击空格键进行编辑方式的切换');
      } else {
        close && close() && (close = undefined);
      }
    })
  }

  onBeforeUnmount(() => {
    disposeEditing && disposeEditing() && (disposeEditing = undefined);
    close && close() && (close = undefined);
  })
})
</script>

<template>
  <div class="Property_Panel">
    <div class="Property_header">
      <div class="property_header_item" v-for="item in propertiesMenu" :key="item.component"
        @click="currentMenu = item.component">
        <span class="header_item_span1" :class="currentMenu === item.component ? 'header_active1' : ''">{{ item.name
        }}</span>
      </div>
    </div>
    <div class="Property_content">

      <div v-if="currentMenu === 'basic'">
        <BasicProprties :properties="basic" :type="typeName" :currentMenu="currentMenu" :treeItem="treeItem"
          @callback="propTreeCallback"></BasicProprties>
      </div>

      <div v-if="currentMenu === 'general'">
        <GeneralProprties :properties="general" @callback="propTreeCallback" :type="typeName" :treeItem="treeItem">
        </GeneralProprties>
      </div>

      <div>
        <div v-if="currentMenu === 'coordinate'">
          <CoordinateProprties :properties="coordinate" @callback="propTreeCallback" :type="typeName"
            :lonLatFormat="lonLatFormat">
          </CoordinateProprties>
        </div>
      </div>

      <div v-if="currentMenu === 'dataSource'">
        <CoordinateProprties :properties="dataSource" @callback="propTreeCallback" :lonLatFormat="lonLatFormat">
        </CoordinateProprties>
      </div>

      <div v-if="currentMenu === 'location'">
        <LocationProprties :properties="location" @callback="propTreeCallback" :lonLatFormat="lonLatFormat">
        </LocationProprties>
      </div>

      <div v-if="currentMenu === 'style'">
        <CoordinateProprties :properties="style" @callback="propTreeCallback" :lonLatFormat="lonLatFormat"
          :type="typeName" :panel-style="'style'">
        </CoordinateProprties>
      </div>

      <div v-if="currentMenu === 'all'">
        <AllProprties :properties="allProperties" @callback="propTreeCallback" :lonLatFormat="lonLatFormat"
          :type="typeName" :panel-style="'all'">
        </AllProprties>
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

.property_header_item>span {
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
</style>
