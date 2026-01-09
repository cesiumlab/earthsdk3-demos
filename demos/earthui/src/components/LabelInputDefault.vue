<script setup lang="ts">
import { computed, watch, ref } from 'vue'
interface Props {
  label?: string
  unit?: string
  modelValue?: string | number
  inputType?: string
  placeholder?: string
  disabled?: boolean
  readonly?: boolean
  defaultValue?: undefined | number
  min?: number
  max?: number
}
const props = withDefaults(defineProps<Props>(), {
  label: '内容',
  modelValue: undefined,
  placeholder: '请输入内容',
  inputType: 'text',
  readonly: false,
  disabled: false,
  defaultValue: undefined
})
const emit = defineEmits(['update:modelValue'])
const onKeydownEnter = (e?: Event) => {
  if (e) {
    //@ts-ignore
    e.target.blur()
  }
}
const onInput = (e: Event) => {
  mouseFlag.value = false
  let targetValue = (e.target as HTMLInputElement).value as any
  if (props.inputType === 'number') {
    targetValue = Number(targetValue)
    if (props.min !== undefined && targetValue < props.min) {
      targetValue = props.min
    }
    if (props.max !== undefined && targetValue > props.max) {
      targetValue = props.max
    }
  }
  newValue.value = targetValue
  emit('update:modelValue', targetValue)
}
const name = 'input'
const inpClass = computed(() => {
  const status = getStatus()
  return [name, `${name}_${status}`]
})
function getStatus() {
  return (props.disabled && 'disabled') || (props.readonly && 'readonly') || 'normal'
}
const newValue = ref<undefined | number>(undefined)
watch(
  () => props.modelValue,
  (val: any) => {
    newValue.value = val
  },
  { immediate: true }
)
const resetDefult = () => {
  newValue.value = props.defaultValue
  emit('update:modelValue', newValue.value)
}
const mouseFlag = ref(false)
</script>
<template>
  <div class="label_input">
    <label class="label" for="" :title="label">{{ label }}</label>
    <div :class="inpClass">
      <input
        :type="inputType"
        :placeholder="placeholder"
        v-model="newValue"
        @change="onInput"
        :disabled="disabled"
        @keydown.enter="onKeydownEnter($event)"
      />
    </div>
    <div class="unit" v-if="unit">{{ unit }}</div>
    <div
      v-if="newValue !== defaultValue"
      class="checkbox"
      @click.stop.prevent="resetDefult"
      @mouseover="mouseFlag = true"
      @mouseout="mouseFlag = false"
    >
      <es-icon
        :name="'huaban'"
        :color="mouseFlag ? 'rgba(230, 230, 230, 1)' : 'rgba(230, 230, 230, 0.4)'"
        :size="15"
      />
    </div>
  </div>
</template>

<style scoped>
.label_input {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: rgba(230, 230, 230, 1);
  font-size: 12px;
  position: relative;
  margin-top: 10px;
}

.label_input > .label {
  display: inline-block;
  width: 60px;
  height: 26px;
  font-family: SourceHanSansCN, SourceHanSansCN;
  font-weight: 400;
  text-align: left;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  line-height: 26px;
  font-size: 12px;
}

.label_input > .input {
  flex: 1;
  box-sizing: border-box;
  background: rgba(28, 28, 29, 0.6);
}

.input_readonly,
.input_disabled {
  cursor: not-allowed;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  pointer-events: none;
  background: rgba(48, 48, 48, 0.6) !important;
  color: #555;
  border-radius: 5px;
}

.label_input > .input > input {
  width: 100%;
  display: inline-block;
  height: 26px;
  border-radius: 4px;
  margin-right: 0;
  color: rgba(230, 230, 230, 1);
  padding: 0 11px;
  box-sizing: border-box;
  background: none;
  border: 1px solid #3b3c40;
}

.label_input > .input > input:hover {
  border: 1px solid #2c68f7;
}

.label_input > .input > input:focus {
  border: 1px solid #2c68f7;
}

.label_input > .unit {
  width: 26px;
  height: 26px;
  font-family: SourceHanSansCN, SourceHanSansCN;
  font-weight: 400;
  text-align: left;
  line-height: 26px;
  font-size: 12px;
  margin-left: 10px;
}

.label_input > .checkbox {
  width: 26px;
  height: 26px;
  cursor: pointer;
  border: 1px solid #3b3c40;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  margin-left: 10px;
}

.label_input > .checkbox:hover {
  border: 1px solid #2c68f7;
}

.checkbox_active {
  border: 1px solid #2c68f7 !important;
}

.label_input > .ul {
  width: calc(100% - 96px);
  position: absolute;
  z-index: 20;
  max-height: 100px;
  left: 60px;
  top: 27px;
  overflow-y: auto;
  background: #292a2e;
  box-shadow: 0px 2px 6px 0px rgba(26, 26, 28, 0.68);
  border-radius: 4px;
  overflow-x: hidden;
  margin: 0;
  padding: 0;
}

.ul::-webkit-scrollbar-thumb {
  background-color: rgba(183, 183, 183, 1);
  border-radius: 2px;
}

.ul::-webkit-scrollbar {
  width: 3px;
  background-color: rgba(41, 42, 46, 1);
  border-radius: 2px;
}

.ul > li {
  list-style: none;
  width: 100%;
  height: 20px;
  font-size: 12px;
  color: rgba(230, 230, 230, 1);
  line-height: 20px;
  cursor: pointer;
  text-align: left;
  padding-left: 10px;
  /* margin-left: -40px; */
  white-space: nowrap;
  box-sizing: border-box;
}

.ul > li:hover {
  background-color: #383838;
}

.l_active {
  background: #455767 !important;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
}

input[type='number'] {
  -moz-appearance: textfield;
}
</style>
