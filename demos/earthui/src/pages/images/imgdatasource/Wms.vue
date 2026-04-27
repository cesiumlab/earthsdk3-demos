<template>
  <PopList :title="'WMS'" :showButton="true" @ok="addSceneObjects">
    <div class="content">
      <div class="item">
        <label>服务地址</label>
        <el-input v-model="serverUrl" style="flex: 1;" placeholder="请输入服务地址" @change="updateServer"></el-input>
      </div>
      <div class="item">
        <label>地址</label>
        <el-input v-model="url" style="flex: 1;" placeholder="请输入地址"></el-input>
      </div>

      <div class="item">
        <label>格式</label>
        <el-input v-model="format" style="flex: 1;" placeholder="请输入格式"></el-input>
      </div>

      <div class="item">
        <label>图层</label>
        <el-input v-model="layers" style="flex: 1;" placeholder="请输入图层"></el-input>
      </div>

      <div class="item">
        <label>credit</label>
        <el-input v-model="credit" style="flex: 1;" placeholder="请输入credit"></el-input>
      </div>
      <div class="item">
        <label>样式</label>
        <el-input v-model="styles" style="flex: 1;" placeholder="请输入样式"></el-input>
      </div>
      <div class="item">
        <label>srs</label>
        <el-input v-model="srs" style="flex: 1;" placeholder="请输入srs"></el-input>
      </div>
      <div class="item">
        <label>最小级别</label>
        <el-input v-model="minimumLevel" type="number" style="flex: 1;" placeholder="请输入最小级别"></el-input>
      </div>
      <div class="item">
        <label>最大级别</label>
        <el-input v-model="maximumLevel" type="number" style="flex: 1;" placeholder="请输入最大级别"></el-input>
      </div>

      <div class="item">
        <label>宽度</label>
        <el-input v-model="width" type="number" style="flex: 1;" placeholder="请输入宽度"></el-input>
      </div>
      <div class="item">
        <label>高度</label>
        <el-input v-model="height" type="number" style="flex: 1;" placeholder="请输入高度"></el-input>
      </div>
      <div class="item">
        <label>版本</label>
        <el-input v-model="version" style="flex: 1;" placeholder="请输入版本"></el-input>
      </div>

      <div class="item">
        <label>范围</label>
        <el-input v-model="rectangle" :disabled="true" style="flex: 1;" placeholder="请输入范围"></el-input>
        <el-button @click="flyTo">定位</el-button>
      </div>
    </div>
  </PopList>
</template>

<script setup lang="ts">
import { ElMessage } from 'element-plus'
import { ref, inject, watch, onBeforeUnmount } from 'vue'
import PopList from '../../../components/PopList.vue'
import { XbsjEarthUi } from '../../../scripts/xbsjEarthUi'
import { ESImageryLayer } from 'earthsdk3'
import { createSceneObjTreeItemFromJson } from '../../plotting/esObj/fun'
import { parse } from 'search-params'
import { searchMaxZindex } from '../../../scripts/general'
import { SceneTree } from 'earthsdk3'

const xbsjEarthUi = inject('xbsjEarthUi') as XbsjEarthUi
const sceneTree = inject('sceneTree') as SceneTree

const serverUrl = ref()
const url = ref()
const format = ref()
const layers = ref()
const credit = ref()
const styles = ref()
const srs = ref()
const minimumLevel = ref()
const maximumLevel = ref()
const width = ref()
const height = ref()
const version = ref()
const rectangle = ref()
let imagelayer = xbsjEarthUi.createSceneObject(ESImageryLayer)

