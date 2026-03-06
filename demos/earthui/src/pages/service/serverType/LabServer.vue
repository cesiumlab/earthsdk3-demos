<template>
  <PopList :title="config.cesiumLabParamValue" :showButton="serverList.length > 0"
    :link="config.specialModuleEnable ? 'https://bjxbsj.cn/cesiumlab.html' : ''" @ok="ok">
    <LabelInput v-model="cesiumLabUrl" :label="'服务地址'" @blur="initNewList" @keydownenter="initNewList">
    </LabelInput>
    <div class="images_bottom_content">
      <div class="images_servelocation">
        <label>token</label>
        <div class="server_token" v-if="!tokenInputShow" @click="tokenInputShow = true">
          {{ cesiumLabToken }}
        </div>
        <input v-else type="text" v-model="cesiumLabToken" @blur="changeToken" @keydown.enter="changeToken" />
      </div>
    </div>
    <div class="lab_Property_header">
      <div class="header_item" v-for="item in propertiesMenu" :key="item.component"
        @click="changePropertiesMenu(item.component)">
        <span class="header_item_span" :class="currentMenu === item.component ? 'header_active' : ''">{{ item.name
        }}</span>
      </div>
    </div>
    <div v-if="serverList.length > 0">
      <div class="server_lab" v-if="serverList.length > 0">
        <div class="server_lab_title">
          <div class="server_lab_title_index">{{ '序号' }}</div>
          <div class="server_lab_title_name">{{ '名称' }}</div>
          <div class="server_lab_title_type">{{ '类型' }}</div>
        </div>
        <div class="server_content">
          <div class="server_lab_content" v-for="(item, index) in serverList" @click="changeServerLab(item, index)"
            :key="index" :class="{ server_lab_content_active: serverActive === index }">
            <div class="server_lab_content_index">{{ index + 1 }}</div>
            <div class="server_lab_content_name" :title="item.name">
              {{ item.name }}
            </div>
            <div class="server_lab_content_type">{{ item.type }}</div>
          </div>
        </div>
      </div>

      <div class="images_servelocation" v-if="serverUrl">
        <label>图层地址</label>
        <div class="images_servelocation_readonly">{{ serverUrl }}</div>
      </div>
      <div class="images_servelocation" v-if="MaximumLevel">
        <label>最大级别</label>
        <div class="images_servelocation_readonly">{{ MaximumLevel }}</div>
      </div>
      <div class="page_lab">
        <div class="page_lab_pageNum">
          <span :class="{ disabled: leftDisabled }" @click="changePageNum('-')" @mouseover="mouseover"
            @mouseout="mouseout">
            {{ '<' }} </span>
              <span>{{ pageNum }}</span>
              <span :class="{ disabled: rightDisabled }" @click="changePageNum('+')" @mouseover="mouseover"
                @mouseout="mouseout">{{ '>' }}
              </span>
        </div>
        <div class="page_lab_pageSize" @click.stop="developContent = !developContent">
          <div>{{ pageSize }}条/页</div>
          <span class="develop_icon" :class="developContent ? '' : 'icon_transform'">
            <es-icon :name="'shouqi'" :color="'#fff'" :size="8" />
          </span>
          <es-collapse>
            <ul class="page_lab_pageSize_ul" v-if="!developContent">
              <li v-for="item in pageSizeList" @click.stop="changePageSize(item.pageSize)">
                {{ item.name }}
              </li>
            </ul>
          </es-collapse>
        </div>
        <div class="page_lab_pageSize">
          <div>共{{ total }}条</div>
        </div>
      </div>
    </div>

    <div class="no_info" v-else>暂无数据</div>
  </PopList>
