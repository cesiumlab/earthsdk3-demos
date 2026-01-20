<template>
  <div class="neck_ft">
    <!-- 图标 -->
    <div class="neck_loge">
      <div class="logo_img" :style="`background-image: url(${$config.logoImage})`"></div>
      <a :href="$config.logoLink" target="_blank">{{ $config.logoTitle }}</a>
    </div>
    <!-- 导航栏 -->
    <div class="neck_nav" ref="menuRef">
      <div v-for="(item, index) in defalutNavList" v-show="item.isShow" :key="item.id" @click="change(item)"
        class="neck_title" @mouseover="iconheight = index" @mouseout="iconheight = -1"
        :class="navType === item.value ? 'activated' : ''" :title="item.title">
        <span :style="{ marginTop: '0px' }" class="ctm-svg">
          <es-icon :name="item.icon" />
        </span>
        <span style="margin-left: 6px" class="ctm-title">{{ item.title }}</span>
        <span v-if="item.new" style="margin-left: 6px" class="ctm-new">NEW</span>
      </div>
      <div class="neck_title" :class="moreMenuShow ? 'activated' : ''" v-if="noneNavList.length !== 0" ref="moreNavRef"
        @click="changeMore(true)">
        <span style="margin-top: 3px" class="ctm-svg">
          <svg t="1760181802183" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
            p-id="8086" width="18" height="18" fill="currentColor">
            <path
              d="M511.998977 113.725134c219.514529 0 398.103974 178.588421 398.103974 398.103974S731.513506 909.933081 511.998977 909.933081 113.895003 731.34466 113.895003 511.829108 292.485471 113.725134 511.998977 113.725134M511.998977 63.961754c-246.947322 0-447.867354 200.919009-447.867354 447.867354s200.920032 447.867354 447.867354 447.867354c246.944252 0 447.867354-200.919009 447.867354-447.867354S758.943228 63.961754 511.998977 63.961754L511.998977 63.961754z"
              p-id="8087"></path>
            <path
              d="M327.384305 511.829108m-45.216831 0a44.187 44.187 0 1 0 90.433662 0 44.187 44.187 0 1 0-90.433662 0Z"
              p-id="8088"></path>
            <path
              d="M511.997953 511.829108m-45.216831 0a44.187 44.187 0 1 0 90.433662 0 44.187 44.187 0 1 0-90.433662 0Z"
              p-id="8089"></path>
            <path
              d="M696.612625 511.829108m-45.216831 0a44.187 44.187 0 1 0 90.433662 0 44.187 44.187 0 1 0-90.433662 0Z"
              p-id="8090"></path>
          </svg>
        </span>
        <span style="margin-left: 6px">{{ '更多' }}</span>
      </div>
    </div>

    <!-- 隐藏菜单展开 -->

    <div class="none_menu_box" ref="moreMenuRef" v-show="moreMenuShow" v-click-outside="clickOutside">
      <div v-for="(item, index) in noneNavList" v-show="item.isShow" :key="item.id" @click="change(item, true)"
        class="neck_title" @mouseover="iconheight1 = index" @mouseout="iconheight1 = -1"
        :class="navType === item.value ? 'activated' : ''" :title="item.title">
        <span style="margin-top: 3px" class="ctm-svg">
          <es-icon :name="item.icon" />
        </span>
        <span style="margin-left: 6px" class="ctm-title">{{ item.title }}</span>
      </div>
    </div>

    <!-- 主题切换 -->
    <div class="neck_theme_icon" @click="toggleTheme">
      <svg t="1767868138156" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
        p-id="13457" width="16" height="16" fill="currentColor">
        <path
          d="M512 796.444444A284.444444 284.444444 0 1 0 512 227.555556a284.444444 284.444444 0 0 0 0 568.888888z m-315.335111-153.827555a341.333333 341.333333 0 1 1 630.670222-261.233778 341.333333 341.333333 0 0 1-630.670222 261.233778zM341.333333 625.265778a306.005333 306.005333 0 0 0 194.787556-89.144889A306.005333 306.005333 0 0 0 625.265778 341.333333 204.8 204.8 0 1 1 341.333333 625.265778z"
          p-id="13458"></path>
        <path
          d="M516.892444 0h-0.113777c22.584889 0 33.848889 11.605333 33.848889 34.816v46.307556c0 23.210667-11.264 34.816-33.848889 34.816h0.113777c-22.584889 0-33.848889-11.605333-33.848888-34.816V34.816c0-23.210667 11.264-34.816 33.848888-34.816zM516.892444 908.060444h-0.113777c22.584889 0 33.848889 11.605333 33.848889 34.816v46.307556c0 23.210667-11.264 34.816-33.848889 34.816h0.113777c-22.584889 0-33.848889-11.605333-33.848888-34.816v-46.307556c0-23.210667 11.264-34.816 33.848888-34.816zM1024 516.892444v-0.113777c0 22.584889-11.605333 33.848889-34.816 33.848889h-46.307556c-23.210667 0-34.816-11.264-34.816-33.848889v0.113777c0-22.584889 11.605333-33.848889 34.816-33.848888h46.307556c23.210667 0 34.816 11.264 34.816 33.848888zM115.939556 516.892444v-0.113777c0 22.584889-11.605333 33.848889-34.816 33.848889H34.816C11.605333 550.684444 0 539.363556 0 516.778667v0.113777c0-22.584889 11.605333-33.848889 34.816-33.848888h46.307556c23.210667 0 34.816 11.264 34.816 33.848888zM866.872889 157.184v-0.056889c16.327111 16.384 16.327111 32.711111 0 49.095111l-32.711111 32.654222c-16.384 16.384-32.768 16.384-49.095111 0V238.933333c-16.327111-16.327111-16.327111-32.711111 0-49.095111l32.711111-32.654222c16.384-16.384 32.711111-16.384 49.095111 0zM238.933333 785.066667c16.327111 16.327111 16.327111 32.711111 0 49.095111l-32.711111 32.654222c-16.384 16.384-32.711111 16.384-49.095111 0v0.056889c-16.327111-16.384-16.327111-32.711111 0-49.095111l32.711111-32.654222c16.384-16.384 32.768-16.384 49.095111 0zM866.816 866.872889h0.056889c-16.384 16.327111-32.711111 16.327111-49.095111 0l-32.654222-32.711111c-16.384-16.384-16.384-32.768 0-49.095111H785.066667c16.327111-16.327111 32.711111-16.327111 49.095111 0l32.654222 32.711111c16.384 16.384 16.384 32.711111 0 49.095111zM238.933333 238.933333c-16.327111 16.327111-32.711111 16.327111-49.095111 0l-32.654222-32.711111c-16.384-16.384-16.384-32.711111 0-49.095111h-0.056889c16.384-16.327111 32.711111-16.327111 49.095111 0l32.654222 32.711111c16.384 16.384 16.384 32.768 0 49.095111z"
          p-id="13459"></path>
      </svg>
    </div>

    <!-- 保存按钮 -->
    <div class="neck_save" v-if="fromIsExist" title="保存场景">
      <div class="neck_scene" @click.stop.prevent="xiaosanjiao = !xiaosanjiao">
        <es-icon :name="'baocun'" />
        <span class="xiaosanjiao"></span>
      </div>
      <ul class="neck_ft_ul" v-if="!xiaosanjiao">
        <li v-for="item in sceneList" @click="item.fun()">
          {{ item.content }}
        </li>
      </ul>
    </div>
    <div class="neck_save" v-else title="保存场景">
      <div class="neck_scene" @click="saveAs(xbsjEarthUi.json, '场景文件')">
        <es-icon :name="'baocun'" />
      </div>
    </div>
  </div>
  <!-- 组件栏 -->
  <div class="sub_menu" :style="subMenuStyle">
    <div class="sub_menu_button" @click="rightModuleShow = !rightModuleShow"
      :class="rightModuleShow ? '' : 'sub_menu_button_checked'"></div>
    <div class="submenu_component" id="submenu_component">
      <component :is="com"></component>
    </div>
  </div>
