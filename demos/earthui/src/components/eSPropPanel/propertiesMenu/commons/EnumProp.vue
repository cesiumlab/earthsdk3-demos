<script setup lang="ts">
import { vClickOutside } from 'earthsdk-ui';
import { nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue';
import { off, on, throttle } from './base/util';

const props = withDefaults(
  defineProps<{
    modelValue?: any
    enumStrsList: [aliasName: any, value: any, disabled?: any][]
    withUndefined: boolean
    defaultValue?: any
    readonly?: boolean
    isBan?: boolean
    isStyleEdit?: boolean
    scrollPosition?: any
    clickli?: () => {}
    changeVisibleclick?: () => void
  }>(),
  { readonly: false, isBan: false, isStyleEdit: false }
)

const emits = defineEmits(['update:modelValue', 'clickli'])
const modelValueRef = ref<any>('')
const modelValueName = ref<number | string | undefined>('')
watch(modelValueName, (val) => {
  emits('update:modelValue', val)
})
// watch(() => props.scrollPosition, (val) => {
//     visible.value = false;
// })
const changeSelect = (item: any) => {
  if (item[2]) {
    return
  }
  visible.value = false
  mouseFlag.value = false
  if (props.isStyleEdit) {
    emits('clickli', item)
  } else {
    modelValueRef.value = item[0]
    modelValueName.value = item[1]
    if (props.clickli) {
      props.clickli()
    }
    emits('clickli')
  }
}
const mouseFlag = ref(false)
watch(
  () => props.modelValue,
  (val) => {
    const item = props.enumStrsList.find((item) => item[1] === val)
    if (item) {
      modelValueRef.value = item[0]
      modelValueName.value = item[1]
    } else {
      modelValueRef.value = val
      modelValueName.value = val
    }
  },
  { immediate: true }
)

const clickOutside = () => {
  // console.log('clickOutside')
  if (!visible.value) return
  if (!containerRef.value) return
  closeTool()
}
const visible = ref(false)
const slotRef = ref<HTMLDivElement>()
const containerRef = ref<HTMLDivElement>()
const changeVisible = () => {
  if (visible.value) {
    closeTool()
  } else {
    setTimeout(() => {
      openTooltip()
      if (props.changeVisibleclick) props.changeVisibleclick()
    }, 0)
  }
}
const handleResize = () => {
  if (!slotRef.value || !containerRef.value) return

  const targetRect = slotRef.value.getBoundingClientRect()
  const popupRect = containerRef.value.getBoundingClientRect()

  const viewportWidth = window.innerWidth
  const viewportHeight = window.innerHeight

  let top = targetRect.bottom
  let left = targetRect.left
  let width = targetRect.width

  // 检查是否超出下边界
  if (top + popupRect.height > viewportHeight) {
    top = targetRect.top - popupRect.height
  }

  // 检查是否超出右边界
  if (left + popupRect.width > viewportWidth) {
    left = targetRect.right - popupRect.width
  }

  // 检查是否超出左边界
  if (left < 0) {
    left = targetRect.left
  }

  // 检查是否超出上边界
  if (top < 0) {
    top = targetRect.bottom
  }

  // 设置弹出框的位置
  containerRef.value.style.top = `${top}px`
  containerRef.value.style.left = `${left}px`
  containerRef.value.style.width = `${width}px`
  containerRef.value.style.opacity = '1'

  // console.log(11111111111111111);

  // const domRect = slotRef.value?.getBoundingClientRect();
  // if (!domRect || !containerRef.value) return;
  // const { left, width, bottom } = domRect;
  // containerRef.value.setAttribute(
  //     "style",
  //     `top:${bottom + 5}px;left:${left + width / 2}px;transform: translateX(-50%);opacity:1;width:${width}px;`
  // );
}
/** 打开提示框 */
const openTooltip = () => {
  visible.value = true
  nextTick(() => handleResize())
}

/** 关闭提示框 */
const closeTool = () => {
  nextTick(() => (visible.value = false))
}
onMounted(() => {
  nextTick(() => {
    on(window, 'resize', throttle(handleResize, 100))
    on(window, 'scroll', handleResize)
  })
  onBeforeUnmount(() => {
    off(window, 'resize', handleResize)
    off(window, 'scroll', handleResize)
  })
})
</script>

<template>
  <div class="select">
    <div class="enum_prop" ref="slotRef">
      <div class="enum_prop_model" :class="{ enum_prop_model_ban: isBan }" @click.stop.prevent="changeVisible"
        :title="modelValueRef">
        {{ modelValueRef }}
        <span class="images_xiaosanjiao" :class="visible ? 'images_xiaosanjiao_transform' : ''"></span>
      </div>
    </div>
  </div>
  <teleport to="body">
    <div ref="containerRef" v-if="visible" class="es-option-box" v-click-outside="clickOutside">
      <div v-for="item in enumStrsList" :title="item[0]"
        :class="{ actived: item[0] === modelValueRef, disaled: item[2] }" @click="changeSelect(item)">
        {{ item[0] }}
      </div>
    </div>
  </teleport>
</template>

<style scoped>
.select {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  line-height: 26px;
  color: rgba(230, 230, 230, 1);
  position: relative;
}

.enum_prop {
  flex: 1;
  position: relative;
}

.select>.enum_prop>.enum_prop_model {
  height: 26px;
  width: 100%;
  background: rgba(28, 28, 29, 0.6);
  border-radius: 4px;
  border: 1px solid #3b3c40;
  color: rgba(230, 230, 230, 1);
  padding: 0 11px;
  box-sizing: border-box;
  cursor: pointer;
  overflow: hidden;
  overflow-wrap: anywhere;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.enum_prop_model_ban {
  background: rgba(48, 48, 48, 0.6) !important;
}

.select>.enum_prop>ul {
  position: absolute;
  z-index: 20;
  max-height: 130px;
  left: 0;
  top: 28px;
  overflow-y: auto;
  background: #292a2e;
  box-shadow: 0px 2px 6px 0px rgba(26, 26, 28, 0.68);
  border-radius: 4px;
  overflow-x: hidden;
  width: 100%;
  margin: 0;
  box-sizing: border-box;
}

.select>.enum_prop>ul::-webkit-scrollbar {
  width: 3px;
  background-color: rgba(41, 42, 46, 1);
  border-radius: 2px;
}

.select>.enum_prop>ul::-webkit-scrollbar-thumb {
  background-color: rgba(183, 183, 183, 1);
  border-radius: 2px;
}

.select>.enum_prop>ul>li {
  list-style: none;
  height: 20px;
  font-size: 14px;
  line-height: 20px;
  cursor: pointer;
  text-align: left;
  padding-left: 10px;
  margin-left: -40px;
  white-space: nowrap;
  color: rgba(230, 230, 230, 1);
}

.select>.enum_prop>ul>li:hover {
  background: #37393e;
}

.actived {
  background: #455767 !important;
}

.disaled {
  background: rgba(48, 48, 48, 0.6) !important;
  cursor: not-allowed !important;
  /* 可选：改变鼠标指针样式 */
}

.checkbox1 {
  width: 20px;
  height: 20px;
  box-sizing: border-box;
  margin-left: 10px;
  margin-top: 2px;
}

.checkbox {
  width: 20px;
  height: 20px;
  cursor: pointer;
  border: 1px solid rgba(230, 230, 230, 0.4);
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
}

.es-option-box {
  position: fixed;
  z-index: 20;
  max-height: 130px;

  overflow-y: auto;
  background: #292a2e;
  box-shadow: 0px 2px 6px 0px rgba(26, 26, 28, 0.68);
  border-radius: 4px;
  overflow-x: hidden;
  width: 100%;
  margin: 0;
  box-sizing: border-box;
  z-index: 9999;
}

.es-option-box::-webkit-scrollbar {
  width: 3px;
  background-color: rgba(41, 42, 46, 1);
  border-radius: 2px;
}

.es-option-box::-webkit-scrollbar-thumb {
  background-color: rgba(183, 183, 183, 1);
  border-radius: 2px;
}

.es-option-box>div {
  list-style: none;
  height: 20px;
  font-size: 14px;
  line-height: 20px;
  cursor: pointer;
  text-align: left;
  white-space: nowrap;
  padding: 0 10px;
  color: rgba(230, 230, 230, 1);
}

.es-option-box>div:hover {
  background: #37393e;
}
</style>
