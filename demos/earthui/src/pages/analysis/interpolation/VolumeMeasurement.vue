<template>
  <!-- 选择框 -->
  <PopList
    :title="'体积测量'"
    :showButton="true"
    @close="restart"
    @ok="start"
    :leftButton="'重新绘制'"
    :rightButton="'开始分析'"
    :showLeftButton="true"
  >
    <LabelInput
      v-model="planeHight"
      :inputType="'number'"
      :label="'基准面高程'"
      :unit="'m'"
    ></LabelInput>
    <LabelInput
      v-model="sampling"
      :inputType="'number'"
      :label="'采样间距'"
      :unit="'m'"
      :noZero="true"
      :min="0"
    >
    </LabelInput>
    <LabelInput
      v-model="areaRef"
      :inputType="'number'"
      :label="'总面积'"
      :unit="'㎡'"
      :readonly="true"
    ></LabelInput>
    <LabelInput
      v-model="excavationAreaRef"
      :inputType="'number'"
      :label="'挖方'"
      :unit="'m³'"
      :readonly="true"
    >
    </LabelInput>
    <LabelInput
      v-model="fillAreaRef"
      :inputType="'number'"
      :label="'填方'"
      :unit="'m³'"
      :readonly="true"
    >
    </LabelInput>
    <LabelInput
      v-model="CutAndFillAreaRef"
      :inputType="'number'"
      :label="'挖填方'"
      :unit="'m³'"
      :readonly="true"
    >
    </LabelInput>
    <LabelInput
      v-model="schedule"
      :inputType="'number'"
      :label="'计算进度'"
      :unit="'%'"
      :readonly="true"
    ></LabelInput>
  </PopList>
</template>
<script setup lang="ts">
import { ESVolumeMeasurement, nextAnimateFrame } from 'earthsdk3'
import { onBeforeUnmount, onMounted, onUnmounted, inject, computed } from 'vue'
import { createVueDisposer, toVR } from 'earthsdk-ui'
import PopList from '../../../components/PopList.vue'
import { XbsjEarthUi } from '../../../scripts/xbsjEarthUi'
import LabelInput from '../../../components/LabelInput.vue'
import { ElMessage } from 'element-plus'
const xbsjEarthUi = inject('xbsjEarthUi') as XbsjEarthUi
const d = createVueDisposer(onBeforeUnmount)
let volumeSceneObject = xbsjEarthUi.createSceneObject('ESVolumeMeasurement') as any

let dispose: any

// 基准面高程
let planeHight = toVR<number>(d, [volumeSceneObject, 'planeHeight'])
// 采样间距
let sampling = toVR<number>(d, [volumeSceneObject, 'gridWidth'])
// 总面积
let area = toVR<number>(d, [volumeSceneObject, 'area'])
const areaRef = computed(() => {
  return area.value.toFixed(2)
})
// 挖方
let excavationArea = toVR<number>(d, [volumeSceneObject, 'cutVolume'])
const excavationAreaRef = computed(() => {
  return excavationArea.value.toFixed(2)
})
const emits = defineEmits(['close', 'ok'])
// 填方
let fillArea = toVR<number>(d, [volumeSceneObject, 'fillVolume'])
const fillAreaRef = computed(() => {
  return fillArea.value.toFixed(2)
})
// 挖填方
let CutAndFillArea = toVR<number>(d, [volumeSceneObject, 'cutAndFillVolume'])
const CutAndFillAreaRef = computed(() => {
  return CutAndFillArea.value.toFixed(2)
})
// 计算进度
let schedule = toVR<number>(d, [volumeSceneObject, 'progress'])
const restart = () => {
  volumeSceneObject.points = []
  nextAnimateFrame(() => {
    volumeSceneObject.clear()
    schedule.value = 0
    planeHight.value = 0
    sampling.value = 0
    volumeSceneObject.editing = true
    ElMessage.warning('结束编辑之后请点击开始分析')
  })
}
const start = () => {
  if (volumeSceneObject && volumeSceneObject.editing) {
    ElMessage.warning('请双击结束编辑之后进行分析')
    return
  }
  // sampling.value = Number((Math.sqrt(volumeSceneObject.area / xbsjEarthUi.Interpolation)).toFixed(2))
  volumeSceneObject.start()
}
onMounted(() => {
  if (volumeSceneObject) {
    volumeSceneObject.editing = true
    ElMessage.warning('结束编辑之后请点击开始分析')
  }
  dispose = volumeSceneObject.editingChanged.disposableOn(() => {
    if (volumeSceneObject.editing === false) {
      if (volumeSceneObject && volumeSceneObject.points && volumeSceneObject.points.length > 0) {
        if (volumeSceneObject.points[0][2]) {
          planeHight.value = volumeSceneObject.points[0][2]
          sampling.value = Number(
            Math.sqrt(volumeSceneObject.area / xbsjEarthUi.Interpolation).toFixed(2)
          )
        } else {
          planeHight.value = 0
        }
      }
    }
  })
})
onBeforeUnmount(() => {
  if (volumeSceneObject) {
    volumeSceneObject.editing = false
    xbsjEarthUi.destroySceneObject(volumeSceneObject)
    volumeSceneObject = undefined
  }
  if (dispose) {
    dispose()
    dispose = undefined
  }
})
</script>