</template>

<script setup lang="ts">
import { $config, useRightSidebarWidthFunc } from '@/global'
import { createVueDisposer, toVR, useTheme, vClickOutside } from 'earthsdk-ui'
import { ElMessage } from 'element-plus'
import { parse } from 'search-params'
import {
  computed,
  inject,
  nextTick,
  onBeforeUnmount,
  onMounted,
  ref,
  shallowRef,
  useTemplateRef,
  watch
} from 'vue'
import { get, post, put } from '../api/service'
import { saveAs } from '../components/sceneTree/tools'
import { XbsjEarthUi } from '../scripts/xbsjEarthUi'
const props = withDefaults(
  defineProps<{
    navList: any[]
    navType: string | undefined
  }>(),
  {
    navType: 'roam'
  }
)
const xbsjEarthUi = inject('xbsjEarthUi') as XbsjEarthUi
const navType = ref('roam')
//////////////////////////////////导航栏逻辑
const cesiumLabUrl = ref()
const esssUrl = ref()
const iconheight = ref<any>(-1)
const iconheight1 = ref<any>(-1)
const { navList } = props
const disposer = createVueDisposer(onBeforeUnmount)
const rightModuleShow = toVR<boolean>(disposer, [xbsjEarthUi, 'rightModuleShow'])
const fromIsExist = ref(true)
//ESSS信令服务器保存
const esssScene = (parseSearch: any, uri: string) => {
  // const origin = 'http://localhost:9006';
  const sceneid = parseSearch.ESSSsceneid as string
  const token = parseSearch.token as string
  const appid = parseSearch.appid as string
  const allJson = xbsjEarthUi.json
  if (!appid) {
    ElMessage.error(`无appid,保存场景失败`)
    return
  }
  get(`${xbsjEarthUi.esssUrl}/setting/get`)
    .then(async (res) => {
      if (!sceneid) {
        const thumbnail = await xbsjEarthUi.activeViewer?.capture()
        post(
          `${uri}/staticscene/create`,
          {
            name: '默认场景',
            appid,
            thumbnail,
            content: JSON.stringify(allJson)
          },
          token
        )
          .then((res: any) => {
            if (res.status === 'ok') {
              ElMessage.success(`保存场景成功：${appid}`)
            } else {
              ElMessage.error(`保存场景失败：${appid}`)
            }
          })
          .catch((error) => {
            console.log(error)
            ElMessage.error(`保存场景失败：${appid}!${error}`)
          })
      } else {
        post(`${uri}/staticscene/update`, { id: sceneid, content: JSON.stringify(allJson) }, token)
          .then((res: any) => {
            if (res.status === 'ok') {
              ElMessage.success(`保存场景成功：${appid}`)
            } else {
              ElMessage.error(`保存场景失败：${appid}`)
            }
          })
          .catch((error) => {
            console.log(error)
            ElMessage.error(`保存场景失败：${appid}!${error}`)
          })
      }
    })
    .catch((err) => {
      console.log(err)
      put(`${uri}/staticscene/${sceneid}`, { content: allJson }, token)
        .then((res: any) => {
          if (res.status === 'ok') {
            ElMessage.success(`保存场景成功：${appid}`)
          } else {
            ElMessage.error(`保存场景失败：${appid}`)
          }
        })
        .catch((error) => {
          console.log(error)
          ElMessage.error(`保存场景失败：${appid}!${error}`)
        })
    })
}
//CesiumLab端保存
const cesiumLabScene = async (parseSearch: any, uri: string) => {
  const allJson = xbsjEarthUi.json
  const thumbnail = await xbsjEarthUi.activeViewer?.capture()
  if (parseSearch.scene) {
    const params = {
      content: JSON.stringify(allJson),
      newId: parseSearch.scene,
      id: parseSearch.scene,
      thumbnail: thumbnail
    }
    let url = `${uri}/tile/scene/update`
    if (xbsjEarthUi.cesiumLabToken) {
      url += `?labtoken=${xbsjEarthUi.cesiumLabToken}`
    }
    const token = localStorage.getItem('token') as string | undefined
    post(url, params, xbsjEarthUi.cesiumLabToken ? undefined : token)
      .then((res: any) => {
        if (res.code === 1000) {
          ElMessage.success(`更新场景成功：${parseSearch.scene}`)
        } else {
          ElMessage.error('更新场景失败')
        }
      })
      .catch((error) => {
        console.log(error)
        ElMessage.error(`更新场景失败!${error}`)
      })
  } else {
    const params = {
      name: '新建场景',
      description: '描述',
      content: JSON.stringify(allJson),
      thumbnail: thumbnail
    }
    let url = `${uri}/tile/scene/create`
    if (xbsjEarthUi.cesiumLabToken) {
      url += `?labtoken=${xbsjEarthUi.cesiumLabToken}`
    }
    const token = localStorage.getItem('token') as string | undefined
    post(url, params, xbsjEarthUi.cesiumLabToken ? undefined : token)
      .then((res: any) => {
        if (res.code === 1000) {
          ElMessage.success(`创建场景成功：${res.data.id}`)
          //替换地址栏
          window.history.pushState(
            {},
            '',
            window.location.origin +
            window.location.pathname +
            `?from=${$config.jumpOrigin}${xbsjEarthUi.cesiumLabToken ? '&cesiumLabToken=' + xbsjEarthUi.cesiumLabToken : ''}&scene=${res.data.id}`
          )
        } else {
          ElMessage.error('创建场景失败')
        }
      })
      .catch((error) => {
        console.log(error)
        ElMessage.error(`创建场景失败!${error}`)
      })
  }
}
//点击保存场景，判断是cesium还是esss
const scene = () => {
  const search = window.location.search.substring(1)
  const parseSearch = parse(search)
  if (parseSearch.from === $config.jumpOrigin) {
    cesiumLabScene(parseSearch, cesiumLabUrl.value)
  } else if (parseSearch.from === 'esss') {
    esssScene(parseSearch, esssUrl.value)
  } else {
    ElMessage.warning('请输入服务地址')
  }
}
const xiaosanjiao = ref(true)
const sceneList = [
  {
    content: '保存到服务',
    fun: () => {
      console.log(xbsjEarthUi.json)
      // saveAs(xbsjEarthUi.json, '场景文件')
      scene()
    }
  },
  {
    content: '保存到本地',
    fun: () => {
      console.log(xbsjEarthUi.json)
      saveAs(xbsjEarthUi.json, '场景文件')
    }
  }
]

