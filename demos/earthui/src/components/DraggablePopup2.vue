<script setup lang="ts">
import { ref, onMounted, onBeforeMount } from 'vue'
interface Props {
  title?: string
  left?: number | string
  top?: number | string
  width?: number
  showButton?: boolean
  link?: string
  disabled?: boolean
  height?: string
  buttonConfirm?: string
  iconName?: string
  iconColor?: string
  iconSize?: number
  checkIconIsShow?: boolean
  iconIschecked?: boolean
  checkFun?: () => void
  minWidthHeight?: [number, number]
}
const props = withDefaults(defineProps<Props>(), {
  title: '设置',
  left: 10,
  top: 200,
  width: 300,
  showButton: false,
  link: '',
  disabled: true,
  height: '500px',
  iconColor: '#fff',
  iconSize: 16,
  checkIcon: false,
  iconIschecked: false,
  minWidthHeight: () => [215, 100],
  checkFun: () => { }
})
const emits = defineEmits(['close', 'ok'])
const developContent = ref(true)
const popupBoxDom = ref<HTMLElement>()
const popupBodyDom = ref<HTMLElement>()
const popupHeaderDom = ref<HTMLElement>()
const popupStyle = () => {
  const popStyle = {
    top: typeof props.top === 'number' ? props.top + 'px' : props.top,
    left: typeof props.left === 'number' ? props.left + 'px' : props.left,
    width: props.width + 'px',
    height: props.height
  }
  return popStyle
}
onMounted(() => {
  if (popupBoxDom.value) {
    popupBoxDom.value.style.top = popupStyle().top
    popupBoxDom.value.style.left = popupStyle().left
  }
  if (popupBodyDom.value) {
    popupBodyDom.value.style.width = popupStyle().width
    popupBodyDom.value.style.height = popupStyle().height
  }
  if (popupHeaderDom.value) {
    popupHeaderDom.value.style.width = popupStyle().width
  }
})
const pointerdown = (event: PointerEvent) => {
  if (!popupBoxDom.value) {
    return
  }
  const distanceX = event.clientX - popupBoxDom.value.offsetLeft
  const distanceY = event.clientY - popupBoxDom.value.offsetTop
  document.onmousemove = function (ev) {
    if (!popupBoxDom.value) {
      return
    }
    var oevent = ev || event
    popupBoxDom.value.style.left = oevent.clientX - distanceX + 'px'
    popupBoxDom.value.style.top = oevent.clientY - distanceY + 'px'
  }
  document.onmouseup = function () {
    document.onmousemove = null
    document.onmouseup = null
  }
}

const disX = ref()
const disY = ref()
const disW = ref()
const disH = ref()

const dragPointerdown = (event: MouseEvent) => {
  if (!popupBodyDom.value) {
    return
  }
  disX.value = event.clientX // 获取鼠标按下时光标x的值
  disY.value = event.clientY // 获取鼠标按下时光标Y的值
  disW.value = popupBodyDom.value.offsetWidth // 获取拖拽前div的宽
  disH.value = popupBodyDom.value.offsetHeight // 获取拖拽前div的高
  // console.log(disX.value, disY.value, disW.value, disH.value);
  document.onmousemove = function (ev) {
    if (!popupBodyDom.value) {
      return
    }
    if (!popupHeaderDom.value) {
      return
    }
    var x = ev.clientX
    var y = ev.clientY
    if (disW.value && disH.value) {
      if (disW.value + (x - disX.value) < props.minWidthHeight[0]) {
        popupBodyDom.value.style.width = `${props.minWidthHeight[0] + 15}px`
        popupHeaderDom.value.style.width = `${props.minWidthHeight[0] + 15}px`
      } else {
        popupBodyDom.value.style.width = disW.value + (x - disX.value) + 'px'
        popupHeaderDom.value.style.width = disW.value + (x - disX.value) + 'px'
      }
      if (disH.value + (y - disY.value) < props.minWidthHeight[1]) {
        popupBodyDom.value.style.height = `${props.minWidthHeight[1]}px`
      } else {
        popupBodyDom.value.style.height = disH.value + (y - disY.value) + 'px'
      }
    }
  }
  document.onmouseup = function () {
    document.onmousemove = null
    document.onmouseup = null
  }
}
const hoverLineHeight = ref(-1)
// const hoverLineHeight2 = ref(-1)
</script>

