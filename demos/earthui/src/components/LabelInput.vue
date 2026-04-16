<script setup lang="ts">
import { computed, watch, ref } from 'vue'
interface Props {
  label?: string
  unit?: string
  modelValue?: string | number
  activeMode?: string | number
  activeModeType?: string
  checkbox?: boolean
  list?: any
  listContent?: string
  placeholder?: string
  readonly?: boolean
  disabled?: boolean
  inputType?: string
  min?: number
  max?: number
  noZero?: boolean
  checkboxFun?: () => void
  liClickFun?: (item: any, index?: number) => void
}
const props = withDefaults(defineProps<Props>(), {
  label: '内容',
  modelValue: '',
  checkbox: false,
  list: [],
  activeModeType: 'id',
  listContent: 'name',
  placeholder: '请输入内容',
  readonly: false,
  disabled: false,
  inputType: 'text',
  liClickFun: (item: any, index?: number) => {
    // console.log(item, index);
  },
  checkboxFun: () => { }
})
const emit = defineEmits([
  'update:modelValue',
  'input',
  'focus',
  'blur',
  'keypress',
  'keyup',
  'keydownenter'
])
const ulIsShow = ref(false)
const onInput = (e: Event) => {
  let targetValue
  targetValue = (e.target as HTMLInputElement).value as any
  if (targetValue === '-') {
    targetValue = 0
  }
  if (typeof props.modelValue === 'number') {
    targetValue = Number(targetValue)
  }
  if (props.inputType === 'number') {
    if (props.min !== undefined) {
      if (targetValue < props.min) {
        if (props.min === 0) {
          targetValue = 1
        } else {
          targetValue = props.min
        }
      }
    }
    if (props.max !== undefined) {
      if (targetValue > props.max) {
        targetValue = props.max
      }
    }
  }
  if (props.noZero) {
    if (targetValue === 0) {
      targetValue = 1
    }
  }
  emit('input', targetValue)
  emit('update:modelValue', targetValue)
}
const liClick = (item: any, index: any) => {
  props.liClickFun(item, index)
  ulIsShow.value = false
}
const name = 'input'
const inpClass = computed(() => {
  const status = getStatus()
  return [name, `${name}_${status}`]
})
function getStatus() {
  return (props.disabled && 'disabled') || (props.readonly && 'readonly') || 'normal'
}
const checkBoxChange = () => {
  props.checkboxFun()
  ulIsShow.value = !ulIsShow.value
}
const onFocus = () => emit('focus')
const onBlur = () => emit('blur')
const onKeypress = () => emit('keypress')
const onKeyup = () => emit('keyup')
const onKeydownEnter = (e?: Event) => {
  if (e) {
    //@ts-ignore
    e.target.blur()
  }
  emit('keydownenter')
}
const a = ref()
watch(
  () => props.modelValue,
  (val: any) => {
    a.value = val
  },
  { immediate: true }
)
watch(a, () => {
  if (props.noZero) {
    if (a.value === 0) {
      a.value = 1
    }
  }
  if (props.inputType === 'number') {
    if (props.min !== undefined) {
      if (a.value < props.min) {
        if (props.min === 0) {
          a.value = 1
        } else {
          a.value = props.min
        }
      }
    }
    if (props.max !== undefined) {
      if (a.value > props.max) {
        a.value = props.max
      }
    }
  }
})
</script>
<template>
  <div class="label_input">
    <label class="label" for="" :title="label">{{ label }}</label>
    <div :class="inpClass">
      <input :type="inputType" :min="min" :max="max" :placeholder="placeholder" v-model="a" @input="onInput"
        :disabled="disabled" @focus="onFocus" @blur="onBlur" @keypress="onKeypress" @keyup="onKeyup"
        @keydown.enter="onKeydownEnter($event)" />
    </div>
    <div class="unit" v-if="unit">{{ unit }}</div>
    <div class="checkbox" :class="{ checkbox_active: ulIsShow, input_disabled: readonly }" v-if="checkbox"
      @click="checkBoxChange">
      <es-icon :name="'liebiao'" :color="ulIsShow ? 'var(--el-color-primary)' : 'var(--el-text-color-regular)'"
        :size="15" />
    </div>
    <ul class="ul" v-if="ulIsShow">
      <li v-for="(item, index) in list" :class="{ l_active: item[activeModeType] === activeMode }"
        @click="liClick(item, index)">
        {{ item[listContent] }}
      </li>
    </ul>
  </div>
</template>

<style scoped>
.label_input {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: var(--el-text-color-regular);
  font-size: 12px;
  position: relative;
  margin-top: 10px;
}

.label_input>.label {
  display: inline-block;
  width: 60px;
  height: 26px;
  font-weight: 400;
  text-align: left;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  line-height: 26px;
  color: var(--el-text-color-regular);
  font-size: 12px;
}

.label_input>.input {
  flex: 1;
  box-sizing: border-box;
  background: var(--el-fill-color-lighter);
  color: var(--el-text-color-regular);
}

.input_readonly,
.input_disabled {
  cursor: not-allowed;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  pointer-events: none;
  background: var(--el-fill-color-lighter) !important;
  color: var(--el-text-color-regular);
  border-radius: 5px;
}

.label_input>.input>input {
  width: 100%;
  display: inline-block;
  height: 26px;
  border-radius: 4px;
  margin-right: 0;
  color: var(--el-text-color-regular);
  padding: 0 11px;
  box-sizing: border-box;
  background: none;
  border: 1px solid var(--el-border-color);
}

.label_input>.input>input:hover {
  border: 1px solid var(--el-color-primary);
}

.label_input>.input>input:focus {
  border: 1px solid var(--el-color-primary);
}

.label_input>.unit {
  width: 26px;
  height: 26px;
  font-weight: 400;
  text-align: left;
  line-height: 26px;
  font-size: 12px;
  margin-left: 10px;
}

.label_input>.checkbox {
  width: 26px;
  height: 26px;
  cursor: pointer;
  border: 1px solid var(--el-border-color);
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  margin-left: 10px;
}

.label_input>.checkbox:hover {
  border: 1px solid var(--el-color-primary);
}

.checkbox_active {
  border: 1px solid var(--el-color-primary) !important;
}

.label_input>.ul {
  width: calc(100% - 96px);
  position: absolute;
  z-index: 20;
  max-height: 100px;
  min-height: 50px;
  left: 60px;
  top: 27px;
  overflow-y: auto;
  background: var(--el-fill-color-lighter);
  border: 1px solid var(--el-border-color);
  box-shadow: 0px 2px 6px 0px rgba(26, 26, 28, 0.68);
  border-radius: 4px;
  overflow-x: hidden;
  margin: 0;
  padding: 0;
}

/* .ul::-webkit-scrollbar-thumb {
  background-color: rgba(183, 183, 183, 1);
  border-radius: 2px;
}

.ul::-webkit-scrollbar {
  width: 3px;
  background-color: rgba(41, 42, 46, 1);
  border-radius: 2px;
} */

.ul>li {
  list-style: none;
  width: 100%;
  height: 20px;
  font-size: 12px;
  color: var(--el-text-color-regular);
  line-height: 20px;
  cursor: pointer;
  text-align: left;
  padding-left: 10px;
  /* margin-left: -40px; */
  white-space: nowrap;
  box-sizing: border-box;
}

.ul>li:hover {
  background-color: var(--el-fill-color-light);
}

.l_active {
  background: var(--el-fill-color-light) !important;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
}

input[type='number'] {
  -moz-appearance: textfield;
}
</style>