onMounted(() => {
  navType.value = props.navType
  navList.forEach((item) => {
    if (item.value === props.navType) {
      com.value = item.component
      return
    }
  })
  esssUrl.value = xbsjEarthUi.esssUrl
  cesiumLabUrl.value = xbsjEarthUi.cesiumLabUrl
  xbsjEarthUi.dispose(
    xbsjEarthUi.cesiumLabUrlChanged.disposableOn(() => {
      cesiumLabUrl.value = xbsjEarthUi.cesiumLabUrl
    })
  )
  xbsjEarthUi.dispose(
    xbsjEarthUi.esssUrlChanged.disposableOn(() => {
      esssUrl.value = xbsjEarthUi.esssUrl
    })
  )
  const search = window.location.search.substring(1)
  const parseSearch = parse(search)
  if (!parseSearch.from) {
    fromIsExist.value = false
  }
})

//////////////////////////////////组件栏逻辑
const { rightSidebarWidth, setRightSidebarWidth } = useRightSidebarWidthFunc()
const com = shallowRef(navList[0].component)
const change = (item: any, flag?: boolean) => {
  //大模型时需要更宽的ui 600px
  if (item.value === 'llmchat') {
    /** 全局注入设置右侧边栏宽度 */
    setRightSidebarWidth(600)
  } else {
    /** 全局注入设置右侧边栏宽度 */
    setRightSidebarWidth(400)
  }

  if (item.value === navType.value) {
    rightModuleShow.value = !rightModuleShow.value
  } else {
    rightModuleShow.value = true
    com.value = item.component
    navType.value = item.value
  }

  flag && (moreMenuShow.value = false)
}
// const getsubMenuStyle = () => ({
//     right: rightModuleShow.value ? '0px' : `${-rightSidebarWidth}px`
// })

