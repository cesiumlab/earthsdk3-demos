<script setup lang="ts">
import { inject, onMounted, ref, watch } from 'vue'
import Button from '../../components/Button.vue'
import LabelInput from '../../components/LabelInput.vue'
import PopList from '../../components/PopList.vue'
import RightList from '../../components/RightList.vue'
import { XbsjEarthUi } from '../../scripts/xbsjEarthUi'
import { ESColor } from 'earthsdk-ui'

const xbsjEarthUi = inject('xbsjEarthUi') as XbsjEarthUi

// 控制项类型定义
type ShaderType = 'none' | 'elevationRamp' | 'slope' | 'aspect'

interface ControlItem {
  type: ShaderType | 'elevationContour'
  zh: string
  icon: string
  leftButton: boolean
}

const controlItems: ControlItem[] = [
  { type: 'elevationRamp', zh: '高程', icon: 'gaocheng', leftButton: true },
  { type: 'slope', zh: '坡度', icon: 'podu', leftButton: false },
  { type: 'aspect', zh: '坡向', icon: 'poxiang', leftButton: true },
  {
    type: 'elevationContour',
    zh: '等高线',
    icon: 'denggaoxian',
    leftButton: false
  }
]

// 响应式状态
const type = ref<ShaderType>('none')
const elevationContour = ref(false)

// 等高线参数
const contourColor = ref<[number, number, number, number]>([1, 0, 0, 1])
const contourColorObj = ref({ r: 255, g: 0, b: 0, a: 1 })
const spacing = ref(150)
const width = ref(2)

// 高程着色参数
const minHeight = ref(-444)
const maxHeight = ref(8777)
const rampColors = ref<[number, number, number, number][]>([
  [1, 0, 0, 1],
  [0, 1, 0, 1],
  [0, 0, 1, 1],
  [1, 1, 0, 1],
  [1, 0, 1, 1],
  [1, 1, 1, 1],
  [0, 1, 1, 1]
])
const rampColorObjs = ref([
  { r: 255, g: 0, b: 0, a: 1 },
  { r: 0, g: 255, b: 0, a: 1 },
  { r: 0, g: 0, b: 255, a: 1 },
  { r: 255, g: 255, b: 0, a: 1 },
  { r: 255, g: 0, b: 255, a: 1 },
  { r: 255, g: 255, b: 255, a: 1 },
  { r: 0, g: 255, b: 255, a: 1 }
])

// 控制按钮激活状态
const activedType = (item: ControlItem) => {
  if (item.type === 'elevationContour') return elevationContour.value
  return type.value === item.type
}

// 控制按钮点击逻辑
function handleControlClick(item: ControlItem) {
  if (item.type === 'elevationContour') {
    elevationContour.value = !elevationContour.value
  } else {
    type.value = type.value === item.type ? 'none' : (item.type as ShaderType)
  }
  updateTerrainShader()
}

// 等高线颜色选择回调
function okContourColor(rgba: { r: number; g: number; b: number; a: number }) {
  contourColor.value = [rgba.r / 255, rgba.g / 255, rgba.b / 255, rgba.a]
}

// 高程着色颜色选择回调
function okRampColor(rgba: { r: number; g: number; b: number; a: number }, index: number) {
  rampColors.value[index] = [rgba.r / 255, rgba.g / 255, rgba.b / 255, rgba.a]
}

// 统一更新地形着色器
function updateTerrainShader() {
  if (!xbsjEarthUi.activeViewer) return
  xbsjEarthUi.activeViewer.terrainShader = {
    slope: { show: type.value === 'slope' },
    aspect: { show: type.value === 'aspect' },
    elevationRamp: {
      show: type.value === 'elevationRamp',
      minHeight: minHeight.value,
      maxHeight: maxHeight.value,
      color: rampColors.value
    },
    elevationContour: {
      show: elevationContour.value,
      color: contourColor.value,
      spacing: spacing.value,
      width: width.value
    }
  }
}

// 监听参数变化自动更新
watch(
  [type, elevationContour, spacing, width, minHeight, maxHeight, rampColors, contourColor],
  updateTerrainShader,
  { deep: true }
)

