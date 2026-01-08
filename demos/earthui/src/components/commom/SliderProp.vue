<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
interface Props {
  modelValue: number
  width?: string // 滑动输入条的宽度，单位px
  min?: number // 滑动输入条最小值
  max?: number // 滑动输入条最大值
  disabled?: boolean // 是否禁用
  step?: number // 步长，取值必须大于0，并且可被 (max - min) 整除
  tofixedNumber?: number
  valueIsShow?: boolean
}
const props = withDefaults(defineProps<Props>(), {
  width: '100%',
  min: 0,
  max: 100,
  disabled: false,
  step: 1,
  modelValue: 0,
  tofixedNumber: 1,
  valueIsShow: true
})
const changeczmLuminanceAtZenith = computed(() => {
  return {
    background: `-webkit-linear-gradient( left,aqua ${(props.modelValue / props.max) * 100}%, rgba(0, 0, 0, 0.2) ${(props.modelValue / props.max) * 100}%,rgba(0, 0, 0, 0.2) 100%)`,
    cursor: 'pointer',
    width: '100%'
  }
})
const emits = defineEmits(['change'])
const inputHandler = (e: any) => {
  emits('change', Number(e.target.value))
}
</script>
<template>
  <div :style="`width: ${width};display:flex;`">
    <input
      class="progress"
      type="range"
      v-model="modelValue"
      :max="max"
      :min="min"
      :step="step"
      :disabled="disabled"
      :style="changeczmLuminanceAtZenith"
      @input="inputHandler($event)"
    />
    <label for="" v-show="valueIsShow" style="width: 30px; text-align: center; line-height: 20px">{{
      modelValue
    }}</label>
  </div>
</template>
<style scoped>
.progress {
  flex: 1;
  margin-top: 8px;
}

input[type='range'] {
  /*input外壳样式*/
  width: 120px;
  -webkit-appearance: none;
  border-radius: 10px;
  height: 4px;
  z-index: 10;
}

input[type='range']::-webkit-slider-runnable-track {
  /*轨道*/
  height: 4px;
  /* background: rgba(0, 0, 0, 0.2); */
  border-radius: 10px;
}

input[type='range']::-webkit-slider-thumb {
  /*滑块*/
  -webkit-appearance: none;
  height: 12px;
  width: 12px;
  margin-top: -4px;
  background: #ffffff !important;
  border-radius: 50%;
  cursor: pointer;
}
</style>