const subMenuStyle = computed(() => ({
  right: rightModuleShow.value ? '0px' : `${-rightSidebarWidth.value}px`
}))

// //////////////////////////////////属性逻辑
watch(
  [rightModuleShow, rightSidebarWidth],
  () => {
    if (rightModuleShow.value) {
      xbsjEarthUi.navigatorManager.navigatorScaleRight = rightSidebarWidth.value + 10
      xbsjEarthUi.navigatorManager.timeLineWidth = `calc(100% - ${rightSidebarWidth.value}px)`
    } else {
      xbsjEarthUi.navigatorManager.navigatorScaleRight = 10
      xbsjEarthUi.navigatorManager.timeLineWidth = '100%'
    }
  },
  { immediate: true }
)

const menuRef = useTemplateRef('menuRef')
const moreNavRef = useTemplateRef('moreNavRef')
const moreMenuRef = useTemplateRef('moreMenuRef')
const moreMenuShow = ref(false)

const defalutNavList = shallowRef<any>([])
const noneNavList = shallowRef<any>([])

const changeMore = (flag?: boolean) => {
  if (!moreNavRef.value || !moreMenuRef.value) return
  const navRect = moreNavRef.value.getBoundingClientRect()
  const { top, left, height } = navRect
  moreMenuRef.value.style.top = `${top + height}px`
  moreMenuRef.value.style.left = `${left}px`
  setTimeout(() => {
    flag && (moreMenuShow.value = !moreMenuShow.value)
  }, 0)
}

