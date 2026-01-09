<template>
  <div
    class="view_box"
    ref="viewersContainer"
    id="viewersContainer"
    @dragenter="dragEnter($event)"
    @dragleave="dragLeave($event)"
    @dragover="dragOver($event)"
    @drop="dropFile($event)"
  ></div>
</template>
<script setup lang="ts">
import { ESVOptionCzm, ESVOptionUe } from 'earthsdk3'
import { inject, onMounted, shallowRef } from 'vue'
import { XbsjEarthUi } from '../../scripts/xbsjEarthUi'
import { createObj, createSceneJson, geoJsonTOESObjects } from '../sceneTree/tools'
import { ElMessage } from 'element-plus'
const viewersContainer = shallowRef<HTMLDivElement>()
const xbsjEarthUi = inject('xbsjEarthUi') as XbsjEarthUi

const dragEnter = (event: Event) => {
  event.preventDefault()
}
const dragLeave = (event: Event) => {
  event.preventDefault()
}
const dragOver = (event: Event) => {
  event.preventDefault()
}
const dropFile = async (event: Event) => {
  event.preventDefault()

  //@ts-ignore
  let fileList = event.dataTransfer.files
  Object.keys(fileList).forEach((item) => {
    const reader = new FileReader()
    reader.readAsText(fileList[item], 'utf8')
    reader.onload = () => {
      if (!reader.result) return
      const result = reader.result as string
      const a = JSON.parse(result)
      if (
        a.type === 'Geometry' ||
        a.type === 'Feature' ||
        a.type === 'FeatureCollection' ||
        a.type === 'Point' ||
        a.type === 'LineString' ||
        a.type === 'Polygon' ||
        a.type === 'MultiPoint' ||
        a.type === 'MultiLineString' ||
        a.type === 'MultiPolygon' ||
        a.type === 'GeometryCollection' ||
        a.type === 'Topology'
      ) {
        geoJsonTOESObjects(xbsjEarthUi, a)
      } else if (a.sceneTree && a.asset) {
        createSceneJson(xbsjEarthUi, a)
      } else if (a.type) {
        createObj(xbsjEarthUi, a)
      } else {
        ElMessage.warning('请拖入正确的json格式')
      }
    }
    reader.onerror = () => {
      console.log('onError')
    }
  })
}
const changeUe = () => {
  const options = {
    type: 'ESUeViewer',
    container: viewersContainer.value,
    id: 'earthui-active-viewer-id',
    options: {
      uri: '',
      app: ''
    }
  } as ESVOptionUe
  xbsjEarthUi.createUeViewer(options)
}
onMounted(() => {
  const urlParams = new URLSearchParams(window.location.search)
  const eswebview = urlParams.get('eswebview') === 'true'
  //@ts-ignore
  if (window.ue && window.ue.es) {
    changeUe()
  } else if (eswebview) {
    let timer = setInterval(() => {
      //@ts-ignore
      if (window.ue && window.ue.es) {
        clearInterval(timer)
        changeUe()
      }
    }, 200)
  } else {
    if (viewersContainer.value) {
      const options = {
        type: 'ESCesiumViewer',
        id: 'earthui-active-viewer-id',
        container: viewersContainer.value
      } as ESVOptionCzm
      xbsjEarthUi.createCesiumViewer(options)
    }
  }
})
</script>
<style scoped>
.view_box {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
}
</style>
