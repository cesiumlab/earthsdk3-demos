<script setup lang="ts">
import Button from '../../components/Button.vue'
import RightList from '../../components/RightList.vue'
import { inject, onBeforeUnmount, onMounted, ref } from 'vue'
import { createVueDisposer, toVR } from 'earthsdk-ui'
import { XbsjEarthUi } from '../../scripts/xbsjEarthUi'
import Czml from './dataBase/Czml.vue'
import GeoJson from './dataBase/GeoJson.vue'
import Kml from './dataBase/Kml.vue'
const xbsjEarthUi = inject('xbsjEarthUi') as XbsjEarthUi
const d = createVueDisposer(onBeforeUnmount)
const activeViewerType = toVR<string>(d, [xbsjEarthUi, 'activeViewerType'])
const largeScreen = ref(true)
onMounted(() => {
  //@ts-ignore
  if (window.ue && window.ue.es) {
    largeScreen.value = false
  }
})
type plotingType = 'ESGeoJson' | 'ESKml' | 'ESCzml'
const controlList: {
  type: plotingType
  zh: string
  icon: string
  leftButton: boolean
}[] = [
  {
    type: 'ESKml',
    zh: 'KML',
    icon: 'KML',
    leftButton: false
  },
  {
    type: 'ESCzml',
    zh: 'Czml',
    icon: 'Czml ',
    leftButton: true
  }
]
const type = ref('')
</script>

<template>
  <RightList :title="'数据源'" :isTop="true">
    <Button
      :name="'a-GeoJSON'"
      :content="'GeoJson'"
      :click="
        () => {
          type === 'ESGeoJson' ? (type = '') : (type = 'ESGeoJson')
        }
      "
      :left-button="true"
      :actived="type === 'ESGeoJson'"
    ></Button>
    <Button
      v-if="activeViewerType !== 'ESUeViewer' && largeScreen"
      v-for="item in controlList"
      :name="item.icon"
      :content="item.zh"
      :click="
        () => {
          type === item.type ? (type = '') : (type = item.type)
        }
      "
      :left-button="item.leftButton"
      :actived="type === item.type"
    ></Button>
    <GeoJson v-if="type === 'ESGeoJson'" @close="type = ''"></GeoJson>
    <Kml v-if="type === 'ESKml'" @close="type = ''"></Kml>
    <Czml v-if="type === 'ESCzml'" @close="type = ''"></Czml>
  </RightList>
</template>
