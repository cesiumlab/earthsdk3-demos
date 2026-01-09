<script setup lang="ts">
import { ReactVarProperty } from 'earthsdk3'
import { XbsjEarthUi } from '../../../../scripts/xbsjEarthUi'
const props = withDefaults(
  defineProps<{
    properties: ReactVarProperty<any>[]
    type: string
    treeItem?: any
  }>(),
  { type: 'ES对象' }
)
import { propComps } from 'earthsdk-ui'
import { inject } from 'vue'
// import { propComps } from '../../index'

const emtis = defineEmits<{
  (e: 'callback', params: any & { treeItem: any }): void
}>()
const { treeItem } = props
const xbsjEarthUi = inject('xbsjEarthUi') as XbsjEarthUi
const callback = (params: any): void => {
  emtis('callback', {
    treeItem,
    ...params
  })
}
</script>

<template>
  <div class="property1">
    <div class="item_name" :title="'类型'">{{ '类型' }}</div>
    <div class="readonly_flag">
      {{ type }}
    </div>
  </div>
  <div v-if="properties.length > 0">
    <div v-for="item in properties.slice(0, 6)" :key="item.memId" class="item">
      <div class="item_type">
        <component
          @callback="callback"
          :is="propComps[item.type]"
          :property="item"
          :xbsjEarthUi="xbsjEarthUi"
          :treeItem="treeItem"
        ></component>
      </div>
    </div>
  </div>
</template>

<style scoped>
.property1,
.item {
  width: 100%;
  display: flex;
  font-size: 14px;
  line-height: 20px;
  padding: 2px 10px;
  box-sizing: border-box;
  margin: 0 0 3px 0;
}

.item_name {
  width: 70px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  cursor: pointer;
  color: rgba(230, 230, 230, 1);
  font-size: 14px;
}

.item_type {
  width: 100%;
}

.readonly_flag {
  flex: 1;
  color: rgba(230, 230, 230, 1);
  font-size: 14px;
}
</style>
