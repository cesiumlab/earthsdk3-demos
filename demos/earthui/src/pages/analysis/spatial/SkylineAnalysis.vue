<template>
  <PopList :title="'天际线分析'" :showButton="false" class="skyline">
    <p class="title">天际线</p>
    <div class="box">
      <label for="">半径：</label>
      <input type="number" v-model="radius" min="0" placeholder="请输入天际线半径" @input="radiusChange" />
    </div>
    <div class="box">
      <label for="">颜色：</label>
      <ESColor :color="strokeColorRef" @ok="confirmStrokeColor"></ESColor>
    </div>
    <div class="box">
      <label for="">显隐：</label>
      <ToggleSwitch :booleanValue="stroked" @update:booleanValue="updateStroked"> </ToggleSwitch>
    </div>

    <p class="title">闭合体</p>
    <div class="box">
      <label for="">颜色：</label>
      <ESColor :color="fillColorRef" @ok="confirmFillColor"></ESColor>
    </div>
    <div class="box">
      <label for="">显隐：</label>
      <ToggleSwitch :booleanValue="filled" @update:booleanValue="updateFilled"> </ToggleSwitch>
    </div>
    <p class="title">功能键</p>
    <div class="btn">
      <button @click="start">重绘天际线</button>
      <button @click="depthsShow = !depthsShow">二维天际线</button>
      <button @click="clear">清除</button>
    </div>
  </PopList>
  <SkylineDepths :depths="windowPositions" v-if="depthsShow" @changeShow="depthsShow = false" />
</template>
<script setup lang="ts">
import { ESSkylineAnalysis } from 'earthsdk3'
import { inject, onBeforeUnmount, onMounted, nextTick, computed, ref } from 'vue'
import { ESColor } from 'earthsdk-ui'
import { XbsjEarthUi } from '../../../scripts/xbsjEarthUi'
import { createVueDisposer, toVR } from 'earthsdk-ui'
import PopList from '../../../components/PopList.vue'
import ToggleSwitch from '@/components/base/InputCheckBox.vue'
import SkylineDepths from './SkylineDepths.vue'
import { ElMessage } from 'element-plus'
type ColorType = [number, number, number, number]
// 分发事件
const emits = defineEmits(['close'])
// 销毁函数
const d = createVueDisposer(onBeforeUnmount)
// 对象管理器
const xbsjEarthUi = inject('xbsjEarthUi') as XbsjEarthUi
// 天际线分析对象
let skylineAnalysis = xbsjEarthUi.createSceneObject(ESSkylineAnalysis) as any
skylineAnalysis.radius = 1000
// 销毁函数
let dispose: any
// 深度值
let windowPositions = ref([])
skylineAnalysis.windowPositionsChanged.don((value: any) => {
  if (value) {
    windowPositions.value = JSON.parse(JSON.stringify(value))
  }
})
const depthsShow = ref(false)

/** <-----------------------------------天际线边界变量--------------------------------------------------------->*/
// 半径
let radius = toVR<number>(d, [skylineAnalysis, 'radius'])
// 天际线显隐
let stroked = toVR<boolean>(d, [skylineAnalysis, 'stroked'])
// 天际线颜色
let strokeColor = toVR<[number, number, number, number]>(d, [skylineAnalysis, 'strokeColor'])
// 天际线颜色选择器
const strokeColorRef = computed(() => {
  if (strokeColor.value === undefined) {
    return {
      r: 255,
      g: 255,
      b: 255,
      a: 1
    }
  } else {
    return {
      r: strokeColor.value[0] * 255,
      g: strokeColor.value[1] * 255,
      b: strokeColor.value[2] * 255,
      a: strokeColor.value[3]
    }
  }
})

