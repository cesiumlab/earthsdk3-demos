<template>
  <PopList :title="'CesiumIon'" :showButton="true" @ok="ok" :link="'https://ion.cesium.com'">
    <LabelInput v-model="cesiumIonUrl" :label="'请求地址'" @blur="initNewList" @keydown.enter="initNewList">
    </LabelInput>
    <div class="images_bottom_content">
      <div class="images_servelocation">
        <label>Access Token</label>
        <div class="server_token" v-if="!tokenInputShow" @click="tokenInputShow = true">
          {{ ionAccessToken }}
        </div>
        <input v-else type="text" v-model="ionAccessToken" @blur="initNewList" @keydown.enter="initNewList" />
      </div>
    </div>
    <div class="server_lab">
      <div class="server_lab_title">
        <div class="server_lab_title_index">{{ '序号' }}</div>
        <div class="server_lab_title_name">{{ '名称' }}</div>
        <!-- <div class="server_lab_title_server">{{ '服务地址' }}</div> -->
        <div class="server_lab_title_type">{{ '类型' }}</div>
      </div>
      <div class="server_content">
        <div class="server_lab_content" v-for="(item, index) in serverList" @click="changeServerLab(item, index)"
          :key="index" :class="{ server_lab_content_active: serverActive === index }">
          <div class="server_lab_content_index">{{ index + 1 }}</div>
          <div class="server_lab_content_name">{{ item.name }}</div>
          <!-- <div class="server_lab_content_server">{{ item.serverUrl }}</div> -->
          <div class="server_lab_content_type">
            {{ item.type === 'TERRAIN' ? '地形' : item.type === 'IMAGERY' ? '影像' : '瓦片' }}
          </div>
        </div>
      </div>
    </div>
    <div class="images_servelocation" v-if="serverUrl">
      <label>图层地址</label>
      <div class="images_servelocation_readonly">{{ serverUrl }}</div>
    </div>
  </PopList>
</template>
<script setup lang="ts">
import { gget } from '@/api'
import LabelInput from '@/components/LabelInput.vue'
import PopList from '@/components/PopList.vue'
import { LocalStorageKey } from '@/constants'
import { XbsjEarthUi } from '@/scripts/xbsjEarthUi'
import { createVueDisposer, toVR } from 'earthsdk-ui'
import { ElMessage } from 'element-plus'
import { inject, onBeforeUnmount, onMounted, ref } from 'vue'
import { createCesiumIonImage, createCesiumIonModel, createCesiumIonTerrain } from './tools'

const d = createVueDisposer(onBeforeUnmount)
const tokenInputShow = ref(false)
const serverUrl = ref('')
const emits = defineEmits(['close'])
const serverList = ref<any[]>([])
const serverActive = ref(-1)
const currentItem = ref<any>()
const type = ref<string>()
const xbsjEarthUi = inject('xbsjEarthUi') as XbsjEarthUi
const ionAccessToken = toVR<string>(d, [xbsjEarthUi.activeViewer, 'ionAccessToken']) //token
const cesiumIonUrl = ref('https://api.cesium.com/v1/assets');

const changeServerLab = async (item: any, index: number) => {
  currentItem.value = item
  serverActive.value = index
  type.value = item.type
  serverUrl.value = `ion://${item.id}`
}

const ok = () => {
  if (!serverUrl.value) {
    ElMessage.warning('未选择服务，请先选择')
    return
  }
  if (type.value === 'TERRAIN') {
    createCesiumIonTerrain(xbsjEarthUi, {
      name: currentItem.value.name,
      url: serverUrl.value
    })
  } else if (type.value === 'IMAGERY') {
    createCesiumIonImage(xbsjEarthUi, {
      name: currentItem.value.name,
      url: serverUrl.value
    })
  } else if (type.value === '3DTILES') {
    createCesiumIonModel(xbsjEarthUi, {
      name: currentItem.value.name,
      url: serverUrl.value
    })
  }
}
const initNewList = async () => {
  if (!ionAccessToken.value) {
    ElMessage.warning('Access Token不存在,请先设置')
    return
  }
  if (!cesiumIonUrl.value) {
    ElMessage.warning('服务地址不存在,请先设置')
    return
  }
  storeAccessToken();

  const config = {
    token: ionAccessToken.value,
    useBearer: true,
  }
  gget(cesiumIonUrl.value, config)
    .then((res: any) => {
      serverList.value = res.items
    })
    .catch((error) => {
      console.log(error);
    })
}

const storeAccessToken = () => {
  if (!cesiumIonUrl.value || !ionAccessToken.value) return;
  window.localStorage.setItem(LocalStorageKey.Earth_UI_CESIUM_ION_ACCESS_URL, cesiumIonUrl.value);
  window.localStorage.setItem(LocalStorageKey.Earth_UI_CESIUM_ION_ACCESS_TOKEN, ionAccessToken.value);
}

onMounted(() => {
  const token = window.localStorage.getItem(LocalStorageKey.Earth_UI_CESIUM_ION_ACCESS_TOKEN);
  token && (ionAccessToken.value = token);
  const url = window.localStorage.getItem(LocalStorageKey.Earth_UI_CESIUM_ION_ACCESS_URL);
  url && (cesiumIonUrl.value = url);
  initNewList();
})
</script>
