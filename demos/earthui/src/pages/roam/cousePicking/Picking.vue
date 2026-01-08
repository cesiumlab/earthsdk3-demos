<template>
  <PopList :title="'鼠标拾取'">
    <div class="roam_pick">
      <label for="">{{ '选中颜色' }}</label>
      <div style="width: 190px">
        <ESColor :color="newColorRef" @ok="okHandler"></ESColor>
      </div>
    </div>
    <div class="roam_pick" style="margin-top: 10px">
      <label for="">{{ '隐藏属性' }}</label>
      <div>
        <ToggleSwitch :booleanValue="propertyIsShow" @update:booleanValue="inputHandler">
        </ToggleSwitch>
      </div>
    </div>
  </PopList>
</template>
<script setup lang="ts">
import { watch, ref } from 'vue'
import { ESColor } from 'earthsdk-ui'
import PopList from '../../../components/PopList.vue'
import ToggleSwitch from '../../../components/eSPropPanel/propertiesMenu/commons/base/InputCheckBox.vue'

const props = withDefaults(
  defineProps<{
    checkedColor: [number, number, number, number]
    propertyIsShow: boolean
  }>(),
  {}
)

const emits = defineEmits(['ok', 'changeProp'])
const okHandler = (rgba: { r: number; g: number; b: number; a: number }) => {
  // const rgbaArr = `rgba(${rgba.r},${rgba.g},${rgba.b},${rgba.a})`
  const rgbaArr = [rgba.r / 255, rgba.g / 255, rgba.b / 255, rgba.a]
  emits('ok', rgbaArr)
}
const inputHandler = (flag: boolean) => {
  emits('changeProp', flag)
}

const newColorRef = ref()
watch(
  () => props.checkedColor,
  (val) => {
    if (val) {
      newColorRef.value = {
        r: Number(val[0]) * 255,
        g: Number(val[1]) * 255,
        b: Number(val[2]) * 255,
        a: Number(val[3])
      }
    } else {
      newColorRef.value = {
        r: 255,
        g: 255,
        b: 255,
        a: 1
      }
    }
  },
  { immediate: true }
)
</script>
