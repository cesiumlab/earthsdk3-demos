<template>
  <div class="switch" @click="toggleSwitch(booleanValue, index)" @mousedown="isElongate = true"
    @mouseup="isElongate = false" :class="booleanValue ? 'switch-on-bg' : 'switch-off-bg'">
    <span class="switch_icon" :class="booleanValue ? ['switch-on', iconClass()] : ['switch-off', iconClass()]"></span>
  </div>
  <!-- <div class="checkbox1"> -->
  <div v-if="showButton && defaultValue !== undefined && booleanValue !== defaultValue" class="checkbox"
    @click.stop.prevent="resetDefult" @mouseover="mouseFlag = true" @mouseout="mouseFlag = false">
    <es-icon :name="'huaban'" :color="mouseFlag ? 'rgba(230, 230, 230, 1)' : 'rgba(230, 230, 230, 0.4)'" :size="14" />
  </div>
  <!-- </div> -->
</template>
<script lang="ts" setup>
import { ref } from 'vue';
const p = withDefaults(
  defineProps<{
    booleanValue: boolean
    index?: number
    defaultValue?: any
    showButton?: boolean
  }>(),
  { showButton: true }
)
const emits = defineEmits(['update:booleanValue'])
const isElongate = ref(false)
const mouseFlag = ref(false)
const iconClass = () => {
  return isElongate.value ? 'elongate_icon' : ''
}

const toggleSwitch = (flag: boolean, index?: number) => {
  mouseFlag.value = false
  if (index !== undefined) {
    emits('update:booleanValue', { flag: !flag, index: index })
  } else {
    emits('update:booleanValue', !flag)
  }
}
const resetDefult = () => {
  emits('update:booleanValue', p.defaultValue)
}
</script>
<style scoped>
.switch {
  position: relative;
  border-radius: 10px;
  width: 24px;
  height: 12px;
  transition: background 0.1s;
  cursor: pointer;
  border: 1px solid #3b3c40;
}

.switch-off-bg {
  background: rgba(28, 28, 29, 1);
}

.switch-on-bg {
  background: rgba(44, 104, 247, 1);
}

.switch_icon {
  position: absolute;
  top: 0px;
  width: 12px;
  transition: width 0.1s;
  height: 12px;
  border-radius: 6px;
}

.switch-off {
  left: 0;
  background: #fff;
}

.switch-on {
  right: 0;
  background: #fff;
}

.elongate_icon {
  width: 12px !important;
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
  margin-left: 10px;
}
</style>
