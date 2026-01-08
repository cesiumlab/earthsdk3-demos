<template>
  <PopList :title="'中心旋转'">
    <LabelInput
      v-model="position[0]"
      :inputType="'number'"
      :label="'经度'"
      :max="180"
      :min="-180"
    ></LabelInput>
    <LabelInput
      v-model="position[1]"
      :inputType="'number'"
      :label="'纬度'"
      :max="90"
      :min="-90"
    ></LabelInput>
    <LabelInput v-model="position[2]" :inputType="'number'" :label="'高度'"></LabelInput>
    <LabelInput v-model="pitch" :inputType="'number'" :label="'俯仰角'" :unit="'°'"></LabelInput>
    <LabelInput v-model="heading" :inputType="'number'" :label="'偏航角'" :unit="'°'"></LabelInput>
    <LabelInput
      v-model="orbitPeriod"
      :inputType="'number'"
      :label="'绕行周期'"
      :unit="'s'"
      :noZero="true"
    ></LabelInput>
    <LabelInput
      v-model="distance"
      :inputType="'number'"
      :label="'相机距离'"
      :unit="'m'"
      :min="0"
    ></LabelInput>
  </PopList>
</template>

<script setup lang="ts">
import { inject, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import PopList from '../../../components/PopList.vue'
import { XbsjEarthUi } from '../../../scripts/xbsjEarthUi'
import LabelInput from '../../../components/LabelInput.vue'
import { ElMessage } from 'element-plus'
const xbsjEarthUi = inject('xbsjEarthUi') as XbsjEarthUi
const emits = defineEmits(['close', 'ok'])
const position = ref<[number, number, number]>([0, 0, 0])
const pitch = ref<number>(-30) //俯仰角
const heading = ref<number>(0) //偏航角
const orbitPeriod = ref<number>(60) //绕行周期
const distance = ref<number>(50000) //相机距离

const ueActorResult = () => {
  const viewer = xbsjEarthUi.activeViewer
  if (!viewer) return
  let disposeUe = viewer.clickEvent.donce(async (e) => {
    // ue中没有pointerDown，但是ue的click相当于pointerDown
    if (!e.screenPosition) return
    const result = await viewer.pickPosition(e.screenPosition)
    if (!result) return
    const pos = result.map((num: number) => Number(num.toFixed(7))) as [number, number, number]
    position.value = pos
  })
  return disposeUe
}
//调用点击返回拾取信息函数
const dispose = ueActorResult()
const destroy = () => {
  //销毁
  if (dispose) dispose()
}
watch(
  [position, orbitPeriod, pitch, heading, distance],
  () => {
    const viewer = xbsjEarthUi.activeViewer
    if (!viewer) return
    viewer.changeToRotatePoint(
      position.value,
      distance.value,
      orbitPeriod.value,
      heading.value,
      pitch.value
    )
  },
  { deep: true }
)
onMounted(() => {
  const viewer = xbsjEarthUi.activeViewer
  if (!viewer) return
  viewer.changeToMap()
  ElMessage.warning('请点击选择合适位置')
})
onBeforeUnmount(() => destroy())
</script>