<template>
  <teleport to="body" :disabled="disabled">
    <div class="popup_box" ref="popupBoxDom" :class="developContent ? '' : 'transform_border'">
      <div class="popup_header" ref="popupHeaderDom">
        <div class="popup_title" @pointerdown="pointerdown">
          <div class="popup_title_span" v-if="iconName">
            <es-icon :name="iconName" :color="iconColor" :size="iconSize" />
          </div>
          {{ title }}
          <a :href="`${link}`" v-show="link" target="_blank"> {{ link }}</a>
        </div>
        <div class="popup_icon">
          <!-- <span class="develop_icon" @click.stop="editingFun()" v-if="editingIconIsShow"
                        :title="editingIschecked ? '取消编辑' : '编辑'" @mouseover.prevent="hoverLineHeight2 = 0"
                        @mouseout.prevent="hoverLineHeight2 = -1">
                        <es-icon :name="'sanweizuobiao'"
                            :color="editingIschecked || hoverLineHeight2 === 0 ? '#5788FF' : '#fff'" :size="12" />
                    </span> -->
          <span class="develop_icon" @click.stop="checkFun()" v-if="checkIconIsShow"
            :title="iconIschecked ? '取消全选' : '全选'" @mouseover.prevent="hoverLineHeight = 0"
            @mouseout.prevent="hoverLineHeight = -1">
            <es-icon :name="'weixuanzhong'" :color="iconIschecked || hoverLineHeight === 0 ? '#5788FF' : '#fff'"
              :size="12" />
          </span>
          <span class="develop_icon" :class="developContent ? '' : 'icon_transform'"
            @click.stop="developContent = !developContent" :title="developContent ? '收起' : '展开'"
            @mouseover.prevent="hoverLineHeight = 1" @mouseout.prevent="hoverLineHeight = -1">
            <es-icon :name="'shouqi'" :color="hoverLineHeight === 1 ? '#5788FF' : '#fff'" :size="12" />
          </span>
          <span class="develop_icon" @click="emits('close')" :title="'关闭'" @mouseover.prevent="hoverLineHeight = 2"
            @mouseout.prevent="hoverLineHeight = -1">
            <es-icon :name="'guanbi'" :color="hoverLineHeight === 2 ? '#5788FF' : '#fff'" :size="12" /></span>
        </div>
      </div>
      <div class="popup_body" ref="popupBodyDom" v-show="developContent">
        <slot></slot>
      </div>
      <div class="popup_foot" v-if="showButton && developContent">
        <button @click="emits('close')">取消</button>
        <button @click="emits('ok')">{{ buttonConfirm ?? '确认' }}</button>
      </div>
      <div disabled="false" class="dragMouse" @pointerdown="dragPointerdown" v-show="developContent"></div>
    </div>
  </teleport>
</template>

<style scoped>
.popup_box {
  position: fixed;
  overflow: auto;
  background-color: var(--el-bg-color-page);
  border-radius: 3px;
  z-index: 8887;
}

.transform_border {
  border-bottom: none;
}

.popup_header {
  word-break: keep-all;
  white-space: nowrap;
  overflow: hidden;
  cursor: all-scroll;
  text-overflow: ellipsis;
  height: 30px;
  width: 100%;
  background: var(--el-bg-color-page);
  font-size: 14px;
  text-align: center;
  user-select: none;
  color: var(--el-text-color-regular);
  line-height: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.popup_header>div>a {
  white-space: nowrap;
  cursor: pointer;
  font-size: 14px;
  color: var(--el-text-color-regular);
}

.popup_header>div>a:hover {
  color: var(--el-color-primary);
}

.popup_title {
  color: var(--el-text-color-regular);
  text-align: left;
  margin-left: 10px;
  width: calc(100% - 80px);
  white-space: nowrap;
  /* 确保文本不会换行 */
  overflow: hidden;
  /* 隐藏超出容器的文本 */
  text-overflow: ellipsis;
  /* 当文本超出容器时显示省略号 */
  display: flex;
}

.popup_title_span {
  margin-right: 8px;
  margin-top: 2px;
}

.popup_icon>span {
  height: 100%;
  display: inline-block;
  cursor: pointer;
  transition: 0.5s;
  margin-right: 10px;
}

.develop_icon {
  width: 21px;
}

.icon_transform {
  transform-origin: 50% 45%;
  transform: rotate(-180deg);
}

.popup_body {
  overflow-y: auto;
}

.popup_body ::-webkit-scrollbar {
  width: 3px;
  background-color: var(--el-fill-color-lighter);
  border-radius: 2px;
}

.popup_body ::-webkit-scrollbar-thumb {
  background-color: var(--el-text-color-regular);
  border-radius: 2px;
}

.popup_centent {
  width: 100%;
  height: 100%;
}

.popup_foot {
  border-top: 4px solid var(--el-border-color);
  width: 100%;
  height: 40px;
  margin-bottom: 5px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

.popup_foot>button {
  width: 80px;
  height: 32px;
  background: var(--el-fill-color-lighter);
  border-radius: 4px;
  border: 2px solid var(--el-border-color);
  cursor: pointer;
  color: var(--el-text-color-regular);
  margin-right: 10px;
}

.popup_foot>button:hover {
  border: 1px solid var(--el-color-primary);
}

.dragMouse {
  width: 0;
  height: 0;
  border: 6px solid var(--el-border-color);
  border-top: 6px solid transparent;
  border-left: 6px solid transparent;
  position: absolute;
  right: 0;
  bottom: 0;
  cursor: nwse-resize !important;
  user-select: none;
}
</style>
