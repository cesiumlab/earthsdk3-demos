<script setup lang="ts">
import { ESJSwitchToUEViewerOptionType } from 'earthsdk3'
import { inject, onMounted, ref, watch } from 'vue'
import { getNoToken } from '../../../api/service'
import LabelInput from '../../../components/LabelInput.vue'
import Loading from '../../../components/Loading.vue'
import PopList from '../../../components/PopList.vue'
import { XbsjEarthUi } from '../../../scripts/xbsjEarthUi'
import { ElMessage } from 'element-plus'
const xbsjEarthUi = inject('xbsjEarthUi') as XbsjEarthUi

const uri = ref<string>('http://localhost:9007')
const app = ref<string>('')
const serveIdList = ref<{ id: string; name: string; thumbnail: string }[]>([])
const load = ref(false)
const checkedactive = ref()
const iconIsShow = ref()
const emptyImg = new URL('../../../assets/view/emptyEarth.png', import.meta.url).href
const emits = defineEmits(['close'])
const changeServeIdList = () => {
  checkedactive.value = null
  iconIsShow.value = null
  app.value = ''
  load.value = true
  serveIdList.value = []
  let newUri = uri.value
  if (newUri.endsWith('/') || newUri.endsWith('\\')) {
    newUri = newUri.substr(0, newUri.length - 1)
  }
  getNoToken(`${newUri}/ue/app`)
    .then((res: any) => {
      load.value = false
      if (res && res.status === 'ok') {
        serveIdList.value = res.data.reverse()
      }
    })
    .catch((error) => {
      load.value = false
      console.log(error)
      ElMessage.error(`${error}`)
    })
}

const cancel = () => {
  checkedactive.value = null
  emits('close')
}
const confirm = () => {
  if (!uri.value) {
    ElMessage.warning('请输入ESSS服务地址')
  } else if (!app.value) {
    ElMessage.warning('请输入应用id')
  } else {
    checkedactive.value = null
    let url
    if (uri.value.endsWith('/')) {
      url = uri.value
    } else {
      url = uri.value + '/'
    }
    const options = {
      container: 'viewersContainer',
      uri: url,
      app: app.value,
      destroy: true,
      id: 'earthui-active-viewer-id'
    } as ESJSwitchToUEViewerOptionType
    const viewer = xbsjEarthUi.switchToUEViewer(options)
    if (viewer.extras) {
      viewer.extras = {
        ...(viewer.extras as any),
        uri: url,
        app: app.value
      }
    } else {
      viewer.extras = {
        uri: url,
        app: app.value
      }
    }
    emits('close')
  }
}
const changeServeUrl = (item: { id: string; name: string; thumbnail: string }, index: number) => {
  app.value = item.id
  checkedactive.value = index
}
onMounted(() => {
  if (xbsjEarthUi.esssUrl) {
    uri.value = xbsjEarthUi.esssUrl
  } else {
    const esssUrl = localStorage.getItem('esssUrl')
    if (esssUrl) {
      uri.value = esssUrl
    } else {
      uri.value = 'http://localhost:9007'
    }
  }
  changeServeIdList()
})
watch(uri, () => {
  xbsjEarthUi.esssUrl = uri.value
  localStorage.setItem('esssUrl', uri.value)
})
</script>

<template>
  <Loading :content="'加载中...'" v-show="load"></Loading>
  <PopList :title="'ESSS信令服务器地址'" :link="'http://bjxbsj.cn/esss.html'" :showButton="true" @close="cancel" @ok="confirm">
    <LabelInput v-model="uri" :label="'服务地址'" @blur="changeServeIdList" @keydownenter="changeServeIdList">
    </LabelInput>
    <LabelInput v-model="app" :label="'应用id'" :placeholder="'请选择...'"></LabelInput>
    <div class="images_bottom_content">
      <div class="images_img_list">
        <div v-for="(item, index) in serveIdList" class="images_img_lilist">
          <div class="images_imgposition" :class="{ images_checkedactive: checkedactive == index }"
            @click="changeServeUrl(item, index)">
            <img :src="item.thumbnail ?? emptyImg" alt="" />
            <span :style="{
              right: `${(index + 1) % 3 === 0 ? 0 : 'unset'}`,
              left: `${(index + 1) % 3 === 0 ? 'unset' : 0}`
            }" v-show="iconIsShow == index ? true : false">{{ item.name ?? '场景' }}</span>
          </div>
          <div class="images_onlineimageName" @mouseenter="iconIsShow = index" @mouseleave="iconIsShow = null">
            {{ item.name ?? '场景' }}
          </div>
        </div>
      </div>
    </div>
  </PopList>
</template>