function keysToLowerCase(obj: any) {
  return Object.keys(obj).reduce((result: any, key: any) => {
    const newKey = key.toLowerCase()
    result[newKey] = obj[key] // 如果值也是对象，可以递归调用keysToLowerCase
    return result
  }, {})
}
//请求wms并解析
const updateServer = () => {
  //请求地址点击回车键
  if (!serverUrl.value) return
  const server = new URL(serverUrl.value)
  server.origin && server.pathname && (url.value = server.origin + server.pathname)
  const queryString = server.search.substring(1)
  let parseSearch = keysToLowerCase(parse(queryString))
  parseSearch.format &&
    (parseSearch.format === 'application/openlayers'
      ? (format.value = 'image/png')
      : (format.value = parseSearch.format))
  parseSearch.layers && (layers.value = parseSearch.layers)
  parseSearch.credit && (credit.value = parseSearch.credit)
  parseSearch.styles && (styles.value = parseSearch.styles)
  parseSearch.srs && (srs.value = parseSearch.srs)
  parseSearch.minimumLevel && (minimumLevel.value = parseSearch.minimumLevel)
  parseSearch.maximumLevel && (maximumLevel.value = parseSearch.maximumLevel)
  parseSearch.width && (width.value = parseSearch.width)
  parseSearch.height && (height.value = parseSearch.height)
  parseSearch.version && (version.value = parseSearch.version)
  parseSearch.bbox && (rectangle.value = parseSearch.bbox)
}
const changeImage = () => {
  const options = {
    type: 'wms',
    layers: layers.value,
    style: styles.value,
    tileHeight: height.value,
    tileWidth: width.value,
    srs: srs.value,
    credit: credit.value,
    parameters: {
      service: 'WMS',
      version: version.value,
      styles: styles.value,
      format: format.value
    }
  }
  let a: any = []
  if (rectangle.value) {
    const r = rectangle.value.split(',')
    r.forEach((element: string) => {
      a.push(Number(element))
    })
  }
  if (imagelayer) {
    imagelayer.url = url.value
    imagelayer.name = layers.value
    //@ts-ignore
    imagelayer.options = options
    let maxZindex = searchMaxZindex(sceneTree, 'ESImageryLayer')
    imagelayer.zIndex = maxZindex + 1
    if (rectangle.value && imagelayer) {
      imagelayer.rectangle = a
      setTimeout(() => {
        imagelayer?.flyTo()
      }, 100)
    }
  }
}
watch(
  [
    url,
    format,
    layers,
    credit,
    styles,
    srs,
    minimumLevel,
    maximumLevel,
    maximumLevel,
    width,
    height,
    version
  ],
  () => {
    changeImage()
  }
)
const emits = defineEmits(['close'])
const addSceneObjects = () => {
  //点击确定
  if (!url.value) {
    ElMessage.warning('请输入地址')
    return
  }
  let maxZindex = searchMaxZindex(sceneTree, 'ESImageryLayer')

  if (imagelayer) {
    const json = imagelayer.json
    if (imagelayer) {
      xbsjEarthUi.destroySceneObject(imagelayer)
      imagelayer = undefined
    }
    createSceneObjTreeItemFromJson(xbsjEarthUi, json, maxZindex + 1)
    emits('close')
  }
}
//点击定位
const flyTo = () => {
  if (!rectangle.value) {
    ElMessage.warning('属性为空，无法飞入')
    return
  }
  const r = rectangle.value.split(',')
  let c: any = []
  r.forEach((element: string) => {
    c.push(Number(element))
  })
  const a = (c[0] + c[2]) / 2
  const b = (c[1] + c[3]) / 2
  xbsjEarthUi.activeViewer?.flyTo(
    {
      distance: 50000,
      heading: 90,
      pitch: -90,
      flyDuration: 2,
      hDelta: -90,
      pDelta: 1
    },
    [Number(a), Number(b), 0]
  )
}
onBeforeUnmount(() => {
  if (imagelayer) {
    xbsjEarthUi.destroySceneObject(imagelayer)
    imagelayer = undefined
  }
})
</script>
<style scoped>
.content {
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  box-sizing: border-box;
}

.item label {
  width: 50px;
  font-size: 12px;
}

.item {
  display: flex;
  flex-direction: row;
  gap: 10px;
  justify-content: space-between;
  align-items: center;
}
</style>
