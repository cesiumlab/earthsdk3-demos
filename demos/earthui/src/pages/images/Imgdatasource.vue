<template>
  <RightList :title="'数据源'" :isTop="true">
    <Button
      :name="'zaixian'"
      :content="'在线'"
      :click="
        () => {
          type === 'imagelist' ? (type = '') : (type = 'imagelist')
        }
      "
      :actived="type === 'imagelist'"
      :left-button="true"
    ></Button>
    <Button
      :name="'guge'"
      :content="'谷歌影像'"
      :click="
        () => {
          type === 'guge' ? (type = '') : (type = 'guge')
        }
      "
      :actived="type === 'guge'"
    ></Button>
    <Button
      :name="'WMTS'"
      :content="'WMTS'"
      :click="
        () => {
          type === 'WMTS' ? (type = '') : (type = 'WMTS')
        }
      "
      :actived="type === 'WMTS'"
      :left-button="true"
    ></Button>
    <Button
      :name="'WMS'"
      :content="'WMS'"
      :click="
        () => {
          type === 'WMS' ? (type = '') : (type = 'WMS')
        }
      "
      :actived="type === 'WMS'"
      :left-button="false"
    ></Button>
    <Button
      :name="'shiliangtuceng'"
      :content="'矢量图层'"
      :click="
        () => {
          type === 'ESMVTLayer' ? (type = '') : (type = 'ESMVTLayer')
        }
      "
      :actived="type === 'ESMVTLayer'"
      :left-button="true"
    ></Button>
    <ImageChange v-if="type === 'imagelist'" @close="type = ''"></ImageChange>
    <Guge v-if="type === 'guge'" @close="type = ''"></Guge>
    <Wmts v-if="type === 'WMTS'" @close="type = ''"></Wmts>
    <Wms v-if="type === 'WMS'" @close="type = ''"></Wms>
    <ESMVTLayer v-if="type === 'ESMVTLayer'" @close="type = ''"></ESMVTLayer>
  </RightList>
</template>
<script setup lang="ts">
import Button from '../../components/Button.vue'
import RightList from '../../components/RightList.vue'
import { ref } from 'vue'
import Guge from './imgdatasource/Guge.vue'
import Wmts from './imgdatasource/Wmts.vue'
import Wms from './imgdatasource/Wms.vue'
import ImageChange from './imgdatasource/ImageChange.vue'
import ESMVTLayer from './imgdatasource/ESMVTLayer.vue'

const type = ref()
</script>