// 监听等高线颜色变化，转换为 ESColor 组件需要的格式
watch(
  contourColor,
  (val) => {
    if (val) {
      contourColorObj.value = {
        r: Math.round(val[0] * 255),
        g: Math.round(val[1] * 255),
        b: Math.round(val[2] * 255),
        a: val[3]
      }
    }
  },
  { immediate: true }
)

// 监听高程着色颜色变化，转换为 ESColor 组件需要的格式
watch(
  rampColors,
  (val) => {
    if (val) {
      rampColorObjs.value = val.map((item) => ({
        r: Math.round(item[0] * 255),
        g: Math.round(item[1] * 255),
        b: Math.round(item[2] * 255),
        a: item[3]
      }))
    } else {
      rampColorObjs.value = [
        { r: 255, g: 0, b: 0, a: 1 },
        { r: 0, g: 255, b: 0, a: 1 },
        { r: 0, g: 0, b: 255, a: 1 },
        { r: 255, g: 255, b: 0, a: 1 },
        { r: 255, g: 0, b: 255, a: 1 },
        { r: 255, g: 255, b: 255, a: 1 },
        { r: 0, g: 255, b: 255, a: 1 }
      ]
    }
  },
  { immediate: true, deep: true }
)

// 初始化
onMounted(() => {
  const viewer = xbsjEarthUi.activeViewer
  if (!viewer) return
  const terrainShader = viewer.terrainShader
  type.value = terrainShader.slope.show
    ? 'slope'
    : terrainShader.aspect.show
      ? 'aspect'
      : terrainShader.elevationRamp.show
        ? 'elevationRamp'
        : 'none'
  elevationContour.value = terrainShader.elevationContour.show
  contourColor.value = terrainShader.elevationContour.color
  spacing.value = terrainShader.elevationContour.spacing
  width.value = terrainShader.elevationContour.width
  minHeight.value = terrainShader.elevationRamp.minHeight
  maxHeight.value = terrainShader.elevationRamp.maxHeight
  if (
    Array.isArray(terrainShader.elevationRamp.color) &&
    terrainShader.elevationRamp.color.length > 0
  ) {
    rampColors.value = terrainShader.elevationRamp.color
      .filter((c: any) => Array.isArray(c) && c.length === 4)
      .map((c: [number, number, number, number]) => [...c])
  } else {
    rampColors.value = [
      [1, 0, 0, 1],
      [0, 1, 0, 1],
      [0, 0, 1, 1],
      [1, 1, 0, 1],
      [1, 0, 1, 1],
      [1, 1, 1, 1],
      [0, 1, 1, 1]
    ]
  }
})
</script>

<template>
  <RightList title="着色">
    <Button
      v-for="item in controlItems"
      :key="item.type"
      :name="item.icon"
      :content="item.zh"
      :click="() => handleControlClick(item)"
      :left-button="item.leftButton"
      :actived="activedType(item)"
    />

    <PopList title="等高线" v-if="elevationContour">
      <LabelInput v-model="spacing" inputType="number" label="等高距" unit="m" :min="0" />
      <LabelInput v-model="width" inputType="number" label="线宽" unit="m" :min="0" />
      <div class="roam_pick" style="margin-top: 10px">
        <label>颜色</label>
        <div style="width: 190px">
          <ESColor :color="contourColorObj" @ok="okContourColor" />
        </div>
      </div>
    </PopList>

    <PopList title="高程" v-if="type == 'elevationRamp'">
      <LabelInput v-model="minHeight" inputType="number" label="最小高度" unit="m" />
      <LabelInput v-model="maxHeight" inputType="number" label="最大高度" unit="m" />
      <div
        class="roam_pick"
        style="margin-top: 10px"
        v-for="(item, index) in rampColorObjs"
        :key="index"
      >
        <label>颜色{{ index + 1 }}</label>
        <div style="width: 190px">
          <ESColor :color="item" @ok="(rgba) => okRampColor(rgba, index)" />
        </div>
      </div>
    </PopList>
  </RightList>
</template>