const clickOutside = () => {
  if (moreMenuShow.value) {
    moreMenuShow.value = false
  }
}

onMounted(() => {
  nextTick(() => {
    const onresize = () => {
      if (!menuRef.value) return
      const width = menuRef.value.getBoundingClientRect().width
      const itemWidth = 100 //TODO 待完善 每个菜单的宽度
      //向下取整
      const count = Math.floor(width / itemWidth)
      if (count <= 0) {
        defalutNavList.value = []
        noneNavList.value = [...navList]
        return
      }

      defalutNavList.value = [...navList.slice(0, count - 1)]
      noneNavList.value = [...navList.slice(count - 1)]
      changeMore()
    }
    onresize()
    addEventListener('resize', onresize)
    onBeforeUnmount(() => {
      removeEventListener('resize', onresize)
    })
  })
})

const { toggleTheme } = useTheme()
</script>
<style src="../css/General.css"></style>
<style scoped>
.xbsj_header {
  width: 100%;
  height: 40px;
  background-color: #2f3034;
  border-bottom: 1px solid #111111;
  box-sizing: border-box;
}

.sub_menu {
  width: var(--right-sidebar-width);
  height: calc(100% - 70px);
  position: fixed;
  transition: right 0.4s linear;
  right: 0;
  top: 40px;
  background-color: rgba(37, 38, 42, 0.9);
  z-index: 1;
}

.sub_menu_button {
  position: absolute;
  left: -30px;
  top: 0;
  width: 30px;
  height: 30px;
  background: rgba(37, 38, 42, 1);
  background-image: url(../assets/top/shouqi.svg);
  transition: background-image 0.4s linear;
  background-size: 15px 14px;
  background-repeat: no-repeat;
  background-position: center;
  border-bottom: 1px solid rgba(17, 17, 17, 1);
  border-left: 1px solid rgba(17, 17, 17, 1);
  box-sizing: border-box;
  cursor: pointer;
  border-bottom-left-radius: 5px;
  border-top-left-radius: 5px;
}

.sub_menu_button_checked {
  background-image: url(../assets/top/zhankai.svg);
}

.neck_ft {
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  position: relative;
}

.neck_ft>.neck_loge {
  width: 250px;
  height: 100%;
  display: flex;
  align-items: center;
  padding-left: 8px;
}

.neck_ft>.neck_loge>img {
  width: 43px;
  height: 43px;
}

.neck_ft>.neck_loge>.logo_img {
  width: 43px;
  height: 43px;
  background-size: 100% 100%;
}