</template>
<script setup lang="ts">
import { LocalStorageKey } from '@/constants'
import { $g_config } from '@/global'
import { createVueDisposer, toVR } from 'earthsdk-ui'
import { ElMessage } from 'element-plus'
import { inject, onBeforeUnmount, onMounted, ref } from 'vue'
import { post } from '../../../api/service'
import LabelInput from '../../../components/LabelInput.vue'
import PopList from '../../../components/PopList.vue'
import { XbsjEarthUi } from '../../../scripts/xbsjEarthUi'
import { createImage, createModel, createTerrain, imageServe, imageType, modelType, terrainType } from './tools'

const config = $g_config();
const d = createVueDisposer(onBeforeUnmount)
const xbsjEarthUi = inject('xbsjEarthUi') as XbsjEarthUi
const cesiumLabUrl = toVR<string>(d, [xbsjEarthUi, 'cesiumLabUrl'])
const cesiumLabToken = toVR<string>(d, [xbsjEarthUi, 'cesiumLabToken'])
// const token = ref()
const tokenInputShow = ref(false)
const serverActive = ref(-1)
const serverUrl = ref('') //
const MaximumLevel = ref() //最大级别
const pageNum = ref(1)
const pageSize = ref(10)
const currentItem = ref<imageServe>()
const leftDisabled = ref(true)
const rightDisabled = ref(true)
const developContent = ref(true)

const emits = defineEmits(['close'])
const pageSizeList = [
  {
    name: '5条/页',
    pageSize: 5
  },
  {
    name: '10条/页',
    pageSize: 10
  },
  {
    name: '15条/页',
    pageSize: 15
  }
]
const pageNumList = ref([1])
const total = ref(0)
const changeServerLab = (item: imageServe, index: number) => {
  currentItem.value = item
  serverActive.value = index
  serverUrl.value = item.serverUrl
  MaximumLevel.value = item.MaximumLevel
}
const currentMenu = ref('image')