/** <-----------------------------------闭合体变量--------------------------------------------------------->*/
// 闭合体显隐
let filled = toVR<boolean>(d, [skylineAnalysis, 'filled'])
// 闭合体颜色
let fillColor = toVR<[number, number, number, number]>(d, [skylineAnalysis, 'fillColor'])
// 闭合体颜色选择器
const fillColorRef = computed(() => {
  if (fillColor.value === undefined) {
    return {
      r: 255,
      g: 255,
      b: 255,
      a: 1
    }
  } else {
    return {
      r: fillColor.value[0] * 255,
      g: fillColor.value[1] * 255,
      b: fillColor.value[2] * 255,
      a: fillColor.value[3]
    }
  }
})

/**
 * 更新天际线颜色
 * @param rgba
 */
const confirmStrokeColor = (rgba: { r: number; g: number; b: number; a: number }) => {
  const rgbaArr: ColorType = [rgba.r / 255, rgba.g / 255, rgba.b / 255, rgba.a]
  strokeColor.value = rgbaArr
}

/**
 * 更新闭合体颜色
 * @param rgba
 */
const confirmFillColor = (rgba: { r: number; g: number; b: number; a: number }) => {
  const rgbaArr: ColorType = [rgba.r / 255, rgba.g / 255, rgba.b / 255, rgba.a]
  fillColor.value = rgbaArr
}

/**
 * 更新闭合体显隐
 * @param value
 */
const updateFilled = (value: boolean) => {
  filled.value = value
}

/**
 * 更新天际线显隐
 * @param value
 */
const updateStroked = (value: boolean) => {
  stroked.value = value
}
/**
 * 开始分析
 */
const start = () => {
  skylineAnalysis.start()
}
/**
 * 清空分析
 */
const clear = () => {
  skylineAnalysis.clear()
}

/**
 * 限制半径不能为负数和空
 * @param e
 */
const radiusChange = (e: any) => {
  let temp = e.target.value
  if (temp < 0) {
    ElMessage.warning('天际线半径不能为负数')
    radius.value = 1000
  }
  if (!temp) {
    ElMessage.warning('天际线半径不能为空')
    radius.value = 1000
  }
}

onMounted(() => {
  nextTick(() => {
    const parent = document.querySelector('.roam')
    const child = document.querySelector('.roam .skyline')
    if (parent && child instanceof HTMLElement) {
      parent.scrollTo({
        top: child.offsetTop,
        behavior: 'smooth'
      })
    }
    ElMessage.success('已开启天际线，可调整视角（平视），重新绘制天际线')
    start()
  })
})
onBeforeUnmount(() => {
  if (skylineAnalysis) {
    xbsjEarthUi.destroySceneObject(skylineAnalysis)
    skylineAnalysis = undefined
  }
  if (dispose) {
    dispose()
    dispose = undefined
  }
})
</script>

<style scoped>
.box {
  display: grid;
  font-size: 12px;
  grid-template-columns: 70px 160px 60px;
  align-items: center;
  height: 30px;
  padding-left: 12px;
}

.title {
  margin: 0px;
  padding: 0px;
  box-sizing: border-box;
  height: 22px;
  line-height: 25px;
  font-size: 13px;
  border-left: 5px solid #0276fb;
  padding-left: 5px;
  margin-top: 5px;
  margin-bottom: 5px;
}

input {
  background: rgba(28, 28, 29, 0.6);
  border-radius: 4px;
  border: 1px solid #3b3c40;
  cursor: pointer;
  color: rgba(230, 230, 230, 1);
  box-sizing: border-box;
  margin-right: 5px;
  height: 27px;
  text-indent: 10px;
  width: 125px;
}

button {
  width: 60px;
  height: 27px;
  background: rgba(28, 28, 29, 0.6);
  border-radius: 4px;
  border: 1px solid rgb(36, 85, 200);
  cursor: pointer;
  color: rgba(230, 230, 230, 1);
  box-sizing: border-box;
  margin-right: 5px;
  font-size: 12px;
}

button:hover {
  border: 2px solid rgba(44, 104, 247, 1);
}

.btn {
  margin-top: 5px;
}

.btn button {
  width: 100px;
  margin: 5px 10px;
}
</style>