.neck_ft>.neck_loge>a {
  flex: 1;
  height: 28px;
  border-left: 1px solid rgba(87, 91, 102, 0.3);
  /* margin-left: 10px; */
  padding-left: 10px;
  font-size: 16px;
  font-family: SourceHanSansCN, SourceHanSansCN;
  font-weight: 500;
  color: #fff;
  line-height: 28px;
  text-decoration: none;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.neck_ft>.neck_nav {
  /* flex: 1; */
  width: calc(100% - 250px - 40px - 30px);
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
}

.neck_title {
  width: 100px;
  min-width: 100px;
  height: 40px;
  font-size: 14px;
  font-family: SourceHanSansCN, SourceHanSansCN;
  font-weight: 500;
  color: #fff;
  cursor: pointer;
  transition: color 0.3s linear;
  overflow: hidden;
  user-select: none;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;

  &:hover .ctm-svg {
    color: #5788ff;
  }
}

.ctm-title {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.ctm-new {
  width: 20px;
  background: #2c68f7;
  font-size: 8px;
  color: #fff;
  border-radius: 4px;
  text-align: center;
}

.neck_more {
  width: 100px;
  min-width: 100px;
  height: auto;
  position: absolute;
  z-index: 200;
}

.none_menu_box {
  width: 100px;
  height: auto;
  position: fixed;
  z-index: 99999;
  background-color: #2d2d31;
}

.neck_title:hover {
  background: linear-gradient(180deg,
      rgba(87, 136, 255, 0) 0%,
      rgba(87, 136, 255, 0.26) 100%,
      #5788ff 100%);
  color: #5788ff;
}

.activated {
  background: linear-gradient(180deg,
      rgba(87, 136, 255, 0) 0%,
      rgba(87, 136, 255, 0.26) 100%,
      #5788ff 100%) !important;
  color: #5788ff !important;
}

.neck_save {
  width: 30px;
  height: 100%;
  display: flex;
  align-items: center;
  padding-left: 8px;
  position: relative;
}

.neck_scene {
  position: relative;
  width: 30px;
  height: 28px;
  border-radius: 8px;
  display: flex;
  /* padding-left: 6px; */
  box-sizing: border-box;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  user-select: none;
  border: 1px solid rgba(28, 28, 30, 0);
  color: #fff;
  font-size: 14px;
}

.neck_scene:hover {
  border: 1px solid #2c68f7;
}

.xiaosanjiao {
  position: absolute;
  right: 4px;
  top: 4px;
  width: 6px;
  height: 6px;
  transition: 0.5s;
  background-image: url(../assets/right/xiaosanjiaoshouqi.svg);
  background-size: 100% 100%;
}

.xiaosanjiao_transform {
  transform: rotate(-90deg);
}

.right_button_content {
  margin-left: 3px;
}

.scene_active {
  color: rgba(255, 255, 255, 1);
  border: 1px solid #2c68f7;
}

.neck_ft_ul {
  position: absolute;
  z-index: 200;
  right: 5px;
  top: 40px;
  overflow-y: auto;
  background: #292a2e;
  box-shadow: 0px 2px 6px 0px rgba(26, 26, 28, 0.68);
  border-radius: 4px;
  overflow-x: hidden;
  margin: 0;
  padding: 0;
}

.neck_ft_ul>li {
  list-style: none;
  text-align: center;
  width: 100px;
  height: 26px;
  font-size: 12px;
  line-height: 26px;
  cursor: pointer;
  /* text-align: left; */
  /* padding-left: 10px; */
  margin: 0;
  white-space: nowrap;
  color: rgba(230, 230, 230, 1);
}

.neck_ft_ul>li:hover {
  background: #37393e;
}

.es_PropPanel {
  position: absolute;
  left: -30px;
  top: 0;
  width: 30px;
  height: 30px;
  background: rgba(37, 38, 42, 1);
  border-bottom: 1px solid rgba(17, 17, 17, 1);
  border-left: 1px solid rgba(17, 17, 17, 1);
  box-sizing: border-box;
  cursor: pointer;
  border-bottom-left-radius: 5px;
  border-top-left-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.neck_theme_icon {
  width: 30px;
  height: 30px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  color: var(--el-text-color-primary);

  &:hover {
    background-color: var(--el-color-primary-light-9);
  }
}
</style>
