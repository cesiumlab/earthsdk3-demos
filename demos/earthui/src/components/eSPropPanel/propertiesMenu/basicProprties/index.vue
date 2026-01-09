<script setup lang="ts">
import { ReactVarProperty } from 'earthsdk3'
import { createVueDisposer, toReadonlyVueRef, toVR } from 'earthsdk-ui'
import { propComps } from 'earthsdk-ui'
// import { newpropComps } from '../../index'
import SpeedAndStartTime from './SpeedAndStartTime.vue'
import StartTimeAndStopTime from './StartTimeAndStopTime.vue'
import { inject, ref, onBeforeUnmount, watch } from 'vue'
import { XbsjEarthUi } from '../../../../scripts/xbsjEarthUi'
const props = withDefaults(
  defineProps<{
    properties: ReactVarProperty<any>[]
    type?: string
    currentMenu?: string
    treeItem?: any
  }>(),
  { type: '', currentMenu: '' }
)
const buttonType = ref('')
const emtis = defineEmits<{
  (e: 'callback', params: any & { treeItem: any }): void
}>()
const disposer = createVueDisposer(onBeforeUnmount)
const xbsjEarthUi = inject('xbsjEarthUi') as XbsjEarthUi
const { treeItem, properties } = props
const callback = (params: any): void => {
  emtis('callback', {
    treeItem,
    ...params
  })
}
//@ts-ignore
const waterType =
  treeItem.type === 'ESGeoWater' || treeItem.type === 'ESDynamicWater'
    ? toVR<any>(disposer, properties[0].reactVar, (s) => s)
    : true
let propertiesMenu: { name: string; component: string }[] = [
  {
    name: '速度和起始时间',
    component: 'speedAndStartTime'
  },
  {
    name: '起始和结束时间',
    component: 'startTimeAndStopTime'
  }
]
const currentCom = ref('speedAndStartTime')
</script>
<template>
  <div
    v-for="item in properties"
    :key="item.memId"
    class="item"
    v-if="properties.length > 0"
    :class="{
      'no-click':
        (treeItem.type === 'ESGeoWater' || treeItem.type === 'ESDynamicWater') &&
        waterType !== 'custom' &&
        item.name !== '水域类型'
    }"
  >
    <div class="item_type">
      <component
        :is="propComps[item.type]"
        :property="item"
        :type="type"
        :xbsjEarthUi="xbsjEarthUi"
        :treeItem="xbsjEarthUi.propSceneTree"
        @callback="callback"
      ></component>
    </div>
  </div>
  <div v-if="type === 'ESPath' && currentMenu === 'basic'">
    <div class="espath_button">
      <div class="lab_Property_header1">
        <div
          class="header_item2"
          v-for="item in propertiesMenu"
          :key="item.component"
          @click="currentCom = item.component"
        >
          <span
            class="header_item_span2"
            :class="currentCom === item.component ? 'header_active2' : ''"
            >{{ item.name }}</span
          >
        </div>
      </div>
    </div>
    <SpeedAndStartTime
      v-if="currentCom === 'speedAndStartTime'"
      :sceneObject="treeItem.sceneObject"
    >
    </SpeedAndStartTime>
    <StartTimeAndStopTime
      v-if="currentCom === 'startTimeAndStopTime'"
      :sceneObject="treeItem.sceneObject"
    >
    </StartTimeAndStopTime>
  </div>
</template>

<style scoped>
.item {
  width: 100%;
  display: flex;
  font-size: 14px;
  line-height: 20px;
  padding: 2px 10px;
  box-sizing: border-box;
  margin: 0 0 3px 0;
}

.espath_button {
  width: 100%;
  display: flex;
  /* padding: 2px 10px; */
  box-sizing: border-box;
  align-items: center;
  justify-content: space-between;
}

.espath_button > button {
  height: 26px;
  background: rgba(28, 28, 29, 0.6);
  border-radius: 4px;
  border: 1px solid #3b3c40;
  color: rgba(230, 230, 230, 1);
  cursor: pointer;
}

.espath_button > button:hover {
  border: 1px solid #2c68f7;
}

.active {
  border: 1px solid #2c68f7 !important;
}

.item_type {
  width: 100%;
}

.no-click {
  pointer-events: none;
  opacity: 0.5;
  cursor: default;
}

.lab_Property_header1 {
  display: flex;
  align-items: center;
  width: 100%;
  height: 32px;
  /* border-top: 1px solid #111111; */
  margin-bottom: 10px;
}

.header_item2 {
  flex: 1;
  height: 100%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.header_item2 > span {
  display: inline-block;
  height: 100%;
  text-align: center;
  line-height: 32px;
  font-size: 14px;
  color: rgba(230, 230, 230, 1);
  min-width: 50px;
}

.header_active2 {
  color: #fff !important;
  border-bottom: 1px solid #fff;
  box-sizing: border-box;
}

.header_item2:hover .header_item_span2 {
  color: #fff;
  border-bottom: 1px solid #fff;
  box-sizing: border-box;
}
</style>