let propertiesMenu: { name: string; component: string }[] = [
  {
    name: '影像',
    component: 'image'
  },
  {
    name: '瓦片',
    component: 'model'
  },
  {
    name: '地形',
    component: 'terrain'
  }
]
const changePropertiesMenu = (component: string) => {
  currentMenu.value = component
  pageNum.value = 1
  serverActive.value = -1
  initNewList()
  serverUrl.value = ''
  MaximumLevel.value = undefined
}
const changePageSize = (page: number) => {
  pageSize.value = page
  pageNum.value = 1
  initNewList()
  serverUrl.value = ''
  MaximumLevel.value = undefined
  developContent.value = true
}
const changePageNum = (sympol: string) => {
  if (sympol === '-') {
    if (pageNum.value <= 1) {
      leftDisabled.value = true
      return
    } else {
      pageNum.value--
      rightDisabled.value = false
      leftDisabled.value = false
      serverUrl.value = ''
      MaximumLevel.value = undefined
      initNewList()
    }
  } else {
    if (pageNum.value * pageSize.value >= total.value) {
      rightDisabled.value = true
      return
    } else {
      pageNum.value++
      rightDisabled.value = false
      leftDisabled.value = false
      serverUrl.value = ''
      MaximumLevel.value = undefined
      initNewList()
    }
  }
}
const mouseout = () => {
  rightDisabled.value = false
  leftDisabled.value = false
}
const mouseover = () => {
  if (pageNum.value <= 1) {
    leftDisabled.value = true
  } else {
    leftDisabled.value = false
  }
  if (pageNum.value * pageSize.value >= total.value) {
    rightDisabled.value = true
  } else {
    rightDisabled.value = false
  }
}
const serverList = ref<imageServe[]>([])
const ok = () => {
  if (!cesiumLabUrl.value) {
    ElMessage.warning('服务地址为空，请填写地址')
    return
  }
  if (!serverUrl.value) {
    ElMessage.warning('未选择服务，请先选择')
    return
  }
  if (!currentItem.value) return
  if (currentItem.value.type === '影像') {
    createImage(currentItem.value, xbsjEarthUi)
  } else if (currentItem.value.type === '模型') {
    createModel(currentItem.value, xbsjEarthUi)
  } else if (currentItem.value.type === '地形') {
    createTerrain(currentItem.value, xbsjEarthUi)
  }
}
const imageList = (list: imageType[]) => {
  //影像
  let newList: imageServe[] = []
  list.forEach((item: imageType) => {
    const li: imageServe = {
      type: '影像',
      name: item.name,
      serverUrl:
        item.tiletrans === 'tms'
          ? `${cesiumLabUrl.value}/tile/image/tms/${item.id}/tilemapresource.xml`
          : `${cesiumLabUrl.value}/tile/image/wmts/${item.id}/{z}/{x}/{y}`,
      createTime: item.createTime,
      MaximumLevel: item.maxzoom,
      rectangle: [item.west, item.south, item.east, item.north],
      czmTilingScheme: item.proj === 4326 ? 'GeographicTilingScheme' : 'WebMercatorTilingScheme',
      czmMinimumLevel: Number(item.minzoom),
      czmMaximumLevel: Number(item.maxzoom),
      czmTileWidth: Number(item.tilesize),
      czmTileHeight: Number(item.tilesize)
    }
    newList.push(li)
  })
  return newList
}
const modelList = (list: modelType[]) => {
  //影像
  let newList: imageServe[] = []
  list.forEach((item: modelType) => {
    const li: imageServe = {
      type: '模型',
      name: item.name,
      serverUrl: `${cesiumLabUrl.value}/tile/model/service/${item.id}/tileset.json`,
      createTime: item.createTime,
      MaximumLevel: 0
    }
    newList.push(li)
  })
  return newList
}
const terrainList = (list: terrainType[]) => {
  //影像
  let newList: imageServe[] = []
  list.forEach((item: terrainType) => {
    const li: imageServe = {
      type: '地形',
      name: item.name,
      serverUrl: `${cesiumLabUrl.value}/tile/terrain/${item.id}`,
      createTime: item.createTime,
      MaximumLevel: item.maxzoom,
      rectangle: [item.west, item.south, item.east, item.north]
    }
    newList.push(li)
  })
  return newList
}
const initNewList = async () => {
  // window.localStorage.setItem('labServeUrl', cesiumLabUrl.value)
  let newList: imageServe[] = []
  if (!cesiumLabUrl.value) {
    ElMessage.warning('服务地址为空，请填写地址')
    return
  }
  window.localStorage.setItem(LocalStorageKey.Earth_UI_CESIUMLAB_SERVER_URL, cesiumLabUrl.value)
  let url
  if (cesiumLabToken.value) {
    url = `${cesiumLabUrl.value}/tile/services/labtoken?labtoken=${cesiumLabToken.value}`
  } else {
    url = `${cesiumLabUrl.value}/tile/statistics/services/all/auth`
  }
  const token = localStorage.getItem(LocalStorageKey.CESIUMLAB_SERVER_TOKEN) as string | undefined
  // console.log(token);
  const option = {
    pageNum: pageNum.value,
    pageSize: pageSize.value,
    type: currentMenu.value
  }
  post(url, option, cesiumLabToken.value ? undefined : token)
    .then((res: any) => {
      if (res && res.code === 1000) {
        switch (currentMenu.value) {
          case 'image':
            serverList.value = imageList(res.data.rows)
            break
          case 'model':
            serverList.value = modelList(res.data.rows)
            break
          case 'terrain':
            serverList.value = terrainList(res.data.rows)
            break
          default:
            serverList.value = []
            break
        }
        total.value = res.data.total
        const a = []
        const b = Math.ceil(total.value / pageSize.value)
        for (let index = 0; index < b; index++) {
          a.push(index + 1)
        }
        pageNumList.value = [...a]
        // console.log(pageNumList.value);
      }
    })
    .catch((error) => {
      console.log(error)
      serverList.value = []
      ElMessage.error(`${error}`)
    })
}
const changeToken = () => {
  tokenInputShow.value = false
  initNewList()
}
onMounted(() => {
  initNewList()
})
</script>
